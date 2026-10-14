'use client'

import { useRef, useState } from 'react'
import { ButtonLink } from '@/components/elements/button'
import { MinusIcon } from '@/components/icons/minus-icon'
import { PlusIcon } from '@/components/icons/plus-icon'

const RESCHEDULE_CALL_URL = 'https://calendar.kickbord.com/widget/bookings/demo-call-mark-mike'

export function VideoWidget() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  const updateOpen = (next: boolean) => {
    setIsOpen(next)
    if (videoRef.current) {
      if (next) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => updateOpen(true)}
        className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-olive-300 px-4 py-2 text-sm/7 font-medium text-olive-950 shadow-2xl hover:bg-white"
      >
        <PlusIcon className="size-4" />
        Watch intro
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-40 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl sm:w-48 md:w-56">
      <div className="flex items-center justify-between px-2 py-1.5">
        <span className="text-xs font-medium text-white/80">Intro</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleMute}
            className="rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-white hover:bg-white/20"
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
          <button
            type="button"
            onClick={() => updateOpen(false)}
            className="rounded-full bg-white/10 p-1 text-white hover:bg-white/20"
            aria-label="Minimize video"
          >
            <MinusIcon className="size-3" />
          </button>
        </div>
      </div>

      <div className="aspect-9/16 w-full">
        <video
          ref={videoRef}
          src="/videos/reschedule-vid.mp4"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="h-full w-full object-cover"
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
