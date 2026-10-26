// Kickbord estimator calibration API (Supabase Edge Function).
//
// Used by kickbord.com/estimator-calibrate: a swipe-style alternative to /estimator-setup.
// The client sees one sample job at a time with a suggested price and answers too low / about right /
// too high. The server owns the logic: it keeps a handful of pricing "dials" (base price per system
// type, size, tier and brand ratios, mini-split rooms, add-ons, range width), narrows each dial with
// every answer, and only on confirm expands the dials into the same estimator_price_rows /
// estimator_addons the detailed questionnaire uses.
//
// Same setup token as /estimator-setup. Access uses the service role; tables have RLS with no policies.
//
// Actions (POST JSON { action, token, ... }):
//   load      current card (+ summary once every card is answered)
//   answer    { card_key, answer, magnitude?, value?, values?, choice? } -> saves the swipe, returns next card
//   undo      reverts the last swipe of this run
//   restart   starts a new run. On a "-test" client it also blanks that client's prices.
//   confirm   writes the calculated prices as client-approved and marks the estimator submitted
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
    'Access-Control-Allow-Headers': 'content-type, authorization, apikey',
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

const TOKEN_RE = /^[a-f0-9]{48}$/
async function clientByToken(token: unknown): Promise<Row | null> {
  if (typeof token !== 'string' || !TOKEN_RE.test(token)) return null
  const { data } = await sb.from('estimator_clients').select('*').eq('setup_token', token).maybeSingle()
  return data
}

// ---------------------------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------------------------

const MAX_TRIES = 4 // answers per dial before we settle on the narrowed guess
const WIDTHS = [0.04, 0.06, 0.08, 0.11, 0.15] // half-width of the Low-High range shown to customers

// Starting suggestions: typical Southern California installed prices (2026 public cost guides).
// They only seed the first card; the client's answers set the real numbers.
const START = {
  complete: 14000, 'heat-pump': 12500, 'ac-only': 8500, 'furnace-only': 6000,
  ms1: 5000, msExtra: 3000,
  size_small: 0.85, size_large: 1.12, tier_enh: 1.18, tier_prem: 1.4, brand_acpro: 0.9,
}
const SYSTEM_LABEL: Record<string, string> = {
  complete: 'AC + gas furnace', 'heat-pump': 'Heat pump system', 'ac-only': 'AC only', 'furnace-only': 'Gas furnace only',
}
const SYSTEM_SCOPE: Record<string, string> = {
  complete: 'Replace both the air conditioner and the gas furnace',
  'heat-pump': 'Replace with an all-electric heat pump system',
  'ac-only': 'Replace the outdoor AC unit and indoor coil',
  'furnace-only': 'Replace the gas furnace only',
}
const SIZE_LABEL: Record<string, string> = {
  'under-1200': 'Under 1,200 sq ft', '1200-1800': '1,200 to 1,800 sq ft', '1800-2500': '1,800 to 2,500 sq ft', 'over-2500': 'Over 2,500 sq ft',
}
const AS_TIER: Record<string, string> = { standard: 'Silver', enhanced: 'Gold', premium: 'Platinum' }

// Add-ons asked on this page (the rest need a customer question first, or are always a site visit).
const ADDONS: { key: string; start: number; short: string }[] = [
  { key: 'ADD-PERMIT', start: 500, short: 'Permit and inspection' },
  { key: 'ADD-HAULAWAY', start: 250, short: 'Haul away the old equipment' },
  { key: 'ADD-THERMOSTAT', start: 350, short: 'New thermostat' },
  { key: 'ADD-PAD', start: 250, short: 'New equipment pad' },
  { key: 'ADD-LINESET', start: 1500, short: 'Replace the refrigerant line set' },
  { key: 'ADD-ELECTRICAL', start: 1200, short: 'New 220/240V circuit for a central system' },
  { key: 'ADD-MS-ELECTRICAL', start: 900, short: 'New 220/240V circuit for a mini-split' },
  { key: 'ADD-EMERGENCY', start: 200, short: 'After-hours or emergency fee' },
]
const SERVICES: { detail: string; start: number }[] = [
  { detail: 'single-tuneup', start: 150 },
  { detail: 'two-tuneup', start: 250 },
  { detail: 'plan', start: 240 },
  { detail: 'duct-repair', start: 1500 },
  { detail: 'duct-replace', start: 8000 },
  { detail: 'air-quality', start: 1800 },
  { detail: 'airflow', start: 450 },
]

type Dial = { value: number; lb: number | null; ub: number | null; n: number; done: boolean; settled: boolean; start: number }
type State = {
  v: 1
  step: number
  dials: Record<string, Dial>
  width: { i: number; n: number; done: boolean } | null
  included: string[] | null
  not_sure_220: string | null
  tier_names: { standard: string; enhanced: string; premium: string } | null
  sells_acpro: boolean | null
  services: boolean | null
  checks: Record<string, { ok: boolean; low: number | null; high: number | null }>
}
const fresh = (): State => ({
  v: 1, step: 0, dials: {}, width: null, included: null, not_sure_220: null, tier_names: null,
  sells_acpro: null, services: null, checks: {},
})

function roundPrice(x: number) {
  const step = x < 1000 ? 10 : x < 5000 ? 50 : 100
  return Math.max(step, Math.round(x / step) * step)
}
const val = (s: State, k: string) => s.dials[k]?.value

// Ratios and bases derived from the dials answered so far (falls back to the starting suggestion).
function model(s: State) {
  const complete = val(s, 'complete') ?? START.complete
  const base: Record<string, number> = {
    complete,
    'heat-pump': val(s, 'heat-pump') ?? START['heat-pump'],
    'ac-only': val(s, 'ac-only') ?? START['ac-only'],
    'furnace-only': val(s, 'furnace-only') ?? START['furnace-only'],
  }
  const small = (val(s, 'size_small') ?? complete * START.size_small) / complete
  const large = (val(s, 'size_large') ?? complete * START.size_large) / complete
  const size: Record<string, number> = { 'under-1200': small, '1200-1800': (small + 1) / 2, '1800-2500': 1, 'over-2500': large }
  const enh = (val(s, 'tier_enh') ?? complete * START.tier_enh) / complete
  const prem = (val(s, 'tier_prem') ?? complete * START.tier_prem) / complete
  const tier: Record<string, number> = { standard: 1, enhanced: enh, premium: prem }
  const brand: Record<string, number> = {
    'american-standard': 1,
    'ac-pro': (val(s, 'brand_acpro') ?? complete * START.brand_acpro) / complete,
  }
  const ms1 = val(s, 'ms_1') ?? START.ms1
  const ms3 = val(s, 'ms_3') ?? ms1 + 2 * START.msExtra
  const msExtra = Math.max(0, (ms3 - ms1) / 2)
  const w = WIDTHS[s.width?.i ?? 2]
  return { base, size, tier, brand, ms1, msExtra, w }
}
function range(mid: number, w: number, rnd = 100): [number, number] {
  const r = (x: number) => Math.max(rnd, Math.round(x / rnd) * rnd)
  return [r(mid * (1 - w)), r(mid * (1 + w))]
}
function addonRange(v: number, w: number): [number, number] {
  const r = (x: number) => roundPrice(x)
  return [r(v * (1 - w)), r(v * (1 + w))]
}

// ---------------------------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------------------------

type Stage = { key: string; kind: string }
type Ctx = { client: Row; addons: Row[]; services: Row[]; scenarios: Row[] }

function stages(s: State, ctx: Ctx): Stage[] {
  const out: Stage[] = []
  for (const k of ['complete', 'heat-pump', 'ac-only', 'furnace-only', 'size_small', 'size_large', 'tier_enh', 'tier_prem']) out.push({ key: k, kind: 'price' })
  out.push({ key: 'width', kind: 'width' })
  out.push({ key: 'sells_acpro', kind: 'choice' })
  if (s.sells_acpro !== false) {
    out.push({ key: 'tier_names', kind: 'tier_names' })
    out.push({ key: 'brand_acpro', kind: 'price' })
  }
  out.push({ key: 'ms_1', kind: 'price' }, { key: 'ms_3', kind: 'price' })
  out.push({ key: 'included', kind: 'multi' })
  const present = new Set(ctx.addons.map((a) => a.key))
  for (const a of ADDONS) {
    if (!present.has(a.key)) continue
    if (s.included === null || !s.included.includes(a.key)) out.push({ key: `addon:${a.key}`, kind: 'price' })
  }
  out.push({ key: 'not_sure_220', kind: 'choice' })
  out.push({ key: 'services', kind: 'choice' })
  if (s.services) for (const sv of SERVICES) if (ctx.services.some((r) => r.when_answers.serviceDetail === sv.detail)) out.push({ key: `svc:${sv.detail}`, kind: 'price' })
  for (const sc of checkScenarios(s, ctx)) out.push({ key: `check:${sc.id}`, kind: 'check' })
  return out
}

function stageDone(st: Stage, s: State): boolean {
  if (st.kind === 'price') return !!s.dials[st.key]?.done
  if (st.key === 'width') return !!s.width?.done
  if (st.key === 'sells_acpro') return s.sells_acpro !== null
  if (st.key === 'tier_names') return s.tier_names !== null
  if (st.key === 'included') return s.included !== null
  if (st.key === 'not_sure_220') return s.not_sure_220 !== null
  if (st.key === 'services') return s.services !== null
  if (st.kind === 'check') return !!s.checks[st.key.slice(6)]
  return true
}

function tierName(s: State, brand: string, tier: string) {
  if (brand === 'american-standard') return AS_TIER[tier]
  const n = s.tier_names?.[tier as 'standard']?.trim()
  return n || `Tier ${['standard', 'enhanced', 'premium'].indexOf(tier) + 1}`
}
const brandName = (b: string) => (b === 'ac-pro' ? 'AC Pro' : 'American Standard')

// What a price dial describes, and its starting suggestion given what we know so far.
function dialSpec(key: string, s: State, ctx: Ctx): { title: string; details: string[]; start: number; scenario: Row; eyebrow: string } {
  const m = model(s)
  const job = (sys: string, size: string, brand: string, tier: string) => ({
    eyebrow: 'Home replacement',
    title: SYSTEM_LABEL[sys],
    details: [SYSTEM_SCOPE[sys], `${SIZE_LABEL[size]} home`, `${brandName(brand)} ${tierName(s, brand, tier)}`],
    scenario: { systemType: sys, homeSize: size, brand, efficiency: tier },
  })
  if (key in SYSTEM_LABEL) return { ...job(key, '1800-2500', 'american-standard', 'standard'), start: START[key as 'complete'] }
  const c = m.base.complete
  if (key === 'size_small') return { ...job('complete', 'under-1200', 'american-standard', 'standard'), start: c * START.size_small }
  if (key === 'size_large') return { ...job('complete', 'over-2500', 'american-standard', 'standard'), start: c * START.size_large }
  if (key === 'tier_enh') return { ...job('complete', '1800-2500', 'american-standard', 'enhanced'), start: c * START.tier_enh }
  if (key === 'tier_prem') {
    const enh = val(s, 'tier_enh') ?? c * START.tier_enh
    return { ...job('complete', '1800-2500', 'american-standard', 'premium'), start: Math.max(c * START.tier_prem, enh * 1.12) }
  }
  if (key === 'brand_acpro') return { ...job('complete', '1800-2500', 'ac-pro', 'standard'), start: c * START.brand_acpro }
  if (key === 'ms_1' || key === 'ms_3') {
    const rooms = key === 'ms_1' ? 1 : 3
    const start = key === 'ms_1' ? START.ms1 : m.ms1 + 2 * START.msExtra
    return {
      eyebrow: 'Ductless mini-split', title: `Mini-split, ${rooms === 1 ? '1 room' : '3 rooms'}`,
      details: [rooms === 1 ? 'One outdoor unit and one wall-mounted indoor unit' : 'One outdoor unit and three wall-mounted indoor units', 'American Standard Silver', 'Standard install, 220V already at the outdoor unit'],
      scenario: { systemType: 'mini-split', miniSplitRooms: String(rooms), brand: 'american-standard', efficiency: 'standard' }, start,
    }
  }
  if (key.startsWith('addon:')) {
    const a = ADDONS.find((x) => x.key === key.slice(6))!
    const row = ctx.addons.find((x) => x.key === a.key)
    return {
      eyebrow: 'Extra charge', title: a.short,
      details: ['Added on top of the system price when it applies', row?.notes ? String(row.notes) : ''].filter(Boolean),
      scenario: { addon: a.key }, start: a.start,
    }
  }
  if (key.startsWith('svc:')) {
    const d = key.slice(4)
    const row = ctx.services.find((r) => r.when_answers.serviceDetail === d)
    const sv = SERVICES.find((x) => x.detail === d)!
    return { eyebrow: d === 'plan' || d.endsWith('tuneup') ? 'Maintenance' : 'Ductwork and air quality', title: row?.row_label ?? d, details: ['Typical home'], scenario: { serviceDetail: d }, start: sv.start }
  }
  throw new Error(`unknown dial ${key}`)
}

// Scenarios used for the final check: the client's own sample jobs that the estimator can price.
function checkScenarios(s: State, ctx: Ctx) {
  return ctx.scenarios.filter((x) => {
    const a = x.answers ?? {}
    if (a.projectType !== 'replacement' || a.propertyType === 'commercial') return false
    if (a.brand === 'ac-pro' && s.sells_acpro === false) return false
    return true
  }).slice(0, 3)
}

// Price the model gives a customer's answers (mirrors estimator_quote for replacements).
function quoteFor(answers: Row, s: State, ctx: Ctx) {
  const m = model(s)
  const brand = answers.brand === 'no-preference' || !answers.brand ? (ctx.client.settings?.default_brand ?? 'american-standard') : answers.brand
  const tier = answers.efficiency ?? 'standard'
  let mid: number
  if (answers.systemType === 'mini-split') {
    const rooms = Number(answers.miniSplitRooms ?? 1)
    mid = (m.ms1 + (rooms - 1) * m.msExtra) * m.tier[tier] * m.brand[brand]
  } else {
    mid = m.base[answers.systemType] * m.size[answers.homeSize ?? '1800-2500'] * m.tier[tier] * m.brand[brand]
  }
  let [lo, hi] = range(mid, m.w)
  const lines: { label: string; low: number; high: number }[] = [{ label: 'System, installed', low: lo, high: hi }]
  for (const a of ctx.addons) {
    const spec = ADDONS.find((x) => x.key === a.key)
    if (!spec || s.included?.includes(a.key)) continue
    let ok = true
    for (const [k, v] of Object.entries(a.applies_when ?? {})) {
      const got = answers[k] ?? (k === 'projectType' ? 'replacement' : '')
      if (Array.isArray(v) ? !v.includes(got) : got !== v) ok = false
    }
    if (!ok) continue
    const d = s.dials[`addon:${a.key}`]
    if (!d) continue
    const [alo, ahi] = addonRange(d.value, m.w)
    lo += alo; hi += ahi
    lines.push({ label: spec.short, low: alo, high: ahi })
  }
  return { low: Math.round(lo / 100) * 100, high: Math.round(hi / 100) * 100, lines }
}

function scenarioText(a: Row, s: State, ctx: Ctx) {
  const brand = a.brand === 'no-preference' ? (ctx.client.settings?.default_brand ?? 'american-standard') : a.brand
  const sys = a.systemType === 'mini-split' ? `Mini-split, ${a.miniSplitRooms} room${a.miniSplitRooms === '1' ? '' : 's'}` : SYSTEM_LABEL[a.systemType]
  const details = [a.systemType === 'mini-split' ? 'Ductless' : SIZE_LABEL[a.homeSize] + ' home', `${brandName(brand)} ${tierName(s, brand, a.efficiency ?? 'standard')}`]
  if (a.has220 === 'yes') details.push('220V already at the outdoor unit')
  return { title: sys, details }
}

function cardFor(st: Stage, s: State, ctx: Ctx) {
  if (st.kind === 'price') {
    const spec = dialSpec(st.key, s, ctx)
    const d = s.dials[st.key]
    const price = d ? d.value : roundPrice(spec.start)
    const isAddon = st.key.startsWith('addon:'), isSvc = st.key.startsWith('svc:')
    return {
      key: st.key, kind: 'price', eyebrow: spec.eyebrow, title: spec.title, details: spec.details, price, scenario: spec.scenario,
      question: isAddon ? 'Is this what you charge for it?' : isSvc ? 'Is this what you charge?' : 'Is this about what you charge, installed?',
      tries: d?.n ?? 0,
    }
  }
  if (st.key === 'width') {
    const m = model(s)
    const mid = m.base.complete
    const i = s.width?.i ?? 2
    return {
      key: 'width', kind: 'width', eyebrow: 'How customers see it', title: 'Price range on the estimate',
      details: [`For your typical ${SYSTEM_LABEL.complete.toLowerCase()} job of about $${mid.toLocaleString('en-US')}`, 'Customers see a Low to High range, never one exact number'],
      range: range(mid, WIDTHS[i]), question: 'Is this range about right?',
    }
  }
  if (st.key === 'sells_acpro') return {
    key: st.key, kind: 'choice', eyebrow: 'Brands', title: 'Do you also install AC Pro?',
    details: ['Your estimator offers American Standard and AC Pro'],
    options: [{ value: 'yes', label: 'Yes, I offer AC Pro' }, { value: 'no', label: 'No, only American Standard' }],
  }
  if (st.key === 'tier_names') return {
    key: st.key, kind: 'tier_names', eyebrow: 'AC Pro', title: 'What do you call your three AC Pro levels?',
    details: ['From lowest price to highest. American Standard uses Silver, Gold and Platinum.', 'Skip if you are not sure. Customers will see Tier 1, 2 and 3.'],
  }
  if (st.key === 'included') return {
    key: st.key, kind: 'multi', eyebrow: 'What your price includes', title: 'Which of these are already in your system price?',
    details: ['Tap everything you do not charge extra for. We will ask about the rest.'],
    options: ADDONS.filter((a) => ctx.addons.some((x) => x.key === a.key)).map((a) => ({ value: a.key, label: a.short })),
  }
  if (st.key === 'not_sure_220') return {
    key: st.key, kind: 'choice', eyebrow: 'Electrical', title: 'A customer is not sure they have 220V at the outdoor unit. What should the estimate do?',
    details: [],
    options: [
      { value: 'site_check', label: 'Leave it out. We check it on site.' },
      { value: 'allowance', label: 'Add the circuit cost to the High price, just in case.' },
    ],
  }
  if (st.key === 'services') return {
    key: st.key, kind: 'choice', eyebrow: 'Almost done', title: 'Show prices online for tune-ups, maintenance plans and ductwork?',
    details: ['About 7 more quick cards. If you say no, those customers see "we will confirm your price".'],
    options: [{ value: 'yes', label: 'Yes, price them' }, { value: 'no', label: 'No, skip these' }],
  }
  if (st.kind === 'check') {
    const sc = ctx.scenarios.find((x) => x.id === st.key.slice(6))!
    const q = quoteFor(sc.answers, s, ctx)
    const t = scenarioText(sc.answers, s, ctx)
    return {
      key: st.key, kind: 'check', eyebrow: 'Final check: a full estimate', title: t.title, details: t.details,
      range: [q.low, q.high], lines: q.lines, question: 'Would you quote a customer about this?',
    }
  }
  throw new Error(`unknown stage ${st.key}`)
}

// Expanded price table (for the summary and for confirm).
function expand(s: State, ctx: Ctx, priceRows: Row[]) {
  const m = model(s)
  const out: { id: string; low: number | null; high: number | null }[] = []
  for (const r of priceRows) {
    const a = r.when_answers ?? {}
    if (r.section === 'services') {
      const d = s.dials[`svc:${a.serviceDetail}`]
      if (!s.services || !d) { out.push({ id: r.id, low: null, high: null }); continue }
      const [lo, hi] = addonRange(d.value, m.w)
      out.push({ id: r.id, low: lo, high: hi })
      continue
    }
    if (a.brand === 'ac-pro' && s.sells_acpro === false) { out.push({ id: r.id, low: null, high: null }); continue }
    const tier = m.tier[a.efficiency] ?? 1, brand = m.brand[a.brand] ?? 1
    let mid: number
    if (r.section === 'mini-split') mid = (m.ms1 + (Number(a.miniSplitRooms) - 1) * m.msExtra) * tier * brand
    else mid = (m.base[a.systemType] ?? 0) * (m.size[a.homeSize] ?? 1) * tier * brand
    if (!mid) { out.push({ id: r.id, low: null, high: null }); continue }
    const [lo, hi] = range(mid, m.w)
    out.push({ id: r.id, low: lo, high: hi })
  }
  return out
}

function summary(s: State, ctx: Ctx) {
  const m = model(s)
  const r = (mid: number) => range(mid, m.w)
  const systems = Object.keys(SYSTEM_LABEL).map((sys) => ({
    label: SYSTEM_LABEL[sys],
    tiers: ['standard', 'enhanced', 'premium'].map((t) => ({ tier: AS_TIER[t], range: r(m.base[sys] * m.tier[t]) })),
  }))
  const sizes = Object.keys(SIZE_LABEL).map((k) => ({ label: SIZE_LABEL[k], range: r(m.base.complete * m.size[k]) }))
  const mini = [1, 2, 3, 4].map((n) => ({ label: `${n} room${n > 1 ? 's' : ''}`, range: r(m.ms1 + (n - 1) * m.msExtra) }))
  const included = ADDONS.filter((a) => s.included?.includes(a.key)).map((a) => a.short)
  const extras = ADDONS.filter((a) => s.dials[`addon:${a.key}`]).map((a) => ({ label: a.short, range: addonRange(s.dials[`addon:${a.key}`].value, m.w) }))
  const services = s.services
    ? SERVICES.filter((x) => s.dials[`svc:${x.detail}`]).map((x) => ({
      label: ctx.services.find((r) => r.when_answers.serviceDetail === x.detail)?.row_label ?? x.detail,
      range: addonRange(s.dials[`svc:${x.detail}`].value, m.w),
    }))
    : []
  const unsettled = Object.entries(s.dials).filter(([, d]) => d.done && !d.settled).length
  return {
    systems, sizes, mini, included, extras, services, unsettled,
    acpro: s.sells_acpro === false ? null : { ratio: Math.round((m.brand['ac-pro'] - 1) * 100), names: s.tier_names },
    width_pct: Math.round(m.w * 100),
  }
}

// ---------------------------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------------------------

async function ctxFor(c: Row): Promise<Ctx & { priceRows: Row[] }> {
  const [ad, rows, sc] = await Promise.all([
    sb.from('estimator_addons').select('id,key,label,applies_when,notes,price_type').eq('client_id', c.id).order('position'),
    sb.from('estimator_price_rows').select('id,section,group_label,row_label,when_answers').eq('client_id', c.id),
    sb.from('estimator_test_scenarios').select('id,position,label,answers').eq('client_id', c.id).order('position'),
  ])
  const priceRows = rows.data ?? []
  return { client: c, addons: ad.data ?? [], services: priceRows.filter((r: Row) => r.section === 'services'), scenarios: sc.data ?? [], priceRows }
}

async function calibrationFor(c: Row) {
  const { data } = await sb.from('estimator_calibrations').select('*').eq('client_id', c.id).maybeSingle()
  if (data) return data
  const row = { client_id: c.id, run: 1, status: 'in_progress', state: fresh() }
  await sb.from('estimator_calibrations').insert(row)
  return { ...row, started_at: new Date().toISOString() }
}

function view(c: Row, cal: Row, ctx: Ctx) {
  const s = cal.state as State
  const all = stages(s, ctx)
  const done = all.filter((st) => stageDone(st, s)).length
  const next = all.find((st) => !stageDone(st, s))
  return {
    client: { name: c.name, status: c.status, test: String(c.slug).endsWith('-test') },
    calibration: { status: cal.status, run: cal.run, step: s.step, can_undo: s.step > 0 && cal.status !== 'confirmed' },
    progress: { done, total: all.length },
    card: next && cal.status !== 'confirmed' ? cardFor(next, s, ctx) : null,
    summary: !next || cal.status === 'confirmed' ? summary(s, ctx) : null,
  }
}

function num(v: unknown): number | null {
  if (v === null || v === undefined || v === '') return null
  const n = typeof v === 'number' ? v : Number(String(v).replace(/[$,\s]/g, ''))
  return Number.isFinite(n) && n > 0 && n <= 1_000_000 ? Math.round(n) : null
}
const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function applyAnswer(s: State, st: Stage, card: Row, body: Row, ctx: Ctx): { ok: boolean; error?: string; log: Row } {
  const answer = String(body.answer ?? '')
  const mag = body.magnitude === 'lot' ? 'lot' : 'little'
  const log: Row = { answer, magnitude: null, typed_value: null, payload: {}, shown: {}, scenario: card.scenario ?? {} }

  if (st.kind === 'price') {
    const shown = card.price as number
    log.shown = { price: shown }
    const d: Dial = s.dials[st.key] ?? { value: shown, lb: null, ub: null, n: 0, done: false, settled: false, start: shown }
    if (answer === 'typed') {
      const v = num(body.value)
      if (v === null) return { ok: false, error: 'Enter a price in dollars.', log }
      log.typed_value = v
      Object.assign(d, { value: v, n: d.n + 1, done: true, settled: true })
    } else if (answer === 'right') {
      Object.assign(d, { value: shown, n: d.n + 1, done: true, settled: true })
    } else if (answer === 'low' || answer === 'high') {
      log.magnitude = mag
      let next: number
      if (answer === 'low') {
        d.lb = shown
        next = d.ub !== null ? (d.lb + d.ub) / 2 : shown * (mag === 'lot' ? 1.25 : 1.08)
      } else {
        d.ub = shown
        next = d.lb !== null ? (d.lb + d.ub) / 2 : shown * (mag === 'lot' ? 0.8 : 0.93)
      }
      d.n += 1
      d.value = roundPrice(next)
      if (d.value === shown) d.value = roundPrice(answer === 'low' ? shown * 1.03 : shown * 0.97)
      if (d.n >= MAX_TRIES) d.done = true
    } else return { ok: false, error: 'Unknown answer.', log }
    s.dials[st.key] = d
    log.payload = { guess_after: d.value, lb: d.lb, ub: d.ub }
    return { ok: true, log }
  }

  if (st.key === 'width') {
    const w = s.width ?? { i: 2, n: 0, done: false }
    log.shown = { range: card.range, width: WIDTHS[w.i] }
    if (answer === 'right') Object.assign(w, { done: true })
    else if (answer === 'narrow' || answer === 'wide') {
      const prev = w.i
      w.i = Math.min(WIDTHS.length - 1, Math.max(0, w.i + (answer === 'narrow' ? 1 : -1)))
      w.n += 1
      if (w.i === prev || w.n >= 3) w.done = true
    } else return { ok: false, error: 'Unknown answer.', log }
    s.width = w
    return { ok: true, log }
  }

  if (st.kind === 'choice') {
    const choice = String(body.choice ?? '')
    const allowed = (card.options as Row[]).map((o) => o.value)
    if (!allowed.includes(choice)) return { ok: false, error: 'Pick one of the options.', log }
    log.answer = 'choice'; log.payload = { choice }
    if (st.key === 'sells_acpro') s.sells_acpro = choice === 'yes'
    if (st.key === 'not_sure_220') s.not_sure_220 = choice
    if (st.key === 'services') s.services = choice === 'yes'
    return { ok: true, log }
  }

  if (st.key === 'tier_names') {
    const v = body.values ?? {}
    s.tier_names = { standard: text(v.standard, 40), enhanced: text(v.enhanced, 40), premium: text(v.premium, 40) }
    log.answer = answer === 'skip' ? 'skip' : 'typed'; log.payload = s.tier_names
    return { ok: true, log }
  }

  if (st.key === 'included') {
    const allowed = new Set((card.options as Row[]).map((o) => o.value))
    const sel = (Array.isArray(body.values) ? body.values : []).filter((x: unknown) => typeof x === 'string' && allowed.has(x))
    s.included = [...new Set(sel as string[])]
    log.answer = 'multi'; log.payload = { included: s.included }
    return { ok: true, log }
  }

  if (st.kind === 'check') {
    const id = st.key.slice(6)
    log.shown = { range: card.range, lines: card.lines }
    if (answer === 'right') s.checks[id] = { ok: true, low: card.range[0], high: card.range[1] }
    else if (answer === 'typed') {
      const lo = num(body.values?.low), hi = num(body.values?.high)
      if (lo === null || hi === null || lo > hi) return { ok: false, error: 'Enter a Low and a High, with Low below High.', log }
      s.checks[id] = { ok: false, low: lo, high: hi }
      log.payload = { low: lo, high: hi }
    } else return { ok: false, error: 'Unknown answer.', log }
    return { ok: true, log }
  }
  return { ok: false, error: 'Unknown card.', log }
}

// ---------------------------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------------------------

const NOT_FOUND = { status: 404, body: { error: 'This link is not valid. Please use the link from your email.' } }
const LOCKED = { status: 409, body: { error: 'Your pricing is live and locked. Contact Kickbord to change it.' } }

async function actionLoad(body: Row) {
  const c = await clientByToken(body.token)
  if (!c) return NOT_FOUND
  const [ctx, cal] = await Promise.all([ctxFor(c), calibrationFor(c)])
  return { status: 200, body: view(c, cal, ctx) }
}

async function actionAnswer(body: Row) {
  const c = await clientByToken(body.token)
  if (!c) return NOT_FOUND
  if (c.status === 'approved') return LOCKED
  const [ctx, cal] = await Promise.all([ctxFor(c), calibrationFor(c)])
  if (cal.status === 'confirmed') return { status: 409, body: { error: 'These prices were already sent. Start over to change them.', ...view(c, cal, ctx) } }
  const s = structuredClone(cal.state) as State
  const before = structuredClone(cal.state)
  const next = stages(s, ctx).find((st) => !stageDone(st, s))
  if (!next) return { status: 200, body: view(c, cal, ctx) }
  // A double tap or a stale tab: ignore and show the current card.
  if (body.card_key !== next.key) return { status: 200, body: { ...view(c, cal, ctx), stale: true } }
  const card = cardFor(next, s, ctx)
  const res = applyAnswer(s, next, card, body, ctx)
  if (!res.ok) return { status: 400, body: { error: res.error } }
  s.step += 1
  const now = new Date().toISOString()
  const [ins, upd] = await Promise.all([
    sb.from('estimator_calibration_responses').insert({
      client_id: c.id, run: cal.run, step: s.step, card_key: next.key, card_kind: next.kind,
      scenario: res.log.scenario, shown: res.log.shown, answer: res.log.answer, magnitude: res.log.magnitude,
      typed_value: res.log.typed_value, payload: res.log.payload, state_before: before,
    }),
    sb.from('estimator_calibrations').update({ state: s, updated_at: now }).eq('client_id', c.id),
  ])
  if (ins.error || upd.error) throw new Error(`save failed: ${ins.error?.message ?? upd.error?.message}`)
  return { status: 200, body: view(c, { ...cal, state: s }, ctx) }
}

async function actionUndo(body: Row) {
  const c = await clientByToken(body.token)
  if (!c) return NOT_FOUND
  if (c.status === 'approved') return LOCKED
  const ctx = await ctxFor(c)
  const cal = await calibrationFor(c)
  if (cal.status === 'confirmed') return { status: 409, body: { error: 'These prices were already sent. Start over to change them.' } }
  const { data: last } = await sb.from('estimator_calibration_responses').select('id,state_before')
    .eq('client_id', c.id).eq('run', cal.run).eq('undone', false).order('step', { ascending: false }).order('created_at', { ascending: false }).limit(1).maybeSingle()
  if (!last) return { status: 200, body: view(c, cal, ctx) }
  await sb.from('estimator_calibration_responses').update({ undone: true }).eq('id', last.id)
  await sb.from('estimator_calibrations').update({ state: last.state_before, updated_at: new Date().toISOString() }).eq('client_id', c.id)
  return { status: 200, body: view(c, { ...cal, state: last.state_before }, ctx) }
}

async function actionRestart(body: Row) {
  const c = await clientByToken(body.token)
  if (!c) return NOT_FOUND
  if (c.status === 'approved') return LOCKED
  const ctx = await ctxFor(c)
  const cal = await calibrationFor(c)
  const run = (cal.run ?? 1) + 1
  await sb.from('estimator_calibrations').update({ run, status: 'in_progress', state: fresh(), started_at: new Date().toISOString(), updated_at: new Date().toISOString(), confirmed_at: null }).eq('client_id', c.id)
  // Test copies reset fully so a run-through can be repeated. Real clients keep their saved prices.
  if (String(c.slug).endsWith('-test')) {
    await sb.from('estimator_price_rows').update({ low: null, high: null, approved: false }).eq('client_id', c.id)
    await sb.from('estimator_addons').update({ low: null, high: null, included: false, approved: false }).eq('client_id', c.id)
    await sb.from('estimator_test_scenarios').update({ client_low: null, client_high: null, client_note: null }).eq('client_id', c.id)
    await sb.from('estimator_clients').update({ status: 'draft', submitted_at: null }).eq('id', c.id)
  }
  const { data: c2 } = await sb.from('estimator_clients').select('*').eq('id', c.id).single()
  return { status: 200, body: view(c2, { ...cal, run, status: 'in_progress', state: fresh() }, ctx) }
}

async function actionConfirm(body: Row) {
  const c = await clientByToken(body.token)
  if (!c) return NOT_FOUND
  if (c.status === 'approved') return LOCKED
  const ctx = await ctxFor(c)
  const cal = await calibrationFor(c)
  const s = cal.state as State
  if (stages(s, ctx).some((st) => !stageDone(st, s))) return { status: 400, body: { error: 'Finish the remaining cards first.' } }
  if (body.confirmed !== true) return { status: 400, body: { error: 'Please tick the confirmation box.' } }
  const now = new Date().toISOString()

  // 1) Every price row, client-approved when priced (same meaning as submitting the detailed page).
  const rows = expand(s, ctx, ctx.priceRows)
  for (let i = 0; i < rows.length; i += 25) {
    await Promise.all(rows.slice(i, i + 25).map((r) =>
      sb.from('estimator_price_rows').update({ low: r.low, high: r.high, approved: r.low !== null && r.high !== null, updated_at: now }).eq('id', r.id).eq('client_id', c.id)))
  }
  // 2) Add-ons asked here. Others keep whatever they had (unapproved = "confirmed on site").
  const w = model(s).w
  for (const a of ctx.addons) {
    if (!ADDONS.some((x) => x.key === a.key)) continue
    if (s.included?.includes(a.key)) {
      await sb.from('estimator_addons').update({ included: true, low: null, high: null, approved: true }).eq('id', a.id)
    } else {
      const d = s.dials[`addon:${a.key}`]
      if (!d) continue
      const [lo, hi] = addonRange(d.value, w)
      await sb.from('estimator_addons').update({ included: false, low: lo, high: hi, approved: true }).eq('id', a.id)
    }
  }
  // 3) Sample jobs: what the client confirmed or typed on the final check cards.
  for (const [id, v] of Object.entries(s.checks)) {
    await sb.from('estimator_test_scenarios').update({
      client_low: v.low, client_high: v.high,
      client_note: v.ok ? 'Confirmed on the swipe page' : 'Entered on the swipe page',
    }).eq('id', id).eq('client_id', c.id)
  }
  // 4) Settings and AC Pro names.
  const included = ADDONS.filter((a) => s.included?.includes(a.key)).map((a) => a.short.toLowerCase())
  const settings: Row = { ...(c.settings ?? {}), not_sure_220: s.not_sure_220 ?? 'site_check', calibrated_at: now }
  settings.price_includes = ['Labor', ...included].join(', ')
  if (s.tier_names) settings.tier_names = { 'ac-pro': s.tier_names }
  await sb.from('estimator_clients').update({ settings, status: 'submitted', submitted_at: now, updated_at: now }).eq('id', c.id)
  if (s.tier_names) await applyTierNames(c.id, s.tier_names)

  await sb.from('estimator_calibrations').update({ status: 'confirmed', confirmed_at: now, updated_at: now }).eq('client_id', c.id)
  const priced = rows.filter((r) => r.low !== null).length
  const { data: c2 } = await sb.from('estimator_clients').select('*').eq('id', c.id).single()
  return { status: 200, body: { ...view(c2, { ...cal, status: 'confirmed' }, ctx), priced, total: rows.length } }
}

// Same label update the detailed page makes when AC Pro tier names change.
async function applyTierNames(clientId: string, names: Row) {
  const { data: opts } = await sb.from('estimator_options').select('id,value,label,label_by').eq('client_id', clientId).eq('question_key', 'efficiency')
  for (const o of opts ?? []) {
    const n = names[o.value]
    const by = { ...(o.label_by ?? {}) }
    const brand = { ...(by.brand ?? {}) }
    if (n) brand['ac-pro'] = `${n}: ${o.label}`; else delete brand['ac-pro']
    by.brand = brand
    await sb.from('estimator_options').update({ label_by: by }).eq('id', o.id)
  }
  const { data: rs } = await sb.from('estimator_price_rows').select('id,row_label,when_answers').eq('client_id', clientId).contains('when_answers', { brand: 'ac-pro' })
  const tiers: Row = { standard: 'Tier 1', enhanced: 'Tier 2', premium: 'Tier 3' }
  for (const r of rs ?? []) {
    const t = r.when_answers.efficiency
    const label = names[t] || tiers[t]
    const fixed = String(r.row_label ?? '').replace(/^AC Pro [^,]+,/, `AC Pro ${label},`)
    if (fixed !== r.row_label) await sb.from('estimator_price_rows').update({ row_label: fixed }).eq('id', r.id)
  }
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) })
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, origin)
  try {
    const raw = await req.text()
    if (raw.length > 20_000) return json({ error: 'Request too large.' }, 413, origin)
    const body = JSON.parse(raw || '{}') as Row
    const actions: Record<string, () => Promise<{ status: number; body: unknown }>> = {
      load: () => actionLoad(body),
      answer: () => actionAnswer(body),
      undo: () => actionUndo(body),
      restart: () => actionRestart(body),
      confirm: () => actionConfirm(body),
    }
    const run = actions[String(body.action)]
    if (!run) return json({ error: 'Unknown action.' }, 400, origin)
    const out = await run()
    return json(out.body, out.status, origin)
  } catch (err) {
    console.error('estimator-calibrate failed', err)
    return json({ error: 'Something went wrong. Please try again.' }, 500, origin)
  }
})
