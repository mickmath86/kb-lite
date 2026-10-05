import { NextResponse } from 'next/server'

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
      return NextResponse.json({ error: 'Webhook rejected the submission.' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Webhook could not be reached.' }, { status: 502 })
  }
}
