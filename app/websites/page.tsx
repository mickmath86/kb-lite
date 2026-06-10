import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Main } from '@/components/elements/main'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChartLineIcon } from '@/components/icons/chart-line-icon'
import { ChatBubbleCircleIcon } from '@/components/icons/chat-bubble-circle-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { CompassIcon } from '@/components/icons/compass-icon'
import { RocketIcon } from '@/components/icons/rocket-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { TargetIcon } from '@/components/icons/target-icon'
import { UiLayoutIcon } from '@/components/icons/ui-layout-icon'
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

export default function WebsitesPage() {
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
          eyebrow={<p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">Websites &amp; Redesigns</p>}
          headline="A website that works as hard as you do."
          subheadline={
            <p>
              Most small business websites were built for a different era. Kickbord redesigns outdated digital experiences so your business looks credible, converts more visitors, and reflects the quality of work you actually do.
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
          heading="First impressions happen online"
          description={
            <p>
              Before a customer calls or walks in, they look you up. What they find determines whether they contact you at all. A modern, well-structured website is often the difference between a lead and a lost opportunity.
            </p>
          }
        >
          <Stat stat="75%" text="Of users judge a business's credibility based on its website design alone." />
          <Stat stat="8 sec" text="The average time a visitor spends before deciding to stay or leave your site." />
          <Stat stat="3x" text="Higher conversion rates on mobile-optimized sites vs. those that aren't responsive." />
        </StatsThreeColumnWithDescription>

        {/* What we build */}
        <FeaturesWithLargeDemo
          id="what-we-build"
          eyebrow="What we build"
          headline="Modern sites built for trust and conversion."
          subheadline="Every Kickbord website is designed from the ground up to make the right impression, communicate clearly, and guide visitors toward the action that matters — whether that is a call, a form fill, or a booking."
          demo={
            <Screenshot wallpaper="green" placement="bottom">
              <img
                src="/images/hero.png"
                alt="Modern website design"
                className="bg-white/75 dark:hidden"
                width={1200}
                height={736}
              />
              <img
                src="/images/hero.png"
                alt="Modern website design"
                className="bg-black/75 not-dark:hidden"
                width={1200}
                height={736}
              />
            </Screenshot>
          }
          features={
            <>
              <LargeDemoFeature
                icon={<SparklesIcon />}
                headline="Brand-aligned design"
                subheadline={<p>Your site looks and feels like your business — not a generic template. Color, typography, and layout all reinforce the credibility you have worked to build.</p>}
              />
              <LargeDemoFeature
                icon={<UiLayoutIcon />}
                headline="Conversion-first structure"
                subheadline={<p>Clear navigation, strong calls to action, and intuitive page flow guide visitors toward the next step without confusion or friction.</p>}
              />
              <LargeDemoFeature
                icon={<RocketIcon />}
                headline="Fast and mobile-ready"
                subheadline={<p>Built to load quickly and look great on every screen size — because the majority of your visitors are on mobile devices.</p>}
              />
            </>
          }
        />

        {/* Feature grid */}
        <FeaturesThreeColumn
          id="features"
          eyebrow="Everything included"
          headline="No surprise gaps. No handoff headaches."
          subheadline={<p>Kickbord handles every layer of your website project — strategy, design, build, and launch.</p>}
          features={
            <>
              <Feature
                icon={<ChatBubbleCircleIcon />}
                headline="Messaging strategy"
                subheadline={<p>We help you clarify what to say and how to say it — so your homepage speaks directly to the customers you want to attract.</p>}
              />
              <Feature
                icon={<CompassIcon />}
                headline="Site architecture"
                subheadline={<p>Smart page structure that makes it easy for visitors to find what they need and easy for search engines to index your content.</p>}
              />
              <Feature
                icon={<TargetIcon />}
                headline="Lead capture"
                subheadline={<p>Contact forms, call-to-action sections, and booking integrations built in — so every page is an opportunity to capture interest.</p>}
              />
              <Feature
                icon={<CheckmarkIcon />}
                headline="SEO foundations"
                subheadline={<p>Proper page titles, meta descriptions, heading hierarchy, and performance settings baked in from day one.</p>}
              />
              <Feature
                icon={<ChartLineIcon />}
                headline="Analytics setup"
                subheadline={<p>Google Analytics and conversion tracking configured so you can see what is working and where visitors are dropping off.</p>}
              />
              <Feature
                icon={<SparklesIcon />}
                headline="Ongoing support"
                subheadline={<p>After launch, we remain available for edits, additions, and updates so your site stays current without a new agency engagement.</p>}
              />
            </>
          }
        />

        {/* Testimonial */}
        <TestimonialLargeQuote
          id="testimonial"
          quote="Our old site was an embarrassment. After Kickbord rebuilt it, we started getting compliments from customers about how professional we looked — and our inquiry rate noticeably improved within the first month."
          name="Local business owner"
          byline="Ventura County, CA"
          img={
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face"
              alt=""
            />
          }
        />

        {/* FAQs */}
        <FAQsTwoColumnAccordion id="faqs" headline="Website project questions">
          <Faq id="faq-1" question="How long does a website project take?" answer="Most projects go from kickoff to launch in 3–6 weeks depending on complexity, content availability, and revision rounds. We set clear milestones upfront so you always know where things stand." />
          <Faq id="faq-2" question="Do I need to write the copy myself?" answer="No. Kickbord includes copywriting as part of the project. We interview you, study your business, and write messaging that sounds like you — only clearer and more conversion-focused." />
          <Faq id="faq-3" question="Can you redesign just part of my site?" answer="Yes. If you only need a homepage refresh, a new landing page, or a section rebuilt, we can scope accordingly. Not every engagement needs to be a full site rebuild." />
          <Faq id="faq-4" question="What platform will the site be built on?" answer="We build primarily in Next.js for performance and flexibility, but we can also work in platforms like Webflow or WordPress depending on your team's ability to manage updates." />
          <Faq id="faq-5" question="Will I be able to update the site myself?" answer="Yes. We set you up with an easy way to make content updates — and train you on how to use it before we hand off." />
          <Faq id="faq-6" question="Do you handle hosting?" answer="We can recommend and set up hosting, or we can deploy to hosting you already have. We make sure everything is configured correctly either way." />
        </FAQsTwoColumnAccordion>

        {/* CTA */}
        <CallToActionSimpleCentered
          id="cta"
          headline="Ready for a website that reflects what your business actually is?"
          subheadline={<p>Book a free discovery call and we will audit your current site and show you exactly where the biggest opportunities are.</p>}
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
