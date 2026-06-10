import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Main } from '@/components/elements/main'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { LightBulbIcon } from '@/components/icons/light-bulb-icon'
import { MicrophoneIcon } from '@/components/icons/microphone-icon'
import { TargetIcon } from '@/components/icons/target-icon'
import { UiLayoutIcon } from '@/components/icons/ui-layout-icon'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { Feature, FeaturesThreeColumn } from '@/components/sections/features-three-column'
import {
  FeatureThreeColumnWithDemos,
  Features,
} from '@/components/sections/features-three-column-with-demos'
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
import { Screenshot } from '@/components/elements/screenshot'

export default function ServicesPage() {
  return (
    <>
      <NavbarWithLogoActionsAndCenteredLinks
        id="navbar"
        links={
          <>
            <NavbarLink href="/about">About</NavbarLink>
            <NavbarLink href="/services" className="text-olive-950 font-semibold dark:text-white">Services</NavbarLink>
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
          eyebrow={<p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">Services</p>}
          headline="Everything your business needs to compete online."
          subheadline={
            <p>
              Kickbord offers three core services — AI voice agents, website redesigns, and marketing consulting — each built to help small and mid-sized businesses operate with more speed, credibility, and consistency.
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

        {/* Services overview */}
        <Features
          id="services"
          headline="Three services. One connected system."
          subheadline={
            <p>
              Each Kickbord service can stand on its own — but they work best together. AI agents drive faster response, better websites increase conversion, and strategic consulting ties it all to a plan.
            </p>
          }
          cta={<Link href="/get-started">Start with a free strategy call <ArrowNarrowRightIcon /></Link>}
          features={
            <>
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="green" placement="bottom-right">
                    <img
                      src="/images/ai.png"
                      alt="AI Voice Agent"
                      className="bg-white/75 sm:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/ai.png"
                      alt="AI Voice Agent"
                      className="bg-black/75 not-dark:hidden sm:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/ai.png"
                      alt="AI Voice Agent"
                      className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                      width={1800}
                      height={736}
                    />
                    <img
                      src="/images/ai.png"
                      alt="AI Voice Agent"
                      className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                      width={1800}
                      height={736}
                    />
                    <img
                      src="/images/ai.png"
                      alt="AI Voice Agent"
                      className="bg-white/75 max-lg:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/ai.png"
                      alt="AI Voice Agent"
                      className="bg-black/75 not-dark:hidden max-lg:hidden"
                      width={1200}
                      height={736}
                    />
                  </Screenshot>
                }
                headline="AI Voice Agents"
                subheadline={
                  <p>
                    An AI receptionist that answers calls, qualifies leads, and books appointments around the clock — so you never miss an opportunity again.
                    <span className="mt-3 block">
                      <Link href="/ai-voice-agents">Learn more <ArrowNarrowRightIcon /></Link>
                    </span>
                  </p>
                }
              />
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="blue" placement="top-left">
                    <img
                      src="/images/hero.png"
                      alt="Website design"
                      className="bg-white/75 sm:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/hero.png"
                      alt="Website design"
                      className="bg-black/75 not-dark:hidden sm:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/hero.png"
                      alt="Website design"
                      className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                      width={1800}
                      height={736}
                    />
                    <img
                      src="/images/hero.png"
                      alt="Website design"
                      className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                      width={1800}
                      height={736}
                    />
                    <img
                      src="/images/hero.png"
                      alt="Website design"
                      className="bg-white/75 max-lg:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/hero.png"
                      alt="Website design"
                      className="bg-black/75 not-dark:hidden max-lg:hidden"
                      width={1200}
                      height={736}
                    />
                  </Screenshot>
                }
                headline="Websites &amp; Redesigns"
                subheadline={
                  <p>
                    A modern website built to earn trust, communicate your value, and turn more visitors into inquiries — not just look good.
                    <span className="mt-3 block">
                      <Link href="/websites">Learn more <ArrowNarrowRightIcon /></Link>
                    </span>
                  </p>
                }
              />
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="purple" placement="bottom-left">
                    <img
                      src="/images/ai.png"
                      alt="Strategy"
                      className="bg-white/75 sm:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/ai.png"
                      alt="Strategy"
                      className="bg-black/75 not-dark:hidden sm:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/ai.png"
                      alt="Strategy"
                      className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                      width={1800}
                      height={736}
                    />
                    <img
                      src="/images/ai.png"
                      alt="Strategy"
                      className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                      width={1800}
                      height={736}
                    />
                    <img
                      src="/images/ai.png"
                      alt="Strategy"
                      className="bg-white/75 max-lg:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/ai.png"
                      alt="Strategy"
                      className="bg-black/75 not-dark:hidden max-lg:hidden"
                      width={1200}
                      height={736}
                    />
                  </Screenshot>
                }
                headline="Consulting &amp; Strategy"
                subheadline={
                  <p>
                    Fortune 500-level marketing strategy applied to your business — so every decision is connected to a plan, not just a hunch.
                    <span className="mt-3 block">
                      <Link href="/consulting">Learn more <ArrowNarrowRightIcon /></Link>
                    </span>
                  </p>
                }
              />
            </>
          }
        />

        {/* Why Kickbord */}
        <FeaturesThreeColumn
          id="why-kickbord"
          eyebrow="Why Kickbord"
          headline="Built differently from day one"
          subheadline={<p>Most agencies focus on deliverables. Kickbord focuses on outcomes — and stays engaged until the results show up.</p>}
          features={
            <>
              <Feature
                icon={<MicrophoneIcon />}
                headline="Founder-led execution"
                subheadline={<p>You work directly with Mike Mathias — not an account manager or junior team. Every engagement gets senior attention from start to finish.</p>}
              />
              <Feature
                icon={<UiLayoutIcon />}
                headline="Strategy that connects to action"
                subheadline={<p>We do not just advise — we build. Strategy and execution happen together so recommendations actually get implemented.</p>}
              />
              <Feature
                icon={<TargetIcon />}
                headline="Enterprise experience at SMB scale"
                subheadline={<p>The same thinking that went into campaigns at Google, Nike, and Verizon — applied to businesses with 5 to 50 employees.</p>}
              />
              <Feature
                icon={<LightBulbIcon />}
                headline="AI-forward by default"
                subheadline={<p>Every engagement considers where AI tools, automation, and voice agents can reduce manual work and improve the customer experience.</p>}
              />
            </>
          }
        />

        {/* CTA */}
        <CallToActionSimpleCentered
          id="cta"
          headline="Not sure which service fits? Start with a conversation."
          subheadline={<p>Book a free 30-minute strategy call and we will help you figure out where to focus first — no pitch, no pressure.</p>}
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
