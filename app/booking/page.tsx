import { Main } from '@/components/elements/main'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import Script from 'next/script'

export default function BookingPage() {
  return (
    <>
      <NavbarWithLogoActionsAndCenteredLinks
        id="navbar"
        links={
          <>
            <NavbarLink href="/about">About</NavbarLink>
            <NavbarLink href="/services">Services</NavbarLink>
            <NavbarLink href="/ai-voice-agents">AI Voice Agents</NavbarLink>
            <NavbarLink href="/results">Results</NavbarLink>
            <NavbarLink href="/contact">Contact</NavbarLink>
            <NavbarLink href="/get-started" className="sm:hidden">
              Get started
            </NavbarLink>
          </>
        }
        logo={
          <NavbarLogo href="/">
            <img
              src="/Logos/icon.svg"
              alt="Kickbord"
              className="dark:hidden"
              width={85}
              height={28}
            />
            <img
              src="/Logos/icon.svg"
              className="not-dark:hidden"
              width={85}
              height={28}
            />
            {/* <h1 className="text-4xl  font-display">Kickbord</h1> */}
          </NavbarLogo>
        }
        actions={
          <>
            <PlainButtonLink href="#" className="max-sm:hidden">
              Log in
            </PlainButtonLink>
            <ButtonLink href="/get-started">Get started <ArrowNarrowRightIcon /></ButtonLink>
          </>
        }
      />

      <Main>
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <div className="mb-12 text-center">
            <h1 className="font-display text-4xl font-medium text-olive-950 dark:text-white sm:text-5xl">
              Book Your Strategy Call
            </h1>
            <p className="mt-4 text-lg text-olive-700 dark:text-olive-300">
              Pick a time that works for you. We'll review your business and recommend the best path forward.
            </p>
          </div>

          {/* Booking iframe embed */}
          <div className="rounded-2xl border border-olive-950/10 bg-white p-6 dark:border-white/10 dark:bg-white/5 sm:p-8">
            <iframe
              src="https://calendar.kickbord.com/widget/booking/PA9BL9KS5PxCkzn4C6f4"
              allow="payment"
              style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px' }}
              scrolling="yes"
              id="PA9BL9KS5PxCkzn4C6f4_1790640186692"
              title="Kickbord Booking Calendar"
            />
          </div>
        </div>
      </Main>

      <Script 
        src="https://links.kickbord.com/js/form_embed.js" 
        strategy="lazyOnload"
      />
    </>
  )
}
