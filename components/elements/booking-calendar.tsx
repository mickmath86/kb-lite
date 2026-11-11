'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo, useSyncExternalStore } from 'react'

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
      src={src}
      allow="payment"
      style={{ width: '100%', height: '720px', border: 'none', overflow: 'hidden' }}
      scrolling="no"
      id="PA9BL9KS5PxCkzn4C6f4_1790640186692"
      title="Kickbord Booking Calendar"
    />
  )
}
