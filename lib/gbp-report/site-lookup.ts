import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'

/**
 * Reads a small amount of the visitor's homepage to learn the business name,
 * phone and city, so we can find the matching Google profile. Only the parsed
 * hints are used; the page itself is never returned to the browser.
 */

export type SiteHints = {
  name: string | null
  phone: string | null
  city: string | null
}

const MAX_BYTES = 400_000
const MAX_REDIRECTS = 3

function isPrivateAddress(address: string): boolean {
  if (isIP(address) === 6) {
    const a = address.toLowerCase()
    if (a === '::1' || a === '::' || a.startsWith('fc') || a.startsWith('fd') || a.startsWith('fe80')) return true
    const mapped = a.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
    return mapped ? isPrivateAddress(mapped[1]) : false
  }
  const [a, b] = address.split('.').map(Number)
  return (
    a === 10 ||
    a === 127 ||
    a === 0 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127) ||
    a >= 224
  )
}

async function isPublicHost(hostname: string) {
  if (isIP(hostname)) return false
  try {
    const records = await lookup(hostname, { all: true, verbatim: true })
    return records.length > 0 && records.every((r) => !isPrivateAddress(r.address))
  } catch {
    return false
  }
}

async function readCapped(response: Response) {
  const reader = response.body?.getReader()
  if (!reader) return ''
  const chunks: Uint8Array[] = []
  let total = 0
  while (total < MAX_BYTES) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    total += value.byteLength
  }
  await reader.cancel().catch(() => undefined)
  return new TextDecoder('utf-8', { fatal: false }).decode(Buffer.concat(chunks.map((c) => Buffer.from(c))))
}

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ')
    .trim()
}

/** "Acme Plumbing | Ventura Plumber" -> "Acme Plumbing" */
function cleanTitle(title: string) {
  const first = title.split(/\s[|\u2013\u2014-]\s|\s::\s/)[0]
  return first.replace(/^(home|welcome)( to)?\s*[:-]?\s*/i, '').trim()
}

type JsonLdNode = Record<string, unknown>

function flattenJsonLd(value: unknown, out: JsonLdNode[] = []): JsonLdNode[] {
  if (Array.isArray(value)) value.forEach((v) => flattenJsonLd(v, out))
  else if (value && typeof value === 'object') {
    const node = value as JsonLdNode
    out.push(node)
    if (node['@graph']) flattenJsonLd(node['@graph'], out)
  }
  return out
}

export function parseSiteHints(html: string): SiteHints {
  const hints: SiteHints = { name: null, phone: null, city: null }

  for (const match of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      for (const node of flattenJsonLd(JSON.parse(match[1]))) {
        const type = ([] as unknown[]).concat(node['@type'] ?? []).map(String)
        const isBusiness = type.some((t) => /LocalBusiness|Organization|Plumber|Electrician|HVAC|Contractor|Roofing|Service|Store/i.test(t))
        if (!isBusiness) continue
        if (!hints.name && typeof node.name === 'string') hints.name = decodeEntities(node.name)
        if (!hints.phone && typeof node.telephone === 'string') hints.phone = node.telephone
        const address = node.address as JsonLdNode | undefined
        if (!hints.city && address && typeof address.addressLocality === 'string') hints.city = address.addressLocality
      }
    } catch {
      // Ignore malformed JSON-LD.
    }
  }

  if (!hints.name) {
    const og = html.match(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i)
      ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:site_name["']/i)
    if (og) hints.name = decodeEntities(og[1])
  }
  if (!hints.name) {
    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
    if (title) hints.name = cleanTitle(decodeEntities(title[1])) || null
  }
  if (!hints.phone) {
    const tel = html.match(/href=["']tel:([+\d().\s-]{7,20})["']/i)
    if (tel) hints.phone = tel[1].trim()
  }
  if (hints.name && hints.name.length > 80) hints.name = hints.name.slice(0, 80)
  return hints
}

export async function fetchSiteHints(url: string, fetchImpl: typeof fetch = fetch): Promise<SiteHints | null> {
  let current = url
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    let parsed: URL
    try {
      parsed = new URL(current)
    } catch {
      return null
    }
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null
    if (parsed.port && parsed.port !== '80' && parsed.port !== '443') return null
    if (!(await isPublicHost(parsed.hostname))) return null

    let response: Response
    try {
      response = await fetchImpl(parsed.toString(), {
        method: 'GET',
        redirect: 'manual',
        cache: 'no-store',
        headers: { 'User-Agent': 'KickbordProfileReport/1.0 (+https://kickbord.com)', Accept: 'text/html' },
        signal: AbortSignal.timeout(6000),
      })
    } catch {
      return null
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location')
      await response.body?.cancel().catch(() => undefined)
      if (!location) return null
      current = new URL(location, parsed).toString()
      continue
    }
    if (!response.ok || !(response.headers.get('content-type') ?? '').includes('html')) {
      await response.body?.cancel().catch(() => undefined)
      return null
    }
    return parseSiteHints(await readCapped(response))
  }
  return null
}
