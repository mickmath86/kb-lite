import assert from 'node:assert/strict'
import { beforeEach, describe, it } from 'node:test'

import type { PlacesClient } from './places'
import { parseSiteHints } from './site-lookup'
import { buildFoundReport, gradeFor } from './score'
import { isGbpSampleData, isGbpWebhookDemo, resetGbpReportStateForTests, submitGbpReport } from './submit'
import type { PlaceSnapshot } from './types'
import { normalizeWebsite } from './validate'

const NOW = Date.parse('2026-11-11T12:00:00Z')

function place(over: Partial<PlaceSnapshot> = {}): PlaceSnapshot {
  return {
    placeId: 'ChIJ_test_place_0001',
    name: 'Acme Plumbing',
    address: '1 Main St, Ventura, CA 93001, USA',
    city: 'Ventura',
    location: { latitude: 34.27, longitude: -119.23 },
    rating: 4.9,
    reviewCount: 200,
    reviewDates: [new Date(NOW - 5 * 86_400_000).toISOString()],
    photoCount: 10,
    primaryCategory: 'Plumber',
    primaryType: 'plumber',
    categories: ['plumber', 'drainage_service', 'water_heater_installer'],
    hasHours: true,
    websiteUri: 'https://www.acmeplumbing.com/',
    phone: '(805) 555-0100',
    businessStatus: 'OPERATIONAL',
    googleMapsUri: 'https://maps.google.com/?cid=1',
    ...over,
  }
}

const lead = { website: 'acmeplumbing.com', name: 'Alex Rivera', email: 'alex@example.com', tradeType: 'Plumber' }

function fakePlaces(over: Partial<PlacesClient> = {}): PlacesClient {
  return {
    searchCandidates: async () => [
      { placeId: 'ChIJ_test_place_0001', name: 'Acme Plumbing', address: 'Ventura', websiteUri: 'https://acmeplumbing.com', phone: null },
    ],
    details: async () => place(),
    searchText: async () => [place({ placeId: 'ChIJ_comp_000000001', name: 'Rival', reviewCount: 100 })],
    ...over,
  }
}

describe('normalizeWebsite', () => {
  it('accepts bare domains and strips www', () => {
    assert.deepEqual(normalizeWebsite('www.AcmePlumbing.com'), { url: 'https://www.acmeplumbing.com', domain: 'acmeplumbing.com' })
  })
  it('rejects IPs, localhost and junk', () => {
    for (const bad of ['127.0.0.1', 'localhost', 'http://10.0.0.1', 'not a site', 'https://a.com:8080', 'ftp://a.com']) {
      assert.equal(normalizeWebsite(bad), null, bad)
    }
  })
})

describe('scoring', () => {
  it('gives a complete, well-reviewed profile 100', () => {
    const r = buildFoundReport({ website: 'https://acmeplumbing.com', domain: 'acmeplumbing.com', business: place(), competitors: [], now: NOW })
    assert.equal(r.score, 100)
    assert.equal(r.grade, 'A')
    assert.equal(r.recommendations.length, 0)
  })

  it('penalizes missing basics and ranks fixes', () => {
    const r = buildFoundReport({
      website: 'https://acmeplumbing.com',
      domain: 'acmeplumbing.com',
      business: place({ hasHours: false, photoCount: 2, websiteUri: null, reviewCount: 20, reviewDates: [] }),
      competitors: [place({ placeId: 'a', reviewCount: 100 }), place({ placeId: 'b', reviewCount: 120 })],
      now: NOW,
    })
    assert.ok(r.score < 65)
    assert.equal(r.recommendations[0].priority, 'High')
    assert.ok(r.recommendations.some((x) => x.checkId === 'hours'))
    assert.equal(r.benchmarks.medianReviewCount, 110)
    assert.equal(r.competitors[0].isYou, true)
  })

  it('maps grades', () => {
    assert.equal(gradeFor(90), 'A')
    assert.equal(gradeFor(80), 'B')
    assert.equal(gradeFor(65), 'C')
    assert.equal(gradeFor(50), 'D')
    assert.equal(gradeFor(49), 'F')
  })
})

describe('parseSiteHints', () => {
  it('reads JSON-LD first, then title', () => {
    const html = `<title>Home | Ignore</title><script type="application/ld+json">{"@type":"Plumber","name":"Acme Plumbing","telephone":"805-555-0100","address":{"addressLocality":"Ventura"}}</script>`
    assert.deepEqual(parseSiteHints(html), { name: 'Acme Plumbing', phone: '805-555-0100', city: 'Ventura' })
    assert.equal(parseSiteHints('<title>Acme Plumbing | Ventura Plumber</title>').name, 'Acme Plumbing')
  })
})

describe('environment gates', () => {
  it('never demos in production', () => {
    assert.equal(isGbpWebhookDemo({ vercelEnv: 'production' }), false)
    assert.equal(isGbpSampleData({ vercelEnv: 'production' }), false)
    assert.equal(isGbpWebhookDemo({ vercelEnv: 'preview' }), true)
    assert.equal(isGbpWebhookDemo({ vercelEnv: 'preview', webhookUrl: 'https://x.test' }), false)
  })
})

describe('submitGbpReport', () => {
  beforeEach(() => resetGbpReportStateForTests())

  const prod = { nodeEnv: 'production', vercelEnv: 'production', placesApiKey: 'k', webhookUrl: 'https://hooks.example.com/abc' }

  it('fires the webhook with a flat payload and returns the report', async () => {
    let sent: Record<string, unknown> | null = null
    const result = await submitGbpReport(lead, {
      ...prod,
      webhookToken: 'secret',
      places: fakePlaces(),
      siteHints: async () => null,
      now: () => NOW,
      fetchImpl: (async (_url: string, init: RequestInit) => {
        sent = JSON.parse(String(init.body))
        assert.equal((init.headers as Record<string, string>).Authorization, 'Bearer secret')
        return new Response('{}', { status: 200 })
      }) as typeof fetch,
    })
    assert.equal(result.ok, true)
    assert.ok(result.ok && result.kind === 'report' && result.sent)
    assert.ok(sent)
    const payload = sent as Record<string, unknown>
    assert.equal(payload.source, 'gbp-profile-report')
    assert.equal(payload.keyword, 'PROFILE')
    assert.equal(payload.profileFound, true)
    assert.equal(payload.businessName, 'Acme Plumbing')
    assert.equal(payload.email, 'alex@example.com')
    assert.equal(typeof payload.score, 'number')
  })

  it('withholds the report when the webhook fails', async () => {
    const result = await submitGbpReport(lead, {
      ...prod,
      places: fakePlaces(),
      siteHints: async () => null,
      fetchImpl: (async () => new Response('', { status: 500 })) as unknown as typeof fetch,
    })
    assert.deepEqual(result.ok ? null : result.code, 'rejected')
  })

  it('refuses production without a webhook', async () => {
    const result = await submitGbpReport(lead, { ...prod, webhookUrl: undefined, places: fakePlaces() })
    assert.equal(result.ok ? null : result.code, 'unconfigured')
  })

  it('asks the visitor to choose when no profile links to the site', async () => {
    let fired = false
    const result = await submitGbpReport(lead, {
      ...prod,
      places: fakePlaces({
        searchCandidates: async () => [{ placeId: 'ChIJ_other_00000001', name: 'Acme Plumbing Inc', address: 'Oxnard', websiteUri: 'https://other.com', phone: null }],
      }),
      siteHints: async () => ({ name: 'Acme Plumbing', phone: null, city: null }),
      fetchImpl: (async () => {
        fired = true
        return new Response('{}')
      }) as unknown as typeof fetch,
    })
    assert.ok(result.ok && result.kind === 'choose' && result.candidates.length === 1)
    assert.equal(fired, false)
  })

  it('reports not found and still fires the webhook', async () => {
    let payload: Record<string, unknown> | null = null
    const result = await submitGbpReport(lead, {
      ...prod,
      places: fakePlaces({ searchCandidates: async () => [] }),
      siteHints: async () => null,
      fetchImpl: (async (_u: string, init: RequestInit) => {
        payload = JSON.parse(String(init.body))
        return new Response('{}')
      }) as typeof fetch,
    })
    assert.ok(result.ok && result.kind === 'report' && result.report.kind === 'not_found')
    assert.equal((payload as Record<string, unknown> | null)?.profileFound, false)
  })

  it('does not fire twice for a repeat submission', async () => {
    let calls = 0
    const opts = {
      ...prod,
      places: fakePlaces(),
      siteHints: async () => null,
      now: () => NOW,
      fetchImpl: (async () => {
        calls++
        return new Response('{}')
      }) as unknown as typeof fetch,
    }
    await submitGbpReport(lead, opts)
    const second = await submitGbpReport(lead, opts)
    assert.equal(calls, 1)
    assert.ok(second.ok && second.kind === 'report' && second.duplicate)
  })

  it('drops honeypot submissions', async () => {
    const result = await submitGbpReport({ ...lead, hp: 'bot' }, { ...prod, places: fakePlaces() })
    assert.equal(result.ok ? null : result.code, 'ignored')
  })
})
