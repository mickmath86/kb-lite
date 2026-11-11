import { createHash } from 'node:crypto'

import { generateGbpReport, liveDeps, sampleReport, type GenerateResult } from './generate'
import { PlacesError, type PlacesClient } from './places'
import { buildNotFoundReport } from './score'
import type { SiteHints } from './site-lookup'
import type { Candidate, GbpReport } from './types'
import { isPlaceId, validateGbpLead, type GbpFieldErrors, type ValidGbpLead } from './validate'

export const GBP_REPORT_SOURCE = 'gbp-profile-report'
export const GBP_REPORT_KEYWORD = 'PROFILE'
export const GBP_REPORT_TAG = 'lm-profile'
export const GBP_REPORT_PATH = '/resources/google-business-profile-report'

const CACHE_MS = 10 * 60_000

export type GbpFailureCode =
  | 'invalid_body'
  | 'validation'
  | 'ignored'
  | 'duplicate'
  | 'unconfigured'
  | 'invalid_webhook'
  | 'rejected'
  | 'unreachable'
  | 'lookup_failed'
  | 'rate_limited'

export type GbpSubmitResult =
  | { ok: true; kind: 'choose'; candidates: Candidate[] }
  | { ok: true; kind: 'report'; report: GbpReport; demo: boolean; captured: boolean; sent: boolean; duplicate: boolean }
  | { ok: false; status: number; code: GbpFailureCode; fieldErrors?: GbpFieldErrors }

export type GbpEnv = {
  nodeEnv?: string
  vercelEnv?: string
  webhookUrl?: string
  webhookToken?: string
  placesApiKey?: string
}

export type GbpSubmitOptions = GbpEnv & {
  fetchImpl?: typeof fetch
  now?: () => number
  timeoutMs?: number
  /** Test seams. */
  places?: PlacesClient
  siteHints?: (url: string) => Promise<SiteHints | null>
}

function isNonProduction(env: GbpEnv) {
  if (env.vercelEnv === 'production') return false
  if (env.vercelEnv === 'preview' || env.vercelEnv === 'development') return true
  return !env.vercelEnv && (env.nodeEnv ?? 'production') !== 'production'
}

/** Skip the webhook only on previews/local with no webhook configured. Production stays closed. */
export function isGbpWebhookDemo(env: GbpEnv) {
  return !(env.webhookUrl ?? '').trim() && isNonProduction(env)
}

/** Use made-up sample data only on previews/local with no Places key. */
export function isGbpSampleData(env: GbpEnv) {
  return !(env.placesApiKey ?? '').trim() && isNonProduction(env)
}

function resolveWebhook(raw: string | undefined, nodeEnv: string) {
  if (!raw || !raw.trim()) return { ok: false as const, code: 'unconfigured' as const }
  let parsed: URL
  try {
    parsed = new URL(raw.trim())
  } catch {
    return { ok: false as const, code: 'invalid_webhook' as const }
  }
  if (parsed.username || parsed.password) return { ok: false as const, code: 'invalid_webhook' as const }
  const localHost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'
  const devHttp = parsed.protocol === 'http:' && localHost && nodeEnv !== 'production'
  if (parsed.protocol !== 'https:' && !devHttp) return { ok: false as const, code: 'invalid_webhook' as const }
  return { ok: true as const, url: parsed.toString() }
}

/** Flat payload so each value maps straight onto a CRM field. */
export function webhookPayload(lead: ValidGbpLead, report: GbpReport, timestamp: string) {
  const base = {
    name: lead.name,
    email: lead.email,
    tradeType: lead.tradeType,
    website: lead.website,
    source: GBP_REPORT_SOURCE,
    keyword: GBP_REPORT_KEYWORD,
    tag: GBP_REPORT_TAG,
    timestamp,
    sampleData: report.sample,
  }
  if (report.kind === 'not_found') {
    return {
      ...base,
      profileFound: false,
      topRecommendation: report.recommendations[0]?.title ?? '',
      recommendations: report.recommendations.map((r) => r.title),
    }
  }
  const b = report.business
  return {
    ...base,
    profileFound: true,
    websiteMatched: report.websiteMatched,
    businessName: b.name,
    placeId: b.placeId,
    googleMapsUri: b.googleMapsUri ?? '',
    address: b.address,
    city: b.city ?? '',
    phone: b.phone ?? '',
    primaryCategory: b.primaryCategory ?? '',
    score: report.score,
    grade: report.grade,
    rating: b.rating,
    reviewCount: b.reviewCount,
    photoCount: b.photoCount,
    hasHours: b.hasHours,
    competitorsCompared: report.benchmarks.competitorCount,
    competitorAvgRating: report.benchmarks.avgRating,
    competitorMedianReviews: report.benchmarks.medianReviewCount,
    topRecommendation: report.recommendations[0]?.title ?? '',
    recommendations: report.recommendations.map((r) => `${r.priority}: ${r.title}`),
  }
}

// Per-instance memory. Stops double submits and repeat Google lookups; not a database.
const recent = new Map<string, { at: number; report: GbpReport }>()
const inFlight = new Set<string>()

export function resetGbpReportStateForTests() {
  recent.clear()
  inFlight.clear()
}

function cacheKey(lead: ValidGbpLead, placeId?: string) {
  return createHash('sha256').update(`${lead.email.toLowerCase()}|${lead.domain}|${placeId ?? ''}`).digest('hex')
}

export async function submitGbpReport(body: unknown, options: GbpSubmitOptions): Promise<GbpSubmitResult> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { ok: false, status: 400, code: 'invalid_body' }
  const submitted = body as Record<string, unknown>

  if (typeof submitted.hp === 'string' && submitted.hp.trim()) return { ok: false, status: 400, code: 'ignored' }

  const validated = validateGbpLead({
    website: submitted.website,
    name: submitted.name,
    email: submitted.email,
    tradeType: submitted.tradeType,
  })
  if (!validated.ok) return { ok: false, status: 400, code: 'validation', fieldErrors: validated.fieldErrors }
  const lead = validated.lead

  let placeId: string | undefined
  if (submitted.placeId !== undefined && submitted.placeId !== null && submitted.placeId !== '') {
    if (!isPlaceId(submitted.placeId)) return { ok: false, status: 400, code: 'invalid_body' }
    placeId = submitted.placeId
  }
  const noneOfThese = submitted.noneOfThese === true

  const nodeEnv = options.nodeEnv ?? 'production'
  const webhookDemo = isGbpWebhookDemo(options)
  const sample = isGbpSampleData(options)

  // Check configuration before spending a Google lookup.
  let webhookUrl: string | null = null
  if (!webhookDemo) {
    const resolved = resolveWebhook(options.webhookUrl, nodeEnv)
    if (!resolved.ok) return { ok: false, status: 503, code: resolved.code }
    webhookUrl = resolved.url
  }
  const token = options.webhookToken?.trim()
  if (token && /[\r\n]/.test(token)) return { ok: false, status: 503, code: 'invalid_webhook' }
  if (!sample && !(options.placesApiKey ?? '').trim() && !options.places) return { ok: false, status: 503, code: 'unconfigured' }

  const now = options.now ?? Date.now
  const at = now()
  for (const [key, entry] of recent) if (at - entry.at >= CACHE_MS) recent.delete(key)

  const key = cacheKey(lead, noneOfThese ? 'none' : placeId)
  if (inFlight.has(key)) return { ok: false, status: 409, code: 'duplicate' }
  const cached = recent.get(key)
  if (cached) {
    return { ok: true, kind: 'report', report: cached.report, demo: webhookDemo, captured: !webhookDemo, sent: false, duplicate: true }
  }

  inFlight.add(key)
  try {
    let generated: GenerateResult
    if (sample) {
      generated = { kind: 'report', report: sampleReport(lead, at) }
    } else if (noneOfThese) {
      generated = { kind: 'report', report: buildNotFoundReport({ website: lead.website, now: at }) }
    } else {
      const deps = liveDeps(options.placesApiKey)
      try {
        generated = await generateGbpReport(
          lead,
          {
            places: options.places ?? deps.places,
            siteHints: options.siteHints ?? deps.siteHints,
            now: at,
          },
          placeId,
        )
      } catch (error) {
        if (error instanceof PlacesError && error.code === 'quota') return { ok: false, status: 503, code: 'rate_limited' }
        return { ok: false, status: 502, code: 'lookup_failed' }
      }
    }

    if (generated.kind === 'choose') return { ok: true, kind: 'choose', candidates: generated.candidates }
    const report = generated.report

    if (webhookDemo || !webhookUrl) {
      recent.set(key, { at, report })
      return { ok: true, kind: 'report', report, demo: true, captured: false, sent: false, duplicate: false }
    }

    const headers: Record<string, string> = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (token) headers.Authorization = `Bearer ${token}`
    const fetchImpl = options.fetchImpl ?? fetch
    try {
      const response = await fetchImpl(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(webhookPayload(lead, report, new Date(at).toISOString())),
        redirect: 'manual',
        cache: 'no-store',
        credentials: 'omit',
        signal: AbortSignal.timeout(options.timeoutMs ?? 8000),
      })
      await response.body?.cancel().catch(() => undefined)
      if (!response.ok) return { ok: false, status: 502, code: 'rejected' }
    } catch {
      return { ok: false, status: 502, code: 'unreachable' }
    }

    recent.set(key, { at, report })
    return { ok: true, kind: 'report', report, demo: false, captured: true, sent: true, duplicate: false }
  } finally {
    inFlight.delete(key)
  }
}
