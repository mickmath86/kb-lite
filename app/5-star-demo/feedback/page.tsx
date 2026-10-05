'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/FJeizTc6Xn4BiUesMgHQ/webhook-trigger/a24fbc54-25a8-4be2-9494-ad52e6a39dd4'

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Your name is required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'A valid email address is required.'
    }
    if (!form.message.trim()) e.message = 'Please share your feedback.'
    return e
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus('submitting')

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'kickbord-low-rating-feedback' }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-10 inline-flex w-full justify-center">
          <Image
            src="/logos/kb-icon-blk.png"
            alt="Kickbord"
            width={160}
            height={120}
            className="h-auto w-40 dark:hidden"
            priority
          />
          <Image
            src="/logos/kb-icon-white.png"
            alt="Kickbord"
            width={160}
            height={120}
            className="hidden h-auto w-40 dark:block"
            priority
          />
        </Link>

        {status === 'success' ? (
          <div className="text-center">
            <h1 className="font-display text-3xl tracking-tight text-olive-950 dark:text-white">
              Thanks for the feedback.
            </h1>
            <p className="mt-3 text-base text-olive-600 dark:text-olive-400">
              We appreciate you taking the time. We&apos;ll use it to improve.
            </p>
            <Link
              href="/"
              className="mt-8 inline-block rounded-lg bg-olive-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-olive-800 dark:bg-white dark:text-olive-950 dark:hover:bg-olive-100"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-center font-display text-3xl tracking-tight text-olive-950 sm:text-4xl dark:text-white">
              Help us improve.
            </h1>
            <p className="mt-3 text-center text-base text-olive-600 dark:text-olive-400">
              We&apos;re sorry we didn&apos;t hit the mark. Tell us what went wrong and what we can do better.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                  Your name <span className="text-olive-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-olive-950/15 bg-white px-4 py-3 text-sm text-olive-950 placeholder:text-olive-400 focus:outline-none focus:ring-2 focus:ring-olive-950/20 dark:border-white/10 dark:bg-olive-900 dark:text-white dark:placeholder:text-olive-500 dark:focus:ring-white/20"
                  placeholder="Jane Smith"
                />
                {errors.name && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                  Email address <span className="text-olive-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-olive-950/15 bg-white px-4 py-3 text-sm text-olive-950 placeholder:text-olive-400 focus:outline-none focus:ring-2 focus:ring-olive-950/20 dark:border-white/10 dark:bg-olive-900 dark:text-white dark:placeholder:text-olive-500 dark:focus:ring-white/20"
                  placeholder="jane@yourbusiness.com"
                />
                {errors.email && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                  What could we have done better? <span className="text-olive-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-lg border border-olive-950/15 bg-white px-4 py-3 text-sm text-olive-950 placeholder:text-olive-400 focus:outline-none focus:ring-2 focus:ring-olive-950/20 dark:border-white/10 dark:bg-olive-900 dark:text-white dark:placeholder:text-olive-500 dark:focus:ring-white/20"
                  placeholder="Tell us what happened..."
                />
                {errors.message && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
              </div>

              {status === 'error' && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full rounded-lg bg-olive-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-olive-800 disabled:opacity-60 dark:bg-white dark:text-olive-950 dark:hover:bg-olive-100"
              >
                {status === 'submitting' ? 'Sending…' : 'Send feedback'}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
