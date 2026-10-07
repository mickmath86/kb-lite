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
import { MapPinIcon } from '@/components/icons/map-pin-icon'
import { StarIcon } from '@/components/icons/star-icon'
import { UiLayoutIcon } from '@/components/icons/ui-layout-icon'
import { Building2Icon } from '@/components/icons/building-2-icon'

export const metadata: Metadata = {
  title: 'Local SEO for Contractors | Kickbord',
  description:
    'Show up in the Google map pack when nearby homeowners search for your trade. Kickbord optimizes your Google Business Profile, builds service-area pages, keeps your listings consistent, and feeds Google fresh reviews.',
}

const iconClass = 'size-6 text-olive-500 dark:text-white'

const steps = [
  {
    eyebrow: 'Week 1',
    headline: 'Audit where you stand today',
    body: 'We search your services in each town you work, the way a homeowner would, and see who shows up instead of you.',
    bullets: [
      'Map pack and organic results for your top services and towns',
      'Google Business Profile completeness check',
      'Name, address, and phone consistency across directories',
      'A short list of competitors to beat, and why they rank',
    ],
    image: '/images/local-seo.png',
  },
  {
    eyebrow: 'Weeks 1–2',
    headline: 'Fix your Google Business Profile',
    body: 'Your profile is what shows up in the map pack, so it gets the most attention first.',
    bullets: [
      'Correct primary and secondary categories for your trade',
      'Every service listed with a plain-English description',
      'Service area, hours, photos, and booking link filled in',
      'Q&A seeded with the questions customers actually ask',
    ],
    image: '/images/kb-feature-google-reputation.png',
  },
  {
    eyebrow: 'Weeks 2–3',
    headline: 'Build pages Google can match to searches',
    body: 'One generic “Services” page can’t rank for every job in every town. Your site gets a page for each service and each area you want to win.',
    bullets: [
      'Service pages, like “water heater replacement”',
      'Service-area pages for the towns you actually cover',
      'Titles, headers, and structured data set up correctly',
      'Fast load times and a clear call-to-action on mobile',
    ],
    image: '/images/website.png',
  },
  {
    eyebrow: 'Every month',
    headline: 'Keep the signals fresh',
    body: 'Local rankings reward businesses that stay active. We keep your profile and site moving so you don’t slide back.',
    bullets: [
      'Regular Google posts and new job photos',
      'Steady new reviews from the 5-Star Review Funnel',
      'Directory listings monitored and corrected',
      'A monthly report on calls, direction requests, and rankings',
    ],
    image: '/images/reviews.png',
  },
]

export default function LocalSeoPage() {
  return (
    <>
      <MainNav />
      <HeroTwoColumnWithPhoto
        headline="Show up first when locals search for your trade"
        subheadline={
          <>
            <p>
              When a homeowner searches “plumber near me” or “AC repair in Ventura,” Google shows three businesses in
              the map. We make sure yours is one of them. We optimize your Google Business Profile, build pages for
              every service and town you cover, and keep the reviews and updates coming so you stay there.
            </p>
          </>
        }
        photo={<img src="/images/local-seo.png" alt="Local SEO map pack results" className="h-full w-full" />}
      />

      <StatsWithGraph
        headline="The map pack is where local jobs get won"
        className="overflow-hidden"
        eyebrow="Why Local SEO Matters"
        subheadline="Most local searchers never scroll past the first few results. If you’re not in them, the call goes to someone else."
      >
        <StatGraph stat="42%" text="of local searchers click a result in the Google map pack (Backlinko)" />
        <StatGraph stat="3" text="businesses get the map pack spots on most local searches" />
        <StatGraph stat="76%" text="of people who search for something nearby on their phone visit a business within a day (Google)" />
      </StatsWithGraph>

      <StatsFourColumns
        headline="What’s included"
        eyebrow="Everything Google Looks At"
        subheadline="Local rankings come down to three things: how relevant you are, how close you are, and how trusted you are. We work on all three."
      >
        <Stat
          icon={<MapPinIcon className={iconClass} />}
          stat="Google Business Profile Optimization"
          text="The right categories, every service, your real service area, photos, hours, and booking link. Most contractor profiles are less than half filled in, and it shows in the rankings."
        />
        <Stat
          icon={<UiLayoutIcon className={iconClass} />}
          stat="Service & Service-Area Pages"
          text="A dedicated page for each service and each town you want to rank in, with correct titles, headers, and structured data. Each page is written to turn a visitor into a call."
        />
        <Stat
          icon={<Building2Icon className={iconClass} />}
          stat="Consistent Directory Listings"
          text="Your business name, address, and phone number match everywhere: Google, Apple Maps, Bing, Yelp, Angi, the BBB, and the directories for your trade. Mismatched listings confuse Google and cost you rank."
        />
        <Stat
          icon={<StarIcon className={iconClass} />}
          stat="A Steady Stream of Reviews"
          text="Review count, rating, and how recent your reviews are all affect local rank. Your 5-Star Review Funnel brings in new reviews after every job, and we help you respond to them."
        />
      </StatsFourColumns>

      <FeaturesStackedAlternatingWithDemos
        id="process"
        eyebrow="How It Works"
        headline="From invisible to in the map"
        subheadline="We start with the fixes that move rankings fastest, then keep them moving every month."
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
                    Get a free visibility check <ChevronIcon />
                  </Link>
                }
                demo={
                  <Screenshot
                    wallpaper={(['green', 'blue', 'brown', 'purple'] as const)[i % 4]}
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
        heading="Rankings are nice. Calls are the point."
        description={
          <>
            <p>
              We don’t send you a list of 200 keywords. Each month you get a short report that shows whether local
              search is bringing in work, and what we’re working on next.
            </p>
          </>
        }
      >
        <DescribedStat
          stat="Calls & direction requests"
          text="Straight from your Google Business Profile, so you see how many people contacted you from Google search and Maps."
        />
        <DescribedStat
          stat="Map rankings by town"
          text="Where you show up for your top services in each area you cover, and how that changes month to month."
        />
        <DescribedStat
          stat="Leads in one place"
          text="Calls, forms, and chats from search land in the same pipeline as everything else, so nothing gets lost."
        />
      </StatsThreeColumnWithDescription>

      <TradesGrid
        eyebrow="Who It’s For"
        headline="Built for trades that work a service area"
        subheadline="If customers find you by searching for your service and their town, local SEO is how you get the call."
        trades={['plumber', 'hvac', 'electrician', 'roofer', 'garage', 'landscape']}
      />

      <FAQsTwoColumnAccordion id="faqs" headline="Local SEO questions">
        <Faq
          id="faq-1"
          question="How long does local SEO take to work?"
          answer="Profile fixes and listing cleanup often show movement within a few weeks. Ranking in a competitive area usually takes 3–6 months of steady work. Anyone who promises the #1 spot overnight is guessing."
        />
        <Faq
          id="faq-2"
          question="Can you guarantee a #1 ranking?"
          answer="No, and nobody honestly can. Google decides rankings, and distance from the searcher is part of it. What we promise is the work Google rewards: a complete profile, strong service pages, consistent listings, and fresh reviews."
        />
        <Faq
          id="faq-3"
          question="I don’t have a storefront. Can I still rank in the map?"
          answer="Yes. Service-area businesses can hide their address and list the towns they serve instead. We set that up correctly so you can rank without showing your home address."
        />
        <Faq
          id="faq-4"
          question="Do I need a new website?"
          answer="Not always. If your current site is fast and you can add pages, we can work with it. If it’s slow or hard to update, a Kickbord Functional Website is built for local SEO from day one."
        />
        <Faq
          id="faq-5"
          question="What do you need from me?"
          answer="Access to your Google Business Profile, a list of the services and towns you care most about, and job photos when you have them. We handle the rest."
        />
        <Faq
          id="faq-6"
          question="How is this different from Local Service Ads?"
          answer="Local SEO earns you free placement in the map and organic results over time. Local Service Ads are paid placement at the very top of Google, charged per lead. Many contractors run both: ads for leads now, SEO for leads that keep coming without ad spend."
        />
      </FAQsTwoColumnAccordion>

      <CallToActionSimpleCentered
        id="cta"
        headline="See who’s showing up instead of you"
        subheadline="Book a free 20-minute call. We’ll search your top services in your towns and show you exactly where you rank and what it would take to move up."
        cta={
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/lp/booking" size="lg">
              Book a free call <ArrowNarrowRightIcon />
            </ButtonLink>
            <PlainButtonLink href="/systems/local-service-ads" size="lg">
              Explore Local Service Ads <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
      <FooterMain />
    </>
  )
}
