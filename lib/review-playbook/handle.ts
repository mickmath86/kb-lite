import { createHash } from 'node:crypto'

import { getReviewPlaybook } from './content'
import { allowRequest, markAccepted, MAX_BODY_CHARS, reviewPlaybookLimits, wasAccepted, type LimitStore } from './limits'
import { FIELD_SUMMARY, validateSubmission, type FieldName, type PlaybookDocument } from './schema'

/**
 * Review-request playbook delivery.
 *
 * The browser posts to /api/review-playbook. This server forwards a fixed JSON
 * body to REVIEW_PLAYBOOK_WEBHOOK_URL. The playbook is returned only after a
 * mock preview (development/test only) or a 2xx response from that URL.
 *
 * Environment
 * - REVIEW_PLAYBOOK_WEBHOOK_URL
 *   HTTPS URL, no username or password in the URL. Server-side only.
 *   Never NEXT_PUBLIC_REVIEW_PLAYBOOK_WEBHOOK_URL, and never a URL from the browser.
 *   When it is missing, submissions fail and the playbook stays locked.
 *   Nothing is silently discarded as a success.
 * - REVIEW_PLAYBOOK_WEBHOOK_MODE=mock
 *   Unlocks the playbook without a network call so the success screen can be
 *   reviewed locally. Honored only when NODE_ENV is not "production".
 *   Vercel Production and Preview both run with NODE_ENV=production, so the
 *   flag does nothing there. Do not set it in production.
 *
 * Payload (fake example — not a real person):
 * {
 *   "name": "Jordan Lee",
 *   "email": "jordan@example.com",
 *   "trade": "HVAC",
 *   "source": "review-request-playbook",
 *   "page": "/resources/review-request-playbook",
 *   "submittedAt": "2026-11-05T21:30:00.000Z"
 * }
 *
 * source, page, and submittedAt are set here. Client copies of those fields are ignored.
 * trade is one of the labels in TRADES, including "Other".
 * A 2xx response unlocks the playbook. Redirects are not followed.
 * The outbound request times out after 15 seconds.
 * Logs are event names and status codes only. Do not add the payload, the email, or the URL.
 */

const PAGE = '/resources/review-request-playbook'
const SOURCE = 'review-request-playbook'
const WEBHOOK_TIMEOUT_MS = 15_000

export const COPY = {
  unconfigured:
    'This form is not set up to deliver requests yet, so the playbook stays locked. Nothing was sent.',
  invalidDestination:
    "This form's delivery address is not usable, so the playbook stays locked. Nothing was sent.",
  rejected: 'The request was not accepted, so the playbook stays locked. You can try again.',
  timeout: 'The request timed out before it was accepted, so the playbook stays locked. You can try again.',
  unreachable: 'We could not reach the delivery step, so the playbook stays locked. You can try again.',
  rateLimited:
    'Too many attempts from this connection. Wait a few minutes and try again. The playbook stays locked.',
  inFlight:
    'That request is already being sent. If the playbook does not open, wait a moment and try again.',
  invalidBody: 'That submission could not be read. Check the form and try again. The playbook stays locked.',
  tooLarge: 'That submission is too large. The playbook stays locked.',
  origin: 'That submission did not come from this site. The playbook stays locked.',
} as const

export type ReviewPlaybookEnv = {
  NODE_ENV?: string
  REVIEW_PLAYBOOK_WEBHOOK_URL?: string
  REVIEW_PLAYBOOK_WEBHOOK_MODE?: string
}

type Target =
  | { kind: 'mock' }
  | { kind: 'unconfigured'; mockIgnored: boolean }
  | { kind: 'invalid'; mockIgnored: boolean }
  | { kind: 'webhook'; url: string; mockIgnored: boolean }

export type HandlerResult =
  | { status: 200; body: { ok: true; playbook: PlaybookDocument; preview?: true } }
  | {
      status: 400 | 409 | 413 | 429 | 502 | 503 | 504
      body: { ok: false; error: string; fields?: Partial<Record<FieldName, string>> }
    }

export function resolveWebhookTarget(env: ReviewPlaybookEnv): Target {
  const production = env.NODE_ENV === 'production'
  const mockRequested = (env.REVIEW_PLAYBOOK_WEBHOOK_MODE || '').trim().toLowerCase() === 'mock'
  if (!production && mockRequested) return { kind: 'mock' }

  const mockIgnored = production && mockRequested
  const raw = (env.REVIEW_PLAYBOOK_WEBHOOK_URL || '').trim()
  if (!raw) return { kind: 'unconfigured', mockIgnored }

  let url: URL
  try {
    url = new URL(raw)
  } catch {
    return { kind: 'invalid', mockIgnored }
  }
  if (url.protocol !== 'https:' || url.username || url.password) return { kind: 'invalid', mockIgnored }
  return { kind: 'webhook', url: url.toString(), mockIgnored }
}

function hashEmail(email: string): string {
  return createHash('sha256').update(email).digest('hex')
}

function emailKeyFromRaw(bodyText: string, ip: string): string {
  try {
    const parsed = JSON.parse(bodyText) as { email?: unknown }
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && typeof parsed.email === 'string') {
      return hashEmail(parsed.email.trim().toLowerCase())
    }
  } catch {
    return `invalid:${ip}`
  }
  return `invalid:${ip}`
}

function failure(
  status: 400 | 409 | 413 | 429 | 502 | 503 | 504,
  error: string,
  fields?: Partial<Record<FieldName, string>>,
): HandlerResult {
  return fields ? { status, body: { ok: false, error, fields } } : { status, body: { ok: false, error } }
}

function isTimeout(error: unknown): boolean {
  return error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')
}

type LogFn = (event: string, status?: number) => void

function defaultLog(event: string, status?: number) {
  console.info(JSON.stringify({ source: 'review-playbook', event, ...(status !== undefined ? { status } : {}) }))
}

export async function handleReviewPlaybookRequest(input: {
  bodyText: string
  env: ReviewPlaybookEnv
  ip: string
  fetchImpl?: typeof fetch
  now?: number
  store?: LimitStore
  log?: LogFn
}): Promise<HandlerResult> {
  const log = input.log ?? defaultLog
  const store = input.store ?? reviewPlaybookLimits
  const now = input.now ?? Date.now()
  const fetchImpl = input.fetchImpl ?? fetch
  const ip = input.ip || 'unknown'

  if (input.bodyText.length > MAX_BODY_CHARS) {
    log('too_large')
    return failure(413, COPY.tooLarge)
  }

  const emailKey = emailKeyFromRaw(input.bodyText, ip)
  if (!allowRequest(store, ip, emailKey, now)) {
    log('rate_limited')
    return failure(429, COPY.rateLimited)
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(input.bodyText)
  } catch {
    log('invalid_body')
    return failure(400, COPY.invalidBody)
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    log('invalid_body')
    return failure(400, COPY.invalidBody)
  }

  const record = parsed as Record<string, unknown>
  const validated = validateSubmission({
    name: record.name,
    email: record.email,
    trade: record.trade,
  })
  if (!validated.ok) {
    log('invalid_fields')
    return failure(400, FIELD_SUMMARY, validated.fields)
  }

  const target = resolveWebhookTarget(input.env)
  if (target.kind !== 'mock' && target.mockIgnored) log('mock_ignored')
  const dedupeKey = `${target.kind === 'mock' ? 'mock' : 'live'}:${hashEmail(validated.value.email)}`
  if (wasAccepted(store, dedupeKey, now)) {
    log('duplicate_accepted')
    return target.kind === 'mock'
      ? { status: 200, body: { ok: true, preview: true, playbook: getReviewPlaybook() } }
      : { status: 200, body: { ok: true, playbook: getReviewPlaybook() } }
  }

  if (store.inflight.has(dedupeKey)) {
    log('in_flight')
    return failure(409, COPY.inFlight)
  }

  store.inflight.add(dedupeKey)
  try {
    if (target.kind === 'mock') {
      markAccepted(store, dedupeKey, now)
      log('mock_accepted')
      return { status: 200, body: { ok: true, preview: true, playbook: getReviewPlaybook() } }
    }
    if (target.kind === 'unconfigured') {
      log('unconfigured')
      return failure(503, COPY.unconfigured)
    }
    if (target.kind === 'invalid') {
      log('invalid_destination')
      return failure(503, COPY.invalidDestination)
    }

    const payload = {
      name: validated.value.name,
      email: validated.value.email,
      trade: validated.value.trade,
      source: SOURCE,
      page: PAGE,
      submittedAt: new Date(now).toISOString(),
    }

    let response: Response
    try {
      response = await fetchImpl(target.url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
        redirect: 'manual',
        signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      })
    } catch (error) {
      if (isTimeout(error)) {
        log('timeout')
        return failure(504, COPY.timeout)
      }
      log('unreachable')
      return failure(502, COPY.unreachable)
    }

    if (!response.ok) {
      await response.body?.cancel().catch(() => undefined)
      log('rejected', response.status)
      return failure(502, COPY.rejected)
    }

    await response.body?.cancel().catch(() => undefined)
    markAccepted(store, dedupeKey, now)
    log('accepted', response.status)
    return { status: 200, body: { ok: true, playbook: getReviewPlaybook() } }
  } finally {
    store.inflight.delete(dedupeKey)
  }
}
