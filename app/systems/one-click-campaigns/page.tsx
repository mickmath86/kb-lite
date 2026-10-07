import type { Metadata } from 'next'
import MainNav from '@/components/sections/main-nav'
import FooterMain from '@/components/sections/footer-main'
import { HeroTwoColumnWithPhoto } from '@/components/sections/hero-two-column-with-photo'
import { StatsWithGraph, Stat as StatGraph } from '@/components/sections/stats-with-graph'
import { StatsFourColumns, Stat } from '@/components/sections/stats-four-columns'
import { FeaturesThreeColumn, Feature } from '@/components/sections/features-three-column'
import {
  FeaturesStackedAlternatingWithDemos,
  Feature as FeatureStacked,
} from '@/components/sections/features-stacked-alternating-with-demos'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { TradesGrid } from '@/components/sections/trades-grid'
import { Screenshot } from '@/components/elements/screenshot'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { TagIcon } from '@/components/icons/tag-icon'
import { CalendarIcon } from '@/components/icons/calendar-icon'
import { RepeatIcon } from '@/components/icons/repeat-icon'
import { ClipboardIcon } from '@/components/icons/clipboard-icon'
import { HeartIcon } from '@/components/icons/heart-icon'
import { SunIcon } from '@/components/icons/sun-icon'
import { UserCircleIcon } from '@/components/icons/user-circle-icon'
import { ChatBubbleCircleIcon } from '@/components/icons/chat-bubble-circle-icon'
import { FilterIcon } from '@/components/icons/filter-icon'
import { ChartLineIcon } from '@/components/icons/chart-line-icon'

export const metadata: Metadata = {
  title: 'One-Click Marketing Campaigns for Contractors | Kickbord',
  description:
    'Fill a slow week by texting or emailing your past customers in one click. Ready-made seasonal, maintenance, and win-back campaigns, written for your trade. Replies come back to you as new leads.',
}

const iconClass = 'size-6 text-olive-500 dark:text-white'

const steps = [
  {
    eyebrow: 'Step 1',
    headline: 'Your customer list, organized',
    body: 'We bring in your past customers and open estimates from your spreadsheets, invoicing software, or phone, then tag them by service, town, and when you last worked for them.',
    bullets: [
      'Import from a spreadsheet, QuickBooks, Jobber, Housecall Pro, or your phone',
      'Duplicates merged and bad numbers removed',
      'Every new lead from your site, calls, and chat is added on its own',
    ],
    image: '/images/kb-feature-marketing-strategy.png',
  },
  {
    eyebrow: 'Step 2',
    headline: 'Pick a campaign and press send',
    body: 'Choose a ready-made campaign written for your trade, change the offer if you want, and pick who gets it. That’s it.',
    bullets: [
      'Text, email, or both',
      'Send now or schedule for the right day and time',
      'Personalized with each customer’s first name and past service',
    ],
    image: '/images/oc-marketing.png',
  },
  {
    eyebrow: 'Step 3',
    headline: 'Replies turn into booked jobs',
    body: 'When someone writes back “yes, I’m interested,” the conversation lands in your inbox, you get an alert, and the AI can answer questions and offer times on your calendar.',
    bullets: [
      'Two-way texting from one inbox',
      'Instant SMS alert to you or your office',
      'Optional AI follow-up that books the appointment',
    ],
    image: '/images/ai-receptionist.png',
  },
]

export default function OneClickCampaignsPage() {
  return (
    <>
      <MainNav />
      <HeroTwoColumnWithPhoto
        headline="Fill a slow week with one click"
        subheadline={
          <>
            <p>
              Your best next customer is someone you’ve already worked for. Send them a seasonal special, a
              maintenance reminder, or a follow-up on an old estimate by text or email, in one click. When they reply,
              it comes straight back to you as a new lead.
            </p>
          </>
        }
        photo={<img src="/images/oc-marketing.png" alt="One-click SMS and email campaign" className="h-full w-full" />}
      />

      <StatsWithGraph
        headline="Text gets read. Email gets buried."
        className="overflow-hidden"
        eyebrow="Why Campaigns Work"
        subheadline="Your past customers already know and trust you. Reaching them costs a fraction of finding new ones."
      >
        <StatGraph stat="98%" text="of text messages get opened, most within minutes" />
        <StatGraph stat="45%" text="average reply rate for business texts, compared with about 6% for email" />
        <StatGraph stat="$0" text="in ad spend. Your customer list is a channel you already own." />
      </StatsWithGraph>

      <FeaturesThreeColumn
        id="campaigns"
        eyebrow="Ready-Made Campaigns"
        headline="Campaigns written for your trade, ready to send"
        subheadline="No copywriting and no setup. Each campaign comes with the message, the timing, and a follow-up already built in."
        features={
          <>
            <Feature
              icon={<TagIcon />}
              headline="Slow-Week Special"
              subheadline={<p>A limited-time offer to past customers when your calendar has gaps. Turn a dead Tuesday into booked jobs.</p>}
            />
            <Feature
              icon={<SunIcon />}
              headline="Seasonal Tune-Up"
              subheadline={<p>AC checkups before summer, furnace service before winter, gutter and roof checks before the rain. Sent at the right time.</p>}
            />
            <Feature
              icon={<ClipboardIcon />}
              headline="Open Estimate Follow-Up"
              subheadline={<p>A friendly check-in to everyone who got a quote but never booked. Many of them just needed a nudge.</p>}
            />
            <Feature
              icon={<RepeatIcon />}
              headline="Maintenance Reminder"
              subheadline={<p>An automatic “it’s been a year” reminder for any service that needs to be done again, like inspections, flushes, and treatments.</p>}
            />
            <Feature
              icon={<HeartIcon />}
              headline="Referral Ask"
              subheadline={<p>Ask happy customers to send a neighbor your way, with an optional thank-you reward for each referral that books.</p>}
            />
            <Feature
              icon={<CalendarIcon />}
              headline="Holiday & Weather Alerts"
              subheadline={<p>Heat waves, freezes, storms, and holidays bring in urgent work. A quick text keeps you top of mind before the rush.</p>}
            />
          </>
        }
      />

      <FeaturesStackedAlternatingWithDemos
        id="process"
        eyebrow="How It Works"
        headline="From customer list to booked jobs"
        subheadline="We set it up once. After that, sending a campaign takes about as long as sending a text."
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
                    See a campaign for your trade <ChevronIcon />
                  </Link>
                }
                demo={
                  <Screenshot
                    wallpaper={(['blue', 'green', 'purple'] as const)[i % 3]}
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

      <StatsFourColumns
        headline="Built to sell, not spam"
        eyebrow="The Details That Matter"
        subheadline="Good campaigns feel like a personal note from you, not a blast from a marketing company."
      >
        <Stat
          icon={<UserCircleIcon className={iconClass} />}
          stat="Personal, Not Generic"
          text="Every message uses the customer’s name and mentions the work you did for them, so it reads like it came from you."
        />
        <Stat
          icon={<FilterIcon className={iconClass} />}
          stat="Sent to the Right People"
          text="Target by service, town, or last job date. Furnace customers get the furnace offer, not the AC one."
        />
        <Stat
          icon={<ChatBubbleCircleIcon className={iconClass} />}
          stat="Opt-Outs Handled for You"
          text="Every text includes an easy way to stop messages, and opt-outs are removed automatically. Your number is registered with the carriers so texts actually get delivered."
        />
        <Stat
          icon={<ChartLineIcon className={iconClass} />}
          stat="See What It Brought In"
          text="Opens, replies, and booked jobs for every campaign, so you know which offers are worth sending again."
        />
      </StatsFourColumns>

      <TradesGrid
        eyebrow="Who It’s For"
        headline="Perfect for trades with repeat and seasonal work"
        subheadline="If your customers need you again next season, next year, or next emergency, campaigns bring them back to you first."
        trades={['hvac', 'pestControl', 'landscape', 'plumber', 'garage', 'painter']}
        overrides={{
          hvac: 'Spring AC tune-ups, fall furnace checks, and maintenance plan renewals.',
          pestControl: 'Seasonal treatments, quarterly service reminders, and termite inspections.',
          landscape: 'Spring cleanups, irrigation checks, and holiday lighting installs.',
          plumber: 'Water heater flushes, drain cleaning specials, and winter pipe prep.',
          garage: 'Annual tune-ups, spring and opener checks, and new-door upgrades.',
          painter: 'Spring exterior specials, touch-ups, and cabinet refresh offers.',
        }}
      />

      <FAQsTwoColumnAccordion id="faqs" headline="Campaign questions">
        <Faq
          id="faq-1"
          question="Who can I send campaigns to?"
          answer="Customers and leads who gave you their number or email in the course of doing business with you. We help you set up consent the right way on your forms and booking flow, and every text includes an easy way to opt out."
        />
        <Faq
          id="faq-2"
          question="Do I have to write the messages?"
          answer="No. Every campaign comes pre-written for your trade. You can use it as is, or tell us what offer you want and we’ll tweak the wording to sound like you."
        />
        <Faq
          id="faq-3"
          question="How often should I send?"
          answer="For most contractors, once or twice a month is plenty: a seasonal or maintenance message plus the occasional slow-week special. We’ll help you plan a calendar so you stay top of mind without wearing out your list."
        />
        <Faq
          id="faq-4"
          question="What happens when someone replies?"
          answer="The reply lands in your inbox and you get an instant text alert. If you want, the AI can answer basic questions and offer open times on your calendar, so the job gets booked even if you’re on a roof."
        />
        <Faq
          id="faq-5"
          question="I don’t have a clean customer list. Is that a problem?"
          answer="Not at all. Most contractors don’t. Send us whatever you have, like spreadsheets, invoice exports, or old estimates, and we’ll clean it up and organize it during setup."
        />
      </FAQsTwoColumnAccordion>

      <CallToActionSimpleCentered
        id="cta"
        headline="Your next job is already in your phone"
        subheadline="Book a free 20-minute call. We’ll look at your customer list and show you the first campaign we’d send."
        cta={
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/lp/booking" size="lg">
              Book a free call <ArrowNarrowRightIcon />
            </ButtonLink>
            <PlainButtonLink href="/systems/5-star-review-funnel" size="lg">
              Pair it with the Review Funnel <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
      <FooterMain />
    </>
  )
}
