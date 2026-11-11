import { createPlacesClient, PlacesError, type PlacesClient } from './places'
import { buildFoundReport, buildNotFoundReport } from './score'
import { fetchSiteHints, type SiteHints } from './site-lookup'
import type { Candidate, GbpReport, PlaceSnapshot } from './types'
import { domainOf, type ValidGbpLead } from './validate'
import { sampleCompetitors, sampleBusiness } from './sample'

export type GenerateResult =
  | { kind: 'report'; report: GbpReport }
  | { kind: 'choose'; candidates: Candidate[] }

const digits = (value: string | null | undefined) => (value ?? '').replace(/\D/g, '').slice(-10)

/** Trade label used to search for competitors when Google has no category. */
const TRADE_QUERY: Record<string, string> = {
  'General contractor': 'general contractor',
  Plumber: 'plumber',
  HVAC: 'HVAC contractor',
  Electrician: 'electrician',
  Roofer: 'roofing contractor',
  'Garage door': 'garage door repair',
  Landscaper: 'landscaper',
  Painter: 'painter',
  'Pest control': 'pest control',
  'Concrete and masonry': 'concrete contractor',
  Flooring: 'flooring contractor',
  Remodeler: 'remodeling contractor',
  Cleaning: 'cleaning service',
  Handyman: 'handyman',
  Other: 'home services',
}

type Deps = {
  places: PlacesClient
  siteHints: (url: string) => Promise<SiteHints | null>
  now?: number
}

export async function findCompetitors(business: PlaceSnapshot, tradeType: string, places: PlacesClient) {
  const what = business.primaryCategory ?? TRADE_QUERY[tradeType] ?? 'home services'
  const where = business.city ? ` in ${business.city}` : ''
  try {
    const results = await places.searchText(`${what}${where}`, {
      near: business.location ?? undefined,
      pageSize: 10,
    })
    return results.filter((p) => p.placeId !== business.placeId).slice(0, 5)
  } catch (error) {
    if (error instanceof PlacesError && error.code !== 'upstream') throw error
    // Competitor data is a bonus; the report still works without it.
    return []
  }
}

async function reportFor(place: PlaceSnapshot, lead: ValidGbpLead, deps: Deps): Promise<GbpReport> {
  const competitors = await findCompetitors(place, lead.tradeType, deps.places)
  return buildFoundReport({ website: lead.website, domain: lead.domain, business: place, competitors, now: deps.now })
}

/**
 * Finds the Google profile for the website, then builds the report.
 * 1. Search Google for the domain and keep a result whose website matches.
 * 2. Otherwise read the homepage for the business name, phone and city, search
 *    again, and match on website or phone.
 * 3. Otherwise offer up to five likely matches, or report that none was found.
 */
export async function generateGbpReport(lead: ValidGbpLead, deps: Deps, placeId?: string): Promise<GenerateResult> {
  if (placeId) {
    const place = await deps.places.details(placeId)
    if (place) return { kind: 'report', report: await reportFor(place, lead, deps) }
    return { kind: 'report', report: buildNotFoundReport({ website: lead.website, now: deps.now }) }
  }

  const seen = new Map<string, Candidate>()
  const consider = async (query: string, phone?: string | null) => {
    const results = await deps.places.searchCandidates(query)
    for (const r of results) if (!seen.has(r.placeId)) seen.set(r.placeId, { placeId: r.placeId, name: r.name, address: r.address })
    return (
      results.find((r) => domainOf(r.websiteUri) === lead.domain) ??
      (phone && digits(phone).length === 10 ? results.find((r) => digits(r.phone) === digits(phone)) : undefined)
    )
  }

  let match = await consider(lead.domain)
  if (!match) {
    const hints = await deps.siteHints(lead.website)
    if (hints?.name) match = await consider([hints.name, hints.city].filter(Boolean).join(' '), hints.phone)
  }

  if (match) {
    const place = await deps.places.details(match.placeId)
    if (place) return { kind: 'report', report: await reportFor(place, lead, deps) }
  }

  const candidates = [...seen.values()].slice(0, 5)
  if (candidates.length > 0) return { kind: 'choose', candidates }
  return { kind: 'report', report: buildNotFoundReport({ website: lead.website, now: deps.now }) }
}

export function liveDeps(apiKey: string | undefined): Deps {
  return { places: createPlacesClient(apiKey), siteHints: (url) => fetchSiteHints(url) }
}

/** Clearly labeled sample report for previews that have no Places key. */
export function sampleReport(lead: ValidGbpLead, now = Date.now()): GbpReport {
  const business = { ...sampleBusiness(now), websiteUri: lead.website }
  const report = buildFoundReport({
    website: lead.website,
    domain: lead.domain,
    business,
    competitors: sampleCompetitors(),
    now,
    sample: true,
  })
  return report
}
