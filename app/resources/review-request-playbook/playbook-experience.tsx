'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/elements/button'
import {
  FIELD_SUMMARY,
  isPlaybookDocument,
  TRADES,
  validateSubmission,
  type FieldName,
  type PlaybookDocument,
} from '@/lib/review-playbook/schema'
import { PlaybookView } from './playbook-view'

const TOPICS = [
  'Name an owner and a backup',
  'Ask after every completed job, not only the easy ones',
  'Send the direct Google review link for the right location',
  'Use a short text and a short email',
  'Send one follow-up, then stop',
  'Treat a complaint as its own conversation',
  'Put the habit on this week’s jobs',
  'Count what you can see on your own work',
  'Skip rewards, fake reviews, and rating promises',
]

const PRINCIPLES = [
  { rule: 'One owner', text: 'A named person sends the ask. A backup covers days off.', accent: 'border-[#596352]' },
  { rule: 'One link', text: 'Customers get your Google review box, not a search for your name.', accent: 'border-[#3e5560]' },
  { rule: 'One follow-up', text: 'A single reminder when it is still courteous. Then you stop.', accent: 'border-[#7b627d]' },
]

type Status = 'idle' | 'submitting' | 'error'

export function PlaybookExperience() {
  const [playbook, setPlaybook] = useState<PlaybookDocument | null>(null)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (!playbook) return
    const heading = document.getElementById('playbook-title')
    heading?.focus()
    heading?.scrollIntoView({ block: 'start' })
  }, [playbook])

  if (playbook) return <PlaybookView playbook={playbook} preview={preview} />
  return (
    <Landing
      onUnlock={(document, isPreview) => {
        setPreview(isPreview)
        setPlaybook(document)
      }}
    />
  )
}

function Landing({ onUnlock }: { onUnlock: (playbook: PlaybookDocument, preview: boolean) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [trade, setTrade] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [fields, setFields] = useState<Partial<Record<FieldName, string>>>({})
  const sending = useRef(false)
  const described = {
    name: fields.name ? 'playbook-name-error' : undefined,
    email: fields.email ? 'playbook-email-error' : undefined,
    trade: fields.trade ? 'playbook-trade-error' : undefined,
  }

  function focusField(id: string) {
    requestAnimationFrame(() => {
      document.getElementById(id)?.focus()
    })
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending.current) return

    const validated = validateSubmission({ name, email, trade })
    if (!validated.ok) {
      setFields(validated.fields)
      setError(FIELD_SUMMARY)
      setStatus('error')
      const first = (['name', 'email', 'trade'] as const).find((field) => validated.fields[field])
      if (first) focusField(first)
      return
    }

    sending.current = true
    setFields({})
    setError('')
    setStatus('submitting')

    try {
      const response = await fetch('/api/review-playbook', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: validated.value.name,
          email: validated.value.email,
          trade: validated.value.trade,
        }),
      })
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean
        error?: unknown
        fields?: Partial<Record<FieldName, string>>
        playbook?: unknown
        preview?: boolean
      } | null

      if (!response.ok || !payload || payload.ok !== true || !isPlaybookDocument(payload.playbook)) {
        const nextFields = payload?.fields && typeof payload.fields === 'object' ? payload.fields : {}
        setFields(nextFields)
        setError(
          typeof payload?.error === 'string'
            ? payload.error
            : 'We did not get an acceptance back, so the playbook stays locked. You can try again.',
        )
        setStatus('error')
        const first = (['name', 'email', 'trade'] as const).find((field) => nextFields[field])
        focusField(first ?? 'playbook-form-error')
        return
      }

      onUnlock(payload.playbook, payload.preview === true)
    } catch {
      setError('We could not reach Kickbord to send this. The playbook stays locked. Check your connection and try again.')
      setStatus('error')
      focusField('playbook-form-error')
    } finally {
      sending.current = false
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      <a href="#request" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2">
        Skip to the request form
      </a>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#5c445e]">Review request playbook</p>
      <h1 className="playbook-serif mt-4 max-w-4xl text-5xl leading-[0.95] tracking-tight text-[#0c0c09] sm:text-7xl">
        Ask after the job.
        <span className="mt-2 block italic text-[#3d4a38]">Ask everyone the same way.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg/8 text-[#24241f]">
        A field guide for home-service contractors. Who sends the Google review ask, when it goes out, the words to use, and what to do when the job was not right. It opens on this page after the form is accepted.
      </p>
      <div className="mt-8 h-px w-24 bg-[#596352]" />
      <ul className="mt-8 grid gap-6 sm:grid-cols-3">
        {PRINCIPLES.map((item) => (
          <li key={item.rule} className={`border-t-2 pt-3 ${item.accent}`}>
            <p className="playbook-serif text-3xl text-[#0c0c09]">{item.rule}</p>
            <p className="mt-2 text-sm/6 text-[#24241f]">{item.text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-14 grid items-start gap-12 lg:grid-cols-12">
        <section className="order-2 lg:order-1 lg:col-span-7">
          <h2 className="playbook-serif text-4xl tracking-tight text-[#0c0c09]">What you will be able to use</h2>
          <p className="mt-4 max-w-xl text-base/7 text-[#24241f]">
            The page after the form is the guide itself: the rollout, the messages, and the judgment calls. This list is only the map.
          </p>
          <ol className="mt-6 space-y-3">
            {TOPICS.map((topic, index) => (
              <li key={topic} className="flex gap-4 border-b border-[#0c0c09]/10 pb-3 text-base/7 text-[#24241f]">
                <span className="playbook-serif w-8 shrink-0 text-[#5c445e]">{String(index + 1).padStart(2, '0')}</span>
                <span>{topic}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-xl text-sm/6 text-[#3a3a34]">
            You will not find a script that asks only happy customers, a reward for stars, or a promise about your rating.
          </p>
        </section>

        <section id="request" className="order-1 scroll-mt-8 border border-[#0c0c09]/12 bg-white p-6 sm:p-8 lg:order-2 lg:col-span-5 lg:sticky lg:top-8">
          <h2 className="playbook-serif text-3xl tracking-tight text-[#0c0c09]">Open the playbook</h2>
          <p className="mt-3 text-sm/6 text-[#24241f]">
            Name, email, and trade tell us who requested it and which trades are using it. How Kickbord handles information you send is in our{' '}
            <a href="/privacy" className="underline decoration-[#596352] underline-offset-4">
              privacy policy
            </a>
            . This form does not add a separate mailing-list signup, and there is nothing to pay.
          </p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate aria-busy={status === 'submitting'}>
            <div className="sr-only" aria-live="polite">
              {status === 'submitting' ? 'Sending your request.' : ''}
            </div>
            {status === 'error' && error ? (
              <p id="playbook-form-error" role="alert" tabIndex={-1} className="text-sm/6 text-[#6e2c2c]">
                {error}
              </p>
            ) : null}
            <Field
              id="name"
              label="Name"
              error={fields.name}
              errorId={described.name}
            >
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                autoCapitalize="words"
                required
                aria-required="true"
                aria-invalid={fields.name ? true : undefined}
                aria-describedby={described.name}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Jordan Lee"
                className={inputClass(Boolean(fields.name))}
              />
            </Field>
            <Field id="email" label="Email" error={fields.email} errorId={described.email}>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                required
                aria-required="true"
                aria-invalid={fields.email ? true : undefined}
                aria-describedby={described.email}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="jordan@example.com"
                className={inputClass(Boolean(fields.email))}
              />
            </Field>
            <Field id="trade" label="Trade" error={fields.trade} errorId={described.trade}>
              <select
                id="trade"
                name="trade"
                required
                aria-required="true"
                aria-invalid={fields.trade ? true : undefined}
                aria-describedby={described.trade}
                value={trade}
                onChange={(event) => setTrade(event.target.value)}
                className={inputClass(Boolean(fields.trade))}
              >
                <option value="">Select your trade</option>
                {TRADES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Button type="submit" size="lg" className="w-full disabled:cursor-wait disabled:opacity-60" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : status === 'error' ? 'Try again' : 'Open the playbook'}
            </Button>
          </form>
          <noscript>
            <p className="mt-4 text-sm/6 text-[#24241f]">This form needs JavaScript so the playbook opens only after the request is accepted.</p>
          </noscript>
        </section>
      </div>
    </div>
  )
}

function inputClass(invalid: boolean) {
  return [
    'w-full border bg-white px-3 py-3 text-base text-[#0c0c09] placeholder:text-[#5c5c56]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d4a38]',
    invalid ? 'border-[#6e2c2c]' : 'border-[#0c0c09]/20',
  ].join(' ')
}

function Field({
  id,
  label,
  error,
  errorId,
  children,
}: {
  id: string
  label: string
  error?: string
  errorId?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#0c0c09]">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && errorId ? (
        <p id={errorId} className="mt-1.5 text-sm text-[#6e2c2c]">
          {error}
        </p>
      ) : null}
    </div>
  )
}
