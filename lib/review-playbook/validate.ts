import { isTradeType, type TradeType } from './trades'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type FieldErrors = Partial<Record<'name' | 'email' | 'tradeType', string>>

export type ValidLead = {
  name: string
  email: string
  tradeType: TradeType
}

function stripControls(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, '')
}

export function validateLead(input: {
  name: unknown
  email: unknown
  tradeType: unknown
}): { ok: true; lead: ValidLead } | { ok: false; fieldErrors: FieldErrors } {
  const fieldErrors: FieldErrors = {}

  const name = typeof input.name === 'string' ? stripControls(input.name).trim() : ''
  if (name.length < 2 || name.length > 80 || !/\p{L}/u.test(name)) {
    fieldErrors.name = 'Enter your name.'
  }

  const email = typeof input.email === 'string' ? stripControls(input.email).trim() : ''
  if (email.length > 120 || !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = 'Enter a valid email address.'
  }

  const tradeType = typeof input.tradeType === 'string' ? input.tradeType.trim() : ''
  if (!isTradeType(tradeType)) {
    fieldErrors.tradeType = 'Select your trade.'
  }

  if (fieldErrors.name || fieldErrors.email || fieldErrors.tradeType) {
    return { ok: false, fieldErrors }
  }

  return {
    ok: true,
    lead: {
      name,
      email,
      tradeType: tradeType as TradeType,
    },
  }
}
