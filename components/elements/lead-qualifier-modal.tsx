'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import posthog from 'posthog-js'
import { Button } from './button'

type Step =
  | { key: string; question: string; type: 'options'; options: string[] }
  | { key: string; question: string; type: 'input'; inputType: string; placeholder: string; validate: (v: string) => boolean }

const NOT_CONTRACTOR = "I'm not a contractor"

const STEPS: Step[] = [
  {
    key: 'workType',
    question: 'What kind of contracting work do you do?',
    type: 'options',
    options: ['Residential', 'Commercial', 'Both', NOT_CONTRACTOR],
  },
  {
    key: 'mainIssue',
    question: 'What best describes where you are right now?',
    type: 'options',
    options: [
      'Slow — I need jobs',
      'Okay, but not consistent',
      'Busy / booked solid',
      'Just starting my business',
    ],
  },
  {
    key: 'timeline',
    question: 'When are you looking to fix this?',
    type: 'options',
    options: [
      'ASAP',
      'In the next month or so',
      'Later this year',
      "Just seeing what's out there",
    ],
  },
  {
    key: 'revenue',
    question: "What's your current monthly revenue?",
    type: 'options',
    options: ['$0–$10k', '$10k–$25k', '$25k–$100k', '$100k+'],
  },
  {
    key: 'phone',
    question: "What's your mobile number?",
    type: 'input',
    inputType: 'tel',
    placeholder: '(555) 555-5555',
    validate: (v) => v.replace(/\D/g, '').length >= 10,
  },
  {
    key: 'email',
    question: "What's your email?",
    type: 'input',
    inputType: 'email',
    placeholder: 'you@company.com',
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  },
  {
    key: 'name',
    question: "What's your full name?",
    type: 'input',
    inputType: 'text',
    placeholder: 'First and last name',
    validate: (v) => v.trim().length > 1,
  },
  {
    key: 'company',
    question: "What's your company name?",
    type: 'input',
    inputType: 'text',
    placeholder: 'Company name',
    validate: (v) => v.trim().length > 1,
  },
]

export function LeadQualifierModal({
  triggerLabel = 'See how it works',
  triggerClassName,
}: {
  triggerLabel?: string
  triggerClassName?: string
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const isContractor = answers.workType !== NOT_CONTRACTOR
  const activeSteps = isContractor ? STEPS : STEPS.filter((_, i) => i === 0 || i >= 4)
  const step = activeSteps[stepIndex]
  const isLast = stepIndex === activeSteps.length - 1

  async function advance(value: string) {
    const next = { ...answers, [step.key]: value }
    setAnswers(next)
    setInputValue('')
    setError(false)
    setSubmitError('')
    if (isLast) {
      setSubmitting(true)

      try {
        const response = await fetch('/api/lead-qualifier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(next),
        })

        if (!response.ok) {
          throw new Error('Submission failed')
        }

        if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
          posthog.capture('lead_qualifier_submitted')
        }
        setOpen(false)
        setStepIndex(0)
        setAnswers({})
        const params = new URLSearchParams(next)
        router.push(`/lp/booking?${params.toString()}`)
      } catch {
        setSubmitError('We could not submit your information. Please try again.')
      } finally {
        setSubmitting(false)
      }
      return
    }
    setStepIndex(stepIndex + 1)
  }

  function back() {
    setInputValue('')
    setError(false)
    setStepIndex(Math.max(0, stepIndex - 1))
  }

  function close() {
    setOpen(false)
    setStepIndex(0)
    setAnswers({})
    setInputValue('')
    setError(false)
    setSubmitError('')
    setSubmitting(false)
  }

  const inputStep = step.type === 'input' ? step : null

  return (
    <>
      <Button
        size="lg"
        className={triggerClassName}
        onClick={() => {
          if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
            posthog.capture('lead_qualifier_started')
          }
          setOpen(true)
        }}
      >
        {triggerLabel}
      </Button>

      <Dialog open={open} onClose={close} className="relative z-50">
        <div className="fixed inset-0 bg-olive-950/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl dark:bg-olive-900">
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 rounded-full p-1.5 text-olive-500 hover:bg-olive-950/10 hover:text-olive-950 dark:text-olive-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="size-5" />
            </button>

            <div className="mb-6">
              <div className="flex items-center justify-between text-xs/5 font-medium text-olive-500 dark:text-olive-400">
                <span>
                  Step {stepIndex + 1} of {activeSteps.length}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-olive-950/10 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-olive-600 transition-all duration-300 dark:bg-olive-300"
                  style={{ width: `${((stepIndex + 1) / activeSteps.length) * 100}%` }}
                />
              </div>
            </div>

            <DialogTitle className="font-display text-2xl/8 text-olive-950 dark:text-white">
              {step.question}
            </DialogTitle>

            {step.type === 'options' ? (
              <div className="mt-6 flex flex-col gap-3">
                {step.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => advance(option)}
                    className="w-full rounded-xl border border-olive-950/10 px-5 py-4 text-left text-base/7 font-medium text-olive-950 transition hover:border-olive-600 hover:bg-olive-950/5 dark:border-white/10 dark:text-white dark:hover:border-olive-300 dark:hover:bg-white/5"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <form
                className="mt-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (inputStep?.validate(inputValue)) {
                    advance(inputValue.trim())
                  } else {
                    setError(true)
                  }
                }}
              >
                <input
                  type={inputStep?.inputType}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    setError(false)
                  }}
                  placeholder={inputStep?.placeholder}
                  autoFocus
                  className="w-full rounded-xl border border-olive-950/10 bg-transparent px-5 py-4 text-base/7 text-olive-950 outline-none placeholder:text-olive-400 focus:border-olive-600 dark:border-white/10 dark:text-white dark:focus:border-olive-300"
                />
                {error && (
                  <p className="mt-2 text-sm/6 text-red-600 dark:text-red-400">
                    Please enter a valid {step.key}.
                  </p>
                )}
                {submitError && (
                  <p className="mt-2 text-sm/6 text-red-600 dark:text-red-400">
                    {submitError}
                  </p>
                )}
                <Button type="submit" size="lg" className="mt-4 w-full" disabled={submitting}>
                  {submitting ? 'Submitting…' : isLast ? 'Yes, I want more jobs' : 'Continue'}
                </Button>
              </form>
            )}

            {stepIndex > 0 && (
              <button
                type="button"
                onClick={back}
                className="mt-4 text-sm/6 font-medium text-olive-500 hover:text-olive-950 dark:text-olive-400 dark:hover:text-white"
              >
                &larr; Back
              </button>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
