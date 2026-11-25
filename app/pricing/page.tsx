import MainNav from "@/components/sections/main-nav";
import { KickbordPricing } from "@/components/sections/kickbord-pricing";
import { CallToActionSimple } from "@/components/sections/call-to-action-simple";
import { ButtonLink } from '@/components/elements/button'
export default function Pricing() {
  return (
    <>
      <MainNav />
    
      <KickbordPricing ctaHref="/lp/booking" eyebrow="Pricing" headline="Choose the plan that's right for you" />
      
      <CallToActionSimple 
        headline="Ready to get started?"
        subheadline="Contact us today to learn more about our services and how we can help you grow your business."
        cta={<ButtonLink  className="block" href="#" size="md">Book a discovery call </ButtonLink>}
      />
    </>
  )
}