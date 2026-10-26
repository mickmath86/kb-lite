// Same-origin proxy to the Supabase `estimator-calibrate` Edge Function (swipe-style pricing page).
// Mirrors /api/estimator-setup. Override only with ESTIMATOR_CALIBRATE_FUNCTION_URL (https required).
const DEFAULT_URL = 'https://rtlhldhumcmzgbvkqmnm.supabase.co/functions/v1/estimator-calibrate'

function endpoint() {
  const custom = process.env.ESTIMATOR_CALIBRATE_FUNCTION_URL
  return custom && custom.startsWith('https://') ? custom : DEFAULT_URL
}

export async function POST(request: Request) {
  const body = await request.text()
  if (body.length > 20_000) return Response.json({ error: 'Request too large.' }, { status: 413 })

  try {
    const response = await fetch(endpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(25_000),
    })
    return new Response(await response.text(), {
      status: response.status,
      headers: { 'Content-Type': response.headers.get('Content-Type') || 'application/json', 'Cache-Control': 'no-store' },
    })
  } catch (err) {
    console.error('estimator-calibrate proxy failed', err)
    return Response.json({ error: 'The service is temporarily unavailable. Please try again.' }, { status: 502 })
  }
}
