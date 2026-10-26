export type Range = [number, number]
export type Option = { value: string; label: string }
export type Card = {
  key: string
  kind: 'price' | 'width' | 'choice' | 'multi' | 'tier_names' | 'check'
  eyebrow: string
  title: string
  details: string[]
  question?: string
  price?: number
  range?: Range
  lines?: { label: string; low: number; high: number }[]
  options?: Option[]
  tries?: number
}
export type Summary = {
  systems: { label: string; tiers: { tier: string; range: Range }[] }[]
  sizes: { label: string; range: Range }[]
  mini: { label: string; range: Range }[]
  included: string[]
  extras: { label: string; range: Range }[]
  services: { label: string; range: Range }[]
  unsettled: number
  acpro: { ratio: number; names: { standard: string; enhanced: string; premium: string } | null } | null
  width_pct: number
}
export type View = {
  client: { name: string; status: 'draft' | 'submitted' | 'approved'; test: boolean }
  calibration: { status: 'in_progress' | 'confirmed'; run: number; step: number; can_undo: boolean }
  progress: { done: number; total: number }
  card: Card | null
  summary: Summary | null
  priced?: number
  total?: number
  stale?: boolean
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
  }
}

export async function calibrate(token: string, payload: Record<string, unknown>): Promise<View> {
  let res: Response
  try {
    res = await fetch('/api/estimator-calibrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, ...payload }),
    })
  } catch {
    throw new ApiError('Network problem. Check your connection and try again.', 0)
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(data?.error || 'Something went wrong. Please try again.', res.status)
  return data as View
}
