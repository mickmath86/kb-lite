import type { Metadata } from 'next'

import { Main } from '@/components/elements/main'
import FooterMain from '@/components/sections/footer-main'
import MainNav from '@/components/sections/main-nav'

import { PlaybookExperience } from './playbook-experience'

type SearchParams = Promise<{ demo?: string | string[] }>

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  const params = await searchParams
  const demo = params.demo === '1'

  return {
    title: 'Review Request Playbook | Kickbord',
    description:
      'A practical guide for home-service contractors: who asks for the review, when it goes out, words you can copy, and when to stop.',
    alternates: { canonical: '/resources/review-request-playbook' },
    robots: demo ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export default async function ReviewRequestPlaybookPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const demoMode = params.demo === '1'

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
