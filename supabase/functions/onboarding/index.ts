// Kickbord client onboarding API (Supabase Edge Function).
//
// Public endpoint used by kickbord.com/onboarding. A submission is addressed by an unguessable
// token (the "resume link"). All database and storage access happens here with the service role;
// the tables themselves have RLS enabled with no policies.
//
// Actions (POST JSON { action, ... }):
//   save          create or update a submission (autosave). Creates one when no token is sent.
//   load          fetch saved answers, step, and uploaded files for a token.
//   sign_upload   get a signed upload URL for the private storage bucket.
//   register_file confirm an upload and record it.
//   delete_file   remove an uploaded file.
//   complete      validate, mark completed, and send the signed webhook.
//   resend        (admin) re-send webhooks for completed submissions that were not delivered.
//   reveal_ein    (admin) decrypt the EIN for one submission.
//
// Vault secrets: onboarding_ein_key, onboarding_webhook_secret, onboarding_admin_token,
// onboarding_webhook_url ("unset" disables sending).
import { createClient } from 'npm:@supabase/supabase-js@2'

const BUCKET = 'onboarding-uploads'
const MAX_BODY_BYTES = 300_000
const MAX_FILE_BYTES = 15 * 1024 * 1024
const MAX_FILES_PER_SUBMISSION = 60
const SIGNED_URL_SECONDS = 7 * 24 * 60 * 60
const ALLOWED_MIME = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/svg+xml',
  'image/heic',
  'application/pdf',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
])

const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false, autoRefreshToken: false },
})

// ── helpers ────────────────────────────────────────────────────────────────

const ORIGIN_OK = [
  /^https:\/\/(www\.)?kickbord\.com$/,
  /^https:\/\/kickbord-[a-z0-9-]+-mickmath86s-projects\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
]

function corsHeaders(origin: string | null) {
  const allowed = origin && ORIGIN_OK.some((re) => re.test(origin))
  return {
    'Access-Control-Allow-Origin': allowed ? origin! : 'https://www.kickbord.com',
    'Access-Control-Allow-Headers': 'content-type, authorization, apikey, x-admin-token',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  }
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...corsHeaders(origin) },
  })
}

const b64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes))
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0))
const b64url = (bytes: Uint8Array) => b64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
const hex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, '0')).join('')

function newToken() {
  return b64url(crypto.getRandomValues(new Uint8Array(32)))
}

async function secret(name: string): Promise<string | null> {
  const { data, error } = await sb.rpc('onboarding_secret', { p_name: name })
  if (error) throw new Error(`secret ${name}: ${error.message}`)
  return (data as string | null) ?? null
}

async function aesKey(usage: KeyUsage[]) {
  const k = await secret('onboarding_ein_key')
  if (!k) throw new Error('EIN key missing')
  return crypto.subtle.importKey('raw', unb64(k), 'AES-GCM', false, usage)
}

async function encryptText(plain: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await aesKey(['encrypt']), new TextEncoder().encode(plain))
  return `v1.${b64(iv)}.${b64(new Uint8Array(ct))}`
}

async function decryptText(payload: string) {
  const [v, iv, ct] = payload.split('.')
  if (v !== 'v1') throw new Error('Unknown ciphertext version')
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(iv) }, await aesKey(['decrypt']), unb64(ct))
  return new TextDecoder().decode(pt)
}

async function hmacHex(key: string, message: string) {
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return hex(await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(message)))
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let r = 0
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return r === 0
}

function cleanDemoUrl(raw: unknown): string | null {
  if (typeof raw !== 'string' || raw.length > 500) return null
  try {
    const u = new URL(raw.trim())
    if (u.protocol !== 'https:' || u.username || u.password) return null
    const h = u.hostname.toLowerCase()
    if (!h.includes('.') || h === 'localhost' || /^\d{1,3}(\.\d{1,3}){3}$/.test(h) || h.includes(':')) return null
    return u.toString()
  } catch {
    return null
  }
}

const KEY_RE = /^[a-z0-9_]{1,60}$/
function cleanValue(v: unknown, depth = 0): unknown {
  if (depth > 4) return null
  if (typeof v === 'string') return v.slice(0, 5000)
  if (typeof v === 'number') return Number.isFinite(v) ? v : null
  if (typeof v === 'boolean' || v === null) return v
  if (Array.isArray(v)) return v.slice(0, 100).map((x) => cleanValue(x, depth + 1))
  if (typeof v === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, x] of Object.entries(v as Record<string, unknown>).slice(0, 100)) {
      if (KEY_RE.test(k)) out[k] = cleanValue(x, depth + 1)
    }
    return out
  }
  return null
}

function cleanAnswers(raw: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!KEY_RE.test(k) || k === 'ein') continue // EIN is stored encrypted, never in answers
    out[k] = cleanValue(v)
  }
  return out
}

const str = (v: unknown, max = 200) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null)
const yn = (v: unknown) => (v === 'yes' ? true : v === 'no' ? false : null)

function derivedColumns(a: Record<string, unknown>) {
  return {
    first_name: str(a.first_name),
    last_name: str(a.last_name),
    email: str(a.email)?.toLowerCase() ?? null,
    phone: str(a.mobile, 40),
    company_name: str(a.company_name),
    trade: str(a.trade),
    has_ein: yn(a.has_ein),
    has_website: yn(a.has_website),
    has_gbp: yn(a.has_gbp),
    demo_feedback: str(a.demo_feedback, 40),
  }
}

// deno-lint-ignore no-explicit-any
type Row = Record<string, any>

async function findByToken(token: unknown): Promise<Row | null> {
  if (typeof token !== 'string' || token.length < 20 || token.length > 100) return null
  const { data } = await sb.from('client_onboardings').select('*').eq('token', token).maybeSingle()
  return data
}

async function listFiles(submissionId: string) {
  const { data } = await sb
    .from('client_onboarding_files')
    .select('id, field_id, original_name, content_type, size_bytes, storage_path, created_at')
    .eq('submission_id', submissionId)
    .order('created_at')
  return data ?? []
}

// ── actions ────────────────────────────────────────────────────────────────

async function applyEin(update: Row, ein: unknown) {
  if (ein === undefined) return null
  if (ein === '' || ein === null) {
    update.ein_encrypted = null
    update.ein_last4 = null
    return null
  }
  const digits = String(ein).replace(/\D/g, '')
  if (digits.length !== 9) return 'EIN must be 9 digits.'
  update.ein_encrypted = await encryptText(digits)
  update.ein_last4 = digits.slice(-4)
  return null
}

async function actionSave(body: Row) {
  if (body.hp) return { status: 200, body: { ok: true, token: 'ignored' } } // honeypot
  const answers = cleanAnswers(body.answers)
  const step = Number.isInteger(body.step) ? Math.max(0, Math.min(99, body.step)) : 0
  const base: Row = {
    answers,
    current_step: step,
    ...derivedColumns(answers),
  }

  let row = body.token ? await findByToken(body.token) : null
  if (body.token && !row) return { status: 404, body: { error: 'Unknown or expired link.' } }
  if (row?.status === 'completed') return { status: 200, body: { ok: true, token: row.token, status: 'completed' } }

  const einErr = await applyEin(base, body.ein)
  if (einErr) return { status: 400, body: { error: einErr } }

  if (!row) {
    const meta = body.meta && typeof body.meta === 'object' ? body.meta : {}
    const insert = {
      ...base,
      token: newToken(),
      plan: str(meta.plan, 60),
      ghl_contact_id: str(meta.cid, 120),
      demo_url: cleanDemoUrl(meta.demo),
    }
    const { data, error } = await sb.from('client_onboardings').insert(insert).select('*').single()
    if (error) return { status: 500, body: { error: 'Could not save. Please try again.' } }
    row = data
  } else {
    const { error } = await sb.from('client_onboardings').update(base).eq('id', row.id)
    if (error) return { status: 500, body: { error: 'Could not save. Please try again.' } }
  }
  return { status: 200, body: { ok: true, token: row!.token, status: 'in_progress' } }
}

async function actionLoad(body: Row) {
  const row = await findByToken(body.token)
  if (!row) return { status: 404, body: { error: 'Unknown or expired link.' } }
  const files = await listFiles(row.id)
  return {
    status: 200,
    body: {
      token: row.token,
      status: row.status,
      step: row.current_step,
      answers: row.answers,
      plan: row.plan,
      demo_url: row.demo_url,
      has_ein_on_file: !!row.ein_encrypted,
      ein_last4: row.ein_last4,
      files: files.map((f) => ({ id: f.id, field_id: f.field_id, name: f.original_name, size: f.size_bytes, content_type: f.content_type })),
    },
  }
}

function safeName(name: string) {
  return name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/^\.+/, '').slice(-80) || 'file'
}

async function actionSignUpload(body: Row) {
  const row = await findByToken(body.token)
  if (!row) return { status: 404, body: { error: 'Unknown or expired link.' } }
  if (row.status === 'completed') return { status: 409, body: { error: 'This onboarding is already submitted.' } }
  const field = typeof body.field_id === 'string' && KEY_RE.test(body.field_id) ? body.field_id : null
  const filename = str(body.filename, 200)
  const type = str(body.content_type, 100)
  const size = Number(body.size)
  if (!field || !filename || !type) return { status: 400, body: { error: 'Missing file details.' } }
  if (!ALLOWED_MIME.has(type)) return { status: 400, body: { error: 'That file type is not supported. Use PNG, JPG, WebP, SVG, PDF, CSV, or Excel.' } }
  if (!(size > 0) || size > MAX_FILE_BYTES) return { status: 400, body: { error: 'Files must be 15 MB or smaller.' } }
  const { count } = await sb.from('client_onboarding_files').select('id', { count: 'exact', head: true }).eq('submission_id', row.id)
  if ((count ?? 0) >= MAX_FILES_PER_SUBMISSION) return { status: 400, body: { error: 'Too many files uploaded.' } }

  const path = `${row.id}/${field}/${crypto.randomUUID()}-${safeName(filename)}`
  const { data, error } = await sb.storage.from(BUCKET).createSignedUploadUrl(path)
  if (error || !data) return { status: 500, body: { error: 'Could not start the upload.' } }
  return { status: 200, body: { path: data.path, upload_token: data.token } }
}

async function actionRegisterFile(body: Row) {
  const row = await findByToken(body.token)
  if (!row) return { status: 404, body: { error: 'Unknown or expired link.' } }
  const path = typeof body.path === 'string' ? body.path : ''
  if (!path.startsWith(`${row.id}/`) || path.includes('..')) return { status: 400, body: { error: 'Invalid file path.' } }
  const field = typeof body.field_id === 'string' && KEY_RE.test(body.field_id) ? body.field_id : null
  if (!field) return { status: 400, body: { error: 'Invalid field.' } }
  const check = await sb.storage.from(BUCKET).createSignedUrl(path, 30)
  if (check.error) return { status: 400, body: { error: 'Upload not found. Please try again.' } }
  const { data, error } = await sb
    .from('client_onboarding_files')
    .insert({
      submission_id: row.id,
      field_id: field,
      storage_path: path,
      original_name: str(body.name, 200) ?? 'file',
      content_type: str(body.content_type, 100),
      size_bytes: Number(body.size) || null,
    })
    .select('id, field_id, original_name, size_bytes, content_type')
    .single()
  if (error) return { status: 500, body: { error: 'Could not record the file.' } }
  return { status: 200, body: { file: { id: data.id, field_id: data.field_id, name: data.original_name, size: data.size_bytes, content_type: data.content_type } } }
}

async function actionDeleteFile(body: Row) {
  const row = await findByToken(body.token)
  if (!row) return { status: 404, body: { error: 'Unknown or expired link.' } }
  if (row.status === 'completed') return { status: 409, body: { error: 'This onboarding is already submitted.' } }
  const { data: f } = await sb.from('client_onboarding_files').select('id, storage_path').eq('id', body.file_id).eq('submission_id', row.id).maybeSingle()
  if (!f) return { status: 404, body: { error: 'File not found.' } }
  await sb.storage.from(BUCKET).remove([f.storage_path])
  await sb.from('client_onboarding_files').delete().eq('id', f.id)
  return { status: 200, body: { ok: true } }
}

// Minimum the server insists on, regardless of client behavior.
function missingCore(row: Row): string[] {
  const a = row.answers ?? {}
  const need: [string, unknown][] = [
    ['first_name', a.first_name],
    ['last_name', a.last_name],
    ['email', a.email],
    ['mobile', a.mobile],
    ['company_name', a.company_name],
    ['trade', a.trade],
    ['consent_a2p', a.consent_a2p],
    ['consent_terms', a.consent_terms],
    ['signature_name', a.signature_name],
  ]
  const missing = need.filter(([, v]) => v === undefined || v === null || v === '' || v === false).map(([k]) => k)
  if (a.has_ein === 'yes' && !row.ein_encrypted) missing.push('ein')
  return missing
}

async function buildPayload(row: Row) {
  const files = await listFiles(row.id)
  const out = []
  for (const f of files) {
    const { data } = await sb.storage.from(BUCKET).createSignedUrl(f.storage_path, SIGNED_URL_SECONDS)
    out.push({
      field_id: f.field_id,
      name: f.original_name,
      content_type: f.content_type,
      size_bytes: f.size_bytes,
      url: data?.signedUrl ?? null,
      url_expires_at: new Date(Date.now() + SIGNED_URL_SECONDS * 1000).toISOString(),
    })
  }
  const a = row.answers ?? {}
  return {
    event: 'onboarding.completed',
    version: 1,
    submission_id: row.id,
    submitted_at: row.completed_at,
    source: row.source,
    plan: row.plan,
    ghl_contact_id: row.ghl_contact_id,
    demo_url: row.demo_url,
    demo_feedback: row.demo_feedback,
    contact: {
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      phone: row.phone,
      company_name: row.company_name,
      role: a.role ?? null,
    },
    a2p: {
      has_ein: row.has_ein,
      ein_on_file: !!row.ein_encrypted,
      ein_last4: row.ein_last4,
      path: row.has_ein ? 'standard' : 'sole_proprietor_or_pending',
    },
    answers: a,
    files: out,
  }
}

async function sendWebhook(row: Row): Promise<{ status: 'sent' | 'failed' | 'pending_config'; error?: string }> {
  const url = await secret('onboarding_webhook_url')
  if (!url || url === 'unset') return { status: 'pending_config' }
  try {
    const payload = JSON.stringify(await buildPayload(row))
    const ts = String(Math.floor(Date.now() / 1000))
    const sig = await hmacHex((await secret('onboarding_webhook_secret'))!, `${ts}.${payload}`)
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 10_000)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kickbord-Event': 'onboarding.completed',
        'X-Kickbord-Timestamp': ts,
        'X-Kickbord-Signature': `sha256=${sig}`,
      },
      body: payload,
      signal: ctrl.signal,
    })
    clearTimeout(timer)
    if (!res.ok) return { status: 'failed', error: `HTTP ${res.status}` }
    return { status: 'sent' }
  } catch (e) {
    return { status: 'failed', error: String((e as Error).message ?? e).slice(0, 300) }
  }
}

async function deliver(row: Row) {
  const r = await sendWebhook(row)
  await sb
    .from('client_onboardings')
    .update({
      webhook_status: r.status,
      webhook_attempts: (row.webhook_attempts ?? 0) + (r.status === 'pending_config' ? 0 : 1),
      webhook_last_error: r.error ?? null,
      webhook_sent_at: r.status === 'sent' ? new Date().toISOString() : null,
    })
    .eq('id', row.id)
  return r
}

async function actionComplete(body: Row) {
  let saved: { status: number; body: Row } | null = null
  if (body.answers) {
    saved = await actionSave({ ...body, step: body.step ?? 99 })
    if (saved.status !== 200) return saved
  }
  const row = await findByToken(body.token ?? saved?.body?.token)
  if (!row) return { status: 404, body: { error: 'Unknown or expired link.' } }
  if (row.status === 'completed') return { status: 200, body: { ok: true, status: 'completed' } }

  const missing = missingCore(row)
  if (missing.length) return { status: 400, body: { error: 'Some required answers are missing.', missing } }

  const { data: done, error } = await sb
    .from('client_onboardings')
    .update({ status: 'completed', completed_at: new Date().toISOString(), current_step: 99 })
    .eq('id', row.id)
    .eq('status', 'in_progress')
    .select('*')
    .single()
  if (error || !done) return { status: 200, body: { ok: true, status: 'completed' } }
  const hook = await deliver(done)
  return { status: 200, body: { ok: true, status: 'completed', webhook: hook.status } }
}

async function adminOk(req: Request) {
  const given = req.headers.get('x-admin-token') ?? ''
  const real = (await secret('onboarding_admin_token')) ?? ''
  return given.length > 0 && safeEqual(given, real)
}

async function actionResend(req: Request, body: Row) {
  if (!(await adminOk(req))) return { status: 401, body: { error: 'Unauthorized.' } }
  let q = sb.from('client_onboardings').select('*').eq('status', 'completed')
  q = body.id ? q.eq('id', body.id) : q.neq('webhook_status', 'sent')
  const { data } = await q.limit(50)
  const results = []
  for (const row of data ?? []) results.push({ id: row.id, ...(await deliver(row)) })
  return { status: 200, body: { results } }
}

async function actionRevealEin(req: Request, body: Row) {
  if (!(await adminOk(req))) return { status: 401, body: { error: 'Unauthorized.' } }
  const { data } = await sb.from('client_onboardings').select('ein_encrypted').eq('id', body.id).maybeSingle()
  if (!data?.ein_encrypted) return { status: 404, body: { error: 'No EIN on file.' } }
  return { status: 200, body: { ein: await decryptText(data.ein_encrypted) } }
}

// ── server ─────────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(origin) })
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, origin)
  if (origin && !ORIGIN_OK.some((re) => re.test(origin))) return json({ error: 'Origin not allowed.' }, 403, origin)

  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) return json({ error: 'Request too large.' }, 413, origin)
  let body: Row
  try {
    body = JSON.parse(raw)
  } catch {
    return json({ error: 'Invalid JSON.' }, 400, origin)
  }
  if (!body || typeof body !== 'object') return json({ error: 'Invalid request.' }, 400, origin)

  try {
    const run = ({
      save: () => actionSave(body),
      load: () => actionLoad(body),
      sign_upload: () => actionSignUpload(body),
      register_file: () => actionRegisterFile(body),
      delete_file: () => actionDeleteFile(body),
      complete: () => actionComplete(body),
      resend: () => actionResend(req, body),
      reveal_ein: () => actionRevealEin(req, body),
    } as Record<string, () => Promise<{ status: number; body: unknown }>>)[body.action as string]
    if (!run) return json({ error: 'Unknown action.' }, 400, origin)
    const r = await run()
    return json(r.body, r.status, origin)
  } catch (e) {
    console.error('onboarding error', e)
    return json({ error: 'Something went wrong. Please try again.' }, 500, origin)
  }
})
