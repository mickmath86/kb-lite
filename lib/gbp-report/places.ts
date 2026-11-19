import type { Candidate, PlaceSnapshot } from './types'

/**
 * Minimal Google Places API (New) client.
 * Docs: https://developers.google.com/maps/documentation/places/web-service/text-search
 *       https://developers.google.com/maps/documentation/places/web-service/place-details
 */

const BASE = 'https://places.googleapis.com/v1'

const PLACE_FIELDS = [
  'id',
  'displayName',
  'formattedAddress',
  'addressComponents',
  'location',
  'rating',
  'userRatingCount',
  'reviews',
  'photos',
  'types',
  'primaryType',
  'primaryTypeDisplayName',
  'regularOpeningHours',
  'websiteUri',
  'nationalPhoneNumber',
  'businessStatus',
  'googleMapsUri',
]

const DETAILS_MASK = PLACE_FIELDS.join(',')
const SEARCH_MASK = PLACE_FIELDS.filter((f) => f !== 'reviews' && f !== 'addressComponents')
  .map((f) => `places.${f}`)
  .join(',')
const CANDIDATE_MASK = 'places.id,places.displayName,places.formattedAddress,places.websiteUri,places.nationalPhoneNumber'

const GENERIC_TYPES = new Set([
  'point_of_interest',
  'establishment',
  'store',
  'service',
  'premise',
  'street_address',
  'geocode',
])

export class PlacesError extends Error {
  constructor(
    public code: 'unconfigured' | 'quota' | 'upstream',
    message: string,
  ) {
    super(message)
  }
}

type RawPlace = {
  id?: string
  displayName?: { text?: string }
  formattedAddress?: string
  addressComponents?: { longText?: string; types?: string[] }[]
  location?: { latitude?: number; longitude?: number }
  rating?: number
  userRatingCount?: number
  reviews?: { publishTime?: string }[]
  photos?: unknown[]
  types?: string[]
  primaryType?: string
  primaryTypeDisplayName?: { text?: string }
  regularOpeningHours?: { periods?: unknown[]; weekdayDescriptions?: string[] }
  websiteUri?: string
  nationalPhoneNumber?: string
  businessStatus?: string
  googleMapsUri?: string
}

export type PlacesClient = {
  searchText(query: string, opts?: { near?: { latitude: number; longitude: number }; pageSize?: number }): Promise<PlaceSnapshot[]>
  searchCandidates(query: string): Promise<(Candidate & { websiteUri: string | null; phone: string | null })[]>
  details(placeId: string): Promise<PlaceSnapshot | null>
}

function cityFrom(raw: RawPlace): string | null {
  const locality = raw.addressComponents?.find((c) => c.types?.includes('locality'))?.longText
  if (locality) return locality
  // Text Search does not return address components here, so fall back to the address.
  // "123 Main St, Ventura, CA 93001, USA" -> "Ventura"
  const parts = (raw.formattedAddress ?? '').split(',').map((p) => p.trim())
  return parts.length >= 3 ? parts[parts.length - 3] : null
}

export function toSnapshot(raw: RawPlace): PlaceSnapshot | null {
  if (!raw.id || !raw.displayName?.text) return null
  const hours = raw.regularOpeningHours
  return {
    placeId: raw.id,
    name: raw.displayName.text,
    address: raw.formattedAddress ?? '',
    city: cityFrom(raw),
    location:
      typeof raw.location?.latitude === 'number' && typeof raw.location?.longitude === 'number'
        ? { latitude: raw.location.latitude, longitude: raw.location.longitude }
        : null,
    rating: typeof raw.rating === 'number' ? raw.rating : null,
    reviewCount: typeof raw.userRatingCount === 'number' ? raw.userRatingCount : 0,
    reviewDates: (raw.reviews ?? []).map((r) => r.publishTime).filter((d): d is string => typeof d === 'string'),
    photoCount: Array.isArray(raw.photos) ? raw.photos.length : 0,
    primaryCategory: raw.primaryTypeDisplayName?.text ?? null,
    primaryType: raw.primaryType ?? null,
    categories: (raw.types ?? []).filter((t) => !GENERIC_TYPES.has(t)),
    hasHours: Boolean(hours && ((hours.periods?.length ?? 0) > 0 || (hours.weekdayDescriptions?.length ?? 0) > 0)),
    websiteUri: raw.websiteUri ?? null,
    phone: raw.nationalPhoneNumber ?? null,
    businessStatus: raw.businessStatus ?? null,
    googleMapsUri: raw.googleMapsUri ?? null,
  }
}

export function createPlacesClient(apiKey: string | undefined, fetchImpl: typeof fetch = fetch): PlacesClient {
  const key = apiKey?.trim()

  async function call(path: string, init: { method: 'GET' | 'POST'; mask: string; body?: unknown }) {
    if (!key) throw new PlacesError('unconfigured', 'GOOGLE_PLACES_API_KEY is not set')
    let response: Response
    try {
      response = await fetchImpl(`${BASE}/${path}`, {
        method: init.method,
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': init.mask,
        },
        body: init.body ? JSON.stringify(init.body) : undefined,
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      })
    } catch {
      throw new PlacesError('upstream', 'Places request failed')
    }
    if (response.status === 404) return null
    if (response.status === 429) throw new PlacesError('quota', 'Places quota exceeded')
    if (!response.ok) throw new PlacesError('upstream', `Places responded ${response.status}`)
    return (await response.json()) as unknown
  }

  return {
    async searchText(query, opts = {}) {
      const body: Record<string, unknown> = { textQuery: query, pageSize: opts.pageSize ?? 10 }
      if (opts.near) {
        body.locationBias = { circle: { center: opts.near, radius: 25_000 } }
      }
      const data = (await call('places:searchText', { method: 'POST', mask: SEARCH_MASK, body })) as { places?: RawPlace[] } | null
      return (data?.places ?? []).map(toSnapshot).filter((p): p is PlaceSnapshot => p !== null)
    },

    async searchCandidates(query) {
      const data = (await call('places:searchText', {
        method: 'POST',
        mask: CANDIDATE_MASK,
        body: { textQuery: query, pageSize: 5 },
      })) as { places?: RawPlace[] } | null
      return (data?.places ?? [])
        .filter((p) => p.id && p.displayName?.text)
        .map((p) => ({
          placeId: p.id as string,
          name: p.displayName?.text as string,
          address: p.formattedAddress ?? '',
          websiteUri: p.websiteUri ?? null,
          phone: p.nationalPhoneNumber ?? null,
        }))
    },

    async details(placeId) {
      const data = (await call(`places/${encodeURIComponent(placeId)}`, { method: 'GET', mask: DETAILS_MASK })) as RawPlace | null
      return data ? toSnapshot(data) : null
    },
  }
}
