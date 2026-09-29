import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { Button, ButtonLink, PlainButton, PlainButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { Main } from '@/components/elements/main'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import {
  FeatureThreeColumnWithDemos,
  Features as FeaturesThreeColWithDemos,
} from '@/components/sections/features-three-column-with-demos'
import { FooterCategory, FooterLink, FooterWithLinkCategories } from '@/components/sections/footer-with-link-categories'
import { HeroWithDemoOnBackground } from '@/components/sections/hero-with-demo-on-background'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { FeaturesStackedAlternatingWithDemos, Feature as FeatureStacked } from '@/components/sections/features-stacked-alternating-with-demos'
import MainNav from '@/components/sections/main-nav'
import { FadeInSection } from '@/components/elements/fade-in-section'


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
            <a href="/lp/booking"><Button color="light" size="lg">Book a free call</Button></a>
            <a href="/lp/how-it-works"><PlainButton color="light" size="lg">See how it works <ArrowNarrowRightIcon /></PlainButton></a>
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
     
        {/* Features */}

{/* Features */}
        <FeaturesStackedAlternatingWithDemos
          id="features"
          headline="Everything you need to deliver personal, organized, and delightful support."
          subheadline={
            <p>
              Work smarter, reply faster, and keep every customer conversation right where it belongs — in one simple
              inbox, where you can ignore it.
            </p>
          }
          features={
            <>
              <FeatureStacked
                headline="Functional Websites"
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
                  <Link href="/systems/functional-website">
                    See short Demo<ChevronIcon />
                  </Link>
                }
                demo={
                  <Screenshot wallpaper="blue" placement="bottom-right">
                    <img
                      src="/images/website.png"
                      alt=""
                      className="bg-white/75 sm:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/website.png"
                      alt=""
                      width={1200}
                      height={736}
                      className="bg-black/75 not-dark:hidden sm:hidden"
                    />
                    <img
                      src="/images/website.png"
                      alt=""
                      className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                      width={1500}
                      height={680}
                    />
                    <img
                      width={1500}
                      height={680}
                      src="/images/website.png"
                      alt=""
                      className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    />
                    <img
                      src="/images/website.png"
                      alt=""
                      className="bg-white/75 max-lg:hidden dark:hidden"
                      width={1500}
                      height={1240}
                    />
                    <img
                      width={1500}
                      height={1240}
                      src="/images/website.png"
                      alt=""
                      className="bg-black/75 not-dark:hidden max-lg:hidden"
                    />
                  </Screenshot>
                }
              />
              <FeatureStacked
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
                }                cta={
                  <Link href="/systems/ai-receptionist">
                    Learn more <ChevronIcon />
                  </Link>
                }
                demo={
                  <Screenshot wallpaper="purple" placement="top-left">
                    <img
                      src="/images/ai-receptionist.png"
                      alt=""
                      className="bg-white/75 sm:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/ai-receptionist.png"
                      alt=""
                      width={1200}
                      height={736}
                      className="bg-black/75 not-dark:hidden sm:hidden"
                    />
                    <img
                      src="/images/ai-receptionist.png"
                      alt=""
                      className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                      width={1500}
                      height={680}
                    />
                    <img
                      src="/images/ai-receptionist.png"
                      alt=""
                      width={1500}
                      height={680}
                      className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    />
                    <img
                      src="/images/ai-receptionist.png"
                      alt=""
                      className="bg-white/75 max-lg:hidden dark:hidden"
                      width={1500}
                      height={1240}
                    />
                    <img
                      src="/images/ai-receptionist.png"
                      width={1500}
                      height={1240}
                      alt=""
                      className="bg-black/75 not-dark:hidden max-lg:hidden"
                    />
                  </Screenshot>
                }
              />
              <FeatureStacked
                headline="5-Star Google Review Funnel"
                subheadline={
                  <>
                    <p>Happy customers rarely think to leave reviews — and asking is easy to forget. We ask automatically the moment the job is done, building the reputation that wins your next job.</p>
                    <ul>
                      <li className="list-disc list-inside">Review requests sent automatically after every job</li>
                      <li className="list-disc list-inside">More Google reviews means higher local rankings</li>
                      <li className="list-disc list-inside">New customers see proof before they ever call</li>
                    </ul>
                  </>
                }                cta={
                  <Link href="/systems/5-star-review-funnel">
                   See short Demo <ChevronIcon />
                  </Link>
                }
                demo={
                  <Screenshot wallpaper="brown" placement="bottom-left">
                    <img
                      src="/images/reviews.png"
                      alt=""
                      className="bg-white/75 sm:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/reviews.png"
                      alt=""
                      width={1200}
                      height={736}
                      className="bg-black/75 not-dark:hidden sm:hidden"
                    />
                    <img
                      src="/images/reviews.png"
                      alt=""
                      className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                      width={1500}
                      height={680}
                    />
                    <img
                      src="/images/reviews.png"
                      alt=""
                      width={1500}
                      height={680}
                      className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    />
                    <img
                      src="/images/reviews.png"
                      alt=""
                      className="bg-white/75 max-lg:hidden dark:hidden"
                      width={1500}
                      height={1240}
                    />
                    <img
                      src="/images/reviews.png"
                      alt=""
                      width={1500}
                      height={1240}
                      className="bg-black/75 not-dark:hidden max-lg:hidden"
                    />
                  </Screenshot>
                }
              />

              <FeatureStacked
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
                  <Link href="#">
                   See short Demo <ChevronIcon />
                  </Link>
                }
                demo={
                  <Screenshot wallpaper="green" placement="bottom-left">
                    <img
                      src="/images/local-seo.png"
                      alt=""
                      className="bg-white/75 sm:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/local-seo.png"
                      alt=""
                      width={1200}
                      height={736}
                      className="bg-black/75 not-dark:hidden sm:hidden"
                    />
                    <img
                      src="/images/local-seo.png"
                      alt=""
                      className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                      width={1500}
                      height={680}
                    />
                    <img
                      src="/images/local-seo.png"
                      alt=""
                      width={1500}
                      height={680}
                      className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    />
                    <img
                      src="/images/local-seo.png"
                      alt=""
                      className="bg-white/75 max-lg:hidden dark:hidden"
                      width={1500}
                      height={1240}
                    />
                    <img
                      src="/images/local-seo.png"
                      alt=""
                      width={1500}
                      height={1240}
                      className="bg-black/75 not-dark:hidden max-lg:hidden"
                    />
                  </Screenshot>
                }
              />
              <FeatureStacked
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
                  <Link href="#">
                   See short Demo <ChevronIcon />
                  </Link>
                }
                demo={
                  <Screenshot wallpaper="blue" placement="bottom-left">
                    <img
                      src="/images/oc-marketing.png"
                      alt=""
                      className="bg-white/75 sm:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/oc-marketing.png"
                      alt=""
                      width={1200}
                      height={736}
                      className="bg-black/75 not-dark:hidden sm:hidden"
                    />
                    <img
                      src="/images/oc-marketing.png"
                      alt=""
                      className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                      width={1500}
                      height={680}
                    />
                    <img
                      src="/images/oc-marketing.png"
                      alt=""
                      width={1500}
                      height={680}
                      className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    />
                    <img
                      src="/images/oc-marketing.png"
                      alt=""
                      className="bg-white/75 max-lg:hidden dark:hidden"
                      width={1500}
                      height={1240}
                    />
                    <img
                      src="/images/oc-marketing.png"
                      alt=""
                      width={1500}
                      height={1240}
                      className="bg-black/75 not-dark:hidden max-lg:hidden"
                    />
                  </Screenshot>
                }
              />
              <FeatureStacked
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
                  <Link href="#">
                   See short Demo <ChevronIcon />
                  </Link>
                }
                demo={
                  <Screenshot wallpaper="purple" placement="bottom-left">
                    <img
                      src="/images/lsa.png"
                      alt=""
                      className="bg-white/75 sm:hidden dark:hidden"
                      width={1200}
                      height={736}
                    />
                    <img
                      src="/images/lsa.png"
                      alt=""
                      width={1200}
                      height={736}
                      className="bg-black/75 not-dark:hidden sm:hidden"
                    />
                    <img
                      src="/images/lsa.png"
                      alt=""
                      className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                      width={1500}
                      height={680}
                    />
                    <img
                      src="/images/lsa.png"
                      alt=""
                      width={1500}
                      height={680}
                      className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    />
                    <img
                      src="/images/lsa.png"
                      alt=""
                      className="bg-white/75 max-lg:hidden dark:hidden"
                      width={1500}
                      height={1240}
                    />
                    <img
                      src="/images/lsa.png"
                      alt=""
                      width={1500}
                      height={1240}
                      className="bg-black/75 not-dark:hidden max-lg:hidden"
                    />
                  </Screenshot>
                }
              />
            </>
          }
        />
<StatsWithGraph 
  id="stats"
  eyebrow="Our Impact"
  headline="Real results from real trades"
  subheadline="See how we help crews grow revenue and build sustainable marketing systems."
/>
      <FeaturesThreeColWithDemos
                  id="trades"
                  eyebrow="Who we serve"
                  headline="Trades we work with"
                  subheadline="If you run a crew and do great work, we build the marketing system that keeps the jobs coming."
                  features={
                    <>
                      <FeatureThreeColumnWithDemos
                        demo={
                          <Screenshot wallpaper="green" placement="bottom-right">
                            <img
                              src="/images/trade-images/general-contractor.png"
                              alt=""
                              width={1500}
                              height={1240}
                            />
                          </Screenshot>
                        }
                        headline="General Contractors"
                        subheadline={<p>Remodels, additions, renovations, and project management.</p>}
                      />
                      <FeatureThreeColumnWithDemos
                        demo={
                         <Screenshot wallpaper="blue" placement="bottom-right">
                          <img
                            src="/images/trade-images/plumber.png"
                            alt=""
                            width={1500}
                            height={1240}
                          />
                         </Screenshot>
                        }
                        headline="Plumbers"
                        subheadline={<p>Repairs, drain cleaning, water heaters, repipes, and emergency calls.</p>}
                       
                      />
                      <FeatureThreeColumnWithDemos
                        demo={
                          <Screenshot wallpaper="purple" placement="bottom-right">
                          <img
                            src="/images/trade-images/electrician.png"
                            alt=""
                            width={1500}
                            height={1240}
                          />
                          </Screenshot>
                        }
                        headline="Electricians"
                        subheadline={<p>Panels, rewiring, EV chargers, lighting, and troubleshooting.</p>}
                      />
                      <FeatureThreeColumnWithDemos
                        demo={
                          <Screenshot wallpaper="brown" placement="bottom-right">
                          <img
                            src="/images/trade-images/hvac.png"
                            alt=""
                            width={1500}
                            height={1240}
                          />
                          </Screenshot>
                        }
                        headline="HVAC Contractors"
                        subheadline={<p>Air conditioning, heating, ductwork, tune-ups, and replacements.</p>}
                      />
                      <FeatureThreeColumnWithDemos
                        demo={
                          <Screenshot wallpaper="green" placement="bottom-right">
                              <img
                                src="/images/trade-images/roofer.png"
                                alt=""
                                width={1500}
                                height={1240}
                              />
                          </Screenshot>
                        }
                        headline="Roofers"
                        subheadline={<p>Inspections, leak repairs, replacements, and gutters.</p>}
                      />
                      <FeatureThreeColumnWithDemos
                        demo={
                          <Screenshot wallpaper="green" placement="bottom-right">
                            <img
                              src="/images/trade-images/landscape.png"
                              alt=""
                              width={1500}
                              height={1240}
                            />
                          </Screenshot>
                        }
                        headline="Landscapers & Hardscapers"
                        subheadline={<p>Landscape design, irrigation, pavers, turf, and outdoor lighting.</p>}
                      />
                      <FeatureThreeColumnWithDemos
                        demo={
                          <Screenshot wallpaper="blue" placement="bottom-right">
                            <img
                              src="/images/trade-images/painter.png"
                              alt=""
                              width={1500}
                              height={1240}
                            />
                          </Screenshot>
                          

                        }
                        headline="Painters"
                        subheadline={<p>Interior/exterior painting, cabinet refinishing, and commercial painting.</p>}
                      />
                      <FeatureThreeColumnWithDemos
                        demo={
                          <Screenshot wallpaper="purple" placement="bottom-right">
                          <img
                            src="/images/trade-images/remodeler.png"
                            alt=""
                            width={1500}
                            height={1240}
                          />
                          </Screenshot>
                        }
                        headline="Remodelers"
                        subheadline={<p>Kitchen, bath, ADU, and whole-home renovation specialists.</p>}
                      />
                      <FeatureThreeColumnWithDemos
                        demo={
                          <Screenshot wallpaper="green" placement="bottom-right">
                            <img
                              src="/images/trade-images/mason.png"
                              alt=""
                              width={1500}
                              height={1240}
                            />
                          </Screenshot>
                        }
                        headline="Concrete & Masonry Contractors"
                        subheadline={<p>Driveways, patios, foundations, retaining walls, and stonework.</p>}
                      />
                      <FeatureThreeColumnWithDemos
                        demo={
                          <Screenshot wallpaper="brown" placement="bottom-right">
                            <img
                              src="/images/trade-images/flooring.png"
                              alt=""
                              width={1500}
                              height={1240}
                            />
                          </Screenshot>
                        }
                        headline="Flooring Contractors"
                        subheadline={<p>Hardwood, tile, carpet, vinyl, refinishing, and installation.</p>}
                      />
                      <FeatureThreeColumnWithDemos
                        demo={
                          <Screenshot wallpaper="purple" placement="bottom-right">
                            <img
                              src="/images/trade-images/garage.png"
                              alt=""
                              width={1500}
                              height={1240}
                            />
                          </Screenshot>
                        }
                        headline="Garage Door Contractors"
                        subheadline={<p>Repairs, replacements, openers, and emergency service.</p>}
                      />
                      <FeatureThreeColumnWithDemos
                        demo={
                          <Screenshot wallpaper="blue" placement="bottom-right">
                            <img
                              src="/images/trade-images/pest-control.png"
                              alt=""
                              width={1500}
                              height={1240}
                            />
                          </Screenshot>
                        }
                        headline="Pest Control Companies"
                        subheadline={<p>Inspections, treatment plans, exclusion, and recurring maintenance.</p>}
                      />
                    </>
                  }
      />
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
                          demo={
                            
                              <img
                                src="/images/zoom-call.png"
                                alt=""
                                width={1500}
                                height={1240}
                              />
                          
                          }
                        />
                        <FeatureStacked
                          headline="Step 2 — Build & Configure (7-10 Days)"
                          subheadline={<p>We build your website, configure your AI agent, or execute your campaign strategy — fast, with full transparency.</p>}
                          cta={<PlainButtonLink href="#" size="md">See the process <ArrowNarrowRightIcon /></PlainButtonLink>}
                          demo={
                            <img
                              src="/images/build.png"
                              alt=""
                              width={1500}
                              height={1240}
                            />
                          }
                        />
                        <FeatureStacked
                          headline="Step 3 — Launch & Optimize (Ongoing)"
                          subheadline={<p>Your deliverable goes live with performance checks and a clear handoff. We stay available for questions and iteration.</p>}
                          cta={<PlainButtonLink href="#" size="md">Get started <ArrowNarrowRightIcon /></PlainButtonLink>}
                          demo={
                            <img
                              src="/images/review.png"
                              alt=""
                              width={1500}
                              height={1240}
                            />
                          }
                        />
                      </>
                    }
                  />
        </FadeInSection>
        
       
        
        

        {/* FAQs */}
        <FadeInSection delay={100}>
        <FAQsTwoColumnAccordion id="faqs" headline="Questions & Answers">
          <Faq
            id="faq-1"
            question="How much does this cost?"
            answer="Plans start at $297/mo. No setup fees, no long-term contracts — cancel anytime. Quarterly billing saves you about 15% and includes priority onboarding. Most clients cover the monthly cost with a single booked job."
          />
          <Faq
            id="faq-2"
            question="How much of my time does this take?"
            answer="Almost none. One 20-minute call to understand your business, then we build everything — website, follow-up automation, review funnel, ads. Most clients are live in 7–10 days and spend zero hours managing it after that."
          />
          <Faq
            id="faq-3"
            question="Is this another shared-lead service like Angi or HomeAdvisor?"
            answer="No — and that's the point. Every lead comes through your own assets: your website, your Google profile, your phone number. Nothing is resold or shared with competitors. You're building equity in your own pipeline instead of renting theirs."
          />
          <Faq
            id="faq-4"
            question="Do I have to change my phone number or website?"
            answer="No. The AI receptionist works on your existing number and only picks up when you can't. If you have a site you like, we can plug the lead system into it — or replace it if it's costing you jobs."
          />
          <Faq
            id="faq-5"
            question="How fast will I see results?"
            answer="Instant response starts the day we launch — missed-call text back and automated follow-up work immediately. Local Service Ads can put you at the top of Google in days. SEO and reviews compound over 60–90 days into a pipeline that doesn't depend on ad spend."
          />
          <Faq
            id="faq-6"
            question="What if the AI says the wrong thing to a customer?"
            answer="It's trained on your business — your services, pricing approach, service area, and booking rules — and it escalates anything it can't handle to you with the full transcript. You see every conversation."
          />
          <Faq
            id="faq-7"
            question="How do I know it's actually working?"
            answer="Every call, text, form fill, and review request is tracked in your dashboard — with recordings and transcripts. You'll see exactly which jobs came from which channel, so there's no guessing about ROI."
          />
          <Faq
            id="faq-8"
            question="What happens if I cancel? Do I lose everything?"
            answer="Your Google Business Profile and every review you've earned stay with you — always. Since there are no contracts, you can leave anytime. Most clients stay because the system keeps paying for itself."
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
              <PlainButtonLink href="/lp/booking" size="lg">
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

