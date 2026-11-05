import { NextResponse } from 'next/server'

import { submitReviewPlaybookLead, type SubmitFailure } from '@/lib/review-playbook/submit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const FAILURE_COPY: Record<SubmitFailure['code'], string> = {
  invalid_body: 'That submission could not be read. Nothing was saved.',
  validation: 'Check the highlighted fields. Nothing was saved.',
  ignored: 'We could not submit that. Nothing was saved.',
  duplicate: 'That request is already being sent. Please wait a moment.',
  unconfigured:
    'This form is not ready to save requests yet. Nothing was saved. Please try again later.',
  invalid_webhook:
    'This form is not ready to save requests yet. Nothing was saved. Please try again later.',
  rejected: 'We could not deliver your request, so it was not saved. Please try again.',
  unreachable: 'We could not deliver your request, so it was not saved. Please try again.',
}

function logOutcome(event: string, status: number) {
  // Codes only. Never include the submission, webhook URL, or token.
  console.info(JSON.stringify({ event, status }))
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) {
    logOutcome('review_playbook_invalid_body', 400)
    return NextResponse.json(
      { ok: false, error: FAILURE_COPY.invalid_body },
      { status: 400 },
    )
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0')
  if (Number.isFinite(contentLength) && contentLength > 10_000) {
    logOutcome('review_playbook_invalid_body', 413)
    return NextResponse.json(
      { ok: false, error: FAILURE_COPY.invalid_body },
      { status: 413 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    logOutcome('review_playbook_invalid_body', 400)
    return NextResponse.json(
      { ok: false, error: FAILURE_COPY.invalid_body },
      { status: 400 },
    )
  }

  const result = await submitReviewPlaybookLead(body, {
    webhookUrl: process.env.REVIEW_PLAYBOOK_WEBHOOK_URL,
    webhookToken: process.env.REVIEW_PLAYBOOK_WEBHOOK_TOKEN,
    nodeEnv: process.env.NODE_ENV ?? 'development',
  })

  if (!result.ok) {
    logOutcome(`review_playbook_${result.code}`, result.status)
    return NextResponse.json(
      {
        ok: false,
        error: FAILURE_COPY[result.code],
        ...(result.fieldErrors ? { fieldErrors: result.fieldErrors } : {}),
      },
      { status: result.status },
    )
  }

  logOutcome(
    result.demo ? 'review_playbook_demo' : result.duplicate ? 'review_playbook_duplicate' : 'review_playbook_forwarded',
    200,
  )
  return NextResponse.json({
    ok: true,
    demo: result.demo,
    captured: result.captured,
    sent: result.sent,
    duplicate: result.duplicate === true,
  })
}
