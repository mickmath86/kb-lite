import type { Metadata } from 'next'
import { Instrument_Serif } from 'next/font/google'
import { Main } from '@/components/elements/main'
import FooterMain from '@/components/sections/footer-main'
import MainNav from '@/components/sections/main-nav'
import { PlaybookExperience } from './playbook-experience'

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-playbook-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Review request playbook — Kickbord',
  description:
    'A practical playbook for home-service contractors: ask every customer for an honest Google review after the job is done.',
  alternates: { canonical: '/resources/review-request-playbook' },
  openGraph: {
    title: 'Review request playbook — Kickbord',
    description:
      'Who sends the ask, the direct Google link, words you can copy, one follow-up, and a separate path when the job was not right.',
    url: '/resources/review-request-playbook',
    siteName: 'Kickbord',
    type: 'article',
  },
}

export default function ReviewRequestPlaybookPage() {
  return (
    <div className={`${display.variable} min-h-screen bg-[#f4f4f0] text-[#0c0c09] [color-scheme:light]`}>
      <style>{`
        .playbook-serif { font-family: var(--font-playbook-serif), Georgia, serif; }
        .playbook-sans { font-family: var(--font-geist-sans), Inter, system-ui, sans-serif; }
      `}</style>
      <div className="playbook-sans print:hidden">
        <MainNav />
      </div>
      <Main className="playbook-sans">
        <PlaybookExperience />
      </Main>
      <div className="print:hidden">
        <FooterMain />
      </div>
    </div>
  )
}
