import { Main } from '@/components/elements/main'
import {
  FooterCategory,
  FooterLink,
  FooterWithLinkCategories,
} from '@/components/sections/footer-with-link-categories'

export const metadata = {
  title: 'Terms of Service — Kickbord',
  description: 'The terms that govern your use of Kickbord’s website and services.',
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

export default function TermsPage() {
  return (
    <>
      <div className="w-full flex items-center justify-center my-12">
        <img src="/logos/kb-icon-white.png" className="h-16" alt="Kickbord Logo" />
      </div>

      <Main>
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">

          <div className="mb-16">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-olive-500 dark:text-olive-400">
              Legal
            </p>
            <h1 className="mt-3 font-display text-4xl text-olive-950 dark:text-white sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-base text-olive-600 dark:text-olive-400">
              Last updated: {LAST_UPDATED}
            </p>
            <p className="mt-6 text-base/7 text-olive-700 dark:text-olive-300">
              These Terms of Service (&quot;Terms&quot;) govern your use of the Kickbord website at kickbord.com
              and the marketing, advertising, and AI services we provide. By using our website or purchasing
              our services, you agree to these Terms.
            </p>
          </div>

          <div className="flex flex-col gap-10">

            <Section title="1. Services">
              <p>
                Kickbord provides marketing services to small businesses, including website builds and
                management, Local Service Ads management, local SEO, automated review requests, AI
                receptionist services, and related software access. The specific scope, deliverables, and
                pricing for your engagement are described in your plan selection, order form, or service
                agreement.
              </p>
            </Section>

            <Section title="2. Fees and Billing">
              <p>
                Services are billed as described at checkout — monthly or quarterly subscription plans, plus
                any applicable one-time setup fees. Additional costs such as AI usage rates and advertising
                spend (for example, Google Local Service Ads budgets) are billed separately and are not
                included in subscription pricing unless explicitly stated.
              </p>
              <p>
                Fees are charged automatically to the payment method you provide. You are responsible for
                keeping your payment information current. Late or failed payments may result in suspension
                of services.
              </p>
            </Section>

            <Section title="3. No Long-Term Contracts">
              <p>
                Unless a separate written agreement says otherwise, Kickbord subscriptions are month-to-month
                (or quarter-to-quarter for quarterly billing). You may cancel at any time with notice before
                your next billing date. Your services remain active through the end of the paid billing
                period; we do not prorate partial periods.
              </p>
            </Section>

            <Section title="4. SMS Consent">
              <p>
                By providing your phone number through any form on our website, you consent to receive SMS
                text messages from Kickbord related to your inquiry, appointments, service updates, and
                marketing outreach. Message frequency varies. Message and data rates may apply. Reply{' '}
                <strong className="font-semibold text-olive-950 dark:text-white">STOP</strong> to opt out or{' '}
                <strong className="font-semibold text-olive-950 dark:text-white">HELP</strong> for help. See
                our <a href="/privacy" className="text-olive-950 underline dark:text-white">Privacy Policy</a>{' '}
                for details.
              </p>
            </Section>

            <Section title="5. Client Responsibilities">
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate business information and timely access needed to deliver services</li>
                <li>Ensure you have the right to use any content, logos, or materials you provide to us</li>
                <li>Use our services in compliance with applicable laws, including advertising and telemarketing regulations</li>
                <li>Not misuse our AI receptionist or messaging systems for unlawful or deceptive purposes</li>
              </ul>
            </Section>

            <Section title="6. Intellectual Property">
              <p>
                You own your business content, brand assets, and the customer data generated through your
                services. Kickbord retains ownership of our proprietary systems, software, templates, and
                processes. Upon full payment, deliverables such as your website content are yours; the
                underlying platform and tooling remain Kickbord property licensed to you while your
                subscription is active.
              </p>
            </Section>

            <Section title="7. Results Disclaimer">
              <p>
                We work to generate calls, reviews, and booked jobs for your business, but we do not
                guarantee specific revenue, ranking, or lead-volume results. Marketing outcomes depend on
                your market, competition, ad spend, and factors outside our control.
              </p>
            </Section>

            <Section title="8. Third-Party Platforms">
              <p>
                Our services rely on third-party platforms — including Google, Meta, scheduling and CRM
                software, and telephony providers. Changes to those platforms&rsquo; features, pricing, or
                policies may affect your services and are outside our control. Your use of integrated
                platforms is also subject to their own terms.
              </p>
            </Section>

            <Section title="9. Limitation of Liability">
              <p>
                To the fullest extent permitted by law, Kickbord&rsquo;s total liability for any claim arising
                from or related to our services is limited to the fees you paid us in the three months
                preceding the claim. We are not liable for indirect, incidental, or consequential damages,
                including lost profits or lost data.
              </p>
            </Section>

            <Section title="10. Changes to These Terms">
              <p>
                We may update these Terms from time to time. When we do, we will update the &quot;Last
                updated&quot; date at the top of this page. Continued use of our website or services after
                changes take effect constitutes acceptance of the updated Terms.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>
                If you have questions about these Terms, contact us:
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
              <FooterLink href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</FooterLink>
              <FooterLink href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</FooterLink>
              <FooterLink href="/security" target="_blank" rel="noopener noreferrer">Security</FooterLink>
            </FooterCategory>
          </>
        }
        fineprint="© 2026 Kickbord. All rights reserved."
      />
    </>
  )
}
