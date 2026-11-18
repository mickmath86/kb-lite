'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export function FloatingVideo({
  children,
  offset = 480,
}: {
  children: ReactNode
  /** Pixels the video must scroll past the viewport top before docking. */
  offset?: number
}) {
  const markerRef = useRef<HTMLDivElement>(null)
  const [floating, setFloating] = useState(false)

  useEffect(() => {
    let raf = 0
    function check() {
      raf = 0
      const marker = markerRef.current
      if (marker) setFloating(marker.getBoundingClientRect().top < -offset)
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [offset])

  return (
    <>
      {/* Zero-height marker: stays in the flow at the video's original position.
          It never resizes, so the trigger point is stable and can't oscillate. */}
      <div ref={markerRef} className="h-0 w-full" />
      {/* While floating, this placeholder preserves the layout where the video was. */}
      {floating && <div className="aspect-video w-full" aria-hidden="true" />}
      <div
        className={
          floating
            ? 'fixed bottom-4 right-4 z-50 w-64 overflow-hidden rounded-xl shadow-2xl ring-1 ring-olive-950/20 transition-all duration-300 sm:w-96 dark:ring-white/20'
            : 'w-full transition-all duration-300'
        }
      >
        {children}
      </div>
    </>
  )
}
