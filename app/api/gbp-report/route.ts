import { NextResponse } from 'next/server'

import { submitGbpReport, type GbpFailureCode } from '@/lib/gbp-report/submit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

const FAILURE_COPY: Record<GbpFailureCode, string> = {
  invalid_body: 'That submission could not be read. Nothing was saved.',
  validation: 'Check the highlighted fields. Nothing was saved.',
  ignored: 'We could not submit that. Nothing was saved.',
  duplicate: 'Your report is already being built. Please wait a moment.',
  unconfigured: 'This tool is not ready yet. Nothing was saved. Please try again later.',
  invalid_webhook: 'This tool is not ready yet. Nothing was saved. Please try again later.',
  rejected: 'We could not save your request, so the report was not created. Please try again.',
  unreachable: 'We could not save your request, so the report was not created. Please try again.',
  lookup_failed: 'We could not reach Google just now. Nothing was saved. Please try again in a minute.',
  rate_limited: 'Too many reports right now. Please try again in a few minutes.',
}

// Soft per-instance limit so one visitor cannot run up Google charges.
const WINDOW_MS = 60 * 60_000
const MAX_PER_WINDOW = 8
const hits = new Map<string, number[]>()

function limited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return false
}

function logOutcome(event: string, status: number) {
  // Codes only. Never log the submission, webhook URL, token or API key.
  console.info(JSON.stringify({ event, status }))
}

function fail(code: GbpFailureCode, status: number, extra: Record<string, unknown> = {}) {
  logOutcome(`gbp_report_${code}`, status)
  return NextResponse.json({ ok: false, error: FAILURE_COPY[code], ...extra }, { status })
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) return fail('invalid_body', 400)

  const contentLength = Number(request.headers.get('content-length') ?? '0')
  if (Number.isFinite(contentLength) && contentLength > 10_000) return fail('invalid_body', 413)

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  if (limited(ip, Date.now())) return fail('rate_limited', 429)

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return fail('invalid_body', 400)
  }

  const result = await submitGbpReport(body, {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    vercelEnv: process.env.VERCEL_ENV,
    webhookUrl: process.env.GBP_REPORT_WEBHOOK_URL,
    webhookToken: process.env.GBP_REPORT_WEBHOOK_TOKEN,
    placesApiKey: process.env.GOOGLE_PLACES_API_KEY,
  })

  if (!result.ok) {
    return fail(result.code, result.status, result.fieldErrors ? { fieldErrors: result.fieldErrors } : {})
  }

  if (result.kind === 'choose') {
    logOutcome('gbp_report_choose', 200)
    return NextResponse.json({ ok: true, kind: 'choose', candidates: result.candidates })
  }

  logOutcome(result.demo ? 'gbp_report_demo' : result.duplicate ? 'gbp_report_duplicate' : 'gbp_report_forwarded', 200)
  return NextResponse.json({
    ok: true,
    kind: 'report',
    demo: result.demo,
    captured: result.captured,
    sent: result.sent,
    duplicate: result.duplicate,
    report: result.report,
  })
}
