import React from 'react'
import { FooterWithLinkCategories, FooterCategory, FooterLink } from '@/components/sections/footer-with-link-categories'

const FooterMain = () => {
  return (
    <FooterWithLinkCategories
        id="footer"
        links={
          <>
            <FooterCategory title="Systems">
              <FooterLink href="/systems/functional-website">Functional Websites</FooterLink>
              <FooterLink href="/systems/ai-receptionist">Fallback AI Receptionist </FooterLink>
              <FooterLink href="/systems/5-star-review-funnel">5-Star Review Funnel</FooterLink>
              <FooterLink href="/systems/one-click-campaigns">One-click Marketing Campaigns</FooterLink>
              <FooterLink href="/systems/local-seo">Local SEO</FooterLink>
              <FooterLink href="/systems/local-service-ads">Google LSA</FooterLink>
            </FooterCategory>
            <FooterCategory title="Company">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/how-it-works">How it works</FooterLink>
              <FooterLink href="/get-started">Get Started</FooterLink>
              <FooterLink href="/lp/booking">Book a Call</FooterLink>
            </FooterCategory>
            <FooterCategory title="Legal">
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/legal/terms">Terms of Service</FooterLink>
            </FooterCategory>
          </>
        }
        fineprint="© 2026 Kickbord. All rights reserved."
      />
  )
}

export default FooterMain