/**
 * Shared shapes for the Google Business Profile report (comment keyword PROFILE).
 * Everything here is serializable so the same object drives the on-page report,
 * the downloadable PDF, and the webhook summary.
 */

/** The subset of Google Places (New) data the report uses. */
export type PlaceSnapshot = {
  placeId: string
  name: string
  address: string
  city: string | null
  location: { latitude: number; longitude: number } | null
  rating: number | null
  reviewCount: number
  /** Publish times (ISO) of the reviews Google returns. Google returns at most 5, picked by relevance. */
  reviewDates: string[]
  /** Google returns at most 10 photo references, so 10 means "10 or more". */
  photoCount: number
  primaryCategory: string | null
  primaryType: string | null
  /** Specific Google place types, without generic ones like "establishment". */
  categories: string[]
  hasHours: boolean
  websiteUri: string | null
  phone: string | null
  businessStatus: string | null
  googleMapsUri: string | null
}

export type CheckStatus = 'good' | 'fair' | 'poor'

export type ReportCheck = {
  id: 'rating' | 'reviews' | 'recency' | 'photos' | 'hours' | 'website' | 'phone' | 'categories' | 'status'
  label: string
  /** Short value shown in the table, for example "4.7 stars". */
  value: string
  points: number
  maxPoints: number
  status: CheckStatus
  /** One plain sentence explaining the result. */
  detail: string
}

export type Recommendation = {
  checkId: ReportCheck['id']
  priority: 'High' | 'Medium' | 'Low'
  title: string
  action: string
  pointsAvailable: number
}

export type CompetitorRow = {
  name: string
  rating: number | null
  reviewCount: number
  photoCount: number
  hasHours: boolean
  hasWebsite: boolean
  googleMapsUri: string | null
  isYou: boolean
}

export type Grade = 'A' | 'B' | 'C' | 'D' | 'F'

export type FoundReport = {
  kind: 'found'
  generatedAt: string
  website: string
  /** True when the profile's website matches the one entered. */
  websiteMatched: boolean
  business: PlaceSnapshot
  score: number
  grade: Grade
  summary: string
  checks: ReportCheck[]
  recommendations: Recommendation[]
  competitors: CompetitorRow[]
  /** How the business compares with the competitor average. */
  benchmarks: {
    competitorCount: number
    avgRating: number | null
    avgReviewCount: number | null
    medianReviewCount: number | null
  }
  /** Profile items Google does not share publicly, so the owner checks them by hand. */
  manualChecks: string[]
  sample: boolean
}

export type NotFoundReport = {
  kind: 'not_found'
  generatedAt: string
  website: string
  recommendations: Recommendation[]
  manualChecks: string[]
  sample: boolean
}

export type GbpReport = FoundReport | NotFoundReport

export type Candidate = {
  placeId: string
  name: string
  address: string
}
