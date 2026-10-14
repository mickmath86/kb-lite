'use client'

import { useState } from 'react'
import { ButtonLink } from '@/components/elements/button'
import { MinusIcon } from '@/components/icons/minus-icon'
import { PlusIcon } from '@/components/icons/plus-icon'

const RESCHEDULE_CALL_URL = 'https://calendar.kickbord.com/widget/bookings/demo-call-mark-mike'
const YOUTUBE_SHORT_ID = 'YmvtK_RTH3U'

export function VideoWidget() {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-olive-300 px-4 py-2 text-sm/7 font-medium text-olive-950 shadow-2xl hover:bg-white"
      >
        <PlusIcon className="size-4" />
        Watch intro
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-40 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl sm:w-48 md:w-56">
      <div className="flex items-center justify-end px-2 py-1.5">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-full bg-white/10 p-1 text-white hover:bg-white/20"
          aria-label="Minimize video"
        >
          <MinusIcon className="size-3" />
        </button>
      </div>

      <div className="aspect-9/16 w-full">
        <iframe
          src={`https://www.youtube.com/embed/${YOUTUBE_SHORT_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_SHORT_ID}&playsinline=1&controls=0&modestbranding=0&iv_load_policy=3&rel=0&fs=0&disablekb=1`}
          title="Reschedule call video"
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="p-2">
        <ButtonLink
          href={RESCHEDULE_CALL_URL}
          size="md"
          color="light"
          className="w-full justify-center"
        >
          Reschedule call
        </ButtonLink>
      </div>
    </div>
  )
}
