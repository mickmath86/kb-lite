import { Main } from '@/components/elements/main'
import {
  FooterCategory,
  FooterLink,
  FooterWithLinkCategories,
} from '@/components/sections/footer-with-link-categories'

export const metadata = {
  title: 'Security — Kickbord',
  description: 'How Kickbord protects your data and your customers’ data.',
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

export default function SecurityPage() {
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
              Security
            </h1>
            <p className="mt-4 text-base text-olive-600 dark:text-olive-400">
              Last updated: {LAST_UPDATED}
            </p>
            <p className="mt-6 text-base/7 text-olive-700 dark:text-olive-300">
              Your business data — and your customers&rsquo; data — matters. This page describes the measures
              Kickbord takes to keep information safe across our website, CRM, AI receptionist, and
              marketing systems.
            </p>
          </div>

          <div className="flex flex-col gap-10">

            <Section title="1. Encryption in Transit and at Rest">
              <p>
                All traffic between your browser and our systems is encrypted using TLS (HTTPS). Data stored
                in our platform and third-party providers is encrypted at rest using industry-standard
                encryption.
              </p>
            </Section>

            <Section title="2. Access Controls">
              <ul className="list-disc pl-6 space-y-2">
                <li>Access to client data is limited to team members who need it to deliver your services</li>
                <li>Administrative and production systems require strong authentication</li>
                <li>Credentials and API keys are stored in encrypted secrets managers — never in source code</li>
                <li>Access is revoked promptly when team members or vendors no longer need it</li>
              </ul>
            </Section>

            <Section title="3. Trusted Infrastructure and Vendors">
              <p>
                Kickbord runs on established cloud infrastructure and vetted third-party platforms for CRM,
                telephony, scheduling, and payments. We select providers with strong security programs and
                contractually require them to protect your data. We do not sell or rent client data to any
                third party.
              </p>
            </Section>

            <Section title="4. Payment Security">
              <p>
                Payments are processed by PCI-compliant payment providers. Kickbord never stores full credit
                card numbers on our own systems.
              </p>
            </Section>

            <Section title="5. Call Recordings and Customer Data">
              <p>
                AI receptionist call recordings, transcripts, texts, and lead data are stored within your
                CRM account with access restricted to your account users. You control retention of that data
                inside your own systems.
              </p>
            </Section>

            <Section title="6. Data Minimization">
              <p>
                We collect only the information needed to deliver our services — contact details, business
                information, and standard analytics. We keep lead contact details out of URLs and log files
                wherever possible.
              </p>
            </Section>

            <Section title="7. Incident Response">
              <p>
                If we become aware of a security incident affecting your personal information, we will
                investigate promptly and notify affected clients as required by applicable law.
              </p>
            </Section>

            <Section title="8. Responsible Disclosure">
              <p>
                If you believe you&rsquo;ve found a security vulnerability in our website or systems, please
                report it to{' '}
                <a href="mailto:info@kickbord.com" className="text-olive-950 underline dark:text-white">
                  info@kickbord.com
                </a>{' '}
                so we can investigate. We ask that you act in good faith and avoid accessing or altering
                data that isn&rsquo;t yours.
              </p>
            </Section>

            <Section title="9. Questions">
              <p>
                Questions about our security practices? Contact us:
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
