import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
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
import { Stat, StatsFourColumns } from '@/components/sections/stats-four-columns'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'

export default function ResultsPage() {
  return (
    <>
      <NavbarWithLogoActionsAndCenteredLinks
        id="navbar"
        links={
          <>
            <NavbarLink href="/about">About</NavbarLink>
            <NavbarLink href="/services">Services</NavbarLink>
            <NavbarLink href="/ai-voice-agents">AI Voice Agents</NavbarLink>
            <NavbarLink href="/results" className="text-olive-950 font-semibold dark:text-white">Results</NavbarLink>
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
          eyebrow={<p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">Results</p>}
          headline="Real outcomes for real businesses."
          subheadline={
            <p>
              Kickbord works with local service businesses, professional service firms, and growing SMBs who are ready to modernize how they market, respond, and convert. Here is what that has looked like in practice.
            </p>
          }
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="/get-started" size="lg">
                Work with us <ArrowNarrowRightIcon />
              </ButtonLink>
              <PlainButtonLink href="/contact" size="lg">
                Book a call <ChevronIcon />
              </PlainButtonLink>
            </div>
          }
        />

        {/* Stats */}
        <StatsFourColumns
          id="stats"
          eyebrow="By the numbers"
          headline="What clients see when strategy and execution align"
          subheadline={<p>These are the kinds of outcomes that happen when businesses stop guessing and start operating with a clear strategy, modern tools, and consistent execution.</p>}
        >
          <Stat stat="21x" text="Faster lead response with AI voice agent deployment" />
          <Stat stat="3–5x" text="Increase in qualified inbound inquiries after website and messaging overhaul" />
          <Stat stat="90 days" text="Average time to first measurable growth results in a sprint engagement" />
          <Stat stat="64%" text="Of clients say AI tools leveled the playing field with larger competitors" />
        </StatsFourColumns>

        {/* Testimonials */}
        <TestimonialThreeColumnGrid
          id="testimonials"
          eyebrow="What clients say"
          headline="From the businesses we have worked with"
          subheadline={<p>Results vary by business, market, and engagement scope — but the pattern is consistent: clarity, speed, and real momentum.</p>}
        >
          <Testimonial
            quote={
              <p>
                We were missing calls every single day. Kickbord set up our AI voice agent and within the first week we had three new bookings that we never would have caught. Now it runs in the background and we don't think about it.
              </p>
            }
            name="Service business owner"
            byline="Ventura County, CA"
            img={
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                alt=""
              />
            }
          />
          <Testimonial
            quote={
              <p>
                Our website was years out of date and we knew it was costing us customers. Kickbord rebuilt the whole thing in about four weeks. The new site looks professional, loads fast, and people actually contact us from it now.
              </p>
            }
            name="Local business owner"
            byline="Ventura County, CA"
            img={
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face"
                alt=""
              />
            }
          />
          <Testimonial
            quote={
              <p>
                Mike brought a level of strategic thinking we had never had access to before. In 90 days we had clearer positioning, a better lead flow, and a marketing system we actually understood how to run.
              </p>
            }
            name="Professional services founder"
            byline="Southern California"
            img={
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=face"
                alt=""
              />
            }
          />
          <Testimonial
            quote={
              <p>
                Before Kickbord, we were spending money on ads with no idea what was working. The strategy engagement gave us a framework that made every marketing decision cleaner and more confident.
              </p>
            }
            name="Small business owner"
            byline="California"
            img={
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&crop=face"
                alt=""
              />
            }
          />
          <Testimonial
            quote={
              <p>
                The AI agent paid for itself in the first month. We were losing after-hours leads constantly — now those calls get answered, qualified, and a follow-up text goes out automatically. It changed how our business operates.
              </p>
            }
            name="Service business owner"
            byline="Ventura County, CA"
            img={
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face"
                alt=""
              />
            }
          />
          <Testimonial
            quote={
              <p>
                We had tried working with agencies before. Kickbord was different because Mike actually understood our business and cared about the outcome — not just the deliverable. The website and the strategy work felt connected.
              </p>
            }
            name="Business owner"
            byline="Southern California"
            img={
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face"
                alt=""
              />
            }
          />
        </TestimonialThreeColumnGrid>

        {/* CTA */}
        <CallToActionSimpleCentered
          id="cta"
          headline="Ready to add your business to this list?"
          subheadline={<p>Book a free strategy call and we will show you exactly where Kickbord can move the needle for your specific business.</p>}
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
