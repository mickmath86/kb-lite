import type { Metadata } from 'next'
import { ButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'

export const metadata: Metadata = {
  title: 'CRM setup guide | Kickbord onboarding',
  description:
    'A step-by-step guide for configuring your Kickbord CRM, importing contacts, connecting your calendar, and preparing your lead pipeline.',
  robots: { index: false, follow: false },
}

type SP = Record<string, string | string[] | undefined>

const APP_ORIGIN = 'https://app.kickbord.com'
const LOCATION_ID_RE = /^[a-zA-Z0-9_-]{8,80}$/

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)

function cleanLocationId(value: string | undefined) {
  const id = value?.trim()
  return id && LOCATION_ID_RE.test(id) ? id : null
}

function crmUrl(path: string, locationId: string | null) {
  if (!locationId) return APP_ORIGIN
  return `${APP_ORIGIN}/v2/location/${encodeURIComponent(locationId)}${path}`
}

type Instruction = {
  text: string
  details?: string[]
}

const SETUP_STEPS: {
  title: string
  duration: string
  description: string
  tasks: string[]
  path: string
  videoUrl?: string
  instructionsTitle?: string
  instructions?: Instruction[]
}[] = [
  {
    title: 'Confirm business details',
    duration: '5 min',
    description:
      'Open your company settings and confirm the details your CRM will use for messaging, reporting, notifications, and customer records.',
    tasks: [
      'Confirm your official business name and primary contact information.',
      'Review your address, time zone, and business hours.',
      'Save the company settings before moving to the next step.',
    ],
    path: '/settings/company',
    videoUrl: 'https://www.youtube.com/embed/MbG0tItwJhs',
    instructionsTitle: 'Update your business details',
    instructions: [
      {
        text: 'Open Settings. Click the Settings gear icon at the bottom of the left-hand menu.',
      },
      {
        text: 'Go to Business Profile. It’s usually the first option.',
      },
      {
        text: 'Upload your logo. Drag your logo into the upload box, or click to browse. A size of 350 × 180 pixels works best.',
      },
      {
        text: 'Update your business info. Check your:',
        details: ['Business name', 'Phone number', 'Website', 'Address (country, state, city, zip code)'],
      },
      {
        text: 'Add your EIN, if you have one. Scroll down to Business Information, choose EIN as the registration type, and enter your number in the Business Registration Number field.',
        details: [
          'Why it matters: your EIN confirms your business for texting and calling features (A2P registration). Without it, your messages may be blocked or limited.',
          'Can’t find it? It’s on your IRS confirmation letter (CP 575) or on past tax returns.',
        ],
      },
      {
        text: 'Click Save. Use the blue Save button at the bottom right. Changes aren’t kept until you save.',
      },
    ],
  },
  {
    title: 'Integrate your third-party tools',
    duration: '6 min',
    description:
      'Connect the external accounts Kickbord needs for bookings, messaging, reviews, and business visibility.',
    tasks: [
      'Connect the calendar your team uses for appointments.',
      'Connect the Google account that manages business access.',
      'Link your Google Business Profile and confirm the correct location.',
    ],
    path: '/settings/lc-integrations',
    videoUrl: 'https://www.youtube.com/embed/zwon4lQtUso',
  },
  {
    title: 'Connect your phone system',
    duration: '7 min',
    description:
      'Set up the phone number and routing rules that will handle calls, texts, voicemail, and AI reception.',
    tasks: [
      'Choose or add the phone number connected to your CRM.',
      'Configure call forwarding, ringing, and voicemail behavior.',
      'Place a test call and confirm the number is working correctly.',
    ],
    path: '/settings/phone_system?tab=manage',
    videoUrl: 'https://www.youtube.com/embed/JJ-PBcGx9iw',
  },
]

const QUICK_LINKS = [
  { label: 'Return to onboarding', href: '/onboarding' },
  { label: 'Book implementation help', href: '/lp/booking' },
]

function instructionPreview(instructions: Instruction[], limit = 180) {
  const text = instructions.map((item) => item.text).join(' ')
  if (text.length <= limit) return text
  const trimmed = text.slice(0, limit)
  return `${trimmed.slice(0, trimmed.lastIndexOf(' '))}…`
}

function StepVideo({ stepNumber, videoUrl }: { stepNumber: number; videoUrl?: string }) {
  if (videoUrl) {
    return (
      <iframe
        src={videoUrl}
        title={`Step ${stepNumber} video`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-xl border border-olive-950/10 dark:border-white/10"
      />
    )
  }

  return (
    <div className="flex aspect-video flex-col items-center justify-center rounded-xl border border-dashed border-olive-950/20 bg-olive-50 p-4 text-center dark:border-white/20 dark:bg-white/10">
      <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-olive-950 text-white dark:bg-white dark:text-olive-950">
        <span className="ml-0.5 border-y-5 border-l-8 border-y-transparent border-l-current" />
      </div>
      <p className="text-sm font-semibold text-olive-950 dark:text-white">Step {stepNumber} video</p>
      <p className="mt-1 text-xs leading-5 text-olive-500 dark:text-olive-300">Add a lesson embed here</p>
    </div>
  )
}

export default async function CrmSetupGuidePage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams
  const locationId = cleanLocationId(first(sp.location) ?? first(sp.location_id))
  const dashboardUrl = crmUrl('/dashboard', locationId)
  const quickLinks = [{ label: 'Open CRM dashboard', href: dashboardUrl }, ...QUICK_LINKS]

  if (first(sp.completed) === '1') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-olive-100 px-6 py-16 text-olive-950 dark:bg-olive-950 dark:text-white">
        <div className="w-full max-w-2xl rounded-3xl border border-olive-950/10 bg-white p-8 text-center shadow-2xl shadow-olive-950/10 dark:border-white/10 dark:bg-white/5 sm:p-12">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-olive-950 text-white dark:bg-white dark:text-olive-950">
            <CheckmarkIcon className="size-7" />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-olive-600 dark:text-olive-300">
            Setup submitted
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            We&rsquo;ll be in touch with next steps
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-8 text-olive-700 dark:text-olive-300">
            Your CRM setup checklist has been marked complete. Our team will review your progress and follow up shortly.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href={dashboardUrl}>Return to your CRM <ArrowNarrowRightIcon /></ButtonLink>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-olive-100 text-olive-950 dark:bg-olive-950 dark:text-white">
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive-600 dark:text-olive-300">
              Kickbord onboarding
            </p>
            <h1 className="mt-4 font-display text-5xl font-medium tracking-tight sm:text-6xl">
              Set up your CRM in three steps
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-olive-700 dark:text-olive-300">
              Follow this guided checklist to configure your account, connect your calendar, organize your pipeline,
              and make sure every new lead lands in the right place.
            </p>
            <div className="mt-6 max-w-xl rounded-2xl border border-olive-950/10 bg-white/70 p-4 text-sm leading-6 text-olive-800 dark:border-white/10 dark:bg-white/10 dark:text-olive-200">
              <strong className="font-semibold text-olive-950 dark:text-white">Recommended:</strong> You should attempt
              these steps on a desktop or laptop device.
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={dashboardUrl}>Open the CRM <ArrowNarrowRightIcon /></ButtonLink>
              <a
                href="https://calendar.kickbord.com/widget/booking/6lH4D5VBHvMuRU7YGDky"
                className="inline-flex items-center rounded-full border border-olive-950/15 px-4 py-2 text-sm font-medium text-olive-950 transition-colors hover:bg-white dark:border-white/15 dark:text-white dark:hover:bg-white/10"
              >
                Book a Set up Session
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-olive-950/10 bg-white shadow-2xl shadow-olive-950/5 dark:border-white/10 dark:bg-white/5">
            <iframe
              className="aspect-video w-full bg-olive-950"
              src="https://www.youtube.com/embed/amIxd-rUbMw"
              title="CRM setup walkthrough video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="text-sm font-semibold">Full walkthrough</p>
                <p className="text-sm text-olive-500 dark:text-olive-300">About 18 minutes total</p>
              </div>
              <span className="rounded-full bg-olive-100 px-3 py-1 text-xs font-medium text-olive-700 dark:bg-white/10 dark:text-olive-200">
                3 lessons
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">Step-by-step setup</h2>
            <p className="mt-3 text-olive-700 dark:text-olive-300">
              Work through each section in order. Each card has a written checklist and a link to the related CRM screen.
            </p>
          </div>
          <div className="rounded-2xl border border-olive-950/10 bg-white px-4 py-3 text-sm text-olive-700 dark:border-white/10 dark:bg-white/5 dark:text-olive-300">
            Estimated time: <strong className="font-semibold text-olive-950 dark:text-white">18 minutes</strong>
          </div>
        </div>

        <ol className="space-y-5">
          {SETUP_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-olive-950/10 bg-white p-6 shadow-sm shadow-olive-950/5 dark:border-white/10 dark:bg-white/5 sm:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-olive-950 text-sm font-semibold text-white dark:bg-white dark:text-olive-950">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-olive-950 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-7 text-olive-700 dark:text-olive-300">{step.description}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                  <span className="rounded-full bg-olive-100 px-2.5 py-1 text-xs font-medium text-olive-600 dark:bg-white/10 dark:text-olive-300">
                    {step.duration}
                  </span>
                  <a
                    href={crmUrl(step.path, locationId)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-olive-950 underline decoration-olive-950/30 underline-offset-4 hover:decoration-olive-950 dark:text-white dark:decoration-white/40 dark:hover:decoration-white"
                  >
                    Open related screen in CRM<ArrowNarrowRightIcon className="size-4" />
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <StepVideo stepNumber={index + 1} videoUrl={step.videoUrl} />
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-olive-500 dark:text-olive-300">
                  What we&rsquo;ll accomplish
                </h4>
                <ul className="mt-3 space-y-3">
                  {step.tasks.map((task) => (
                    <li key={task} className="flex gap-3 text-sm leading-6 text-olive-800 dark:text-olive-200">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-olive-500" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {step.instructions && (
                <details className="group mt-8 rounded-2xl border border-olive-950/10 bg-olive-50 p-5 dark:border-white/10 dark:bg-white/10 sm:p-6">
                  <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-base font-semibold text-olive-950 dark:text-white">{step.instructionsTitle}</h4>
                      <ArrowNarrowRightIcon className="size-4 rotate-90 text-olive-500 transition-transform group-open:-rotate-90 dark:text-olive-300" />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-olive-700 group-open:hidden dark:text-olive-300">
                      {instructionPreview(step.instructions)}
                    </p>
                    <span className="mt-3 inline-flex text-sm font-semibold text-olive-950 underline decoration-olive-950/30 underline-offset-4 group-open:hidden dark:text-white dark:decoration-white/40">
                      View full instructions
                    </span>
                  </summary>
                  <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm leading-6 text-olive-800 marker:font-semibold marker:text-olive-950 dark:text-olive-200 dark:marker:text-white">
                    {step.instructions.map((item) => (
                      <li key={item.text}>
                        <p>{item.text}</p>
                        {item.details && (
                          <ul className="mt-2 space-y-1.5 pl-2">
                            {item.details.map((detail) => (
                              <li key={detail} className="flex gap-2.5">
                                <span className="mt-2.5 size-1 shrink-0 rounded-full bg-olive-500" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ol>
                </details>
              )}

              <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-olive-950/10 bg-white px-4 py-3 text-sm font-semibold text-olive-950 dark:border-white/10 dark:bg-white/5 dark:text-white">
                <input type="checkbox" className="size-4 shrink-0 accent-olive-950" />
                I&rsquo;ve completed this step
              </label>
            </li>
          ))}
        </ol>
        <form method="post" action="/api/onboarding/crm-complete" className="mx-auto mt-8 max-w-4xl">
          {locationId && <input type="hidden" name="location_id" value={locationId} />}
          <button
            type="submit"
            className="w-full rounded-full bg-olive-950 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-olive-800 dark:bg-white dark:text-olive-950 dark:hover:bg-olive-100"
          >
            I&rsquo;ve completed setup
          </button>
        </form>
      </section>

      <section className="border-t border-olive-950/10 bg-white/60 px-6 py-10 dark:border-white/10 dark:bg-white/5 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-medium sm:text-3xl">Ready for the next part?</h2>
            <p className="mt-2 text-olive-700 dark:text-olive-300">
              If you get stuck, open the CRM directly or book a working session with our team.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="rounded-full border border-olive-950/15 px-4 py-2 text-sm font-medium text-olive-950 transition-colors hover:bg-olive-950 hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-olive-950"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        
      </section>
    </main>
  )
}
