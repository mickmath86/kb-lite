import { Eyebrow } from "@/components/elements/eyebrow";
import { LeadQualifierModal } from "@/components/elements/lead-qualifier-modal";
import Script from "next/script";
import { HeroCenteredWithDemo } from "@/components/sections/hero-centered-with-demo";
import { FooterWithLinksAndSocialIcons } from "@/components/sections/footer-with-links-and-social-icons";
import { PreserveQueryParams } from "@/components/elements/preserve-query-params";
import { Wallpaper } from "@/components/elements/wallpaper";
import { PricingMultiTier, Plan } from "@/components/sections/pricing-multi-tier";
import { PlanComparisonTable } from "@/components/sections/plan-comparison-table";
import { FeaturesThreeColumn, Feature } from "@/components/sections/features-three-column";
import { FeaturesStackedAlternatingWithDemos, Feature as FeatureStacked } from "@/components/sections/features-stacked-alternating-with-demos";
import { PricingSingleTierTwoColumn } from "@/components/sections/pricing-single-tier-two-column";
import { FadeInSection } from "@/components/elements/fade-in-section";
import { MapPinIcon } from "@/components/icons/map-pin-icon";
import { StarIcon } from "@/components/icons/star-icon";
import { BellIcon } from "@/components/icons/bell-icon";
import { FloatingVideo } from "@/components/elements/floating-video";

export default function VslV1() {
    return (
        <div>
            <PreserveQueryParams />
            <div className="w-full flex items-center justify-center my-12">
                <img src="/logos/kb-icon-white.png"  className="h-16 not-dark:hidden" alt="Kickbord Logo" />
                <img src="/logos/kb-icon-black.png"  className="h-16  dark:hidden" alt="Kickbord Logo" />
            </div>
            <HeroCenteredWithDemo
                        eyebrow={<Eyebrow>Marketing for home service businesses</Eyebrow>}
                        headline="More 5-star reviews. More calls booked. An AI receptionist that never misses."
                        subheadline={<p>See how Kickbord gets your happy customers leaving Google reviews, then answers and books every call those reviews bring in, even when you&rsquo;re on a job.</p>}
                        cta2={
                          <LeadQualifierModal
                            triggerLabel="Book a Demo"
                            triggerClassName="px-10 py-5 text-2xl"
                          />
                        }
                        demo={
                         <>                           
                          <Script src="https://fast.wistia.com/embed/91avpg3417.js" async type="module" />
                          <FloatingVideo>
                            <wistia-player
                              media-id="91avpg3417"
                              aspect="1.7777777777777777"
                              className="w-full h-full"
                            />
                          </FloatingVideo>
                          </>
                        }
                        // footer={<p className="text-center text-sm text-olive-500">Trusted by 50+ small businesses</p>}
            />
            <PricingMultiTier
              eyebrow="Pricing"
              headline="Simple pricing for home-service pros"
              subheadline={<p>Every plan starts with your Google Business Profile — the place your next customer looks first.</p>}
              plans={
                <>
                  <Wallpaper color="green" className="rounded-xl h-full">
                    <Plan
                      className="h-full"
                      name="Starter"
                      price="$250"
                      period="/mo"
                      subheadline={<p>Get in front of local customers with Local Service Ads done for you.</p>}
                      features={[
                        'Local Service Ads setup and management',
                        'One-time Google Business Profile cleanup',
                      ]}
                      cta={<LeadQualifierModal triggerLabel="Get started" triggerClassName="w-full justify-center" />}
                    />
                  </Wallpaper>
                  <Wallpaper color="blue" className="rounded-xl h-full">
                    <Plan
                      className="h-full"
                      name="Grow"
                      price="$597"
                      period="/mo"
                      badge="Most popular"
                      subheadline={<p>The full Google profile and reputation package. No website.</p>}
                      features={[
                        'Automated review requests',
                        'AI review replies and bad-review alerts',
                        'GBP posts and photos',
                        'Local ranking maps and AI search reports',
                        'Competitor analysis',
                        'Add LSA for $200/mo',
                      ]}
                      cta={<LeadQualifierModal triggerLabel="Start growing" triggerClassName="w-full justify-center" />}
                    />
                  </Wallpaper>
                  <Wallpaper color="purple" className="rounded-xl h-full">
                    <Plan
                      className="h-full"
                      name="Expand"
                      price="$799"
                      period="/mo + usage"
                      subheadline={<p>Everything in Grow, plus the website and the AI front office.</p>}
                      features={[
                        'Everything in Grow',
                        'Kickbord website',
                        'AI backup receptionist',
                        'Missed-call text-back',
                        'New business line',
                      ]}
                      cta={<LeadQualifierModal triggerLabel="Get the full system" triggerClassName="w-full justify-center" />}
                    />
                  </Wallpaper>
                </>
              }
            />
            <p className="mx-auto max-w-2xl -mt-8 pb-8 text-center text-sm text-olive-500 dark:text-olive-400">
              $400 setup on every plan. AI usage rates and ad spend not included.
              Running a larger operation? <a href="/contact" className="underline hover:text-olive-950 dark:hover:text-white">Call for a quote</a>.
            </p>

            <PlanComparisonTable
              plans={["Starter", "Grow", "Expand"]}
              features={[
                {
                  title: "Google Business Profile & reputation",
                  features: [
                    { name: "GBP cleanup and optimization", value: { Starter: "One-time", Grow: true, Expand: true } },
                    { name: "Automated review requests", value: { Starter: false, Grow: true, Expand: true } },
                    { name: "AI review replies", value: { Starter: false, Grow: true, Expand: true } },
                    { name: "Bad-review alerts", value: { Starter: false, Grow: true, Expand: true } },
                    { name: "GBP posts and photos", value: { Starter: false, Grow: true, Expand: true } },
                    { name: "Local ranking maps", value: { Starter: false, Grow: true, Expand: true } },
                    { name: "AI search reports", value: { Starter: false, Grow: true, Expand: true } },
                    { name: "Competitor analysis", value: { Starter: false, Grow: true, Expand: true } },
                  ],
                },
                {
                  title: "Advertising",
                  features: [
                    { name: "Local Service Ads setup and management", value: { Starter: true, Grow: "Add-on — $200/mo", Expand: "Add-on — $200/mo" } },
                  ],
                },
                {
                  title: "Website & phones",
                  features: [
                    { name: "Kickbord website", value: { Starter: false, Grow: false, Expand: true } },
                    { name: "AI backup receptionist", value: { Starter: false, Grow: false, Expand: true } },
                    { name: "Missed-call text-back", value: { Starter: false, Grow: false, Expand: true } },
                    { name: "New business line", value: { Starter: false, Grow: false, Expand: true } },
                  ],
                },
              ]}
            />

            <FeaturesThreeColumn
              eyebrow="Why it works"
              headline="Built around your Google Business Profile"
              features={
                <>
                  <Feature
                    icon={<MapPinIcon className="size-5" />}
                    headline="Get found locally"
                    subheadline={<p>Reviews, posts, photos, and ranking maps work to keep your profile competitive in local search — where most jobs start.</p>}
                  />
                  <Feature
                    icon={<StarIcon className="size-5" />}
                    headline="Reputation on autopilot"
                    subheadline={<p>Review requests go out after every job, AI writes the replies, and you get alerted the moment a bad review lands.</p>}
                  />
                  <Feature
                    icon={<BellIcon className="size-5" />}
                    headline="Never miss a call"
                    subheadline={<p>On Expand, an AI receptionist answers when you can&rsquo;t, and missed-call text-back catches every lead that slips through.</p>}
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
                      cta={<LeadQualifierModal triggerLabel="Start here" triggerClassName="px-4 py-2 text-sm" />}
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
                      headline="Step 2 — Build &amp; Configure (7-10 Days)"
                      subheadline={<p>We build your website, configure your AI agent, or execute your campaign strategy — fast, with full transparency.</p>}
                      cta={<LeadQualifierModal triggerLabel="See the process" triggerClassName="px-4 py-2 text-sm" />}
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
                      headline="Step 3 — Launch &amp; Optimize (Ongoing)"
                      subheadline={<p>Your deliverable goes live with performance checks and a clear handoff. We stay available for questions and iteration.</p>}
                      cta={<LeadQualifierModal triggerLabel="Get started" triggerClassName="px-4 py-2 text-sm" />}
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

            <PricingSingleTierTwoColumn
              headline="Starter — ads running, profile cleaned up"
              subheadline={<p>The simplest way to start showing up where homeowners are already searching. We set up and manage your Local Service Ads and give your Google Business Profile a one-time cleanup.</p>}
              price="$250"
              period="/mo"
              features={[
                'Local Service Ads setup and management',
                'One-time Google Business Profile cleanup',
                'Monthly check-in on ad performance',
                '$400 one-time setup',
              ]}
              cta={<LeadQualifierModal triggerLabel="Get your free Google profile audit" />}
            />

            <PricingSingleTierTwoColumn
              headline="Grow — your reputation, working for you"
              subheadline={<p>The full Google Business Profile and reputation package. Reviews go out automatically, AI writes the replies, and you see exactly where you rank — no website required.</p>}
              price="$597"
              period="/mo"
              features={[
                'Automated review requests after every job',
                'AI review replies and bad-review alerts',
                'GBP posts and photos',
                'Local ranking maps and AI search reports',
                'Competitor analysis',
                'Add LSA for $200/mo · $400 one-time setup',
              ]}
              cta={<LeadQualifierModal triggerLabel="Get your free Google profile audit" />}
            />

            <PricingSingleTierTwoColumn
              headline="Expand — the whole front office, handled"
              subheadline={<p>Google profile, reputation, website, and an AI receptionist answering every call — one plan, fully set up for you. Larger operations get a custom quote.</p>}
              price="$799"
              period="/mo + usage"
              features={[
                'Everything in Grow — GBP, reputation, ranking maps, and reports',
                'Kickbord website that books jobs',
                'AI backup receptionist answering 24/7',
                'Missed-call text-back',
                'New business line included',
                '$400 one-time setup',
              ]}
              cta={<LeadQualifierModal triggerLabel="Get your free Google profile audit" />}
            />
            <FooterWithLinksAndSocialIcons 
              links={
                <div className="flex flex-wrap justify-center gap-6 text-sm text-olive-600">
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-olive-900">Privacy</a>
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-olive-900">Terms</a>
                  <a href="/security" target="_blank" rel="noopener noreferrer" className="hover:text-olive-900">Security</a>
                </div>
              }
              fineprint="© 2026 Kickbord. All rights reserved."
            />
        </div>
    );
}