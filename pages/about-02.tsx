'use client'

import { useState } from 'react'
import { clsx } from 'clsx/lite'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { RocketIcon } from '@/components/icons/rocket-icon'
import { HeartIcon } from '@/components/icons/heart-icon'
import { TargetIcon } from '@/components/icons/target-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'

import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { Feature, FeaturesThreeColumn } from '@/components/sections/features-three-column'
import { FooterCategory, FooterLink, FooterWithLinkCategories } from '@/components/sections/footer-with-link-categories'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'
import { HeroTwoColumnWithPhoto } from '@/components/sections/hero-two-column-with-photo'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'
import { Plan as PlanMulti, PricingMultiTier } from '@/components/sections/pricing-multi-tier'
import { Stat as Stat3, StatsThreeColumnWithDescription } from '@/components/sections/stats-three-column-with-description'

// ─── Pricing data ────────────────────────────────────────────────────────────

const LAUNCH = {
  monthly: { price: '$297', period: '/mo', note: 'Billed monthly. Cancel anytime.' },
  quarterly: { price: '$760', period: '/qtr', note: 'Billed quarterly. Save 15% vs monthly (~$253/mo).' },
}
const GROW = {
  monthly: { price: '$497', period: '/mo', note: 'Billed monthly. Cancel anytime.' },
  quarterly: { price: '$1,270', period: '/qtr', note: 'Billed quarterly. Save 15% vs monthly (~$423/mo).' },
}

export default function Page() {
  const [billing, setBilling] = useState<'monthly' | 'quarterly'>('monthly')

  return (
    <>
      <NavbarWithLogoActionsAndCenteredLinks
        id="navbar"
        links={
          <>
            <NavbarLink href="/about">About</NavbarLink>
            <NavbarLink href="/services">Services</NavbarLink>
            <NavbarLink href="/contact">Contact</NavbarLink>
            <NavbarLink href="/get-started" className="sm:hidden">
              Get started
            </NavbarLink>
          </>
        }
        logo={
          <NavbarLogo href="/">
            <img
              src="/Logos/icon.svg"
              alt="Kickbord"
              className="dark:hidden"
              width={85}
              height={28}
            />
            <img
              src="/Logos/icon.svg"
              alt="Kickbord"
              className="not-dark:hidden"
              width={85}
              height={28}
            />
          </NavbarLogo>
        }
        actions={
          <>
            <PlainButtonLink href="/contact" className="max-sm:hidden">
              Contact
            </PlainButtonLink>
            <ButtonLink href="/get-started">Get started <ArrowNarrowRightIcon /></ButtonLink>
          </>
        }
      />

      <Main>
        {/* Hero */}
        <HeroTwoColumnWithPhoto
          id="origin-story"
          headline="Built to give growing businesses bigger-business capability"
          subheadline={
            <p>
              Kickbord was created to help ambitious businesses strengthen their marketing, modernize their digital presence, and use AI more practically. It is a founder-led partner for companies that want enterprise-level thinking without enterprise-level complexity.
            </p>
          }
          photo={
            <>
              <img
                className="not-dark:bg-white/75 max-xl:hidden dark:bg-black/75"
                src="/images/ventura-kb.jpg"
                width={1800}
                height={1600}
                alt=""
              />
              <img
                className="not-dark:bg-white/75 xl:hidden dark:bg-black/75"
                src="/images/ventura-kb.jpg"
                width={1800}
                height={945}
                alt=""
              />
            </>
          }
        />

        {/* Origin story */}
        <HeroLeftAlignedWithDemo
          eyebrow="Origin Story"
          headline="From enterprise campaigns to giving growing businesses a real shot"
          subheadline={
            <>
              <p>
                I spent my career inside top agencies building websites, apps, and social campaigns for Fortune 500 brands, working alongside some of the most creative minds in advertising. I loved the creativity and the scale of that work — like leading the team that rebuilt the entire Google Ads web platform, a product used by tens of millions of people.
              </p>
              <p>
                But the longer I worked at that level, the more a pattern bothered me. Smaller and mid-sized businesses almost never got access to this kind of thinking or execution. They were bootstrapping, hiring whoever they could afford, or trying to figure out marketing, websites, and operations on their own — while the best talent was busy shipping massive campaigns for the biggest companies.
              </p>
              <p>
                While freelancing as a lead producer at R/GA on Google projects, I had a realization: if smaller businesses could see what truly goes into enterprise-level marketing and business consulting, they would be blown away by what is possible for them. With modern AI tools, one experienced enterprise-level marketer who knows what questions to ask and what problems to solve can now deliver that caliber of strategy, creative, and systems to growing businesses at a fraction of the old cost. Kickbord exists to do exactly that.
              </p>
              <p>— Mike M</p>
            </>
          }
          demo={
            <Screenshot wallpaper="green" placement="bottom">
              <img
                className="not-dark:bg-white/75 dark:bg-black/75"
                src="/images/ventura.jpg"
                width={1800}
                height={1600}
                alt=""
              />
            </Screenshot>
          }
        />

        {/* Who We Help */}
        <StatsThreeColumnWithDescription
          heading="Who We Help"
          description="Kickbord is built for local service businesses — the kind that do great work, rely on word of mouth, and are ready to add a system that brings leads in consistently. If you run a crew and want more of the right customers calling you, this is built for you."
          children={
            <>
              <Stat3
                stat="Home services & trades"
                text="Plumbers, electricians, HVAC, roofers, landscapers, cleaners — businesses that need a steady pipeline of local jobs."
              />
              <Stat3
                stat="1–50 person companies"
                text="Small enough that every lead matters, big enough that you are ready to grow with a real system behind you."
              />
              <Stat3
                stat="No marketing team in-house"
                text="You do not need to hire a CMO. Kickbord is your marketing department — strategy, website, ads, and automation included."
              />
            </>
          }
        />

        {/* Pricing */}
        <PricingMultiTier
          id="pricing"
          eyebrow="Pricing"
          headline="Simple pricing. Everything done for you."
          subheadline="No setup fees. No long-term contracts. Cancel anytime."
          plans={
            <>
              {/* Billing toggle */}
              <div className="col-span-full mb-2 flex justify-center">
                <div className="inline-flex rounded-xl border border-olive-950/10 bg-olive-950/4 p-1 dark:border-white/10 dark:bg-white/5">
                  <button
                    type="button"
                    onClick={() => setBilling('monthly')}
                    className={clsx(
                      'rounded-lg px-5 py-2 text-sm font-medium transition-all duration-150',
                      billing === 'monthly'
                        ? 'bg-white text-olive-950 shadow-sm dark:bg-white/15 dark:text-white'
                        : 'text-olive-500 hover:text-olive-700 dark:text-white/45 dark:hover:text-white/70'
                    )}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBilling('quarterly')}
                    className={clsx(
                      'flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition-all duration-150',
                      billing === 'quarterly'
                        ? 'bg-white text-olive-950 shadow-sm dark:bg-white/15 dark:text-white'
                        : 'text-olive-500 hover:text-olive-700 dark:text-white/45 dark:hover:text-white/70'
                    )}
                  >
                    Quarterly
                    <span className={clsx(
                      'rounded-full px-2 py-0.5 text-xs font-semibold',
                      billing === 'quarterly'
                        ? 'bg-green-500/15 text-green-700 dark:bg-green-400/20 dark:text-green-400'
                        : 'bg-olive-950/8 text-olive-500 dark:bg-white/10 dark:text-white/40'
                    )}>
                      Save 15%
                    </span>
                  </button>
                </div>
              </div>

              {/* Launch */}
              <PlanMulti
                name="Kickbord Launch"
                price={LAUNCH[billing].price}
                period={LAUNCH[billing].period}
                subheadline={
                  <>
                    <p>{LAUNCH[billing].note}</p>
                    <p>Done-for-you website and lead system. We build your AI website, wire up the chatbot, set up automated lead follow-up, and hand you a system that captures and responds to every inquiry.</p>
                  </>
                }
                features={[
                  'AI website',
                  'Integrated contact forms',
                  'AI chatbot',
                  'Live chat widget',
                  'SMS lead notifications',
                  'Automated lead follow-up',
                  'CRM & contact database',
                  'No setup fees',
                ]}
                cta={
                  <ButtonLink
                    href={`/get-started/pay?plan=launch&billing=${billing}`}
                    size="lg"
                    className="w-full justify-center"
                  >
                    Get started <ArrowNarrowRightIcon />
                  </ButtonLink>
                }
              />

              {/* Grow */}
              <PlanMulti
                name="Kickbord Grow"
                price={GROW[billing].price}
                period={GROW[billing].period}
                badge="Most Popular"
                subheadline={
                  <>
                    <p>{GROW[billing].note}</p>
                    <p>Leads and reputation on autopilot. Everything in Launch plus Google Local Services Ads management and automated post-job review requests so your pipeline and star rating both compound over time.</p>
                    <p className="rounded-lg bg-yellow-50 px-3 py-2 text-xs text-yellow-700 dark:bg-yellow-400/10 dark:text-yellow-300/80">
                      Google ad spend is billed separately (typically $300–$1,000/mo).
                    </p>
                  </>
                }
                features={[
                  'Everything in Launch',
                  'Full Local Services Ads setup & management',
                  'Reputation management',
                  'Automated post-job review request SMS',
                  'No setup fees',
                ]}
                cta={
                  <ButtonLink
                    href={`/get-started/pay?plan=grow&billing=${billing}`}
                    size="lg"
                    className="w-full justify-center"
                  >
                    Get started <ArrowNarrowRightIcon />
                  </ButtonLink>
                }
              />

              {/* Enterprise */}
              <PlanMulti
                name="Enterprise"
                price="Custom"
                subheadline={
                  <p>Full-stack marketing partner. For businesses ready to scale with custom AI integrations, multi-location support, and a dedicated strategist embedded in your operations.</p>
                }
                features={[
                  'Everything in Grow',
                  'Dedicated account strategist',
                  'Custom AI integrations',
                  'Multi-location support',
                  'Priority onboarding & support',
                  'Custom reporting',
                ]}
                cta={
                  <ButtonLink
                    href="/contact"
                    size="lg"
                    className="w-full justify-center"
                  >
                    Contact us <ArrowNarrowRightIcon />
                  </ButtonLink>
                }
              />
            </>
          }
        />

        {/* Values */}
        <FeaturesThreeColumn
          id="values"
          headline="How we work."
          subheadline={
            <p>
              Kickbord operates on a small number of principles that shape every engagement — from how we build to how we communicate.
            </p>
          }
          features={
            <>
              <Feature
                icon={<RocketIcon />}
                headline="Speed without shortcuts"
                subheadline={
                  <p>
                    We move fast because we have done this at scale before. Speed comes from experience, not from skipping steps that matter.
                  </p>
                }
              />
              <Feature
                icon={<HeartIcon />}
                headline="Honest over comfortable"
                subheadline={
                  <p>
                    We tell clients what we actually think — about their positioning, their site, their strategy. Good advice is only useful if it is accurate.
                  </p>
                }
              />
              <Feature
                icon={<SparklesIcon />}
                headline="AI as a multiplier"
                subheadline={
                  <p>
                    We use AI to extend what one experienced person can deliver, not to replace judgment. Every system we build is designed and overseen by someone who knows what good looks like.
                  </p>
                }
              />
              <Feature
                icon={<TargetIcon />}
                headline="Outcomes over outputs"
                subheadline={
                  <p>
                    We measure success by whether leads increase, reviews grow, and the business moves forward — not by how many deliverables we shipped.
                  </p>
                }
              />
            </>
          }
        />

        {/* CTA */}
        <CallToActionSimple
          id="call-to-action"
          headline="Ready to see what this looks like for your business?"
          subheadline={
            <p>Book a free 30-minute walkthrough and we will show you exactly what Kickbord would build for you.</p>
          }
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="/get-started" size="lg">
                Get started <ArrowNarrowRightIcon />
              </ButtonLink>
              <PlainButtonLink href="/contact" size="lg">
                Contact us <ChevronIcon />
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
              <FooterLink href="/websites">Websites</FooterLink>
              <FooterLink href="/consulting">Consulting</FooterLink>
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
