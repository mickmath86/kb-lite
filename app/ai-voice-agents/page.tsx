import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Main } from '@/components/elements/main'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CalendarIcon } from '@/components/icons/calendar-icon'
import { ChartLineIcon } from '@/components/icons/chart-line-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { ClockIcon } from '@/components/icons/clock-icon'
import { MicrophoneIcon } from '@/components/icons/microphone-icon'
import { RepeatIcon } from '@/components/icons/repeat-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { TargetIcon } from '@/components/icons/target-icon'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { Feature, FeaturesThreeColumn } from '@/components/sections/features-three-column'
import { Feature as LargeDemoFeature, FeaturesWithLargeDemo } from '@/components/sections/features-with-large-demo'
import {
  FooterCategory,
  FooterLink,
  FooterWithLinkCategories,
} from '@/components/sections/footer-with-link-categories'
import { HeroSimpleLeftAligned } from '@/components/sections/hero-simple-left-aligned'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'
import { Stat, StatsThreeColumnWithDescription } from '@/components/sections/stats-three-column-with-description'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'

export default function AIVoiceAgentsPage() {
  return (
    <>
      <NavbarWithLogoActionsAndCenteredLinks
        id="navbar"
        links={
          <>
            <NavbarLink href="/about">About</NavbarLink>
            <NavbarLink href="/services">Services</NavbarLink>
            <NavbarLink href="/ai-voice-agents" className="text-olive-950 font-semibold dark:text-white">AI Voice Agents</NavbarLink>
            <NavbarLink href="/results">Results</NavbarLink>
            <NavbarLink href="/contact">Contact</NavbarLink>
            <NavbarLink href="/get-started" className="sm:hidden">Get started</NavbarLink>
          </>
        }
        logo={
          <NavbarLogo href="/">
            <img src="/Logos/icon.svg" alt="Kickbord" className="dark:hidden" width={85} height={28} />
            <img src="/Logos/icon.svg" className="not-dark:hidden" width={85} height={28} />
          </NavbarLogo>
        }
        actions={
          <>
            <PlainButtonLink href="/contact" className="max-sm:hidden">Book a call</PlainButtonLink>
            <ButtonLink href="/get-started">Get started <ArrowNarrowRightIcon /></ButtonLink>
          </>
        }
      />

      <Main>
        {/* Hero */}
        <HeroSimpleLeftAligned
          id="hero"
          eyebrow={<p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">AI Voice Agents</p>}
          headline="Never miss a call. Never lose a lead."
          subheadline={
            <p>
              Deploy an AI-powered voice agent that answers every call, qualifies leads, books appointments, and routes inquiries — 24 hours a day, 7 days a week, without adding headcount.
            </p>
          }
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="/get-started" size="lg">
                Get started <ArrowNarrowRightIcon />
              </ButtonLink>
              <PlainButtonLink href="/contact" size="lg">
                Book a demo <ChevronIcon />
              </PlainButtonLink>
            </div>
          }
        />

        {/* Stats */}
        <StatsThreeColumnWithDescription
          id="stats"
          heading="Why response speed changes everything"
          description={
            <p>
              Most small businesses lose deals before they ever talk to a prospect. Speed-to-lead, after-hours coverage, and consistent follow-up are the gaps AI voice agents are built to close.
            </p>
          }
        >
          <Stat stat="21x" text="More likely to qualify a lead when you respond within 5 minutes vs. 30 minutes." />
          <Stat stat="62%" text="Of business calls go unanswered after hours — and most of those leads never call back." />
          <Stat stat="78%" text="Of customers buy from the first business that responds to their inquiry." />
        </StatsThreeColumnWithDescription>

        {/* How it works */}
        <FeaturesWithLargeDemo
          id="how-it-works"
          eyebrow="How it works"
          headline="Your business stays responsive — automatically."
          subheadline="Kickbord deploys and configures your AI voice agent from end to end. No technical setup on your side. Within days, your business has a fully operational AI receptionist trained on your services, hours, pricing, and FAQs."
          demo={
            <Screenshot wallpaper="green" placement="bottom">
              <img
                src="/images/ai.png"
                alt="AI voice agent interface"
                className="bg-white/75 dark:hidden"
                width={1200}
                height={736}
              />
              <img
                src="/images/ai.png"
                alt="AI voice agent interface"
                className="bg-black/75 not-dark:hidden"
                width={1200}
                height={736}
              />
            </Screenshot>
          }
          features={
            <>
              <LargeDemoFeature
                icon={<MicrophoneIcon />}
                headline="Answers every call"
                subheadline={<p>Your AI agent picks up immediately, greets callers naturally, and handles the conversation from first hello to scheduled appointment or qualified handoff.</p>}
              />
              <LargeDemoFeature
                icon={<TargetIcon />}
                headline="Qualifies leads in real time"
                subheadline={<p>Ask the right questions, capture contact info, and route hot leads to your team while filtering out irrelevant inquiries automatically.</p>}
              />
              <LargeDemoFeature
                icon={<CalendarIcon />}
                headline="Books appointments"
                subheadline={<p>Integrate with your calendar and let the agent schedule directly — no back and forth, no missed bookings, no manual entry.</p>}
              />
            </>
          }
        />

        {/* Feature grid */}
        <FeaturesThreeColumn
          id="capabilities"
          eyebrow="Capabilities"
          headline="Built for how small businesses actually operate"
          subheadline={<p>Every feature is designed to reduce the burden on your team while improving the experience for every caller.</p>}
          features={
            <>
              <Feature
                icon={<ClockIcon />}
                headline="24/7 availability"
                subheadline={<p>Your agent answers calls at 2pm on a Tuesday and 11pm on a Saturday. No overtime, no voicemail.</p>}
              />
              <Feature
                icon={<SparklesIcon />}
                headline="Natural conversation"
                subheadline={<p>Trained to sound human, handle interruptions, and adapt to what the caller actually says — not just follow a rigid script.</p>}
              />
              <Feature
                icon={<RepeatIcon />}
                headline="Consistent follow-up"
                subheadline={<p>Automatically send follow-up texts or emails after calls so leads stay warm and no opportunity slips through the cracks.</p>}
              />
              <Feature
                icon={<ChartLineIcon />}
                headline="Call analytics"
                subheadline={<p>Review every conversation, track lead quality, and see exactly how your AI agent is performing week over week.</p>}
              />
              <Feature
                icon={<CheckmarkIcon />}
                headline="Custom training"
                subheadline={<p>Your agent learns your specific services, pricing, FAQs, and tone — so it sounds like your business, not a generic bot.</p>}
              />
              <Feature
                icon={<SparklesIcon />}
                headline="No extra headcount"
                subheadline={<p>Get the coverage of a full-time receptionist without the hiring, training, or salary. Pay a flat monthly rate instead.</p>}
              />
            </>
          }
        />

        {/* Testimonial */}
        <TestimonialLargeQuote
          id="testimonial"
          quote="We were missing calls every day and had no idea how many leads we were losing. Kickbord set up our AI agent and within the first week we had three new appointments booked that we never would have caught."
          name="Local service business owner"
          byline="Ventura County, CA"
          img={
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
              alt=""
            />
          }
        />

        {/* FAQs */}
        <FAQsTwoColumnAccordion id="faqs" headline="Common questions about AI voice agents">
          <Faq id="faq-1" question="What does the AI voice agent actually say on calls?" answer="It says exactly what you train it to say. We configure it with your business name, services, hours, pricing ranges, and any FAQs you want it to handle. It greets callers naturally and follows a conversation flow built around how your business works." />
          <Faq id="faq-2" question="Can it book appointments directly?" answer="Yes. We integrate your calendar so the agent can check availability and book in real time during the call — no double-booking, no manual entry on your end." />
          <Faq id="faq-3" question="What happens when a caller asks something the agent doesn't know?" answer="The agent is trained to handle edge cases gracefully. It can take a message, offer to have a team member follow up, or transfer the call — whichever you prefer." />
          <Faq id="faq-4" question="How long does setup take?" answer="Most businesses are live within 5–10 business days. We handle the configuration, testing, and training. You review and approve before anything goes live." />
          <Faq id="faq-5" question="Does it work after hours?" answer="That's actually one of its best use cases. Your agent is always on — nights, weekends, holidays — so you never send a caller to voicemail again." />
          <Faq id="faq-6" question="Can I listen to the calls?" answer="Yes. Every call is recorded and logged. You can review transcripts and recordings anytime through your dashboard." />
        </FAQsTwoColumnAccordion>

        {/* CTA */}
        <CallToActionSimpleCentered
          id="cta"
          headline="See what an AI voice agent can do for your business."
          subheadline={<p>Book a free demo and we will walk you through a live example configured for your industry and use case.</p>}
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="/get-started" size="lg">
                Get started <ArrowNarrowRightIcon />
              </ButtonLink>
              <PlainButtonLink href="/contact" size="lg">
                Book a call <ChevronIcon />
              </PlainButtonLink>
            </div>
          }
        />
      </Main>

      <FooterWithLinkCategories
        id="footer"
        links={
          <>
            <FooterCategory title="Services">
              <FooterLink href="/ai-voice-agents">AI Voice Agents</FooterLink>
              <FooterLink href="/websites">Websites &amp; Redesigns</FooterLink>
              <FooterLink href="/consulting">Consulting &amp; Strategy</FooterLink>
            </FooterCategory>
            <FooterCategory title="Company">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/results">Results</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterCategory>
            <FooterCategory title="Legal">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </FooterCategory>
          </>
        }
        fineprint="© 2026 Kickbord. All rights reserved."
      />
    </>
  )
}
