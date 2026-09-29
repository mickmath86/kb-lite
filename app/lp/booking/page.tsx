import Script from 'next/script'
import { Eyebrow } from "@/components/elements/eyebrow";
import { LeadQualifierModal } from "@/components/elements/lead-qualifier-modal";
import { Screenshot } from "@/components/elements/screenshot";
import { HeroCenteredWithDemo } from "@/components/sections/hero-centered-with-demo";
import { HeroTwoColumnWithPhoto } from '@/components/sections/hero-two-column-with-photo';
import { FooterWithLinksAndSocialIcons } from '@/components/sections/footer-with-links-and-social-icons';

export default function LpBookingPage() {
  return (
    <div>
      <div className="w-full flex items-center justify-center my-12">
        <img src="/logos/kb-icon-white.png" className="h-16" alt="Kickbord Logo" />
      </div>
     
      <HeroCenteredWithDemo
                eyebrow={<Eyebrow>Platform tour</Eyebrow>}
                headline="We help businesses grow with modern marketing for $297/mo"
                subheadline={<p>From AI voice agents to campaign strategy, Kickbord brings the full stack of modern marketing to your business.</p>}
                
                demo={
                <>
                    <h3 className="text-3xl text-white bg-[#637c86] rounded px-4 py-2">Step 1: Watch this video</h3>
                    <Screenshot wallpaper="blue" placement="bottom" className="w-full">
                        <wistia-player
                        media-id="docfron0i3"
                        aspect="1.7777777777777777"
                        className="w-full h-full"
                        />
                    </Screenshot>
                </>
                }
               
    />
     <h3 className="text-3xl text-white w-100 mx-auto text-center bg-[#637c86] rounded">Step 2: Book a call</h3>
    <HeroTwoColumnWithPhoto
      headline="Ready to transform your marketing?"
      subheadline="Book a free consultation with our team to discover how Kickbord can help your business grow."
      
      photo={
       
        <iframe
          src="https://calendar.kickbord.com/widget/booking/PA9BL9KS5PxCkzn4C6f4"
          allow="payment"
          style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px' }}
          scrolling="yes"
          id="PA9BL9KS5PxCkzn4C6f4_1790640186692"
          title="Kickbord Booking Calendar"
        />
       
      }
    />
      <Script
        src="https://links.kickbord.com/js/form_embed.js"
        strategy="lazyOnload"
      />
      <FooterWithLinksAndSocialIcons
        links={<></>}
        socialLinks={<></>}
        fineprint="© 2026 Kickbord. All rights reserved."
      />
    </div>
    
  )
}
