import { NextResponse } from 'next/server'

import { handleReviewPlaybookRequest, COPY } from '@/lib/review-playbook/handle'
import { clientAddress, requestOriginAllowed } from '@/lib/review-playbook/http'
import { MAX_BODY_CHARS } from '@/lib/review-playbook/limits'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const NO_STORE = { 'Cache-Control': 'no-store' }

export async function POST(request: Request) {
  if (!requestOriginAllowed(request)) {
    console.info(JSON.stringify({ source: 'review-playbook', event: 'origin_rejected' }))
    return NextResponse.json({ ok: false, error: COPY.origin }, { status: 403, headers: NO_STORE })
  }

  const declared = Number(request.headers.get('content-length'))
  if (Number.isFinite(declared) && declared > MAX_BODY_CHARS) {
    return NextResponse.json({ ok: false, error: COPY.tooLarge }, { status: 413, headers: NO_STORE })
  }

  const result = await handleReviewPlaybookRequest({
    bodyText: await request.text(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      REVIEW_PLAYBOOK_WEBHOOK_URL: process.env.REVIEW_PLAYBOOK_WEBHOOK_URL,
      REVIEW_PLAYBOOK_WEBHOOK_MODE: process.env.REVIEW_PLAYBOOK_WEBHOOK_MODE,
    },
    ip: clientAddress(request),
  })

  return NextResponse.json(result.body, { status: result.status, headers: NO_STORE })
}
