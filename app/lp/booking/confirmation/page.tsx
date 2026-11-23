import type { Metadata } from 'next'
import Image from 'next/image'

import { Eyebrow } from '@/components/elements/eyebrow'
import { HeroCenteredWithDemo } from '@/components/sections/hero-centered-with-demo'
import { Feature, FeaturesThreeColumn } from '@/components/sections/features-three-column'
import { FooterWithLinksAndSocialIcons } from '@/components/sections/footer-with-links-and-social-icons'
import { MailIcon } from '@/components/icons/mail-icon'
import { InboxIcon } from '@/components/icons/inbox-icon'
import { CalendarIcon } from '@/components/icons/calendar-icon'

export const metadata: Metadata = {
  title: 'You’re Booked | Kickbord',
  description: 'Your Kickbord demo call is scheduled. One last step: confirm the calendar invite we just emailed you.',
  robots: { index: false, follow: false },
}

export default function BookingConfirmationPage() {
  return (
    <div>
      <div className="w-full flex items-center justify-center my-12">
        <img src="/logos/kb-icon-white.png" className="h-16 not-dark:hidden" alt="Kickbord Logo" />
        <img src="/logos/kb-icon-blk.png" className="h-16 dark:hidden" alt="Kickbord Logo" />
      </div>

      <HeroCenteredWithDemo
        eyebrow={<Eyebrow>You&rsquo;re booked</Eyebrow>}
        headline="Your demo call is scheduled — one last step"
        subheadline={
          <p>
            Watch this quick video, then check your email to confirm your appointment so it lands on your calendar.
          </p>
        }
        demo={
          <div className="w-full max-w-3xl">
            <Image
              src="/images/confirmation-hero.jpg"
              alt="A home-service contractor checking his phone between jobs"
              width={1024}
              height={576}
              priority
              className="h-auto w-full rounded-2xl"
            />
          </div>
        }
      />

      <FeaturesThreeColumn
        eyebrow="Next steps"
        headline="Confirm your appointment"
        subheadline={<p>We just emailed you a calendar invite. It takes about 30 seconds to lock it in.</p>}
        features={
          <>
            <Feature
              icon={<InboxIcon className="size-5" />}
              headline="1. Search your inbox"
              subheadline={
                <p>
                  Look for an email with <span className="font-semibold text-olive-950 dark:text-white">“Kickbord Demo”</span> in the subject line. Check spam or promotions if you don&rsquo;t see it.
                </p>
              }
            />
            <Feature
              icon={<MailIcon className="size-5" />}
              headline="2. Open the invite"
              subheadline={
                <p>
                  The email contains your appointment details and a calendar invite. Open it and choose <span className="font-semibold text-olive-950 dark:text-white">“Yes”</span> or <span className="font-semibold text-olive-950 dark:text-white">“Accept”</span> to confirm.
                </p>
              }
            />
            <Feature
              icon={<CalendarIcon className="size-5" />}
              headline="3. Add it to your calendar"
              subheadline={
                <p>
                  Accepting the invite adds the call to your calendar with the meeting link, so you get a reminder when it&rsquo;s time. If you need to reschedule, use the link in the same email.
                </p>
              }
            />
          </>
        }
      />

      <FooterWithLinksAndSocialIcons
        links={<></>}
        socialLinks={<></>}
        fineprint="© 2026 Kickbord. All rights reserved."
      />
    </div>
  )
}
