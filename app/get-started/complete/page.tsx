import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CalendarIcon } from '@/components/icons/calendar-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'
import {
  FooterCategory,
  FooterLink,
  FooterWithLinkCategories,
} from '@/components/sections/footer-with-link-categories'
import { Main } from '@/components/elements/main'

export default function GetStartedCompletePage() {
  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <NavbarWithLogoActionsAndCenteredLinks
        id="navbar"
        links={<></>}
        logo={
          <NavbarLogo href="/">
            <img src="/Logos/icon.svg" alt="Kickbord" className="dark:hidden" width={85} height={28} />
            <img src="/Logos/icon.svg" className="not-dark:hidden" width={85} height={28} />
          </NavbarLogo>
        }
        actions={
          <ButtonLink href="/contact" size="md">
            Contact us
          </ButtonLink>
        }
      />

      <Main>
        <div className="mx-auto w-full max-w-2xl px-6 py-16 md:max-w-3xl lg:max-w-5xl lg:px-10">

          {/* ── Confirmation header ─────────────────────────────────────── */}
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-olive-950/10 text-olive-950 dark:bg-white/10 dark:text-white">
              <CheckmarkIcon />
            </div>
            <h1 className="font-display text-3xl tracking-tight text-olive-950 sm:text-5xl dark:text-white">
              You're all set.
            </h1>
            <p className="mt-4 max-w-lg text-base/7 text-olive-700 dark:text-olive-400">
              Thanks for taking the time to tell us about your business. We've received your answers and will review
              them before we connect.
            </p>
          </div>

          {/* ── What's next chips ───────────────────────────────────────── */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {[
              'We\'ll review your answers within 24 hours',
              'We come prepared — not with a generic pitch',
              'You choose when to schedule — no pressure',
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full bg-olive-950/5 px-4 py-2 text-sm text-olive-700 dark:bg-white/5 dark:text-olive-300"
              >
                <CheckmarkIcon /> {item}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* ── Video section ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">A quick message from Mike</p>
                <h2 className="mt-1 font-display text-2xl text-olive-950 dark:text-white">
                  Thanks for filling this out.
                </h2>
                <p className="mt-2 text-sm/7 text-olive-600 dark:text-olive-400">
                  I personally review every submission. Watch this short video to hear what you can expect from our
                  first conversation.
                </p>
              </div>

              {/* Video placeholder — replace src with your video URL */}
              <div className="group relative overflow-hidden rounded-2xl bg-olive-950/5 dark:bg-white/5">
                {/*
                  ──────────────────────────────────────────────────────────────
                  VIDEO PLACEHOLDER
                  Replace this entire div with a <video> tag or an iframe embed
                  when you have your thank-you video ready:

                  Option A — self-hosted video:
                  <video
                    src="/videos/thank-you.mp4"
                    poster="/images/video-poster.jpg"
                    controls
                    className="w-full rounded-2xl"
                  />

                  Option B — Loom embed:
                  <iframe
                    src="https://www.loom.com/embed/{your-loom-id}"
                    className="aspect-video w-full rounded-2xl"
                    allowFullScreen
                  />

                  Option C — YouTube embed:
                  <iframe
                    src="https://www.youtube.com/embed/{video-id}"
                    className="aspect-video w-full rounded-2xl"
                    allowFullScreen
                  />
                  ──────────────────────────────────────────────────────────────
                */}
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 p-10 text-center">
                  {/* Play button */}
                  <div className="flex size-16 items-center justify-center rounded-full bg-olive-950 text-white dark:bg-white dark:text-olive-950">
                    <ArrowNarrowRightIcon />
                  </div>
                  <div>
                    <p className="font-semibold text-olive-950 dark:text-white">Video coming soon</p>
                    <p className="mt-1 text-sm text-olive-500 dark:text-olive-400">
                      Replace this placeholder with your thank-you video
                    </p>
                  </div>
                </div>
              </div>

              {/* Mike's photo + quick intro */}
              <div className="flex items-center gap-3 rounded-xl border border-olive-950/10 p-4 dark:border-white/10">
                <div className="size-10 shrink-0 overflow-hidden rounded-full bg-olive-200 dark:bg-olive-800">
                  <img
                    src="/mike.png"
                    alt="Mike Mathias"
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-olive-950 dark:text-white">Mike Mathias</p>
                  <p className="text-xs text-olive-600 dark:text-olive-400">Founder, Kickbord · Ex-Google, Nike, Samsung</p>
                </div>
              </div>
            </div>

            {/* ── Booking embed ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">Book your free call</p>
                <h2 className="mt-1 font-display text-2xl text-olive-950 dark:text-white">
                  Pick a time that works for you.
                </h2>
                <p className="mt-2 text-sm/7 text-olive-600 dark:text-olive-400">
                  30 minutes. No pressure, no hard sell — just an honest conversation about what your business needs.
                </p>
              </div>

              {/* GoHighLevel / Calendly Booking Embed placeholder */}
              <div className="overflow-hidden rounded-2xl border border-olive-950/10 bg-white dark:border-white/10 dark:bg-olive-900">
                {/*
                  ──────────────────────────────────────────────────────────────
                  BOOKING EMBED PLACEHOLDER
                  Replace this div with your GoHighLevel calendar embed:

                  Option A — GoHighLevel inline calendar:
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/{your-calendar-id}"
                    className="w-full"
                    style={{ minHeight: '700px', border: 'none' }}
                    scrolling="no"
                  />

                  Option B — Calendly inline widget:
                  <div
                    className="calendly-inline-widget w-full"
                    data-url="https://calendly.com/kickbord/discovery"
                    style={{ minHeight: '700px' }}
                  />
                  (Also add the Calendly script to layout.tsx)

                  Option C — GoHighLevel widget script:
                  Drop their embed script tag here or in layout.tsx
                  ──────────────────────────────────────────────────────────────
                */}
                <div className="flex min-h-96 flex-col items-center justify-center gap-5 p-10 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-olive-950/10 text-olive-950 dark:bg-white/10 dark:text-white">
                    <CalendarIcon />
                  </div>
                  <div>
                    <p className="font-semibold text-olive-950 dark:text-white">Calendar booking embed</p>
                    <p className="mt-2 max-w-xs text-sm text-olive-600 dark:text-olive-400">
                      Replace this placeholder with your GoHighLevel or Calendly inline booking widget.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3 text-sm text-olive-500 dark:text-olive-400">
                    <code className="rounded bg-olive-950/5 px-3 py-1 font-mono text-xs dark:bg-white/5">
                      GoHighLevel calendar embed goes here
                    </code>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Explore more ───────────────────────────────────────────── */}
          <div className="mt-16 border-t border-olive-950/10 pt-12 dark:border-white/10">
            <p className="mb-6 text-center text-sm font-semibold text-olive-950 dark:text-white">
              While you wait, explore what Kickbord can do
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <PlainButtonLink href="/ai-voice-agents" size="md">
                AI Voice Agents <ArrowNarrowRightIcon />
              </PlainButtonLink>
              <PlainButtonLink href="/websites" size="md">
                Website Redesigns <ArrowNarrowRightIcon />
              </PlainButtonLink>
              <PlainButtonLink href="/consulting" size="md">
                Marketing Strategy <ArrowNarrowRightIcon />
              </PlainButtonLink>
              <PlainButtonLink href="/results" size="md">
                Client Results <ArrowNarrowRightIcon />
              </PlainButtonLink>
            </div>
          </div>

        </div>
      </Main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <FooterWithLinkCategories
        id="footer"
        links={
          <>
            <FooterCategory title="Services">
              <FooterLink href="/ai-voice-agents">AI Voice Agents</FooterLink>
              <FooterLink href="/websites">Websites</FooterLink>
              <FooterLink href="/consulting">Consulting</FooterLink>
            </FooterCategory>
            <FooterCategory title="Company">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/results">Results</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterCategory>
            <FooterCategory title="Legal">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </FooterCategory>
          </>
        }
        fineprint="© 2026 Kickbord. All rights reserved."
      />
    </>
  )
}
