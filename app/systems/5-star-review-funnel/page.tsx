import MainNav from "@/components/sections/main-nav";
import { HeroTwoColumnWithPhoto } from "@/components/sections/hero-two-column-with-photo";
import { StatsWithGraph, Stat as StatGraph } from "@/components/sections/stats-with-graph";
import { StatsFourColumns, Stat } from "@/components/sections/stats-four-columns";
import { CheckmarkIcon } from "@/components/icons/checkmark-icon";
import { StarIcon } from "@/components/icons/star-icon";
import { ShieldExclamationIcon } from "@/components/icons/shield-exclamation-icon";
import { ChartLineIcon } from "@/components/icons/chart-line-icon";
import { CallToActionSimple } from "@/components/sections/call-to-action-simple";
import { ButtonLink } from "@/components/elements/button";
import {
  FeatureThreeColumnWithDemos,
  Features as FeaturesThreeColWithDemos,
} from '@/components/sections/features-three-column-with-demos'
import { Screenshot } from "@/components/elements/screenshot";

export default function ReviewFunnel() {
  return (
    <>
      <MainNav /> 
      <HeroTwoColumnWithPhoto 
        headline="Turn every finished job into a 5-star review"
        subheadline={
          <>
            <p>
              The moment you wrap up a job, your customer gets a friendly text asking how it went. Happy customers are sent straight to your Google Business Profile. Unhappy ones come to you privately first — so a bad day never becomes a 1-star review.
            </p>
          </>
        }
        photo={
          <wistia-player 
            media-id="docfron0i3" 
            aspect="1.7777777777777777"
            className="w-full h-full"
          />
        }
      />
      <StatsWithGraph  
      headline="Reviews decide who gets the call"
      eyebrow="Why Reputation Wins Jobs"
      subheadline="Before a customer ever contacts you, they've already compared your stars to your competitors'."
      >
        <StatGraph stat="98%" text="of consumers read online reviews before choosing a local business" />
        <StatGraph stat="1 in 10" text="happy customers leave a review unprompted — a simple, well-timed ask is what closes the gap" />
        <StatGraph stat="73%" text="of customers only trust recent reviews — which is why the ask runs after every job, not just once" />
      </StatsWithGraph>

      <StatsFourColumns 
      headline="How the Funnel Works"
      eyebrow="Automatic After Every Job"
      subheadline="You finish the work. The funnel handles the reputation part — no chasing, no awkward asks."
      >
        <Stat 
          icon={<CheckmarkIcon className="size-6 text-olive-500 dark:text-white" />}
          stat="The Ask Goes Out Automatically" 
          text="When you mark a job complete, your customer gets a friendly text asking how it went — timed for when the great work is still fresh in their mind. No remembering, no manual follow-up." 
        />
        <Stat 
          icon={<StarIcon className="size-6 text-olive-500 dark:text-white" />}
          stat="Happy Customers Go to Google" 
          text="Customers rating you 4 or 5 stars get sent straight to your Google Business Profile to leave a public review — right where the next customer is looking." 
        />
        <Stat 
          icon={<ShieldExclamationIcon className="size-6 text-olive-500 dark:text-white" />}
          stat="Unhappy Customers Come to You First" 
          text="Anything lower routes to you privately as feedback instead of going public. You get the chance to make it right before it becomes a 1-star review everyone sees." 
        />
        <Stat 
          icon={<ChartLineIcon className="size-6 text-olive-500 dark:text-white" />}
          stat="Your Rating Compounds" 
          text="Every job adds another fresh review — climbing your local ranking and pre-selling the next customer before you ever talk to them." 
        />
      </StatsFourColumns>

      <FeaturesThreeColWithDemos
                        id="site-examples"
                        eyebrow="Who It's For"
                        headline="Built for trades that live and die by reputation"
                        subheadline="Great work deserves great reviews — the funnel makes sure every finished job counts."
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
                                <Screenshot wallpaper="purple" placement="bottom-right">
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

      <CallToActionSimple 
        eyebrow="Ready to Get Started?"
        headline="Your next 5-star review is one job away"
        subheadline="Book a call and we'll show you how the funnel turns finished work into a reputation that sells for you."
        cta={<ButtonLink href="/booking">Book a Call</ButtonLink>}
      />
    </>
  )
}