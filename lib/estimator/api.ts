export type PriceRow = {
  id: string
  section: string
  group_label: string | null
  row_label: string | null
  when_answers: Record<string, string>
  low: number | string | null
  high: number | string | null
  quote_mode: string
}
export type Addon = {
  id: string
  key: string
  label: string
  price_type: 'flat' | 'per_unit' | 'percent' | 'site_visit'
  included: boolean
  low: number | string | null
  high: number | string | null
  notes: string | null
  askable: boolean
}
export type Scenario = {
  id: string
  position: number
  label: string | null
  client_low: number | string | null
  client_high: number | string | null
  client_note: string | null
}
export type Settings = Record<string, any>
export type Loaded = {
  client: { name: string; slug: string; status: 'draft' | 'submitted' | 'approved'; submitted_at: string | null; settings: Settings }
  prices: PriceRow[]
  addons: Addon[]
  scenarios: Scenario[]
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
  }
}

async function call<T>(payload: Record<string, unknown>): Promise<T> {
  let res: Response
  try {
    res = await fetch('/api/estimator-setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new ApiError('Network problem. Check your connection and try again.', 0)
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(data?.error || 'Something went wrong. Please try again.', res.status)
  return data as T
}

export const loadSetup = (token: string) => call<Loaded>({ action: 'load', token })
export const saveSetup = (token: string, changes: Record<string, unknown>) =>
  call<{ ok: true; errors: string[] }>({ action: 'save', token, ...changes })
export const submitSetup = (token: string, changes: Record<string, unknown>) =>
  call<{ ok: true; priced: number; total: number }>({ action: 'submit', token, ...changes })
