// Meta (Facebook) Pixel helpers.
// The pixel ID comes from NEXT_PUBLIC_META_PIXEL_ID. If it is not set, every
// helper is a no-op, so local dev and preview builds stay clean.

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''

type FbqParams = Record<string, string | number | boolean | string[] | undefined>

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

function newEventId() {
  // Shared with a future Conversions API (server-side) call for deduplication.
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/** Fire a standard Meta event (Lead, Schedule, InitiateCheckout, ...). Returns the eventID. */
export function trackMetaEvent(event: string, params: FbqParams = {}): string | undefined {
  if (!META_PIXEL_ID || typeof window === 'undefined' || !window.fbq) return
  const eventID = newEventId()
  window.fbq('track', event, params, { eventID })
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
