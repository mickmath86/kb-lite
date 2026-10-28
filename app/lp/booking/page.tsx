import type { Metadata } from 'next'
import Script from 'next/script'
import { redirect } from 'next/navigation'
import { Eyebrow } from "@/components/elements/eyebrow";
import { Screenshot } from "@/components/elements/screenshot";
import { HeroCenteredWithDemo } from "@/components/sections/hero-centered-with-demo";
import { HeroTwoColumnWithPhoto } from '@/components/sections/hero-two-column-with-photo';
import { FooterWithLinksAndSocialIcons } from '@/components/sections/footer-with-links-and-social-icons';

type SP = Record<string, string | string[] | undefined>

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)

function getDynamicPrice(searchParams: SP): number {
  const raw = first(searchParams.dp)?.trim()
  if (!raw) return 297
  const parsed = Number(raw)
  if (!Number.isFinite(parsed) || parsed < 0) return 297
  return Math.round(parsed)
}

function formatPrice(price: number): string {
  return price.toLocaleString('en-US')
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SP>
}): Promise<Metadata> {
  const sp = await searchParams
  const price = formatPrice(getDynamicPrice(sp))
  return {
    title: 'Book a Free Marketing Consultation | Kickbord',
    description:
      `See how Kickbord brings AI voice agents, campaign strategy, and modern marketing together to grow your business for $${price} per month.`,
  }
}

export default async function LpBookingPage({
  searchParams,
}: {
  searchParams: Promise<SP>
}) {
  const sp = await searchParams
  // Default visitors without a price param to dp=397, keeping any other params (utm, etc.).
  if (!first(sp.dp)?.trim()) {
    const qs = new URLSearchParams()
    for (const [k, v] of Object.entries(sp)) {
      if (k === 'dp' || v === undefined) continue
      for (const item of Array.isArray(v) ? v : [v]) qs.append(k, item)
    }
    qs.set('dp', '397')
    redirect(`/lp/booking?${qs.toString()}`)
  }
  const price = formatPrice(getDynamicPrice(sp))
  const useYouTubeDemo = first(sp.dp) === '397'
  return (
    <div>
      <div className="w-full flex items-center justify-center my-12">
        <img src="/logos/kb-icon-white.png" className="h-16 not-dark:hidden" alt="Kickbord Logo" />
        <img src="/logos/kb-icon-blk.png" className="h-16 dark:hidden" alt="Kickbord Logo" />
      </div>
     
      <HeroCenteredWithDemo
                eyebrow={<Eyebrow>Platform tour</Eyebrow>}
                headline={`We help businesses grow with modern marketing for $${price}/mo`}
                subheadline={<p>From AI voice agents to campaign strategy, Kickbord brings the full stack of modern marketing to your business.</p>}
                
                demo={
                <>
                    <h3 className="text-3xl text-white bg-[#637c86] rounded px-4 py-2">Step 1: Watch this video</h3>
                   
                    {useYouTubeDemo ? (
                      <div className="aspect-video w-full">
                        <iframe
                          src="https://www.youtube.com/embed/4mYiuBwNqY4"
                          title="Kickbord platform tour"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full rounded"
                        />
                      </div>
                    ) : (
                      <wistia-player
                        media-id="e3b8vgs3q0"
                        aspect="1.7777777777777777"
                        className="w-full h-full"
                      />
                    )}
                    
                </>
                }
               
    />
     <h3 className="text-3xl text-white w-100 mx-auto text-center bg-[#637c86] rounded">Step 2: Book a call</h3>
    <HeroTwoColumnWithPhoto
      headline="Ready to transform your marketing?"
      subheadline="Book a free consultation with our team to discover how Kickbord can help your business grow."
      
      photo={
        <iframe
          src="https://calendar.kickbord.com/widget/booking/joLrz73XMe6vKuIOrKfL"
          allow="payment"
          style={{ width: '100%', border: 'none', overflow: 'hidden' }}
          scrolling="no"
          id="PA9BL9KS5PxCkzn4C6f4_1790640186692"
          title="Kickbord Booking Calendar"
        />
      }
    />
      <Script
        src="https://calendar.kickbord.com/js/form_embed.js"
        strategy="afterInteractive"
      />
      <FooterWithLinksAndSocialIcons
        links={<></>}
        socialLinks={<></>}
        fineprint="© 2026 Kickbord. All rights reserved."
      />
    </div>
    
  )
}
