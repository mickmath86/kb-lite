import type { Metadata } from 'next'
import { PhoneIcon } from '@heroicons/react/20/solid'
import { ButtonLink } from '@/components/elements/button'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Main } from '@/components/elements/main'
import FooterMain from '@/components/sections/footer-main'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'
import MainNav from '@/components/sections/main-nav'

export const metadata: Metadata = {
  title: 'AI Receptionist Demo | Kickbord',
  description:
    'Call the demo line and hear what an AI receptionist for a home service business sounds like.',
}

const DEMO_LINE = 'tel://8052237906'

export default function ReceptionistDemoPage() {
  return (
    <>
      <MainNav />
      <Main>
        <HeroSimpleCentered
          eyebrow={<Eyebrow>AI receptionist demo</Eyebrow>}
          headline="Hear an AI receptionist for a home service business."
          subheadline={
            <p>Call the demo line and listen to how it answers.</p>
          }
          cta={
            <ButtonLink href={DEMO_LINE} size="lg">
              <PhoneIcon className="size-4" />
              Try it out
            </ButtonLink>
          }
        />
      </Main>
      <FooterMain />
    </>
  )
}
