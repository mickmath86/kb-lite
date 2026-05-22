import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { EmailSignupForm } from '@/components/elements/email-signup-form'
import { Link } from '@/components/elements/link'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { Main } from '@/components/elements/main'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { FeatureThreeColumnWithDemos, Features } from '@/components/sections/features-three-column-with-demos'
import { FooterCategory, FooterLink, FooterWithLinkCategories } from '@/components/sections/footer-with-link-categories'
import { HeroWithDemoOnBackground } from '@/components/sections/hero-with-demo-on-background'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'
import { Plan, PricingMultiTier } from '@/components/sections/pricing-multi-tier'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'
import { Feature, FeaturesWithLargeDemo } from '@/components/sections/features-with-large-demo'
import { HeroTwoColumnWithPhoto } from '@/components/sections/hero-two-column-with-photo'


export default function Page() {
  return (
    <>
      <NavbarWithLogoActionsAndCenteredLinks
        id="navbar"
        links={
          <>
            <NavbarLink href="#">Pricing</NavbarLink>
            <NavbarLink href="#">About</NavbarLink>
            <NavbarLink href="#">Docs</NavbarLink>
            <NavbarLink href="#" className="sm:hidden">
              Log in
            </NavbarLink>
          </>
        }
        logo={
          <NavbarLogo href="/">
            <img
              src="/logos/kb-logo.png"
              alt="Kickbord"
              className="dark:hidden"
              width={150}
              height={28}
            />
            <img
              src="https://assets.tailwindplus.com/logos/oatmeal-instrument.svg?color=white"
              alt="Oatmeal"
              className="not-dark:hidden"
              width={85}
              height={28}
            />
          </NavbarLogo>
        }
        actions={
          <>
            <PlainButtonLink href="#" className="max-sm:hidden">
              Log in
            </PlainButtonLink>
            <ButtonLink href="#">Get started</ButtonLink>
          </>
        }
      />

      <Main>
        {/* Hero */}
        <HeroWithDemoOnBackground
          id="hero"
          eyebrow={
            <AnnouncementBadge href="#" text="Built from experience across Google, Nike, Samsung, Verizon, BBC, and more" cta="Learn more" variant="overlay" />
          }
          headline="Bring enterprise-level digital marketing to your business"
          subheadline={
            <p>
              Kickbord helps small and mid-sized businesses modernize their marketing, websites, and customer-facing systems with strategic consulting, AI voice agents, and hands-on digital execution.
            </p>
          }
          cta={
            <EmailSignupForm
              className="max-w-full"
              variant="overlay"
              cta={
                <>
                  Book a Strategy Call <ArrowNarrowRightIcon />
                </>
              }
            />
          }
          demo={
            <>
              <img
                className="bg-white/75 md:hidden dark:hidden"
                src="/hand.jpeg"
                alt=""
                width="3440"
                height="1500"
              />
              <img
                className="bg-black/75 not-dark:hidden md:hidden"
                src="/hand.jpeg"
                alt=""
                width="3440"
                height="1500"
              />
              <img
                className="bg-white/75 max-md:hidden lg:hidden dark:hidden"
                src="/hand.jpeg"
                alt=""
                width="3440"
                height="1500"
              />
              <img
                className="bg-black/75 not-dark:hidden max-md:hidden lg:hidden"
                src="/hand.jpeg"
                alt=""
                width="3440"
                height="1500"
              />
              <img
                className="bg-white/75 max-lg:hidden dark:hidden"
                src="https://assets.tailwindplus.com/screenshots/1.webp?top=1500"
                alt=""
                width="3440"
                height="1500"
              />
              <img
                className="bg-black/75 not-dark:hidden max-lg:hidden"
                src="https://assets.tailwindplus.com/screenshots/1.webp?top=1500&color=olive"
                alt=""
                width="3440"
                height="1500"
              />
            </>
          }
          footer={
            <LogoGrid>
              <Logo>
                <img
                  src="https://assets.tailwindplus.com/logos/9.svg?color=black&height=32"
                  className="dark:hidden"
                  alt=""
                  width={51}
                  height={32}
                />
                <img
                  src="https://assets.tailwindplus.com/logos/9.svg?color=white&height=32"
                  className="bg-black/75 not-dark:hidden"
                  alt=""
                  width={51}
                  height={32}
                />
              </Logo>
              <Logo>
                <img
                  src="https://assets.tailwindplus.com/logos/10.svg?color=black&height=32"
                  className="dark:hidden"
                  alt=""
                  width={70}
                  height={32}
                />
                <img
                  src="https://assets.tailwindplus.com/logos/10.svg?color=white&height=32"
                  className="bg-black/75 not-dark:hidden"
                  alt=""
                  width={70}
                  height={32}
                />
              </Logo>
              <Logo>
                <img
                  src="https://assets.tailwindplus.com/logos/11.svg?color=black&height=32"
                  className="dark:hidden"
                  alt=""
                  width={100}
                  height={32}
                />
                <img
                  src="https://assets.tailwindplus.com/logos/11.svg?color=white&height=32"
                  className="bg-black/75 not-dark:hidden"
                  alt=""
                  width={100}
                  height={32}
                />
              </Logo>
              <Logo>
                <img
                  src="https://assets.tailwindplus.com/logos/12.svg?color=black&height=32"
                  className="dark:hidden"
                  alt=""
                  width={85}
                  height={32}
                />
                <img
                  src="https://assets.tailwindplus.com/logos/12.svg?color=white&height=32"
                  className="bg-black/75 not-dark:hidden"
                  alt=""
                  width={85}
                  height={32}
                />
              </Logo>
              <Logo>
                <img
                  src="https://assets.tailwindplus.com/logos/13.svg?color=black&height=32"
                  className="dark:hidden"
                  alt=""
                  width={75}
                  height={32}
                />
                <img
                  src="https://assets.tailwindplus.com/logos/13.svg?color=white&height=32"
                  className="bg-black/75 not-dark:hidden"
                  alt=""
                  width={75}
                  height={32}
                />
              </Logo>
              <Logo>
                <img
                  src="https://assets.tailwindplus.com/logos/8.svg?color=black&height=32"
                  className="dark:hidden"
                  alt=""
                  width={85}
                  height={32}
                />
                <img
                  src="https://assets.tailwindplus.com/logos/8.svg?color=white&height=32"
                  className="bg-black/75 not-dark:hidden"
                  alt=""
                  width={85}
                  height={32}
                />
              </Logo>
            </LogoGrid>
          }
        />

        {/* Features */}
        <Features
          id="features"
          headline="Core services built to modernize how your business grows"
          subheadline={
            <p>
             Kickbord helps small and mid-sized businesses improve how they show up, respond, and convert through strategic marketing support, modern website experiences, and AI-powered business systems.
            </p>
          }
          cta={
            <Link href="#">
              See how it works <ArrowNarrowRightIcon />
            </Link>
          }
          features={
            <>
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="green" placement="bottom-right">
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?left=1200&top=736"
                      alt=""
                      className="bg-white/75 sm:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?left=1200&top=736&color=olive"
                      alt=""
                      width={1200}
                      height={736}
                      className="bg-black/75 not-dark:hidden sm:hidden"
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?left=1800&top=736"
                      alt=""
                      className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                      width={1800}
                      height={736}
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?left=1800&top=736&color=olive"
                      alt=""
                      width={1800}
                      height={736}
                      className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?left=1200&top=736"
                      alt=""
                      className="bg-white/75 max-lg:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?left=1200&top=736&color=olive"
                      alt=""
                      width={1200}
                      height={736}
                      className="bg-black/75 not-dark:hidden max-lg:hidden"
                    />
                  </Screenshot>
                }
                headline="AI Voice Agents"
                subheadline={<p>Deploy AI-powered receptionists that answer calls, qualify leads, route inquiries, and help your business stay responsive even when your team is busy.</p>}
              />
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="purple" placement="top-left">
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?right=1200&bottom=736"
                      alt=""
                      className="bg-white/75 sm:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?right=1200&bottom=736&color=olive"
                      alt=""
                      width={1200}
                      height={736}
                      className="bg-black/75 not-dark:hidden sm:hidden"
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?right=1800&bottom=736"
                      alt=""
                      className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                      width={1800}
                      height={736}
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?right=1800&bottom=736&color=olive"
                      alt=""
                      width={1800}
                      height={736}
                      className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?right=1200&bottom=736"
                      alt=""
                      className="bg-white/75 max-lg:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?right=1200&bottom=736&color=olive"
                      alt=""
                      width={1200}
                      height={736}
                      className="bg-black/75 not-dark:hidden max-lg:hidden"
                    />
                  </Screenshot>
                }
                
                headline="Websites & Digital Presence"
                subheadline={<p>Redesign outdated websites and digital touchpoints so your business looks sharper, feels more credible, and supports the way modern customers evaluate who to trust.</p>}
              />
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="blue" placement="bottom-left">
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?right=1200&top=736"
                      alt=""
                      className="bg-white/75 sm:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?right=1200&top=736&color=olive"
                      alt=""
                      width={1200}
                      height={736}
                      className="bg-black/75 not-dark:hidden sm:hidden"
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?right=1800&top=736"
                      alt=""
                      className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                      width={1800}
                      height={736}
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?right=1800&top=736&color=olive"
                      alt=""
                      className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                      width={1800}
                      height={736}
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?right=1200&top=736"
                      alt=""
                      className="bg-white/75 max-lg:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="https://assets.tailwindplus.com/screenshots/1.webp?right=1200&top=736&color=olive"
                      alt=""
                      className="bg-black/75 not-dark:hidden max-lg:hidden"
                      width={1200}
                      height={736}
                    />
                  </Screenshot>
                }
                headline="Marketing Strategy & Systems"
                subheadline={<p>Clarify your messaging, improve your digital presence, and build stronger marketing systems so your business can operate with more consistency and confidence.</p>}
              />
              
            </>
          }
        />

        {/* Stats */}
        <StatsWithGraph
          id="stats"
          eyebrow="Why businesses hire Kickbord"
          headline="Small businesses now have access to capabilities that used to belong to much bigger companies."
          subheadline={
            <p>
              AI is giving small and mid-sized businesses new ways to respond faster, automate routine work, and compete more effectively without building a large team. Pair that with a stronger website and clearer digital touchpoints, and there is more opportunity than ever to operate with the speed, credibility, and efficiency customers now expect.
            </p>
          }
        >
          <Stat stat="21x" text="Businesses are 21 times more likely to qualify a lead when they respond within 5 minutes — which is why AI responders and voice agents can be so valuable when speed matters." source="LeadAngel" sourceLink="https://www.leadangel.com/blog/operations/speed-to-lead-statistics/" />
          <Stat stat="64%" text="SMB leaders say AI helps level the playing field with larger competitors.  " source="Connected Counsel" sourceLink="https://connectedcouncil.org/wp-content/uploads/2025/03/Digital-Ads-and-AI-Help-Small-Businesses-Navigate-Uncertainty.pdf" />
        </StatsWithGraph>

          {/* AI  Agent Feature */}
          <FeaturesWithLargeDemo
            id="ai-capabilities"
            headline="Powerful AI features that work for you"
            subheadline="Automate customer interactions and scale your business without scaling your team"
            demo={
              <Screenshot wallpaper="green" placement="bottom">
                <img
                  src="https://assets.tailwindplus.com/screenshots/1.webp?left=1200&top=736"
                  alt="AI dashboard"
                  className="bg-black/75 not-dark:hidden max-lg:hidden"
                  width={1200}
                  height={736}
                />
              </Screenshot>
            }
            features={
              <>
                <Feature
                  headline="Instant Call Answering"
                  subheadline={<p>AI agents pick up every call in under 2 seconds, ensuring no customer waits.</p>}
                />
                <Feature
                  headline="Natural Conversations"
                  subheadline={<p>Advanced language models create human-like interactions that feel authentic.</p>}
                />
                <Feature
                  headline="Lead Scoring"
                  subheadline={<p>Automatically identify and prioritize high-value prospects based on conversation data.</p>}
                />
                <Feature
                  headline="CRM Integration"
                  subheadline={<p>Sync call data directly to your existing tools and workflows seamlessly.</p>}
                />
                <Feature
                  headline="Custom Scripts"
                  subheadline={<p>Train agents on your specific business needs, products, and services.</p>}
                />
                <Feature
                  headline="Performance Tracking"
                  subheadline={<p>Monitor call metrics, conversion rates, and customer satisfaction in real-time.</p>}
                />
              </>
            }
          />
        <HeroTwoColumnWithPhoto
          eyebrow={<div className="text-sm font-semibold text-olive-600 dark:text-olive-400">AI-Powered Solutions</div>}
          headline="Never miss another opportunity with 24/7 AI voice agents"
          subheadline={
            <p>
              Deploy intelligent voice agents that answer calls, qualify leads, and route inquiries automatically. 
              Keep your business responsive around the clock while your team focuses on closing deals and delivering value.
            </p>
          }
          cta={
            <div className="flex gap-4">
              <ButtonLink href="#">Get started</ButtonLink>
              <PlainButtonLink href="#">Learn more</PlainButtonLink>
            </div>
          }
          photo={
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop"
              alt="AI voice agent dashboard"
              className="w-full h-full"
            />
          }
         
        />  
        {/* Testimonial */}
        <TestimonialLargeQuote
          id="testimonial"
          quote={
            <p>
              Oatmeal has completely transformed our customer support operations. The blend of AI efficiency and human
              empathy has allowed us to provide exceptional service while significantly reducing costs.
            </p>
          }
          img={
            <img
              src="https://assets.tailwindplus.com/avatars/10.webp?size=160"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="Jordan Rogers"
          byline="Founder at Anomaly"
        />

        {/* FAQs */}
        <FAQsTwoColumnAccordion id="faqs" headline="Questions & Answers">
          <Faq
            id="faq-1"
            question="Do I need a credit card to start the free trial?"
            answer="Yes, but don't worry, you won't be charged until the trial period is over. We won't send you an email reminding you when this happens because we are really hoping you'll forget and we can keep charging you until your cards expires"
          />
          <Faq
            id="faq-2"
            question="Can my whole team use the same inbox?"
            answer="Yes, the more the merrier! Oatmeal works best when your entire company has access. We will charge you per additional seat, but we won't tell you about this until you get your invoice."
          />
          <Faq
            id="faq-3"
            question="Is the AI agent actually a bunch of people in India?"
            answer="Not just India! We have people in lots of countries around the world pretending to be an AI, including some that are currently under sanctions, so we can't legally mention them here."
          />
          <Faq
            id="faq-4"
            question="Does Oatmeal replace my email client?"
            answer="Absolutely. The idea is that we transition you away from email entirely, so you become completely dependent on our service. Like a parasite living off a host."
          />
        </FAQsTwoColumnAccordion>

        {/* Pricing */}
        <PricingMultiTier
          id="pricing"
          headline="Pricing to fit your business needs."
          plans={
            <>
              <Plan
                name="Starter"
                price="$12"
                period="/mo"
                subheadline={<p>Small teams getting started with shared inboxes</p>}
                features={[
                  'Shared inbox for up to 2 mailboxes',
                  'Tagging & assignment',
                  'Private notes',
                  'Automatic replies',
                  'Email support',
                ]}
                cta={
                  <SoftButtonLink href="#" size="lg">
                    Start free trial
                  </SoftButtonLink>
                }
              />
              <Plan
                name="Growth"
                price="$49"
                period="/mo"
                subheadline={<p>Growing teams needing collaboration and insights</p>}
                badge="Most popular"
                features={[
                  'Everything in Starter',
                  'Inbox Agent',
                  'Unlimited mailboxes',
                  'Collision detection',
                  'Snippets and templates',
                  'Reporting dashboard',
                  'Slack integration',
                ]}
                cta={
                  <ButtonLink href="#" size="lg">
                    Start free trial
                  </ButtonLink>
                }
              />
              <Plan
                name="Pro"
                price="$299"
                period="/mo"
                subheadline={<p>Support-focused organizations and larger teams</p>}
                features={[
                  'Everything in Growth',
                  'Custom roles & permissions',
                  'Automation engine',
                  'API access',
                  'SLA tracking',
                  'SSO support',
                  'SOC 2 compliance',
                ]}
                cta={
                  <SoftButtonLink href="#" size="lg">
                    Start free trial
                  </SoftButtonLink>
                }
              />
            </>
          }
        />

        {/* Call To Action */}
        <CallToActionSimple
          id="call-to-action"
          headline="Ready to make customer support feel simple again?"
          subheadline={
            <p>
              Join hundreds of teams using Oatmeal to deliver faster, friendlier email support — using a massive network
              of low wage workers stationed around the globe
            </p>
          }
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="#" size="lg">
                Start free trial
              </ButtonLink>

              <PlainButtonLink href="#" size="lg">
                Book a demo <ChevronIcon />
              </PlainButtonLink>
            </div>
          }
        />
      </Main>

      <FooterWithLinkCategories
        id="footer"
        links={
          <>
            <FooterCategory title="Product">
              <FooterLink href="#">Features</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
              <FooterLink href="#">Integrations</FooterLink>
            </FooterCategory>
            <FooterCategory title="Company">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Press Kit</FooterLink>
            </FooterCategory>
            <FooterCategory title="Resources">
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">API Docs</FooterLink>
              <FooterLink href="#">Status</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </FooterCategory>
            <FooterCategory title="Legal">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Security</FooterLink>
            </FooterCategory>
            <FooterCategory title="Connect">
              <FooterLink href="#">X</FooterLink>
              <FooterLink href="#">GitHub</FooterLink>
              <FooterLink href="#">YouTube</FooterLink>
            </FooterCategory>
          </>
        }
        fineprint="© 2025 Oatmeal, Inc."
      />
    </>
  )
}
