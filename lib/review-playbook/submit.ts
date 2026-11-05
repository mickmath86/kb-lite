import { createHash } from 'node:crypto'

import { validateLead } from './validate'

export const REVIEW_PLAYBOOK_SOURCE = 'reviews-playbook'
const DEDUPE_MS = 60_000

const recentSuccess = new Map<string, number>()
const inFlight = new Set<string>()

export type SubmitSuccess = {
  ok: true
  demo: boolean
  captured: boolean
  sent: boolean
  duplicate?: boolean
}

export type SubmitFailure = {
  ok: false
  status: number
  code:
    | 'invalid_body'
    | 'validation'
    | 'ignored'
    | 'duplicate'
    | 'unconfigured'
    | 'invalid_webhook'
    | 'rejected'
    | 'unreachable'
  fieldErrors?: Partial<Record<'name' | 'email' | 'tradeType', string>>
}

export type SubmitResult = SubmitSuccess | SubmitFailure

export type SubmitOptions = {
  webhookUrl: string | undefined
  webhookToken?: string | undefined
  nodeEnv: string
  vercelEnv?: string
  fetchImpl?: typeof fetch
  now?: () => number
  timeoutMs?: number
}

export type ReviewDemoEnv = {
  nodeEnv?: string
  vercelEnv?: string
  webhookUrl?: string
}

/**
 * Open the guide without a webhook only when no destination is configured and
 * this is a Vercel preview or a local dev process. Production stays closed.
 */
export function isAutomaticReviewDemo(env: ReviewDemoEnv) {
  if ((env.webhookUrl ?? '').trim()) return false
  if (env.vercelEnv === 'production') return false
  if (env.vercelEnv === 'preview' || env.vercelEnv === 'development') return true
  return !env.vercelEnv && (env.nodeEnv ?? 'production') !== 'production'
}

type ResolvedWebhook =
  | { ok: true; url: string }
  | { ok: false; code: 'unconfigured' | 'invalid_webhook' }

export function resolveReviewPlaybookWebhook(
  raw: string | undefined,
  nodeEnv: string,
): ResolvedWebhook {
  if (!raw || !raw.trim()) return { ok: false, code: 'unconfigured' }

  let parsed: URL
  try {
    parsed = new URL(raw.trim())
  } catch {
    return { ok: false, code: 'invalid_webhook' }
  }

  if (parsed.username || parsed.password) return { ok: false, code: 'invalid_webhook' }

  const localHost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'
  const devHttp = parsed.protocol === 'http:' && localHost && nodeEnv !== 'production'
  if (parsed.protocol !== 'https:' && !devHttp) return { ok: false, code: 'invalid_webhook' }

  return { ok: true, url: parsed.toString() }
}

function fingerprint(email: string) {
  return createHash('sha256').update(email.toLowerCase()).digest('hex')
}

function prune(now: number) {
  for (const [key, at] of recentSuccess) {
    if (now - at >= DEDUPE_MS) recentSuccess.delete(key)
  }
}

export function resetReviewPlaybookDedupeForTests() {
  recentSuccess.clear()
  inFlight.clear()
}

function payloadFor(lead: { name: string; email: string; tradeType: string }, timestamp: string) {
  return {
    name: lead.name,
    email: lead.email,
    tradeType: lead.tradeType,
    source: REVIEW_PLAYBOOK_SOURCE,
    timestamp,
  }
}

export async function submitReviewPlaybookLead(
  body: unknown,
  options: SubmitOptions,
): Promise<SubmitResult> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, status: 400, code: 'invalid_body' }
  }

  const submitted = body as Record<string, unknown>
  const honeypot = submitted.hp
  if (typeof honeypot === 'string' && honeypot.trim()) {
    return { ok: false, status: 400, code: 'ignored' }
  }

  const validated = validateLead({
    name: submitted.name,
    email: submitted.email,
    tradeType: submitted.tradeType,
  })
  if (!validated.ok) {
    return { ok: false, status: 400, code: 'validation', fieldErrors: validated.fieldErrors }
  }

  if (
    isAutomaticReviewDemo({
      nodeEnv: options.nodeEnv,
      vercelEnv: options.vercelEnv,
      webhookUrl: options.webhookUrl,
    })
  ) {
    return { ok: true, demo: true, captured: false, sent: false }
  }

  const webhook = resolveReviewPlaybookWebhook(options.webhookUrl, options.nodeEnv)
  if (!webhook.ok) {
    return { ok: false, status: 503, code: webhook.code }
  }

  const token = options.webhookToken?.trim()
  if (token && /[\r\n]/.test(token)) {
    return { ok: false, status: 503, code: 'invalid_webhook' }
  }

  const now = options.now ?? Date.now
  const at = now()
  prune(at)
  const key = fingerprint(validated.lead.email)

  if (inFlight.has(key)) {
    return { ok: false, status: 409, code: 'duplicate' }
  }
  const previous = recentSuccess.get(key)
  if (previous !== undefined && at - previous < DEDUPE_MS) {
    return { ok: true, demo: false, captured: true, sent: false, duplicate: true }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const fetchImpl = options.fetchImpl ?? fetch
  inFlight.add(key)
  try {
    const response = await fetchImpl(webhook.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payloadFor(validated.lead, new Date(at).toISOString())),
      redirect: 'manual',
      cache: 'no-store',
      credentials: 'omit',
      signal: AbortSignal.timeout(options.timeoutMs ?? 8000),
    })
    await response.body?.cancel().catch(() => undefined)

    if (!response.ok) {
      return { ok: false, status: 502, code: 'rejected' }
    }

    recentSuccess.set(key, at)
    return { ok: true, demo: false, captured: true, sent: true }
  } catch {
    return { ok: false, status: 502, code: 'unreachable' }
  } finally {
    inFlight.delete(key)
  }
}
