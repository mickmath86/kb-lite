import assert from 'node:assert/strict'
import { afterEach, describe, it } from 'node:test'

import { PLAYBOOK_OUTLINE } from './outline'
import {
  resetReviewPlaybookDedupeForTests,
  REVIEW_PLAYBOOK_SOURCE,
  submitReviewPlaybookLead,
} from './submit'

const lead = {
  name: 'Alex Rivera',
  email: 'Alex.Rivera@example.com',
  tradeType: 'Plumber',
}

function jsonResponse(status: number) {
  return new Response(null, { status })
}

afterEach(() => {
  resetReviewPlaybookDedupeForTests()
})

describe('review playbook outline', () => {
  it('lists ten distinct sections', () => {
    assert.equal(PLAYBOOK_OUTLINE.length, 10)
    assert.equal(new Set(PLAYBOOK_OUTLINE.map((section) => section.id)).size, 10)
  })
})

describe('submitReviewPlaybookLead', () => {
  it('rejects invalid name, email, and trade without calling the webhook', async () => {
    let called = false
    const result = await submitReviewPlaybookLead(
      { name: ' ', email: 'not-an-email', tradeType: 'CEO', webhookUrl: 'https://evil.example/hook' },
      {
        webhookUrl: 'https://hooks.example/playbook',
        nodeEnv: 'production',
        fetchImpl: async () => {
          called = true
          return jsonResponse(200)
        },
      },
    )

    assert.equal(result.ok, false)
    if (!result.ok) {
      assert.equal(result.code, 'validation')
      assert.equal(result.fieldErrors?.name, 'Enter your name.')
      assert.equal(result.fieldErrors?.email, 'Enter a valid email address.')
      assert.equal(result.fieldErrors?.tradeType, 'Select your trade.')
      assert.equal(JSON.stringify(result).includes('Alex.Rivera'), false)
    }
    assert.equal(called, false)
  })

  it('accepts a unicode name, Other, and ignores a client-supplied destination', async () => {
    let receivedUrl = ''
    let receivedBody = ''
    const result = await submitReviewPlaybookLead(
      {
        name: ' José ',
        email: 'jose@example.com',
        tradeType: 'Other',
        source: 'someone-else',
        webhookUrl: 'https://evil.example/hook',
        timestamp: '1999-01-01T00:00:00.000Z',
      },
      {
        webhookUrl: 'https://hooks.example/playbook',
        nodeEnv: 'production',
        now: () => Date.parse('2026-11-05T21:00:00.000Z'),
        fetchImpl: async (url, init) => {
          receivedUrl = String(url)
          receivedBody = String(init?.body)
          return jsonResponse(200)
        },
      },
    )

    assert.deepEqual(result, { ok: true, demo: false, captured: true, sent: true })
    assert.equal(receivedUrl, 'https://hooks.example/playbook')
    assert.deepEqual(JSON.parse(receivedBody), {
      name: 'José',
      email: 'jose@example.com',
      tradeType: 'Other',
      source: REVIEW_PLAYBOOK_SOURCE,
      timestamp: '2026-11-05T21:00:00.000Z',
    })
  })

  it('does not claim success when the webhook is missing', async () => {
    let called = false
    const result = await submitReviewPlaybookLead(lead, {
      webhookUrl: '   ',
      nodeEnv: 'production',
      fetchImpl: async () => {
        called = true
        return jsonResponse(200)
      },
    })

    assert.deepEqual(result, { ok: false, status: 503, code: 'unconfigured' })
    assert.equal(called, false)
  })

  it('rejects a non-https webhook in production, including localhost', async () => {
    for (const webhookUrl of ['http://hooks.example/hook', 'http://127.0.0.1:8787/hook', 'javascript:alert(1)']) {
      const result = await submitReviewPlaybookLead(lead, {
        webhookUrl,
        nodeEnv: 'production',
        fetchImpl: async () => jsonResponse(200),
      })
      assert.equal(result.ok, false)
      if (!result.ok) assert.equal(result.code, 'invalid_webhook')
    }
  })

  it('allows a local http mock only outside production', async () => {
    let called = false
    const result = await submitReviewPlaybookLead(lead, {
      webhookUrl: 'http://127.0.0.1:8787/hook',
      nodeEnv: 'development',
      fetchImpl: async (url) => {
        called = true
        assert.equal(url, 'http://127.0.0.1:8787/hook')
        return jsonResponse(204)
      },
    })

    assert.equal(result.ok, true)
    assert.equal(called, true)
  })

  it('sends an optional bearer token and no authorization header when unset', async () => {
    const headers: Array<Record<string, string>> = []
    const fetchImpl: typeof fetch = async (_url, init) => {
      headers.push(init?.headers as Record<string, string>)
      return jsonResponse(200)
    }

    await submitReviewPlaybookLead(lead, {
      webhookUrl: 'https://hooks.example/playbook',
      webhookToken: 'secret-token',
      nodeEnv: 'production',
      fetchImpl,
    })
    resetReviewPlaybookDedupeForTests()
    await submitReviewPlaybookLead(
      { ...lead, email: 'second@example.com' },
      {
        webhookUrl: 'https://hooks.example/playbook',
        webhookToken: '  ',
        nodeEnv: 'production',
        fetchImpl,
      },
    )

    assert.equal(headers[0].Authorization, 'Bearer secret-token')
    assert.equal(headers[1].Authorization, undefined)
  })

  it('reports webhook rejection and network failure without a false success', async () => {
    const rejected = await submitReviewPlaybookLead(lead, {
      webhookUrl: 'https://hooks.example/playbook',
      nodeEnv: 'production',
      fetchImpl: async () => jsonResponse(500),
    })
    assert.deepEqual(rejected, { ok: false, status: 502, code: 'rejected' })

    const unreachable = await submitReviewPlaybookLead(lead, {
      webhookUrl: 'https://hooks.example/playbook',
      nodeEnv: 'production',
      fetchImpl: async () => {
        throw new Error('connect ECONNREFUSED')
      },
    })
    assert.deepEqual(unreachable, { ok: false, status: 502, code: 'unreachable' })
    assert.equal(JSON.stringify(unreachable).includes(lead.email), false)
  })

  it('does not send a second request for the same email inside the duplicate window', async () => {
    let calls = 0
    const fetchImpl: typeof fetch = async () => {
      calls += 1
      return jsonResponse(200)
    }
    const options = {
      webhookUrl: 'https://hooks.example/playbook',
      nodeEnv: 'production',
      now: () => Date.parse('2026-11-05T21:00:00.000Z'),
      fetchImpl,
    }

    const first = await submitReviewPlaybookLead(lead, options)
    const second = await submitReviewPlaybookLead(lead, options)

    assert.equal(first.ok, true)
    assert.deepEqual(second, {
      ok: true,
      demo: false,
      captured: true,
      sent: false,
      duplicate: true,
    })
    assert.equal(calls, 1)
  })

  it('allows another attempt after a failed delivery', async () => {
    let calls = 0
    const fetchImpl: typeof fetch = async () => {
      calls += 1
      return jsonResponse(calls === 1 ? 500 : 200)
    }
    const options = {
      webhookUrl: 'https://hooks.example/playbook',
      nodeEnv: 'production',
      fetchImpl,
    }

    assert.equal((await submitReviewPlaybookLead(lead, options)).ok, false)
    assert.equal((await submitReviewPlaybookLead(lead, options)).ok, true)
    assert.equal(calls, 2)
  })

  it('drops an in-flight duplicate instead of sending twice', async () => {
    let release: (() => void) | undefined
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    let calls = 0
    const pending = submitReviewPlaybookLead(lead, {
      webhookUrl: 'https://hooks.example/playbook',
      nodeEnv: 'production',
      fetchImpl: async () => {
        calls += 1
        await gate
        return jsonResponse(200)
      },
    })

    const duplicate = await submitReviewPlaybookLead(lead, {
      webhookUrl: 'https://hooks.example/playbook',
      nodeEnv: 'production',
      fetchImpl: async () => {
        calls += 1
        return jsonResponse(200)
      },
    })

    assert.deepEqual(duplicate, { ok: false, status: 409, code: 'duplicate' })
    release?.()
    assert.equal((await pending).ok, true)
    assert.equal(calls, 1)
  })

  it('reveals a demo submission without calling the webhook, even when unconfigured', async () => {
    let called = false
    const result = await submitReviewPlaybookLead(
      { ...lead, demo: true },
      {
        webhookUrl: undefined,
        nodeEnv: 'production',
        fetchImpl: async () => {
          called = true
          return jsonResponse(200)
        },
      },
    )

    assert.deepEqual(result, { ok: true, demo: true, captured: false, sent: false })
    assert.equal(called, false)
  })

  it('does not treat a demo string as demo mode', async () => {
    const result = await submitReviewPlaybookLead(
      { ...lead, demo: 'true' },
      { webhookUrl: undefined, nodeEnv: 'production' },
    )
    assert.deepEqual(result, { ok: false, status: 503, code: 'unconfigured' })
  })

  it('does not forward a honeypot submission', async () => {
    let called = false
    const result = await submitReviewPlaybookLead(
      { ...lead, hp: 'https://spam.example' },
      {
        webhookUrl: 'https://hooks.example/playbook',
        nodeEnv: 'production',
        fetchImpl: async () => {
          called = true
          return jsonResponse(200)
        },
      },
    )

    assert.equal(result.ok, false)
    if (!result.ok) assert.equal(result.code, 'ignored')
    assert.equal(called, false)
  })

  it('times out a hanging webhook and does not report success', async () => {
    const result = await submitReviewPlaybookLead(lead, {
      webhookUrl: 'https://hooks.example/playbook',
      nodeEnv: 'production',
      timeoutMs: 20,
      fetchImpl: (_url, init) =>
        new Promise((_resolve, reject) => {
          const timer = setTimeout(() => reject(new Error('fetch should have aborted')), 1000)
          const signal = init?.signal
          const fail = () => {
            clearTimeout(timer)
            reject(signal?.reason ?? new Error('aborted'))
          }
          if (!signal) {
            clearTimeout(timer)
            reject(new Error('missing abort signal'))
            return
          }
          if (signal.aborted) fail()
          else signal.addEventListener('abort', fail, { once: true })
        }),
    })

    assert.deepEqual(result, { ok: false, status: 502, code: 'unreachable' })
  })
})
