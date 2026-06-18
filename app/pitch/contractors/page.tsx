'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { clsx } from 'clsx/lite'
import { ArrowNarrowLeftIcon } from '@/components/icons/arrow-narrow-left-icon'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { StarIcon } from '@/components/icons/star-icon'
import { LightingBoltIcon } from '@/components/icons/lighting-bolt-icon'
import { UiLayoutIcon } from '@/components/icons/ui-layout-icon'
import { ChatBubbleCircleIcon } from '@/components/icons/chat-bubble-circle-icon'
import { ChatBubbleCircleEllipsisIcon } from '@/components/icons/chat-bubble-circle-ellipsis-icon'
import { BellIcon } from '@/components/icons/bell-icon'
import { RepeatIcon } from '@/components/icons/repeat-icon'
import { TargetIcon } from '@/components/icons/target-icon'
import { MapPinIcon } from '@/components/icons/map-pin-icon'
import { RocketIcon } from '@/components/icons/rocket-icon'
import { CalendarIcon } from '@/components/icons/calendar-icon'
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

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
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
        <div className="mb-10 text-center">
          <img src="/Logos/icon.svg" alt="Kickbord" width={80} height={27} className="mx-auto mb-6 brightness-0 invert opacity-70" />
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">Pre-call setup</p>
          <h1 className="mt-3 font-display text-3xl text-white">Fill in before the call starts.</h1>
          <p className="mt-2 text-sm text-white/50">This information personalises the deck throughout. Not visible to the prospect.</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/40">
              Company name <span className="text-white/20">(required)</span>
            </label>
            <input
              type="text"
              value={info.company}
              onChange={(e) => onChange('company', e.target.value)}
              placeholder="e.g. Alvarez Landscaping"
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
              placeholder="e.g. Landscaping, Roofing, HVAC…"
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
                A live preview slide will appear right after this screen.
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
// Conditional — prospect's live site preview
// ─────────────────────────────────────────────────────────────────────────────

function SitePreviewSlide({ info }: { info: LeadInfo }) {
  const [blocked, setBlocked] = useState(false)
  const url = info.siteUrl
  const normalised = url.startsWith('http') ? url : `https://${url}`
  const company = info.company || 'Their site'

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-olive-950">
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">Current site</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">{company}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="max-w-xs truncate rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
            {normalised}
          </span>
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
      {blocked ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-white/5">
            <svg className="size-8 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="font-display text-2xl text-white">This site blocks embedding.</p>
            <p className="mt-2 text-sm text-white/50">Open it in a new tab instead.</p>
          </div>
          <a href={normalised} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-olive-950 transition hover:opacity-90">
            Open {company} website
          </a>
        </div>
      ) : (
        <iframe
          key={normalised}
          src={normalised}
          className="flex-1 w-full border-0"
          title={`${company} website preview`}
          onError={() => setBlocked(true)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 1 — About Kickbord
// ─────────────────────────────────────────────────────────────────────────────

function Slide1({ info }: { info: LeadInfo }) {
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
              {`"Enterprise-level strategy and systems for growing businesses that shouldn't have to figure it all out alone."`}
            </blockquote>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-olive-950/10 bg-olive-950 p-8 dark:bg-white/5">
              <img src="/mike.png" alt="Mike Mathias" className="mb-4 h-20 w-20 rounded-full object-cover" />
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

// ─────────────────────────────────────────────────────────────────────────────
// Slide 2 — The System
// ─────────────────────────────────────────────────────────────────────────────

function Slide2({ info }: { info: LeadInfo }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const items = [
    'Conversion-focused AI website',
    'Integrated contact forms with SMS notifications',
    'AI chatbot — answers questions 24/7',
    'Live chat widget',
    'Automated lead follow-up',
    'All tools on one unified platform',
  ]

  return (
    <div className="relative flex h-full w-full items-center justify-center px-8 py-16 bg-white dark:bg-olive-950 overflow-hidden">
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
                <img src="/images/kickbord_system.png" alt="Kickbord system diagram" className="w-full h-auto" />
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

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setLightboxOpen(false)}>
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 flex items-center justify-center size-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="max-w-7xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img src="/images/kickbord_system.png" alt="Kickbord system diagram" className="w-full h-auto rounded-lg shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 3 — Forms to Text demo
// ─────────────────────────────────────────────────────────────────────────────

function Slide3({ info }: { info: LeadInfo }) {
  const company = info.company || 'your business'
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16 bg-white dark:bg-olive-950">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            <div>
              <Eyebrow>Forms to text</Eyebrow>
              <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
                Every form submission<br />triggers a text — instantly.
              </SlideHeadline>
            </div>
            <SlideSubhead>
              When a prospect fills out a contact form on your site, two things happen automatically: you get an SMS alert, and they get a text back within seconds — before they can call anyone else.
            </SlideSubhead>
            <div className="flex flex-col gap-3">
              {[
                { icon: <BellIcon />, title: 'Instant owner alert', desc: `You get a text the moment ${company} receives a new web lead.` },
                { icon: <RepeatIcon />, title: 'Automated reply to prospect', desc: 'A personalised text goes back to the lead automatically — no one on your team has to lift a finger.' },
                { icon: <LightingBoltIcon />, title: 'Speed wins the job', desc: '78% of jobs go to the first contractor to respond. This makes you that contractor.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-xl border border-olive-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-olive-950/5 text-olive-700 dark:bg-white/10 dark:text-olive-300">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-olive-950 dark:text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs/5 text-olive-600 dark:text-olive-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — SMS mockup */}
          <div className="relative overflow-hidden rounded-2xl border border-olive-950/10 bg-olive-950/5 dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-col items-center justify-center gap-8 p-10 min-h-[420px]">
              {/* Form mockup */}
              <div className="w-full max-w-xs rounded-2xl border border-olive-950/15 bg-white p-5 shadow-lg dark:border-white/15 dark:bg-white/10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-olive-500">Contact Form</p>
                <div className="flex flex-col gap-2.5">
                  <div className="h-8 rounded-lg bg-olive-950/8 dark:bg-white/10" />
                  <div className="h-8 rounded-lg bg-olive-950/8 dark:bg-white/10" />
                  <div className="h-14 rounded-lg bg-olive-950/8 dark:bg-white/10" />
                  <div className="h-9 rounded-lg bg-olive-700 flex items-center justify-center">
                    <p className="text-xs font-semibold text-white">Send Message</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-olive-950/20 dark:bg-white/20" />
                <div className="flex size-10 items-center justify-center rounded-full bg-olive-700 text-white shadow-md">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
                <div className="h-px w-12 bg-olive-950/20 dark:bg-white/20" />
              </div>

              {/* SMS mockup */}
              <div className="w-full max-w-xs rounded-2xl border border-olive-950/15 bg-white p-5 shadow-lg dark:border-white/15 dark:bg-white/10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-olive-500">SMS — instant</p>
                <div className="flex flex-col gap-2">
                  <div className="self-end rounded-2xl rounded-br-sm bg-olive-700 px-3 py-2 max-w-[80%]">
                    <p className="text-xs text-white">{`New lead from ${info.company || 'your site'}! Carlos A. — (805) 555-0199`}</p>
                  </div>
                  <div className="self-start rounded-2xl rounded-bl-sm bg-olive-950/10 px-3 py-2 max-w-[80%] dark:bg-white/15">
                    <p className="text-xs text-olive-950 dark:text-white">{`Hi Carlos! Thanks for reaching out to ${info.company || 'us'}. We'll be in touch shortly.`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 4 — AI Chatbot demo embed (/chatdemo)
// ─────────────────────────────────────────────────────────────────────────────

function Slide4({ info }: { info: LeadInfo }) {
  return (
    <div className="relative flex h-full w-full overflow-hidden bg-olive-950">
      <div className="absolute top-0 inset-x-0 z-10 flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">Live demo</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">AI Chatbot on demo site</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="max-w-xs truncate rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
            kickbord.com/chatdemo
          </span>
          <a
            href="/chatdemo"
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
      <iframe
        src="/chatdemo"
        className="flex-1 w-full border-0 pt-[52px]"
        title="Kickbord AI chatbot demo"
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 5 — AI Chatbot features
// ─────────────────────────────────────────────────────────────────────────────

function Slide5({ info }: { info: LeadInfo }) {
  const company = info.company || 'your business'
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_-10%,oklch(33%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left — features */}
          <div className="flex flex-col gap-6">
            <div>
              <Eyebrow light>AI chatbot</Eyebrow>
              <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
                Your business, always<br />on — always answering.
              </SlideHeadline>
            </div>
            <p className="text-base/7 text-white/70">
              The AI chatbot is trained on your business so it can answer questions, qualify leads, and capture contact info — even at 2am when no one is in the office.
            </p>

            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <SparklesIcon />,
                  title: 'Full business context',
                  desc: `Trained on ${company}'s services, pricing, hours, and FAQ. It knows your business cold.`,
                },
                {
                  icon: <ChatBubbleCircleEllipsisIcon />,
                  title: 'Answers questions for you',
                  desc: 'Handles the most common questions prospects ask — so you focus on jobs, not inbox management.',
                },
                {
                  icon: <TargetIcon />,
                  title: 'Captures leads 24/7',
                  desc: `Collects name, number, and job details from every visitor — day or night, even when you're on a job.`,
                },
                {
                  icon: <ChatBubbleCircleIcon />,
                  title: 'Live chat fallback',
                  desc: 'When a human is available, the widget switches to live chat for real-time conversation.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs/5 text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — chat UI mockup */}
          <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="flex flex-col gap-4 p-8 w-full max-w-sm">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="flex size-9 items-center justify-center rounded-full bg-olive-600">
                  <span className="size-5 text-white"><SparklesIcon /></span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{info.company || 'Green Valley'} AI</p>
                  <p className="text-xs text-green-400">● Online now</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/15 px-3.5 py-2.5">
                  <p className="text-xs text-white">{`Hi! I'm the ${info.company || 'Green Valley'} assistant. How can I help you today?`}</p>
                </div>
                <div className="self-end max-w-[85%] rounded-2xl rounded-tr-sm bg-olive-600 px-3.5 py-2.5">
                  <p className="text-xs text-white">Do you offer free estimates?</p>
                </div>
                <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/15 px-3.5 py-2.5">
                  <p className="text-xs text-white">Absolutely! We offer free estimates on all projects. Can I get your name and number so we can schedule one?</p>
                </div>
                <div className="self-end max-w-[85%] rounded-2xl rounded-tr-sm bg-olive-600 px-3.5 py-2.5">
                  <p className="text-xs text-white">{`Sure, it's Mike — 805-555-0100`}</p>
                </div>
                <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white/15 px-3.5 py-2.5">
                  <p className="text-xs text-white">{`Got it, Mike! ${info.owner || 'The team'} will reach out shortly. Talk soon!`}</p>
                </div>
              </div>

              <div className="mt-2 flex gap-2 border-t border-white/10 pt-3">
                <div className="flex-1 rounded-xl bg-white/10 px-3 py-2">
                  <p className="text-xs text-white/40">Type a message…</p>
                </div>
                <button className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-olive-600 text-white">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 6 — Feature recap (swapped: was slide 7)
// ─────────────────────────────────────────────────────────────────────────────

function Slide6({ info }: { info: LeadInfo }) {
  const company = info.company || 'your business'
  const features = [
    {
      icon: <UiLayoutIcon />,
      title: 'Custom AI Site',
      desc: `A fast, mobile-first website built around ${company} — designed to convert visitors into leads from day one.`,
      tag: 'Website',
    },
    {
      icon: <BellIcon />,
      title: 'Forms with Text Notifications',
      desc: 'Every form submission triggers an instant SMS to you and an automatic reply to the prospect — no manual work.',
      tag: 'Automation',
    },
    {
      icon: <SparklesIcon />,
      title: 'AI Chatbot',
      desc: 'Trained on your business. Answers questions, qualifies leads, and captures contact info around the clock.',
      tag: 'AI',
    },
    {
      icon: <ChatBubbleCircleIcon />,
      title: 'Live Chat',
      desc: 'A live chat widget gives real visitors a way to reach a real human — right from your website.',
      tag: 'Engagement',
    },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16 bg-white dark:bg-olive-950">
      <div className="w-full max-w-7xl">
        <div className="mb-10 text-center">
          <Eyebrow>What's included</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">Everything in one system.</SlideHeadline>
          <SlideSubhead className="mx-auto mt-4 max-w-xl">
            {`Here's what you get — all working together, all set up for ${company}.`}
          </SlideSubhead>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="relative flex items-start gap-5 rounded-2xl border border-olive-950/10 bg-white p-7 dark:border-white/10 dark:bg-white/5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-olive-950/5 text-olive-700 dark:bg-white/10 dark:text-olive-300">
                {f.icon}
              </span>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <p className="text-base font-semibold text-olive-950 dark:text-white">{f.title}</p>
                  <span className="rounded-full bg-olive-950/8 px-2.5 py-0.5 text-xs font-medium text-olive-600 dark:bg-white/10 dark:text-olive-300">{f.tag}</span>
                </div>
                <p className="text-sm/6 text-olive-600 dark:text-olive-400">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 7 — Launch pricing ($297) — no setup fee, no CTA
// ─────────────────────────────────────────────────────────────────────────────

function Slide7({ info }: { info: LeadInfo }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16 bg-white dark:bg-olive-950">
      <div className="w-full max-w-7xl">
        <div className="mb-8">
          <Eyebrow>Kickbord Launch</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">Get the full system live fast.</SlideHeadline>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-olive-950/10 bg-white p-8 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-olive-500">Launch</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-6xl text-olive-950 dark:text-white">$297</span>
                <span className="text-olive-500">/mo</span>
              </div>
              <p className="mt-2 text-sm text-olive-600 dark:text-olive-400">Everything you need to capture leads, respond fast, and look great — all in one place.</p>
              <div className="mt-5 rounded-xl bg-olive-500/10 border border-olive-500/20 px-4 py-3">
                <p className="text-sm font-semibold text-olive-700 dark:text-olive-300">No setup fees.</p>
                <p className="mt-0.5 text-xs text-olive-600 dark:text-olive-400">Full onboarding and build included at no extra cost.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-4 text-sm font-semibold text-olive-950 dark:text-white">{"What's included"}</p>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {[
                'AI website',
                'Integrated contact forms',
                'AI chatbot',
                'Live chat widget',
                'SMS lead notifications',
                'Automated lead follow-up',
                'CRM & contact database',
              ].map((f) => <CheckItem key={f}>{f}</CheckItem>)}
            </ul>
            <div className="mt-6 rounded-xl bg-olive-950/5 p-5 dark:bg-white/5">
              <p className="text-sm font-semibold text-olive-950 dark:text-white">Core message</p>
              <p className="mt-1 text-sm italic text-olive-700 dark:text-olive-300">
                {`"Get the full lead capture and follow-up system live fast. Stop losing leads you're already paying for."`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 8 — Upsell: LSA
// ─────────────────────────────────────────────────────────────────────────────

function Slide8({ info }: { info: LeadInfo }) {
  const company = info.company || 'your business'
  const trade = info.trade || 'Landscaping'

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_-20%,oklch(33%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-7xl">
        <div className="mb-8 text-center">
          <Eyebrow light>Want more leads?</Eyebrow>
          <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
            Get found first on Google.
          </SlideHeadline>
          <p className="mt-3 text-base text-white/65 max-w-xl mx-auto">
            Local Services Ads put {company} at the very top of Google — above regular ads, above the map pack. Only pay for verified phone leads.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left — LSA mockup */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40 text-center">How it looks on Google</p>
            <div className="overflow-hidden rounded-2xl bg-white p-5 shadow-2xl">
              {/* Google search bar mock */}
              <div className="mb-4 flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5">
                <svg className="size-4 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="text-sm text-gray-500 flex-1">{trade.toLowerCase()} near me</span>
                <svg className="size-5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>

              {/* LSA section label */}
              <div className="mb-2 flex items-center gap-1.5">
                <span className="text-xs text-gray-500">Sponsored</span>
              </div>

              {/* LSA card — company */}
              <div className="mb-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 p-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-olive-100">
                    <svg className="size-6 text-olive-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-sm font-semibold text-blue-700 truncate">{info.company || 'Green Valley Landscaping'}</p>
                      <span className="inline-flex items-center gap-0.5 rounded-sm bg-green-50 border border-green-200 px-1.5 py-0.5 text-[10px] font-semibold text-green-700 shrink-0">
                        <svg className="size-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        Google Guaranteed
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs text-yellow-500">★★★★★</span>
                      <span className="text-xs text-gray-600">5.0 (127)</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">Ventura, CA · Landscaping · Open now</p>
                  </div>
                  <button className="shrink-0 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                    Call
                  </button>
                </div>
              </div>

              {/* LSA card — competitor 1 */}
              <div className="mb-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 p-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                    <svg className="size-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-blue-700">Valley Green Pro</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs text-yellow-500">★★★★☆</span>
                      <span className="text-xs text-gray-600">4.3 (42)</span>
                    </div>
                    <p className="text-xs text-gray-500">Oxnard, CA · Landscaping</p>
                  </div>
                  <button className="shrink-0 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                    Call
                  </button>
                </div>
              </div>

              {/* More results link */}
              <p className="mt-1 text-center text-xs text-blue-600 cursor-pointer hover:underline">
                See all {trade.toLowerCase()} providers →
              </p>
            </div>
          </div>

          {/* Right — bullet points */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              {[
                { icon: <MapPinIcon />, title: 'Top of Google — above everything', desc: 'LSA appears above regular ads and the map pack. The first thing homeowners see.' },
                { icon: <LightingBoltIcon />, title: 'Pay per verified lead, not per click', desc: 'You only pay when a real customer calls directly through the ad — not for wasted impressions.' },
                { icon: <StarIcon />, title: 'Google Guaranteed badge', desc: 'Displays a trust badge next to your name. Homeowners are more likely to call a Google-backed business.' },
                { icon: <TargetIcon />, title: 'Managed for you', desc: `Kickbord handles setup, verification, and ongoing bid optimisation for ${company}.` },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs/5 text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-3">
              <p className="text-xs font-semibold text-yellow-300">Ad budget not included</p>
              <p className="mt-0.5 text-xs text-yellow-200/70">
                The management fee covers setup and ongoing management. The actual Google ad spend is a separate budget — typically $300–$1,000/mo depending on market and trade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 9 — Reputation Management image placeholder
// ─────────────────────────────────────────────────────────────────────────────

function Slide9({ info }: { info: LeadInfo }) {
  const company = info.company || 'your business'
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-16 bg-white dark:bg-olive-950">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            <div>
              <Eyebrow>Reputation management</Eyebrow>
              <SlideHeadline className="mt-3 text-4xl sm:text-5xl">
                Build reviews on<br />autopilot.
              </SlideHeadline>
            </div>
            <SlideSubhead>
              After every completed job, your customers automatically receive a review request link — sent straight to their phone. No awkward ask. No relying on them to remember.
            </SlideSubhead>
            <div className="flex flex-col gap-3">
              {[
                { icon: <StarIcon />, title: 'Automated post-job request', desc: `Once a job is complete, ${company} triggers a review request SMS automatically.` },
                { icon: <TargetIcon />, title: 'Directs to Google or Yelp', desc: 'One tap takes the customer straight to your review page — maximum friction removed.' },
                { icon: <LightingBoltIcon />, title: 'More reviews = better ranking', desc: 'Volume and recency of Google reviews directly influence your local search position.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-xl border border-olive-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-olive-950/5 text-olive-700 dark:bg-white/10 dark:text-olive-300">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-olive-950 dark:text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs/5 text-olive-600 dark:text-olive-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image placeholder */}
          <div className="relative flex min-h-[400px] flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border border-olive-950/10 bg-olive-950/5 dark:border-white/10 dark:bg-white/5">
            {/* Review request SMS mockup */}
            <div className="flex flex-col gap-3 p-8 w-full max-w-xs">
              <div className="self-start max-w-[90%] rounded-2xl rounded-tl-sm bg-olive-700 px-4 py-3 shadow-md">
                <p className="text-xs font-semibold text-white mb-1">{info.company || 'Green Valley Landscaping'}</p>
                <p className="text-xs text-white/90">
                  {`Hi! Thanks for choosing us. We'd love your feedback — tap to leave a quick Google review:`}
                </p>
                <p className="mt-2 text-xs text-white/60 underline">g.page/r/review →</p>
              </div>

              {/* Stars */}
              <div className="self-start rounded-2xl rounded-tl-sm bg-olive-950/8 dark:bg-white/10 px-4 py-3">
                <p className="text-xs text-olive-700 dark:text-white mb-2">How was your experience?</p>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className="text-xl text-yellow-400">★</span>
                  ))}
                </div>
              </div>

              <div className="self-end rounded-2xl rounded-tr-sm bg-olive-600 px-3 py-2">
                <p className="text-xs text-white">Left a 5-star review!</p>
              </div>
            </div>

            {/* Stat overlay */}
            <div className="absolute bottom-5 right-5 rounded-xl border border-olive-950/10 bg-white px-4 py-3 shadow-lg dark:border-white/10 dark:bg-olive-900">
              <p className="text-xs text-olive-500 dark:text-olive-400">Avg. new reviews/mo</p>
              <p className="font-display text-2xl text-olive-950 dark:text-white">+12</p>
            </div>

            <p className="absolute bottom-5 left-5 text-xs text-olive-400 dark:text-olive-500">
              [Image placeholder]
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 10 — Grow pricing ($497) — no setup fee, no CTA, ad budget note
// ─────────────────────────────────────────────────────────────────────────────

function Slide10({ info }: { info: LeadInfo }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_110%,oklch(28%_0.03_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Eyebrow light>Kickbord Grow</Eyebrow>
              <span className="rounded-full bg-white px-3 py-0.5 text-xs font-bold text-olive-950">Most Popular</span>
            </div>
            <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
              Launch, plus more leads<br />and more reviews.
            </SlideHeadline>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-6xl text-white">$497</p>
            <p className="text-white/50">/mo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Everything in Launch, plus:</p>
            <ul className="grid grid-cols-1 gap-2.5">
              {[
                'Full Local Services Ads setup & management',
                'Reputation management (automated post-job review requests)',
                'All Kickbord Launch features included',
              ].map((f) => <CheckItem key={f} light>{f}</CheckItem>)}
            </ul>
            <div className="mt-4 rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-3">
              <p className="text-xs font-semibold text-yellow-300">Ad budget not included</p>
              <p className="mt-0.5 text-xs text-yellow-200/70">
                Google ad spend is a separate budget on top of this fee — typically $300–$1,000/mo depending on market.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Best for</p>
              <p className="mt-1 text-sm text-white/70">
                {info.trade
                  ? `${info.trade} businesses ready to dominate local search and build a 5-star reputation on autopilot.`
                  : 'Contractors ready to dominate local search and build a 5-star reputation on autopilot.'}
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-5">
              <p className="text-sm font-semibold text-white">Core message</p>
              <p className="mt-1 text-sm italic text-white/70">{`"Get found first, get more reviews, and close more jobs — all on autopilot."`}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-sm font-semibold text-white">No setup fees.</p>
              <p className="mt-0.5 text-xs text-white/55">Full onboarding and build included at no extra cost.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 11 — Side-by-side + monthly/quarterly tab switcher (merged)
// ─────────────────────────────────────────────────────────────────────────────

function Slide11({ info }: { info: LeadInfo }) {
  const [billingTab, setBillingTab] = useState<'monthly' | 'quarterly'>('monthly')

  const launchFeatures = [
    'AI website',
    'Integrated contact forms',
    'AI chatbot',
    'Live chat widget',
    'SMS lead notifications',
    'Automated lead follow-up',
    'CRM & contact database',
  ]

  const growExtras = [
    'Local Services Ads setup & management',
    'Reputation management',
  ]

  const plans = [
    {
      name: 'Kickbord Launch',
      key: 'launch',
      isDark: false,
      monthly: { price: '$297', period: '/mo', cta: 'Start with Launch', href: '/get-started/pay?plan=launch&billing=monthly' },
      quarterly: {
        price: '$760',
        period: '/qtr',
        savings: 'Save $131',
        equivalent: '~$253/mo',
        cta: 'Start Launch — quarterly',
        href: '/get-started/pay?plan=launch&billing=quarterly',
        bonus: 'No setup fee + priority onboarding',
      },
    },
    {
      name: 'Kickbord Grow',
      key: 'grow',
      isDark: true,
      monthly: { price: '$497', period: '/mo', cta: 'Start with Grow', href: '/get-started/pay?plan=grow&billing=monthly' },
      quarterly: {
        price: '$1,270',
        period: '/qtr',
        savings: 'Save $221',
        equivalent: '~$423/mo',
        cta: 'Start Grow — quarterly',
        href: '/get-started/pay?plan=grow&billing=quarterly',
        bonus: 'No setup fee + priority onboarding',
      },
    },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-12 bg-white dark:bg-olive-950">
      <div className="w-full max-w-5xl">
        <div className="mb-8 text-center">
          <Eyebrow>Choose your plan</Eyebrow>
          <SlideHeadline className="mt-3 text-4xl sm:text-5xl">Simple, transparent pricing.</SlideHeadline>
          <SlideSubhead className="mx-auto mt-3 max-w-xl">
            No setup fees. No long-term contracts required. Cancel or upgrade anytime.
          </SlideSubhead>

          {/* Tab switcher */}
          <div className="mt-6 inline-flex rounded-full border border-olive-950/15 bg-olive-950/5 p-1 dark:border-white/15 dark:bg-white/5">
            <button
              onClick={() => setBillingTab('monthly')}
              className={clsx(
                'rounded-full px-6 py-2 text-sm font-semibold transition-all',
                billingTab === 'monthly'
                  ? 'bg-olive-950 text-white shadow-sm dark:bg-white dark:text-olive-950'
                  : 'text-olive-600 hover:text-olive-950 dark:text-olive-400 dark:hover:text-white'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingTab('quarterly')}
              className={clsx(
                'relative rounded-full px-6 py-2 text-sm font-semibold transition-all',
                billingTab === 'quarterly'
                  ? 'bg-olive-950 text-white shadow-sm dark:bg-white dark:text-olive-950'
                  : 'text-olive-600 hover:text-olive-950 dark:text-olive-400 dark:hover:text-white'
              )}
            >
              Quarterly
              {billingTab !== 'quarterly' && (
                <span className="absolute -top-1 -right-1 rounded-full bg-green-500 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
                  15% off
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {plans.map((plan) => {
            const data = billingTab === 'monthly' ? plan.monthly : plan.quarterly
            const { isDark } = plan
            return (
              <div
                key={plan.key}
                className={clsx(
                  'relative flex flex-col gap-5 rounded-2xl p-7 transition-all',
                  isDark
                    ? 'border-2 border-olive-950 bg-olive-950 dark:border-white/30'
                    : 'border border-olive-950/10 bg-white dark:border-white/10 dark:bg-white/5'
                )}
              >
                {isDark && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-olive-950 px-4 py-1 text-xs font-bold text-white dark:bg-white dark:text-olive-950">
                    Most Popular
                  </span>
                )}
                <div>
                  <p className={clsx('text-xs font-semibold uppercase tracking-widest', isDark ? 'text-olive-400' : 'text-olive-500')}>
                    {plan.name}
                  </p>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className={clsx('font-display text-5xl', isDark ? 'text-white' : 'text-olive-950 dark:text-white')}>
                      {data.price}
                    </span>
                    <span className={clsx('text-sm', isDark ? 'text-white/50' : 'text-olive-500')}>
                      {data.period}
                    </span>
                  </div>
                  {billingTab === 'quarterly' && 'savings' in data && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-bold text-green-500">{data.savings}</span>
                      <span className={clsx('text-xs', isDark ? 'text-white/50' : 'text-olive-500')}>{data.equivalent}</span>
                    </div>
                  )}
                </div>

                {billingTab === 'quarterly' && 'bonus' in data && (
                  <div className={clsx('rounded-xl p-3.5', isDark ? 'border border-white/15 bg-white/10' : 'border border-olive-950/10 bg-olive-950/5 dark:border-white/10 dark:bg-white/5')}>
                    <p className={clsx('text-xs font-semibold', isDark ? 'text-white' : 'text-olive-950 dark:text-white')}>Quarterly bonus</p>
                    <p className={clsx('mt-0.5 text-xs', isDark ? 'text-white/60' : 'text-olive-500')}>{data.bonus}</p>
                  </div>
                )}

                {/* Features */}
                <ul className="flex flex-col gap-2">
                  {launchFeatures.map((f) => (
                    <li key={f} className={clsx('flex items-start gap-2.5 text-xs/5', isDark ? 'text-white/80' : 'text-olive-700 dark:text-olive-300')}>
                      <span className={clsx('mt-0.5 size-3.5 shrink-0', isDark ? 'text-white/40' : 'text-olive-400')}><CheckmarkIcon /></span>
                      {f}
                    </li>
                  ))}
                  {isDark && (
                    <>
                      <li className="mt-1 border-t border-white/10 pt-2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1.5">Also included:</p>
                      </li>
                      {growExtras.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-xs/5 text-olive-300">
                          <span className="mt-0.5 size-3.5 shrink-0 text-olive-400"><CheckmarkIcon /></span>
                          {f}
                        </li>
                      ))}
                    </>
                  )}
                </ul>

                <a
                  href={data.href}
                  className={clsx(
                    'mt-auto flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition',
                    isDark
                      ? 'bg-white text-olive-950 hover:bg-white/90'
                      : 'border border-olive-950/20 bg-white text-olive-950 hover:bg-olive-950/5 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
                  )}
                >
                  {data.cta}
                </a>
              </div>
            )
          })}
        </div>

        {/* Ad budget disclaimer */}
        <p className="mt-5 text-center text-xs text-olive-500 dark:text-olive-400">
          Grow plan: Google ad spend is a separate budget on top of the monthly fee (typically $300–$1,000/mo). No setup fees on either plan.
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 12 — Next Steps / Close
// ─────────────────────────────────────────────────────────────────────────────

function Slide12({ info }: { info: LeadInfo }) {
  const company = info.company || 'your business'
  const owner = info.owner

  // lsa = true for Grow plan context (if trade is set we assume upsell is relevant)
  const steps: { num: string; title: string; timeframe: string; desc: string; isLsa?: boolean }[] = [
    {
      num: '01',
      title: 'Onboarding form',
      timeframe: 'Day 1',
      desc: 'Quick form to collect your business info, brand assets, and service details. Takes about 10 minutes.',
    },
    {
      num: '02',
      title: 'Build & setup',
      timeframe: 'Days 2–10',
      desc: 'Your AI site, chatbot, and automations are built and configured. Typically 5–10 business days.',
    },
    {
      num: '03',
      title: 'LSA verification (Grow)',
      timeframe: '1–4 weeks (Google timeline)',
      desc: 'Google verifies your business for Local Services Ads — this runs in parallel with your build. Google controls this timeline, so we start it immediately and account for the wait.',
      isLsa: true,
    },
    {
      num: '04',
      title: 'Review & approve',
      timeframe: 'Days 10–14',
      desc: 'You review everything before anything goes live. We iterate until it looks exactly right.',
    },
    {
      num: '05',
      title: 'Launch',
      timeframe: 'Week 2–3',
      desc: 'Site, chatbot, and automations go live. LSA ads activate once Google verification clears.',
    },
  ]

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-8 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,oklch(33%_0.03_107)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,oklch(25%_0.025_107)_0%,transparent_55%)]" />

      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">

          {/* Left — close */}
          <div className="flex flex-col gap-6">
            <div>
              <Eyebrow light>Ready to get started?</Eyebrow>
              <SlideHeadline light className="mt-3 text-4xl sm:text-5xl">
                {owner
                  ? `${owner}, let's build this.`
                  : "Let's build this."}
              </SlideHeadline>
            </div>
            <p className="text-base/7 text-white/70">
              {company !== 'your business'
                ? `${company} gets the full system — AI site, chatbot, forms-to-text, and live chat — up and running with no setup fees.`
                : "You get the full system — AI site, chatbot, forms-to-text, and live chat — up and running with no setup fees."}
            </p>

            <div className="flex flex-col gap-2.5">
              {[
                { icon: <UiLayoutIcon />, label: 'AI site built for your trade' },
                { icon: <BellIcon />, label: 'Forms trigger instant SMS' },
                { icon: <SparklesIcon />, label: 'AI chatbot answers 24/7' },
                { icon: <ChatBubbleCircleIcon />, label: 'Live chat from day one' },
                { icon: <RocketIcon />, label: 'No setup fees — ever' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                    {item.icon}
                  </span>
                  <p className="text-sm text-white/80">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-2 flex flex-col gap-3">
              <a
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-olive-950 transition hover:opacity-90"
              >
                Fill out the onboarding form <ArrowNarrowRightIcon />
              </a>
              <p className="text-xs text-white/35 text-center">
                Or ask about quarterly prepay for a further 15% off.
              </p>
            </div>
          </div>

          {/* Right — next steps */}
          <div>
            <div className="mb-6">
              <Eyebrow light>What happens next</Eyebrow>
              <p className="mt-2 text-lg text-white/80">From onboarding to live in 2–3 weeks.</p>
            </div>
            <div className="relative flex flex-col gap-0">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-start gap-5 pb-5">
                  {/* Number + connector line */}
                  <div className="flex flex-col items-center">
                    <span
                      className={clsx(
                        'flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold',
                        s.isLsa
                          ? 'bg-amber-400 text-olive-950'
                          : 'bg-white text-olive-950'
                      )}
                    >
                      {s.num}
                    </span>
                    {i < steps.length - 1 && (
                      <div
                        className={clsx(
                          'mt-1 w-px flex-1',
                          s.isLsa ? 'bg-amber-400/30' : 'bg-white/15'
                        )}
                        style={{ minHeight: '1.5rem' }}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div className={clsx('pb-2 flex-1', s.isLsa && 'rounded-xl border border-amber-400/25 bg-amber-400/8 p-3 -mt-1')}>
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <p className={clsx('text-sm font-semibold', s.isLsa ? 'text-amber-300' : 'text-white')}>{s.title}</p>
                      <span
                        className={clsx(
                          'shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                          s.isLsa
                            ? 'bg-amber-400/20 text-amber-300'
                            : 'bg-white/10 text-white/60'
                        )}
                      >
                        {s.timeframe}
                      </span>
                    </div>
                    <p className={clsx('mt-1 text-xs/5', s.isLsa ? 'text-amber-200/65' : 'text-white/55')}>{s.desc}</p>
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

// ─────────────────────────────────────────────────────────────────────────────
// Slide registry
// ─────────────────────────────────────────────────────────────────────────────

const BASE_LABELS = [
  'About Kickbord',      // 1
  'The System',          // 2
  'Forms to Text',       // 3
  'AI Chatbot Features', // 4
  'AI Chatbot Demo',     // 5
  'Feature Recap',       // 6
  '$297 Launch',         // 7
  'LSA — More Leads',    // 8
  'Reputation Mgmt',     // 9
  '$497 Grow',           // 10
  'Pricing & Plans',     // 11
  'Next Steps',          // 12
]

const BASE_COMPONENTS = [
  Slide1, Slide2, Slide3, Slide5, Slide4,
  Slide6, Slide7, Slide8, Slide9, Slide10,
  Slide11, Slide12,
]

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

  const maxSlideRef = useRef(BASE_LABELS.length)
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

  const hasPreview = Boolean(info.siteUrl)
  const slideLabels = hasPreview ? ['Current Site Preview', ...BASE_LABELS] : BASE_LABELS
  const slideComponents = hasPreview ? [SitePreviewSlide, ...BASE_COMPONENTS] : BASE_COMPONENTS

  const SLIDE_COUNT = slideLabels.length
  maxSlideRef.current = SLIDE_COUNT
  const CurrentSlide = slideComponents[current]

  if (!started) {
    return (
      <div className="h-screen w-screen overflow-hidden">
        <PreCallScreen info={info} onChange={updateInfo} onStart={() => { setCurrent(0); setStarted(true) }} />
      </div>
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-mist-100 dark:bg-mist-950">
      <div className="h-full w-full">
        <CurrentSlide info={info} />
      </div>

      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 py-4">
        <a href="/" className="pointer-events-auto">
          <img src="/Logos/icon.svg" alt="Kickbord" width={72} height={24} className="opacity-60 transition-opacity hover:opacity-100 dark:invert" />
        </a>
        <div className="pointer-events-auto flex items-center gap-2">
          {info.company && (
            <span className="rounded-full bg-black/20 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
              {info.company}
            </span>
          )}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full bg-black/20 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/30"
          >
            <span className="font-mono">{current + 1} / {SLIDE_COUNT}</span>
            <span className="hidden text-white/70 sm:inline">·</span>
            <span className="hidden sm:inline">{slideLabels[current]}</span>
          </button>
          <button
            onClick={() => setStarted(false)}
            className="flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-colors hover:bg-black/30"
            title="Edit lead info"
          >
            <svg className="size-3" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Z" />
            </svg>
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
                  <span className="w-5 shrink-0 text-right font-mono text-xs opacity-40">{i + 1}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      {(() => {
        const chatDemoIndex = hasPreview ? 5 : 4
        const isChat = current === chatDemoIndex
        return (
          <div className={clsx('absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-5', isChat && 'pointer-events-none')}>
            <button
              onClick={prev}
              disabled={current === 0}
              className={clsx(
                'flex size-10 items-center justify-center rounded-full transition-all',
                current === 0 || isChat ? 'pointer-events-none opacity-0' : 'bg-black/20 text-white backdrop-blur-sm hover:bg-black/35'
              )}
            >
              <span className="size-4"><ArrowNarrowLeftIcon /></span>
            </button>

            <div className={clsx('flex items-center gap-1.5', isChat && 'pointer-events-auto')}>
              {slideLabels.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={clsx(
                    'rounded-full transition-all duration-300',
                    i === current ? 'h-1.5 w-6 bg-white shadow-sm' : 'h-1.5 w-1.5 bg-white/30 hover:bg-white/60'
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={current === SLIDE_COUNT - 1}
              className={clsx(
                'flex size-10 items-center justify-center rounded-full transition-all',
                current === SLIDE_COUNT - 1 || isChat ? 'pointer-events-none opacity-0' : 'bg-black/20 text-white backdrop-blur-sm hover:bg-black/35'
              )}
            >
              <span className="size-4"><ArrowNarrowRightIcon /></span>
            </button>
          </div>
        )
      })()}
    </div>
  )
}
