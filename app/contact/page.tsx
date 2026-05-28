'use client'

import { useState } from 'react'
import { Button, ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CalendarIcon } from '@/components/icons/calendar-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { MailIcon } from '@/components/icons/mail-icon'
import { MapPinIcon } from '@/components/icons/map-pin-icon'
import { MicrophoneIcon } from '@/components/icons/microphone-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { TargetIcon } from '@/components/icons/target-icon'
import { UiLayoutIcon } from '@/components/icons/ui-layout-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithLinkCategories,
} from '@/components/sections/footer-with-link-categories'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const services = [
  { id: 'ai-voice', icon: <MicrophoneIcon />, label: 'AI Voice Agents' },
  { id: 'websites', icon: <UiLayoutIcon />, label: 'Websites & Redesigns' },
  { id: 'consulting', icon: <TargetIcon />, label: 'Marketing Strategy' },
  { id: 'not-sure', icon: <SparklesIcon />, label: "Not sure yet" },
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Your name is required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'A valid email address is required.'
    if (!form.message.trim()) e.message = 'Please tell us a bit about your business.'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus('submitting')

    try {
      const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/FJeizTc6Xn4BiUesMgHQ/webhook-trigger/a24fbc54-25a8-4be2-9494-ad52e6a39dd4'

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'kickbord-contact-form' }),
      })

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-olive-950/15 bg-white px-4 py-3 text-sm text-olive-950 placeholder:text-olive-400 focus:outline-none focus:ring-2 focus:ring-olive-950/20 dark:border-white/10 dark:bg-olive-900 dark:text-white dark:placeholder:text-olive-500 dark:focus:ring-white/20 transition-colors'

  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <NavbarWithLogoActionsAndCenteredLinks
        id="navbar"
        links={
          <>
            <NavbarLink href="/about">About</NavbarLink>
            <NavbarLink href="/services">Services</NavbarLink>
            <NavbarLink href="/contact" className="font-semibold text-olive-950 dark:text-white">Contact</NavbarLink>
            <NavbarLink href="#" className="sm:hidden">Log in</NavbarLink>
          </>
        }
        logo={
          <NavbarLogo href="/">
            <img src="/Logos/icon.svg" alt="Kickbord" className="dark:hidden" width={85} height={28} />
            <img src="/Logos/icon.svg" className="not-dark:hidden" width={85} height={28} />
          </NavbarLogo>
        }
        actions={
          <>
            <PlainButtonLink href="#" className="max-sm:hidden">Log in</PlainButtonLink>
            <ButtonLink href="/get-started">Get started <ArrowNarrowRightIcon /></ButtonLink>
          </>
        }
      />

      <Main>
        <div className="mx-auto w-full max-w-2xl px-6 py-16 md:max-w-3xl lg:max-w-7xl lg:px-10">

          {/* ── Page header ────────────────────────────────────────────── */}
          <div className="mb-14 max-w-2xl">
            <p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">Get in touch</p>
            <h1 className="mt-2 font-display text-[2rem]/10 tracking-tight text-olive-950 sm:text-5xl/14 dark:text-white">
              Let's talk about your business.
            </h1>
            <p className="mt-4 text-base/7 text-olive-700 dark:text-olive-400">
              Tell us a little about what you're working on and what you need. We'll get back to you within one business
              day to set up a conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">

            {/* ── Form ───────────────────────────────────────────────── */}
            <div className="lg:col-span-3">
              {status === 'success' ? (
                /* Success state */
                <div className="flex flex-col items-center gap-6 rounded-2xl border border-olive-950/10 bg-white px-8 py-16 text-center dark:border-white/10 dark:bg-olive-900">
                  <div className="flex size-14 items-center justify-center rounded-full bg-olive-950/10 text-olive-950 dark:bg-white/10 dark:text-white">
                    <CheckmarkIcon />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-olive-950 dark:text-white">Message received.</h2>
                    <p className="mt-3 text-base text-olive-600 dark:text-olive-400">
                      Thanks for reaching out, {form.name.split(' ')[0]}. We'll be in touch within one business day.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    <ButtonLink href="/" size="lg">Back to home</ButtonLink>
                    <PlainButtonLink href="/get-started" size="lg">
                      Start the questionnaire <ArrowNarrowRightIcon />
                    </PlainButtonLink>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                        Your name <span className="text-olive-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Jane Smith"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                      />
                      {errors.name && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                        Email address <span className="text-olive-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="jane@yourbusiness.com"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                      />
                      {errors.email && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Company + Phone */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                        Business name
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Services LLC"
                        autoComplete="organization"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        placeholder="(805) 555-0100"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Service interest */}
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-olive-950 dark:text-white">
                      What are you most interested in?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((s) => (
                        <label
                          key={s.id}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-olive-950/10 bg-white p-4 transition-colors hover:border-olive-950/25 has-[:checked]:border-olive-950 has-[:checked]:bg-olive-950/5 dark:border-white/10 dark:bg-olive-900/50 dark:hover:border-white/20 dark:has-[:checked]:border-white dark:has-[:checked]:bg-white/5"
                        >
                          <input
                            type="radio"
                            name="service"
                            value={s.id}
                            checked={form.service === s.id}
                            onChange={() => setForm({ ...form, service: s.id })}
                            className="accent-olive-950 dark:accent-olive-300"
                          />
                          <span className="flex items-center gap-2 text-sm font-medium text-olive-950 dark:text-white">
                            <span className="size-4 shrink-0">{s.icon}</span>
                            {s.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                      Tell us about your business <span className="text-olive-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="What does your business do? What are you hoping to improve or build? Any context helps."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'submitting'}
                    className="w-full justify-center disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send message'}
                  </Button>

                  <p className="text-center text-xs text-olive-500 dark:text-olive-500">
                    We respond within one business day. No spam, ever.
                  </p>
                </form>
              )}
            </div>

            {/* ── Side info ──────────────────────────────────────────── */}
            <aside className="lg:col-span-2">
              <div className="flex flex-col gap-8">

                {/* What to expect */}
                <div>
                  <h2 className="font-display text-xl text-olive-950 dark:text-white">What to expect</h2>
                  <ul className="mt-5 flex flex-col gap-4">
                    {[
                      { icon: <CheckmarkIcon />, text: 'We review your message and business context within 24 hours.' },
                      { icon: <CalendarIcon />, text: 'We reach out to schedule a 30-minute discovery call.' },
                      { icon: <TargetIcon />, text: 'You walk away with a clear picture of what Kickbord can do for your business.' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 size-4 shrink-0 text-olive-700 dark:text-olive-400">{item.icon}</span>
                        <span className="text-sm/6 text-olive-700 dark:text-olive-400">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Divider */}
                <div className="border-t border-olive-950/10 dark:border-white/10" />

                {/* Direct contact */}
                <div>
                  <h2 className="font-display text-xl text-olive-950 dark:text-white">Prefer to reach out directly?</h2>
                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href="mailto:mike@kickbord.com"
                      className="group flex items-center gap-3 text-sm text-olive-700 hover:text-olive-950 dark:text-olive-400 dark:hover:text-white"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-olive-950/5 group-hover:bg-olive-950/10 dark:bg-white/5 dark:group-hover:bg-white/10">
                        <MailIcon />
                      </span>
                      mike@kickbord.com
                    </a>
                    <div className="flex items-center gap-3 text-sm text-olive-700 dark:text-olive-400">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-olive-950/5 dark:bg-white/5">
                        <MapPinIcon />
                      </span>
                      Ventura, California
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-olive-950/10 dark:border-white/10" />

                {/* Already know what you need? */}
                <div className="rounded-xl bg-olive-950/5 p-6 dark:bg-white/5">
                  <h3 className="text-sm font-semibold text-olive-950 dark:text-white">
                    Already know what you need?
                  </h3>
                  <p className="mt-2 text-sm text-olive-600 dark:text-olive-400">
                    Take our 2-minute business questionnaire. We'll use it to prepare a personalized
                    recommendation before your first call.
                  </p>
                  <div className="mt-4">
                    <ButtonLink href="/get-started" size="md" className="w-full justify-center">
                      Start the questionnaire <ArrowNarrowRightIcon />
                    </ButtonLink>
                  </div>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </Main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <FooterWithLinkCategories
        id="footer"
        links={
          <>
            <FooterCategory title="Services">
              <FooterLink href="/ai-voice-agents">AI Voice Agents</FooterLink>
              <FooterLink href="/websites">Websites</FooterLink>
              <FooterLink href="/consulting">Consulting</FooterLink>
            </FooterCategory>
            <FooterCategory title="Company">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/results">Results</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterCategory>
            <FooterCategory title="Legal">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </FooterCategory>
          </>
        }
        fineprint="© 2026 Kickbord. All rights reserved."
      />
    </>
  )
}
