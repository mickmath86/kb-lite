// Kickbord: CRM login step for the Assembly custom app.
//
// Assembly opens our page with ?token=<encrypted session>. The page posts that token here.
// We decrypt it with the custom app's API key (only Assembly and we know it), then read the
// client's email and their company's ghllocationid from the Assembly API. Nothing about who
// the client is or which sub-account they get comes from the browser.
//
// Actions (POST JSON):
//   session  { token }            -> what the page should show (ready / exists / not_ready / not_client)
//   create   { token, password }  -> create the CRM user in their sub-account with that password
//
// Secrets: ASSEMBLY_LOGIN_APP_KEY (Edge Function secret, or vault "assembly_login_app_key"),
//          ghl_agency_token (vault). verify_jwt is off: the Assembly token is the credential.
import { createClient } from 'npm:@supabase/supabase-js@2'

type Row = Record<string, any>

const GHL_API = 'https://services.leadconnectorhq.com'
const GHL_COMPANY_ID = 'yiMNNRLaz6UPsDiYuPH3' // Kickbord agency
const ASSEMBLY_API = 'https://api.assembly.com/v1'
const LOCATION_FIELD = Deno.env.get('ASSEMBLY_LOCATION_FIELD_KEY') ?? 'ghllocationid'
const LOCATION_RE = /^[A-Za-z0-9]{16,40}$/

const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false },
})

async function vault(name: string): Promise<string | null> {
  const { data, error } = await sb.rpc('onboarding_secret', { p_name: name })
  if (error) throw new Error(`secret ${name}: ${error.message}`)
  return (data as string | null) ?? null
}

let appKeyCache: string | null = null
async function appKey(): Promise<string | null> {
  if (appKeyCache) return appKeyCache
  appKeyCache = Deno.env.get('ASSEMBLY_LOGIN_APP_KEY') || (await vault('assembly_login_app_key'))
  return appKeyCache
}

// ---------- Assembly session token (same scheme as @assembly-js/node-sdk) ----------
const hex = (b: Uint8Array) => Array.from(b).map((x) => x.toString(16).padStart(2, '0')).join('')
function unhex(s: string): Uint8Array | null {
  if (!/^(?:[0-9a-fA-F]{2})+$/.test(s)) return null
  const out = new Uint8Array(s.length / 2)
  for (let i = 0; i < out.length; i++) out[i] = parseInt(s.slice(i * 2, i * 2 + 2), 16)
  return out
}

type Session = { workspaceId: string; clientId?: string; companyId?: string; internalUserId?: string }

async function decryptToken(token: unknown, apiKey: string): Promise<Session | null> {
  if (typeof token !== 'string' || token.length < 64 || token.length > 4000) return null
  const bytes = unhex(token)
  if (!bytes || bytes.length < 32 || bytes.length % 16 !== 0) return null
  try {
    // key = first 128 bits of HMAC-SHA256(apiKey, "")
    const hk = await crypto.subtle.importKey('raw', new TextEncoder().encode(apiKey), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
    const keyHex = hex(new Uint8Array(await crypto.subtle.sign('HMAC', hk, new Uint8Array(0)))).slice(0, 32)
    const aes = await crypto.subtle.importKey('raw', unhex(keyHex)!, { name: 'AES-CBC' }, false, ['decrypt'])
    const plain = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: bytes.slice(0, 16) }, aes, bytes.slice(16))
    const json = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(plain))
    if (!json || typeof json !== 'object' || typeof json.workspaceId !== 'string') return null
    if (!Object.values(json).every((v) => typeof v === 'string')) return null
    // Honour an expiry if Assembly includes one.
    const exp = json.expiresAt ?? json.exp
    if (exp && Number.isFinite(Date.parse(exp)) && Date.parse(exp) < Date.now()) return null
    return { workspaceId: json.workspaceId, clientId: json.clientId || undefined, companyId: json.companyId || undefined, internalUserId: json.internalUserId || undefined }
  } catch {
    return null
  }
}

async function assembly(path: string, apiKey: string) {
  const res = await fetch(`${ASSEMBLY_API}${path}`, {
    headers: { 'X-API-KEY': apiKey, Accept: 'application/json' },
    signal: AbortSignal.timeout(15_000),
  })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data: data as Row }
}

async function ghl(path: string, init: RequestInit = {}) {
  const key = await vault('ghl_agency_token')
  if (!key) throw new Error('CRM key missing')
  const res = await fetch(`${GHL_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      Version: '2021-07-28',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
    signal: AbortSignal.timeout(15_000),
  })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data: data as Row }
}

const cleanEmail = (v: unknown) => {
  const s = typeof v === 'string' ? v.trim().toLowerCase() : ''
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254 ? s : null
}

function passwordProblems(pw: string): string[] {
  const out: string[] = []
  if (pw.length < 12) out.push('at least 12 characters')
  if (!/[A-Z]/.test(pw)) out.push('an uppercase letter')
  if (!/[a-z]/.test(pw)) out.push('a lowercase letter')
  if (!/[0-9]/.test(pw)) out.push('a number')
  if (!/[^A-Za-z0-9]/.test(pw)) out.push('a symbol like ! or #')
  if (pw.length > 128) out.push('no more than 128 characters')
  return out
}

type Who = {
  clientId: string
  companyId: string
  email: string
  firstName: string
  lastName: string
  company: string
  locationId: string | null
}

type Fail = { status: number; body: Row }

/** Verify the Assembly token and load who this is from Assembly. */
async function resolve(token: unknown): Promise<Who | Fail> {
  const key = await appKey()
  if (!key) return { status: 503, body: { state: 'unavailable', error: 'This step is not switched on yet. Please contact Kickbord.' } }
  const s = await decryptToken(token, key)
  if (!s) return { status: 401, body: { state: 'invalid', error: 'This page only works inside your Kickbord portal. Please open it from there.' } }
  if (!s.clientId) return { status: 200, body: { state: 'not_client', message: 'This step is for clients. Preview it from a client account.' } }
  if (!s.companyId) return { status: 200, body: { state: 'not_ready', message: 'Your account is still being set up. We will let you know when this step is ready.' } }

  const c = await assembly(`/clients/${encodeURIComponent(s.clientId)}`, key)
  if (!c.ok) {
    console.error('crm-login: client lookup failed', c.status)
    return { status: 502, body: { state: 'error', error: 'We could not load your account. Please try again in a minute.' } }
  }
  // The token's company must be one of this client's companies.
  const companyIds: string[] = [...(Array.isArray(c.data.companyIds) ? c.data.companyIds : []), c.data.companyId].filter(Boolean)
  if (c.data.deleted === true || !companyIds.includes(s.companyId)) {
    console.error('crm-login: company not on client')
    return { status: 401, body: { state: 'invalid', error: 'This page only works inside your Kickbord portal. Please open it from there.' } }
  }
  const email = cleanEmail(c.data.email)
  if (!email) return { status: 200, body: { state: 'not_ready', message: 'We do not have an email on your account yet. Please contact Kickbord.' } }

  const co = await assembly(`/companies/${encodeURIComponent(s.companyId)}`, key)
  if (!co.ok) {
    console.error('crm-login: company lookup failed', co.status)
    return { status: 502, body: { state: 'error', error: 'We could not load your account. Please try again in a minute.' } }
  }
  const raw = String(co.data.customFields?.[LOCATION_FIELD] ?? '').trim()
  return {
    clientId: s.clientId,
    companyId: s.companyId,
    email,
    firstName: String(c.data.givenName ?? '').trim(),
    lastName: String(c.data.familyName ?? '').trim(),
    company: String(co.data.name ?? '').trim(),
    locationId: LOCATION_RE.test(raw) ? raw : null,
  }
}

const crmUrl = (loc: string) => `https://app.kickbord.com/v2/location/${encodeURIComponent(loc)}/dashboard`

async function locationIsOurs(loc: string) {
  const r = await ghl(`/locations/${encodeURIComponent(loc)}`)
  return r.ok && r.data?.location?.companyId === GHL_COMPANY_ID
}

async function findUser(email: string) {
  const r = await ghl(`/users/search?companyId=${GHL_COMPANY_ID}&query=${encodeURIComponent(email)}`)
  if (!r.ok) throw new Error(`user search failed ${r.status}`)
  return (r.data?.users ?? []).find((u: Row) => String(u.email ?? '').toLowerCase() === email) ?? null
}

async function actionSession(body: Row) {
  const who = await resolve(body.token)
  if ('status' in who) return who
  const base = { email: who.email, firstName: who.firstName, company: who.company }
  if (!who.locationId || !(await locationIsOurs(who.locationId))) {
    return { status: 200, body: { state: 'not_ready', ...base, message: 'Your Kickbord account is still being set up. We will let you know when this step is ready.' } }
  }
  const existing = await findUser(who.email)
  if (existing) return { status: 200, body: { state: 'exists', ...base, crmUrl: crmUrl(who.locationId) } }
  return { status: 200, body: { state: 'ready', ...base } }
}

async function actionCreate(body: Row) {
  const who = await resolve(body.token)
  if ('status' in who) return who
  const pw = typeof body.password === 'string' ? body.password : ''
  const problems = passwordProblems(pw)
  if (problems.length) return { status: 400, body: { error: `Your password needs ${problems.join(', ')}.` } }
  if (!who.locationId || !(await locationIsOurs(who.locationId))) {
    return { status: 400, body: { state: 'not_ready', error: 'Your Kickbord account is still being set up. Please contact Kickbord.' } }
  }
  // Never change the password of an existing user.
  if (await findUser(who.email)) {
    return { status: 409, body: { state: 'exists', email: who.email, crmUrl: crmUrl(who.locationId) } }
  }
  const created = await ghl('/users/', {
    method: 'POST',
    body: JSON.stringify({
      companyId: GHL_COMPANY_ID,
      firstName: who.firstName || 'Owner',
      lastName: who.lastName || who.company || 'Account',
      email: who.email,
      password: pw,
      type: 'account',
      role: 'admin',
      locationIds: [who.locationId],
    }),
  })
  if (!created.ok || !created.data?.id) {
    const msg = String(created.data?.message ?? '')
    console.error('crm-login: create failed', created.status, msg.slice(0, 200))
    return { status: 400, body: { error: /password/i.test(msg) ? msg : 'We could not create your login. Please try again or contact Kickbord.' } }
  }
  // If they also used the kickbord.com onboarding, mark the login there too (no-op otherwise).
  await sb
    .from('client_onboardings')
    .update({ ghl_user_id: created.data.id, login_email: who.email, login_created_at: new Date().toISOString() })
    .eq('location_id', who.locationId)
    .is('login_created_at', null)
  console.log('crm-login: created', who.companyId, who.locationId)
  return { status: 200, body: { state: 'created', email: who.email, crmUrl: crmUrl(who.locationId) } }
}

// ---------- HTTP ----------
const ALLOWED_ORIGINS = new Set(['https://www.kickbord.com', 'https://kickbord.com', 'http://localhost:3100'])
function cors(req: Request): Record<string, string> {
  const o = req.headers.get('origin') ?? ''
  return ALLOWED_ORIGINS.has(o)
    ? { 'Access-Control-Allow-Origin': o, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'content-type', Vary: 'Origin' }
    : {}
}

Deno.serve(async (req) => {
  const h = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...cors(req) }
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: h })
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'method not allowed' }), { status: 405, headers: h })
  try {
    const raw = await req.text()
    if (raw.length > 10_000) return new Response(JSON.stringify({ error: 'Request too large.' }), { status: 413, headers: h })
    const body = JSON.parse(raw || '{}') as Row
    const run = body.action === 'session' ? actionSession : body.action === 'create' ? actionCreate : null
    if (!run) return new Response(JSON.stringify({ error: 'unknown action' }), { status: 400, headers: h })
    const out = await run(body)
    return new Response(JSON.stringify(out.body), { status: out.status, headers: h })
  } catch (e) {
    console.error('crm-login error', String(e).slice(0, 300))
    return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), { status: 500, headers: h })
  }
})
