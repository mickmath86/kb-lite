'use client'

import React, { useState, useEffect, useCallback, useRef, useId } from 'react'
import { clsx } from 'clsx/lite'
import { ArrowNarrowLeftIcon } from '@/components/icons/arrow-narrow-left-icon'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { BanknotesIcon } from '@/components/icons/banknotes-icon'
import { BellIcon } from '@/components/icons/bell-icon'
import { BuildingStorefrontIcon } from '@/components/icons/building-storefront-icon'
import { CalendarIcon } from '@/components/icons/calendar-icon'
import { ChartBarIcon } from '@/components/icons/chart-bar-icon'
import { ChartLineIcon } from '@/components/icons/chart-line-icon'
import { ChatBubbleCircleIcon } from '@/components/icons/chat-bubble-circle-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { ClockIcon } from '@/components/icons/clock-icon'
import { CogIcon } from '@/components/icons/cog-icon'
import { CompassIcon } from '@/components/icons/compass-icon'
import { InboxIcon } from '@/components/icons/inbox-icon'
import { LightBulbIcon } from '@/components/icons/light-bulb-icon'
import { LightingBoltIcon } from '@/components/icons/lighting-bolt-icon'
import { MailIcon } from '@/components/icons/mail-icon'
import { MapPinIcon } from '@/components/icons/map-pin-icon'
import { MicrophoneIcon } from '@/components/icons/microphone-icon'
import { RepeatIcon } from '@/components/icons/repeat-icon'
import { RocketIcon } from '@/components/icons/rocket-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { StarIcon } from '@/components/icons/star-icon'
import { TargetIcon } from '@/components/icons/target-icon'
import { UiLayoutIcon } from '@/components/icons/ui-layout-icon'
import { UserCircleIcon } from '@/components/icons/user-circle-icon'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface LeadInfo {
  company: string
  owner: string
  trade: string
  notes: string
  siteUrl: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────────────────────────────────────

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={clsx(
      'font-mono text-xs font-semibold uppercase tracking-widest',
      light ? 'text-white/60' : 'text-olive-500 dark:text-olive-400'
    )}>
      {children}
    </p>
  )
}

function SlideHeadline({ children, light = false, className }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <h1 className={clsx(
      'font-display tracking-tight',
      light ? 'text-white' : 'text-olive-950 dark:text-white',
      className ?? 'text-4xl sm:text-5xl lg:text-6xl'
    )}>
      {children}
    </h1>
  )
}

function SlideSubhead({ children, light = false, className }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={clsx(
      'text-base/7 sm:text-lg/8',
      light ? 'text-white/75' : 'text-olive-700 dark:text-olive-300',
      className
    )}>
      {children}
    </p>
  )
}

function Chip({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span className={clsx(
      'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium',
      accent
        ? 'bg-white text-olive-950'
        : 'bg-white/10 text-white'
    )}>
      {children}
    </span>
  )
}

function CheckItem({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <li className={clsx('flex items-start gap-3 text-sm/6', light ? 'text-white/85' : 'text-olive-700 dark:text-olive-300')}>
      <span className={clsx('mt-0.5 size-4 shrink-0', light ? 'text-white/60' : 'text-olive-500')}>
        <CheckmarkIcon />
      </span>
      {children}
    </li>
  )
}

function AutomationRow({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-0.5 text-xs text-white/60">{desc}</p>
      </div>
    </div>
  )
}

function PlanCard({
  name,
  price,
  period = '/mo',
  tagline,
  features,
  popular = false,
  dark = false,
}: {
  name: string
  price: string
  period?: string
  tagline: string
  features: string[]
  popular?: boolean
  dark?: boolean
}) {
  return (
    <div className={clsx(
      'relative flex flex-col gap-4 rounded-2xl border p-6',
      popular
        ? 'border-white bg-white/15 ring-2 ring-white'
        : dark
        ? 'border-white/10 bg-white/5'
        : 'border-olive-950/10 bg-white dark:border-white/10 dark:bg-white/5'
    )}>
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-bold text-olive-950">
          Most Popular
        </span>
      )}
      <div>
        <p className={clsx('text-xs font-semibold uppercase tracking-widest', dark || popular ? 'text-white/60' : 'text-olive-500')}>
          {name}
        </p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className={clsx('font-display text-4xl', dark || popular ? 'text-white' : 'text-olive-950 dark:text-white')}>{price}</span>
          <span className={clsx('text-sm', dark || popular ? 'text-white/50' : 'text-olive-500')}>{period}</span>
        </div>
        <p className={clsx('mt-2 text-xs/5', dark || popular ? 'text-white/70' : 'text-olive-600 dark:text-olive-400')}>{tagline}</p>
      </div>
      <ul className="flex flex-col gap-2">
        {features.map((f) => (
          <li key={f} className={clsx('flex items-start gap-2 text-xs/5', dark || popular ? 'text-white/80' : 'text-olive-700 dark:text-olive-300')}>
            <span className={clsx('mt-0.5 size-3.5 shrink-0', dark || popular ? 'text-white/40' : 'text-olive-400')}>
              <CheckmarkIcon />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Pre-call input screen (Slide 0 — admin eyes only)
// ─────────────────────────────────────────────────────────────────────────────

function PreCallScreen({ info, onChange, onStart }: {
  info: LeadInfo
  onChange: (field: keyof LeadInfo, value: string) => void
  onStart: () => void
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,oklch(33%_0.03_107)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,oklch(25%_0.025_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <img src="/Logos/icon.svg" alt="Kickbord" width={80} height={27} className="mx-auto mb-6 brightness-0 invert opacity-70" />
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">Pre-call setup</p>
          <h1 className="mt-3 font-display text-3xl text-white">Fill in before the call starts.</h1>
          <p className="mt-2 text-sm text-white/50">This information personalises the deck throughout. Not visible to the prospect.</p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/40">
              Company name <span className="text-white/20">(required)</span>
            </label>
            <input
              type="text"
              value={info.company}
              onChange={(e) => onChange('company', e.target.value)}
              placeholder="e.g. Alvarez Roofing"
              className="w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-base text-white placeholder-white/25 outline-none ring-0 transition focus:border-white/40 focus:bg-white/12"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/40">
              Owner / contact name
            </label>
            <input
              type="text"
              value={info.owner}
              onChange={(e) => onChange('owner', e.target.value)}
              placeholder="e.g. Carlos Alvarez"
              className="w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-base text-white placeholder-white/25 outline-none ring-0 transition focus:border-white/40 focus:bg-white/12"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/40">
              Trade / business type
            </label>
            <input
              type="text"
              value={info.trade}
              onChange={(e) => onChange('trade', e.target.value)}
              placeholder="e.g. Roofing, HVAC, Plumbing…"
              className="w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-base text-white placeholder-white/25 outline-none ring-0 transition focus:border-white/40 focus:bg-white/12"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/40">
              Current website URL
              <span className="ml-2 normal-case tracking-normal font-normal text-white/30">(optional — embeds their live site in the deck)</span>
            </label>
            <input
              type="url"
              value={info.siteUrl}
              onChange={(e) => onChange('siteUrl', e.target.value)}
              placeholder="https://theirwebsite.com"
              className="w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-base text-white placeholder-white/25 outline-none ring-0 transition focus:border-white/40 focus:bg-white/12"
            />
            {info.siteUrl && (
              <p className="mt-1.5 text-xs text-white/35">
                A live preview slide will appear after the cover. Note: some sites block embedding — a fallback link is shown if so.
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/40">
              Pre-call notes
            </label>
            <textarea
              value={info.notes}
              onChange={(e) => onChange('notes', e.target.value)}
              placeholder="Pain points, current setup, conversation context…"
              rows={3}
              className="w-full resize-none rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-base text-white placeholder-white/25 outline-none ring-0 transition focus:border-white/40 focus:bg-white/12"
            />
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="mt-8 w-full rounded-xl bg-white py-4 text-sm font-semibold text-olive-950 transition hover:bg-white/90 active:scale-[0.98]"
        >
          Start presentation →
        </button>

        <p className="mt-4 text-center text-xs text-white/25">
          Press → or Space to advance once started. Press Esc to return here anytime.
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES 1–18 (all receive `info` prop for personalisation)
// ─────────────────────────────────────────────────────────────────────────────

// Slide 1.5 (conditional) — Live Site Preview
function SitePreviewSlide({ info }: { info: LeadInfo }) {
  const [blocked, setBlocked] = useState(false)
  const url = info.siteUrl

  // Normalise URL — ensure it has a protocol
  const normalised = url.startsWith('http') ? url : `https://${url}`

  // Detect blocked embeds via iframe load error
  // (some browsers fire onError, others just show a blank frame)
  function handleError() {
    setBlocked(true)
  }

  const company = info.company || 'Their site'

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-olive-950">
      {/* Header bar */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">Current site</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">{company}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* URL pill */}
          <span className="max-w-xs truncate rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/50">
            {normalised}
          </span>
          {/* Open in new tab */}
          <a
            href={normalised}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
          >
            <svg className="size-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2H2.5A1.5 1.5 0 0 0 1 3.5v10A1.5 1.5 0 0 0 2.5 15h10A1.5 1.5 0 0 0 14 13.5V10M10 1h5m0 0v5m0-5L6.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Open in tab
          </a>
        </div>
      </div>

      {/* Iframe or blocked fallback */}
      {blocked ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-white/5">
            <svg className="size-8 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="font-display text-2xl text-white">This site blocks embedding.</p>
            <p className="mt-2 text-sm text-white/50">Many sites prevent iframe previews for security reasons. Open it in a new tab instead.</p>
          </div>
          <a
            href={normalised}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-olive-950 transition hover:opacity-90"
          >
            Open {company} website
            <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2H2.5A1.5 1.5 0 0 0 1 3.5v10A1.5 1.5 0 0 0 2.5 15h10A1.5 1.5 0 0 0 14 13.5V10M10 1h5m0 0v5m0-5L6.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p className="text-xs text-white/30">Tip: bookmark their URL before the call so you can pull it up quickly.</p>
        </div>
      ) : (
        <iframe
          key={normalised}
          src={normalised}
          className="flex-1 w-full border-0"
          title={`${company} website preview`}
          onError={handleError}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      )}
    </div>
  )
}

// Slide 1 — Your Contractor Website Rebuild (personalised cover)
function Slide1({ info }: { info: LeadInfo }) {
  const company = info.company || 'Your Business'
  const trade = info.trade || 'contracting'

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-olive-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_-20%,oklch(33%_0.03_107)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_120%,oklch(25%_0.025_107)_0%,transparent_55%)]" />

      <div className="relative z-10 flex w-full lg:w-1/2 flex-col items-center justify-center px-8 py-16">
        <div className="flex max-w-xl flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <img src="/Logos/icon.svg" alt="Kickbord" width={100} height={34} className="brightness-0 invert opacity-80" />

          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
              Prepared for {company}
            </p>
            <SlideHeadline light className="text-5xl sm:text-6xl lg:text-7xl">
              Your {trade} website rebuild.
            </SlideHeadline>
          </div>

          <SlideSubhead light className="text-lg/8">
            A better site is the starting point — but the real win is what happens around it.
          </SlideSubhead>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <Chip><UiLayoutIcon />New site</Chip>
            <Chip><LightingBoltIcon />Faster response</Chip>
            <Chip><TargetIcon />More booked jobs</Chip>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative w-1/2">
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
          alt="Contractor at work"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-olive-950" />
      </div>
    </div>
  )
}

// Slide 2 — What We Changed
function Slide2({ info }: { info: LeadInfo }) {
  const company = info.company || 'Your site'

  const changes = [
    { icon: <LightBulbIcon />, title: 'Clearer headline and service positioning', desc: 'Visitors know what you do and who you serve within the first 3 seconds.' },
    { icon: <StarIcon />, title: 'Stronger trust signals', desc: 'Reviews, credentials, and social proof surfaced prominently — not buried.' },
    { icon: <TargetIcon />, title: 'Conversion-focused CTAs', desc: 'One clear next action on every page. Call, text, or book — no ambiguity.' },
    { icon: <UiLayoutIcon />, title: 'Better mobile conversion path', desc: 'Tap-to-call, simplified forms, and fast load times for mobile-first visitors.' },
    { icon: <InboxIcon />, title: 'Improved lead capture', desc: 'Multiple contact options so you capture leads from every type of visitor.' },
    { icon: <MicrophoneIcon />, title: 'Local search structure', desc: 'Page structure and content organised for local search relevance.' },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-7xl">
        <div className="mb-10">
          <Eyebrow>The rebuild — {company}</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
            What changed on your site.
          </SlideHeadline>
          <SlideSubhead className="mt-4 max-w-2xl">
            Not just a visual refresh — every change was made to help you earn more trust and convert more visitors into inquiries.
          </SlideSubhead>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {changes.map((c) => (
            <div key={c.title} className="flex items-start gap-4 rounded-2xl border border-olive-950/10 bg-white p-5 dark:border-white/10 dark:bg-white/5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-olive-950/5 text-olive-700 dark:bg-white/10 dark:text-olive-300">
                {c.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-olive-950 dark:text-white">{c.title}</p>
                <p className="mt-1 text-xs text-olive-600 dark:text-olive-400">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Slide 3 — What Most Contractor Websites Get Wrong
function Slide3({ info }: { info: LeadInfo }) {
  const problems = [
    { headline: 'They look fine but don\'t convert consistently', text: 'A professional appearance is table stakes. Without clear conversion paths, traffic doesn\'t become leads.' },
    { headline: 'Leads come in but response is too slow', text: 'Email-only form notifications mean leads sit for hours. By then, they\'ve already called someone else.' },
    { headline: 'No backup when calls go unanswered', text: 'If your phone rings while you\'re on a job and nobody picks up, that lead is almost certainly gone.' },
    { headline: 'Reviews are an afterthought', text: 'Happy customers don\'t leave reviews unless you ask at exactly the right moment — most businesses never do.' },
    { headline: 'Not connected to local growth systems', text: 'The site is disconnected from review generation, Google Business Profile, and follow-up — so it leaks revenue.' },
    { headline: 'Weak structure for local search', text: 'Most contractor sites aren\'t structured to rank in local search where homeowners are actively looking.' },
  ]

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,oklch(28%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-7xl">
        <div className="mb-10 text-center">
          <Eyebrow light>The gap</Eyebrow>
          <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
            What most contractor websites<br />get wrong.
          </SlideHeadline>
          <p className="mt-3 text-lg text-white/70 max-w-xl mx-auto">
            A new site solves the first impression problem. It doesn't automatically fix these.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <div key={p.headline} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">{p.headline}</p>
              <p className="text-xs/5 text-white/65">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Slide 4 — A Website Should Do More Than Sit There (the bridge slide)
function Slide4({ info }: { info: LeadInfo }) {
  const company = info.company || 'your business'

  const capabilities = [
    { icon: <InboxIcon />, label: 'Capture every inquiry', desc: 'Forms, chat, text — multiple ways to reach you.' },
    { icon: <LightingBoltIcon />, label: 'Route leads instantly', desc: 'SMS alerts in seconds, not email batches.' },
    { icon: <BellIcon />, label: 'Notify the right person fast', desc: 'The right team member gets the lead immediately.' },
    { icon: <RepeatIcon />, label: 'Follow up automatically', desc: 'Sequences fire without anyone on your team manually sending.' },
    { icon: <CalendarIcon />, label: 'Remind and re-engage', desc: 'Appointment reminders and cold-lead nurture built in.' },
    { icon: <StarIcon />, label: 'Generate reviews systematically', desc: 'Post-job review requests sent at the perfect moment.' },
  ]

  return (
    <div className="flex h-full w-full items-center justify-center px-8 py-16 bg-white dark:bg-olive-950">
      <div className="w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(48%_0.09_145)] to-[oklch(42%_0.08_145)] p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(52%_0.1_145)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(40%_0.07_145)_0%,transparent_50%)]" />

          <div className="relative z-10">
            <div className="mb-10 max-w-2xl">
              <Eyebrow light>The shift</Eyebrow>
              <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
                A website should do more than sit there.
              </SlideHeadline>
              <p className="mt-4 text-lg/8 text-white/80">
                A modern {info.trade || 'contractor'} site should capture, route, notify, follow up, remind, and help{' '}
                {company !== 'your business' ? company : 'your business'} generate reviews.
                Without those systems, even a great-looking site still leaks revenue.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((c) => (
                <div key={c.label} className="flex items-start gap-4 rounded-xl bg-white/10 p-4">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    {c.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{c.label}</p>
                    <p className="mt-0.5 text-xs text-white/65">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 5 — About Kickbord
function Slide5({ info }: { info: LeadInfo }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <div>
              <Eyebrow>About Kickbord</Eyebrow>
              <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
                Enterprise-level strategy.<br />Built for real businesses.
              </SlideHeadline>
            </div>
            <SlideSubhead>
              Kickbord was created to give ambitious small businesses the same calibre of marketing, systems, and strategy that Fortune 500 brands use — without the agency overhead.
            </SlideSubhead>
            <blockquote className="rounded-xl border-l-4 border-olive-950/20 pl-5 italic text-olive-700 dark:border-white/20 dark:text-olive-300">
              "Enterprise-level strategy and systems for growing businesses that should not have to figure it all out alone."
            </blockquote>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-olive-950/10 bg-olive-950 p-8 dark:bg-white/5">
              <img
                src="/mike.png"
                alt="Mike Mathias"
                className="mb-4 h-20 w-20 rounded-full object-cover"
              />
              <p className="font-display text-xl text-white">Mike Mathias</p>
              <p className="mt-1 text-sm text-white/60">Founder, Kickbord</p>
              <div className="mt-6 flex flex-col gap-3">
                {[
                  'Rebuilt the Google Ads web platform',
                  'Enterprise campaigns at Nike, Samsung, Verizon',
                  'Global digital work at BBC, P&G, LinkedIn',
                  'Founder-led — on every client engagement',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                    <span className="mt-0.5 size-4 shrink-0 text-white/40"><CheckmarkIcon /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-olive-950/10 pt-10 dark:border-white/10">
          <p className="mb-6 text-center text-sm text-olive-500 dark:text-olive-400">Experience from world-class brands</p>
          <div className="mx-auto grid w-full max-w-4xl grid-cols-3 place-items-center gap-x-8 gap-y-6 sm:grid-cols-6 opacity-60">
            <Logo><img src="https://cdn.brandfetch.io/id6O2oGzv-/w/800/h/271/theme/light/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ" className="grayscale brightness-0 dark:brightness-0 dark:invert" alt="Google" width={94} height={32} /></Logo>
            <Logo><img src="https://cdn.brandfetch.io/idtEghWGp4/w/800/h/229/theme/dark/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ" className="grayscale brightness-0 dark:brightness-0 dark:invert" alt="BBC" width={112} height={32} /></Logo>
            <Logo><img src="https://cdn.brandfetch.io/id_0dwKPKT/w/800/h/278/theme/light/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ" className="grayscale brightness-0 dark:brightness-0 dark:invert" alt="Nike" width={92} height={32} /></Logo>
            <Logo><img src="https://cdn.brandfetch.io/iduaw_nOnR/w/800/h/122/theme/light/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ" className="grayscale brightness-0 dark:brightness-0 dark:invert" alt="Samsung" width={210} height={32} /></Logo>
            <Logo><img src="https://cdn.brandfetch.io/id6htIcs_f/w/90/h/90/theme/dark/id4N0u-dxx.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ" className="grayscale brightness-0 dark:brightness-0 dark:invert" alt="P&G" width={32} height={32} /></Logo>
            <Logo><img src="https://cdn.brandfetch.io/idXhrQrb5t/w/800/h/179/theme/dark/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ" className="grayscale brightness-0 dark:brightness-0 dark:invert" alt="Verizon" width={143} height={32} /></Logo>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 6 — Who Kickbord Helps
function Slide6({ info }: { info: LeadInfo }) {
  const segments = [
    { icon: <BuildingStorefrontIcon />, title: 'Growing contractors with real demand', desc: 'Already getting leads but struggling to handle them consistently.' },
    { icon: <UserCircleIcon />, title: 'Lean teams without marketing leadership', desc: 'No in-house CMO — the owner wears all the hats.' },
    { icon: <UiLayoutIcon />, title: 'Businesses that need modernisation', desc: 'Outdated websites, no follow-up systems, inconsistent reviews.' },
    { icon: <ClockIcon />, title: 'Owners losing jobs to response time', desc: 'Getting the lead but losing the job because a competitor responded faster.' },
  ]

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <div className="hidden lg:block relative w-2/5">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop"
          alt="Contractor reviewing plans"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white dark:to-olive-950" />
      </div>

      <div className="flex w-full lg:w-3/5 flex-col items-center justify-center px-8 py-16">
        <div className="w-full max-w-3xl">
          <div className="mb-10 text-center lg:text-left">
            <Eyebrow>Who we help</Eyebrow>
            <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
              Built for contractors who are<br />already doing the work.
            </SlideHeadline>
            <SlideSubhead className="mx-auto lg:mx-0 mt-4 max-w-2xl">
              {info.company
                ? `Businesses like ${info.company} don't need more hustle — they need better systems to capture what they're already earning.`
                : "You don't need more hustle. You need better systems to capture what you're already earning."}
            </SlideSubhead>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {segments.map((s) => (
              <div key={s.title} className="flex items-start gap-4 rounded-2xl border border-olive-950/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-olive-950/5 text-olive-700 dark:bg-white/10 dark:text-olive-300">
                  {s.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-olive-950 dark:text-white">{s.title}</p>
                  <p className="mt-1 text-sm text-olive-600 dark:text-olive-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 7 — The Contractor Problem
function Slide7({ info }: { info: LeadInfo }) {
  const problems = [
    { image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop', headline: 'Missed calls = lost revenue', text: 'Homeowners move on within minutes when calls go unanswered.' },
    { image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop', headline: 'Slow web lead response', text: 'Leads sit untouched for hours while competitors respond instantly.' },
    { image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop', headline: 'First to respond wins', text: 'Homeowners compare multiple contractors — speed determines who gets the job.' },
    { image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop', headline: 'Inconsistent reviews', text: "Happy customers don't leave reviews unless you ask at the right time." },
    { image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', headline: 'Under-optimised local presence', text: 'Google Business Profile is incomplete, hurting local visibility and rankings.' },
    { image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop', headline: 'Follow-up breaks down', text: "Field teams are busy working — no one manages systematic follow-up." },
  ]

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,oklch(28%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-7xl">
        <div className="mb-10 text-center">
          <Eyebrow light>The contractor problem</Eyebrow>
          <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
            {info.company
              ? `${info.company} isn't losing jobs because of the work.`
              : "You're not losing jobs because of your work."}
          </SlideHeadline>
          <p className="mt-3 text-lg text-white/70">
            {info.trade
              ? `Most ${info.trade.toLowerCase()} businesses lose jobs before the estimate is ever sent.`
              : "You're losing them because of what happens before the estimate."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem.headline} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 overflow-hidden">
              <div className="relative h-32 -mx-4 -mt-4 mb-1">
                <img src={problem.image} alt={problem.headline} className="absolute inset-0 h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-olive-950" />
              </div>
              <h3 className="text-sm font-semibold text-white">{problem.headline}</h3>
              <p className="text-sm/6 text-white/70">{problem.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Slide 8 — Why This Matters
function Slide8({ info }: { info: LeadInfo }) {
  const pathId = useId()
  const points = [
    { icon: <LightingBoltIcon />, stat: '78%', label: 'of jobs go to the first contractor to respond', sub: 'Speed-to-lead is your single biggest conversion lever.' },
    { icon: <StarIcon />, stat: '4.5×', label: 'more likely to win when reviews exceed competitors', sub: 'Review quantity and rating directly influence local rankings and trust.' },
    { icon: <ChartLineIcon />, stat: '3×', label: 'ROI loss from slow follow-up on paid ad leads', sub: 'Every dollar spent on ads is wasted if the lead is not contacted fast.' },
    { icon: <MapPinIcon />, stat: 'Top 3', label: 'Google Local Pack captures 75% of local clicks', sub: 'Relevance, distance, and prominence — Kickbord improves all three.' },
  ]

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-8 py-16 overflow-hidden">
      {/* 👇 CONTAINER WIDTH: Change max-w-7xl to max-w-full for edge-to-edge, or max-w-6xl for narrower */}
      <div className="w-full max-w-7xl relative z-10">
        <div className="mb-10 text-center">
          <Eyebrow>Why this matters</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
            These aren't small problems.
          </SlideHeadline>
          <SlideSubhead className="mx-auto mt-4 max-w-xl">
            Slow response, weak reviews, and poor local visibility compound into a major revenue leak over time.
          </SlideSubhead>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.stat} className="flex items-start gap-5 rounded-2xl border border-olive-950/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-olive-950/5 text-olive-700 dark:bg-white/10 dark:text-olive-300">
                {p.icon}
              </span>
              <div>
                <p className="font-display text-3xl text-olive-950 dark:text-white">{p.stat}</p>
                <p className="mt-0.5 text-sm font-semibold text-olive-950 dark:text-white">{p.label}</p>
                <p className="mt-1 text-xs text-olive-500 dark:text-olive-400">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Graph background */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <svg
          className="h-full w-full fill-olive-950/10 stroke-olive-950/40 dark:fill-white/5 dark:stroke-white/20"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id={pathId}>
              <path d="M 0 400 L 0 383 C 396 362.7936732276819, 804 264.31672304481856, 1200 60 L 1200 60 L 1200 400 Z" />
            </clipPath>
          </defs>
          <path
            d="M 0 400 L 0 383 C 396 362.7936732276819, 804 264.31672304481856, 1200 60 L 1200 60 L 1200 400 Z"
            stroke="none"
          />
          <g strokeWidth="1" strokeDasharray="4 3" clipPath={`url(#${pathId})`}>
            <line x1="0.5" y1="400" x2="0.5" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="92.3076923076923" y1="400" x2="92.3076923076923" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="184.6153846153846" y1="400" x2="184.6153846153846" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="276.9230769230769" y1="400" x2="276.9230769230769" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="369.2307692307692" y1="400" x2="369.2307692307692" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="461.53846153846155" y1="400" x2="461.53846153846155" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="553.8461538461538" y1="400" x2="553.8461538461538" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="646.1538461538462" y1="400" x2="646.1538461538462" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="738.4615384615385" y1="400" x2="738.4615385" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="830.7692307692307" y1="400" x2="830.7692307692307" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="923.0769230769231" y1="400" x2="923.0769230769231" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="1015.3846153846154" y1="400" x2="1015.3846153846154" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="1107.6923076923076" y1="400" x2="1107.6923076923076" y2="0" vectorEffect="non-scaling-stroke" />
            <line x1="1199.5" y1="400" x2="1199.5" y2="0" vectorEffect="non-scaling-stroke" />
          </g>
          <path
            d="M 0 383 C 396 362.7936732276819, 804 264.31672304481856, 1200 60"
            fill="none"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  )
}

// Slide 9 — What the Kickbord System Includes
function Slide9({ info }: { info: LeadInfo }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const items = [
    'Conversion-focused website or landing page',
    'Missed-call text back',
    'Instant form follow-up',
    'SMS lead alerts (not just email)',
    'Web chat widget',
    'Automated review requests',
    'Lead routing and conversation routing',
    'Contact database and CRM foundation',
    'Basic reporting dashboard',
    'Optional AI voice for after-hours',
  ]

  return (
    <div className="relative flex h-full w-full items-center justify-center px-8 py-16 bg-white dark:bg-olive-950 overflow-hidden">
      {/* 👇 CONTAINER WIDTH: Change max-w-7xl to max-w-full for edge-to-edge, or max-w-6xl for narrower */}
      <div className="w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(48%_0.09_145)] to-[oklch(42%_0.08_145)] p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(52%_0.1_145)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(40%_0.07_145)_0%,transparent_50%)]" />

          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-6">
              <div>
                <Eyebrow light>The system</Eyebrow>
                <SlideHeadline light className="mt-3 text-4xl sm:text-5xl lg:text-6xl">
                  Everything working together,<br />not a pile of apps.
                </SlideHeadline>
              </div>

              <div className="flex flex-col gap-3 text-white/90">
                {items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 size-4 shrink-0 text-white"><CheckmarkIcon /></span>
                    <p className="text-sm/6">{item}</p>
                  </div>
                ))}
              </div>

              <p className="mt-2 text-sm text-white/60">
                All components run on one unified platform — no app juggling, no integration headaches.
              </p>
            </div>

            <div className="relative group">
              <button
                onClick={() => setLightboxOpen(true)}
                className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 bg-white/95 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] w-full"
              >
                <img
                  src="/images/kickbord_system.png"
                  alt="Kickbord system diagram"
                  className="w-full h-auto"
                />
                {/* Expand hint */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-white/90 p-3 shadow-lg">
                    <svg className="size-6 text-olive-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 flex items-center justify-center size-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="max-w-7xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src="/images/kickbord_system.png"
              alt="Kickbord system diagram - expanded view"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Slide 10 — Core Automations
function Slide10({ info }: { info: LeadInfo }) {
  const automations = [
    { icon: <ChatBubbleCircleIcon />, title: 'Missed-call rescue', desc: 'Text back immediately after any unanswered call. Keep the lead in play.' },
    { icon: <MailIcon />, title: 'Form follow-up', desc: 'Instant SMS + email the moment a web form is submitted.' },
    { icon: <CalendarIcon />, title: 'Appointment reminders', desc: '24-hour and 2-hour reminders to reduce no-shows.' },
    { icon: <ClockIcon />, title: 'No-response nurture', desc: 'Automatic follow-up sequence on leads that have not replied.' },
    { icon: <BanknotesIcon />, title: 'Estimate follow-up', desc: 'Revive cold quotes before they go to a competitor.' },
    { icon: <StarIcon />, title: 'Review request', desc: 'Post-job review request sent automatically after service completion.' },
    { icon: <RepeatIcon />, title: 'Seasonal campaigns', desc: 'Scheduled outreach for seasonal services and reminders.' },
    { icon: <InboxIcon />, title: 'Database reactivation', desc: 'Re-engage old leads and past customers who went cold.' },
  ]

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,oklch(28%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-7xl">
        <div className="mb-10">
          <Eyebrow light>Core automations</Eyebrow>
          <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
            Eight automations that run<br />while you're on the job.
          </SlideHeadline>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {automations.map((a) => (
            <AutomationRow key={a.title} icon={a.icon} title={a.title} desc={a.desc} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Slide 11 — Outcomes
function Slide11({ info }: { info: LeadInfo }) {
  const outcomes = [
    { icon: <LightingBoltIcon />, headline: 'Respond faster', body: 'Automated texts and follow-up fire within seconds — without anyone on your team lifting a finger.' },
    { icon: <TargetIcon />, headline: 'Capture more leads you already paid for', body: 'Stop losing ad spend to slow response. Every inquiry gets an immediate, professional reply.' },
    { icon: <CalendarIcon />, headline: 'Book more estimates', body: 'Nurture sequences revive cold leads and missed opportunities that would otherwise disappear.' },
    { icon: <StarIcon />, headline: 'Generate reviews consistently', body: 'Automated post-job review requests build your reputation without relying on customers to remember.' },
    { icon: <MapPinIcon />, headline: 'Strengthen local visibility', body: 'More reviews and optimised local presence improve your Google ranking over time.' },
    { icon: <CogIcon />, headline: 'Reduce chaos', body: 'All leads, replies, and follow-up live in one place — no more juggling email, texts, and voicemail.' },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-7xl">
        <div className="mb-10 text-center">
          <Eyebrow>Outcomes</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
            What this means for<br />
            {info.company ? `${info.company}.` : 'your business.'}
          </SlideHeadline>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((o) => (
            <div key={o.headline} className="flex flex-col gap-3 rounded-2xl border border-olive-950/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-olive-950/5 text-olive-700 dark:bg-white/10 dark:text-olive-300">
                {o.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-olive-950 dark:text-white">{o.headline}</p>
                <p className="mt-1 text-xs/5 text-olive-600 dark:text-olive-400">{o.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Slide 12 — Pricing Overview
function Slide12({ info }: { info: LeadInfo }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_-10%,oklch(33%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-7xl">
        <div className="mb-12 text-center">
          <Eyebrow light>Pricing</Eyebrow>
          <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
            Simple. Outcome-based. No surprises.
          </SlideHeadline>
          <p className="mt-3 text-white/60">Three plans built around where {info.company || 'your business'} is right now.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <PlanCard
            name="Launch"
            price="$297"
            tagline="Essential lead capture and follow-up — live fast."
            features={['Website / landing page', 'Missed-call text back', 'Instant form follow-up', 'SMS lead notifications', 'Web chat widget', 'Review request automation', 'Basic reporting']}
            dark
          />
          <PlanCard
            name="Grow"
            price="$497"
            tagline="Turn more inquiries into booked estimates."
            features={['Everything in Launch', 'Appointment reminders', 'Estimate follow-up', 'No-response nurture', 'Pipeline / lead routing', 'Database reactivation lite', 'Enhanced review automation']}
            popular
            dark
          />
          <PlanCard
            name="Scale"
            price="$797"
            tagline="Automate more. Scale without scaling admin."
            features={['Everything in Grow', 'AI voice / after-hours handling', 'Advanced workflow automation', 'Priority support', 'Monthly strategy call', 'Deeper lead management']}
            dark
          />
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Setup fees apply. Quarterly prepay available with bonus incentives.
        </p>
      </div>
    </div>
  )
}

// Slide 13 — Launch plan detail
function Slide13({ info }: { info: LeadInfo }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-7xl">
        <div className="mb-8">
          <Eyebrow>Launch plan</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">Get the essentials live fast.</SlideHeadline>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-olive-950/10 bg-white p-8 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-olive-500">Launch</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-6xl text-olive-950 dark:text-white">$297</span>
                <span className="text-olive-500">/mo</span>
              </div>
              <p className="mt-1 text-sm text-olive-600 dark:text-olive-400">Best for solo operators and smaller contractors who need the basics in place.</p>
              <div className="mt-4 rounded-lg bg-olive-950/5 px-4 py-2 dark:bg-white/5">
                <p className="text-xs text-olive-500">Setup fee: <span className="font-semibold text-olive-950 dark:text-white">$300–$500 one-time</span></p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-4 text-sm font-semibold text-olive-950 dark:text-white">What's included</p>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {['Website / landing page', 'Missed-call text back', 'Instant form follow-up', 'SMS lead notifications', 'Web chat widget', 'Review request automation', 'Basic reporting dashboard', 'CRM foundation'].map((f) => <CheckItem key={f}>{f}</CheckItem>)}
            </ul>
            <div className="mt-6 rounded-xl bg-olive-950/5 p-5 dark:bg-white/5">
              <p className="text-sm font-semibold text-olive-950 dark:text-white">Core message</p>
              <p className="mt-1 text-sm text-olive-700 dark:text-olive-300 italic">
                "Get the essential lead capture and follow-up system live fast. Stop losing the leads you're already paying for."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 14 — Grow plan detail
function Slide14({ info }: { info: LeadInfo }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_110%,oklch(28%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Eyebrow light>Grow plan</Eyebrow>
              <span className="rounded-full bg-white px-3 py-0.5 text-xs font-bold text-olive-950">Most Popular</span>
            </div>
            <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
              Turn more inquiries<br />into booked jobs.
            </SlideHeadline>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-6xl text-white">$497</p>
            <p className="text-white/50">/mo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Includes everything in Launch, plus:</p>
            <ul className="grid grid-cols-1 gap-2.5">
              {['Appointment reminders (24hr & 2hr)', 'Estimate / quote follow-up sequence', 'No-response lead nurture', 'Simple pipeline & lead routing', 'Database reactivation lite', 'Enhanced review automation', 'All Launch features included'].map((f) => <CheckItem key={f} light>{f}</CheckItem>)}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Best for</p>
              <p className="mt-1 text-sm text-white/70">
                {info.trade
                  ? `${info.trade} contractors already getting leads who want to convert more into booked estimates without hiring more staff.`
                  : 'Contractors already getting leads who want to convert more into booked estimates without hiring more staff.'}
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-5">
              <p className="text-sm font-semibold text-white">Core message</p>
              <p className="mt-1 text-sm text-white/70 italic">"Improve response speed, reduce lead leakage, and turn more inquiries into booked jobs."</p>
            </div>
            <div className="rounded-lg border border-white/10 px-4 py-2">
              <p className="text-xs text-white/40">Setup fee: <span className="font-semibold text-white/70">~$750 one-time</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 15 — Scale plan detail
function Slide15({ info }: { info: LeadInfo }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-7xl">
        <div className="mb-8">
          <Eyebrow>Scale plan</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">Automate the customer<br />journey end to end.</SlideHeadline>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-olive-950/10 bg-white p-8 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-olive-500">Scale</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-6xl text-olive-950 dark:text-white">$797</span>
                <span className="text-olive-500">/mo</span>
              </div>
              <p className="mt-1 text-sm text-olive-600 dark:text-olive-400">Best for established contractors ready to automate more of the customer journey.</p>
              <div className="mt-4 rounded-lg bg-olive-950/5 px-4 py-2 dark:bg-white/5">
                <p className="text-xs text-olive-500">Setup fee: <span className="font-semibold text-olive-950 dark:text-white">~$1,000 one-time</span></p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-4 text-sm font-semibold text-olive-950 dark:text-white">Everything in Grow, plus:</p>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {['AI voice agent (after-hours & overflow)', 'Advanced workflow automation', 'Priority support', 'Monthly optimisation & strategy call', 'Deeper lead management', 'Advanced follow-up systems', 'All Grow features included'].map((f) => <CheckItem key={f}>{f}</CheckItem>)}
            </ul>
            <div className="mt-6 rounded-xl bg-olive-950/5 p-5 dark:bg-white/5">
              <p className="text-sm font-semibold text-olive-950 dark:text-white">Core message</p>
              <p className="mt-1 text-sm text-olive-700 dark:text-olive-300 italic">"Add automation, reduce owner dependence, and scale follow-up without scaling admin."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 16 — Upsells + Quarterly
function Slide16({ info }: { info: LeadInfo }) {
  const quarters = [
    { plan: 'Launch', monthly: 297, quarterly: 800, bonuses: ['GBP optimization included or 50% off', 'Priority onboarding'] },
    { plan: 'Grow', monthly: 497, quarterly: 1250, bonuses: ['GBP optimization included or 50% off', 'Local Services Ads reduced to $400/mo', 'Priority onboarding'] },
    { plan: 'Scale', monthly: 797, quarterly: 1950, bonuses: ['GBP optimization included or 50% off', 'Local Services Ads reduced to $400/mo', 'SEO reduced to $400/mo'] },
  ]

  const upsells = [
    { title: 'Google Business Profile Optimization', price: '$500 one-time', desc: 'Full GBP audit, optimization, and setup to improve local search visibility.' },
    { title: 'Google Local Services Ads Management', price: '$500/mo', desc: 'Managed LSA to put your business at the top of local search results.' },
    { title: 'SEO / AI SEO', price: '$500/mo', desc: 'Ongoing local SEO and AI search optimization to strengthen organic visibility.' },
    { title: 'AI Voice Agent (standalone)', price: '$199/mo', desc: 'After-hours and overflow call handling without committing to Scale.' },
  ]

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_-10%,oklch(33%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-7xl">
        <div className="mb-8">
          <Eyebrow light>Add-ons and quarterly incentives</Eyebrow>
          <SlideHeadline light className="mt-3 text-3xl sm:text-4xl">
            More reach. Better value for commitment.
          </SlideHeadline>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Upsells */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">Add-on services</p>
            <div className="flex flex-col gap-2.5">
              {upsells.map((u) => (
                <div key={u.title} className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{u.title}</p>
                    <p className="mt-0.5 text-xs text-white/55">{u.desc}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white whitespace-nowrap">{u.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quarterly */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">Quarterly prepay bonuses</p>
            <div className="flex flex-col gap-2.5">
              {quarters.map((q) => {
                const monthlyCost = q.monthly * 3
                const savings = monthlyCost - q.quarterly
                return (
                  <div key={q.plan} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{q.plan} — ${q.quarterly}/qtr</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/40">vs. ${q.monthly}/mo × 3 = ${monthlyCost}</span>
                        <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-semibold text-green-400 whitespace-nowrap">Save ${savings}</span>
                      </div>
                    </div>
                    <ul className="mt-2 flex flex-col gap-1">
                      {q.bonuses.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-white/65">
                          <span className="mt-0.5 size-3.5 shrink-0 text-white/35"><CheckmarkIcon /></span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
              <p className="text-xs text-white/40 text-center pt-1">Setup fee reduced or waived entirely for quarterly prepay.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 17 — Setup + Next Steps
function Slide17({ info }: { info: LeadInfo }) {
  const steps = [
    { num: '01', title: 'Onboarding form & kickoff call', desc: 'We collect your business info, assets, and goals. Align on the build plan.' },
    { num: '02', title: 'Website, messaging & system setup', desc: 'Landing page built, CRM configured, and your brand voice applied throughout.' },
    { num: '03', title: 'Automation build & testing', desc: 'Every workflow is built, tested, and verified before anything goes live.' },
    { num: '04', title: 'Launch', desc: 'Everything goes live. You start capturing and responding to leads automatically.' },
    { num: '05', title: 'Optimisation & reporting', desc: 'Monthly review of what is working. Adjustments made to improve results over time.' },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* Setup fees */}
          <div>
            <div className="mb-6">
              <Eyebrow>Setup fee</Eyebrow>
              <SlideHeadline className="mt-3 text-3xl sm:text-4xl">Real setup work deserves a real setup fee.</SlideHeadline>
              <SlideSubhead className="mt-3">This covers real implementation — not a junk charge.</SlideSubhead>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { plan: 'Launch', fee: '$300–$500 one-time' },
                { plan: 'Grow', fee: '~$750 one-time' },
                { plan: 'Scale', fee: '~$1,000 one-time' },
              ].map((s) => (
                <div key={s.plan} className="flex items-center justify-between rounded-xl border border-olive-950/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <span className="text-sm font-semibold text-olive-950 dark:text-white">{s.plan}</span>
                  <span className="text-sm font-semibold text-olive-600 dark:text-olive-300">{s.fee}</span>
                </div>
              ))}
              <div className="rounded-xl border border-olive-950/10 bg-olive-950/5 px-5 py-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-semibold text-olive-950 dark:text-white">Quarterly prepay</p>
                <p className="mt-0.5 text-xs text-olive-500 dark:text-olive-400">Setup fee reduced or waived entirely</p>
              </div>
            </div>
          </div>

          {/* Onboarding steps */}
          <div>
            <div className="mb-6">
              <Eyebrow>After you sign up</Eyebrow>
              <SlideHeadline className="mt-3 text-3xl sm:text-4xl">From kickoff to live in a matter of weeks.</SlideHeadline>
            </div>
            <div className="relative flex flex-col gap-0">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-start gap-6 pb-6">
                  <div className="flex flex-col items-center gap-0">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-olive-950 font-mono text-xs font-bold text-white dark:bg-white dark:text-olive-950">
                      {s.num}
                    </span>
                    {i < steps.length - 1 && (
                      <div className="mt-1 h-full w-px flex-1 bg-olive-950/15 dark:bg-white/15" style={{ minHeight: '1.5rem' }} />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-semibold text-olive-950 dark:text-white">{s.title}</p>
                    <p className="mt-0.5 text-xs text-olive-600 dark:text-olive-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Slide 18 — Final Close
function Slide18({ info }: { info: LeadInfo }) {
  const company = info.company || 'your business'
  const owner = info.owner

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,oklch(33%_0.03_107)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,oklch(25%_0.025_107)_0%,transparent_55%)]" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8">
        <Eyebrow light>Ready to get started?</Eyebrow>

        <SlideHeadline light className="text-4xl sm:text-5xl lg:text-6xl">
          {owner
            ? `${owner}, you don't need more leads first.`
            : "You don't need more leads first."}
        </SlideHeadline>

        <p className="max-w-xl text-lg/8 text-white/70">
          {company !== 'your business'
            ? `${company} needs a better system for the leads you already have. The site is step one — let's build the rest around it.`
            : "You need a better system for the leads you already have. The site is step one — let's build the rest around it."}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: <LightingBoltIcon />, label: 'Faster speed-to-lead' },
            { icon: <TargetIcon />, label: 'Better follow-up' },
            { icon: <StarIcon />, label: 'More reviews' },
            { icon: <MapPinIcon />, label: 'Stronger local visibility' },
            { icon: <CogIcon />, label: 'Less lead leakage' },
          ].map((c) => (
            <Chip key={c.label}>{c.icon}{c.label}</Chip>
          ))}
        </div>

        <div className="flex flex-col items-center gap-5">
          <p className="text-sm font-semibold text-white/60 uppercase tracking-widest">Choose your plan to get started</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Start with Launch — $297/mo', href: '/get-started' },
              { label: 'Start with Grow — $497/mo', href: '/get-started' },
              { label: 'Start with Scale — $797/mo', href: '/get-started' },
            ].map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
              >
                {cta.label}
              </a>
            ))}
          </div>

          <div className="mt-2 flex flex-col items-center gap-2">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-olive-950 transition-opacity hover:opacity-90"
            >
              Book a discovery call <ArrowNarrowRightIcon />
            </a>
            <p className="text-xs text-white/40">Or choose quarterly prepay for preferred pricing + bonuses</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide registry (18 slides — Slide 0 is the pre-call screen, not counted)
// ─────────────────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// Deck shell
// ─────────────────────────────────────────────────────────────────────────────

export default function ContractorPitchDeck() {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [info, setInfo] = useState<LeadInfo>({ company: '', owner: '', trade: '', notes: '', siteUrl: '' })

  function updateInfo(field: keyof LeadInfo, value: string) {
    setInfo((prev) => ({ ...prev, [field]: value }))
  }

  // Max slides changes when siteUrl is added/removed — use a ref so callbacks stay stable
  const maxSlideRef = useRef(18)
  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent((c) => Math.min(maxSlideRef.current - 1, c + 1)), [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!started) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev() }
      if (e.key === 'Escape') { setMenuOpen(false); setStarted(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [started, next, prev])

  // Build slide list dynamically — inject preview slide after cover if URL provided
  const baseLabels = [
    'Website Rebuild', 'What Changed', 'What Sites Get Wrong', 'More Than a Site',
    'About Kickbord', 'Who We Help', 'The Problem', 'Why It Matters',
    'The System', 'Core Automations', 'Outcomes', 'Pricing Overview',
    'Launch', 'Grow', 'Scale', 'Upsells + Quarterly', 'Setup + Next Steps', 'Close',
  ]
  const baseComponents = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13, Slide14, Slide15, Slide16, Slide17, Slide18]

  const hasPreview = Boolean(info.siteUrl)
  const slideLabels = hasPreview
    ? ['Website Rebuild', 'Current Site Preview', ...baseLabels.slice(1)]
    : baseLabels
  const slideComponents = hasPreview
    ? [Slide1, SitePreviewSlide, ...baseComponents.slice(1)]
    : baseComponents

  const SLIDE_COUNT = slideLabels.length
  maxSlideRef.current = SLIDE_COUNT
  const CurrentSlide = slideComponents[current]

  // Pre-call screen
  if (!started) {
    return (
      <div className="h-screen w-screen overflow-hidden">
        <PreCallScreen info={info} onChange={updateInfo} onStart={() => { setCurrent(0); setStarted(true) }} />
      </div>
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-mist-100 dark:bg-mist-950">

      {/* Slide content */}
      <div className="h-full w-full">
        <CurrentSlide info={info} />
      </div>

      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="pointer-events-auto">
          <img src="/Logos/icon.svg" alt="Kickbord" width={72} height={24} className="opacity-60 hover:opacity-100 transition-opacity dark:invert" />
        </a>

        <div className="pointer-events-auto flex items-center gap-2">
          {/* Company badge — shown if filled in */}
          {info.company && (
            <span className="rounded-full bg-black/20 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
              {info.company}
            </span>
          )}
          {/* Slide label + menu toggle */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full bg-black/20 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-black/30 transition-colors"
          >
            <span className="font-mono">{current + 1} / {SLIDE_COUNT}</span>
            <span className="hidden sm:inline text-white/70">·</span>
            <span className="hidden sm:inline">{slideLabels[current]}</span>
          </button>

          {/* Edit info button */}
          <button
            onClick={() => setStarted(false)}
            className="flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm hover:bg-black/30 transition-colors"
            title="Edit lead info"
          >
            <svg className="size-3" viewBox="0 0 16 16" fill="currentColor"><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Z" /></svg>
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
      </div>

      {/* Slide menu overlay */}
      {menuOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)}>
          <div className="max-h-[80vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl dark:bg-olive-900" onClick={(e) => e.stopPropagation()}>
            <p className="mb-3 px-2 font-mono text-xs font-semibold uppercase tracking-widest text-olive-500">Jump to slide</p>
            <div className="flex flex-col gap-0.5">
              {slideLabels.map((label, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setMenuOpen(false) }}
                  className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    i === current
                      ? 'bg-olive-950 text-white dark:bg-white dark:text-olive-950'
                      : 'text-olive-950 hover:bg-olive-950/5 dark:text-white dark:hover:bg-white/5'
                  )}
                >
                  <span className="font-mono text-xs opacity-40 w-5 text-right shrink-0">{i + 1}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-5">
        <button
          onClick={prev}
          disabled={current === 0}
          className={clsx(
            'flex size-10 items-center justify-center rounded-full transition-all',
            current === 0
              ? 'opacity-0 pointer-events-none'
              : 'bg-black/20 text-white backdrop-blur-sm hover:bg-black/35'
          )}
        >
          <span className="size-4"><ArrowNarrowLeftIcon /></span>
        </button>

        <div className="flex items-center gap-1.5">
          {slideLabels.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={clsx(
                'rounded-full transition-all duration-300',
                i === current
                  ? 'w-6 h-1.5 bg-white shadow-sm'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              )}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === SLIDE_COUNT - 1}
          className={clsx(
            'flex size-10 items-center justify-center rounded-full transition-all',
            current === SLIDE_COUNT - 1
              ? 'opacity-0 pointer-events-none'
              : 'bg-black/20 text-white backdrop-blur-sm hover:bg-black/35'
          )}
        >
          <span className="size-4"><ArrowNarrowRightIcon /></span>
        </button>
      </div>

    </div>
  )
}
