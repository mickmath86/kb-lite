import { SeverityNumber } from '@opentelemetry/api-logs'
import { after, NextResponse } from 'next/server'

import { loggerProvider, posthogLogger } from '@/instrumentation'

function logLeadQualifierOutcome(
  body: string,
  severityNumber: SeverityNumber,
  attributes: Record<string, string | number> = {},
) {
  posthogLogger?.emit({
    body,
    severityNumber,
    attributes: {
      endpoint: '/api/lead-qualifier',
      ...attributes,
    },
  })

  after(async () => {
    await loggerProvider?.forceFlush()
  })
}

const ALLOWED_FIELDS = [
  'workType',
  'mainIssue',
  'timeline',
  'revenue',
  'phone',
  'email',
  'name',
  'company',
] as const

export async function POST(request: Request) {
  const webhookUrl = process.env.LEAD_QUALIFIER_WEBHOOK_URL

  if (!webhookUrl) {
    logLeadQualifierOutcome('lead_qualifier_webhook_unconfigured', SeverityNumber.ERROR)
    return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 503 })
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const submitted = body as Record<string, unknown>
  const answers = Object.fromEntries(
    ALLOWED_FIELDS.flatMap((field) =>
      typeof submitted[field] === 'string' ? [[field, submitted[field]]] : [],
    ),
  )

  if (!answers.phone || !answers.email || !answers.name || !answers.company) {
    return NextResponse.json({ error: 'Required contact fields are missing.' }, { status: 400 })
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...answers,
        source: 'lead-qualifier',
        submittedAt: new Date().toISOString(),
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      logLeadQualifierOutcome('lead_qualifier_webhook_rejected', SeverityNumber.WARN, {
        webhook_status: response.status,
      })
      return NextResponse.json({ error: 'Webhook rejected the submission.' }, { status: 502 })
    }

    logLeadQualifierOutcome('lead_qualifier_submission_forwarded', SeverityNumber.INFO, {
      webhook_status: response.status,
    })
    return NextResponse.json({ success: true })
  } catch {
    logLeadQualifierOutcome('lead_qualifier_webhook_unreachable', SeverityNumber.ERROR)
    return NextResponse.json({ error: 'Webhook could not be reached.' }, { status: 502 })
  }
}
