/** Trade options for the review-request playbook gate. Labels are the stored values. */
export const TRADE_TYPES = [
  'General contractor',
  'Plumber',
  'HVAC',
  'Electrician',
  'Roofer',
  'Garage door',
  'Landscaper',
  'Painter',
  'Pest control',
  'Concrete and masonry',
  'Flooring',
  'Remodeler',
  'Cleaning',
  'Handyman',
  'Other',
] as const

export type TradeType = (typeof TRADE_TYPES)[number]

export function isTradeType(value: string): value is TradeType {
  return (TRADE_TYPES as readonly string[]).includes(value)
}
