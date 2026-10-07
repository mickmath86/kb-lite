import type { Metadata } from 'next'
import MainNav from '@/components/sections/main-nav'
import FooterMain from '@/components/sections/footer-main'
import { HeroTwoColumnWithPhoto } from '@/components/sections/hero-two-column-with-photo'
import { StatsWithGraph, Stat as StatGraph } from '@/components/sections/stats-with-graph'
import { StatsFourColumns, Stat } from '@/components/sections/stats-four-columns'
import {
  FeaturesStackedAlternatingWithDemos,
  Feature as FeatureStacked,
} from '@/components/sections/features-stacked-alternating-with-demos'
import {
  StatsThreeColumnWithDescription,
  Stat as DescribedStat,
} from '@/components/sections/stats-three-column-with-description'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { TradesGrid } from '@/components/sections/trades-grid'
import { Screenshot } from '@/components/elements/screenshot'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { BanknotesIcon } from '@/components/icons/banknotes-icon'
import { LightingBoltIcon } from '@/components/icons/lighting-bolt-icon'
import { ShieldExclamationIcon } from '@/components/icons/shield-exclamation-icon'

export const metadata: Metadata = {
  title: 'Google Local Services Ads Management | Kickbord',
  description:
    'Get placed at the very top of Google with the Google Verified badge and pay only for real leads, not clicks. Kickbord handles verification, setup, budget, lead disputes, and makes sure every lead gets answered fast.',
}

const iconClass = 'size-6 text-olive-500 dark:text-white'

const steps = [
  {
    eyebrow: 'Day 1',
    headline: 'We start Google verification right away',
    body: 'Google screens every business before its ads can run. That can take a few weeks, so we start on day one while the rest of your system is being built.',
    bullets: [
      'Business registration and license details',
      'Identity verification for the owner',
      'Service categories, service area, and hours',
      'Reviews brought in to meet Google’s requirements',
    ],
    image: '/images/lsa.png',
  },
  {
    eyebrow: 'Before launch',
    headline: 'Set up to bring in the jobs you want',
    body: 'An LSA profile that lists every job type brings in every kind of lead. We set yours up around the work you actually want, in the towns you actually serve.',
    bullets: [
      'Job types turned on or off to match your best work',
      'Service area set by town or ZIP code',
      'Weekly budget and bidding set to your lead goals',
      'Profile photos, business bio, and highlights filled in',
    ],
    image: '/images/kb-feature-google-reputation.png',
  },
  {
    eyebrow: 'Every lead',
    headline: 'Answered in seconds, every time',
    body: 'Google says regularly missing calls or not replying to messages can hurt your ad ranking. Your AI receptionist and instant text-back make sure no LSA lead goes cold.',
    bullets: [
      'Calls answered on your number when you can’t pick up',
      'Message leads get an instant reply',
      'Bookings go straight to your calendar',
      'Every lead lands in your Kickbord pipeline',
    ],
    image: '/images/ai-receptionist.png',
  },
  {
    eyebrow: 'Every week',
    headline: 'Managed so your budget goes to real jobs',
    body: 'We watch your leads and adjust your budget, job types, and service area so you get more of the work you want and less of what you don’t.',
    bullets: [
      'Bad or off-target leads reported to Google for credit',
      'Budget and bids adjusted to your lead goals',
      'Fresh reviews from the 5-Star Review Funnel to help ranking',
      'A plain-English monthly report on cost per lead and booked jobs',
    ],
    image: '/images/reviews.png',
  },
]

export default function LocalServiceAdsPage() {
  return (
    <>
      <MainNav />
      <HeroTwoColumnWithPhoto
        headline="Top of Google. Pay only for real leads."
        subheadline={
          <>
            <p>
              Google Local Services Ads put your business at the very top of the search results, with your reviews and
              the Google Verified badge right next to your name. You don’t pay for clicks. You pay when a customer
              calls, messages, or books with you through the ad. We handle verification, setup, budget, and lead
              disputes, and make sure every lead gets answered.
            </p>
          </>
        }
        photo={<img src="/images/lsa.png" alt="Google Local Services Ads with Google Verified badge" className="h-full w-full" />}
      />

      <StatsWithGraph
        headline="The first thing a homeowner sees"
        className="overflow-hidden"
        eyebrow="Why Local Services Ads"
        subheadline="When someone searches for your trade, Local Services Ads show up at the top of Google, above everyone else."
      >
        <StatGraph stat="#1" text="placement on the page: Local Services Ads show at the top of Google Search for your service area" />
        <StatGraph stat="$0" text="for clicks or views. You only pay for leads from customers who contact you through the ad." />
        <StatGraph stat="1–4 wks" text="typical Google verification time, which we start on day one so it runs alongside your build" />
      </StatsWithGraph>

      <StatsFourColumns
        headline="Why contractors choose LSA over regular ads"
        eyebrow="Built for Local Service Businesses"
        subheadline="Regular Google Ads charge you every time someone clicks, whether they call or not. Local Services Ads charge only when a customer reaches out."
      >
        <Stat
          icon={<BanknotesIcon className={iconClass} />}
          stat="Pay Per Lead, Not Per Click"
          text="You’re charged for a phone call, message, or booking from a potential customer. You set a weekly budget and Google won’t go past your monthly max."
        />
        <Stat
          icon={<CheckmarkIcon className={iconClass} />}
          stat="The Google Verified Badge"
          text="Businesses that pass Google’s screening get a Google Verified badge on their ad and profile. It tells first-time customers Google has checked you out."
        />
        <Stat
          icon={<ShieldExclamationIcon className={iconClass} />}
          stat="Credits for Bad Leads"
          text="Google doesn’t charge for leads it finds invalid, and you can report poor-quality leads for review. We check your leads and report the bad ones for you."
        />
        <Stat
          icon={<LightingBoltIcon className={iconClass} />}
          stat="Answered Leads Rank Higher"
          text="Google says regularly missing calls or messages can hurt your ad ranking. With your AI receptionist and instant text-back, LSA leads get answered even when you’re on a job."
        />
      </StatsFourColumns>

      <FeaturesStackedAlternatingWithDemos
        id="process"
        eyebrow="How It Works"
        headline="We run the whole thing for you"
        subheadline="Google’s setup process is slow and confusing. We do it for you, then manage your ads so your budget goes to jobs you actually want."
        features={
          <>
            {steps.map((step, i) => (
              <FeatureStacked
                key={step.headline}
                headline={
                  <>
                    <span className="block text-sm/7 font-semibold text-olive-600 dark:text-olive-400">
                      {step.eyebrow}
                    </span>
                    {step.headline}
                  </>
                }
                subheadline={
                  <>
                    <p>{step.body}</p>
                    <ul>
                      {step.bullets.map((b) => (
                        <li key={b} className="list-inside list-disc">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </>
                }
                cta={
                  <Link href="/lp/booking">
                    Check if LSA is available for your trade <ChevronIcon />
                  </Link>
                }
                demo={
                  <Screenshot
                    wallpaper={(['green', 'blue', 'purple', 'brown'] as const)[i % 4]}
                    placement={i % 2 === 0 ? 'bottom-right' : 'bottom-left'}
                  >
                    <img src={step.image} alt="" width={1448} height={1086} />
                  </Screenshot>
                }
              />
            ))}
          </>
        }
      />

      <StatsThreeColumnWithDescription
        heading="Two separate costs, both up front"
        description={
          <>
            <p>
              Our fee covers setup, verification, and ongoing management. Your ad budget is paid to Google directly,
              and you control it. For most contractors, a starting budget falls between $300 and $1,000 a month,
              depending on trade and market. We’ll recommend a number on our call.
            </p>
          </>
        }
      >
        <DescribedStat stat="You own the account" text="The Local Services Ads account is in your name. If you ever leave, your profile, reviews, and badge stay with you." />
        <DescribedStat stat="You set the budget" text="Raise it in busy season, lower it when you’re booked out, or pause it anytime." />
        <DescribedStat stat="You see every lead" text="Every call, message, and booking is tracked, so you know what each lead and each job cost." />
      </StatsThreeColumnWithDescription>

      <TradesGrid
        eyebrow="Who It’s For"
        headline="Available for most home service trades"
        subheadline="Local Services Ads are offered for dozens of home service categories in the U.S. Here are a few we set up most often."
        trades={['plumber', 'hvac', 'electrician', 'roofer', 'garage', 'pestControl']}
      />

      <FAQsTwoColumnAccordion id="faqs" headline="Local Services Ads questions">
        <Faq
          id="faq-1"
          question="How much does a lead cost?"
          answer="Google sets lead prices, and they vary by trade, location, job type, and whether the lead is a call, message, or booking. We’ll look up typical costs for your trade and area before you spend anything."
        />
        <Faq
          id="faq-2"
          question="How long does verification take?"
          answer="Usually 1–4 weeks, and Google controls the timeline. We start on day one and gather everything Google asks for so there are no delays on our end."
        />
        <Faq
          id="faq-3"
          question="What happened to the Google Guaranteed badge?"
          answer="Google now uses the Google Verified badge for Local Services Ads. It shows customers that your business passed Google’s screening, along with the checks you completed."
        />
        <Faq
          id="faq-4"
          question="What if I get a bad lead?"
          answer="Google doesn’t charge for leads it decides are invalid, and it can credit leads later if they turn out to be low quality. You can also report a bad lead through its feedback survey. We review your leads and report the ones that don’t fit."
        />
        <Faq
          id="faq-5"
          question="Can I run LSA and Local SEO together?"
          answer="Yes, and most contractors should. LSA gets you leads right away at the very top of the page. Local SEO builds free placement in the map over time. Both use the same reviews, so each one makes the other stronger."
        />
        <Faq
          id="faq-6"
          question="Do I need reviews to start?"
          answer="Some categories need a minimum number of reviews before your ads can run. Your 5-Star Review Funnel helps you get there fast, and more good reviews help your ads rank."
        />
      </FAQsTwoColumnAccordion>

      <CallToActionSimpleCentered
        id="cta"
        headline="Get to the top of Google this month"
        subheadline="Book a free 20-minute call. We’ll check if your trade and area qualify, estimate lead costs, and start verification right away."
        cta={
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/lp/booking" size="lg">
              Book a free call <ArrowNarrowRightIcon />
            </ButtonLink>
            <PlainButtonLink href="/systems/local-seo" size="lg">
              Explore Local SEO <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
      <FooterMain />
    </>
  )
}
