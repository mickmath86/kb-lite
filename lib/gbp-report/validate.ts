import { isTradeType, type TradeType } from '@/lib/review-playbook/trades'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PLACE_ID_PATTERN = /^[A-Za-z0-9_-]{10,300}$/

export type GbpField = 'website' | 'name' | 'email' | 'tradeType'
export type GbpFieldErrors = Partial<Record<GbpField, string>>

export type ValidGbpLead = {
  website: string
  /** Lowercase hostname without "www.", used to match the Google profile. */
  domain: string
  name: string
  email: string
  tradeType: TradeType
}

function stripControls(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, '')
}

/**
 * Accepts "acmeplumbing.com", "www.acmeplumbing.com" or a full URL and returns
 * a normalized https URL plus the bare domain. Rejects IPs, localhost, and
 * hosts without a dot.
 */
export function normalizeWebsite(raw: unknown): { url: string; domain: string } | null {
  if (typeof raw !== 'string') return null
  let value = stripControls(raw).trim()
  if (!value || value.length > 200) return null
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`

  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    return null
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null
  if (parsed.username || parsed.password || parsed.port) return null

  const host = parsed.hostname.toLowerCase().replace(/\.$/, '')
  if (!host.includes('.') || host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) return null
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.includes(':') || host.startsWith('[')) return null
  if (!/^[a-z0-9.-]+$/.test(host)) return null

  const domain = host.replace(/^www\./, '')
  return { url: `https://${host}${parsed.pathname === '/' ? '' : parsed.pathname}`, domain }
}

/** Lowercase host without "www." for any URL Google returns, or null. */
export function domainOf(uri: string | null | undefined): string | null {
  if (!uri) return null
  try {
    return new URL(uri).hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return null
  }
}

export function isPlaceId(value: unknown): value is string {
  return typeof value === 'string' && PLACE_ID_PATTERN.test(value)
}

export function validateGbpLead(input: {
  website: unknown
  name: unknown
  email: unknown
  tradeType: unknown
}): { ok: true; lead: ValidGbpLead } | { ok: false; fieldErrors: GbpFieldErrors } {
  const fieldErrors: GbpFieldErrors = {}

  const site = normalizeWebsite(input.website)
  if (!site) fieldErrors.website = 'Enter your business website, like yourcompany.com.'

  const name = typeof input.name === 'string' ? stripControls(input.name).trim() : ''
  if (name.length < 2 || name.length > 80 || !/\p{L}/u.test(name)) {
    fieldErrors.name = 'Enter your name.'
  }

  const email = typeof input.email === 'string' ? stripControls(input.email).trim() : ''
  if (email.length > 120 || !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = 'Enter a valid email address.'
  }

  const tradeType = typeof input.tradeType === 'string' ? input.tradeType.trim() : ''
  if (!isTradeType(tradeType)) fieldErrors.tradeType = 'Select your trade.'

  if (Object.keys(fieldErrors).length > 0 || !site) return { ok: false, fieldErrors }

  return {
    ok: true,
    lead: { website: site.url, domain: site.domain, name, email, tradeType: tradeType as TradeType },
  }
}
