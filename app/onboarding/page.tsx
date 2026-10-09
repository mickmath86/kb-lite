import type { Metadata } from 'next'
import { OnboardingFlow } from '@/components/onboarding/flow'
import { cleanDemoUrl, first } from '@/lib/onboarding/url'

export const metadata: Metadata = {
  title: 'Client onboarding | Kickbord',
  description: 'Set up your website, AI receptionist, and review funnel with Kickbord. About 10 minutes, and your progress saves as you go.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

type SP = Record<string, string | string[] | undefined>

const clip = (v: string | undefined, n = 120) => (v ? v.trim().slice(0, n) : '')

/**
 * Query parameters (all optional):
 *   demo        https link to the client's demo site, shown on the website step
 *   first_name, last_name (or name), email, phone, company   prefill the form
 *   plan        launch | grow (echoed in the webhook)
 *   cid         CRM contact id (echoed in the webhook)
 *   t           resume token (added automatically after the first save)
 */
export default async function OnboardingPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams
  const allow = (process.env.ONBOARDING_DEMO_HOST_ALLOWLIST ?? '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
  const demoUrl = cleanDemoUrl(first(sp.demo), allow)

  let firstName = clip(first(sp.first_name))
  let lastName = clip(first(sp.last_name))
  const fullName = clip(first(sp.name))
  if (!firstName && fullName) {
    const parts = fullName.split(/\s+/)
    firstName = parts.shift() ?? ''
    lastName = lastName || parts.join(' ')
  }
  const prefill: Record<string, string> = {}
  if (firstName) prefill.first_name = firstName
  if (lastName) prefill.last_name = lastName
  const email = clip(first(sp.email), 200)
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) prefill.email = email
  const phone = clip(first(sp.phone), 40)
  if (phone) prefill.mobile = phone
  const company = clip(first(sp.company), 200)
  if (company) prefill.company_name = company

  const token = clip(first(sp.t), 100)
  return (
    <OnboardingFlow
      demoUrl={demoUrl}
      prefill={prefill}
      meta={{ plan: clip(first(sp.plan), 60) || undefined, cid: clip(first(sp.cid), 120) || undefined, demo: demoUrl ?? undefined }}
      tokenParam={token.length >= 20 ? token : null}
    />
  )
}
