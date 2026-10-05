'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const GOOGLE_REVIEW_URL = '#'

function Star({ filled, onClick, onMouseEnter, label }: { filled: boolean; onClick: () => void; onMouseEnter: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-500/50 rounded"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${filled ? 'text-yellow-500' : 'text-olive-300 dark:text-olive-600'}`}
      >
        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
      </svg>
    </button>
  )
}

export default function FiveStarDemoPage() {
  const [hoverRating, setHoverRating] = useState(0)

  function handleRate(rating: number) {
    if (rating >= 4) {
      window.location.href = GOOGLE_REVIEW_URL
    } else {
      window.location.href = '/5-star-demo/feedback'
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="mb-10 inline-block">
          <Image
            src="/logos/kb-icon-blk.png"
            alt="Kickbord"
            width={160}
            height={120}
            className="mx-auto h-auto w-40 dark:hidden"
            priority
          />
          <Image
            src="/logos/kb-icon-white.png"
            alt="Kickbord"
            width={160}
            height={120}
            className="mx-auto hidden h-auto w-40 dark:block"
            priority
          />
        </Link>

        <h1 className="font-display text-3xl tracking-tight text-olive-950 sm:text-4xl dark:text-white">
          How did we do?
        </h1>
        <p className="mt-3 text-base text-olive-600 dark:text-olive-400">
          We&apos;d love your feedback. Tap a star to get started.
        </p>

        <div
          className="mt-10 flex justify-center gap-1"
          onMouseLeave={() => setHoverRating(0)}
          role="group"
          aria-label="Rate your experience"
        >
          {[1, 2, 3, 4, 5].map((rating) => (
            <Star
              key={rating}
              label={`${rating} star${rating === 1 ? '' : 's'}`}
              filled={hoverRating > 0 ? rating <= hoverRating : false}
              onMouseEnter={() => setHoverRating(rating)}
              onClick={() => handleRate(rating)}
            />
          ))}
        </div>

        <p className="mt-10 text-sm text-olive-500 dark:text-olive-500">
          Your feedback helps us improve.
        </p>
      </div>
    </main>
  )
}
