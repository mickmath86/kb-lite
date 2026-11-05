import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, test } from 'node:test'
import { COPY, handleReviewPlaybookRequest, resolveWebhookTarget } from './handle'
import { clientAddress, requestOriginAllowed } from './http'
import { EMAIL_LIMIT, IP_LIMIT, createLimitStore } from './limits'
import { getReviewPlaybook } from './content'
import { isPlaybookDocument, validateSubmission } from './schema'

const WEBHOOK = 'https://hooks.example.test/playbook'
const PERSON = { name: 'Jordan Lee', email: 'jordan@example.com', trade: 'HVAC' }

function body(extra: Record<string, unknown> = {}) {
  return JSON.stringify({ ...PERSON, ...extra })
}

function harness(fetchImpl?: typeof fetch) {
  const logs: string[] = []
  const calls: { url: string; init: RequestInit | undefined }[] = []
  const store = createLimitStore()
  const impl: typeof fetch = fetchImpl
    ?? (async (url, init) => {
      calls.push({ url: String(url), init })
      return new Response(null, { status: 204 })
    })
  return {
    logs,
    calls,
    store,
    run(
      text: string,
      env: { NODE_ENV?: string; REVIEW_PLAYBOOK_WEBHOOK_URL?: string; REVIEW_PLAYBOOK_WEBHOOK_MODE?: string },
      extras: { ip?: string; now?: number } = {},
    ) {
      return handleReviewPlaybookRequest({
        bodyText: text,
        env,
        ip: extras.ip ?? '203.0.113.10',
        now: extras.now ?? 1_700_000_000_000,
        store,
        fetchImpl: impl,
        log: (event, status) => logs.push(JSON.stringify({ event, status })),
      })
    },
  }
}

describe('review playbook submission', () => {
  test('playbook document is gated content the page is allowed to render', () => {
    const playbook = getReviewPlaybook()
    assert.equal(isPlaybookDocument(playbook), true)
    const text = JSON.stringify(playbook)
    assert.match(text, /\[Business\]/)
    assert.match(text, /\[Review link\]/)
    assert.match(text, /Assign an owner/)
    assert.match(text, /one follow-up|One courteous follow-up/i)
    assert.match(text, /A notebook column is enough/)
    assert.doesNotMatch(text, /gift card/i)
    assert.doesNotMatch(text, /\d+%/)
    assert.doesNotMatch(text, /\$\d/)
  })

  test('public page source does not include the gated playbook', () => {
    const dir = join(import.meta.dirname, '../../app/resources/review-request-playbook')
    const files = readdirSync(dir).filter((file) => file.endsWith('.tsx'))
    const source = files.map((file) => readFileSync(join(dir, file), 'utf8')).join('\n')
    assert.doesNotMatch(source, /\[Review link\]/)
    assert.doesNotMatch(source, /A notebook column is enough/)
    assert.doesNotMatch(source, /review-playbook\/content|review-playbook\/handle|getReviewPlaybook/)
  })

  test('rejects malformed input and keeps the playbook locked', async () => {
    const { run } = harness()
    const cases = ['', 'not-json', '{}', body({ name: 'J', email: 'nope', trade: 'Astronaut' }), 'x'.repeat(5000)]
    for (const text of cases) {
      const result = await run(text, { NODE_ENV: 'production', REVIEW_PLAYBOOK_WEBHOOK_URL: WEBHOOK })
      assert.notEqual(result.status, 200)
      assert.equal(result.body.ok, false)
      assert.equal('playbook' in result.body, false)
    }
    const invalid = validateSubmission({ name: '', email: 'jordan@example.com', trade: 'HVAC' })
    assert.equal(invalid.ok, false)
  })

  test('missing, mock, and non-https configuration fail closed outside an explicit dev mock', async () => {
    assert.equal(resolveWebhookTarget({ NODE_ENV: 'production', REVIEW_PLAYBOOK_WEBHOOK_MODE: 'mock' }).kind, 'unconfigured')
    assert.equal(resolveWebhookTarget({ NODE_ENV: 'development' }).kind, 'unconfigured')
    assert.equal(resolveWebhookTarget({ NODE_ENV: 'development', REVIEW_PLAYBOOK_WEBHOOK_URL: 'http://hooks.example.test/x' }).kind, 'invalid')
    assert.equal(
      resolveWebhookTarget({ NODE_ENV: 'production', REVIEW_PLAYBOOK_WEBHOOK_URL: 'https://user:pass@hooks.example.test/x' }).kind,
      'invalid',
    )

    const missing = harness()
    const prod = await missing.run(body(), { NODE_ENV: 'production', REVIEW_PLAYBOOK_WEBHOOK_MODE: 'mock' })
    assert.equal(prod.status, 503)
    assert.equal(prod.body.ok, false)
    assert.equal(missing.calls.length, 0)
    assert.match(JSON.stringify(prod.body), /locked/)
    assert.doesNotMatch(JSON.stringify(prod.body), /hooks\.example/)

    const dev = harness()
    const unconfigured = await dev.run(body(), { NODE_ENV: 'development' })
    assert.equal(unconfigured.status, 503)
    assert.equal(dev.calls.length, 0)

    const insecure = harness()
    const http = await insecure.run(body(), { NODE_ENV: 'production', REVIEW_PLAYBOOK_WEBHOOK_URL: 'http://hooks.example.test/playbook' })
    assert.equal(http.status, 503)
    assert.equal(insecure.calls.length, 0)
  })

  test('mock mode unlocks only outside production and does not call the network', async () => {
    const { run, calls } = harness()
    const result = await run(body({ webhookUrl: 'https://evil.example/hook', submittedAt: '1999-01-01T00:00:00.000Z' }), {
      NODE_ENV: 'test',
      REVIEW_PLAYBOOK_WEBHOOK_MODE: 'mock',
      REVIEW_PLAYBOOK_WEBHOOK_URL: WEBHOOK,
    })
    assert.equal(result.status, 200)
    assert.equal(result.body.ok, true)
    if (result.body.ok) {
      assert.equal(result.body.preview, true)
      assert.equal(isPlaybookDocument(result.body.playbook), true)
    }
    assert.equal(calls.length, 0)
  })

  test('accepted webhook unlocks with the server payload only', async () => {
    const { run, calls, logs } = harness()
    const now = 1_700_000_000_000
    const result = await run(
      body({ webhookUrl: 'https://evil.example/hook', source: 'spam', page: 'https://evil.example', submittedAt: '1999-01-01T00:00:00.000Z' }),
      { NODE_ENV: 'production', REVIEW_PLAYBOOK_WEBHOOK_URL: WEBHOOK },
      { now },
    )
    assert.equal(result.status, 200)
    assert.equal(result.body.ok, true)
    if (result.body.ok) assert.equal(result.body.preview, undefined)
    assert.equal(calls.length, 1)
    assert.equal(calls[0].url, WEBHOOK)
    assert.equal(calls[0].init?.method, 'POST')
    assert.equal(calls[0].init?.redirect, 'manual')
    assert.deepEqual(JSON.parse(String(calls[0].init?.body)), {
      name: 'Jordan Lee',
      email: 'jordan@example.com',
      trade: 'HVAC',
      source: 'review-request-playbook',
      page: '/resources/review-request-playbook',
      submittedAt: new Date(now).toISOString(),
    })
    const logged = logs.join('\n')
    assert.doesNotMatch(logged, /jordan@example.com/)
    assert.doesNotMatch(logged, /hooks\.example/)
    assert.doesNotMatch(JSON.stringify(result.body), /hooks\.example|evil\.example/)
  })

  test('non-2xx, redirects, and timeouts stay locked and do not echo the destination', async () => {
    const rejected = harness(async () => new Response('internal-note', { status: 500 }))
    const rejectedResult = await rejected.run(body(), { NODE_ENV: 'production', REVIEW_PLAYBOOK_WEBHOOK_URL: WEBHOOK })
    assert.equal(rejectedResult.status, 502)
    assert.equal(rejectedResult.body.ok, false)
    assert.doesNotMatch(JSON.stringify(rejectedResult.body), /internal-note|hooks\.example/)

    const redirect = harness(async () => new Response(null, { status: 302, headers: { location: 'http://evil.example/catch' } }))
    const redirectResult = await redirect.run(body({ email: 'redirect@example.com' }), {
      NODE_ENV: 'production',
      REVIEW_PLAYBOOK_WEBHOOK_URL: WEBHOOK,
    })
    assert.equal(redirectResult.status, 502)
    assert.doesNotMatch(JSON.stringify(redirectResult.body), /evil\.example/)

    const timedOut = harness(async () => {
      throw Object.assign(new Error('timed out'), { name: 'TimeoutError' })
    })
    const timeoutResult = await timedOut.run(body({ email: 'timeout@example.com' }), {
      NODE_ENV: 'production',
      REVIEW_PLAYBOOK_WEBHOOK_URL: WEBHOOK,
    })
    assert.equal(timeoutResult.status, 504)
    assert.equal(timeoutResult.body.ok, false)
    assert.match(JSON.stringify(timeoutResult.body), /locked/)
  })

  test('a second accepted submit does not post twice', async () => {
    const { run, calls } = harness()
    const env = { NODE_ENV: 'production' as const, REVIEW_PLAYBOOK_WEBHOOK_URL: WEBHOOK }
    const first = await run(body(), env, { now: 5_000 })
    const second = await run(body(), env, { ip: '203.0.113.11', now: 6_000 })
    assert.equal(first.status, 200)
    assert.equal(second.status, 200)
    assert.equal(calls.length, 1)
  })

  test('an in-flight submit suppresses the duplicate', async () => {
    let release: (() => void) | undefined
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    const { run } = harness(async () => {
      await gate
      return new Response(null, { status: 200 })
    })
    const env = { NODE_ENV: 'production', REVIEW_PLAYBOOK_WEBHOOK_URL: WEBHOOK }
    const first = run(body(), env)
    await new Promise((resolve) => setImmediate(resolve))
    const second = await run(body(), env, { ip: '198.51.100.20' })
    assert.equal(second.status, 409)
    assert.equal(second.body.ok, false)
    release?.()
    const opened = await first
    assert.equal(opened.status, 200)
  })

  test('rate limits by address and by email', async () => {
    const byIp = harness()
    const env = { NODE_ENV: 'production' }
    for (let index = 0; index < IP_LIMIT; index += 1) {
      const result = await byIp.run(body({ email: `person${index}@example.com` }), env, { ip: '198.51.100.8' })
      assert.equal(result.status, 503)
    }
    const blockedIp = await byIp.run(body({ email: 'fresh@example.com' }), env, { ip: '198.51.100.8' })
    assert.equal(blockedIp.status, 429)

    const byEmail = harness()
    for (let index = 0; index < EMAIL_LIMIT; index += 1) {
      const result = await byEmail.run(body(), env, { ip: `198.51.100.${index + 1}` })
      assert.equal(result.status, 503)
    }
    const blockedEmail = await byEmail.run(body(), env, { ip: '203.0.113.50' })
    assert.equal(blockedEmail.status, 429)
    assert.match(JSON.stringify(blockedEmail.body), /locked/)
  })

  test('origin and address helpers do not trust a caller-supplied destination', () => {
    const allowed = new Request('https://kickbord.com/api/review-playbook', {
      headers: { origin: 'https://kickbord.com' },
    })
    const devHost = new Request('http://localhost:3000/api/review-playbook', {
      headers: { origin: 'http://127.0.0.1:3000', host: '127.0.0.1:3000' },
    })
    const blocked = new Request('https://kickbord.com/api/review-playbook', {
      headers: { origin: 'https://evil.example', 'x-forwarded-host': 'evil.example' },
    })
    const missing = new Request('https://kickbord.com/api/review-playbook')
    assert.equal(requestOriginAllowed(allowed), true)
    assert.equal(requestOriginAllowed(devHost), true)
    assert.equal(requestOriginAllowed(blocked), false)
    assert.equal(requestOriginAllowed(missing), true)
    assert.equal(
      clientAddress(new Request('https://kickbord.com/api/review-playbook', { headers: { 'x-forwarded-for': '203.0.113.4, 10.0.0.1' } })),
      '203.0.113.4',
    )
    assert.equal(clientAddress(new Request('https://kickbord.com/api/review-playbook', { headers: { 'x-forwarded-for': 'not an ip' } })), 'unknown')
    assert.equal(COPY.rejected.includes('http'), false)
  })
})
