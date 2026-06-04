'use client'

import { useState, useEffect, useCallback, useId } from 'react'
import { clsx } from 'clsx/lite'
import { ArrowNarrowLeftIcon } from '@/components/icons/arrow-narrow-left-icon'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { BanknotesIcon } from '@/components/icons/banknotes-icon'
import { BellIcon } from '@/components/icons/bell-icon'
import { BriefcaseIcon } from '@/components/icons/briefcase-icon'
import { BuildingStorefrontIcon } from '@/components/icons/building-storefront-icon'
import { CalendarIcon } from '@/components/icons/calendar-icon'
import { ChartBarIcon } from '@/components/icons/chart-bar-icon'
import { ChartLineIcon } from '@/components/icons/chart-line-icon'
import { ChatBubbleCircleIcon } from '@/components/icons/chat-bubble-circle-icon'
import { ChatBubbleRectangleEllipsisIcon } from '@/components/icons/chat-bubble-rectangle-ellipsis-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { ClockIcon } from '@/components/icons/clock-icon'
import { CogIcon } from '@/components/icons/cog-icon'
import { CompassIcon } from '@/components/icons/compass-icon'
import { FlagIcon } from '@/components/icons/flag-icon'
import { InboxIcon } from '@/components/icons/inbox-icon'
import { LightBulbIcon } from '@/components/icons/light-bulb-icon'
import { LightingBoltIcon } from '@/components/icons/lighting-bolt-icon'
import { MagnifyingGlassIcon } from '@/components/icons/magnifying-glass-icon'
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
import { AlertTriangleIcon } from '@/components/icons/alert-triangle-icon'
import { PhoneIcon } from '@/components/icons/chat-bubble-circle-icon'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'

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

function ProblemItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
      <span className="mt-0.5 size-5 shrink-0 text-white/50">{icon}</span>
      <p className="text-sm/6 text-white/85">{text}</p>
    </div>
  )
}

function StatCard({ number, label, sub }: { number: string; label: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-olive-950/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <p className="font-display text-4xl text-olive-950 dark:text-white">{number}</p>
      <p className="text-sm font-semibold text-olive-950 dark:text-white">{label}</p>
      {sub && <p className="text-xs text-olive-500 dark:text-olive-400">{sub}</p>}
    </div>
  )
}

function FeatureChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-olive-950/10 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
      <span className="size-4 shrink-0 text-olive-700 dark:text-olive-400">{icon}</span>
      <span className="text-sm font-medium text-olive-950 dark:text-white">{label}</span>
    </div>
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

function UpsellRow({ title, price, desc }: { title: string; price: string; desc: string }) {
  return (
    <div className="flex items-start justify-between gap-6 rounded-xl border border-olive-950/10 bg-white p-5 dark:border-white/10 dark:bg-white/5">
      <div>
        <p className="text-sm font-semibold text-olive-950 dark:text-white">{title}</p>
        <p className="mt-0.5 text-xs text-olive-600 dark:text-olive-400">{desc}</p>
      </div>
      <span className="shrink-0 rounded-full bg-olive-950/5 px-3 py-1 text-xs font-semibold text-olive-950 dark:bg-white/10 dark:text-white">
        {price}
      </span>
    </div>
  )
}

function OnboardStep({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-olive-950/10 font-mono text-sm font-bold text-olive-950 dark:bg-white/10 dark:text-white">
        {num}
      </span>
      <div>
        <p className="text-sm font-semibold text-olive-950 dark:text-white">{title}</p>
        <p className="mt-0.5 text-xs text-olive-600 dark:text-olive-400">{desc}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES — 17 total
// ─────────────────────────────────────────────────────────────────────────────

const TOTAL = 17

function Slide1() {
  return (
    <div className="relative flex h-full w-full overflow-hidden bg-olive-950">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_-20%,oklch(33%_0.03_107)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_120%,oklch(25%_0.025_107)_0%,transparent_55%)]" />

      {/* Content side */}
      <div className="relative z-10 flex w-full lg:w-1/2 flex-col items-center justify-center px-8 py-16">
        <div className="flex max-w-xl flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <img src="/Logos/icon.svg" alt="Kickbord" width={100} height={34} className="brightness-0 invert opacity-80" />

          <div>
            <Eyebrow light>Contractor Growth System</Eyebrow>
            <SlideHeadline light className="mt-4 text-5xl sm:text-6xl lg:text-7xl">
              More leads captured.<br />More jobs booked.
            </SlideHeadline>
          </div>

          <SlideSubhead light className="text-lg/8">
            AI-powered follow-up, automation, and local growth systems built specifically for contractors.
          </SlideSubhead>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <Chip><LightingBoltIcon />Respond faster</Chip>
            <Chip><TargetIcon />Capture more leads</Chip>
            <Chip><CalendarIcon />Book more jobs</Chip>
          </div>
        </div>
      </div>

      {/* Image side */}
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

function Slide2() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <div>
              <Eyebrow>About Kickbord</Eyebrow>
              <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
                Enterprise-level strategy.<br />Built for real businesses.
              </SlideHeadline>
            </div>
            <SlideSubhead>
              Kickbord was created to help ambitious businesses strengthen their marketing, modernize their digital presence, and use AI more practically — without the overhead of a large agency.
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
            <p className="text-center text-xs text-olive-500 dark:text-olive-400">
              Founder-led company. Real experience. Practical execution.
            </p>
          </div>
        </div>

        {/* Company logos */}
        <div className="mt-16 border-t border-olive-950/10 pt-12 dark:border-white/10">
          <p className="mb-8 text-center text-sm text-olive-500 dark:text-olive-400">
            Experience from world-class brands
          </p>
          <div className="mx-auto grid w-full max-w-4xl grid-cols-3 place-items-center gap-x-8 gap-y-8 sm:grid-cols-6 opacity-60">
            <Logo>
              <img
                src="https://cdn.brandfetch.io/id6O2oGzv-/w/800/h/271/theme/light/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ"
                className="grayscale brightness-0 dark:brightness-0 dark:invert"
                alt="Google"
                width={94}
                height={32}
              />
            </Logo>
            <Logo>
              <img
                src="https://cdn.brandfetch.io/idtEghWGp4/w/800/h/229/theme/dark/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ"
                className="grayscale brightness-0 dark:brightness-0 dark:invert"
                alt="BBC"
                width={112}
                height={32}
              />
            </Logo>
            <Logo>
              <img
                src="https://cdn.brandfetch.io/id_0dwKPKT/w/800/h/278/theme/light/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ"
                className="grayscale brightness-0 dark:brightness-0 dark:invert"
                alt="Nike"
                width={92}
                height={32}
              />
            </Logo>
            <Logo>
              <img
                src="https://cdn.brandfetch.io/iduaw_nOnR/w/800/h/122/theme/light/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ"
                className="grayscale brightness-0 dark:brightness-0 dark:invert"
                alt="Samsung"
                width={210}
                height={32}
              />
            </Logo>
            <Logo>
              <img
                src="https://cdn.brandfetch.io/id6htIcs_f/w/90/h/90/theme/dark/id4N0u-dxx.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ"
                className="grayscale brightness-0 dark:brightness-0 dark:invert"
                alt="Procter & Gamble"
                width={32}
                height={32}
              />
            </Logo>
            <Logo>
              <img
                src="https://cdn.brandfetch.io/idXhrQrb5t/w/800/h/179/theme/dark/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ"
                className="grayscale brightness-0 dark:brightness-0 dark:invert"
                alt="Verizon"
                width={143}
                height={32}
              />
            </Logo>
          </div>
        </div>
      </div>
    </div>
  )
}

function Slide3() {
  const segments = [
    { icon: <BuildingStorefrontIcon />, title: 'Growing contractors with real demand', desc: 'Already getting leads but struggling to handle them consistently.' },
    { icon: <UserCircleIcon />, title: 'Lean teams without marketing leadership', desc: 'No in-house CMO or marketing director — the owner wears all the hats.' },
    { icon: <UiLayoutIcon />, title: 'Businesses that need modernization', desc: 'Outdated websites, no follow-up systems, inconsistent reviews and local presence.' },
    { icon: <ClockIcon />, title: 'Owners losing jobs to response time', desc: 'Getting the lead but losing the job because a competitor responded 10 minutes faster.' },
  ]

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      {/* Image side */}
      <div className="hidden lg:block relative w-2/5">
        <img 
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" 
          alt="Contractor reviewing plans" 
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white dark:to-olive-950" />
      </div>

      {/* Content side */}
      <div className="flex w-full lg:w-3/5 flex-col items-center justify-center px-8 py-16">
        <div className="w-full max-w-3xl">
          <div className="mb-10 text-center lg:text-left">
            <Eyebrow>Who we help</Eyebrow>
            <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
              Built for contractors who are<br />already doing the work.
            </SlideHeadline>
            <SlideSubhead className="mx-auto lg:mx-0 mt-4 max-w-2xl">
              You don't need more hustle. You need better systems to capture what you're already earning.
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

function Slide4() {
  const problems = [
    { 
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
      headline: 'Missed calls = lost revenue',
      text: 'Homeowners move on within minutes when calls go unanswered.'
    },
    { 
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      headline: 'Slow web lead response',
      text: 'Leads sit untouched for hours while competitors respond instantly.'
    },
    { 
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
      headline: 'First to respond wins',
      text: 'Homeowners compare multiple contractors — speed determines who gets the job.'
    },
    { 
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop',
      headline: 'Inconsistent reviews',
      text: 'Happy customers don\'t leave reviews unless you ask at the right time.'
    },
    { 
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      headline: 'Under-optimized local presence',
      text: 'Google Business Profile is incomplete, hurting local visibility and rankings.'
    },
    { 
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
      headline: 'Follow-up breaks down',
      text: 'Field teams are busy working — no one is managing systematic follow-up.'
    },
  ]

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,oklch(28%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="mb-10 text-center">
          <Eyebrow light>The contractor problem</Eyebrow>
          <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
            You're not losing jobs<br />because of your work.
          </SlideHeadline>
          <p className="mt-3 text-lg text-white/70">
            You're losing them because of what happens before the estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem.headline} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 overflow-hidden">
              <div className="relative h-32 -mx-4 -mt-4 mb-1">
                <img 
                  src={problem.image} 
                  alt={problem.headline}
                  className="absolute inset-0 h-full w-full object-cover opacity-60"
                />
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

function Slide5() {
  const pathId = useId()
  const points = [
    { icon: <LightingBoltIcon />, stat: '78%', label: 'of jobs go to the first contractor to respond', sub: 'Speed-to-lead is your single biggest conversion lever.' },
    { icon: <StarIcon />, stat: '4.5×', label: 'more likely to win when reviews exceed competitors', sub: 'Review quantity and rating directly influence local rankings and trust.' },
    { icon: <ChartLineIcon />, stat: '3×', label: 'ROI loss from slow follow-up on paid ad leads', sub: 'Every dollar spent on ads is wasted if the lead is not contacted fast.' },
    { icon: <MapPinIcon />, stat: 'Top 3', label: 'Google Local Pack captures 75% of local clicks', sub: 'Relevance, distance, and prominence — Kickbord improves all three.' },
  ]

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-8 py-16 overflow-hidden">
      <div className="w-full max-w-5xl relative z-10">
        <div className="mb-10 text-center">
          <Eyebrow>Why this matters</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
            These aren't small problems.
          </SlideHeadline>
          <SlideSubhead className="mx-auto mt-4 max-w-xl">
            Slow response, weak reviews, and poor local visibility compound over time into a major revenue leak.
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

function Slide6() {
  const items = [
    'Conversion-focused website or landing page',
    'Missed-call text back',
    'Instant form follow-up',
    'SMS lead alerts (not just email)',
    'Web chat widget',
    'Automated review requests',
    'Lead routing & conversation routing',
    'Contact database / CRM foundation',
    'Basic reporting dashboard',
    'Optional AI voice for after-hours',
  ]

  return (
    <div className="flex h-full w-full items-center justify-center px-8 py-16 bg-white dark:bg-olive-950">
      <div className="w-full max-w-7xl">
        {/* Green wallpaper content box */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(48%_0.09_145)] to-[oklch(42%_0.08_145)] p-8 sm:p-12 lg:p-16">
          {/* Wallpaper texture overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(52%_0.1_145)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(40%_0.07_145)_0%,transparent_50%)]" />
          
          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content side */}
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
                    <span className="mt-1 size-4 shrink-0 text-white">
                      <CheckmarkIcon />
                    </span>
                    <p className="text-sm/6">{item}</p>
                  </div>
                ))}
              </div>

              <p className="mt-2 text-sm text-white/60">
                All components run on one unified platform — no app juggling, no integration headaches.
              </p>
            </div>

            {/* Demo image side */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 bg-white/95">
                <img 
                  src="/images/kickbord_system.png"
                  alt="Lead-capture & follow-up system diagram"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Slide7() {
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

      <div className="relative z-10 w-full max-w-5xl">
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

function Slide8() {
  const outcomes = [
    { icon: <LightingBoltIcon />, headline: 'Respond faster', body: 'Automated texts and follow-up fire within seconds — without anyone on your team lifting a finger.' },
    { icon: <TargetIcon />, headline: 'Capture more leads you already paid for', body: 'Stop losing ad spend to slow response. Every inquiry gets an immediate, professional reply.' },
    { icon: <CalendarIcon />, headline: 'Book more estimates', body: 'Nurture sequences revive cold leads and missed opportunities that would otherwise disappear.' },
    { icon: <StarIcon />, headline: 'Generate reviews consistently', body: 'Automated post-job review requests build your reputation without relying on customers to remember.' },
    { icon: <MapPinIcon />, headline: 'Strengthen local visibility', body: 'More reviews and optimized local presence improve your Google ranking over time.' },
    { icon: <CogIcon />, headline: 'Reduce chaos', body: 'All leads, replies, and follow-up live in one place — no more juggling email, texts, and voicemail.' },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-5xl">
        <div className="mb-10 text-center">
          <Eyebrow>Outcomes</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
            What this means for<br />your business.
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

function Slide9() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_-10%,oklch(33%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="mb-12 text-center">
          <Eyebrow light>Pricing</Eyebrow>
          <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
            Simple. Outcome-based. No surprises.
          </SlideHeadline>
          <p className="mt-3 text-white/60">Three plans built around where your business is right now.</p>
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

function Slide10() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Eyebrow>Launch plan</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
            Get the essentials live fast.
          </SlideHeadline>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-olive-950/10 bg-white p-8 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-olive-500">Launch</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-6xl text-olive-950 dark:text-white">$297</span>
                <span className="text-olive-500">/mo</span>
              </div>
              <p className="mt-1 text-sm text-olive-600 dark:text-olive-400">
                Best for solo operators and smaller contractors who need the basics in place.
              </p>
              <div className="mt-4 rounded-lg bg-olive-950/5 px-4 py-2 dark:bg-white/5">
                <p className="text-xs text-olive-500">Setup fee: <span className="font-semibold text-olive-950 dark:text-white">$300–$500 one-time</span></p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-4 text-sm font-semibold text-olive-950 dark:text-white">What's included</p>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {[
                'Website / landing page',
                'Missed-call text back',
                'Instant form follow-up',
                'SMS lead notifications',
                'Web chat widget',
                'Review request automation',
                'Basic reporting dashboard',
                'CRM foundation',
              ].map((f) => <CheckItem key={f}>{f}</CheckItem>)}
            </ul>
            <div className="mt-6 rounded-xl bg-olive-950/5 p-5 dark:bg-white/5">
              <p className="text-sm font-semibold text-olive-950 dark:text-white">Core message</p>
              <p className="mt-1 text-sm text-olive-700 dark:text-olive-300">
                "Get the essential lead capture and follow-up system live fast. Stop losing the leads you're already paying for."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Slide11() {
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
              {[
                'Appointment reminders (24hr & 2hr)',
                'Estimate / quote follow-up sequence',
                'No-response lead nurture',
                'Simple pipeline & lead routing',
                'Database reactivation lite',
                'Enhanced review automation',
                'All Launch features included',
              ].map((f) => <CheckItem key={f} light>{f}</CheckItem>)}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Best for</p>
              <p className="mt-1 text-sm text-white/70">
                Contractors already getting leads who want to convert more of them into booked estimates without hiring more staff.
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-5">
              <p className="text-sm font-semibold text-white">Core message</p>
              <p className="mt-1 text-sm text-white/70 italic">
                "Improve response speed, reduce lead leakage, and turn more inquiries into booked jobs."
              </p>
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

function Slide12() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Eyebrow>Scale plan</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
            Automate the customer<br />journey end to end.
          </SlideHeadline>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-olive-950/10 bg-white p-8 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-olive-500">Scale</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-6xl text-olive-950 dark:text-white">$797</span>
                <span className="text-olive-500">/mo</span>
              </div>
              <p className="mt-1 text-sm text-olive-600 dark:text-olive-400">
                Best for established contractors ready to automate more of the customer journey.
              </p>
              <div className="mt-4 rounded-lg bg-olive-950/5 px-4 py-2 dark:bg-white/5">
                <p className="text-xs text-olive-500">Setup fee: <span className="font-semibold text-olive-950 dark:text-white">~$1,000 one-time</span></p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-4 text-sm font-semibold text-olive-950 dark:text-white">Everything in Grow, plus:</p>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {[
                'AI voice agent (after-hours & overflow)',
                'Advanced workflow automation',
                'Priority support',
                'Monthly optimization & strategy call',
                'Deeper lead management',
                'Advanced follow-up systems',
                'All Grow features included',
              ].map((f) => <CheckItem key={f}>{f}</CheckItem>)}
            </ul>
            <div className="mt-6 rounded-xl bg-olive-950/5 p-5 dark:bg-white/5">
              <p className="text-sm font-semibold text-olive-950 dark:text-white">Core message</p>
              <p className="mt-1 text-sm text-olive-700 dark:text-olive-300 italic">
                "Add automation, reduce owner dependence, and scale follow-up without scaling admin."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Slide13() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_-10%,oklch(33%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="mb-10">
          <Eyebrow light>Add-ons & upsells</Eyebrow>
          <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
            Base offer = conversion infrastructure.<br className="hidden sm:block" />Upsells = traffic growth.
          </SlideHeadline>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { title: 'Google Business Profile Optimization', price: '$500 one-time', desc: 'Full GBP audit, optimization, and setup to improve local search visibility.' },
            { title: 'Google Local Services Ads Management', price: '$500/mo', desc: 'Managed Local Services Ads to put your business at the top of local search results.' },
            { title: 'SEO / AI SEO', price: '$500/mo', desc: 'Ongoing local SEO and AI search optimization to strengthen organic visibility over time.' },
            { title: 'AI Voice Agent (standalone)', price: '$197–$297/mo', desc: 'After-hours and overflow call handling without committing to the Scale plan.' },
            { title: 'Database Reactivation Setup', price: '$300–$500 + optional $97–$197/mo', desc: 'Re-engage your dormant lead database with a structured reactivation campaign.' },
          ].map((u) => (
            <div key={u.title} className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
              <div>
                <p className="text-sm font-semibold text-white">{u.title}</p>
                <p className="mt-0.5 text-xs text-white/60">{u.desc}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                {u.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Slide14() {
  const quarters = [
    { plan: 'Launch', monthly: '$297/mo', quarterly: '$891/qtr', savings: 'Save $0 vs. 3 months', bonuses: ['GBP optimization included or 50% off', 'Priority onboarding'] },
    { plan: 'Grow', monthly: '$497/mo', quarterly: '$1,391/qtr', savings: 'Preferred pricing', bonuses: ['GBP optimization included or 50% off', 'Local Services Ads reduced to $400/mo', 'Priority onboarding'] },
    { plan: 'Scale', monthly: '$797/mo', quarterly: '$2,191/qtr', savings: 'Best value', bonuses: ['GBP optimization included or 50% off', 'Local Services Ads reduced to $400/mo', 'SEO reduced to $400/mo', 'AI voice add-on reduced pricing'] },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-5xl">
        <div className="mb-10 text-center">
          <Eyebrow>Quarterly plans</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
            Commit quarterly. Get more.
          </SlideHeadline>
          <SlideSubhead className="mx-auto mt-3 max-w-xl">
            Quarterly clients get preferred pricing and bonus implementation support.
          </SlideSubhead>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {quarters.map((q) => (
            <div key={q.plan} className="rounded-2xl border border-olive-950/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-olive-500">{q.plan}</p>
              <p className="mt-2 font-display text-3xl text-olive-950 dark:text-white">{q.quarterly}</p>
              <p className="text-xs text-olive-500">vs. {q.monthly} monthly</p>
              <div className="mt-5 border-t border-olive-950/10 pt-4 dark:border-white/10">
                <p className="mb-2.5 text-xs font-semibold text-olive-950 dark:text-white">Quarterly bonuses:</p>
                <ul className="flex flex-col gap-1.5">
                  {q.bonuses.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-olive-700 dark:text-olive-400">
                      <span className="mt-0.5 size-3.5 shrink-0 text-olive-400"><CheckmarkIcon /></span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm font-semibold text-olive-950 dark:text-white">
          Setup fee can be reduced or waived entirely for quarterly prepay.
        </p>
      </div>
    </div>
  )
}

function Slide15() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,oklch(28%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-10">
          <Eyebrow light>Setup fee</Eyebrow>
          <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
            Real setup work deserves<br />a real setup fee.
          </SlideHeadline>
          <p className="mt-3 text-lg text-white/70">This isn't a junk fee. It covers real implementation work.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            {[
              { plan: 'Launch', fee: '$300–$500 one-time' },
              { plan: 'Grow', fee: '~$750 one-time' },
              { plan: 'Scale', fee: '~$1,000 one-time' },
            ].map((s) => (
              <div key={s.plan} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                <span className="text-sm font-semibold text-white">{s.plan}</span>
                <span className="text-sm font-semibold text-white/70">{s.fee}</span>
              </div>
            ))}
            <div className="rounded-xl border border-white/20 bg-white/10 px-5 py-4">
              <p className="text-sm font-semibold text-white">Quarterly prepay</p>
              <p className="mt-0.5 text-xs text-white/60">Setup fee reduced or waived entirely</p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">What setup includes</p>
            <ul className="flex flex-col gap-2.5">
              {[
                'CRM account setup and configuration',
                'Form, chat, and SMS workflow build',
                'Missed-call text back configuration',
                'Review automation setup',
                'Onboarding session and asset collection',
                'Testing and QA before launch',
              ].map((item) => <CheckItem key={item} light>{item}</CheckItem>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Slide16() {
  const steps = [
    { num: '01', title: 'Onboarding form & kickoff call', desc: 'We collect your business info, assets, and goals. Align on the build plan.' },
    { num: '02', title: 'Website, messaging & system setup', desc: 'Landing page built, CRM configured, and your brand voice applied throughout.' },
    { num: '03', title: 'Automation build & testing', desc: 'Every workflow is built, tested, and verified before anything goes live.' },
    { num: '04', title: 'Launch', desc: 'Everything goes live. You start capturing and responding to leads automatically.' },
    { num: '05', title: 'Optimization & reporting', desc: 'Monthly review of what is working. Adjustments made to improve results over time.' },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-4xl">
        <div className="mb-10 text-center">
          <Eyebrow>After you sign up</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
            From kickoff to live in<br />a matter of weeks.
          </SlideHeadline>
          <SlideSubhead className="mx-auto mt-4 max-w-xl">
            A clear, simple process with no surprises. We handle everything — you stay focused on the work.
          </SlideSubhead>
        </div>

        <div className="relative flex flex-col gap-0">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-start gap-6 pb-6">
              <div className="flex flex-col items-center gap-0">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-olive-950 font-mono text-sm font-bold text-white dark:bg-white dark:text-olive-950">
                  {s.num}
                </span>
                {i < steps.length - 1 && (
                  <div className="mt-1 h-full w-px flex-1 bg-olive-950/15 dark:bg-white/15" style={{ minHeight: '2rem' }} />
                )}
              </div>
              <div className="pb-2">
                <p className="text-sm font-semibold text-olive-950 dark:text-white">{s.title}</p>
                <p className="mt-0.5 text-sm text-olive-600 dark:text-olive-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Slide17() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,oklch(33%_0.03_107)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,oklch(25%_0.025_107)_0%,transparent_55%)]" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8">
        <Eyebrow light>Ready to get started?</Eyebrow>

        <SlideHeadline light className="text-4xl sm:text-5xl lg:text-6xl">
          You don't need more leads first.
        </SlideHeadline>

        <p className="max-w-xl text-lg/8 text-white/70">
          You need a better system for the leads you already have.
        </p>

        {/* Recap chips */}
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

        {/* CTA options */}
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
// Slide registry
// ─────────────────────────────────────────────────────────────────────────────

const slides = [
  { id: 1, label: 'Cover', component: Slide1 },
  { id: 2, label: 'About', component: Slide2 },
  { id: 3, label: 'Who We Help', component: Slide3 },
  { id: 4, label: 'The Problem', component: Slide4 },
  { id: 5, label: 'Why It Matters', component: Slide5 },
  { id: 6, label: 'The System', component: Slide6 },
  { id: 7, label: 'Automations', component: Slide7 },
  { id: 8, label: 'Outcomes', component: Slide8 },
  { id: 9, label: 'Pricing', component: Slide9 },
  { id: 10, label: 'Launch', component: Slide10 },
  { id: 11, label: 'Grow', component: Slide11 },
  { id: 12, label: 'Scale', component: Slide12 },
  { id: 13, label: 'Upsells', component: Slide13 },
  { id: 14, label: 'Quarterly', component: Slide14 },
  { id: 15, label: 'Setup Fee', component: Slide15 },
  { id: 16, label: 'Onboarding', component: Slide16 },
  { id: 17, label: 'Close', component: Slide17 },
]

// ─────────────────────────────────────────────────────────────────────────────
// Deck shell
// ─────────────────────────────────────────────────────────────────────────────

export default function ContractorPitchDeck() {
  const [current, setCurrent] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent((c) => Math.min(TOTAL - 1, c + 1)), [])

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev() }
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const CurrentSlide = slides[current].component

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-mist-100 dark:bg-mist-950">

      {/* ── Slide content ────────────────────────────────────────────────── */}
      <div className="h-full w-full">
        <CurrentSlide />
      </div>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="pointer-events-auto">
          <img src="/Logos/icon.svg" alt="Kickbord" width={72} height={24} className="opacity-60 hover:opacity-100 transition-opacity dark:invert" />
        </a>

        {/* Slide label + menu toggle */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/20 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-black/30 transition-colors"
        >
          <span className="font-mono">{current + 1} / {TOTAL}</span>
          <span className="hidden sm:inline text-white/70">·</span>
          <span className="hidden sm:inline">{slides[current].label}</span>
        </button>
      </div>

      {/* ── Slide menu overlay ───────────────────────────────────────────── */}
      {menuOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)}>
          <div className="max-h-[80vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl dark:bg-olive-900" onClick={(e) => e.stopPropagation()}>
            <p className="mb-3 px-2 font-mono text-xs font-semibold uppercase tracking-widest text-olive-500">Jump to slide</p>
            <div className="flex flex-col gap-0.5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setCurrent(i); setMenuOpen(false) }}
                  className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    i === current
                      ? 'bg-olive-950 text-white dark:bg-white dark:text-olive-950'
                      : 'text-olive-950 hover:bg-olive-950/5 dark:text-white dark:hover:bg-white/5'
                  )}
                >
                  <span className="font-mono text-xs opacity-40 w-5 text-right shrink-0">{s.id}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom navigation ────────────────────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-5">

        {/* Prev */}
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

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
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

        {/* Next */}
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className={clsx(
            'flex size-10 items-center justify-center rounded-full transition-all',
            current === TOTAL - 1
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
