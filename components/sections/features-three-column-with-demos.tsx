import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Button } from '../elements/button'
import { Section } from '../elements/section'
import { Link } from '../elements/link'
import { ArrowRightIcon } from '@heroicons/react/16/solid'

export function FeatureThreeColumnWithDemos({
  demo,
  headline,
  subheadline,
  className,
  cta,

  ...props
}: {
  demo: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  cta?: ReactNode
} & ComponentProps<'div'>) {
  return (
    <div className={clsx('rounded-lg bg-olive-950/2.5 p-2 dark:bg-white/5', className)} {...props}>
      <div className="relative overflow-hidden rounded-sm dark:after:absolute dark:after:inset-0 dark:after:rounded-sm dark:after:outline-1 dark:after:-outline-offset-1 dark:after:outline-white/10">
        {demo}
      </div>
      <div className="p-6 sm:p-10 lg:p-6 flex flex-col h-100 justify-between">
        <h3 className="text-2xl/8 font-medium text-olive-950 dark:text-white">{headline}</h3>
        <div className="mt-2 flex flex-col gap-4 text-md/7 text-olive-700 dark:text-olive-400">{subheadline}</div>
       <div className="mt-4">{cta}</div>
      </div>
     
    </div>
  )
}

export function Features({
  features,
  cta,
  ...props
}: { features: ReactNode; cta?: ReactNode } & Omit<ComponentProps<typeof Section>, 'children'>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">{features}</div>
      <div className="mt-8 text-center">{cta}</div>
    </Section>
  )
}
