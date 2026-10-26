import type { Metadata } from 'next'
import { CalibrateClient } from '@/components/estimator/calibrate-client'

export const metadata: Metadata = {
  title: 'Set your prices, one job at a time | Kickbord',
  description: 'React to sample jobs and we build your estimator prices from your answers.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

type SP = Record<string, string | string[] | undefined>

export default async function EstimatorCalibratePage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams
  const raw = Array.isArray(sp.t) ? sp.t[0] : sp.t
  const token = raw && /^[a-f0-9]{48}$/.test(raw) ? raw : ''
  return <CalibrateClient token={token} />
}
