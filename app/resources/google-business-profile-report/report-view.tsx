'use client'

import { clsx } from 'clsx/lite'
import { useState } from 'react'

import { ButtonLink } from '@/components/elements/button'
import type { CheckStatus, FoundReport, GbpReport, Grade, NotFoundReport, Recommendation } from '@/lib/gbp-report/types'

export const BOOKING_URL = '/booking'

const STATUS_STYLES: Record<CheckStatus, { dot: string; label: string }> = {
  good: { dot: 'bg-[#596352]', label: 'Good' },
  fair: { dot: 'bg-[#b8892e]', label: 'Needs work' },
  poor: { dot: 'bg-[#a2453a]', label: 'Missing or weak' },
}

const PRIORITY_STYLES: Record<Recommendation['priority'], string> = {
  High: 'bg-[#a2453a]/10 text-[#8a3328] ring-[#a2453a]/25 dark:text-[#f0a79c]',
  Medium: 'bg-[#b8892e]/10 text-[#7a5a17] ring-[#b8892e]/25 dark:text-[#e8c67c]',
  Low: 'bg-olive-950/5 text-olive-700 ring-olive-950/10 dark:text-olive-300',
}

const GRADE_COLOR: Record<Grade, string> = {
  A: '#596352',
  B: '#6f7d5f',
  C: '#b8892e',
  D: '#b96a35',
  F: '#a2453a',
}

export function ScoreRing({ score, grade, size = 168 }: { score: number; grade: Grade; size?: number }) {
  const stroke = 12
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - Math.max(0, Math.min(100, score)) / 100)
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Score ${score} out of 100, grade ${grade}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-olive-950/10 dark:text-white/10" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={GRADE_COLOR[grade]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl text-olive-950 tabular-nums dark:text-white">{score}</span>
        <span className="text-xs font-semibold tracking-wide text-olive-600 uppercase dark:text-olive-400">out of 100</span>
      </div>
    </div>
  )
}

function DownloadButton({ report }: { report: GbpReport }) {
  const [state, setState] = useState<'idle' | 'working' | 'error'>('idle')

  async function download() {
    setState('working')
    try {
      const { downloadReportPdf } = await import('./report-pdf')
      await downloadReportPdf(report)
      setState('idle')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="report-no-print flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={download}
        disabled={state === 'working'}
        aria-busy={state === 'working'}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-olive-950 px-5 text-sm font-medium text-white hover:bg-olive-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-950 disabled:opacity-60 dark:bg-olive-300 dark:text-olive-950 dark:hover:bg-olive-200"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-current">
          <path d="M10 2a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42L9 11.6V3a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z" />
        </svg>
        {state === 'working' ? 'Preparing PDF…' : 'Download PDF report'}
      </button>
      {state === 'error' ? <p className="text-sm text-red-700 dark:text-red-400">The PDF could not be created. Please try again.</p> : null}
    </div>
  )
}

function Recommendations({ items }: { items: Recommendation[] }) {
  if (items.length === 0) {
    return <p className="mt-4 text-base/7 text-olive-700 dark:text-olive-300">Nothing major to fix. Keep reviews and photos coming.</p>
  }
  return (
    <ol className="mt-6 space-y-4">
      {items.map((rec, index) => (
        <li key={rec.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 rounded-2xl border border-olive-950/10 bg-white p-5 dark:border-white/10 dark:bg-olive-900">
          <span className="font-display text-2xl text-[#596352] dark:text-olive-300">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-olive-950 dark:text-white">{rec.title}</h3>
              <span className={clsx('inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset', PRIORITY_STYLES[rec.priority])}>
                {rec.priority} priority
              </span>
              {rec.pointsAvailable > 0 ? (
                <span className="text-xs font-medium text-olive-600 dark:text-olive-400">+{rec.pointsAvailable} points</span>
              ) : null}
            </div>
            <p className="mt-1.5 text-sm/6 text-olive-700 dark:text-olive-300">{rec.action}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function ManualChecks({ items }: { items: string[] }) {
  return (
    <section className="mt-14" aria-labelledby="manual-title">
      <h2 id="manual-title" className="font-display text-3xl tracking-tight text-olive-950 dark:text-white">
        Also check these yourself
      </h2>
      <p className="mt-2 text-base/7 text-olive-700 dark:text-olive-300">Google does not share these publicly, so they are not in your score.</p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => {
          const [lead, ...rest] = item.split(': ')
          return (
            <li key={item} className="flex gap-3 text-sm/6 text-olive-700 dark:text-olive-300">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-olive-950/40 dark:bg-white/40" />
              <span>
                <span className="font-semibold text-olive-950 dark:text-white">{lead}.</span> {rest.join(': ')}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Cta() {
  return (
    <section className="report-no-print mt-16 rounded-3xl bg-olive-950 px-6 py-10 text-white sm:px-10 dark:bg-olive-900">
      <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Want help fixing these?</h2>
      <p className="mt-3 max-w-2xl text-base/7 text-white/75">
        We set up review requests, photos, hours and categories for home-service businesses, so your profile keeps working while you are on the job.
      </p>
      <div className="mt-6">
        <ButtonLink href={BOOKING_URL} size="lg" color="light">
          Book a free 30-minute call
        </ButtonLink>
      </div>
    </section>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function FoundView({ report }: { report: FoundReport }) {
  const b = report.business
  return (
    <>
      <header className="flex flex-col gap-8 rounded-3xl border border-olive-950/10 bg-white p-6 sm:p-10 lg:flex-row lg:items-center dark:border-white/10 dark:bg-olive-900">
        <ScoreRing score={report.score} grade={report.grade} />
        <div className="min-w-0 flex-1">
          <p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">Google Business Profile report · Grade {report.grade}</p>
          <h1 className="mt-1 font-display text-4xl tracking-tight text-balance text-olive-950 sm:text-5xl dark:text-white">{b.name}</h1>
          <p className="mt-2 text-sm/6 text-olive-600 dark:text-olive-400">
            {b.address}
            {b.primaryCategory ? ` · ${b.primaryCategory}` : ''}
          </p>
          <p className="mt-4 max-w-2xl text-base/7 text-olive-800 dark:text-olive-200">{report.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <DownloadButton report={report} />
            {b.googleMapsUri ? (
              <a href={b.googleMapsUri} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-olive-950 underline underline-offset-4 dark:text-white">
                View on Google Maps
              </a>
            ) : null}
          </div>
        </div>
      </header>

      {!report.websiteMatched ? (
        <p className="mt-6 rounded-2xl border border-[#b8892e]/30 bg-[#b8892e]/10 px-5 py-4 text-sm/6 text-olive-800 dark:text-olive-200">
          This profile does not link to {new URL(report.website).hostname}. If this is not your business, start over and pick a different match.
        </p>
      ) : null}

      <section className="mt-14" aria-labelledby="checks-title">
        <h2 id="checks-title" className="font-display text-3xl tracking-tight text-olive-950 dark:text-white">
          Your score, line by line
        </h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-olive-950/10 bg-white dark:border-white/10 dark:bg-olive-900">
          <table className="w-full text-left text-sm/6">
            <caption className="sr-only">Profile checks and points</caption>
            <thead className="bg-olive-50 text-olive-700 dark:bg-olive-950/40 dark:text-olive-300">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold sm:px-5">Check</th>
                <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">What we found</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold sm:px-5">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-olive-950/10 dark:divide-white/10">
              {report.checks.map((c) => (
                <tr key={c.id} className="align-top">
                  <td className="px-4 py-4 sm:px-5">
                    <div className="flex items-center gap-2">
                      <span aria-hidden="true" className={clsx('size-2.5 shrink-0 rounded-full', STATUS_STYLES[c.status].dot)} />
                      <span className="font-semibold text-olive-950 dark:text-white">{c.label}</span>
                      <span className="sr-only">({STATUS_STYLES[c.status].label})</span>
                    </div>
                    <p className="mt-1 text-olive-700 sm:hidden dark:text-olive-300">
                      <span className="font-medium text-olive-950 dark:text-white">{c.value}.</span> {c.detail}
                    </p>
                  </td>
                  <td className="hidden px-4 py-4 sm:table-cell">
                    <span className="font-medium text-olive-950 dark:text-white">{c.value}</span>
                    <p className="mt-0.5 text-olive-700 dark:text-olive-300">{c.detail}</p>
                  </td>
                  <td className="px-4 py-4 text-right font-medium whitespace-nowrap text-olive-950 tabular-nums sm:px-5 dark:text-white">
                    {c.points} / {c.maxPoints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="recs-title">
        <h2 id="recs-title" className="font-display text-3xl tracking-tight text-olive-950 dark:text-white">
          What to fix first
        </h2>
        <Recommendations items={report.recommendations} />
      </section>

      {report.competitors.length > 1 ? (
        <section className="mt-14" aria-labelledby="comp-title">
          <h2 id="comp-title" className="font-display text-3xl tracking-tight text-olive-950 dark:text-white">
            You vs. the top {report.benchmarks.competitorCount} nearby
          </h2>
          <p className="mt-2 text-base/7 text-olive-700 dark:text-olive-300">
            The businesses Google shows first for {b.primaryCategory ? b.primaryCategory.toLowerCase() : 'your trade'}
            {b.city ? ` in ${b.city}` : ' near you'}.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-olive-950/10 bg-white dark:border-white/10 dark:bg-olive-900">
            <table className="w-full min-w-[36rem] text-left text-sm/6">
              <caption className="sr-only">Comparison with nearby competitors</caption>
              <thead className="bg-olive-50 text-olive-700 dark:bg-olive-950/40 dark:text-olive-300">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-5">Business</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Rating</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Reviews</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Photos</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Hours</th>
                  <th scope="col" className="px-4 py-3 font-semibold sm:pr-5">Website</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-olive-950/10 dark:divide-white/10">
                {report.competitors.map((row) => (
                  <tr key={`${row.name}-${row.isYou}`} className={row.isYou ? 'bg-[#596352]/10' : undefined}>
                    <th scope="row" className="px-4 py-3 font-medium text-olive-950 sm:px-5 dark:text-white">
                      {row.name}
                      {row.isYou ? <span className="ml-2 rounded-full bg-olive-950 px-2 py-0.5 text-xs text-white dark:bg-olive-300 dark:text-olive-950">You</span> : null}
                    </th>
                    <td className="px-4 py-3 text-right tabular-nums">{row.rating === null ? '–' : row.rating.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.reviewCount.toLocaleString('en-US')}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.photoCount >= 10 ? '10+' : row.photoCount}</td>
                    <td className="px-4 py-3">{row.hasHours ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3 sm:pr-5">{row.hasWebsite ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs/5 text-olive-600 dark:text-olive-400">Google shares up to 10 photos per profile, so 10+ means 10 or more.</p>
        </section>
      ) : null}

      <ManualChecks items={report.manualChecks} />
      <Cta />
      <p className="mt-8 text-xs/5 text-olive-600 dark:text-olive-400">
        Report created {formatDate(report.generatedAt)} from public Google Maps data. Scores are Kickbord&apos;s own estimate, not a Google ranking.
      </p>
    </>
  )
}

function NotFoundView({ report }: { report: NotFoundReport }) {
  return (
    <>
      <header className="rounded-3xl border border-olive-950/10 bg-white p-6 sm:p-10 dark:border-white/10 dark:bg-olive-900">
        <p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">Google Business Profile report</p>
        <h1 className="mt-1 font-display text-4xl tracking-tight text-balance text-olive-950 sm:text-5xl dark:text-white">
          We could not find a Google profile for {new URL(report.website).hostname}
        </h1>
        <p className="mt-4 max-w-2xl text-base/7 text-olive-800 dark:text-olive-200">
          That usually means the profile is not claimed, is not linked to your website, or does not exist yet. Customers searching Maps may not find you.
        </p>
        <div className="mt-6">
          <DownloadButton report={report} />
        </div>
      </header>
      <section className="mt-14" aria-labelledby="recs-title">
        <h2 id="recs-title" className="font-display text-3xl tracking-tight text-olive-950 dark:text-white">
          Where to start
        </h2>
        <Recommendations items={report.recommendations} />
      </section>
      <ManualChecks items={report.manualChecks} />
      <Cta />
    </>
  )
}

export function ReportView({ report }: { report: GbpReport }) {
  return (
    <article id="report" tabIndex={-1} data-testid="gbp-report" className="outline-none">
      {report.sample ? (
        <p className="mb-6 rounded-2xl border border-[#7b627d]/30 bg-[#7b627d]/10 px-5 py-4 text-sm/6 font-medium text-olive-900 dark:text-olive-100">
          Sample data. No Google key is set on this preview, so the business and competitors below are made up.
        </p>
      ) : null}
      {report.kind === 'found' ? <FoundView report={report} /> : <NotFoundView report={report} />}
    </article>
  )
}
