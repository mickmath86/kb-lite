import { Eyebrow } from "@/components/elements/eyebrow";
import { LeadQualifier } from "@/components/elements/lead-qualifier-modal";
import { ButtonLink } from "@/components/elements/button";
import Script from "next/script";
import { HeroCenteredWithDemo } from "@/components/sections/hero-centered-with-demo";
import { HeroLeftAlignedWithPhoto } from "@/components/sections/hero-left-aligned-with-photo";
import { FooterWithLinksAndSocialIcons } from "@/components/sections/footer-with-links-and-social-icons";
import { PreserveQueryParams } from "@/components/elements/preserve-query-params";
import { Wallpaper } from "@/components/elements/wallpaper";
import { Screenshot } from "@/components/elements/screenshot";
import { LoopVideo } from "@/components/elements/loop-video";
import { StatsWithGraph, Stat as StatGraph } from "@/components/sections/stats-with-graph";
import { PricingMultiTier, Plan } from "@/components/sections/pricing-multi-tier";
import { PlanComparisonTable } from "@/components/sections/plan-comparison-table";
import { FeaturesThreeColumn, Feature } from "@/components/sections/features-three-column";
import { FeatureThreeColumnWithDemos, Features as FeaturesThreeColumnWithDemos } from "@/components/sections/features-three-column-with-demos";
import { FeaturesStackedAlternatingWithDemos, Feature as FeatureStacked } from "@/components/sections/features-stacked-alternating-with-demos";
import { FeaturesWithLargeDemo, Feature as LargeDemoFeature } from "@/components/sections/features-with-large-demo";
import { MagnifyingGlassIcon } from "@/components/icons/magnifying-glass-icon";
import { ChatBubbleCircleIcon } from "@/components/icons/chat-bubble-circle-icon";
import { ChartLineIcon } from "@/components/icons/chart-line-icon";
import { UiLayoutIcon } from "@/components/icons/ui-layout-icon";
import { LightingBoltIcon } from "@/components/icons/lighting-bolt-icon";
import { TargetIcon } from "@/components/icons/target-icon";
import { MicrophoneIcon } from "@/components/icons/microphone-icon";
import { CalendarIcon } from "@/components/icons/calendar-icon";
import { ClockIcon } from "@/components/icons/clock-icon";
import { PricingSingleTierTwoColumn } from "@/components/sections/pricing-single-tier-two-column";
import { FadeInSection } from "@/components/elements/fade-in-section";
import { MapPinIcon } from "@/components/icons/map-pin-icon";
import { StarIcon } from "@/components/icons/star-icon";
import { BellIcon } from "@/components/icons/bell-icon";
import { FloatingVideo } from "@/components/elements/floating-video";
import { BookingCalendar } from "@/components/elements/booking-calendar";
import { Suspense } from "react";

export default function VslV1() {
    return (
        <div>
            <PreserveQueryParams />
            <div className="w-full flex items-center justify-center my-6">
                <img src="/logos/kb-icon-white.png"  className="h-16 not-dark:hidden" alt="Kickbord Logo" />
                <img src="/logos/kb-icon-blk.png"  className="h-16  dark:hidden" alt="Kickbord Logo" />
            </div>
            <HeroCenteredWithDemo
                        eyebrow={<Eyebrow>Marketing for home service businesses</Eyebrow>}
                        headline="The boring stuff is costing you jobs. Let AI handle it."
                        subheadline={<p>We start with your Google profile and reviews, the basics that decide who gets the call. Then we make sure no call goes unanswered.</p>}
                      
                        demo={
                         <>                           
                          <Script src="https://fast.wistia.com/embed/91avpg3417.js" async type="module" />
                          <wistia-player
                              media-id="91avpg3417"
                              aspect="1.7777777777777777"
                              className="w-full h-full"
                            />
                          
                          </>
                        }
                        footer={<LeadQualifier  />}
            />
           

            <FeaturesWithLargeDemo
              eyebrow="Google Business Profile &amp; reputation"
              headline="Climb to the top of local search, and stay there."
              subheadline="We start with a full audit of your Google Business Profile, fix what&rsquo;s holding it back, then keep it maintained every month so you keep outranking the competition."
              demo={
                <Screenshot wallpaper="green" placement="bottom">
                  <LoopVideo
                    name="gbp-demo"
                    label="A Google Business Profile gets audited, fixed, and starts collecting and answering reviews automatically"
                  />
                </Screenshot>
              }
              features={
                <>
                  <LargeDemoFeature
                    icon={<MagnifyingGlassIcon />}
                    headline="Profile audit"
                    subheadline={<p>We review your categories, services, photos, hours, and ranking across your service area, and fix every gap.</p>}
                  />
                  <LargeDemoFeature
                    icon={<ChatBubbleCircleIcon />}
                    headline="Ongoing reputation management"
                    subheadline={<p>Review requests go out after every job, every review gets a reply, and you hear about a bad one right away.</p>}
                  />
                  <LargeDemoFeature
                    icon={<ChartLineIcon />}
                    headline="Rank higher every month"
                    subheadline={<p>Fresh posts, photos, and reviews keep your profile active, so you keep moving up in search and the map pack.</p>}
                  />
                </>
              }
            />

            <FeaturesWithLargeDemo
              eyebrow="New website"
              headline="A website that turns visitors into booked jobs."
              subheadline="Customers check your site before they call. We build you a fast, modern site that earns their trust and makes it easy to reach you."
              demo={
                <Screenshot wallpaper="blue" placement="bottom">
                  <LoopVideo
                    name="website-demo"
                    label="A new contractor website with a chat widget capturing a lead"
                  />
                </Screenshot>
              }
              features={
                <>
                  <LargeDemoFeature
                    icon={<UiLayoutIcon />}
                    headline="Built for your business"
                    subheadline={<p>A custom design that matches your brand, not a generic template.</p>}
                  />
                  <LargeDemoFeature
                    icon={<LightingBoltIcon />}
                    headline="Fast and mobile-first"
                    subheadline={<p>Loads quickly and looks great on phones, where most of your customers find you.</p>}
                  />
                  <LargeDemoFeature
                    icon={<TargetIcon />}
                    headline="Made to convert"
                    subheadline={<p>Clear calls to action, click-to-call, and online booking turn visits into jobs.</p>}
                  />
                </>
              }
            />

            <FeaturesWithLargeDemo
              eyebrow="AI fallback receptionist"
              headline="Never miss a call again."
              subheadline="When you&rsquo;re on a job or after hours, our AI receptionist picks up, so every caller gets an answer and every lead gets captured."
              demo={
                <Screenshot wallpaper="purple" placement="bottom">
                  <LoopVideo
                    name="receptionist-demo"
                    label="A missed call rolls to the AI receptionist, which captures the caller's details and texts them to the owner"
                  />
                </Screenshot>
              }
              features={
                <>
                  <LargeDemoFeature
                    icon={<MicrophoneIcon />}
                    headline="Answers when you can&rsquo;t"
                    subheadline={<p>Calls you miss roll over to the AI, which greets callers by your business name and handles the conversation.</p>}
                  />
                  <LargeDemoFeature
                    icon={<CalendarIcon />}
                    headline="Captures and books the job"
                    subheadline={<p>It collects the caller&rsquo;s details and what they need, and can book them straight onto your calendar.</p>}
                  />
                  <LargeDemoFeature
                    icon={<ClockIcon />}
                    headline="Covers you 24/7"
                    subheadline={<p>Nights, weekends, and busy days are covered, and you get a summary of every call.</p>}
                  />
                </>
              }
            />
            <StatsWithGraph
              className="overflow-hidden"
              eyebrow="Results"
              headline="Proof it works."
              subheadline="Results from businesses running on the platform behind Kickbord. Results vary by market."
            >
              <StatGraph stat="↑ #47 → #1" text="A roofing contractor climbed to the top of Google Maps in under 4 months." />
              <StatGraph stat="↑ 29 leads" text="New leads for that roofer within 90 days." />
              <StatGraph stat="10,000+" text="Google profiles managed on our platform." />
              <StatGraph stat="About 45 min" text="Typical time to reply to a new review." />
            </StatsWithGraph>
            <FadeInSection delay={100}>
              <FeaturesStackedAlternatingWithDemos
                eyebrow="How it works"
                headline="From kickoff to live in three steps."
                features={
                  <>
                    <FeatureStacked
                      headline="Step 1 — Demo Call (20 Mins)"
                      subheadline={<p>We start by understanding your business, your customers, and your goals. This shapes every decision that follows.</p>}
                      cta={<ButtonLink href="#lead-qualifier" size="lg">Start here</ButtonLink>}
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
                      cta={<ButtonLink href="#lead-qualifier" size="lg">See the process</ButtonLink>}
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
                      cta={<ButtonLink href="#lead-qualifier" size="lg">Get started</ButtonLink>}
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
              cta={<ButtonLink href="#lead-qualifier" size="lg">Get your free Google profile audit</ButtonLink>}
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
              cta={<ButtonLink href="#lead-qualifier" size="lg">Get your free Google profile audit</ButtonLink>}
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
              cta={<ButtonLink href="#lead-qualifier" size="lg">Get your free Google profile audit</ButtonLink>}
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