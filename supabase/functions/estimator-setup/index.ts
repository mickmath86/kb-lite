// Kickbord estimator setup API (Supabase Edge Function).
//
// Used by kickbord.com/estimator-setup, where a client enters the prices their estimator will show.
// A client is addressed by an unguessable setup token. All access uses the service role; the tables
// have RLS enabled with no policies.
//
// Actions (POST JSON { action, token, ... }):
//   load      fetch the client's questionnaire data (price rows, add-ons, settings, test scenarios).
//   save      autosave changes. Locked once the estimator is approved.
//   submit    validate, mark every complete price as approved by the client, set status to submitted.
//   approve   (admin, header x-admin-token) go live: status approved, pricing_version + 1.
//   reopen    (admin) unlock a client for edits (status back to draft).
import { createClient } from 'npm:@supabase/supabase-js@2'

const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false, autoRefreshToken: false },
})

type Row = Record<string, any>

const ORIGIN_OK = [
  /^https:\/\/(www\.)?kickbord\.com$/,
  /^https:\/\/kickbord-[a-z0-9-]+-mickmath86s-projects\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
]
function cors(origin: string | null) {
  const ok = origin && ORIGIN_OK.some((re) => re.test(origin))
  return {
    'Access-Control-Allow-Origin': ok ? origin! : 'https://www.kickbord.com',
    'Access-Control-Allow-Headers': 'content-type, authorization, apikey, x-admin-token',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  }
}
function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...cors(origin) },
  })
}

async function secret(name: string): Promise<string | null> {
  const { data, error } = await sb.rpc('onboarding_secret', { p_name: name })
  if (error) throw new Error(`secret ${name}: ${error.message}`)
  return (data as string | null) ?? null
}
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let d = 0
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return d === 0
}
async function adminOk(req: Request) {
  const given = req.headers.get('x-admin-token') ?? ''
  const real = (await secret('onboarding_admin_token')) ?? ''
  return given.length > 0 && safeEqual(given, real)
}

const TOKEN_RE = /^[a-f0-9]{48}$/
async function clientByToken(token: unknown): Promise<Row | null> {
  if (typeof token !== 'string' || !TOKEN_RE.test(token)) return null
  const { data } = await sb.from('estimator_clients').select('*').eq('setup_token', token).maybeSingle()
  return data
}

const SETTING_KEYS = [
  'default_brand', 'rounding', 'disclaimer', 'repair_message', 'commercial_message', 'site_visit_message',
  'no_price_message', 'financing_message', 'valid_days', 'not_sure_220', 'price_includes', 'tier_names',
]
const MAX_PRICE = 1_000_000

// Parse a money value: '' / null -> null; otherwise a non-negative number or NaN.
function money(v: unknown): number | null {
  if (v === null || v === undefined || v === '') return null
  const n = typeof v === 'number' ? v : Number(String(v).replace(/[$,\s]/g, ''))
  if (!Number.isFinite(n) || n < 0 || n > MAX_PRICE) return NaN
  return Math.round(n * 100) / 100
}
const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

async function loadAll(c: Row) {
  const [rows, addons, scen] = await Promise.all([
    sb.from('estimator_price_rows').select('id,section,group_label,row_label,when_answers,low,high,quote_mode').eq('client_id', c.id).order('section'),
    sb.from('estimator_addons').select('id,key,label,applies_when,included,price_type,unit_answer,low,high,show_line,notes,position').eq('client_id', c.id).order('position'),
    sb.from('estimator_test_scenarios').select('id,position,label,answers,client_low,client_high,client_note').eq('client_id', c.id).order('position'),
  ])
  return {
    client: {
      name: c.name, slug: c.slug, status: c.status, submitted_at: c.submitted_at, approved_at: c.approved_at,
      settings: c.settings,
    },
    prices: rows.data ?? [],
    addons: (addons.data ?? []).map((a: Row) => ({ ...a, askable: !String(a.notes ?? '').startsWith('Not asked yet') })),
    scenarios: scen.data ?? [],
  }
}

async function actionLoad(body: Row) {
  const c = await clientByToken(body.token)
  if (!c) return { status: 404, body: { error: 'This link is not valid. Please use the link from your email.' } }
  return { status: 200, body: await loadAll(c) }
}

async function applySave(c: Row, body: Row): Promise<string[]> {
  const errors: string[] = []

  for (const p of Array.isArray(body.prices) ? body.prices.slice(0, 400) : []) {
    const low = money(p.low), high = money(p.high)
    if (Number.isNaN(low) || Number.isNaN(high)) { errors.push('A price was not a valid amount.'); continue }
    const patch: Row = { low, high, updated_at: new Date().toISOString() }
    if (p.quote_mode === 'range' || p.quote_mode === 'starting_at' || p.quote_mode === 'site_visit') patch.quote_mode = p.quote_mode
    await sb.from('estimator_price_rows').update(patch).eq('id', p.id).eq('client_id', c.id)
  }

  for (const a of Array.isArray(body.addons) ? body.addons.slice(0, 100) : []) {
    const low = money(a.low), high = money(a.high)
    if (Number.isNaN(low) || Number.isNaN(high)) { errors.push('An add-on price was not a valid amount.'); continue }
    const patch: Row = { low, high }
    if (typeof a.included === 'boolean') patch.included = a.included
    if (typeof a.show_line === 'boolean') patch.show_line = a.show_line
    if (['flat', 'per_unit', 'percent', 'site_visit'].includes(a.price_type)) patch.price_type = a.price_type
    await sb.from('estimator_addons').update(patch).eq('id', a.id).eq('client_id', c.id)
  }

  for (const s of Array.isArray(body.scenarios) ? body.scenarios.slice(0, 40) : []) {
    const low = money(s.client_low), high = money(s.client_high)
    if (Number.isNaN(low) || Number.isNaN(high)) { errors.push('A test quote was not a valid amount.'); continue }
    await sb.from('estimator_test_scenarios')
      .update({ client_low: low, client_high: high, client_note: text(s.client_note, 300) || null })
      .eq('id', s.id).eq('client_id', c.id)
  }

  if (body.settings && typeof body.settings === 'object') {
    const next: Row = { ...(c.settings ?? {}) }
    for (const k of SETTING_KEYS) {
      if (!(k in body.settings)) continue
      const v = body.settings[k]
      if (k === 'rounding' || k === 'valid_days') {
        const n = Number(v)
        if (Number.isFinite(n) && n >= 1 && n <= 1000) next[k] = n
      } else if (k === 'default_brand') {
        if (v === 'american-standard' || v === 'ac-pro') next[k] = v
      } else if (k === 'not_sure_220') {
        if (v === 'site_check' || v === 'allowance') next[k] = v
      } else if (k === 'tier_names') {
        const tn: Row = {}
        for (const t of ['standard', 'enhanced', 'premium']) tn[t] = text(v?.['ac-pro']?.[t], 40)
        next.tier_names = { 'ac-pro': tn }
      } else {
        next[k] = text(v, 600)
      }
    }
    await sb.from('estimator_clients').update({ settings: next, updated_at: new Date().toISOString() }).eq('id', c.id)

    // Show the client's AC Pro tier names to customers and on the quote lines.
    const names = next.tier_names?.['ac-pro']
    if (names) {
      const { data: opts } = await sb.from('estimator_options').select('id,value,label,label_by').eq('client_id', c.id).eq('question_key', 'efficiency')
      for (const o of opts ?? []) {
        const n = names[o.value]
        const by = { ...(o.label_by ?? {}) }
        const brand = { ...(by.brand ?? {}) }
        if (n) brand['ac-pro'] = `${n}: ${o.label}`; else delete brand['ac-pro']
        by.brand = brand
        await sb.from('estimator_options').update({ label_by: by }).eq('id', o.id)
      }
      const { data: rs } = await sb.from('estimator_price_rows').select('id,row_label,when_answers').eq('client_id', c.id).contains('when_answers', { brand: 'ac-pro' })
      const tiers: Row = { standard: 'Tier 1', enhanced: 'Tier 2', premium: 'Tier 3' }
      for (const r of rs ?? []) {
        const t = r.when_answers.efficiency
        const label = names[t] || tiers[t]
        const fixed = String(r.row_label ?? '').replace(/^AC Pro [^,]+,/, `AC Pro ${label},`)
        if (fixed !== r.row_label) await sb.from('estimator_price_rows').update({ row_label: fixed }).eq('id', r.id)
      }
    }
  }
  return errors
}

async function actionSave(body: Row) {
  const c = await clientByToken(body.token)
  if (!c) return { status: 404, body: { error: 'This link is not valid.' } }
  if (c.status === 'approved') return { status: 409, body: { error: 'Your pricing is live and locked. Contact Kickbord to change it.' } }
  const errors = await applySave(c, body)
  if (c.status === 'submitted') await sb.from('estimator_clients').update({ status: 'draft' }).eq('id', c.id)
  return { status: 200, body: { ok: true, errors } }
}

async function actionSubmit(body: Row) {
  const c = await clientByToken(body.token)
  if (!c) return { status: 404, body: { error: 'This link is not valid.' } }
  if (c.status === 'approved') return { status: 409, body: { error: 'Your pricing is already live.' } }
  const errors = await applySave(c, body)
  if (errors.length) return { status: 400, body: { error: errors[0] } }

  const { data: rows } = await sb.from('estimator_price_rows').select('id,row_label,low,high,quote_mode').eq('client_id', c.id)
  const half = (rows ?? []).filter((r: Row) => (r.low === null) !== (r.high === null))
  if (half.length) return { status: 400, body: { error: `"${half[0].row_label}" has only one of Low and High. Fill in both or clear both.` } }
  const bad = (rows ?? []).filter((r: Row) => r.low !== null && r.high !== null && Number(r.low) > Number(r.high))
  if (bad.length) return { status: 400, body: { error: `"${bad[0].row_label}" has a Low price above its High price.` } }
  const priced = (rows ?? []).filter((r: Row) => r.low !== null && r.high !== null)
  if (!priced.length) return { status: 400, body: { error: 'Enter at least one price before you submit.' } }

  const { data: ads } = await sb.from('estimator_addons').select('id,label,included,price_type,low,high').eq('client_id', c.id)
  for (const a of ads ?? []) {
    if ((a.low === null) !== (a.high === null)) return { status: 400, body: { error: `"${a.label}" has only one of Low and High. Fill in both or clear both.` } }
  }

  // Submitting means the client stands behind every price that has both a Low and a High.
  await sb.from('estimator_price_rows').update({ approved: true }).eq('client_id', c.id).not('low', 'is', null).not('high', 'is', null)
  await sb.from('estimator_price_rows').update({ approved: false }).eq('client_id', c.id).or('low.is.null,high.is.null')
  for (const a of ads ?? []) {
    const ok = a.included || a.price_type === 'site_visit' || (a.low !== null && a.high !== null)
    await sb.from('estimator_addons').update({ approved: ok }).eq('id', a.id)
  }
  await sb.from('estimator_clients').update({ status: 'submitted', submitted_at: new Date().toISOString() }).eq('id', c.id)
  return { status: 200, body: { ok: true, priced: priced.length, total: rows?.length ?? 0 } }
}

async function actionApprove(req: Request, body: Row) {
  if (!(await adminOk(req))) return { status: 401, body: { error: 'Unauthorized.' } }
  const slug = text(body.slug, 80)
  const { data: c } = await sb.from('estimator_clients').select('*').eq('slug', slug).maybeSingle()
  if (!c) return { status: 404, body: { error: 'Unknown client.' } }
  await sb.from('estimator_clients').update({
    status: 'approved', approved_at: new Date().toISOString(), approved_by: text(body.by, 80) || 'kickbord',
    pricing_version: (c.pricing_version ?? 0) + 1,
  }).eq('id', c.id)
  return { status: 200, body: { ok: true, public_key: c.public_key, pricing_version: (c.pricing_version ?? 0) + 1 } }
}

async function actionReopen(req: Request, body: Row) {
  if (!(await adminOk(req))) return { status: 401, body: { error: 'Unauthorized.' } }
  const { data: c } = await sb.from('estimator_clients').select('id').eq('slug', text(body.slug, 80)).maybeSingle()
  if (!c) return { status: 404, body: { error: 'Unknown client.' } }
  await sb.from('estimator_clients').update({ status: 'draft' }).eq('id', c.id)
  return { status: 200, body: { ok: true } }
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) })
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, origin)
  try {
    const raw = await req.text()
    if (raw.length > 300_000) return json({ error: 'Request too large.' }, 413, origin)
    const body = JSON.parse(raw || '{}') as Row
    const actions: Record<string, () => Promise<{ status: number; body: unknown }>> = {
      load: () => actionLoad(body),
      save: () => actionSave(body),
      submit: () => actionSubmit(body),
      approve: () => actionApprove(req, body),
      reopen: () => actionReopen(req, body),
    }
    const run = actions[String(body.action)]
    if (!run) return json({ error: 'Unknown action.' }, 400, origin)
    const out = await run()
    return json(out.body, out.status, origin)
  } catch (err) {
    console.error('estimator-setup failed', err)
    return json({ error: 'Something went wrong. Please try again.' }, 500, origin)
  }
})
