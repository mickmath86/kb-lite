import { Instrument_Serif } from 'next/font/google'

import './playbook.css'

const display = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

export default function ReviewPlaybookLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} playbook-root`}>{children}</div>
}
