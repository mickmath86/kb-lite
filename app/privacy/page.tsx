import { Main } from '@/components/elements/main'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithLinkCategories,
} from '@/components/sections/footer-with-link-categories'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'

export const metadata = {
  title: 'Privacy Policy — Kickbord',
  description: 'How Kickbord collects, uses, and protects your information.',
}

const LAST_UPDATED = 'June 8, 2026'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-olive-950/10 pt-10 dark:border-white/10">
      <h2 className="font-display text-2xl text-olive-950 dark:text-white">{title}</h2>
      <div className="mt-4 space-y-4 text-base/7 text-olive-700 dark:text-olive-300">
        {children}
      </div>
    </section>
  )
}

export default function PrivacyPage() {
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
            <NavbarLink href="/get-started" className="sm:hidden">Get started</NavbarLink>
          </>
        }
        logo={
          <NavbarLogo href="/">
            <img src="/Logos/icon.svg" alt="Kickbord" className="dark:hidden" width={85} height={28} />
            <img src="/Logos/icon.svg" className="not-dark:hidden" width={85} height={28} />
          </NavbarLogo>
        }
        actions={
          <>
            <PlainButtonLink href="/contact" className="max-sm:hidden">Book a call</PlainButtonLink>
            <ButtonLink href="/get-started">Get started <ArrowNarrowRightIcon /></ButtonLink>
          </>
        }
      />

      <Main>
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">

          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-olive-500 dark:text-olive-400">
              Legal
            </p>
            <h1 className="mt-3 font-display text-4xl text-olive-950 dark:text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base text-olive-600 dark:text-olive-400">
              Last updated: {LAST_UPDATED}
            </p>
            <p className="mt-6 text-base/7 text-olive-700 dark:text-olive-300">
              Kickbord (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website at kickbord.com and provides
              marketing, AI, and consulting services to small businesses. This Privacy Policy explains how we
              collect, use, disclose, and protect your information when you visit our website, submit a form,
              or communicate with us — including via SMS text messaging.
            </p>
            <p className="mt-4 text-base/7 text-olive-700 dark:text-olive-300">
              By using our website or providing your contact information, you agree to the terms of this
              Privacy Policy.
            </p>
          </div>

          <div className="flex flex-col gap-10">

            <Section title="1. Information We Collect">
              <p>
                We collect information you voluntarily provide to us, including when you fill out a contact
                form, complete our onboarding questionnaire, book a call, or communicate with us directly.
                This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your name</li>
                <li>Business name and type</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Information about your business needs, goals, and marketing situation</li>
              </ul>
              <p>
                We also collect standard technical information automatically when you visit our website,
                including your IP address, browser type, pages visited, and referring URL. This data is used
                for analytics and site improvement purposes only.
              </p>
            </Section>

            <Section title="2. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and communicate with you about our services</li>
                <li>Send SMS messages and follow-up communications you have consented to receive</li>
                <li>Schedule consultations, calls, or strategy sessions</li>
                <li>Deliver and improve our services</li>
                <li>Send you relevant marketing information about Kickbord (you may opt out at any time)</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p>
                We do not use your information for any purpose that contradicts what is described in this
                policy without your explicit consent.
              </p>
            </Section>

            <Section title="3. SMS Communications">
              <p>
                Kickbord may send you SMS text messages if you have provided your phone number and consented
                to receive text communications. By submitting your phone number through any form on our
                website, you expressly consent to receive SMS messages from Kickbord related to our services,
                follow-up communications, appointment reminders, and marketing outreach.
              </p>
              <p>
                <strong className="font-semibold text-olive-950 dark:text-white">Message frequency:</strong>{' '}
                Message frequency varies depending on your engagement and the nature of our communications.
              </p>
              <p>
                <strong className="font-semibold text-olive-950 dark:text-white">Message and data rates:</strong>{' '}
                Standard message and data rates may apply depending on your mobile carrier and plan.
              </p>
              <p>
                <strong className="font-semibold text-olive-950 dark:text-white">Opt-out:</strong>{' '}
                You may opt out of SMS communications at any time by replying <strong className="font-semibold text-olive-950 dark:text-white">STOP</strong> to
                any message we send. After opting out, you will receive one final confirmation message and
                will not receive further SMS messages from us unless you re-consent.
              </p>
              <p>
                <strong className="font-semibold text-olive-950 dark:text-white">Help:</strong>{' '}
                Reply <strong className="font-semibold text-olive-950 dark:text-white">HELP</strong> to any
                SMS message for assistance, or contact us at{' '}
                <a href="mailto:info@kickbord.com" className="text-olive-950 underline dark:text-white">
                  info@kickbord.com
                </a>.
              </p>
              <p>
                We do not use SMS to send unsolicited spam. Our SMS outreach is limited to individuals who
                have expressed interest in our services or have provided their contact information through
                our website or related marketing channels.
              </p>
            </Section>

            <Section title="4. How We Share Your Information">
              <p>
                <strong className="font-semibold text-olive-950 dark:text-white">
                  We do not sell, rent, or trade your personal information to third parties. Ever.
                </strong>
              </p>
              <p>
                We may share your information in the following limited circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="font-semibold text-olive-950 dark:text-white">Service providers:</strong>{' '}
                  We use trusted third-party platforms (such as CRM software, email marketing tools, and
                  scheduling platforms) to help us operate our business. These providers are contractually
                  obligated to protect your information and may not use it for their own purposes.
                </li>
                <li>
                  <strong className="font-semibold text-olive-950 dark:text-white">Legal compliance:</strong>{' '}
                  We may disclose your information if required to do so by law, court order, or government
                  authority.
                </li>
                <li>
                  <strong className="font-semibold text-olive-950 dark:text-white">Business transfers:</strong>{' '}
                  In the event of a merger, acquisition, or sale of all or part of our business, your
                  information may be transferred as part of that transaction. We will notify you via email
                  or a prominent notice on our website before your data becomes subject to a different
                  privacy policy.
                </li>
              </ul>
            </Section>

            <Section title="5. Data Retention">
              <p>
                We retain your personal information for as long as necessary to provide our services,
                maintain our business records, and comply with legal obligations. If you would like us to
                delete your information, please contact us at{' '}
                <a href="mailto:info@kickbord.com" className="text-olive-950 underline dark:text-white">
                  info@kickbord.com
                </a>{' '}
                and we will honor your request within a reasonable timeframe.
              </p>
            </Section>

            <Section title="6. Cookies and Tracking">
              <p>
                Our website may use cookies and similar tracking technologies to improve site performance
                and understand how visitors interact with our content. Cookies are small text files stored
                on your device.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                sent. Note that some features of our website may not function properly if cookies are
                disabled.
              </p>
              <p>
                We may use analytics tools such as Google Analytics to understand site traffic and user
                behavior. These tools collect anonymized data and are governed by their own privacy policies.
              </p>
            </Section>

            <Section title="7. Your Rights and Choices">
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Opt out of SMS messages by replying STOP</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:info@kickbord.com" className="text-olive-950 underline dark:text-white">
                  info@kickbord.com
                </a>. We will respond within 30 days.
              </p>
            </Section>

            <Section title="8. Security">
              <p>
                We take reasonable technical and organizational measures to protect your personal information
                from unauthorized access, disclosure, alteration, or destruction. This includes using
                industry-standard encryption and access controls on our systems.
              </p>
              <p>
                No method of transmission over the internet or electronic storage is 100% secure. While we
                strive to protect your information, we cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="9. Children's Privacy">
              <p>
                Our services are intended for business owners and adults. We do not knowingly collect
                personal information from individuals under the age of 13. If we become aware that we have
                collected such information, we will delete it promptly.
              </p>
            </Section>

            <Section title="10. Third-Party Links">
              <p>
                Our website may contain links to third-party websites. We are not responsible for the
                privacy practices or content of those sites. We encourage you to review the privacy policy
                of any third-party site you visit.
              </p>
            </Section>

            <Section title="11. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or
                for legal reasons. When we do, we will update the &quot;Last updated&quot; date at the top of this
                page. We encourage you to review this policy periodically.
              </p>
              <p>
                Continued use of our website or services after any changes constitutes your acceptance of
                the updated policy.
              </p>
            </Section>

            <Section title="12. Contact Us">
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or how we handle
                your data, please contact us:
              </p>
              <div className="mt-4 rounded-xl border border-olive-950/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
                <p className="font-semibold text-olive-950 dark:text-white">Kickbord</p>
                <p className="mt-1 text-olive-700 dark:text-olive-300">1000 Business Center Circle</p>
                <p className="mt-1">
                  <a href="mailto:info@kickbord.com" className="text-olive-950 underline dark:text-white">
                    info@kickbord.com
                  </a>
                </p>
              </div>
            </Section>

          </div>
        </div>
      </Main>

      <FooterWithLinkCategories
        id="footer"
        links={
          <>
            <FooterCategory title="Services">
              <FooterLink href="/ai-voice-agents">AI Voice Agents</FooterLink>
              <FooterLink href="/websites">Websites &amp; Redesigns</FooterLink>
              <FooterLink href="/consulting">Consulting &amp; Strategy</FooterLink>
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
