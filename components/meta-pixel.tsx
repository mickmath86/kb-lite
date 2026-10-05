'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { META_PIXEL_ID, trackMetaEvent } from '@/lib/meta-pixel'

/**
 * Loads the Meta Pixel once, fires PageView on every client-side route change
 * (the App Router does not reload the page, so the stock snippet alone would
 * only count the first page), and fires Schedule when an embedded GHL booking
 * calendar reports a completed booking.
 */
export function MetaPixel() {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  // PageView on client-side route changes. The first PageView is fired by
  // the init snippet itself, so skip the initial mount to avoid a double count.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (!META_PIXEL_ID) return
    window.fbq?.('track', 'PageView')
  }, [pathname])

  // GHL calendar iframes post ['msgsndr-booking-complete', {...}] to the parent.
  useEffect(() => {
    if (!META_PIXEL_ID) return
    function onMessage(e: MessageEvent) {
      const data = e.data
      if (Array.isArray(data) && data[0] === 'msgsndr-booking-complete') {
        trackMetaEvent('Schedule', { content_name: 'kickbord-demo-call' })
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  if (!META_PIXEL_ID) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
