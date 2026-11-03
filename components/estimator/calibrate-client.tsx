'use client'

import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiError, type Card, type Range, type Summary, type View, calibrate } from '@/lib/estimator/calibrate-api'

const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const rng = (r: Range) => `${usd(r[0])} – ${usd(r[1])}`

const inputClass =
  'w-full rounded-lg border border-olive-950/15 bg-white px-3 py-2.5 text-base text-olive-950 placeholder:text-olive-400 focus:outline-none focus:ring-2 focus:ring-olive-950/20 dark:border-white/10 dark:bg-olive-900 dark:text-white dark:placeholder:text-olive-500'
const btn =
  'inline-flex min-h-12 items-center justify-center rounded-full px-3 text-sm font-semibold whitespace-nowrap transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40'
const btnPrimary = clsx(btn, 'bg-olive-950 text-white hover:bg-olive-800 dark:bg-olive-300 dark:text-olive-950 dark:hover:bg-olive-200')
const btnSoft = clsx(btn, 'bg-olive-950/10 text-olive-950 hover:bg-olive-950/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20')

type Exit = 'left' | 'right' | 'up' | null
type Answer = Record<string, unknown>

export function CalibrateClient({ token }: { token: string }) {
  const [view, setView] = useState<View | null>(null)
  const [error, setError] = useState('')
  const [fatal, setFatal] = useState(token ? '' : 'This link is incomplete. Please open the full link from your email.')
  const [busy, setBusy] = useState(false)
  const [started, setStarted] = useState(false)
  const [exit, setExit] = useState<Exit>(null)

  useEffect(() => {
    if (!token) return
    calibrate(token, { action: 'load' })
      .then((v) => {
        setView(v)
        if (v.calibration.step > 0 || v.calibration.status === 'confirmed') setStarted(true)
      })
      .catch((e: unknown) => setFatal(e instanceof ApiError ? e.message : 'Could not load this page. Please try again.'))
  }, [token])

  const send = useCallback(
    async (payload: Answer, dir: Exit = null) => {
      if (busy) return false
      setBusy(true)
      setError('')
      if (dir) setExit(dir)
      try {
        const [v] = await Promise.all([calibrate(token, payload), new Promise((r) => setTimeout(r, dir ? 260 : 0))])
        setView(v)
        return true
      } catch (e) {
        setError(e instanceof ApiError ? e.message : 'Could not save. Please try again.')
        return false
      } finally {
        setExit(null)
        setBusy(false)
      }
    },
    [busy, token],
  )

  const answer = (card: Card, body: Answer, dir: Exit = null) => send({ action: 'answer', card_key: card.key, ...body }, dir)

  const restart = async () => {
    const msg = view?.client.test
      ? 'Start over? This clears every answer and price on this TEST copy.'
      : 'Start over? Your answers on this page are cleared. Prices you already sent stay saved until you send new ones.'
    if (!window.confirm(msg)) return
    if (await send({ action: 'restart' })) setStarted(false)
  }

  const shell = (children: React.ReactNode) => (
    <div className="min-h-dvh bg-olive-50 text-olive-950 dark:bg-olive-950 dark:text-white">
      <header className="border-b border-olive-950/10 bg-white dark:border-white/10 dark:bg-olive-900">
        <div className="mx-auto flex max-w-xl items-center justify-between px-5 py-3">
          <img src="/Logos/icon.svg" alt="Kickbord" width={85} height={28} />
          <div className="flex items-center gap-3">
            {view?.client.test && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">TEST copy</span>}
            <a href="/contact" className="text-sm font-medium hover:underline">Need help?</a>
          </div>
        </div>
      </header>
      {children}
    </div>
  )

  if (fatal)
    return shell(
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl tracking-tight">We could not open this page</h1>
        <p className="mt-3 text-sm text-olive-700 dark:text-olive-300">{fatal}</p>
      </div>,
    )
  if (!view) return shell(<p className="px-6 py-24 text-center text-sm text-olive-500">Loading...</p>)

  if (view.client.status === 'approved')
    return shell(
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="font-display text-3xl tracking-tight">Your estimator is live</h1>
        <p className="mt-3 text-sm text-olive-700 dark:text-olive-300">Your prices are locked. To change one, contact Kickbord and we will unlock it.</p>
      </div>,
    )

  if (!started)
    return shell(
      <main className="mx-auto max-w-xl px-5 py-10">
        <p className="mb-2 font-mono text-xs font-semibold tracking-widest text-olive-500 uppercase">{view.client.name} estimator</p>
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">Set your prices, one job at a time</h1>
        <p className="mt-3 text-base text-olive-700 dark:text-olive-300">
          We show you a typical job with a suggested installed price. You tell us if it is too low, about right or too high. Each answer adjusts the next
          suggestion, and we build your full price list from your answers.
        </p>
        <ul className="mt-5 space-y-3 text-sm text-olive-700 dark:text-olive-300">
          <li className="flex gap-3"><Dot />About 35 to 45 quick taps. Most people finish in under 10 minutes.</li>
          <li className="flex gap-3"><Dot />Swipe right or tap &quot;About right&quot; when a price looks like yours. You can always type your own number instead.</li>
          <li className="flex gap-3"><Dot />The first suggestions are typical Southern California prices. Only your answers set your real numbers.</li>
          <li className="flex gap-3"><Dot />Every answer saves right away. Close the page any time and come back to the same link.</li>
          <li className="flex gap-3"><Dot />Nothing goes live until you review the full list and Kickbord tests it.</li>
        </ul>
        <button className={clsx(btnPrimary, 'mt-8 w-full')} onClick={() => setStarted(true)}>
          {view.calibration.step > 0 ? 'Continue' : 'Start'}
        </button>
        <p className="mt-6 text-center text-xs text-olive-500">
          Prefer to type every price yourself?{' '}
          <a className="underline" href={`/estimator-setup?t=${token}`}>Use the detailed price page</a>
        </p>
      </main>,
    )

  const pct = view.progress.total ? Math.round((view.progress.done / view.progress.total) * 100) : 0

  return shell(
    <main className="mx-auto flex max-w-xl flex-col px-5 pt-5 pb-10">
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-xs text-olive-600 dark:text-olive-400">
          <span>{view.card ? `${pct}% done` : 'All done'}</span>
          <div className="flex items-center gap-4">
            {view.calibration.can_undo && (
              <button disabled={busy} onClick={() => void send({ action: 'undo' })} className="font-semibold hover:underline disabled:opacity-40">
                Undo last
              </button>
            )}
          </div>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-olive-950/10 dark:bg-white/10">
          <div className="h-full rounded-full bg-olive-700 transition-all duration-500 dark:bg-olive-300" style={{ width: `${view.card ? pct : 100}%` }} />
        </div>
      </div>

      {error && (
        <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300" role="alert">
          {error}
        </p>
      )}

      {view.card ? (
        <CardView key={`${view.card.key}:${view.card.price ?? ''}:${view.card.range?.join('-') ?? ''}`} card={view.card} busy={busy} exit={exit} onAnswer={answer} />
      ) : view.summary ? (
        <SummaryView view={view} summary={view.summary} busy={busy} onConfirm={() => send({ action: 'confirm', confirmed: true })} />
      ) : null}

      <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-olive-500">
        <button onClick={() => void restart()} disabled={busy} className="hover:underline">Start over</button>
        <a href={`/estimator-setup?t=${token}`} className="hover:underline">Detailed price page</a>
      </div>
    </main>,
  )
}

function Dot() {
  return <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-olive-500" />
}

// ---------------------------------------------------------------------------------------------

function CardView({ card, busy, exit, onAnswer }: { card: Card; busy: boolean; exit: Exit; onAnswer: (c: Card, b: Answer, d?: Exit) => Promise<boolean> }) {
  const swipeable = card.kind === 'price' || card.kind === 'width' || card.kind === 'check'
  const [dx, setDx] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [off, setOff] = useState<null | 'low' | 'high'>(null)
  const [typing, setTyping] = useState(false)
  const start = useRef<{ x: number; y: number; id: number } | null>(null)

  const onDown = (e: React.PointerEvent) => {
    if (!swipeable || busy || off || typing) return
    if ((e.target as HTMLElement).closest('button,input,a,label')) return
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setDragging(true)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!start.current) return
    setDx(e.clientX - start.current.x)
  }
  const onUp = () => {
    if (!start.current) return
    start.current = null
    setDragging(false)
    const d = dx
    setDx(0)
    if (d > 90) void onAnswer(card, { answer: 'right' }, 'right')
    else if (d < -90) {
      if (card.kind === 'price') setOff('high')
      else if (card.kind === 'check') setTyping(true)
      else void onAnswer(card, { answer: 'wide' }, 'left')
    }
  }

  const fly = exit === 'right' ? 'translate-x-[120%] rotate-12 opacity-0' : exit === 'left' ? '-translate-x-[120%] -rotate-12 opacity-0' : exit === 'up' ? '-translate-y-10 opacity-0' : ''
  const style = dragging ? { transform: `translateX(${dx}px) rotate(${dx / 25}deg)` } : undefined
  const hint = dx > 40 ? 'right' : dx < -40 ? 'off' : null

  return (
    <div>
      <div
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        style={style}
        className={clsx(
          'relative touch-pan-y rounded-3xl border border-olive-950/10 bg-white p-6 shadow-sm select-none dark:border-white/10 dark:bg-olive-900',
          !dragging && 'transition-all duration-300',
          swipeable && 'cursor-grab active:cursor-grabbing',
          fly,
        )}
      >
        {hint && (
          <span
            className={clsx(
              'absolute -top-4 rounded-lg border-2 bg-white px-2 py-0.5 text-sm font-bold tracking-wide uppercase dark:bg-olive-900',
              hint === 'right' ? 'left-5 -rotate-12 border-emerald-600 text-emerald-700' : 'right-5 rotate-12 border-amber-600 text-amber-700',
            )}
          >
            {hint === 'right' ? 'About right' : card.kind === 'width' ? 'Too wide' : "It's off"}
          </span>
        )}
        <p className="font-mono text-xs font-semibold tracking-widest text-olive-500 uppercase">{card.eyebrow}</p>
        <h2 className="mt-2 font-display text-2xl leading-tight tracking-tight">{card.title}</h2>
        {card.details.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm text-olive-700 dark:text-olive-300">
            {card.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        )}

        {card.kind === 'price' && (
          <div className="mt-6 rounded-2xl bg-olive-950/[0.04] px-4 py-5 text-center dark:bg-white/5">
            <p className="text-xs font-medium text-olive-600 dark:text-olive-400">Suggested price</p>
            <p className="mt-1 font-display text-4xl tracking-tight tabular-nums">{usd(card.price!)}</p>
          </div>
        )}
        {(card.kind === 'width' || card.kind === 'check') && card.range && (
          <div className="mt-6 rounded-2xl bg-olive-950/[0.04] px-4 py-5 text-center dark:bg-white/5">
            <p className="text-xs font-medium text-olive-600 dark:text-olive-400">{card.kind === 'check' ? 'Customer would see' : 'Customers would see'}</p>
            <p className="mt-1 font-display text-3xl tracking-tight tabular-nums">{rng(card.range)}</p>
            {card.lines && card.lines.length > 1 && (
              <ul className="mt-3 space-y-0.5 text-xs text-olive-600 dark:text-olive-400">
                {card.lines.map((l) => (
                  <li key={l.label} className="flex justify-between gap-3">
                    <span className="text-left">{l.label}</span>
                    <span className="whitespace-nowrap tabular-nums">{rng([l.low, l.high])}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {card.question && <p className="mt-5 text-center text-sm font-semibold">{card.question}</p>}
        {swipeable && !off && !typing && <p className="mt-1 text-center text-xs text-olive-500">Swipe right if it is about right</p>}
      </div>

      <div className="mt-5">
        {card.kind === 'price' && (
          <PriceControls card={card} busy={busy} off={off} setOff={setOff} typing={typing} setTyping={setTyping} onAnswer={onAnswer} />
        )}
        {card.kind === 'width' && (
          <div className="grid grid-cols-3 gap-2">
            <button disabled={busy} className={btnSoft} onClick={() => void onAnswer(card, { answer: 'narrow' }, 'up')}>Too narrow</button>
            <button disabled={busy} className={btnPrimary} onClick={() => void onAnswer(card, { answer: 'right' }, 'right')}>About right</button>
            <button disabled={busy} className={btnSoft} onClick={() => void onAnswer(card, { answer: 'wide' }, 'up')}>Too wide</button>
          </div>
        )}
        {card.kind === 'check' && <CheckControls card={card} busy={busy} typing={typing} setTyping={setTyping} onAnswer={onAnswer} />}
        {card.kind === 'choice' && (
          <div className="space-y-2">
            {card.options!.map((o) => (
              <button key={o.value} disabled={busy} className={clsx(btnSoft, 'w-full justify-start rounded-2xl py-3 text-left whitespace-normal')} onClick={() => void onAnswer(card, { choice: o.value }, 'up')}>
                {o.label}
              </button>
            ))}
          </div>
        )}
        {card.kind === 'multi' && <MultiControls card={card} busy={busy} onAnswer={onAnswer} />}
        {card.kind === 'tier_names' && <TierControls card={card} busy={busy} onAnswer={onAnswer} />}
      </div>
    </div>
  )
}

function MoneyInput({ value, onChange, label, autoFocus }: { value: string; onChange: (v: string) => void; label: string; autoFocus?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-olive-600 dark:text-olive-400">{label}</span>
      <span className="relative block">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-olive-500">$</span>
        <input
          autoFocus={autoFocus} type="text" inputMode="numeric" autoComplete="off" value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9,]/g, ''))}
          className={clsx(inputClass, 'pl-7')}
        />
      </span>
    </label>
  )
}

function PriceControls({
  card, busy, off, setOff, typing, setTyping, onAnswer,
}: {
  card: Card; busy: boolean; off: null | 'low' | 'high'; setOff: (v: null | 'low' | 'high') => void
  typing: boolean; setTyping: (v: boolean) => void; onAnswer: (c: Card, b: Answer, d?: Exit) => Promise<boolean>
}) {
  const [typed, setTyped] = useState('')
  if (typing)
    return (
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          void onAnswer(card, { answer: 'typed', value: typed }, 'up')
        }}
      >
        <MoneyInput label="Your installed price" value={typed} onChange={setTyped} autoFocus />
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className={btnSoft} onClick={() => setTyping(false)}>Back</button>
          <button type="submit" disabled={busy || !typed} className={btnPrimary}>Save my price</button>
        </div>
      </form>
    )
  if (off)
    return (
      <div className="space-y-3">
        <p className="text-center text-sm font-semibold">{off === 'low' ? 'Too low.' : 'Too high.'} By how much?</p>
        <div className="grid grid-cols-2 gap-2">
          <button disabled={busy} className={btnSoft} onClick={() => void onAnswer(card, { answer: off, magnitude: 'little' }, 'left')}>A little</button>
          <button disabled={busy} className={btnSoft} onClick={() => void onAnswer(card, { answer: off, magnitude: 'lot' }, 'left')}>A lot</button>
        </div>
        <div className="flex justify-center gap-5 text-sm">
          {off === 'high' && <button className="font-medium text-olive-600 hover:underline" onClick={() => setOff('low')}>Actually, it is too low</button>}
          {off === 'low' && <button className="font-medium text-olive-600 hover:underline" onClick={() => setOff('high')}>Actually, it is too high</button>}
          <button className="font-medium text-olive-600 hover:underline" onClick={() => setOff(null)}>Cancel</button>
        </div>
      </div>
    )
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <button disabled={busy} className={btnSoft} onClick={() => setOff('low')}>Too low</button>
        <button disabled={busy} className={btnPrimary} onClick={() => void onAnswer(card, { answer: 'right' }, 'right')}>About right</button>
        <button disabled={busy} className={btnSoft} onClick={() => setOff('high')}>Too high</button>
      </div>
      <button className="block w-full text-center text-sm font-medium text-olive-600 hover:underline" onClick={() => setTyping(true)}>
        I know my number. Type it in.
      </button>
    </div>
  )
}

function CheckControls({ card, busy, typing, setTyping, onAnswer }: { card: Card; busy: boolean; typing: boolean; setTyping: (v: boolean) => void; onAnswer: (c: Card, b: Answer, d?: Exit) => Promise<boolean> }) {
  const [low, setLow] = useState('')
  const [high, setHigh] = useState('')
  if (typing)
    return (
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          void onAnswer(card, { answer: 'typed', values: { low, high } }, 'up')
        }}
      >
        <p className="text-sm font-semibold">What would you quote for this job?</p>
        <div className="grid grid-cols-2 gap-2">
          <MoneyInput label="Low" value={low} onChange={setLow} autoFocus />
          <MoneyInput label="High" value={high} onChange={setHigh} />
        </div>
        <p className="text-xs text-olive-500">Kickbord compares your number with this estimate before anything goes live.</p>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className={btnSoft} onClick={() => setTyping(false)}>Back</button>
          <button type="submit" disabled={busy || !low || !high} className={btnPrimary}>Save</button>
        </div>
      </form>
    )
  return (
    <div className="grid grid-cols-2 gap-2">
      <button disabled={busy} className={btnSoft} onClick={() => setTyping(true)}>I'd quote differently</button>
      <button disabled={busy} className={btnPrimary} onClick={() => void onAnswer(card, { answer: 'right' }, 'right')}>Looks right</button>
    </div>
  )
}

function MultiControls({ card, busy, onAnswer }: { card: Card; busy: boolean; onAnswer: (c: Card, b: Answer, d?: Exit) => Promise<boolean> }) {
  const [sel, setSel] = useState<string[]>([])
  const toggle = (v: string) => setSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]))
  return (
    <div className="space-y-2">
      {card.options!.map((o) => {
        const on = sel.includes(o.value)
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(o.value)}
            className={clsx(
              'flex min-h-12 w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition',
              on ? 'border-olive-950 bg-olive-950 text-white dark:border-olive-300 dark:bg-olive-300 dark:text-olive-950' : 'border-olive-950/15 bg-white hover:bg-olive-950/5 dark:border-white/10 dark:bg-olive-900',
            )}
          >
            <span className={clsx('flex size-5 shrink-0 items-center justify-center rounded border text-xs', on ? 'border-current' : 'border-olive-950/30 dark:border-white/30')}>{on ? '✓' : ''}</span>
            {o.label}
          </button>
        )
      })}
      <button disabled={busy} className={clsx(btnPrimary, 'mt-3 w-full')} onClick={() => void onAnswer(card, { values: sel }, 'up')}>
        {sel.length ? `Continue with ${sel.length} included` : 'None of these are included'}
      </button>
    </div>
  )
}

function TierControls({ card, busy, onAnswer }: { card: Card; busy: boolean; onAnswer: (c: Card, b: Answer, d?: Exit) => Promise<boolean> }) {
  const [v, setV] = useState({ standard: '', enhanced: '', premium: '' })
  const any = v.standard.trim() || v.enhanced.trim() || v.premium.trim()
  return (
    <div className="space-y-3">
      {(['standard', 'enhanced', 'premium'] as const).map((t, i) => (
        <label key={t} className="block">
          <span className="mb-1 block text-xs font-medium text-olive-600 dark:text-olive-400">Level {i + 1}{i === 0 ? ' (lowest price)' : i === 2 ? ' (highest price)' : ''}</span>
          <input value={v[t]} maxLength={40} onChange={(e) => setV({ ...v, [t]: e.target.value })} placeholder={`Tier ${i + 1}`} className={inputClass} />
        </label>
      ))}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button disabled={busy} className={btnSoft} onClick={() => void onAnswer(card, { answer: 'skip', values: {} }, 'up')}>Skip</button>
        <button disabled={busy || !any} className={btnPrimary} onClick={() => void onAnswer(card, { answer: 'typed', values: v }, 'up')}>Save names</button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------------------------

function Table({ title, rows, note }: { title: string; rows: { label: string; value: string }[]; note?: string }) {
  if (!rows.length) return null
  return (
    <section className="rounded-2xl border border-olive-950/10 bg-white p-5 dark:border-white/10 dark:bg-olive-900/50">
      <h3 className="font-semibold">{title}</h3>
      {note && <p className="mt-1 text-xs text-olive-600 dark:text-olive-400">{note}</p>}
      <dl className="mt-3 divide-y divide-olive-950/5 text-sm dark:divide-white/5">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4 py-2">
            <dt className="text-olive-700 dark:text-olive-300">{r.label}</dt>
            <dd className="text-right font-medium tabular-nums">{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function SummaryView({ view, summary, busy, onConfirm }: { view: View; summary: Summary; busy: boolean; onConfirm: () => Promise<boolean> }) {
  const [ok, setOk] = useState(false)
  const done = view.calibration.status === 'confirmed'
  const s = summary
  const acNames = s.acpro?.names
  const acLabel = acNames && (acNames.standard || acNames.enhanced || acNames.premium) ? [acNames.standard, acNames.enhanced, acNames.premium].map((x, i) => x || `Tier ${i + 1}`).join(', ') : 'Tier 1, 2 and 3'

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl tracking-tight">{done ? 'Thank you. Your prices are sent.' : 'Here is your price list'}</h1>
        <p className="mt-2 text-sm text-olive-700 dark:text-olive-300">
          {done
            ? `We saved ${view.priced ? `${view.priced} prices` : 'your prices'} from your answers. Kickbord will review them, test your sample jobs, and turn your estimator on. You can still adjust any price on the detailed price page until then.`
            : 'Built from your answers. Customers see each price as a range. Check it over, then send it to Kickbord.'}
        </p>
      </div>

      {s.unsettled > 0 && !done && (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          {s.unsettled === 1 ? 'One price' : `${s.unsettled} prices`} never landed on &quot;about right&quot;, so we used the closest guess. Kickbord will double-check those with you.
        </p>
      )}

      {s.systems.map((sys) => (
        <Table
          key={sys.label}
          title={sys.label}
          note="American Standard, 1,800 to 2,500 sq ft home"
          rows={sys.tiers.map((t) => ({ label: t.tier, value: rng(t.range) }))}
        />
      ))}
      <Table title="By home size" note="AC + gas furnace, American Standard Silver. Other systems scale the same way." rows={s.sizes.map((x) => ({ label: x.label, value: rng(x.range) }))} />
      {s.acpro && (
        <Table
          title="AC Pro"
          rows={[
            { label: 'Compared with American Standard', value: s.acpro.ratio === 0 ? 'Same price' : `${s.acpro.ratio > 0 ? '+' : ''}${s.acpro.ratio}%` },
            { label: 'Level names', value: acLabel },
          ]}
        />
      )}
      <Table title="Ductless mini-splits" note="American Standard Silver" rows={s.mini.map((x) => ({ label: x.label, value: rng(x.range) }))} />
      <Table
        title="Extra charges"
        note={s.included.length ? `Already in your price: ${s.included.join(', ').toLowerCase()}.` : undefined}
        rows={s.extras.map((x) => ({ label: x.label, value: rng(x.range) }))}
      />
      <Table title="Maintenance and ductwork" rows={s.services.map((x) => ({ label: x.label, value: rng(x.range) }))} />

      {!done && (
        <section className="rounded-2xl border border-olive-950/10 bg-white p-5 dark:border-white/10 dark:bg-olive-900/50">
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} className="mt-1 size-4" />
            <span>These are prices {view.client.name} would quote customers today.</span>
          </label>
          <button disabled={!ok || busy} onClick={() => void onConfirm()} className={clsx(btnPrimary, 'mt-4 w-full')}>
            {busy ? 'Sending...' : 'Send my prices to Kickbord'}
          </button>
          <p className="mt-3 text-center text-xs text-olive-500">Something off? Use &quot;Undo last&quot; above, or start over at the bottom.</p>
        </section>
      )}
    </div>
  )
}
