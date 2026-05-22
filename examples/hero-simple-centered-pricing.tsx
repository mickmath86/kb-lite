import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'
import { ButtonLink } from '@/components/elements/button'

export function Example() {
  return (
    <HeroSimpleCentered
      headline="Simple, transparent pricing"
      subheadline="Choose the plan that's right for you"
      cta={
        <div className="flex gap-4 justify-center">
          <ButtonLink href="#">Get started</ButtonLink>
        </div>
      }
    />
  )
}
