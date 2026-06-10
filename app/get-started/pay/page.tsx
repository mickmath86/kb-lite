'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { clsx } from 'clsx/lite'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { LockIcon } from '@/components/icons/lock-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { RocketIcon } from '@/components/icons/rocket-icon'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'

// ─────────────────────────────────────────────────────────────────────────────
// Plan config
// ─────────────────────────────────────────────────────────────────────────────

const WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/FJeizTc6Xn4BiUesMgHQ/webhook-trigger/3a814faf-27f9-4b8d-861d-004b677cbd3d'

type PlanKey = 'launch' | 'grow'
type BillingKey = 'monthly' | 'quarterly'
type ContactMethod = 'email' | 'sms'

interface PlanConfig {
  name: string
  label: string
  price: string
  period: string
  billingNote: string
  color: 'light' | 'dark'
  features: string[]
  badge?: string
}

const PLANS: Record<PlanKey, Record<BillingKey, PlanConfig>> = {
  launch: {
    monthly: {
      name: 'Kickbord Launch',
      label: 'launch-monthly',
      price: '$297',
      period: '/mo',
      billingNote: 'Billed monthly. Cancel anytime.',
      color: 'light',
      features: [
        'AI website',
        'Integrated contact forms',
        'AI chatbot',
        'Live chat widget',
        'SMS lead notifications',
        'Automated lead follow-up',
        'CRM & contact database',
        'No setup fees',
      ],
    },
    quarterly: {
      name: 'Kickbord Launch',
      label: 'launch-quarterly',
      price: '$760',
      period: '/qtr',
      billingNote: 'Billed every 3 months. Save 15% vs monthly.',
      color: 'light',
      badge: 'Save 15%',
      features: [
        'AI website',
        'Integrated contact forms',
        'AI chatbot',
        'Live chat widget',
        'SMS lead notifications',
        'Automated lead follow-up',
        'CRM & contact database',
        'No setup fees',
        'Priority onboarding',
      ],
    },
  },
  grow: {
    monthly: {
      name: 'Kickbord Grow',
      label: 'grow-monthly',
      price: '$497',
      period: '/mo',
      billingNote: 'Billed monthly. Cancel anytime.',
      color: 'dark',
      badge: 'Most Popular',
      features: [
        'Everything in Launch',
        'Local Services Ads setup & management',
        'Reputation management',
        'Automated post-job review requests',
        'No setup fees',
      ],
    },
    quarterly: {
      name: 'Kickbord Grow',
      label: 'grow-quarterly',
      price: '$1,270',
      period: '/qtr',
      billingNote: 'Billed every 3 months. Save 15% vs monthly.',
      color: 'dark',
      badge: 'Save 15%',
      features: [
        'Everything in Launch',
        'Local Services Ads setup & management',
        'Reputation management',
        'Automated post-job review requests',
        'No setup fees',
        'Priority onboarding',
      ],
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Inner page (needs useSearchParams — wrapped in Suspense below)
// ─────────────────────────────────────────────────────────────────────────────

type FormState = 'idle' | 'submitting' | 'success' | 'error'

function PayPageInner() {
  const params = useSearchParams()
  const rawPlan = params.get('plan') ?? 'launch'
  const rawBilling = params.get('billing') ?? 'monthly'

  const planKey: PlanKey = rawPlan === 'grow' ? 'grow' : 'launch'
  const billingKey: BillingKey = rawBilling === 'quarterly' ? 'quarterly' : 'monthly'
  const plan = PLANS[planKey][billingKey]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const contactValue = contactMethod === 'email' ? email.trim() : phone.trim()
    if (!name.trim() || !contactValue) {
      setErrorMsg('Please fill in all fields.')
      return
    }
    setErrorMsg('')
    setFormState('submitting')

    const payload: Record<string, string> = {
      // Plan identification — passed through to GHL
      plan: plan.name,
      plan_key: planKey,
      billing: billingKey,
      plan_label: plan.label,
      price: plan.price,
      period: plan.period,
      // Contact info
      name: name.trim(),
      contact_method: contactMethod,
      // Meta
      source: 'kickbord-pitch-deck',
      submitted_at: new Date().toISOString(),
    }

    if (contactMethod === 'email') {
      payload.email = email.trim()
    } else {
      payload.phone = phone.trim()
    }

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setFormState('success')
      } else {
        setFormState('error')
        setErrorMsg(`Something went wrong (${res.status}). Please try again or contact info@kickbord.com.`)
      }
    } catch {
      setFormState('error')
      setErrorMsg('Network error. Please try again or contact info@kickbord.com.')
    }
  }

  const isDark = plan.color === 'dark'

  // ── Success screen ──
  if (formState === 'success') {
    const contactDisplay = contactMethod === 'email' ? email : phone
    const contactLabel = contactMethod === 'email' ? 'email' : 'text message'
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-olive-950 px-6 py-20 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,oklch(33%_0.03_107)_0%,transparent_55%)]" />
        <div className="relative z-10 flex max-w-md flex-col items-center gap-6">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-500/20 ring-2 ring-green-500/40">
            <span className="size-8 text-green-400"><CheckmarkIcon /></span>
          </div>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">{"You're in"}</p>
            <h1 className="mt-2 font-display text-4xl text-white">
              {`Welcome to ${plan.name}.`}
            </h1>
          </div>
          <p className="text-base/7 text-white/65">
            {`We've received your info and will reach out via ${contactLabel} to ${contactDisplay} within one business day to kick off your onboarding.`}
          </p>
          <div className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Your selection</p>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-3xl text-white">{plan.price}</span>
              <span className="text-white/50">{plan.period}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-white">{plan.name}</p>
            <p className="mt-0.5 text-xs text-white/45">{plan.billingNote}</p>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition hover:text-white hover:border-white/40"
          >
            Back to kickbord.com
          </a>
        </div>
      </div>
    )
  }

  // ── Main form ──
  return (
    <div className="min-h-screen bg-white dark:bg-olive-950">

      {/* Nav */}
      <header className="border-b border-olive-950/10 dark:border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/">
            <img src="/Logos/Kb-logo.png" alt="Kickbord" height={28} className="h-7 dark:invert" />
          </a>
          <div className="flex items-center gap-1.5 text-xs text-olive-500 dark:text-olive-400">
            <span className="size-3.5"><LockIcon /></span>
            Secure checkout
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-5 lg:gap-12">

        {/* ── Left: Plan summary ── */}
        <div className="lg:col-span-2">
          <div className="sticky top-8">
            {/* Plan card */}
            <div className={clsx(
              'relative overflow-hidden rounded-2xl p-6',
              isDark
                ? 'bg-olive-950 text-white dark:bg-white/8 border border-white/10'
                : 'bg-white border border-olive-950/10 dark:bg-white/5 dark:border-white/10'
            )}>
              {plan.badge && (
                <span className={clsx(
                  'mb-3 inline-flex rounded-full px-3 py-1 text-xs font-bold',
                  plan.badge === 'Most Popular'
                    ? 'bg-white text-olive-950'
                    : 'bg-green-500/20 text-green-400'
                )}>
                  {plan.badge}
                </span>
              )}

              <p className={clsx('text-xs font-semibold uppercase tracking-widest', isDark ? 'text-olive-400' : 'text-olive-500')}>
                {plan.name}
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className={clsx('font-display text-5xl', isDark ? 'text-white' : 'text-olive-950 dark:text-white')}>
                  {plan.price}
                </span>
                <span className={clsx('text-sm', isDark ? 'text-white/50' : 'text-olive-500')}>
                  {plan.period}
                </span>
              </div>
              <p className={clsx('mt-1.5 text-xs', isDark ? 'text-white/45' : 'text-olive-500')}>
                {plan.billingNote}
              </p>

              <div className="mt-5 border-t pt-5 flex flex-col gap-2" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}>
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <span className={clsx('mt-0.5 size-4 shrink-0', isDark ? 'text-olive-400' : 'text-olive-500')}>
                      <CheckmarkIcon />
                    </span>
                    <span className={clsx('text-sm', isDark ? 'text-white/80' : 'text-olive-700 dark:text-olive-300')}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {planKey === 'grow' && (
                <p className={clsx('mt-4 rounded-lg px-3 py-2 text-xs', isDark ? 'bg-yellow-400/10 text-yellow-300/80' : 'bg-yellow-50 text-yellow-700')}>
                  Google ad spend is a separate budget on top of this fee (typically $300–$1,000/mo).
                </p>
              )}
            </div>

            {/* Trust badges */}
            <div className="mt-4 flex flex-col gap-2">
              {[
                { icon: <LockIcon />, text: 'Secure form — data encrypted in transit' },
                { icon: <SparklesIcon />, text: 'No setup fees. Cancel anytime.' },
                { icon: <RocketIcon />, text: 'Build starts within 1 business day' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 text-xs text-olive-500 dark:text-olive-400">
                  <span className="size-3.5 shrink-0">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-olive-500 dark:text-olive-400">
              Get started
            </p>
            <h1 className="mt-2 font-display text-3xl text-olive-950 dark:text-white">
              {`Let's get ${plan.name} set up for you.`}
            </h1>
            <p className="mt-2 text-sm text-olive-600 dark:text-olive-400">
              Fill in your details and we will reach out within one business day to kick off your onboarding. No payment is collected here.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Name */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-olive-500 dark:text-olive-400">
                Full name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Carlos Alvarez"
                className="w-full rounded-xl border border-olive-950/15 bg-white px-4 py-3 text-base text-olive-950 placeholder-olive-300 outline-none transition focus:border-olive-500 focus:ring-2 focus:ring-olive-500/20 dark:border-white/15 dark:bg-white/8 dark:text-white dark:placeholder-white/25 dark:focus:border-white/40"
              />
            </div>

            {/* Contact method toggle */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-olive-500 dark:text-olive-400">
                How should we reach you?
              </label>
              {/* Pill toggle */}
              <div className="mb-3 inline-flex rounded-xl border border-olive-950/12 bg-olive-950/4 p-1 dark:border-white/10 dark:bg-white/6">
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className={clsx(
                    'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150',
                    contactMethod === 'email'
                      ? 'bg-white text-olive-950 shadow-sm dark:bg-white/15 dark:text-white'
                      : 'text-olive-500 hover:text-olive-700 dark:text-white/45 dark:hover:text-white/70'
                  )}
                >
                  {/* Email icon */}
                  <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
                    <path d="M1.5 5.5l6.5 4 6.5-4" />
                  </svg>
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('sms')}
                  className={clsx(
                    'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150',
                    contactMethod === 'sms'
                      ? 'bg-white text-olive-950 shadow-sm dark:bg-white/15 dark:text-white'
                      : 'text-olive-500 hover:text-olive-700 dark:text-white/45 dark:hover:text-white/70'
                  )}
                >
                  {/* SMS icon */}
                  <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 2.5h12a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 2.5V3.5a1 1 0 011-1z" />
                  </svg>
                  SMS
                </button>
              </div>

              {/* Email input */}
              {contactMethod === 'email' && (
                <input
                  key="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="carlos@yourbusiness.com"
                  className="w-full rounded-xl border border-olive-950/15 bg-white px-4 py-3 text-base text-olive-950 placeholder-olive-300 outline-none transition focus:border-olive-500 focus:ring-2 focus:ring-olive-500/20 dark:border-white/15 dark:bg-white/8 dark:text-white dark:placeholder-white/25 dark:focus:border-white/40"
                />
              )}

              {/* Phone input */}
              {contactMethod === 'sms' && (
                <input
                  key="phone-input"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(805) 555-0123"
                  className="w-full rounded-xl border border-olive-950/15 bg-white px-4 py-3 text-base text-olive-950 placeholder-olive-300 outline-none transition focus:border-olive-500 focus:ring-2 focus:ring-olive-500/20 dark:border-white/15 dark:bg-white/8 dark:text-white dark:placeholder-white/25 dark:focus:border-white/40"
                />
              )}
            </div>

            {/* Selected plan summary bar */}
            <div className={clsx(
              'rounded-xl border px-4 py-3',
              isDark
                ? 'border-olive-500/20 bg-olive-950/5 dark:border-white/10 dark:bg-white/5'
                : 'border-olive-950/10 bg-olive-950/3 dark:border-white/10 dark:bg-white/5'
            )}>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-olive-500 dark:text-olive-400">
                    Selected plan
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-olive-950 dark:text-white">
                    {plan.name} — {billingKey === 'quarterly' ? 'Quarterly' : 'Monthly'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl text-olive-950 dark:text-white">{plan.price}</span>
                  <span className="text-sm text-olive-500 dark:text-olive-400">{plan.period}</span>
                </div>
              </div>
            </div>

            {/* Error */}
            {errorMsg && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-400">
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={formState === 'submitting'}
              className={clsx(
                'flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold transition active:scale-[0.99]',
                formState === 'submitting'
                  ? 'cursor-not-allowed bg-olive-950/50 text-white/50 dark:bg-white/20 dark:text-white/40'
                  : 'bg-olive-950 text-white hover:bg-olive-800 dark:bg-white dark:text-olive-950 dark:hover:bg-white/90'
              )}
            >
              {formState === 'submitting' ? (
                <>
                  <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting…
                </>
              ) : (
                <>
                  {`Get started with ${plan.name}`}
                  <span className="size-4"><ArrowNarrowRightIcon /></span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-olive-400 dark:text-olive-500">
              {contactMethod === 'sms'
                ? 'By submitting, you agree to receive follow-up via SMS. Reply STOP to opt out. No payment is collected on this form.'
                : 'By submitting, you agree to receive a follow-up email. No payment is collected on this form.'}
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Export — wrapped in Suspense for useSearchParams
// ─────────────────────────────────────────────────────────────────────────────

export default function PayPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-olive-950">
        <div className="flex flex-col items-center gap-3">
          <svg className="size-8 animate-spin text-olive-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-olive-500">Loading…</p>
        </div>
      </div>
    }>
      <PayPageInner />
    </Suspense>
  )
}
