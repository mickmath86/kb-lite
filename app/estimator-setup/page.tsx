import type { Metadata } from 'next'
import { SetupClient } from '@/components/estimator/setup-client'

export const metadata: Metadata = {
  title: 'Estimator pricing | Kickbord',
  description: 'Enter the prices your online estimator will show your customers.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

type SP = Record<string, string | string[] | undefined>

export default async function EstimatorSetupPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams
  const raw = Array.isArray(sp.t) ? sp.t[0] : sp.t
  const token = raw && /^[a-f0-9]{48}$/.test(raw) ? raw : ''
  return <SetupClient token={token} />
}
