'use client'

import { useState } from 'react'
import { clsx } from 'clsx/lite'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import NavDropDown from '@/components/elements/navbar-dropdown'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { RocketIcon } from '@/components/icons/rocket-icon'
import { HeartIcon } from '@/components/icons/heart-icon'
import { TargetIcon } from '@/components/icons/target-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { User2Icon } from '@/components/icons/user-2-icon'
import NavbarDropdown2 from '@/components/elements/navbar-dropdown-2'

import { BrandCard, BrandsCardsMultiColumn } from '@/components/sections/brands-cards-multi-column'
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

type PlanBilling = {
  price: string
  period: string
  cta: string
  href: string
  savings?: string
  equivalent?: string
  bonus?: string
}

const pricingPlans: {
  key: string
  name: string
  isDark: boolean
  isEnterprise: boolean
  monthly: PlanBilling
  quarterly: PlanBilling
}[] = [
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

import { TeamMember, TeamThreeColumnGrid } from '@/components/sections/team-three-column-grid'
import Link from 'next/link'
import MainNav from '@/components/sections/main-nav'
import { Plan, PricingHeroMultiTier } from '@/components/sections/pricing-hero-multi-tier'
import { Wallpaper } from '@/components/elements/wallpaper'

export default function Page() {
  const [billing, setBilling] = useState<'monthly' | 'quarterly'>('monthly')

  return (
    <>
      <MainNav />
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
        <HeroTwoColumnWithPhoto
                  eyebrow="Origin Story"
                  headline="From enterprise campaigns to giving growing businesses a real shot"
                  subheadline={
                      <>  
                      <p>
                        I spent my career inside top agencies building websites, apps, and social campaigns for Fortune 500 brands, working alongside some of the most creative minds in advertising. I loved the creativity and the scale of that work – like leading the team that rebuilt the entire Google Ads web platform, a product used by tens of millions of people.
                      </p>
                      <p>
                        But the longer I worked at that level, the more a pattern bothered me. Smaller and mid-sized businesses almost never got access to this kind of thinking or execution. They were bootstrapping, hiring whoever they could afford, or trying to figure out marketing, websites, and operations on their own – while the best talent was busy shipping massive campaigns for the biggest companies.
                        </p>
                        <p>
                        While freelancing as a lead producer at R/GA on Google projects, I had a realization: if smaller businesses could see what truly goes into enterprise-level marketing and business consulting, they would be blown away by what’s possible for them. With modern AI tools, one experienced enterprise-level marketer who knows what questions to ask and what problems to solve can now deliver that caliber of strategy, creative, and systems to growing businesses at a fraction of the old cost. Kickbord exists to do exactly that – bringing enterprise-level marketing and business consulting to small and mid-sized businesses that are ready to grow but should not have to do it alone.
                      </p>
                      <p>
                          -Mike M 
                      </p>
                      </>
                    }
                  cta={<> <Link href="/contact">Get in Touch <ArrowNarrowRightIcon /></Link>  </>}
                  photo={
                    <Screenshot wallpaper="green" placement="bottom">
                      <img
                        src="/mike.png"
                        alt=""
                        className="not-dark:bg-white/75 dark:bg-black/75 grayscale"
                        width={2000}
                        height={160}
                      />
                    </Screenshot>
                  }
                />

        {/* Who We Help */}
        <StatsThreeColumnWithDescription
          heading="Who We Help"
          description="Kickbord works with growing businesses that need stronger marketing, better digital systems, and a clearer path to scale. These are companies with real opportunity, but not always the time, in-house expertise, or internal infrastructure to turn that opportunity into consistent growth."
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
      <PricingHeroMultiTier 
              eyebrow="Pricing"
              headline="Choose the plan that's right for you"
              subheadline="Start with our Essential plan and upgrade as you grow"
             options={['Monthly', 'Annual'] as const}
                         plans={{
                           Monthly: (
                             <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                              <Wallpaper color="green" className="rounded-xl">
                               <Plan
                                 name="Core Contractor"
                                 price="$297"
                                 period="/ month"
                                 subheadline={<p>Perfect for businesses getting started with digital marketing modernization.</p>}
                                 features={['Functional Website', 'Missed Call Text Back', 'Local SEO', 'One-Click Marketing Campaigns', '5-Star Review Funnel']}
                                 cta={<ButtonLink href="#" size="lg" className="w-full justify-center">Get started</ButtonLink>}
                               />
                               </Wallpaper>
                               <Wallpaper color="blue" className="rounded-xl">
                               <Plan
                                 name="Growth Plan"
                                 price="$500"
                                 period="/ month (not including ad spend)"
                                 badge="Best value"
                                 subheadline={<p>For businesses ready to go all-in on marketing modernization.</p>}
                                 features={['Everything in Core Contractor Plus...', 'Weekly strategy calls', 'Slack access', 'Priority delivery']}
                                 cta={<ButtonLink href="#" size="lg" className="w-full justify-center">Start growing</ButtonLink>}
                               />
                               </Wallpaper>
      
                             </div>
                           ),
                           Annual: (
                             <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                              <Wallpaper color="green" className="rounded-xl">
                               <Plan
                                 name="Core Contractor"
                                 price="$1,200"
                                 period="/ year"
                                 badge="Save 20%"
                                 subheadline={<p>Save 20% with annual billing. Perfect for businesses getting started.</p>}
                               features={['Functional Website', 'Missed Call Text Back', 'Local SEO', 'One-Click Marketing Campaigns', '5-Star Review Funnel']}
                                 cta={<ButtonLink href="#" size="lg" className="w-full justify-center">Get started</ButtonLink>}
                               />
                               </Wallpaper>
                               <Wallpaper color="blue" className="rounded-xl">
                               <Plan
                                 name="Growth"
                                 price="$2,400"
                                 period="/ year"
                                 badge="Best value"
                                 subheadline={<p>Save 20% annually. For businesses going all-in on marketing modernization.</p>}
                                 features={['Unlimited projects', 'Weekly strategy calls', 'Slack access', 'Priority delivery']}
                                 cta={<ButtonLink href="#" size="lg" className="w-full justify-center">Start growing</ButtonLink>}
                               />
                               </Wallpaper>
                             </div>
                           ),
                         }}
            />

        {/* Features */}
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
