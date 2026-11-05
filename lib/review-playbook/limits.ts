export const RATE_WINDOW_MS = 10 * 60 * 1000
export const IP_LIMIT = 8
export const EMAIL_LIMIT = 5
export const ACCEPT_TTL_MS = 30 * 60 * 1000
export const MAX_BODY_CHARS = 4_000

export type LimitStore = {
  ipHits: Map<string, number[]>
  emailHits: Map<string, number[]>
  inflight: Set<string>
  accepted: Map<string, number>
}

export function createLimitStore(): LimitStore {
  return {
    ipHits: new Map(),
    emailHits: new Map(),
    inflight: new Set(),
    accepted: new Map(),
  }
}

/** Best-effort limiter for this server process. A restart or another instance starts fresh. */
export const reviewPlaybookLimits = createLimitStore()

function fresh(stamps: number[] | undefined, now: number): number[] {
  if (!stamps) return []
  return stamps.filter((stamp) => now - stamp < RATE_WINDOW_MS)
}

function trim(map: Map<string, number[]>, now: number) {
  if (map.size <= 1000) return
  for (const [key, stamps] of map) {
    if (fresh(stamps, now).length === 0) map.delete(key)
  }
}

export function allowRequest(store: LimitStore, ip: string, emailKey: string, now: number): boolean {
  const ipTimes = fresh(store.ipHits.get(ip), now)
  const emailTimes = fresh(store.emailHits.get(emailKey), now)
  if (ipTimes.length >= IP_LIMIT || emailTimes.length >= EMAIL_LIMIT) {
    store.ipHits.set(ip, ipTimes)
    store.emailHits.set(emailKey, emailTimes)
    return false
  }
  ipTimes.push(now)
  emailTimes.push(now)
  store.ipHits.set(ip, ipTimes)
  store.emailHits.set(emailKey, emailTimes)
  trim(store.ipHits, now)
  trim(store.emailHits, now)
  return true
}

export function wasAccepted(store: LimitStore, emailKey: string, now: number): boolean {
  const at = store.accepted.get(emailKey)
  if (at === undefined) return false
  if (now - at > ACCEPT_TTL_MS) {
    store.accepted.delete(emailKey)
    return false
  }
  return true
}

export function markAccepted(store: LimitStore, emailKey: string, now: number) {
  store.accepted.set(emailKey, now)
  if (store.accepted.size <= 1000) return
  for (const [key, at] of store.accepted) {
    if (now - at > ACCEPT_TTL_MS) store.accepted.delete(key)
  }
}
