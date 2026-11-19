import type { Metadata } from 'next'

import { Main } from '@/components/elements/main'
import FooterMain from '@/components/sections/footer-main'
import MainNav from '@/components/sections/main-nav'
import { isGbpSampleData, isGbpWebhookDemo } from '@/lib/gbp-report/submit'

import { ReportExperience } from './report-experience'

function envFlags() {
  const env = {
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    webhookUrl: process.env.GBP_REPORT_WEBHOOK_URL,
    placesApiKey: process.env.GOOGLE_PLACES_API_KEY,
  }
  return { demo: isGbpWebhookDemo(env), sample: isGbpSampleData(env) }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { demo, sample } = envFlags()
  return {
    title: 'Free Google Business Profile Report | Kickbord',
    description:
      'Enter your website to get a free score for your Google Business Profile, a side-by-side look at your top 5 local competitors, and a ranked list of what to fix first.',
    alternates: { canonical: '/resources/google-business-profile-report' },
    robots: demo || sample ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export default function GbpReportPage() {
  const { demo, sample } = envFlags()
  return (
    <>
      <div className="report-chrome">
        <MainNav />
      </div>
      <Main>
        <ReportExperience demoMode={demo} sampleMode={sample} />
      </Main>
      <div className="report-chrome">
        <FooterMain />
      </div>
    </>
  )
}
