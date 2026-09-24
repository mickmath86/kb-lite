import MainNav from "@/components/sections/main-nav";
import { PricingSingleTierTwoColumn } from "@/components/sections/pricing-single-tier-two-column";
import { CallToActionSimple } from "@/components/sections/call-to-action-simple";
import { ButtonLink } from '@/components/elements/button'
import { FeaturesThreeColumn, Feature } from "@/components/sections/features-three-column"

export default function Pricing() {
  return (
    <>
      <MainNav />
      <PricingSingleTierTwoColumn 
        headline="Pricing"
        subheadline="Choose the plan that's right for you"
        price="$297"
        period="/month"
        features={[
          "Feature 1",
          "Feature 2",
          "Feature 3"
        ]}
       cta={<ButtonLink href="#" size="lg">Book a discovery call</ButtonLink>}
      />
      <Feature 
        headline="Feature 1"
        subheadline="Feature 1 description"
      />
      <FeaturesThreeColumn 
        headline="Why choose us?"
        features={[
          "Feature 1",
          "Feature 2",
          "Feature 3"
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