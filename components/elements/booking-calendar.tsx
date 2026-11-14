'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'

const TRACKING_KEYS = ['fbclid', 'gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

const subscribe = () => () => {}
const getLeadJson = () => sessionStorage.getItem('kb_lead') ?? ''
const getServerSnapshot = () => null

// Renders the HighLevel booking calendar with the lead's contact details
// prefilled. Contact data comes from sessionStorage (set by the lead-qualifier
// modal) so it never appears in the page URL; tracking params come from the URL.
export function BookingCalendar() {
  const searchParams = useSearchParams()
  const leadJson = useSyncExternalStore(subscribe, getLeadJson, getServerSnapshot)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(1100)

  // GHL's embed script resizes the iframe via 'highlevel.setHeight' postMessages,
  // but it only discovers iframes that exist when it loads. Since this iframe
  // mounts afterward, listen for the height messages and apply them ourselves.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = e.data
      if (!data) return
      let h: number | undefined
      if (Array.isArray(data) && data[0] === 'highlevel.setHeight') {
        const payload = data[1]
        if (typeof payload === 'number') h = payload
        else if (payload && typeof payload === 'object' && typeof payload.height === 'number') h = payload.height
      } else if (typeof data === 'object' && typeof data.height === 'number' && e.source === iframeRef.current?.contentWindow) {
        h = data.height
      }
      if (h && h > 100) setHeight(Math.ceil(h))
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const src = useMemo(() => {
    let lead: Record<string, string> = {}
    try {
      if (leadJson) lead = JSON.parse(leadJson) as Record<string, string>
    } catch {}
    const url = new URL('https://calendar.kickbord.com/widget/booking/joLrz73XMe6vKuIOrKfL')
    const name = lead.name?.trim()
    if (name) {
      const [firstName, ...lastName] = name.split(/\s+/)
      url.searchParams.set('name', name)
      url.searchParams.set('first_name', firstName)
      if (lastName.length) url.searchParams.set('last_name', lastName.join(' '))
    }
    if (lead.email?.trim()) url.searchParams.set('email', lead.email.trim())
    if (lead.phone?.trim()) url.searchParams.set('phone', lead.phone.trim())
    if (lead.company?.trim()) url.searchParams.set('company_name', lead.company.trim())
    for (const key of TRACKING_KEYS) {
      const v = searchParams?.get(key)?.trim()
      if (v) url.searchParams.set(key, v)
    }
    return url.toString()
  }, [leadJson, searchParams])

  if (leadJson === null) {
    return <div style={{ height: '720px' }} aria-hidden="true" />
  }

  return (
    <iframe
      ref={iframeRef}
      src={src}
      allow="payment"
      className="block w-full"
      style={{ height: `${height}px`, minHeight: '1600px', border: 'none', overflow: 'hidden' }}
      scrolling="no"
      id="PA9BL9KS5PxCkzn4C6f4_1790640186692"
      title="Kickbord Booking Calendar"
    />
  )
}
