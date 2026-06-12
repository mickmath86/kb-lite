'use client'

import { useState } from 'react'
import { clsx } from 'clsx/lite'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
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
import { Stat as Stat3, StatsThreeColumnWithDescription } from '@/components/sections/stats-three-column-with-description'

// ─── Pricing data ────────────────────────────────────────────────────────────

const launchFeatures = [
  'AI website',
  'Integrated contact forms',
  'AI chatbot',
  'Live chat widget',
  'SMS lead notifications',
  'Automated lead follow-up',
  'CRM & contact database',
  'No setup fees',
]

const growExtras = [
  'Local Services Ads setup & management',
  'Reputation management',
  'Automated post-job review request SMS',
]

const enterpriseExtras = [
  'Dedicated account strategist',
  'Custom AI integrations',
  'Multi-location support',
  'Priority onboarding & support',
  'Custom reporting',
]

const pricingPlans = [
  {
    key: 'launch',
    name: 'Kickbord Launch',
    isDark: false,
    isEnterprise: false,
    monthly: { price: '$297', period: '/mo', cta: 'Start with Launch', href: '/get-started/pay?plan=launch&billing=monthly' },
    quarterly: { price: '$760', period: '/qtr', savings: 'Save $131', equivalent: '~$253/mo', cta: 'Start Launch — quarterly', href: '/get-started/pay?plan=launch&billing=quarterly', bonus: 'No setup fee + priority onboarding' },
  },
  {
    key: 'grow',
    name: 'Kickbord Grow',
    isDark: true,
    isEnterprise: false,
    monthly: { price: '$497', period: '/mo', cta: 'Start with Grow', href: '/get-started/pay?plan=grow&billing=monthly' },
    quarterly: { price: '$1,270', period: '/qtr', savings: 'Save $221', equivalent: '~$423/mo', cta: 'Start Grow — quarterly', href: '/get-started/pay?plan=grow&billing=quarterly', bonus: 'No setup fee + priority onboarding' },
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    isDark: false,
    isEnterprise: true,
    monthly: { price: 'Custom', period: '', cta: 'Contact us', href: '/contact' },
    quarterly: { price: 'Custom', period: '', cta: 'Contact us', href: '/contact' },
  },
]

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
        <section id="pricing" className="py-16 bg-white dark:bg-olive-950">
          <div className="mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-7xl lg:px-10">
            {/* Header */}
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-olive-600 dark:text-olive-400">Pricing</p>
              <h2 className="mt-2 font-display text-[2rem]/10 text-olive-950 sm:text-5xl/14 dark:text-white">
                Simple pricing. Everything done for you.
              </h2>
              <p className="mt-3 text-base/7 text-olive-700 dark:text-olive-400">
                No setup fees. No long-term contracts. Cancel anytime.
              </p>

              {/* Tab switcher */}
              <div className="mt-6 inline-flex rounded-full border border-olive-950/15 bg-olive-950/5 p-1 dark:border-white/15 dark:bg-white/5">
                <button
                  type="button"
                  onClick={() => setBilling('monthly')}
                  className={clsx(
                    'rounded-full px-6 py-2 text-sm font-semibold transition-all',
                    billing === 'monthly'
                      ? 'bg-olive-950 text-white shadow-sm dark:bg-white dark:text-olive-950'
                      : 'text-olive-600 hover:text-olive-950 dark:text-olive-400 dark:hover:text-white'
                  )}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBilling('quarterly')}
                  className={clsx(
                    'relative rounded-full px-6 py-2 text-sm font-semibold transition-all',
                    billing === 'quarterly'
                      ? 'bg-olive-950 text-white shadow-sm dark:bg-white dark:text-olive-950'
                      : 'text-olive-600 hover:text-olive-950 dark:text-olive-400 dark:hover:text-white'
                  )}
                >
                  Quarterly
                  {billing !== 'quarterly' && (
                    <span className="absolute -top-1 -right-1 rounded-full bg-green-500 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
                      15% off
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Plan cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {pricingPlans.map((plan) => {
                const data = billing === 'monthly' ? plan.monthly : plan.quarterly
                const { isDark, isEnterprise } = plan
                return (
                  <div
                    key={plan.key}
                    className={clsx(
                      'relative flex flex-col gap-5 rounded-2xl p-7 transition-all',
                      isDark
                        ? 'border-2 border-olive-950 bg-olive-950 dark:border-white/30'
                        : isEnterprise
                          ? 'border border-olive-950/15 bg-olive-950/3 dark:border-white/10 dark:bg-white/3'
                          : 'border border-olive-950/10 bg-white dark:border-white/10 dark:bg-white/5'
                    )}
                  >
                    {isDark && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-olive-950 px-4 py-1 text-xs font-bold text-white dark:bg-white dark:text-olive-950">
                        Most Popular
                      </span>
                    )}

                    {/* Price */}
                    <div>
                      <p className={clsx('text-xs font-semibold uppercase tracking-widest', isDark ? 'text-olive-400' : 'text-olive-500')}>
                        {plan.name}
                      </p>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className={clsx('font-display text-5xl', isDark ? 'text-white' : 'text-olive-950 dark:text-white')}>
                          {data.price}
                        </span>
                        {data.period && (
                          <span className={clsx('text-sm', isDark ? 'text-white/50' : 'text-olive-500')}>
                            {data.period}
                          </span>
                        )}
                      </div>
                      {billing === 'quarterly' && 'savings' in data && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-bold text-green-600 dark:text-green-400">{data.savings}</span>
                          <span className={clsx('text-xs', isDark ? 'text-white/50' : 'text-olive-500')}>{data.equivalent}</span>
                        </div>
                      )}
                      {isEnterprise && (
                        <p className={clsx('mt-2 text-sm', 'text-olive-600 dark:text-olive-400')}>
                          Full-stack marketing partner for businesses ready to scale.
                        </p>
                      )}
                    </div>

                    {/* Quarterly bonus */}
                    {billing === 'quarterly' && 'bonus' in data && (
                      <div className={clsx(
                        'rounded-xl p-3.5',
                        isDark
                          ? 'border border-white/15 bg-white/10'
                          : 'border border-olive-950/10 bg-olive-950/5 dark:border-white/10 dark:bg-white/5'
                      )}>
                        <p className={clsx('text-xs font-semibold', isDark ? 'text-white' : 'text-olive-950 dark:text-white')}>Quarterly bonus</p>
                        <p className={clsx('mt-0.5 text-xs', isDark ? 'text-white/60' : 'text-olive-500')}>{data.bonus}</p>
                      </div>
                    )}

                    {/* Features */}
                    <ul className="flex flex-col gap-2">
                      {launchFeatures.map((f) => (
                        <li key={f} className={clsx('flex items-start gap-2.5 text-xs/5', isDark ? 'text-white/80' : 'text-olive-700 dark:text-olive-300')}>
                          <span className={clsx('mt-0.5 size-3.5 shrink-0', isDark ? 'text-white/40' : 'text-olive-400')}><CheckmarkIcon /></span>
                          {f}
                        </li>
                      ))}
                      {(isDark || isEnterprise) && (
                        <>
                          <li className={clsx('mt-1 border-t pt-2', isDark ? 'border-white/10' : 'border-olive-950/10 dark:border-white/10')}>
                            <p className={clsx('text-xs font-semibold uppercase tracking-widest mb-1.5', isDark ? 'text-white/40' : 'text-olive-400')}>Also included:</p>
                          </li>
                          {(isDark ? growExtras : enterpriseExtras).map((f) => (
                            <li key={f} className={clsx('flex items-start gap-2.5 text-xs/5', isDark ? 'text-olive-300' : 'text-olive-600 dark:text-olive-300')}>
                              <span className={clsx('mt-0.5 size-3.5 shrink-0', isDark ? 'text-olive-400' : 'text-olive-400')}><CheckmarkIcon /></span>
                              {f}
                            </li>
                          ))}
                        </>
                      )}
                    </ul>

                    {/* Grow ad spend note */}
                    {isDark && (
                      <p className="rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-3 py-2 text-xs text-yellow-300/80">
                        Google ad spend is billed separately (typically $300–$1,000/mo).
                      </p>
                    )}

                    {/* CTA */}
                    <a
                      href={data.href}
                      className={clsx(
                        'mt-auto flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition',
                        isDark
                          ? 'bg-white text-olive-950 hover:bg-white/90'
                          : 'border border-olive-950/20 bg-white text-olive-950 hover:bg-olive-950/5 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
                      )}
                    >
                      {data.cta}
                    </a>
                  </div>
                )
              })}
            </div>

            <p className="mt-6 text-center text-xs text-olive-500 dark:text-olive-400">
              Grow plan: Google ad spend is a separate budget on top of the monthly fee (typically $300–$1,000/mo). No setup fees on any plan.
            </p>
          </div>
        </section>

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
