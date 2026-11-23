import { domainOf } from './validate'
import type {
  CheckStatus,
  CompetitorRow,
  FoundReport,
  Grade,
  NotFoundReport,
  PlaceSnapshot,
  Recommendation,
  ReportCheck,
} from './types'

/**
 * Scores a Google Business Profile out of 100 using only public Google data.
 * Weights favor what customers see first in Maps: stars, review volume and
 * freshness, then completeness (photos, hours, website, phone, categories).
 */

const DAY = 86_400_000

export const MANUAL_CHECKS = [
  'Review replies: Reply to every review, good or bad. Customers read your replies.',
  'Google posts and updates: Post a recent job or offer at least twice a month.',
  'Business description: Write it in your own words and name the services and towns you cover.',
  'Services and service areas: List each service and every city you cover in your profile settings.',
  'Questions and answers: Check for unanswered questions on your profile.',
  'Extra categories: Add extra categories for the other work you do. Public data only shows your main category.',
]

function round1(value: number) {
  return Math.round(value * 10) / 10
}

function median(values: number[]) {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function average(values: number[]) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : null
}

function statusFor(points: number, max: number): CheckStatus {
  const ratio = max === 0 ? 1 : points / max
  if (ratio >= 0.8) return 'good'
  if (ratio >= 0.4) return 'fair'
  return 'poor'
}

function check(c: Omit<ReportCheck, 'status'>): ReportCheck {
  return { ...c, status: statusFor(c.points, c.maxPoints) }
}

export function gradeFor(score: number): Grade {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 65) return 'C'
  if (score >= 50) return 'D'
  return 'F'
}

const plural = (n: number, word: string) => `${n.toLocaleString('en-US')} ${word}${n === 1 ? '' : 's'}`

export function buildChecks(
  place: PlaceSnapshot,
  ctx: { domain: string; competitorMedianReviews: number | null; competitorAvgRating: number | null; now: number },
): ReportCheck[] {
  const checks: ReportCheck[] = []

  // Rating (20)
  {
    const r = place.rating
    const points = r === null ? 0 : r >= 4.8 ? 20 : r >= 4.5 ? 16 : r >= 4.2 ? 12 : r >= 4.0 ? 8 : 4
    const vs =
      r !== null && ctx.competitorAvgRating !== null
        ? r >= ctx.competitorAvgRating
          ? ` That is at or above the local average of ${ctx.competitorAvgRating.toFixed(1)}.`
          : ` The local average is ${ctx.competitorAvgRating.toFixed(1)}.`
        : ''
    checks.push(
      check({
        id: 'rating',
        label: 'Star rating',
        value: r === null ? 'No rating yet' : `${r.toFixed(1)} stars`,
        points,
        maxPoints: 20,
        detail: r === null ? 'Your profile has no star rating yet, so it is hard to stand out in Maps.' : `Your rating is ${r.toFixed(1)}.${vs}`,
      }),
    )
  }

  // Review count (20) vs local median when we have one
  {
    const n = place.reviewCount
    const med = ctx.competitorMedianReviews
    let points: number
    let detail: string
    if (med !== null && med > 0) {
      const ratio = n / med
      points = ratio >= 1.5 ? 20 : ratio >= 1 ? 16 : ratio >= 0.5 ? 10 : ratio > 0 ? 5 : 0
      detail =
        ratio >= 1
          ? `You have ${plural(n, 'review')}. The typical nearby competitor has ${Math.round(med).toLocaleString('en-US')}.`
          : `You have ${plural(n, 'review')}, behind the typical nearby competitor at ${Math.round(med).toLocaleString('en-US')}.`
    } else {
      points = n >= 150 ? 20 : n >= 75 ? 16 : n >= 30 ? 10 : n > 0 ? 5 : 0
      detail = `You have ${plural(n, 'review')}.`
    }
    checks.push(check({ id: 'reviews', label: 'Number of reviews', value: plural(n, 'review'), points, maxPoints: 20, detail }))
  }

  // Recency (10). Google returns up to five reviews chosen by relevance, so this is a signal, not an exact date.
  {
    const newest = place.reviewDates.map((d) => Date.parse(d)).filter(Number.isFinite).sort((a, b) => b - a)[0]
    const ageDays = newest ? Math.floor((ctx.now - newest) / DAY) : null
    const points = ageDays === null ? 0 : ageDays <= 30 ? 10 : ageDays <= 90 ? 6 : ageDays <= 180 ? 3 : 1
    const value = ageDays === null ? 'None found' : ageDays <= 1 ? 'Today' : ageDays < 60 ? `${ageDays} days ago` : `${Math.round(ageDays / 30)} months ago`
    checks.push(
      check({
        id: 'recency',
        label: 'Recent reviews',
        value,
        points,
        maxPoints: 10,
        detail:
          ageDays === null
            ? 'We could not find any recent reviews on your profile.'
            : ageDays <= 30
              ? 'You have a review from the last month. New reviews show customers you are active.'
              : 'The newest review Google shows is more than a month old. A steady flow of new reviews helps.',
      }),
    )
  }

  // Photos (10). Google returns at most 10 photo references.
  {
    const p = place.photoCount
    const points = p >= 10 ? 10 : p >= 5 ? 6 : p >= 1 ? 3 : 0
    checks.push(
      check({
        id: 'photos',
        label: 'Photos',
        value: p >= 10 ? '10 or more' : String(p),
        points,
        maxPoints: 10,
        detail: p >= 10 ? 'You have plenty of photos.' : 'Profiles with real job photos look more trustworthy. Add photos of your work, team and trucks.',
      }),
    )
  }

  // Hours (10)
  checks.push(
    check({
      id: 'hours',
      label: 'Business hours',
      value: place.hasHours ? 'Listed' : 'Missing',
      points: place.hasHours ? 10 : 0,
      maxPoints: 10,
      detail: place.hasHours ? 'Your hours are listed.' : 'Your hours are missing, so Google may not show you to people searching for someone open now.',
    }),
  )

  // Website (10)
  {
    const linked = domainOf(place.websiteUri)
    const matches = linked === ctx.domain
    const points = !linked ? 0 : matches ? 10 : 5
    checks.push(
      check({
        id: 'website',
        label: 'Website link',
        value: !linked ? 'Missing' : matches ? 'Linked' : 'Different site',
        points,
        maxPoints: 10,
        detail: !linked
          ? 'Your profile has no website link.'
          : matches
            ? 'Your profile links to your website.'
            : `Your profile links to ${linked}, not ${ctx.domain}.`,
      }),
    )
  }

  // Phone (5)
  checks.push(
    check({
      id: 'phone',
      label: 'Phone number',
      value: place.phone ? 'Listed' : 'Missing',
      points: place.phone ? 5 : 0,
      maxPoints: 5,
      detail: place.phone ? 'Customers can call you from Maps.' : 'No phone number, so customers cannot tap to call from Maps.',
    }),
  )

  // Categories (10). Public data shows the main category only; extra categories are a manual check.
  {
    const hasPrimary = Boolean(place.primaryType)
    checks.push(
      check({
        id: 'categories',
        label: 'Main category',
        value: place.primaryCategory ?? (hasPrimary ? 'Set' : 'Not set'),
        points: hasPrimary ? 10 : 0,
        maxPoints: 10,
        detail: hasPrimary
          ? 'Your main category is set. It decides which searches you show up for.'
          : 'Your main category is not set or is too general. It decides which searches you show up for.',
      }),
    )
  }

  // Status (5)
  {
    const operational = !place.businessStatus || place.businessStatus === 'OPERATIONAL'
    checks.push(
      check({
        id: 'status',
        label: 'Open status',
        value: operational ? 'Open' : place.businessStatus === 'CLOSED_TEMPORARILY' ? 'Temporarily closed' : 'Marked closed',
        points: operational ? 5 : 0,
        maxPoints: 5,
        detail: operational ? 'Google shows your business as open.' : 'Google shows your business as closed. Fix this first.',
      }),
    )
  }

  return checks
}

const RECOMMENDATION_COPY: Record<ReportCheck['id'], { title: string; action: string }> = {
  status: {
    title: 'Mark your business as open',
    action: 'In your Google Business Profile, open Edit profile > Hours and set the business to Open. Closed profiles can drop out of Maps.',
  },
  rating: {
    title: 'Raise your star rating',
    action: 'Ask every happy customer for a review the day the job is done, and reply calmly to any low reviews so future customers see you care.',
  },
  reviews: {
    title: 'Get more reviews',
    action: 'Make the review ask part of closing every job. Send a short text with your review link the same day.',
  },
  recency: {
    title: 'Keep new reviews coming',
    action: 'Aim for at least a few new reviews every month. Fresh reviews show customers and Google that you are busy.',
  },
  photos: {
    title: 'Add real job photos',
    action: 'Upload before-and-after photos, your team, and your trucks. Add a few new ones each month.',
  },
  hours: {
    title: 'Add your business hours',
    action: 'Add regular hours, and special hours for holidays. If you take emergency calls, say so.',
  },
  website: {
    title: 'Link your website',
    action: 'Add your website in Edit profile > Contact. Make sure it is the same site you use everywhere else.',
  },
  phone: {
    title: 'Add a phone number',
    action: 'Add the number customers should call, and make sure someone (or something) answers it.',
  },
  categories: {
    title: 'Set your main category',
    action: 'Pick the most specific main category for your trade in your profile settings.',
  },
}

const ORDER: ReportCheck['id'][] = ['status', 'reviews', 'rating', 'website', 'hours', 'phone', 'categories', 'recency', 'photos']

export function buildRecommendations(checks: ReportCheck[]): Recommendation[] {
  return checks
    .filter((c) => c.points < c.maxPoints)
    .map((c) => {
      const lost = c.maxPoints - c.points
      const priority: Recommendation['priority'] = c.id === 'status' || lost >= 8 ? 'High' : lost >= 4 ? 'Medium' : 'Low'
      return { checkId: c.id, priority, pointsAvailable: lost, ...RECOMMENDATION_COPY[c.id] }
    })
    .sort((a, b) => {
      const rank = { High: 0, Medium: 1, Low: 2 }
      return rank[a.priority] - rank[b.priority] || b.pointsAvailable - a.pointsAvailable || ORDER.indexOf(a.checkId) - ORDER.indexOf(b.checkId)
    })
}

function summaryFor(score: number, business: PlaceSnapshot, recs: Recommendation[]) {
  const top = recs[0]
  const lead =
    score >= 90
      ? `${business.name} has a strong Google profile.`
      : score >= 75
        ? `${business.name} has a solid Google profile with a few gaps.`
        : score >= 55
          ? `${business.name}'s Google profile is missing some things customers look for.`
          : `${business.name}'s Google profile needs work before it can compete in Maps.`
  return top ? `${lead} The biggest opportunity: ${top.title.toLowerCase()}.` : lead
}

export function buildFoundReport(input: {
  website: string
  domain: string
  business: PlaceSnapshot
  competitors: PlaceSnapshot[]
  now?: number
  sample?: boolean
}): FoundReport {
  const now = input.now ?? Date.now()
  const others = input.competitors.filter((c) => c.placeId !== input.business.placeId).slice(0, 5)
  const medianReviews = others.length >= 2 ? median(others.map((c) => c.reviewCount)) : null
  const ratings = others.map((c) => c.rating).filter((r): r is number => r !== null)
  const avgRating = ratings.length >= 2 ? round1(average(ratings) as number) : null

  const checks = buildChecks(input.business, {
    domain: input.domain,
    competitorMedianReviews: medianReviews,
    competitorAvgRating: avgRating,
    now,
  })
  const score = checks.reduce((sum, c) => sum + c.points, 0)
  const recommendations = buildRecommendations(checks)

  const row = (p: PlaceSnapshot, isYou: boolean): CompetitorRow => ({
    name: p.name,
    rating: p.rating,
    reviewCount: p.reviewCount,
    photoCount: p.photoCount,
    hasHours: p.hasHours,
    hasWebsite: Boolean(p.websiteUri),
    googleMapsUri: p.googleMapsUri,
    isYou,
  })

  const avgReviews = others.length ? average(others.map((c) => c.reviewCount)) : null

  return {
    kind: 'found',
    generatedAt: new Date(now).toISOString(),
    website: input.website,
    websiteMatched: domainOf(input.business.websiteUri) === input.domain,
    business: input.business,
    score,
    grade: gradeFor(score),
    summary: summaryFor(score, input.business, recommendations),
    checks,
    recommendations,
    competitors: [row(input.business, true), ...others.map((c) => row(c, false))],
    benchmarks: {
      competitorCount: others.length,
      avgRating,
      avgReviewCount: avgReviews === null ? null : Math.round(avgReviews),
      medianReviewCount: medianReviews === null ? null : Math.round(medianReviews),
    },
    manualChecks: MANUAL_CHECKS,
    sample: input.sample === true,
  }
}

export function buildNotFoundReport(input: { website: string; now?: number; sample?: boolean }): NotFoundReport {
  return {
    kind: 'not_found',
    generatedAt: new Date(input.now ?? Date.now()).toISOString(),
    website: input.website,
    recommendations: [
      {
        checkId: 'status',
        priority: 'High',
        pointsAvailable: 0,
        title: 'Claim or create your Google Business Profile',
        action: 'Go to business.google.com, search for your business, and claim it. If it is not there, create it and complete verification.',
      },
      {
        checkId: 'website',
        priority: 'High',
        pointsAvailable: 0,
        title: 'Link this website to your profile',
        action: 'Once the profile is verified, add this website in Edit profile > Contact so Google connects the two.',
      },
      {
        checkId: 'reviews',
        priority: 'Medium',
        pointsAvailable: 0,
        title: 'Start collecting reviews',
        action: 'Ask your last 10 happy customers for a review. Then make the ask part of closing every job.',
      },
    ],
    manualChecks: MANUAL_CHECKS,
    sample: input.sample === true,
  }
}
