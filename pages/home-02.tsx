import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { Button, ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
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


export default function Page() {
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
              className="not-dark:hidden"
              width={85}
              height={28}
            />
            {/* <h1 className="text-4xl  font-display">Kickbord</h1> */}
          </NavbarLogo>
        }
        actions={
          <>
            <PlainButtonLink href="#" className="max-sm:hidden">
              Log in
            </PlainButtonLink>
            <ButtonLink href="/get-started">Get started <ArrowNarrowRightIcon /></ButtonLink>
          </>
        }
      />

      <Main>
        {/* Hero */}
        <HeroWithDemoOnBackground
          id="hero"
          eyebrow={
            <AnnouncementBadge href="/about" text="Built from experience across Google, Nike, Samsung, Verizon, BBC, and more" cta="Learn more" variant="overlay" />
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

        {/* Features */}
        <Features
          id="features"
          headline="Three systems that work together to grow your business"
          subheadline={
            <p>
              Kickbord brings together a modern AI website, Google ad management, and automated reputation-building — all done for you, with no setup fees.
            </p>
          }
          cta={
            <Link href="/services">
              See how it works <ArrowNarrowRightIcon />
            </Link>
          }
          features={
            <>
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="green" placement="bottom-right">
                    <img
                      src="/images/kb-feature-ai-website.png"
                      alt="Business owner receiving a new lead notification on his phone"
                      className="sm:hidden"
                      width={1200}
                      height={900}
                    />
                    <img
                      src="/images/kb-feature-ai-website.png"
                      alt="Business owner receiving a new lead notification on his phone"
                      className="max-sm:hidden lg:hidden"
                      width={1800}
                      height={1350}
                    />
                    <img
                      src="/images/kb-feature-ai-website.png"
                      alt="Business owner receiving a new lead notification on his phone"
                      className="max-lg:hidden"
                      width={1200}
                      height={900}
                    />
                  </Screenshot>
                }
                headline="AI Voice Agents"
                subheadline={<p>Deploy AI-powered receptionists that answer calls, qualify leads, route inquiries, and help your business stay responsive even when your team is busy.</p>}
              />
              <FeatureThreeColumnWithDemos
                demo={
                  <Screenshot wallpaper="brown" placement="top-left">
                    <img
                      src="/images/kb-feature-google-reputation.png"
                      alt="HVAC business owner smiling behind a laptop showing Google Local Services results"
                      className="sm:hidden"
                      width={1200}
                      height={900}
                    />
                    <img
                      src="/images/kb-feature-google-reputation.png"
                      alt="HVAC business owner smiling behind a laptop showing Google Local Services results"
                      className="max-sm:hidden lg:hidden"
                      width={1800}
                      height={1350}
                    />
                    <img
                      src="/images/kb-feature-google-reputation.png"
                      alt="HVAC business owner smiling behind a laptop showing Google Local Services results"
                      className="max-lg:hidden"
                      width={1200}
                      height={900}
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
                      src="/images/kb-feature-marketing-strategy.png"
                      alt="Consultant reviewing a marketing report with a small business owner"
                      className="sm:hidden"
                      width={1200}
                      height={900}
                    />
                    <img
                      src="/images/kb-feature-marketing-strategy.png"
                      alt="Consultant reviewing a marketing report with a small business owner"
                      className="max-sm:hidden lg:hidden"
                      width={1800}
                      height={1350}
                    />
                    <img
                      src="/images/kb-feature-marketing-strategy.png"
                      alt="Consultant reviewing a marketing report with a small business owner"
                      className="max-lg:hidden"
                      width={1200}
                      height={900}
                    />
                  </Screenshot>
                }
                headline="Marketing & Growth Strategy"
                subheadline={<p>Get a strategic partner who helps you clarify your positioning, tighten your messaging, and build marketing systems that scale — so your business operates with the consistency and confidence of a much larger company.</p>}
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

        {/* web feature section */}
     
        <FeaturesWithLargeDemo
          id="web-features"
          eyebrow="Websites & digital presence"
          headline="Websites that build credibilty and convert with more confidence."
          subheadline="For many small and mid-sized businesses, the website is still the first real test of trust. Kickbord helps modernize outdated digital experiences so businesses communicate more clearly, feel more polished, and make it easier for the right customers to take action."
          demo={
            <Screenshot wallpaper="blue" placement="bottom">
              <img
                src="https://assets.tailwindplus.com/screenshots/1.webp?right=1200&top=736"
                alt="Modern website design"
                className="bg-black/75 dark:hidden max-lg:hidden"
                width={1200}
                height={736}
              />
            </Screenshot>
          }
          features={
            <>
              <Feature
                icon={<ChatBubbleCircleIcon />}
                headline="Clear messaging"
                subheadline={<p>Make it immediately obvious what the business does, who it helps, and what the next step should be. Clear homepage messaging is a recurring recommendation for professional-service websites.</p>}
              />
              <Feature
                icon={<SparklesIcon />}
                headline="Credible design"
                subheadline={<p>A modern visual system helps the business feel trustworthy, established, and worth contacting. First impressions are heavily design-related, and website credibility is closely tied to design quality.</p>}
              />
              <Feature
                icon={<TargetIcon />}
                headline="Conversion-ready UX"
                subheadline={<p>Strong structure, mobile responsiveness, speed, and clear calls to action help visitors move from interest to inquiry.</p>}
              />
              
            </>
          }
        />
        {/* Testimonial */}
        <HeroTwoColumnWithPhoto
          eyebrow="About Kickbord"
          headline="Built to bring bigger-business digital capability to smaller companies"
          subheadline="Kickbord is led by Mike Mathias, digital strategist and builder with experience across major brands including Google, Nike, Samsung, Verizon, and BBC. The goal is to bring that level of digital thinking, execution, and modernization to small and mid-sized businesses that need to compete more effectively online."
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
        

        {/* FAQs */}
        <FAQsTwoColumnAccordion id="faqs" headline="Questions & Answers">
          <Faq
            id="faq-1"
            question="What kinds of businesses does Kickbord work with?"
            answer="Kickbord works with small and mid-sized businesses that want a stronger digital presence, better customer response systems, and more modern ways of operating online."
          />
          <Faq
            id="faq-2"
            question="Do you only do AI voice agents?"
            answer="No. AI voice agents are one featured offer, but Kickbord also helps businesses improve websites, digital systems, messaging, and broader customer-facing workflows."
          />
          <Faq
            id="faq-3"
            question="What is an AI voice agent, exactly?"
            answer="An AI voice agent is a conversational phone assistant that can answer calls, qualify leads, answer common questions, route inquiries, and support scheduling more intelligently than a traditional phone menu."
          />
          <Faq
            id="faq-4"
            question="Can AI really help a small business?"
            answer="Yes. For many smaller teams, AI is most useful when it improves responsiveness, reduces repetitive work, and helps the business operate with more consistency and efficiency."
          />
          <Faq
            id="faq-5"
            question="Do you also redesign websites?"
            answer="Yes. Kickbord redesigns websites for businesses that need a more credible, modern, and conversion-aware digital presence."
          />
          <Faq
            id="faq-6"
            question="What if I am not sure what I need yet?"
            answer="That is exactly what the first conversation is for. Kickbord can help identify whether the biggest opportunity is in AI, website improvements, digital strategy, or a broader systems upgrade."
          />
        </FAQsTwoColumnAccordion>

      

        {/* Call To Action */}
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
