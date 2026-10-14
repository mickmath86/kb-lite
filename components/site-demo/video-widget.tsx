'use client'

import { useState } from 'react'
import Script from 'next/script'
import { ButtonLink } from '@/components/elements/button'
import { MinusIcon } from '@/components/icons/minus-icon'
import { PlusIcon } from '@/components/icons/plus-icon'

const RESCHEDULE_CALL_URL = 'https://calendar.kickbord.com/widget/bookings/demo-call-mark-mike'
const WISTIA_MEDIA_ID = '65v6h1zxns'

const wistiaFallbackStyles = `
  wistia-player[media-id='${WISTIA_MEDIA_ID}']:not(:defined) {
    background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${WISTIA_MEDIA_ID}/swatch');
    display: block;
    filter: blur(5px);
    padding-top: 177.78%;
  }
`

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
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />
      <style dangerouslySetInnerHTML={{ __html: wistiaFallbackStyles }} />

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
        <wistia-player media-id={WISTIA_MEDIA_ID} aspect="0.5625" className="h-full w-full" />
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
