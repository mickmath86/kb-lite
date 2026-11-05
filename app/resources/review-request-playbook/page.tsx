import type { Metadata } from 'next'

import { Main } from '@/components/elements/main'
import FooterMain from '@/components/sections/footer-main'
import MainNav from '@/components/sections/main-nav'

import { isAutomaticReviewDemo } from '@/lib/review-playbook/submit'

import { PlaybookExperience } from './playbook-experience'

function reviewDemoFromEnv() {
  return isAutomaticReviewDemo({
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    webhookUrl: process.env.REVIEW_PLAYBOOK_WEBHOOK_URL,
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const demo = reviewDemoFromEnv()

  return {
    title: 'Review Request Playbook | Kickbord',
    description:
      'A practical guide for home-service contractors: who asks for the review, when it goes out, words you can copy, and when to stop.',
    alternates: { canonical: '/resources/review-request-playbook' },
    robots: demo ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export default async function ReviewRequestPlaybookPage() {
  const demoMode = reviewDemoFromEnv()

  return (
    <>
      <div className="playbook-chrome">
        <MainNav />
      </div>
      <Main>
        <PlaybookExperience demoMode={demoMode} />
      </Main>
      <div className="playbook-chrome">
        <FooterMain />
      </div>
    </>
  )
}
