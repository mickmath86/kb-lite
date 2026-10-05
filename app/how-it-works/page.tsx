import type { Metadata } from 'next'
import MainNav from '@/components/sections/main-nav'
import FooterMain from '@/components/sections/footer-main'
import { Main } from '@/components/elements/main'
import { FadeInSection } from '@/components/elements/fade-in-section'
import { Screenshot } from '@/components/elements/screenshot'
import { Link } from '@/components/elements/link'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CalendarIcon } from '@/components/icons/calendar-icon'
import { ClipboardIcon } from '@/components/icons/clipboard-icon'
import { RocketIcon } from '@/components/icons/rocket-icon'
import { ClockIcon } from '@/components/icons/clock-icon'
import { TargetIcon } from '@/components/icons/target-icon'
import { LightingBoltIcon } from '@/components/icons/lighting-bolt-icon'
import { ChartLineIcon } from '@/components/icons/chart-line-icon'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'
import { StatsFourColumns, Stat } from '@/components/sections/stats-four-columns'
import {
  FeaturesStackedAlternatingWithDemos,
  Feature as FeatureStacked,
} from '@/components/sections/features-stacked-alternating-with-demos'
import {
  FeatureThreeColumnWithDemos,
  Features as FeaturesThreeColWithDemos,
} from '@/components/sections/features-three-column-with-demos'
import { FeaturesThreeColumn, Feature } from '@/components/sections/features-three-column'
import {
  StatsThreeColumnWithDescription,
  Stat as DescribedStat,
} from '@/components/sections/stats-three-column-with-description'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'

export const metadata: Metadata = {
  title: 'How It Works | Kickbord',
  description:
    'From a 20-minute call to a fully built lead system in about two weeks. See exactly how Kickbord sets up your website, AI receptionist, reviews, and Google visibility.',
}

const steps = [
  {
    id: 'step-1',
    headline: 'Step 1 — Demo Call',
    timeframe: '20 minutes',
    body: 'We learn how your business runs: the jobs you want more of, your service area, how leads reach you today, and where they slip through. You leave with a clear picture of which systems make sense — no generic pitch.',
    bullets: ['Walk through your current lead flow', 'Pick the systems that fit', 'Get a realistic timeline'],
    cta: { href: '/lp/booking', label: 'Book your call' },
    image: '/images/zoom-call.png',
    width: 1672,
    height: 941,
  },
  {
    id: 'step-2',
    headline: 'Step 2 — Onboarding',
    timeframe: 'Day 1 · about 10 minutes',
    body: 'A short form collects everything we need to build: your business info, logo and photos, services, service area, and how you want new leads handled. We take care of the accounts, connections, and setup behind the scenes.',
    bullets: ['Business details and brand assets', 'Services, pricing approach, and hours', 'Who gets notified, and how'],
    cta: { href: '/get-started', label: 'See what we ask' },
    image: '/images/kb-feature-marketing-strategy.png',
    width: 1536,
    height: 1024,
  },
  {
    id: 'step-3',
    headline: 'Step 3 — Build & Configure',
    timeframe: 'Days 2–10',
    body: 'We build your website, train your AI receptionist on your business, connect your phone and forms, and set up the follow-up, review, and campaign automations. If you’re adding Google Local Service Ads, we start verification on day one so it runs in parallel.',
    bullets: ['Website, chat, and forms', 'AI receptionist on your existing number', 'Follow-up and review automations'],
    cta: { href: '#systems', label: 'See what we build' },
    image: '/images/build.png',
    width: 1671,
    height: 941,
  },
  {
    id: 'step-4',
    headline: 'Step 4 — Review & Approve',
    timeframe: 'Days 10–14',
    body: 'Nothing goes live without your sign-off. You click through the site, text the chatbot, call the receptionist, and read the follow-up messages. We adjust until it sounds like you.',
    bullets: ['Test every piece yourself', 'Request changes in plain English', 'Approve when it’s right'],
    cta: { href: '#faqs', label: 'Common questions' },
    image: '/images/website.png',
    width: 1448,
    height: 1086,
  },
  {
    id: 'step-5',
    headline: 'Step 5 — Launch & Optimize',
    timeframe: 'About week 2, then ongoing',
    body: 'Your system goes live and starts working the same day: missed calls get answered, every form gets an instant reply, and finished jobs get review requests. From there, we watch the numbers and keep tuning.',
    bullets: ['Live dashboard of every lead', 'Monthly performance check-ins', 'Ongoing tweaks as you grow'],
    cta: { href: '/lp/booking', label: 'Get started' },
    image: '/images/review.png',
    width: 1672,
    height: 941,
  },
]

const systems = [
  {
    headline: 'Functional Website',
    body: 'A fast, mobile-first site with chat, quote forms, and instant text follow-up.',
    href: '/systems/functional-website',
    image: '/images/website.png',
    wallpaper: 'blue' as const,
  },
  {
    headline: 'Fallback AI Receptionist',
    body: 'Answers on your existing number when you can’t, and books the job.',
    href: '/systems/ai-receptionist',
    image: '/images/ai-receptionist.png',
    wallpaper: 'purple' as const,
  },
  {
    headline: '5-Star Review Funnel',
    body: 'Automatic review requests the moment a job is marked done.',
    href: '/systems/5-star-review-funnel',
    image: '/images/reviews.png',
    wallpaper: 'brown' as const,
  },
  {
    headline: 'Local SEO',
    body: 'Show up on page one when nearby customers search for your service.',
    href: '/systems/local-seo',
    image: '/images/local-seo.png',
    wallpaper: 'green' as const,
  },
  {
    headline: 'One-Click Campaigns',
    body: 'Text or email your past customers in one click to fill a slow week.',
    href: '/systems/one-click-campaigns',
    image: '/images/oc-marketing.png',
    wallpaper: 'blue' as const,
  },
  {
    headline: 'Google Local Service Ads',
    body: 'Top-of-Google placement with the Guaranteed badge. Pay per real lead.',
    href: '/systems/local-service-ads',
    image: '/images/lsa.png',
    wallpaper: 'green' as const,
  },
]

const iconClass = 'size-6 text-olive-500 dark:text-white'

export default function HowItWorksPage() {
  return (
    <>
      <MainNav />

      <Main>
        {/* 1. Hero */}
        <HeroLeftAlignedWithDemo
          id="hero"
          eyebrow="How it works"
          headline="From first call to fully booked in about two weeks."
          subheadline={
            <p>
              You run the jobs. We build and run the system that brings them in — website, AI receptionist, reviews,
              and Google visibility, all connected so no lead goes cold. Here’s exactly what happens, and how little
              of your time it takes.
            </p>
          }
          cta={
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="/lp/booking" size="lg">
                Book a free call <ArrowNarrowRightIcon />
              </ButtonLink>
              <PlainButtonLink href="#process" size="lg">
                See the steps <ChevronIcon />
              </PlainButtonLink>
            </div>
          }
          demo={
            <Screenshot wallpaper="green" placement="bottom">
              <img
                src="/images/kickbord_system.png"
                alt="Diagram of the Kickbord system: leads from your website, chat, phone, and forms flow into one contact database, trigger instant follow-up, and report back to a dashboard."
                width={2960}
                height={1936}
              />
            </Screenshot>
          }
        />

        {/* 2. Your time, by the numbers */}
        <FadeInSection delay={100}>
          <StatsFourColumns
            id="your-time"
            eyebrow="Built for busy crews"
            headline="Your part takes about 30 minutes."
            subheadline="We do the building, the setup, and the tuning. Here’s what we actually need from you."
          >
            <Stat
              icon={<CalendarIcon className={iconClass} />}
              stat="20-minute call"
              text="One conversation so we understand your business, your customers, and your goals."
            />
            <Stat
              icon={<ClipboardIcon className={iconClass} />}
              stat="10-minute form"
              text="Your business details, brand assets, and how you want leads handled. That’s it."
            />
            <Stat
              icon={<RocketIcon className={iconClass} />}
              stat="About 2 weeks"
              text="From onboarding to live, including your review and approval of everything we build."
            />
            <Stat
              icon={<ClockIcon className={iconClass} />}
              stat="0 hours a week"
              text="Once it’s live, the system runs itself. You just answer the jobs it books."
            />
          </StatsFourColumns>
        </FadeInSection>

        {/* 3. The process */}
        <FadeInSection delay={100}>
          <FeaturesStackedAlternatingWithDemos
            id="process"
            eyebrow="The process"
            headline="Five steps from kickoff to live."
            subheadline="A clear path with no surprises. You approve everything before it goes live."
            features={
              <>
                {steps.map((step, i) => (
                  <FeatureStacked
                    key={step.id}
                    id={step.id}
                    headline={
                      <>
                        <span className="block text-sm/7 font-semibold text-olive-600 dark:text-olive-400">
                          {step.timeframe}
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
                      <Link href={step.cta.href}>
                        {step.cta.label} <ChevronIcon />
                      </Link>
                    }
                    demo={
                      <Screenshot
                        wallpaper={(['green', 'blue', 'brown', 'purple', 'green'] as const)[i]}
                        placement={i % 2 === 0 ? 'bottom-right' : 'bottom-left'}
                      >
                        <img src={step.image} alt="" width={step.width} height={step.height} />
                      </Screenshot>
                    }
                  />
                ))}
              </>
            }
          />
        </FadeInSection>

        {/* 4. What we build */}
        <FadeInSection delay={100}>
          <FeaturesThreeColWithDemos
            id="systems"
            eyebrow="What we build"
            headline="Six systems. One connected pipeline."
            subheadline="Start with the pieces you need most and add more as you grow. Every system feeds the same place, so nothing falls through the cracks."
            features={
              <>
                {systems.map((s) => (
                  <FeatureThreeColumnWithDemos
                    key={s.href}
                    demo={
                      <Screenshot wallpaper={s.wallpaper} placement="bottom-right">
                        <img src={s.image} alt="" width={1448} height={1086} />
                      </Screenshot>
                    }
                    headline={s.headline}
                    subheadline={
                      <>
                        <p>{s.body}</p>
                        <Link href={s.href} className="mt-2">
                          Learn more <ChevronIcon />
                        </Link>
                      </>
                    }
                  />
                ))}
              </>
            }
          />
        </FadeInSection>

        {/* 5. How the pieces connect */}
        <FadeInSection delay={100}>
          <FeaturesThreeColumn
            id="connected"
            eyebrow="Under the hood"
            headline="How the pieces work together"
            subheadline="Every call, text, chat, and form lands in one place and triggers the right next step — automatically, in seconds."
            features={
              <>
                <Feature
                  icon={<TargetIcon />}
                  headline="1. Every lead is captured"
                  subheadline={
                    <p>
                      Website visits, chat messages, quote forms, Google, ads, and phone calls — including the ones you
                      can’t pick up. Every channel feeds one contact record with the full history on a single timeline.
                    </p>
                  }
                />
                <Feature
                  icon={<LightingBoltIcon />}
                  headline="2. The system responds in seconds"
                  subheadline={
                    <p>
                      Missed calls get a text back, forms get an instant reply, and your team gets an SMS alert — before
                      the customer calls the next name on Google. After the job, a review request goes out on its own.
                    </p>
                  }
                />
                <Feature
                  icon={<ChartLineIcon />}
                  headline="3. You see what’s working"
                  subheadline={
                    <p>
                      A simple dashboard shows leads, response times, and booked jobs by channel, so you know exactly
                      where your work is coming from and what it’s worth.
                    </p>
                  }
                />
              </>
            }
          />
        </FadeInSection>

        {/* 6. After launch */}
        <FadeInSection delay={100}>
          <StatsThreeColumnWithDescription
            id="after-launch"
            heading="Launch is the starting line."
            description={
              <>
                <p>
                  Most marketing vendors hand you a login and disappear. We stay on it. Your system gets better the
                  longer it runs, because we keep watching the numbers and tuning what isn’t pulling its weight.
                </p>
              </>
            }
          >
            <DescribedStat
              stat="Every conversation, visible"
              text="Call recordings, transcripts, and text threads in one place. Nothing happens behind your back."
            />
            <DescribedStat
              stat="Monthly check-ins"
              text="A plain-English look at leads, booked jobs, reviews, and what we’re adjusting next."
            />
            <DescribedStat
              stat="Ongoing tuning"
              text="New services, seasonal promos, updated hours — tell us and we update the system for you."
            />
          </StatsThreeColumnWithDescription>
        </FadeInSection>

        {/* 7. FAQs */}
        <FadeInSection delay={100}>
          <FAQsTwoColumnAccordion id="faqs" headline="Questions about the process">
            <Faq
              id="faq-1"
              question="How long until I’m live?"
              answer="Most clients are live in about two weeks: onboarding on day one, build on days 2–10, then your review and approval. If you’re adding Google Local Service Ads, Google’s verification can take 1–4 weeks. We start it on day one so it runs alongside your build, and the ads switch on as soon as Google clears you."
            />
            <Faq
              id="faq-2"
              question="What do you need from me?"
              answer="A 20-minute call and a 10-minute onboarding form with your business details, logo and photos, services, service area, and how you want leads handled. After that, we just need you to review and approve before launch."
            />
            <Faq
              id="faq-3"
              question="Do I have to change my phone number or website?"
              answer="No. The AI receptionist works on your existing number and only picks up when you can’t. If you have a site you like, we can connect the lead system to it. If it’s costing you jobs, we’ll build you a new one."
            />
            <Faq
              id="faq-4"
              question="What if I don’t like how something sounds?"
              answer="Nothing goes live until you approve it. You test the chatbot, call the receptionist, and read every follow-up message during the review step. Tell us what to change in plain English and we’ll adjust it."
            />
            <Faq
              id="faq-5"
              question="Do I need to learn new software?"
              answer="No. You’ll get text alerts for new leads and access to a simple dashboard if you want to see everything in one place. We handle all of the setup and maintenance."
            />
            <Faq
              id="faq-6"
              question="Can I start with one system and add more later?"
              answer="Yes. Many clients start with a website and missed-call follow-up, then add reviews, campaigns, or Local Service Ads once the basics are working. Everything plugs into the same system."
            />
            <Faq
              id="faq-7"
              question="What happens if I cancel?"
              answer="There are no long-term contracts. Your Google Business Profile and every review you’ve earned stay with you."
            />
          </FAQsTwoColumnAccordion>
        </FadeInSection>

        {/* 8. CTA */}
        <FadeInSection delay={100}>
          <CallToActionSimpleCentered
            id="cta"
            headline="Your crew does the work. The system brings the jobs."
            subheadline="Book a 20-minute call. We’ll map out your system and give you a realistic timeline to launch."
            cta={
              <div className="flex flex-wrap items-center justify-center gap-4">
                <ButtonLink href="/lp/booking" size="lg">
                  Book a free call <ArrowNarrowRightIcon />
                </ButtonLink>
                <PlainButtonLink href="/get-started" size="lg">
                  Get started <ChevronIcon />
                </PlainButtonLink>
              </div>
            }
          />
        </FadeInSection>
      </Main>

      <FooterMain />
    </>
  )
}
