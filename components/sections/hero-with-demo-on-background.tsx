import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Wallpaper } from '../elements/wallpaper'

export function HeroWithDemoOnBackground({
  eyebrow,
  headline,
  subheadline,
  cta,
  demo,
  demoLayout = 'overflow',
  footer,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  cta?: ReactNode
  demo?: ReactNode
  demoLayout?: 'overflow' | 'contained'
  footer?: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('flex flex-col gap-16 px-2 pb-16', className)} {...props}>
      <Wallpaper className="rounded-lg" color="green">
        <div className="-mx-2 sm:px-6 md:px-12 lg:px-0">
          <Container className="flex flex-col gap-16">
            <div className="flex gap-x-10 gap-y-16 max-lg:flex-col sm:gap-y-24">
              <div className={clsx('flex flex-col items-start gap-6 pt-16 sm:pt-32', demoLayout === 'contained' ? 'min-w-0 lg:flex-1 lg:py-24' : 'shrink-0 lg:basis-2xl lg:py-40')}>
                {eyebrow}
                <Heading className="max-w-5xl" color="light">
                  {headline}
                </Heading>
                <div className="flex max-w-3xl flex-col gap-4 text-lg/8 text-white/70">{subheadline}</div>
                {cta}
              </div>
              {demoLayout === 'contained' ? (
                <div className="w-full min-w-0 pb-8 lg:max-w-lg lg:flex-1 lg:py-24">{demo}</div>
              ) : (
                <div className="lg:pt-24">
                  <div className="relative h-72 sm:h-92 md:h-125 lg:size-full">
                    <div className="absolute inset-y-0 left-0 flex w-screen overflow-hidden *:h-full *:w-auto *:max-w-none max-lg:rounded-t-lg lg:rounded-tl-lg">
                      {demo}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>
      </Wallpaper>
      <Container>{footer}</Container>
    </section>
  )
}
