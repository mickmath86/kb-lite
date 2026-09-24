import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Section } from '../elements/section'

export function Stat({
  icon,
  stat,
  text,
  className,
  ...props
}: { icon?: ReactNode; stat: ReactNode; text: ReactNode } & ComponentProps<'div'>) {
  return (
    <div className={clsx('rounded-xl bg-olive-950/2.5 p-6 dark:bg-white/5', className)} {...props}>
      <div className="flex flex-row gap-2 items-center relative">
         {icon && <div className="  size-10 items-center justify-center flex">{icon}</div>}
         <div className="text-xl tracking-tight text-olive-950 dark:text-white z-10">{stat}</div>
      </div>
     
      <p className="mt-2 text-sm/7 text-olive-700 dark:text-olive-400">{text}</p>
    </div>
  )
}

export function StatsFourColumns({ children, ...props }: ComponentProps<typeof Section>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </Section>
  )
}
