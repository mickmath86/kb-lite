'use client'

import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { type Addon, ApiError, type Loaded, type PriceRow, type Scenario, type Settings, loadSetup, saveSetup, submitSetup } from '@/lib/estimator/api'

const inputClass =
  'w-full rounded-lg border border-olive-950/15 bg-white px-3 py-2 text-sm text-olive-950 placeholder:text-olive-400 focus:outline-none focus:ring-2 focus:ring-olive-950/20 disabled:bg-olive-50 disabled:text-olive-500 dark:border-white/10 dark:bg-olive-900 dark:text-white dark:placeholder:text-olive-500 dark:focus:ring-white/20 transition-colors'

const SYSTEM_ORDER = ['AC + gas furnace', 'Heat pump system', 'AC only', 'Gas furnace only']
const SIZES: [string, string][] = [
  ['under-1200', 'Under 1,200 sq ft'],
  ['1200-1800', '1,200 to 1,800 sq ft'],
  ['1800-2500', '1,800 to 2,500 sq ft'],
  ['over-2500', 'Over 2,500 sq ft'],
]
const ROOMS: [string, string][] = [['1', '1 room'], ['2', '2 rooms'], ['3', '3 rooms'], ['4', '4 rooms']]
const TIERS = ['standard', 'enhanced', 'premium']
const AS_TIER: Record<string, string> = { standard: 'Silver', enhanced: 'Gold', premium: 'Platinum' }
const BRANDS: [string, string][] = [['american-standard', 'American Standard'], ['ac-pro', 'AC Pro']]

type PriceEdit = { low: string; high: string }
const s = (v: unknown) => (v === null || v === undefined ? '' : String(v))

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={clsx('rounded-2xl border border-olive-950/10 bg-white p-5 sm:p-7 dark:border-white/10 dark:bg-olive-900/50', className)}>
      {children}
    </section>
  )
}
function H2({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl tracking-tight text-olive-950 dark:text-white">
      {n && <span className="mr-2 text-olive-500">{n}.</span>}
      {children}
    </h2>
  )
}
const P = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={clsx('mt-2 text-sm text-olive-700 dark:text-olive-300', className)}>{children}</p>
)

function Money({ value, onChange, label, disabled, placeholder }: { value: string; onChange: (v: string) => void; label: string; disabled: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-olive-600 dark:text-olive-400">{label}</span>
      <span className="relative block">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-olive-500">$</span>
        <input
          type="text" inputMode="decimal" autoComplete="off" disabled={disabled} placeholder={placeholder}
          value={value} onChange={(e) => onChange(e.target.value.replace(/[^0-9.,]/g, ''))}
          className={clsx(inputClass, 'pl-7')}
        />
      </span>
    </label>
  )
}
function LowHigh({ v, onChange, disabled }: { v: PriceEdit; onChange: (p: PriceEdit) => void; disabled: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Money label="Low" value={v.low} onChange={(low) => onChange({ ...v, low })} disabled={disabled} />
      <Money label="High" value={v.high} onChange={(high) => onChange({ ...v, high })} disabled={disabled} />
    </div>
  )
}

export function SetupClient({ token }: { token: string }) {
  const [phase, setPhase] = useState<'loading' | 'error' | 'ready' | 'done'>('loading')
  const [error, setError] = useState('')
  const [data, setData] = useState<Loaded | null>(null)
  const [prices, setPrices] = useState<Record<string, PriceEdit>>({})
  const [addons, setAddons] = useState<Record<string, { included: boolean; low: string; high: string }>>({})
  const [scen, setScen] = useState<Record<string, { low: string; high: string; note: string }>>({})
  const [settings, setSettings] = useState<Settings>({})
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [saveMsg, setSaveMsg] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [result, setResult] = useState<{ priced: number; total: number } | null>(null)

  const dirty = useRef({ prices: new Set<string>(), addons: new Set<string>(), scen: new Set<string>(), settings: false })
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const latest = useRef({ prices, addons, scen, settings })
  latest.current = { prices, addons, scen, settings }

  useEffect(() => {
    if (!token) {
      setError('This link is incomplete. Please open the full link from your email.')
      setPhase('error')
      return
    }
    loadSetup(token)
      .then((d) => {
        setData(d)
        setPrices(Object.fromEntries(d.prices.map((r) => [r.id, { low: s(r.low), high: s(r.high) }])))
        setAddons(Object.fromEntries(d.addons.map((a) => [a.id, { included: a.included, low: s(a.low), high: s(a.high) }])))
        setScen(Object.fromEntries(d.scenarios.map((x) => [x.id, { low: s(x.client_low), high: s(x.client_high), note: s(x.client_note) }])))
        setSettings(d.client.settings ?? {})
        setPhase('ready')
      })
      .catch((e: unknown) => {
        setError(e instanceof ApiError ? e.message : 'Could not load this page. Please try again.')
        setPhase('error')
      })
  }, [token])

  const locked = data?.client.status === 'approved'

  const collect = useCallback(() => {
    const L = latest.current
    const d = dirty.current
    const body: Record<string, unknown> = {}
    if (d.prices.size) body.prices = [...d.prices].map((id) => ({ id, low: L.prices[id]?.low ?? '', high: L.prices[id]?.high ?? '' }))
    if (d.addons.size)
      body.addons = [...d.addons].map((id) => ({ id, included: L.addons[id]?.included, low: L.addons[id]?.low ?? '', high: L.addons[id]?.high ?? '' }))
    if (d.scen.size)
      body.scenarios = [...d.scen].map((id) => ({ id, client_low: L.scen[id]?.low ?? '', client_high: L.scen[id]?.high ?? '', client_note: L.scen[id]?.note ?? '' }))
    if (d.settings) body.settings = L.settings
    return body
  }, [])

  const flush = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
    const body = collect()
    if (!Object.keys(body).length) return true
    const snapshot = { prices: new Set(dirty.current.prices), addons: new Set(dirty.current.addons), scen: new Set(dirty.current.scen), settings: dirty.current.settings }
    setSaveState('saving')
    try {
      const res = await saveSetup(token, body)
      snapshot.prices.forEach((id) => dirty.current.prices.delete(id))
      snapshot.addons.forEach((id) => dirty.current.addons.delete(id))
      snapshot.scen.forEach((id) => dirty.current.scen.delete(id))
      if (snapshot.settings) dirty.current.settings = false
      setSaveState(res.errors.length ? 'error' : 'saved')
      setSaveMsg(res.errors[0] ?? '')
      return !res.errors.length
    } catch (e) {
      setSaveState('error')
      setSaveMsg(e instanceof ApiError ? e.message : 'Could not save. We will try again.')
      return false
    }
  }, [collect, token])

  const queue = useCallback(() => {
    setSaveState('saving')
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => void flush(), 1200)
  }, [flush])

  const setPrice = (id: string, p: PriceEdit) => {
    setPrices((x) => ({ ...x, [id]: p }))
    dirty.current.prices.add(id)
    queue()
  }
  const setAddon = (id: string, p: { included: boolean; low: string; high: string }) => {
    setAddons((x) => ({ ...x, [id]: p }))
    dirty.current.addons.add(id)
    queue()
  }
  const setScenario = (id: string, p: { low: string; high: string; note: string }) => {
    setScen((x) => ({ ...x, [id]: p }))
    dirty.current.scen.add(id)
    queue()
  }
  const setSetting = (k: string, v: unknown) => {
    setSettings((x) => ({ ...x, [k]: v }))
    dirty.current.settings = true
    queue()
  }
  const setAcPro = (tier: string, v: string) => {
    const cur = settings.tier_names?.['ac-pro'] ?? {}
    setSetting('tier_names', { 'ac-pro': { ...cur, [tier]: v } })
  }

  const grouped = useMemo(() => {
    const rep = (data?.prices ?? []).filter((r) => r.section === 'replacement')
    const mini = (data?.prices ?? []).filter((r) => r.section === 'mini-split')
    const svc = (data?.prices ?? []).filter((r) => r.section === 'services')
    return { rep, mini, svc }
  }, [data])

  const acNames = settings.tier_names?.['ac-pro'] ?? {}
  const tierName = (brand: string, tier: string) =>
    brand === 'american-standard' ? AS_TIER[tier] : acNames[tier]?.trim() || `Tier ${TIERS.indexOf(tier) + 1}`

  const filled = Object.values(prices).filter((p) => p.low.trim() && p.high.trim()).length
  const total = Object.keys(prices).length

  async function submit() {
    setSubmitError('')
    setSubmitting(true)
    try {
      const body = collect()
      const res = await submitSetup(token, body)
      dirty.current = { prices: new Set(), addons: new Set(), scen: new Set(), settings: false }
      setResult({ priced: res.priced, total: res.total })
      setPhase('done')
      window.scrollTo({ top: 0 })
    } catch (e) {
      setSubmitError(e instanceof ApiError ? e.message : 'Could not submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const onHide = () => {
      if (Object.keys(collect()).length) void flush()
    }
    window.addEventListener('pagehide', onHide)
    return () => window.removeEventListener('pagehide', onHide)
  }, [collect, flush])

  const shell = (children: React.ReactNode) => (
    <div className="min-h-screen bg-olive-50 text-olive-950 dark:bg-olive-950 dark:text-white">
      <header className="border-b border-olive-950/10 bg-white dark:border-white/10 dark:bg-olive-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3">
          <img src="/Logos/icon.svg" alt="Kickbord" width={85} height={28} />
          <a href="/contact" className="text-sm font-medium hover:underline">Need help?</a>
        </div>
      </header>
      {children}
    </div>
  )

  if (phase === 'loading') return shell(<p className="px-6 py-24 text-center text-sm text-olive-500">Loading your pricing page...</p>)
  if (phase === 'error' || !data)
    return shell(
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl tracking-tight">We could not open this page</h1>
        <P>{error}</P>
      </div>,
    )

  if (phase === 'done')
    return shell(
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="font-display text-3xl tracking-tight">Thank you. Your prices are submitted.</h1>
        <P>
          We saved {result?.priced} of {result?.total} prices. Kickbord will review them, test your sample jobs, and turn your estimator on. Anything you left
          blank will show customers a message that you will confirm the price with them, never $0.
        </P>
        <P>Need to change something? Reopen this same link and edit. Your page stays editable until the estimator goes live.</P>
        <button onClick={() => setPhase('ready')} className="mt-6 rounded-full border border-olive-950/20 px-5 py-2 text-sm font-medium hover:bg-olive-950/5">
          Back to my prices
        </button>
      </div>,
    )

  const dis = locked
  const askable = data.addons.filter((a) => a.askable)

  return shell(
    <main className="mx-auto max-w-4xl space-y-6 px-5 py-10">
      <div>
        <p className="mb-2 font-mono text-xs font-semibold tracking-widest text-olive-500 uppercase">{data.client.name} estimator</p>
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">Set your estimator prices</h1>
        <P className="text-base">
          Your online estimator will show customers a price range. The numbers come only from this page, so every price is one you entered. Nothing is made up.
        </P>
      </div>

      {locked && (
        <Card className="border-amber-500/40 bg-amber-50 dark:bg-amber-950/30">
          <p className="text-sm font-semibold">Your estimator is live and these prices are locked.</p>
          <P>To change a price, contact Kickbord and we will unlock it.</P>
        </Card>
      )}
      {data.client.status === 'submitted' && !locked && (
        <Card className="border-emerald-600/30 bg-emerald-50 dark:bg-emerald-950/30">
          <p className="text-sm font-semibold">Submitted. Kickbord is reviewing your prices.</p>
          <P>You can still edit. Submit again when you are done.</P>
        </Card>
      )}

      <Card>
        <H2>How this works</H2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-olive-700 dark:text-olive-300">
          <li>
            Enter the <strong>installed price</strong> a customer pays you, as a Low and a High. Example: Low $9,500 and High $11,800. The estimator shows that
            range.
          </li>
          <li>
            Use the numbers from your own price book, a recent invoice, or the last few quotes you wrote for that same job. Round numbers are fine.
          </li>
          <li>
            <strong>Leave a box empty</strong> for any job you do not want to price online. The customer sees &quot;we will confirm your price&quot; and you
            get the lead. An empty box never shows as $0.
          </li>
          <li>Your work saves automatically. You can close this page and come back to the same link any time.</li>
        </ul>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
          <span className="font-medium">{filled} of {total} prices entered</span>
          <span className={clsx('text-xs', saveState === 'error' ? 'text-red-600' : 'text-olive-500')} aria-live="polite">
            {saveState === 'saving' && 'Saving...'}
            {saveState === 'saved' && 'All changes saved'}
            {saveState === 'error' && (saveMsg || 'Could not save')}
          </span>
        </div>
      </Card>

      <Card>
        <H2 n="1">Your basics</H2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-semibold">What is included in your installed prices?</span>
            <span className="mb-2 block text-xs text-olive-600 dark:text-olive-400">
              Example: labor, permit, haul-away of the old equipment, standard thermostat, new pad. Customers see this under their estimate.
            </span>
            <textarea
              rows={3} disabled={dis} value={s(settings.price_includes)} onChange={(e) => setSetting('price_includes', e.target.value)}
              className={clsx(inputClass, 'resize-y')} placeholder="Labor, permit, removal of the old system..."
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Which brand do we price when a customer has no preference?</span>
            <select disabled={dis} value={s(settings.default_brand) || 'american-standard'} onChange={(e) => setSetting('default_brand', e.target.value)} className={inputClass}>
              {BRANDS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Round estimates to the nearest</span>
            <select disabled={dis} value={s(settings.rounding) || '100'} onChange={(e) => setSetting('rounding', Number(e.target.value))} className={inputClass}>
              {[50, 100, 250, 500].map((n) => <option key={n} value={n}>${n}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Estimate is good for (days)</span>
            <input disabled={dis} type="number" min={1} max={365} value={s(settings.valid_days) || '30'} onChange={(e) => setSetting('valid_days', Number(e.target.value))} className={inputClass} />
          </label>
          <fieldset className="sm:col-span-2">
            <legend className="mb-1 text-sm font-semibold">If a customer is not sure they have a 220/240-volt outlet at the outdoor unit</legend>
            <div className="space-y-2 text-sm">
              {[
                ['site_check', 'Do not add the electrical cost. Tell them we will check it on site.'],
                ['allowance', 'Add the electrical cost to the High price as an allowance.'],
              ].map(([v, l]) => (
                <label key={v} className="flex items-start gap-2">
                  <input type="radio" name="n220" disabled={dis} checked={(settings.not_sure_220 ?? 'site_check') === v} onChange={() => setSetting('not_sure_220', v)} className="mt-1" />
                  <span>{l}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="sm:col-span-2">
            <legend className="mb-1 text-sm font-semibold">What do you call your three AC Pro levels?</legend>
            <span className="mb-2 block text-xs text-olive-600 dark:text-olive-400">From lowest price to highest. American Standard uses Silver, Gold and Platinum.</span>
            <div className="grid gap-3 sm:grid-cols-3">
              {TIERS.map((t, i) => (
                <input key={t} disabled={dis} value={s(acNames[t])} onChange={(e) => setAcPro(t, e.target.value)} placeholder={`Tier ${i + 1}`} maxLength={40} className={inputClass} aria-label={`AC Pro level ${i + 1}`} />
              ))}
            </div>
          </fieldset>
        </div>
      </Card>

      <Card>
        <H2 n="2">Replacement prices</H2>
        <P>
          One system at a time. Each row is a brand and level. Enter the installed price Low and High for each home size. Open a system to start.
        </P>
        <div className="mt-4 space-y-3">
          {SYSTEM_ORDER.map((sys) => {
            const rows = grouped.rep.filter((r) => r.group_label === sys)
            if (!rows.length) return null
            const done = rows.filter((r) => prices[r.id]?.low.trim() && prices[r.id]?.high.trim()).length
            return (
              <details key={sys} className="group rounded-xl border border-olive-950/10 dark:border-white/10">
                <summary className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3 font-semibold hover:bg-olive-950/5 dark:hover:bg-white/5">
                  <span>{sys}</span>
                  <span className="text-xs font-normal text-olive-500">{done} of {rows.length} entered</span>
                </summary>
                <div className="space-y-5 border-t border-olive-950/10 p-4 dark:border-white/10">
                  {BRANDS.flatMap(([bk, bn]) => TIERS.map((tk) => ({ bk, bn, tk }))).map(({ bk, bn, tk }) => (
                    <div key={bk + tk}>
                      <h3 className="mb-2 text-sm font-semibold">{bn}, {tierName(bk, tk)}</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {SIZES.map(([sk, sl]) => {
                          const row = rows.find((r) => r.when_answers.brand === bk && r.when_answers.efficiency === tk && r.when_answers.homeSize === sk)
                          if (!row) return null
                          return (
                            <div key={sk} className="rounded-lg bg-olive-950/[0.03] p-3 dark:bg-white/5">
                              <p className="mb-2 text-xs font-semibold text-olive-700 dark:text-olive-300">{sl}</p>
                              <LowHigh v={prices[row.id] ?? { low: '', high: '' }} onChange={(p) => setPrice(row.id, p)} disabled={dis} />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )
          })}
        </div>
      </Card>

      <Card>
        <H2 n="3">Ductless mini-splits</H2>
        <P>Priced by the number of rooms. Customers with 5 or more rooms are always sent to a site visit.</P>
        <details className="mt-4 rounded-xl border border-olive-950/10 dark:border-white/10">
          <summary className="cursor-pointer rounded-xl px-4 py-3 font-semibold hover:bg-olive-950/5 dark:hover:bg-white/5">Open mini-split prices</summary>
          <div className="space-y-5 border-t border-olive-950/10 p-4 dark:border-white/10">
            {BRANDS.flatMap(([bk, bn]) => TIERS.map((tk) => ({ bk, bn, tk }))).map(({ bk, bn, tk }) => (
              <div key={bk + tk}>
                <h3 className="mb-2 text-sm font-semibold">{bn}, {tierName(bk, tk)}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ROOMS.map(([rk, rl]) => {
                    const row = grouped.mini.find((r) => r.when_answers.brand === bk && r.when_answers.efficiency === tk && r.when_answers.miniSplitRooms === rk)
                    if (!row) return null
                    return (
                      <div key={rk} className="rounded-lg bg-olive-950/[0.03] p-3 dark:bg-white/5">
                        <p className="mb-2 text-xs font-semibold text-olive-700 dark:text-olive-300">{rl}</p>
                        <LowHigh v={prices[row.id] ?? { low: '', high: '' }} onChange={(p) => setPrice(row.id, p)} disabled={dis} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </details>
      </Card>

      <Card>
        <H2 n="4">Extra charges</H2>
        <P>
          These get added on top of the system price when they apply. If your system prices above already include one, choose &quot;Already included&quot; and
          leave the amount empty.
        </P>
        <div className="mt-4 space-y-4">
          {askable.map((a) => {
            const v = addons[a.id] ?? { included: false, low: '', high: '' }
            const fixed = a.price_type === 'site_visit'
            return (
              <div key={a.id} className="rounded-xl border border-olive-950/10 p-4 dark:border-white/10">
                <p className="text-sm font-semibold">{a.label}</p>
                {a.notes && <p className="mt-1 text-xs text-olive-600 dark:text-olive-400">{a.notes}</p>}
                {fixed ? (
                  <p className="mt-2 text-xs text-olive-600 dark:text-olive-400">No price needed. Customers are told this is confirmed on site.</p>
                ) : (
                  <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_2fr] sm:items-end">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" disabled={dis} checked={v.included} onChange={(e) => setAddon(a.id, { ...v, included: e.target.checked })} />
                      Already included
                    </label>
                    {!v.included && <LowHigh v={{ low: v.low, high: v.high }} onChange={(p) => setAddon(a.id, { ...v, ...p })} disabled={dis} />}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      <Card>
        <H2 n="5">Maintenance and ductwork</H2>
        <P>Prices for tune-ups, plans, and ductwork. Leave empty any you do not want to price online.</P>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {grouped.svc.map((r: PriceRow) => (
            <div key={r.id} className="rounded-xl border border-olive-950/10 p-4 dark:border-white/10">
              <p className="mb-2 text-sm font-semibold">{r.row_label}</p>
              <LowHigh v={prices[r.id] ?? { low: '', high: '' }} onChange={(p) => setPrice(r.id, p)} disabled={dis} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <H2 n="6">What customers read</H2>
        <P>These messages show on the estimate. We wrote starting versions from your sheet. Change anything that does not sound like you.</P>
        <div className="mt-4 space-y-4">
          {[
            ['disclaimer', 'Note under every estimate'],
            ['repair_message', 'When a customer asks about a repair'],
            ['commercial_message', 'When a customer says commercial property'],
            ['no_price_message', 'When we have no price for their job'],
            ['financing_message', 'Financing note (optional)'],
          ].map(([k, l]) => (
            <label key={k} className="block">
              <span className="mb-1 block text-sm font-semibold">{l}</span>
              <textarea rows={3} disabled={dis} value={s(settings[k])} onChange={(e) => setSetting(k, e.target.value)} className={clsx(inputClass, 'resize-y')} />
            </label>
          ))}
        </div>
      </Card>

      <Card>
        <H2 n="7">Sample jobs (optional, but helps)</H2>
        <P>
          For each sample job below, enter what you would quote a real customer today. We run the estimator on the same jobs and compare the two before it goes live.
        </P>
        <div className="mt-4 space-y-4">
          {data.scenarios.map((x: Scenario) => {
            const v = scen[x.id] ?? { low: '', high: '', note: '' }
            return (
              <div key={x.id} className="rounded-xl border border-olive-950/10 p-4 dark:border-white/10">
                <p className="mb-2 text-sm font-semibold">{x.position}. {x.label}</p>
                <LowHigh v={{ low: v.low, high: v.high }} onChange={(p) => setScenario(x.id, { ...v, ...p })} disabled={dis} />
                <input disabled={dis} value={v.note} onChange={(e) => setScenario(x.id, { ...v, note: e.target.value })} placeholder="Note (optional), or write &quot;no price, site visit&quot;" className={clsx(inputClass, 'mt-2')} />
              </div>
            )
          })}
        </div>
      </Card>

      {!locked && (
        <Card>
          <H2 n="8">Review and submit</H2>
          <P>
            You entered {filled} of {total} replacement and service prices. Anything left empty is not quoted online. When you submit, Kickbord reviews your prices
            and tests the estimator before it goes live.
          </P>
          <label className="mt-4 flex items-start gap-2 text-sm">
            <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-1" />
            <span>I confirm these are the installed prices {data.client.name} would quote customers today.</span>
          </label>
          {submitError && <p className="mt-3 text-sm text-red-600" role="alert">{submitError}</p>}
          <button
            disabled={!confirmed || submitting || filled === 0}
            onClick={() => void submit()}
            className="mt-4 rounded-full bg-olive-950 px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-olive-950"
          >
            {submitting ? 'Submitting...' : 'Submit my prices'}
          </button>
        </Card>
      )}
    </main>,
  )
}
