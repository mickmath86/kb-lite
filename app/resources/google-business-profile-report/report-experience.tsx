'use client'

import { useEffect, useId, useRef, useState } from 'react'

import { Button, ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { HeroWithDemoOnBackground } from '@/components/sections/hero-with-demo-on-background'
import type { Candidate, GbpReport } from '@/lib/gbp-report/types'
import { validateGbpLead, type GbpFieldErrors } from '@/lib/gbp-report/validate'
import { trackMetaEvent } from '@/lib/meta-pixel'
import { TRADE_TYPES } from '@/lib/review-playbook/trades'

import { ReportView, ScoreRing } from './report-view'

const inputClass =
  'w-full rounded-lg border border-olive-950/15 bg-white px-4 py-3 text-base text-olive-950 placeholder:text-olive-500 focus:outline-none focus:ring-2 focus:ring-olive-950/20 aria-invalid:border-red-700 aria-invalid:ring-red-700/20 dark:border-white/10 dark:bg-olive-900 dark:text-white dark:placeholder:text-olive-400 dark:focus:ring-white/20 dark:aria-invalid:border-red-400'

type Field = 'website' | 'name' | 'email' | 'tradeType'

type ApiReport = { ok: true; kind: 'report'; demo: boolean; captured: boolean; sent: boolean; duplicate: boolean; report: GbpReport }
type ApiChoose = { ok: true; kind: 'choose'; candidates: Candidate[] }
type ApiFailure = { ok: false; error?: string; fieldErrors?: GbpFieldErrors }

const WHAT_WE_CHECK = [
  ['Stars and reviews', 'Your rating, how many reviews you have, and how recent they are, compared with nearby competitors.'],
  ['Profile basics', 'Hours, phone, website link, open status, and whether your main category is set.'],
  ['Photos', 'Whether you have enough real photos to look busy and trustworthy.'],
  ['Top 5 competitors', 'The businesses Google shows first for your trade in your area, side by side with you.'],
  ['What to fix first', 'A short, ranked list of fixes with the points each one is worth.'],
]

function SamplePreview() {
  return (
    <div aria-hidden="true" className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-olive-950/5 dark:bg-olive-900">
      <div className="flex items-center gap-5">
        <ScoreRing score={72} grade="C" size={120} />
        <div>
          <p className="text-xs font-semibold text-olive-600 uppercase">Grade C</p>
          <p className="font-display text-2xl text-olive-950 dark:text-white">Your Business Name</p>
          <p className="mt-1 text-sm text-olive-600 dark:text-olive-400">Plumber · Ventura, CA</p>
        </div>
      </div>
      <ul className="mt-6 divide-y divide-olive-950/10 text-sm dark:divide-white/10">
        {[
          ['Star rating', '4.6 stars', '16 / 20', 'bg-[#596352]'],
          ['Number of reviews', '38 reviews', '10 / 20', 'bg-[#b8892e]'],
          ['Business hours', 'Missing', '0 / 10', 'bg-[#a2453a]'],
          ['Photos', '4', '3 / 10', 'bg-[#a2453a]'],
        ].map(([label, value, pts, dot]) => (
          <li key={label} className="flex items-center justify-between gap-3 py-2.5">
            <span className="flex items-center gap-2 font-medium text-olive-950 dark:text-white">
              <span className={`size-2.5 rounded-full ${dot}`} />
              {label}
            </span>
            <span className="text-olive-600 dark:text-olive-400">{value}</span>
            <span className="font-medium text-olive-950 tabular-nums dark:text-white">{pts}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-lg bg-olive-50 px-3 py-2 text-xs text-olive-700 dark:bg-olive-950/40 dark:text-olive-300">Example report. Yours uses your real Google profile.</p>
    </div>
  )
}

export function ReportExperience({ demoMode, sampleMode }: { demoMode: boolean; sampleMode: boolean }) {
  const formErrorId = useId()
  const [website, setWebsite] = useState('')
  const [name, setName] = useState(demoMode ? 'Alex Rivera' : '')
  const [email, setEmail] = useState(demoMode ? 'alex.rivera@example.com' : '')
  const [tradeType, setTradeType] = useState(demoMode ? 'Plumber' : '')
  const [hp, setHp] = useState('')
  const [fieldErrors, setFieldErrors] = useState<GbpFieldErrors>({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[] | null>(null)
  const [result, setResult] = useState<{ report: GbpReport; demo: boolean; duplicate: boolean } | null>(null)
  const lock = useRef(false)

  useEffect(() => {
    if (!result && !candidates) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.getElementById(result ? 'report' : 'choose')?.focus()
  }, [result, candidates])

  async function send(extra: { placeId?: string; noneOfThese?: boolean } = {}) {
    const validated = validateGbpLead({ website, name, email, tradeType })
    if (!validated.ok) {
      setCandidates(null)
      setFieldErrors(validated.fieldErrors)
      setFormError('Check the highlighted fields. Nothing was saved.')
      const first = (['website', 'name', 'email', 'tradeType'] as Field[]).find((f) => validated.fieldErrors[f])
      if (first) window.setTimeout(() => document.getElementById(`gbp-${first}`)?.focus(), 0)
      return
    }
    if (lock.current) return
    lock.current = true
    setSubmitting(true)
    setFormError('')
    setFieldErrors({})

    try {
      const response = await fetch('/api/gbp-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website: validated.lead.website,
          name: validated.lead.name,
          email: validated.lead.email,
          tradeType: validated.lead.tradeType,
          hp,
          ...extra,
        }),
      })
      let data: ApiReport | ApiChoose | ApiFailure | null = null
      try {
        data = (await response.json()) as ApiReport | ApiChoose | ApiFailure
      } catch {
        data = null
      }

      if (response.ok && data?.ok === true && data.kind === 'choose') {
        setCandidates(data.candidates)
        return
      }
      if (!response.ok || !data || data.ok !== true || data.kind !== 'report' || (!data.captured && !data.demo)) {
        const failure = data && data.ok === false ? data : null
        setCandidates(null)
        setFieldErrors(failure?.fieldErrors ?? {})
        setFormError(failure?.error || 'We could not build your report. Nothing was saved. Please try again.')
        return
      }

      if (data.captured && !data.duplicate) trackMetaEvent('Lead', { content_name: 'gbp-profile-report' })
      setCandidates(null)
      setResult({ report: data.report, demo: data.demo, duplicate: data.duplicate })
    } catch {
      setFormError('We could not reach the server. Nothing was saved. Please try again.')
    } finally {
      lock.current = false
      setSubmitting(false)
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void send()
  }

  function startOver() {
    setResult(null)
    setCandidates(null)
    setFormError('')
    window.setTimeout(() => document.getElementById('gbp-website')?.focus(), 0)
  }

  const banner = demoMode || sampleMode || result?.demo

  return (
    <div className="pb-20">
      {banner ? (
        <div className="report-no-print border-b border-[#7b627d]/40 bg-[#7b627d]/15" data-testid="gbp-demo-banner">
          <Container className="py-3">
            <p className="text-sm/6 font-medium text-olive-950 dark:text-white">
              Preview only.{' '}
              {demoMode ? 'No webhook is set, so nothing is captured or sent. ' : ''}
              {sampleMode ? 'No Google key is set, so reports use made-up sample data.' : ''}
            </p>
          </Container>
        </div>
      ) : null}

      {result ? (
        <Container className="pt-14 sm:pt-20">
          <div className="report-no-print mb-8 flex flex-wrap items-center justify-between gap-3">
            <p role="status" className="text-sm/6 text-olive-700 dark:text-olive-300">
              {result.demo
                ? 'Preview only. Nothing was captured or sent.'
                : result.duplicate
                  ? 'You already ran this report, so here it is again.'
                  : 'Your report is ready.'}
            </p>
            <button type="button" onClick={startOver} className="text-sm font-medium text-olive-950 underline underline-offset-4 dark:text-white">
              Check another business
            </button>
          </div>
          <ReportView report={result.report} />
        </Container>
      ) : candidates ? (
        <Container className="pt-14 sm:pt-20">
          <section id="choose" tabIndex={-1} aria-labelledby="choose-title" className="mx-auto max-w-2xl outline-none">
            <p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">One quick check</p>
            <h1 id="choose-title" className="mt-1 font-display text-4xl tracking-tight text-olive-950 sm:text-5xl dark:text-white">
              Which one is your business?
            </h1>
            <p className="mt-3 text-base/7 text-olive-700 dark:text-olive-300">
              {candidates.length === 1
                ? `We found a Google profile that might match ${website.replace(/^https?:\/\//, '')}, but it does not link to your website. Tap it if it is yours.`
                : `We found ${candidates.length} Google profiles that might match ${website.replace(/^https?:\/\//, '')}, but none link to your website. Tap yours.`}
            </p>
            <ul className="mt-8 space-y-3">
              {candidates.map((c) => (
                <li key={c.placeId}>
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => send({ placeId: c.placeId })}
                    className="w-full rounded-2xl border border-olive-950/10 bg-white px-5 py-4 text-left hover:border-olive-950/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-950 disabled:opacity-60 dark:border-white/10 dark:bg-olive-900"
                  >
                    <span className="block font-semibold text-olive-950 dark:text-white">{c.name}</span>
                    <span className="mt-0.5 block text-sm text-olive-600 dark:text-olive-400">{c.address}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button size="lg" disabled={submitting} onClick={() => send({ noneOfThese: true })} className="min-h-11">
                {submitting ? 'Building your report…' : candidates.length === 1 ? 'This is not mine' : 'None of these are mine'}
              </Button>
              <button type="button" onClick={startOver} className="text-sm font-medium text-olive-950 underline underline-offset-4 dark:text-white">
                Change my website
              </button>
            </div>
            {formError ? (
              <p role="alert" className="mt-5 text-sm/6 text-red-700 dark:text-red-400">
                {formError}
              </p>
            ) : null}
          </section>
        </Container>
      ) : (
        <HeroWithDemoOnBackground
          demoLayout="contained"
          eyebrow={<p className="text-sm/7 font-semibold text-white/70">Free tool</p>}
          headline="How does your Google profile stack up?"
          subheadline={
            <p>
              Enter your website. We find your Google Business Profile, score it out of 100, compare it with your top 5 local competitors, and tell you what to fix first.
            </p>
          }
          cta={<ButtonLink href="#get-report" size="lg" color="light">Get my free report</ButtonLink>}
          demo={<SamplePreview />}
          footer={
            <section aria-label="Get your free report" className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <form
                id="get-report"
                noValidate
                onSubmit={onSubmit}
                data-testid="gbp-form"
                aria-describedby={formError ? formErrorId : undefined}
                className="relative scroll-mt-8 rounded-3xl border border-olive-950/10 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-olive-900"
              >
                <h2 className="font-display text-3xl tracking-tight text-olive-950 dark:text-white">Get your report</h2>
                <p className="mt-2 text-sm/6 text-olive-600 dark:text-olive-300">Takes about 15 seconds. Your report opens on this page, with a PDF you can download.</p>

                <div className="mt-6 space-y-5">
                  {(
                    [
                      { id: 'website', label: 'Business website', type: 'text', value: website, set: setWebsite, auto: 'url', placeholder: 'yourcompany.com', inputMode: 'url' },
                      { id: 'name', label: 'Your name', type: 'text', value: name, set: setName, auto: 'name' },
                      { id: 'email', label: 'Email', type: 'email', value: email, set: setEmail, auto: 'email', inputMode: 'email' },
                    ] as const
                  ).map((f) => (
                    <div key={f.id}>
                      <label htmlFor={`gbp-${f.id}`} className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                        {f.label} <span className="font-medium text-olive-500">(required)</span>
                      </label>
                      <input
                        id={`gbp-${f.id}`}
                        name={f.id}
                        type={f.type}
                        autoComplete={f.auto}
                        inputMode={'inputMode' in f ? f.inputMode : undefined}
                        placeholder={'placeholder' in f ? f.placeholder : undefined}
                        autoCapitalize={f.id === 'website' || f.id === 'email' ? 'none' : undefined}
                        spellCheck={f.id === 'website' || f.id === 'email' ? false : undefined}
                        required
                        value={f.value}
                        onChange={(e) => f.set(e.target.value)}
                        aria-invalid={fieldErrors[f.id] ? true : undefined}
                        aria-describedby={fieldErrors[f.id] ? `gbp-${f.id}-error` : undefined}
                        className={inputClass}
                      />
                      {fieldErrors[f.id] ? (
                        <p id={`gbp-${f.id}-error`} className="mt-1.5 text-sm text-red-700 dark:text-red-400">
                          {fieldErrors[f.id]}
                        </p>
                      ) : null}
                    </div>
                  ))}

                  <div>
                    <label htmlFor="gbp-tradeType" className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                      Trade <span className="font-medium text-olive-500">(required)</span>
                    </label>
                    <select
                      id="gbp-tradeType"
                      name="tradeType"
                      required
                      value={tradeType}
                      onChange={(e) => setTradeType(e.target.value)}
                      aria-invalid={fieldErrors.tradeType ? true : undefined}
                      aria-describedby={fieldErrors.tradeType ? 'gbp-tradeType-error' : undefined}
                      className={inputClass}
                    >
                      <option value="">Select a trade</option>
                      {TRADE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.tradeType ? (
                      <p id="gbp-tradeType-error" className="mt-1.5 text-sm text-red-700 dark:text-red-400">
                        {fieldErrors.tradeType}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="absolute -left-2499.75 h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="gbp-hp">Company fax</label>
                  <input id="gbp-hp" name="hp" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                </div>

                {formError ? (
                  <p id={formErrorId} role="alert" data-testid="gbp-error" className="mt-5 text-sm/6 text-red-700 dark:text-red-400">
                    {formError}
                  </p>
                ) : null}

                <Button type="submit" size="lg" className="mt-6 min-h-11 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting} aria-busy={submitting}>
                  {submitting ? 'Checking Google…' : 'Get my free report'}
                </Button>

                <p className="mt-4 text-sm/6 text-olive-600 dark:text-olive-400">
                  {demoMode
                    ? 'This preview does not send your details anywhere. '
                    : 'Your details are sent to Kickbord so we can follow up about your report. This form does not add a separate marketing opt-in. '}
                  <a href="/privacy" target="_blank" rel="noreferrer" className="font-medium text-olive-950 underline underline-offset-4 dark:text-white">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>

              <div>
                <h2 className="font-display text-3xl tracking-tight text-olive-950 dark:text-white">What we check</h2>
                <ol className="mt-5 space-y-4">
                  {WHAT_WE_CHECK.map(([title, blurb], index) => (
                    <li key={title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                      <span className="font-display text-xl text-[#596352] dark:text-olive-300">{String(index + 1).padStart(2, '0')}</span>
                      <span>
                        <span className="block font-medium text-olive-950 dark:text-white">{title}</span>
                        <span className="mt-1 block text-sm/6 text-olive-600 dark:text-olive-400">{blurb}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 text-sm/6 text-olive-600 dark:text-olive-400">Uses public Google Maps data only. We never log in to your profile.</p>
              </div>
            </section>
          }
        />
      )}
    </div>
  )
}
