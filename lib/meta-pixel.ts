// Meta (Facebook) Pixel helpers.

// Pixel IDs are public (they appear in page source), so a default is safe.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1737190990690900'

type FbqParams = Record<string, string | number | boolean | string[] | undefined>

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
    dataLayer?: Record<string, unknown>[]
  }
}

function newEventId() {
  // Shared with a future Conversions API (server-side) call for deduplication.
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

// Meta event -> GTM dataLayer event name, so GA4 / Google Ads tags in GTM
// can trigger on the same confirmed conversions.
const DATALAYER_EVENTS: Record<string, string> = {
  Lead: 'kb_lead',
  InitiateCheckout: 'kb_begin_checkout',
  Schedule: 'kb_booking_complete',
}

function pushDataLayer(event: string, params: FbqParams, eventID: string) {
  const name = DATALAYER_EVENTS[event]
  if (!name || typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, event_id: eventID, ...params })
}

/** Fire a standard Meta event (Lead, Schedule, InitiateCheckout, ...) and mirror
 *  conversions to the GTM dataLayer. Returns the eventID. */
export function trackMetaEvent(event: string, params: FbqParams = {}): string | undefined {
  if (typeof window === 'undefined') return
  const eventID = newEventId()
  if (META_PIXEL_ID && window.fbq) window.fbq('track', event, params, { eventID })
  pushDataLayer(event, params, eventID)
  return eventID
}

/** Fire a custom (non-standard) Meta event. */
export function trackMetaCustomEvent(event: string, params: FbqParams = {}): string | undefined {
  if (!META_PIXEL_ID || typeof window === 'undefined' || !window.fbq) return
  const eventID = newEventId()
  window.fbq('trackCustom', event, params, { eventID })
  return eventID
}

/** "$297" -> 297 */
export function priceToNumber(price: string): number {
  const n = Number(price.replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}
