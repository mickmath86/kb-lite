import type { ReactNode } from 'react'
import { ButtonLink } from '../elements/button'
import { Section } from '../elements/section'
import { PricingSingleTierTwoColumn } from './pricing-single-tier-two-column'

const plans = [
  {
    headline: 'Starter — ads running, profile cleaned up',
    subheadline:
      'The simplest way to start showing up where homeowners are already searching. We set up and manage your Local Service Ads and give your Google Business Profile a one-time cleanup.',
    price: '$250',
    period: '/mo',
    features: [
      'Local Service Ads setup and management',
      'One-time Google Business Profile cleanup',
      'Monthly check-in on ad performance',
      '$400 one-time setup',
    ],
  },
  {
    headline: 'Grow — your reputation, working for you',
    subheadline:
      'The full Google Business Profile and reputation package. Reviews go out automatically, AI writes the replies, and you see exactly where you rank — no website required.',
    price: '$597',
    period: '/mo',
    features: [
      'Automated review requests after every job',
      'AI review replies and bad-review alerts',
      'GBP posts and photos',
      'Local ranking maps and AI search reports',
      'Competitor analysis',
      'Add LSA for $200/mo · $400 one-time setup',
    ],
  },
  {
    headline: 'Expand — the whole front office, handled',
    subheadline:
      'Google profile, reputation, website, and an AI receptionist answering every call — one plan, fully set up for you. Larger operations get a custom quote.',
    price: '$799',
    period: '/mo + usage',
    features: [
      'Everything in Grow — GBP, reputation, ranking maps, and reports',
      'Kickbord website that books jobs',
      'AI backup receptionist answering 24/7',
      'Missed-call text-back',
      'New business line included',
      '$400 one-time setup',
    ],
  },
]

export function KickbordPricing({
  ctaHref,
  eyebrow,
  headline,
}: {
  ctaHref: string
  eyebrow?: ReactNode
  headline?: ReactNode
}) {
  return (
    <>
      {headline && <Section eyebrow={eyebrow} headline={headline} className="pb-0" />}
      {plans.map((plan) => (
        <PricingSingleTierTwoColumn
          key={plan.price}
          headline={plan.headline}
          subheadline={<p>{plan.subheadline}</p>}
          price={plan.price}
          period={plan.period}
          features={plan.features}
          cta={
            <ButtonLink href={ctaHref} size="lg">
              Get your free Google profile audit
            </ButtonLink>
          }
        />
      ))}
    </>
  )
}
