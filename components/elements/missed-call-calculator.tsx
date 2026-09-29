'use client'

import { useState } from 'react'

const fmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

// Assumes 1 in 3 missed callers would have booked a job
const CLOSE_RATE = 0.33

export function MissedCallCalculator() {
  const [avgJob, setAvgJob] = useState(500)
  const [missedCalls, setMissedCalls] = useState(3)

  const monthly = Math.round(missedCalls * 30 * avgJob * CLOSE_RATE)
  const yearly = monthly * 12

  return (
    <div className="w-full rounded-2xl border border-olive-950/10 bg-white p-6 shadow-sm sm:p-10 dark:border-white/10 dark:bg-olive-900">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="avg-job"
                className="text-sm/6 font-semibold text-olive-950 dark:text-white"
              >
                What&rsquo;s your average job worth?
              </label>
              <span className="font-display text-2xl/8 text-olive-950 dark:text-white">
                {fmt.format(avgJob)}
              </span>
            </div>
            <input
              id="avg-job"
              type="range"
              min={100}
              max={10000}
              step={50}
              value={avgJob}
              onChange={(e) => setAvgJob(Number(e.target.value))}
              className="mt-3 w-full accent-olive-600"
            />
            <div className="mt-1 flex justify-between text-xs/5 text-olive-500 dark:text-olive-400">
              <span>$100</span>
              <span>$10,000</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="missed-calls"
                className="text-sm/6 font-semibold text-olive-950 dark:text-white"
              >
                How many calls might you miss per day?
              </label>
              <span className="font-display text-2xl/8 text-olive-950 dark:text-white">
                {missedCalls}
              </span>
            </div>
            <input
              id="missed-calls"
              type="range"
              min={0}
              max={20}
              step={1}
              value={missedCalls}
              onChange={(e) => setMissedCalls(Number(e.target.value))}
              className="mt-3 w-full accent-olive-600"
            />
            <div className="mt-1 flex justify-between text-xs/5 text-olive-500 dark:text-olive-400">
              <span>0</span>
              <span>20</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-xl bg-olive-950 p-8 text-center dark:bg-olive-950/50">
          <p className="text-sm/6 font-medium text-olive-300">
            You could be missing out on
          </p>
          <p className="mt-2 font-display text-5xl/12 text-white sm:text-6xl/16">
            {fmt.format(monthly)}
          </p>
          <p className="mt-1 text-sm/6 font-medium text-olive-300">per month</p>
          <div className="mx-auto mt-6 w-16 border-t border-olive-700" />
          <p className="mt-6 font-display text-2xl/8 text-white">
            {fmt.format(yearly)} <span className="text-sm/6 font-medium text-olive-300">per year</span>
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-xs/5 text-olive-500 dark:text-olive-400">
        Estimate assumes 1 in 3 missed callers would have booked a job — and
        85% of missed callers never call back.
      </p>
    </div>
  )
}
