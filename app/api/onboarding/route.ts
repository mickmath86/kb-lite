const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtlhldhumcmzgbvkqmnm.supabase.co'
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIUzI1NiIsInJlZiI6InJ0bGhsZGh1bWNtemdidmtxbW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MDM5NzAsImV4cCI6MjA5ODA3OTk3MH0.75ekkQTasFQHksnDF0obWw-s1QRz1nsxGmSGmtJeono'
const ENDPOINT = process.env.NEXT_PUBLIC_ONBOARDING_API || `${SUPABASE_URL}/functions/v1/onboarding`

export async function POST(request: Request) {
  const body = await request.text()

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body,
      cache: 'no-store',
    })

    return new Response(await response.text(), {
      status: response.status,
      headers: { 'Content-Type': response.headers.get('Content-Type') || 'application/json' },
    })
  } catch {
    return Response.json({ error: 'The onboarding service is temporarily unavailable. Please try again.' }, { status: 502 })
  }
}
