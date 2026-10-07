import {
  FeatureThreeColumnWithDemos,
  Features as FeaturesThreeColWithDemos,
} from '@/components/sections/features-three-column-with-demos'
import { Screenshot } from '@/components/elements/screenshot'
import type { ReactNode } from 'react'

type Wallpaper = 'green' | 'blue' | 'brown' | 'purple'

export type Trade = { name: string; image: string; text: string }

export const TRADES: Record<string, Trade> = {
  generalContractor: { name: 'General Contractors', image: '/images/trade-images/general-contractor.png', text: 'Remodels, additions, renovations, and project management.' },
  plumber: { name: 'Plumbers', image: '/images/trade-images/plumber.png', text: 'Repairs, drain cleaning, water heaters, repipes, and emergency calls.' },
  hvac: { name: 'HVAC Contractors', image: '/images/trade-images/hvac.png', text: 'AC repair, furnace service, system replacements, and maintenance plans.' },
  electrician: { name: 'Electricians', image: '/images/trade-images/electrician.png', text: 'Panel upgrades, EV chargers, lighting, rewiring, and troubleshooting.' },
  roofer: { name: 'Roofers', image: '/images/trade-images/roofer.png', text: 'Leak repairs, re-roofs, inspections, and storm damage.' },
  garage: { name: 'Garage Door Contractors', image: '/images/trade-images/garage.png', text: 'Repairs, replacements, openers, and emergency service.' },
  landscape: { name: 'Landscapers', image: '/images/trade-images/landscape.png', text: 'Design, installs, irrigation, hardscape, and recurring maintenance.' },
  painter: { name: 'Painters', image: '/images/trade-images/painter.png', text: 'Interior and exterior painting, cabinets, and commercial repaints.' },
  pestControl: { name: 'Pest Control Companies', image: '/images/trade-images/pest-control.png', text: 'Inspections, treatment plans, exclusion, and recurring maintenance.' },
  mason: { name: 'Concrete & Masonry Contractors', image: '/images/trade-images/mason.png', text: 'Driveways, patios, foundations, retaining walls, and stonework.' },
  flooring: { name: 'Flooring Contractors', image: '/images/trade-images/flooring.png', text: 'Hardwood, tile, carpet, vinyl, refinishing, and installation.' },
  remodeler: { name: 'Remodelers', image: '/images/trade-images/remodeler.png', text: 'Kitchens, bathrooms, whole-home remodels, and ADUs.' },
}

const WALLPAPERS: Wallpaper[] = ['green', 'purple', 'blue', 'brown']

export function TradesGrid({
  eyebrow,
  headline,
  subheadline,
  trades,
  overrides = {},
}: {
  eyebrow: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  trades: (keyof typeof TRADES)[]
  /** Optional per-trade copy that fits the system on this page. */
  overrides?: Partial<Record<keyof typeof TRADES, string>>
}) {
  return (
    <FeaturesThreeColWithDemos
      id="trades"
      eyebrow={eyebrow}
      headline={headline}
      subheadline={subheadline}
      features={
        <>
          {trades.map((key, i) => {
            const t = TRADES[key]
            return (
              <FeatureThreeColumnWithDemos
                key={key}
                demo={
                  <Screenshot wallpaper={WALLPAPERS[i % WALLPAPERS.length]} placement="bottom-right">
                    <img src={t.image} alt={`${t.name} example`} width={1448} height={1086} />
                  </Screenshot>
                }
                headline={t.name}
                subheadline={<p>{overrides[key] ?? t.text}</p>}
              />
            )
          })}
        </>
      }
    />
  )
}
