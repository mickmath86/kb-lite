import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import { Screenshot } from "@/components/elements/screenshot";
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo';
import { FooterWithLinksAndSocialIcons } from '@/components/sections/footer-with-links-and-social-icons';
import { CheckmarkIcon } from '@/components/icons/checkmark-icon';
import { PreserveQueryParams } from '@/components/elements/preserve-query-params';
import { BookingCalendar } from '@/components/elements/booking-calendar';
import { Container } from '@/components/elements/container';

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
  await searchParams // keeps the page dynamic so search params reach the client
  return (
    <div>
      <div className="w-full flex items-center justify-center my-6">
        <img src="/logos/kb-icon-white.png" className="h-16 not-dark:hidden" alt="Kickbord Logo" />
        <img src="/logos/kb-icon-blk.png" className="h-16 dark:hidden" alt="Kickbord Logo" />
      </div>
      
      <HeroLeftAlignedWithDemo
                
                headline="Never miss another call. Get more 5-star reviews. Show up first on Google."
                subheadline={<p>Local Service ads, a website that books jobs, an AI receptionist, and automatic review requests  <br/><span className="font-bold italic text-xl underline">all set up for you.</span></p>}
                
                demo={
                <>
                    <div className="mb-6 flex justify-center">
                      <span className="inline-flex items-center gap-3 rounded-full bg-olive-950/10 px-5 py-2.5 dark:bg-white/10">
                        <span className="font-display text-xl/6 text-[#596352] dark:text-olive-300">01</span>
                        <span className="text-base/7 font-medium text-olive-950 dark:text-white">Watch the 5-minute tour</span>
                      </span>
                    </div>

                    <Script src="https://fast.wistia.com/embed/b5emfcfkir.js" async type="module" />
                    <wistia-player
                      media-id="b5emfcfkir"
                      aspect="1.7777777777777777"
                      className="w-full h-full"
                    />
                    
                </>
                }
               
    />
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-3 rounded-full bg-olive-950/10 px-5 py-2.5 dark:bg-white/10">
          <span className="font-display text-xl/6 text-[#596352] dark:text-olive-300">02</span>
          <span className="text-base/7 font-medium text-olive-950 dark:text-white">Pick a time for your free 30-minute demo</span>
        </span>
      </div>
    <HeroLeftAlignedWithDemo
      headline="Your next missed call is someone else's job. Grab a time below."
      subheadline="Book a free consultation with our team to discover how Kickbord can help your business grow."
      cta={
        <div className="w-full">
          <p className="font-display text-2xl tracking-tight text-olive-950 dark:text-white">What you&rsquo;ll get on the call</p>
          <ul className="mt-4 space-y-3 text-base/7 text-olive-700 dark:text-olive-300">
            {[
              'See your own AI receptionist answer a call for your business.',
              'Get a look at a demo website built for your company.',
              'Leave with a plan to get more calls and reviews, whether you sign up or not.',
            ].map((item) => (
              <li key={item} className="flex gap-4">
                <CheckmarkIcon className="h-lh shrink-0 stroke-olive-950 dark:stroke-white" />
                <p>{item}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base/7 font-semibold text-olive-950 dark:text-white">Plans start at $250/mo.</p>
          <p className="mt-1 text-sm/6 text-olive-600 dark:text-olive-400">$400 setup fee. AI usage rates and ad spend not included.</p>
        </div>
      }
      demo={
        <Container className=" relative left-1/2 w-screen -translate-x-1/2 px-6 sm:px-32">
          <Suspense fallback={<div style={{ height: '720px' }} aria-hidden="true" />}>
            <BookingCalendar />
          </Suspense>
        </Container>
      }
    />
      <PreserveQueryParams />
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
