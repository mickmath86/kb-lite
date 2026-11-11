import { Instrument_Serif } from 'next/font/google'

import './report.css'

const display = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

export default function GbpReportLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} report-root`}>{children}</div>
}
