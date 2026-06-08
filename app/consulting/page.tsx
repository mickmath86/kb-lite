import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChartLineIcon } from '@/components/icons/chart-line-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { LightBulbIcon } from '@/components/icons/light-bulb-icon'
import { RocketIcon } from '@/components/icons/rocket-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { TargetIcon } from '@/components/icons/target-icon'
import { UserCircleIcon } from '@/components/icons/user-circle-icon'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { Feature, FeaturesThreeColumn } from '@/components/sections/features-three-column'
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
import { Plan, PricingMultiTier } from '@/components/sections/pricing-multi-tier'
import { Stat, StatsThreeColumnWithDescription } from '@/components/sections/stats-three-column-with-description'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'

export default function ConsultingPage() {
  return (
    <>
      <NavbarWithLogoActionsAndCenteredLinks
        id="navbar"
        links={
          <>
            <NavbarLink href="/about">About</NavbarLink>
            <NavbarLink href="/services">Services</NavbarLink>
            <NavbarLink href="/ai-voice-agents">AI Voice Agents</NavbarLink>
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
          eyebrow={<p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">Consulting &amp; Strategy</p>}
          headline="Fortune 500 marketing thinking. Built for your business."
          subheadline={
            <p>
              Kickbord brings the same strategic rigor used at Google, Nike, Samsung, and Verizon to small and mid-sized businesses that are ready to grow — without the agency overhead or the 12-week strategy deck.
            </p>
          }
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

        {/* Stats */}
        <StatsThreeColumnWithDescription
          id="stats"
          heading="Strategy is what separates businesses that plateau from those that scale"
          description={
            <p>
              Most small businesses operate with good instincts and limited frameworks. Bringing in a strategic partner with enterprise experience helps clarify what to prioritize, what to stop doing, and what to build next.
            </p>
          }
        >
          <Stat stat="60%" text="Of small businesses say lack of a clear marketing strategy is their biggest growth barrier." />
          <Stat stat="2–5x" text="Typical ROI improvement when marketing spend is tied to a documented strategy." />
          <Stat stat="90 days" text="Average time to see measurable results from a structured growth sprint engagement." />
        </StatsThreeColumnWithDescription>

        {/* Engagement models */}
        <PricingMultiTier
          id="pricing"
          eyebrow="Engagement models"
          headline="Three ways to work together"
          subheadline={<p>Choose the engagement that fits where your business is right now — from a focused one-time project to an ongoing strategic partnership.</p>}
          plans={
            <>
              <Plan
                name="Strategic Build"
                price="Project-based"
                subheadline={<p>A defined-scope strategy engagement. Ideal for businesses that need clarity on positioning, messaging, or a specific marketing problem.</p>}
                cta={<ButtonLink href="/get-started" size="lg" className="w-full justify-center">Get started</ButtonLink>}
                features={[
                  'Brand and positioning audit',
                  'Competitive landscape review',
                  'Messaging and offer clarity',
                  'Go-to-market recommendations',
                  'Priority action roadmap',
                  '2-week delivery',
                ]}
              />
              <Plan
                name="90-Day Growth Sprint"
                price="Retainer"
                badge="Most Popular"
                subheadline={<p>A 90-day embedded engagement where Kickbord acts as your fractional marketing team — executing alongside you, not just advising.</p>}
                cta={<ButtonLink href="/get-started" size="lg" className="w-full justify-center">Get started</ButtonLink>}
                features={[
                  'Everything in Strategic Build',
                  'Weekly strategy sessions',
                  'Campaign planning and execution',
                  'AI and automation buildout',
                  'Website and content updates',
                  'Monthly performance reviews',
                ]}
              />
              <Plan
                name="Fractional CMO"
                price="Ongoing"
                subheadline={<p>Ongoing strategic leadership for businesses that need a seasoned marketing executive without the cost of a full-time hire.</p>}
                cta={<ButtonLink href="/get-started" size="lg" className="w-full justify-center">Get started</ButtonLink>}
                features={[
                  'Everything in 90-Day Sprint',
                  'Full marketing ownership',
                  'Team oversight and direction',
                  'Board and stakeholder reporting',
                  'Vendor and agency management',
                  'Quarterly strategy reviews',
                ]}
              />
            </>
          }
        />

        {/* What we cover */}
        <FeaturesThreeColumn
          id="what-we-cover"
          eyebrow="What we cover"
          headline="Strategic clarity across every growth lever"
          subheadline={<p>Kickbord engagements cover the areas that have the highest impact on sustainable growth for service businesses.</p>}
          features={
            <>
              <Feature
                icon={<TargetIcon />}
                headline="Positioning and messaging"
                subheadline={<p>Clarify who you serve, what makes you different, and how to communicate that in a way that resonates with the customers you want most.</p>}
              />
              <Feature
                icon={<LightBulbIcon />}
                headline="Offer design"
                subheadline={<p>Structure your services in a way that is easy to sell, easy to understand, and priced to reflect the value you actually deliver.</p>}
              />
              <Feature
                icon={<ChartLineIcon />}
                headline="Lead generation strategy"
                subheadline={<p>Build a repeatable system for attracting and converting new customers — not a one-time campaign, but a durable growth engine.</p>}
              />
              <Feature
                icon={<SparklesIcon />}
                headline="AI and automation integration"
                subheadline={<p>Identify where AI tools, voice agents, and automation can remove friction and improve consistency across your customer-facing operations.</p>}
              />
              <Feature
                icon={<RocketIcon />}
                headline="Launch planning"
                subheadline={<p>Whether launching a new service, entering a new market, or relaunching a brand, Kickbord builds and executes the go-to-market plan.</p>}
              />
              <Feature
                icon={<UserCircleIcon />}
                headline="Fractional leadership"
                subheadline={<p>For businesses that need consistent senior marketing presence without a full-time hire — we show up as part of the team, not just a consultant on a call.</p>}
              />
            </>
          }
        />

        {/* Testimonial */}
        <TestimonialLargeQuote
          id="testimonial"
          quote="Working with Mike gave us the strategic clarity we had been missing for years. In 90 days we had a clearer offer, a better website, and a system for generating leads that we actually understood and could operate ourselves."
          name="Business owner"
          byline="Ventura County, CA"
          img={
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=face"
              alt=""
            />
          }
        />

        {/* FAQs */}
        <FAQsTwoColumnAccordion id="faqs" headline="Consulting questions">
          <Faq id="faq-1" question="What does a consulting engagement actually look like day to day?" answer="It depends on the engagement type. A Strategic Build is mostly structured sessions and deliverables. A Growth Sprint involves weekly working sessions, ongoing Slack access, and active execution together. A Fractional CMO role involves being embedded with your team on a regular cadence." />
          <Faq id="faq-2" question="How is this different from hiring a marketing agency?" answer="Agencies execute campaigns. Kickbord builds the strategy that tells you which campaigns to run and why. We also execute alongside you — which means you build internal capability, not just deliverables that disappear when the engagement ends." />
          <Faq id="faq-3" question="Do you work with businesses outside Ventura County?" answer="Yes. Most consulting work is done remotely. We work with businesses throughout California and beyond depending on the engagement." />
          <Faq id="faq-4" question="What industries do you specialize in?" answer="Local service businesses, professional services, and any B2C or B2B company with 1–50 employees looking to professionalize their marketing and digital presence." />
          <Faq id="faq-5" question="How do we get started?" answer="Book a free strategy call. We spend 30–45 minutes understanding your business, current challenges, and where you want to go — then recommend the engagement that fits." />
          <Faq id="faq-6" question="What if I just need one thing fixed?" answer="A Strategic Build engagement is designed for exactly that. Scoped, time-boxed, and focused on the specific area where clarity will have the highest impact." />
        </FAQsTwoColumnAccordion>

        {/* CTA */}
        <CallToActionSimpleCentered
          id="cta"
          headline="Ready to think strategically about how your business grows?"
          subheadline={<p>Book a free strategy call and leave with a clearer picture of where your biggest opportunity is — no commitment required.</p>}
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
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </FooterCategory>
          </>
        }
        fineprint="© 2026 Kickbord. All rights reserved."
      />
    </>
  )
}
