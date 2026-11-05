export const TRADES = [
  'HVAC',
  'Plumbing',
  'Electrical',
  'Roofing',
  'Painting',
  'Landscaping',
  'Lawn care',
  'Pest control',
  'Cleaning',
  'Garage doors',
  'Windows and doors',
  'Flooring',
  'Concrete and masonry',
  'Fencing',
  'General contracting',
  'Remodeling',
  'Handyman',
  'Pool and spa',
  'Appliance repair',
  'Other',
] as const

export type Trade = (typeof TRADES)[number]

export type FieldName = 'name' | 'email' | 'trade'

export type Submission = {
  name: string
  email: string
  trade: Trade
}

export const FIELD_SUMMARY =
  'Check the fields below. The playbook stays locked until the form is accepted.'

const TRADE_SET = new Set<string>(TRADES)

export type PlaybookBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'steps'; items: string[] }
  | { type: 'template'; label: string; subject?: string; body: string }
  | { type: 'note'; title: string; text: string }
  | { type: 'link'; href: '/contact'; label: string; text: string }

export type PlaybookSection = {
  id: string
  number: string
  title: string
  blocks: PlaybookBlock[]
}

export type PlaybookDocument = {
  title: string
  dek: string
  sections: PlaybookSection[]
}

function isString(value: unknown, max: number): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= max
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.length <= 12 && value.every((item) => isString(item, 500))
}

function isBlock(value: unknown): value is PlaybookBlock {
  if (!value || typeof value !== 'object') return false
  const block = value as { type?: unknown; text?: unknown; items?: unknown; label?: unknown; subject?: unknown; body?: unknown; title?: unknown; href?: unknown }
  if (block.type === 'paragraph') return isString(block.text, 1200)
  if (block.type === 'note') return isString(block.title, 160) && isString(block.text, 1200)
  if (block.type === 'list' || block.type === 'steps') return isStringList(block.items)
  if (block.type === 'template') {
    if (!isString(block.label, 120) || !isString(block.body, 2000)) return false
    return block.subject === undefined || isString(block.subject, 200)
  }
  if (block.type === 'link') {
    return block.href === '/contact' && isString(block.label, 80) && isString(block.text, 400)
  }
  return false
}

export function isPlaybookDocument(value: unknown): value is PlaybookDocument {
  if (!value || typeof value !== 'object') return false
  const doc = value as Partial<PlaybookDocument>
  if (!isString(doc.title, 160) || !isString(doc.dek, 600) || !Array.isArray(doc.sections)) return false
  if (doc.sections.length < 1 || doc.sections.length > 20) return false
  return doc.sections.every((section) => {
    if (!section || typeof section !== 'object') return false
    if (!isString(section.id, 40) || !/^[\w-]+$/.test(section.id)) return false
    if (!isString(section.number, 8) || !isString(section.title, 120)) return false
    return Array.isArray(section.blocks) && section.blocks.length > 0 && section.blocks.length <= 12 && section.blocks.every(isBlock)
  })
}

export function validateSubmission(input: {
  name: unknown
  email: unknown
  trade: unknown
}): { ok: true; value: Submission } | { ok: false; fields: Partial<Record<FieldName, string>> } {
  const fields: Partial<Record<FieldName, string>> = {}

  const name = typeof input.name === 'string' ? input.name.trim().replace(/\s+/g, ' ') : ''
  if (!name || name.length < 2 || name.length > 80 || /[\u0000-\u001F\u007F]/.test(name) || !/\p{L}/u.test(name)) {
    fields.name = name ? 'Enter your name using 2 to 80 characters.' : 'Enter your name.'
  }

  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  if (
    email.length < 6 ||
    email.length > 254 ||
    /[\s<>]/.test(email) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    fields.email = 'Enter a valid email address.'
  }

  const trade = typeof input.trade === 'string' ? input.trade.trim() : ''
  if (!TRADE_SET.has(trade)) {
    fields.trade = 'Select the trade that fits your business.'
  }

  if (fields.name || fields.email || fields.trade) return { ok: false, fields }
  return { ok: true, value: { name, email, trade: trade as Trade } }
}
