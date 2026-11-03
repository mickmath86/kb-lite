// Same-origin proxy to the Supabase `crm-login` Edge Function (Assembly CRM login step).
// Forwards only known fields (and the onboarding app's Authorization header); the function decides everything else.
const DEFAULT_URL = 'https://rtlhldhumcmzgbvkqmnm.supabase.co/functions/v1/crm-login'

function endpoint() {
  const custom = process.env.CRM_LOGIN_FUNCTION_URL
  return custom && custom.startsWith('https://') ? custom : DEFAULT_URL
}

export async function POST(request: Request) {
  const raw = await request.text()
  if (raw.length > 10_000) return Response.json({ error: 'Request too large.' }, { status: 413 })
  let body: Record<string, unknown>
  try { body = JSON.parse(raw) } catch { return Response.json({ error: 'Bad request.' }, { status: 400 }) }
  const forward = { action: body.action, token: body.token, k: body.k, password: body.password, clientId: body.clientId, companyId: body.companyId }
  const auth = request.headers.get('authorization')
  try {
    const response = await fetch(endpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(auth ? { Authorization: auth } : {}) },
      body: JSON.stringify(forward),
      cache: 'no-store',
      signal: AbortSignal.timeout(25_000),
    })
    return new Response(await response.text(), {
      status: response.status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    })
  } catch (err) {
    console.error('crm-login proxy failed', err)
    return Response.json({ error: 'Kickbord is temporarily unavailable. Please try again.' }, { status: 502 })
  }
}
