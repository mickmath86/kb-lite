'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import posthog from 'posthog-js'
import { Button } from './button'
import { BookingCalendar } from './booking-calendar'

// ── Config ──────────────────────────────────────────────────────────────────
// Contractors at or above this revenue option see the booking calendar.
const MIN_QUALIFIED_REVENUE = '$10k–$25k'
// Where the free guide lives for early-stage contractors.
const RESOURCE_URL = '/resources/review-request-playbook'

const NOT_CONTRACTOR = "I'm not a contractor"

const WORK_TYPES = ['Residential', 'Commercial', 'Both', NOT_CONTRACTOR]
const REVENUE_OPTIONS = ['$0–$10k', '$10k–$25k', '$25k–$100k', '$100k+']

const qualified = (revenue: string) =>
  REVENUE_OPTIONS.indexOf(revenue) >= REVENUE_OPTIONS.indexOf(MIN_QUALIFIED_REVENUE)

type Screen = 'workType' | 'revenue' | 'calendar' | 'resource' | 'notFit' | 'booked'

function bookingDetailsFromMessage(data: unknown): string {
  if (!Array.isArray(data)) return ''
  const payload = data[1]
  if (!payload || typeof payload !== 'object') return ''
  const p = payload as Record<string, unknown>
  for (const key of ['date', 'start_time', 'startTime', 'slot', 'selectedSlot', 'start']) {
    const v = p[key]
    if (typeof v === 'string' && v.trim()) return v.trim()
  }
  return ''
}

export function LeadQualifierModal({
  triggerLabel = 'See how it works',
  triggerClassName,
  triggerAriaLabel,
}: {
  triggerLabel?: string
  triggerClassName?: string
  triggerAriaLabel?: string
}) {
  const [open, setOpen] = useState(false)
  const [screen, setScreen] = useState<Screen>('workType')
  const [bookingDetails, setBookingDetails] = useState('')

  // GHL posts 'msgsndr-booking-complete' to the parent when a booking goes through.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = e.data
      if (Array.isArray(data) && data[0] === 'msgsndr-booking-complete') {
        setBookingDetails(bookingDetailsFromMessage(data))
        setScreen('booked')
        if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
          posthog.capture('lead_qualifier_booking_complete')
        }
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  function answer(step: 'workType' | 'revenue', value: string) {
    if (step === 'workType') {
      setScreen(value === NOT_CONTRACTOR ? 'notFit' : 'revenue')
      return
    }
    setScreen(qualified(value) ? 'calendar' : 'resource')
  }

  function back() {
    setScreen((s) => (s === 'revenue' ? 'workType' : 'revenue'))
  }

  function close() {
    setOpen(false)
    setScreen('workType')
    setBookingDetails('')
  }

  const stepNumber = { workType: 1, revenue: 2, calendar: 3 }[screen as 'workType' | 'revenue' | 'calendar'] ?? 0
  const title: Record<Screen, string> = {
    workType: 'What kind of work do you do?',
    revenue: 'Roughly how much revenue do you do per month?',
    calendar: 'Where should we send your demo details?',
    resource: 'You’re early, and that’s a good time to get the basics right.',
    notFit: 'Kickbord is built for contractors and trade businesses, so we’re probably not the right fit. Thanks for checking us out.',
    booked: 'You’re booked. Check your texts for confirmation.',
  }
  const isCalendar = screen === 'calendar'

  return (
    <>
      <Button
        size="lg"
        className={triggerClassName}
        aria-label={triggerAriaLabel}
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
          <DialogPanel className={`relative w-full rounded-2xl bg-white p-6 shadow-xl sm:p-8 dark:bg-olive-900 ${isCalendar ? 'flex max-h-[90vh] max-w-4xl flex-col overflow-hidden' : 'max-w-lg'}`}>
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 rounded-full p-1.5 text-olive-500 hover:bg-olive-950/10 hover:text-olive-950 dark:text-olive-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="size-5" />
            </button>

            {stepNumber > 0 ? (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs/5 font-medium text-olive-500 dark:text-olive-400">
                  <span>Step {stepNumber} of 3</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-olive-950/10 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-olive-600 transition-all duration-300 dark:bg-olive-300"
                    style={{ width: `${(stepNumber / 3) * 100}%` }}
                  />
                </div>
              </div>
            ) : null}

            <DialogTitle className="font-display text-2xl/8 text-olive-950 dark:text-white">
              {title[screen]}
            </DialogTitle>

            {screen === 'workType' || screen === 'revenue' ? (
              <div className=" flex flex-col gap-3">
                {(screen === 'workType' ? WORK_TYPES : REVENUE_OPTIONS).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => answer(screen, option)}
                    className="w-full rounded-xl border border-olive-950/10 px-5 py-4 text-left text-base/7 font-medium text-olive-950 transition hover:border-olive-600 hover:bg-olive-950/5 dark:border-white/10 dark:text-white dark:hover:border-olive-300 dark:hover:bg-white/5"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : null}

            {screen === 'calendar' ? (
              <div className="mt-6 min-h-0 flex-1 overflow-hidden">
                <BookingCalendar minHeight={480} scrollable />
              </div>
            ) : null}

            {screen === 'resource' ? (
              <div className="mt-6">
                <p className="text-base/7 text-olive-700 dark:text-olive-300">
                  We&rsquo;ll text you a free guide to getting more jobs from Google and missed calls.
                </p>
                <a
                  href={RESOURCE_URL}
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-olive-950 px-4 text-sm/7 font-medium text-white hover:bg-olive-800 dark:bg-olive-300 dark:text-olive-950 dark:hover:bg-olive-200"
                >
                  Get the free guide
                </a>
                <button
                  type="button"
                  onClick={() => setScreen('calendar')}
                  className="mt-4 block w-full text-center text-sm/6 font-medium text-olive-500 hover:text-olive-950 dark:text-olive-400 dark:hover:text-white"
                >
                  Still want to talk? Book a call
                </button>
              </div>
            ) : null}

            {screen === 'notFit' ? (
              <div className="mt-6">
                <Button type="button" size="lg" onClick={close} className="min-h-11 w-full justify-center">
                  Close
                </Button>
              </div>
            ) : null}

            {screen === 'booked' ? (
              <div className="mt-6">
                {bookingDetails ? (
                  <p className="text-base/7 text-olive-700 dark:text-olive-300">{bookingDetails}</p>
                ) : null}
                <Button type="button" size="lg" onClick={close} className="mt-4 min-h-11 w-full justify-center">
                  Done
                </Button>
              </div>
            ) : null}

            {screen !== 'workType' && screen !== 'notFit' && screen !== 'booked' ? (
              <button
                type="button"
                onClick={back}
                className="mt-4 text-sm/6 font-medium text-olive-500 hover:text-olive-950 dark:text-olive-400 dark:hover:text-white"
              >
                &larr; Back
              </button>
            ) : null}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
