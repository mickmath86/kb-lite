import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { Button, ButtonLink, PlainButton, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { EmailSignupForm } from '@/components/elements/email-signup-form'
import { Link } from '@/components/elements/link'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { Main } from '@/components/elements/main'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChatBubbleCircleIcon } from '@/components/icons/chat-bubble-circle-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { TargetIcon } from '@/components/icons/target-icon'
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
import { HeroSimpleLeftAligned } from '@/components/sections/hero-simple-left-aligned'
import { HeroLeftAlignedWithPhoto } from '@/components/sections/hero-left-aligned-with-photo'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import NavDropDown from '@/components/elements/navbar-dropdown'
import NavbarDropdown2 from '@/components/elements/navbar-dropdown-2'
import { FeaturesStackedAlternatingWithDemos, Feature as FeatureStacked } from '@/components/sections/features-stacked-alternating-with-demos'
import MainNav from '@/components/sections/main-nav'
import { ThemedSection } from '@/components/elements/themed-section'
import { FadeInSection } from '@/components/elements/fade-in-section'
import { ArrowRightIcon } from '@heroicons/react/16/solid'

export default function Page() {
  return (
    <>
      <MainNav />

      <Main>
        {/* Hero */}
        <HeroWithDemoOnBackground
          id="hero"
          eyebrow={
            <AnnouncementBadge href="/about" text="Built from experience across Google, Nike, Samsung, Verizon, BBC, and more" cta="Learn more" variant="overlay" />
          }
          headline="Marketing Systems for Home Service Businesses"
          subheadline={
            <p>
              Kickbord helps small and mid-sized businesses grow with AI-powered websites that capture and follow up with leads instantly, Google visibility that drives qualified traffic, and strategic marketing systems that scale.
            </p>
          }
          cta={
           <div className="flex flex-wrap gap-4">
            <Button color="light" size="lg">Book a free call</Button>
            <PlainButton color="light" size="lg">See how it works <ArrowNarrowRightIcon /></PlainButton>
          </div>
          }
          demo={
            <>
              <img
                className="bg-white/75 md:hidden dark:hidden"
                src="/images/hero.png"
                alt=""
                width="3440"
                height="1500"
              />
              <img
                className="bg-black/75 not-dark:hidden md:hidden"
                src="/images/hero.png"
                alt=""
                width="3440"
                height="1500"
              />
              <img
                className="bg-white/75 max-md:hidden lg:hidden dark:hidden"
                src="/images/hero.png"
                alt=""
                width="3440"
                height="1500"
              />
              <img
                className="bg-black/75 not-dark:hidden max-md:hidden lg:hidden"
                src="/images/hero.png"
                alt=""
                width="3440"
                height="1500"
              />
              <img
                className="bg-white/75 max-lg:hidden dark:hidden"
                 src="/images/hero.png"
                alt=""
                width="3440"
                height="1500"
              />
              <img
                className="bg-black/75 not-dark:hidden max-lg:hidden"
                src="/images/hero.png"
                width="3440"
                height="1500"
              />
            </>
          }
          footer={
            <LogoGrid>
              <Logo>
                <img
                  src="https://cdn.brandfetch.io/id6O2oGzv-/w/800/h/271/theme/light/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ"
                  className="grayscale brightness-0 dark:brightness-0 dark:invert"
                  alt="Google"
                  width={94}
                  height={32}
                />
              </Logo>
              <Logo>
                <img
                  src="https://cdn.brandfetch.io/idtEghWGp4/w/800/h/229/theme/dark/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ"
                  className="grayscale brightness-0 dark:brightness-0 dark:invert"
                  alt="BBC"
                  width={112}
                  height={32}
                />
              </Logo>
              <Logo>
                <img
                  src="https://cdn.brandfetch.io/id_0dwKPKT/w/800/h/278/theme/light/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ"
                  className="grayscale brightness-0 dark:brightness-0 dark:invert"
                  alt="Nike"
                  width={92}
                  height={32}
                />
              </Logo>
              <Logo>
                <img
                  src="https://cdn.brandfetch.io/iduaw_nOnR/w/800/h/122/theme/light/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ"
                  className="grayscale brightness-0 dark:brightness-0 dark:invert"
                  alt="Samsung"
                  width={210}
                  height={32}
                />
              </Logo>
             
              <Logo>
                <img
                  src="https://cdn.brandfetch.io/id6htIcs_f/w/90/h/90/theme/dark/id4N0u-dxx.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ"
                  className="grayscale brightness-0 dark:brightness-0 dark:invert"
                  alt="Procter & Gamble"
                  width={32}
                  height={32}
                />
              </Logo>
              <Logo>
                <img
                  src="https://cdn.brandfetch.io/idXhrQrb5t/w/800/h/179/theme/dark/logo.png?c=1bxmjesfnzjpwu6tsu9dxg29y5qq3SHVrbQ"
                  className="grayscale brightness-0 dark:brightness-0 dark:invert"
                  alt="Verizon"
                  width={143}
                  height={32}
                />
              </Logo>
            </LogoGrid>
          }
        />
        {/* Header */}
        <FadeInSection>
        <ThemedSection theme="dark">
          <HeroSimpleLeftAligned
            eyebrow={<div className="text-sm font-semibold text-olive-600 dark:text-olive-400">The Kickbord system</div>}
            headline="Every lead captured. Every follow-up handled. Every campaign one click away."
            color="light"
            subheadline={
              <p>
                Kickbord replaces the patchwork of agencies, tools, and DIY marketing with one system built for home service businesses — a website that converts, instant responses to every lead, reviews on autopilot, and campaigns that fill your calendar. No marketing team required.
              </p>
            }
            
          />
        </ThemedSection>
        </FadeInSection>
        {/* Features */}
         <FadeInSection delay={100}>
        <Features
          id="products"
          headline="Our Systems"
          subheadline={
            <p>
              Kickbord brings together a modern AI website, Google ad management, and automated reputation-building — all done for you, with no setup fees.
            </p>
          }
         
          features={
            <>
            {/* Functional Website */}
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="green" placement="bottom-right">
                    <img
                      src="/images/website.png"
                      alt="General contractor website"
                      className="sm:hidden"
                      width={1200}
                      height={900}
                    />
                    <img
                      src="/images/website.png"
                      alt="General contractor website"
                      className="max-sm:hidden lg:hidden"
                      width={1800}
                      height={1350}
                    />
                    <img
                      src="/images/website.png"
                      alt="General contractor website"
                      className="max-lg:hidden"
                      width={1200}
                      height={900}
                    />
                  </Screenshot>
                }
                headline="Functional Website"
                subheadline={
                  <>
                    <p>Your website should be your hardest-working employee — capturing every visitor’s info and following up before they ever think to call a competitor.</p>
                    <ul>
                      <li className="list-disc list-inside">Instant answers for visitors, day or night</li>
                      <li className="list-disc list-inside">Custom forms that capture every lead</li>
                      <li className="list-disc list-inside">Automatic text & email follow-up on every inquiry</li>
                    </ul>
                  </>
                }
                                cta={
                  <PlainButtonLink href="/contact">See short demo <ArrowRightIcon className="h-4 w-4" /></PlainButtonLink>
                }
              />

              {/* Fallback Voice Receptionist */}
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="purple" placement="top-left">
                    <img
                      src="/images/ai-receptionist.png"
                      alt="Landscaping business website"
                      className="sm:hidden"
                      width={1200}
                      height={900}
                    />
                    <img
                      src="/images/ai-receptionist.png"
                      alt="Landscaping business website"
                      className="max-sm:hidden lg:hidden"
                      width={1800}
                      height={1350}
                    />
                    <img
                      src="/images/ai-receptionist.png"
                      alt="Landscaping business website"
                      className="max-lg:hidden"
                      width={1200}
                      height={900}
                    />
                  </Screenshot>
                }
                headline="Fallback AI Voice Receptionist"
                subheadline={
                  <>
                    <p>Every missed call is a customer dialing the next name on Google. When you can’t pick up, your AI receptionist answers on your existing number — so the job still goes to you.</p>
                    <ul>
                      <li className="list-disc list-inside">Answers missed calls instantly</li>
                      <li className="list-disc list-inside">Books jobs and answers questions for you</li>
                      <li className="list-disc list-inside">Sends you the transcript and lead details</li>
                    </ul>
                  </>
                }
                                cta={
                  <PlainButtonLink href="/contact">See short demo <ArrowRightIcon className="h-4 w-4" /></PlainButtonLink>
                }
              />

              {/* 5-Star Review Funnel */}
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="green" placement="bottom-right">
                    <img
                      src="/images/reviews.png"
                      alt="Roofing business website"
                      className="sm:hidden"
                      width={1200}
                      height={900}
                    />
                    <img
                      src="/images/reviews.png"
                      alt="Roofing business website"
                      className="max-sm:hidden lg:hidden"
                      width={1800}
                      height={1350}
                    />
                    <img
                      src="/images/reviews.png"
                      alt="Roofing business website"
                      className="max-lg:hidden"
                      width={1200}
                      height={900}
                    />
                  </Screenshot>
                }
                headline="5-Star Review Funnel"
                subheadline={
                  <>
                    <p>Happy customers rarely think to leave reviews — and asking is easy to forget. We ask automatically the moment the job is done, building the reputation that wins your next job.</p>
                    <ul>
                      <li className="list-disc list-inside">Review requests sent automatically after every job</li>
                      <li className="list-disc list-inside">More Google reviews means higher local rankings</li>
                      <li className="list-disc list-inside">New customers see proof before they ever call</li>
                    </ul>
                  </>
                }
                              cta={
                <PlainButtonLink href="/contact">See short demo <ArrowRightIcon className="h-4 w-4" /></PlainButtonLink>
              }
              />
              
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="blue" placement="bottom-right">
                    <img
                      src="/images/local-seo.png"
                      alt="General contractor website"
                      className="sm:hidden"
                      width={1200}
                      height={900}
                    />
                    <img
                      src="/images/local-seo.png"
                      alt="General contractor website"
                      className="max-sm:hidden lg:hidden"
                      width={1800}
                      height={1350}
                    />
                    <img
                      src="/images/local-seo.png"
                      alt="General contractor website"
                      className="max-lg:hidden"
                      width={1200}
                      height={900}
                    />
                  </Screenshot>
                }
                headline="Local SEO"
                subheadline={
                  <>
                    <p>When someone nearby searches for your service, the businesses on page one get the calls. We make sure that’s you.</p>
                    <ul>
                      <li className="list-disc list-inside">Rank higher in local search and Google Maps</li>
                      <li className="list-disc list-inside">Show up for the services you actually offer</li>
                      <li className="list-disc list-inside">Steady leads without paying for every click</li>
                    </ul>
                  </>
                }
                                cta={
                  <PlainButtonLink href="/contact">See short demo <ArrowRightIcon className="h-4 w-4" /></PlainButtonLink>
                }
              />

                {/* One click marketing Campaigns */}
               <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="brown" placement="top-right">
                    <img
                      src="/images/oc-marketing.png"
                      alt="General contractor website"
                      className="sm:hidden"
                      width={1200}
                      height={900}
                    />
                    <img
                      src="/images/oc-marketing.png"
                      alt="General contractor website"
                      className="max-sm:hidden lg:hidden"
                      width={1800}
                      height={1350}
                    />
                    <img
                      src="/images/oc-marketing.png"
                      alt="General contractor website"
                      className="max-lg:hidden"
                      width={1200}
                      height={900}
                    />
                  </Screenshot>
                }
                headline="One-Click Marketing Campaigns"
                subheadline={
                  <>
                    <p>Your past customer list is the cheapest source of new work you have. Launch an SMS or email promotion in one click and fill a slow week fast.</p>
                    <ul>
                      <li className="list-disc list-inside">Text and email promos to your whole contact list</li>
                      <li className="list-disc list-inside">Seasonal offers and win-back campaigns ready to go</li>
                      <li className="list-disc list-inside">Turn slow weeks into booked-out ones</li>
                    </ul>
                  </>
                }
                                cta={
                  <PlainButtonLink href="/contact">See short demo <ArrowRightIcon className="h-4 w-4" /></PlainButtonLink>
                }
              />
              {/* end oneclick marketing campaigns */}

              {/* LSA Ads  */}
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="green" placement="bottom-right">
                    <img
                      src="/images/lsa.png"
                      alt="General contractor website"
                      className="sm:hidden"
                      width={1200}
                      height={900}
                    />
                    <img
                      src="/images/lsa.png"
                      alt="General contractor website"
                      className="max-sm:hidden lg:hidden"
                      width={1800}
                      height={1350}
                    />
                    <img
                      src="/images/lsa.png"
                      alt="General contractor website"
                      className="max-lg:hidden"
                      width={1200}
                      height={900}
                    />
                  </Screenshot>
                }
                headline="Google Local Service Ads"
                subheadline={
                  <>
                    <p>LSAs put you at the very top of Google — above regular ads — with the Google Guaranteed badge customers trust. And you only pay when a real customer actually calls.</p>
                    <ul>
                      <li className="list-disc list-inside">Placement at the very top of Google</li>
                      <li className="list-disc list-inside">Google Guaranteed badge builds instant trust</li>
                      <li className="list-disc list-inside">Pay per lead, not per click</li>
                    </ul>
                  </>
                }
                                cta={
                  <PlainButtonLink href="/contact">See short demo <ArrowRightIcon className="h-4 w-4" /></PlainButtonLink>
                }
              />
            
            </>
          }
         
        />
        </FadeInSection>
     
        <FadeInSection delay={100}>
        <FeaturesStackedAlternatingWithDemos
                    eyebrow="How it works"
                    headline="From kickoff to live in three steps."
                    features={
                      <>
                        <FeatureStacked
                          headline="Step 1 — Demo Call (20 Mins)"
                          subheadline={<p>We start by understanding your business, your customers, and your goals. This shapes every decision that follows.</p>}
                          cta={<PlainButtonLink href="#" size="md">Start here <ArrowNarrowRightIcon /></PlainButtonLink>}
                          demo={<DemoPlaceholder label="discovery session visual" />}
                        />
                        <FeatureStacked
                          headline="Step 2 — Build & Configure (7-10 Days)"
                          subheadline={<p>We build your website, configure your AI agent, or execute your campaign strategy — fast, with full transparency.</p>}
                          cta={<PlainButtonLink href="#" size="md">See the process <ArrowNarrowRightIcon /></PlainButtonLink>}
                          demo={<DemoPlaceholder label="build process visual" />}
                        />
                        <FeatureStacked
                          headline="Step 3 — Launch & Optimize (Ongoing)"
                          subheadline={<p>Your deliverable goes live with performance checks and a clear handoff. We stay available for questions and iteration.</p>}
                          cta={<PlainButtonLink href="#" size="md">Get started <ArrowNarrowRightIcon /></PlainButtonLink>}
                          demo={<DemoPlaceholder label="launch visual" />}
                        />
                      </>
                    }
                  />
        </FadeInSection>
        
        {/* Testimonial */}
        
        

        {/* FAQs */}
        <FadeInSection delay={100}>
        <FAQsTwoColumnAccordion id="faqs" headline="Questions & Answers">
          <Faq
            id="faq-1"
            question="What kinds of businesses does Kickbord work with?"
            answer="Kickbord works with home service businesses and trades (plumbers, electricians, HVAC, roofers, landscapers, cleaners) — typically 1-50 person companies that need a steady pipeline of local jobs but don't have an in-house marketing team."
          />
          <Faq
            id="faq-2"
            question="What's included in the AI Website + Lead System?"
            answer="Your new website comes with a built-in AI chatbot, live chat, contact forms, SMS lead notifications, and automated follow-up sequences — so every inquiry gets an instant response, even when you're on a job."
          />
          <Faq
            id="faq-3"
            question="How does Google Visibility & Reputation work?"
            answer="We set up and manage your Google Local Services Ads so you appear at the top of search results for your area. After every completed job, an automated SMS goes out requesting a review — driving more qualified leads and building your 5-star reputation over time."
          />
          <Faq
            id="faq-4"
            question="What does Marketing & Growth Strategy include?"
            answer="You get a strategic partner who helps clarify your positioning, tighten your messaging, and build marketing systems that scale — so your business operates with the consistency and confidence of a much larger company."
          />
          <Faq
            id="faq-5"
            question="Do I need all three services?"
            answer="No. Many businesses start with just the AI Website + Lead System to fix their response time problem, then add Google Visibility & Reputation or Marketing Strategy as they grow. We'll help you figure out what makes the most sense for where you are now."
          />
          <Faq
            id="faq-6"
            question="What if I'm not sure what I need yet?"
            answer="That's exactly what the first conversation is for. We'll look at your current setup, identify the biggest opportunity (website, Google visibility, or broader strategy), and recommend a clear starting point."
          />
        </FAQsTwoColumnAccordion>
        </FadeInSection>

      

        {/* Call To Action */}
        <FadeInSection delay={100}>
        <CallToActionSimple
          id="call-to-action"
          headline="Ready to bring enterprise-level marketing to your business?"
          subheadline={
            <p>
              Book a free strategy call and find out exactly where AI, better websites, and smarter marketing can move the needle for your business.
            </p>
          }
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="/get-started" size="lg">
                Get started <ArrowNarrowRightIcon />
              </ButtonLink>
              <PlainButtonLink href="/booking" size="lg">
                Book a call <ChevronIcon />
              </PlainButtonLink>
            </div>
          }
        />
        </FadeInSection>
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


function DemoPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-olive-950/5 dark:bg-white/5">
      <p className="text-sm text-olive-500 dark:text-olive-400">{label}</p>
    </div>
  )
}