'use client'

import dynamic from 'next/dynamic'
import { useId, useRef, useState, useSyncExternalStore } from 'react'

import { Button } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { PLAYBOOK_OUTLINE } from '@/lib/review-playbook/outline'
import { TRADE_TYPES } from '@/lib/review-playbook/trades'
import { validateLead, type FieldErrors } from '@/lib/review-playbook/validate'

const PlaybookDocument = dynamic(() => import('./playbook-document'), {
  ssr: false,
  loading: () => <p className="mt-10 text-base text-olive-700 dark:text-olive-300">Opening the playbook…</p>,
})

const STORAGE_KEY = 'kb-review-playbook-access'

const inputClass =
  'w-full rounded-lg border border-olive-950/15 bg-white px-4 py-3 text-base text-olive-950 placeholder:text-olive-500 focus:outline-none focus:ring-2 focus:ring-olive-950/20 aria-invalid:border-red-700 aria-invalid:ring-red-700/20 dark:border-white/10 dark:bg-olive-900 dark:text-white dark:placeholder:text-olive-400 dark:focus:ring-white/20 dark:aria-invalid:border-red-400'

type Access = { demo: boolean }

type ApiSuccess = {
  ok: true
  demo: boolean
  captured: boolean
  sent: boolean
  duplicate: boolean
}

type ApiFailure = {
  ok: false
  error?: string
  fieldErrors?: FieldErrors
}

function readAccess(): Access | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { demo?: unknown }
    if (!parsed || typeof parsed.demo !== 'boolean') return null
    return { demo: parsed.demo }
  } catch {
    return null
  }
}

let accessSnapshot: Access | null | undefined
const accessListeners = new Set<() => void>()

function writeAccess(access: Access) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(access))
  } catch {
    // The playbook still opens in this view if storage is blocked.
  }
  accessSnapshot = access
  accessListeners.forEach((listener) => listener())
}

function subscribeAccess(listener: () => void) {
  accessListeners.add(listener)
  return () => accessListeners.delete(listener)
}

function getAccessSnapshot() {
  if (accessSnapshot === undefined) accessSnapshot = readAccess()
  return accessSnapshot
}

function getServerAccessSnapshot() {
  return null
}

export function PlaybookExperience({ demoMode }: { demoMode: boolean }) {
  const formErrorId = useId()
  const access = useSyncExternalStore(subscribeAccess, getAccessSnapshot, getServerAccessSnapshot)
  const [duplicate, setDuplicate] = useState(false)
  const [name, setName] = useState(demoMode ? 'Alex Rivera' : '')
  const [email, setEmail] = useState(demoMode ? 'alex.rivera@example.com' : '')
  const [tradeType, setTradeType] = useState(demoMode ? 'Plumber' : '')
  const [hp, setHp] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const lock = useRef(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (lock.current) return

    const validated = validateLead({ name, email, tradeType })
    if (!validated.ok) {
      setFieldErrors(validated.fieldErrors)
      setFormError('Check the highlighted fields. Nothing was saved.')
      const firstInvalid = (['name', 'email', 'tradeType'] as const).find((field) => validated.fieldErrors[field])
      if (firstInvalid) document.getElementById(`playbook-${firstInvalid}`)?.focus()
      return
    }

    lock.current = true
    setSubmitting(true)
    setFormError('')
    setFieldErrors({})

    try {
      const response = await fetch('/api/review-playbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: validated.lead.name,
          email: validated.lead.email,
          tradeType: validated.lead.tradeType,
          hp,
          ...(demoMode ? { demo: true } : {}),
        }),
      })

      let data: ApiSuccess | ApiFailure | null = null
      try {
        data = (await response.json()) as ApiSuccess | ApiFailure
      } catch {
        data = null
      }

      if (!response.ok || !data || data.ok !== true || (!data.captured && !data.demo)) {
        const failure = data && data.ok === false ? data : null
        setFieldErrors(failure?.fieldErrors ?? {})
        setFormError(failure?.error || 'We could not submit that. Nothing was saved.')
        return
      }

      setDuplicate(data.duplicate)
      writeAccess({ demo: data.demo })
    } catch {
      setFormError('We could not deliver your request, so it was not saved. Please try again.')
    } finally {
      lock.current = false
      setSubmitting(false)
    }
  }

  const showDemo = demoMode || access?.demo === true

  return (
    <div className="pb-20">
      {showDemo ? (
        <div className="playbook-no-print border-b border-[#7b627d]/40 bg-[#7b627d]/15" data-testid="playbook-demo-banner">
          <Container className="py-3">
            <p className="text-sm/6 font-medium text-olive-950 dark:text-white">
              Demo preview. Sample details are filled in for review. Submitting checks the form and opens the playbook. Nothing is captured or sent.
            </p>
          </Container>
        </div>
      ) : null}

      <Container className="pt-14 sm:pt-20">
        {access ? (
          <div>
              <div
              role="status"
              data-testid="playbook-success"
              className="playbook-no-print mb-10 rounded-2xl border border-olive-950/10 bg-white px-5 py-4 text-base/7 text-olive-800 dark:border-white/10 dark:bg-olive-900 dark:text-olive-100"
            >
              {access.demo
                ? 'Demo preview only. Nothing was captured or sent.'
                : duplicate
                  ? 'This request was already received, so it was not sent again. The playbook is below.'
                  : 'Request received. The playbook is below.'}
            </div>
            <PlaybookDocument />
          </div>
        ) : (
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:gap-x-16">
            <div className="lg:col-start-1 lg:row-start-1">
              <p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">Free playbook</p>
              <h1 className="mt-3 font-display text-5xl/12 tracking-tight text-balance text-olive-950 sm:text-6xl/16 dark:text-white">
                A simple way to ask for reviews after the job is done.
              </h1>
              <p className="mt-5 max-w-xl text-lg/8 text-olive-700 dark:text-olive-300">
                A field guide for home-service contractors. Who owns the ask, when it goes out, the words to use, and when to stop. No star-chasing and no review filtering.
              </p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ['One owner', 'A named person, and a backup, so the ask is not everyone\u2019s job.'],
                  ['Every finished job', 'The same honest ask. Nothing offered in exchange.'],
                  ['Then stop', 'One follow-up at most. A review or a stop reply ends it.'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-olive-950/10 bg-white/70 px-4 py-4 dark:border-white/10 dark:bg-olive-900/60">
                    <dt className="font-display text-2xl text-olive-950 dark:text-white">{title}</dt>
                    <dd className="mt-2 text-sm/6 text-olive-700 dark:text-olive-300">{body}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <form
                id="get-playbook"
                noValidate
                onSubmit={onSubmit}
                data-testid="playbook-form"
                aria-describedby={formError ? formErrorId : undefined}
                className="relative rounded-3xl border border-olive-950/10 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-olive-900"
              >
                <h2 className="font-display text-3xl tracking-tight text-olive-950 dark:text-white">Get the playbook</h2>
                <p className="mt-2 text-sm/6 text-olive-600 dark:text-olive-300">
                  {demoMode
                    ? 'These sample values are for the preview. Change them if you want. They are not saved.'
                    : 'Name, email, and trade. Then the full guide opens on this page.'}
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="playbook-name" className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                      Name <span className="font-medium text-olive-500">(required)</span>
                    </label>
                    <input
                      id="playbook-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      aria-invalid={fieldErrors.name ? true : undefined}
                      aria-describedby={fieldErrors.name ? 'playbook-name-error' : undefined}
                      className={inputClass}
                    />
                    {fieldErrors.name ? (
                      <p id="playbook-name-error" className="mt-1.5 text-sm text-red-700 dark:text-red-400">
                        {fieldErrors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="playbook-email" className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                      Email <span className="font-medium text-olive-500">(required)</span>
                    </label>
                    <input
                      id="playbook-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      aria-invalid={fieldErrors.email ? true : undefined}
                      aria-describedby={fieldErrors.email ? 'playbook-email-error' : undefined}
                      className={inputClass}
                    />
                    {fieldErrors.email ? (
                      <p id="playbook-email-error" className="mt-1.5 text-sm text-red-700 dark:text-red-400">
                        {fieldErrors.email}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="playbook-tradeType" className="mb-2 block text-sm font-semibold text-olive-950 dark:text-white">
                      Trade <span className="font-medium text-olive-500">(required)</span>
                    </label>
                    <select
                      id="playbook-tradeType"
                      name="tradeType"
                      required
                      value={tradeType}
                      onChange={(event) => setTradeType(event.target.value)}
                      aria-invalid={fieldErrors.tradeType ? true : undefined}
                      aria-describedby={fieldErrors.tradeType ? 'playbook-trade-error' : undefined}
                      className={inputClass}
                    >
                      <option value="">Select a trade</option>
                      {TRADE_TYPES.map((trade) => (
                        <option key={trade} value={trade}>
                          {trade}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.tradeType ? (
                      <p id="playbook-trade-error" className="mt-1.5 text-sm text-red-700 dark:text-red-400">
                        {fieldErrors.tradeType}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="playbook-hp">Company website</label>
                  <input
                    id="playbook-hp"
                    name="hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={hp}
                    onChange={(event) => setHp(event.target.value)}
                  />
                </div>

                {formError ? (
                  <p id={formErrorId} role="alert" data-testid="playbook-error" className="mt-5 text-sm/6 text-red-700 dark:text-red-400">
                    {formError}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  className="mt-6 min-h-11 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? 'Sending…' : 'Read the playbook'}
                </Button>

                <p className="mt-4 text-sm/6 text-olive-600 dark:text-olive-400">
                  {demoMode ? (
                    <>
                      This preview does not send your name, email, or trade anywhere. The live form is covered by the{' '}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-olive-950 underline underline-offset-4 dark:text-white"
                      >
                        Privacy Policy
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      Your name, email, and trade are sent to Kickbord so we can follow up about this playbook. This form does not add a separate marketing opt-in.{' '}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-olive-950 underline underline-offset-4 dark:text-white"
                      >
                        Privacy Policy
                      </a>
                      .
                    </>
                  )}
                </p>
              </form>
            </div>

            <div className="lg:col-start-1 lg:row-start-2">
              <h2 className="font-display text-3xl tracking-tight text-olive-950 dark:text-white">What is inside</h2>
              <ol className="mt-5 space-y-4">
                {PLAYBOOK_OUTLINE.map((section, index) => (
                  <li key={section.id} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                    <span className="font-display text-xl text-[#596352] dark:text-olive-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="block font-medium text-olive-950 dark:text-white">{section.title}</span>
                      <span className="mt-1 block text-sm/6 text-olive-600 dark:text-olive-400">{section.blurb}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
