import type { PlaceSnapshot } from './types'

/**
 * Made-up businesses for preview deployments without a Google Places key.
 * Every report built from these is labeled as sample data on the page and PDF.
 */

const base: Omit<PlaceSnapshot, 'placeId' | 'name' | 'rating' | 'reviewCount' | 'photoCount' | 'hasHours' | 'websiteUri'> = {
  address: '100 Example St, Ventura, CA 93001, USA',
  city: 'Ventura',
  location: { latitude: 34.2746, longitude: -119.229 },
  reviewDates: [],
  primaryCategory: 'Plumber',
  primaryType: 'plumber',
  categories: ['plumber'],
  phone: '(805) 555-0100',
  businessStatus: 'OPERATIONAL',
  googleMapsUri: null,
}

export function sampleBusiness(now: number): PlaceSnapshot {
  return {
    ...base,
    placeId: 'sample-your-business',
    name: 'Sample Plumbing Co.',
    rating: 4.6,
    reviewCount: 38,
    reviewDates: [new Date(now - 74 * 86_400_000).toISOString(), new Date(now - 140 * 86_400_000).toISOString()],
    photoCount: 4,
    hasHours: false,
    websiteUri: null,
  }
}

export function sampleCompetitors(): PlaceSnapshot[] {
  return [
    { ...base, placeId: 'sample-a', name: 'Competitor A Plumbing', rating: 4.9, reviewCount: 212, photoCount: 10, hasHours: true, websiteUri: 'https://example.com' },
    { ...base, placeId: 'sample-b', name: 'Competitor B Rooter', rating: 4.7, reviewCount: 96, photoCount: 10, hasHours: true, websiteUri: 'https://example.com' },
    { ...base, placeId: 'sample-c', name: 'Competitor C Plumbing & Drain', rating: 4.8, reviewCount: 141, photoCount: 8, hasHours: true, websiteUri: 'https://example.com' },
    { ...base, placeId: 'sample-d', name: 'Competitor D Services', rating: 4.4, reviewCount: 57, photoCount: 6, hasHours: true, websiteUri: null },
    { ...base, placeId: 'sample-e', name: 'Competitor E Plumbing', rating: 4.5, reviewCount: 73, photoCount: 10, hasHours: false, websiteUri: 'https://example.com' },
  ]
}
