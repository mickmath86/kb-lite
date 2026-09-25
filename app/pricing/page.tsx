import MainNav from "@/components/sections/main-nav";
import { PricingSingleTierTwoColumn } from "@/components/sections/pricing-single-tier-two-column";
import { CallToActionSimple } from "@/components/sections/call-to-action-simple";
import { ButtonLink } from '@/components/elements/button'
import { PlanComparisonTable } from '@/components/sections/plan-comparison-table'
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { PricingHeroMultiTier } from "@/components/sections/pricing-hero-multi-tier";
import { Plan } from "@/components/sections/pricing-multi-tier";
import { Screenshot } from "@/components/elements/screenshot";
import { Wallpaper } from "@/components/elements/wallpaper";
export default function Pricing() {
  return (
    <>
      <MainNav />
    
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
      <PlanComparisonTable 
        plans={[ "What It Does", "Included"]}
        features={[
          {
            title: "Functional Website",
            features: [
              { name: "Fully Built Custom Website", value: {"What It Does": "A professionally designed website tailored to your business", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "Mobile Responsive Design", value: {"What It Does": "Optimized for all devices - desktop, tablet, and mobile", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "Instant Chat Widget", value: {"What It Does": "Live chat that engages visitors and captures leads in real-time", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "Highlight Best Reviews", value: {"What It Does": "Showcase your top customer reviews to build trust and credibility", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "Custom Forms", value: {"What It Does": "Tailored contact and quote forms to capture lead information", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "SMS Integrations", value: {"What It Does": "Get notified instantly via SMS when customers submit forms", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}}
            ]
          },
          {
            title: "Missed Call Text Back",
            features: [
              { name: "Automatic SMS Response", value: {"What It Does": "Instantly send a text message to anyone who calls but doesn't reach you", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "Two-Way Conversation", value: {"What It Does": "Enable back-and-forth texting to answer questions and book appointments", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "Smart Follow-Up Sequences", value: {"What It Does": "Automated follow-up messages to nurture leads who don't respond immediately", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}}
            ]
          },
          {
            title: "Local SEO",
            features: [
              { name: "Google Business Profile Optimization", value: {"What It Does": "Optimize your Google Business Profile to rank higher in local search results", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "Local Citation Building", value: {"What It Does": "Get your business listed on top directories to boost local visibility", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "Review Management & Monitoring", value: {"What It Does": "Track and respond to reviews across all platforms from one dashboard", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}}
            ]
          },
          {
            title: "One-Click Marketing Campaigns",
            features: [
              { name: "Pre-Built Campaign Templates", value: {"What It Does": "Launch proven email and SMS campaigns with one click - no setup required", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "Automated Email & SMS Sequences", value: {"What It Does": "Set up drip campaigns that nurture leads automatically over time", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "Campaign Performance Tracking", value: {"What It Does": "See open rates, click rates, and conversions in real-time dashboards", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}}
            ]
          },
          {
            title: "5-Star Review Funnel",
            features: [
              { name: "Automated Review Requests", value: {"What It Does": "Automatically send SMS or email requests after job completion", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "Smart Review Filtering", value: {"What It Does": "Direct happy customers to public reviews, unhappy ones to private feedback", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}},
              { name: "Multi-Platform Review Collection", value: {"What It Does": "Collect reviews on Google, Facebook, Yelp, and more from one link", "Included": <div className="flex justify-center"><CheckBadgeIcon className="h-5 w-5 text-green-600" /></div>}}
            ]
          }
        ]}
      />
      
      
      <CallToActionSimple 
        headline="Ready to get started?"
        subheadline="Contact us today to learn more about our services and how we can help you grow your business."
        cta={<ButtonLink  className="block" href="#" size="md">Book a discovery call </ButtonLink>}
      />
    </>
  )
}