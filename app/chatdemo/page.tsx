import type { Metadata } from 'next'
import Script from 'next/script'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { MapPinIcon } from '@/components/icons/map-pin-icon'
import { StarIcon } from '@/components/icons/star-icon'

export const metadata: Metadata = {
  title: 'Green Valley Landscaping — Demo',
  description: 'AI chatbot demo for Green Valley Landscaping. Powered by Kickbord.',
}

const services = [
  'Lawn Mowing & Edging',
  'Irrigation Installation & Repair',
  'Tree & Shrub Trimming',
  'Sod Installation',
  'Landscape Design',
  'Seasonal Cleanup',
]

const reviews = [
  { name: 'James T.', stars: 5, text: 'Green Valley transformed our backyard completely. Professional crew, on time, and the results speak for themselves.' },
  { name: 'Maria R.', stars: 5, text: 'Best landscaping company in the area. They respond fast and their work is immaculate every single time.' },
  { name: 'David K.', stars: 5, text: 'Had them redo our front yard and install a drip system. Couldn\'t be happier — looks incredible.' },
]

export default function ChatDemoPage() {
  return (
    <div className="min-h-screen bg-white text-olive-950 dark:bg-olive-950 dark:text-white">

      {/* ── Nav ── */}
      <header className="sticky top-0 z-40 border-b border-olive-950/10 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-olive-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-olive-700">
              <svg className="size-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <span className="font-semibold text-olive-950 dark:text-white">Green Valley Landscaping</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#services" className="text-olive-600 transition hover:text-olive-950 dark:text-olive-400 dark:hover:text-white">Services</a>
            <a href="#about" className="text-olive-600 transition hover:text-olive-950 dark:text-olive-400 dark:hover:text-white">About</a>
            <a href="#reviews" className="text-olive-600 transition hover:text-olive-950 dark:text-olive-400 dark:hover:text-white">Reviews</a>
          </nav>
          <a
            href="tel:+18055550123"
            className="inline-flex items-center gap-2 rounded-full bg-olive-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-olive-800"
          >
            <span className="size-4">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </span>
            (805) 555-0123
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-olive-900 to-olive-700 px-6 py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_-10%,oklch(52%_0.1_145)_0%,transparent_55%)]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
            <span className="size-4 text-olive-200"><StarIcon /></span>
            5.0 · 200+ Reviews on Google
          </div>
          <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            Landscaping you can<br />count on.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-white/80">
            Serving the Ventura County area for over 15 years. From routine maintenance to full landscape transformations.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-olive-950 transition hover:bg-white/90"
            >
              Get a Free Quote
            </a>
            <a
              href="tel:+18055550123"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-olive-500">What we do</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl text-olive-950 dark:text-white">Full-service landscaping.</h2>
          <p className="mt-3 text-base text-olive-600 dark:text-olive-400 max-w-xl">
            Whether you need a one-time cleanup or ongoing maintenance, we have you covered.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 rounded-xl border border-olive-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-olive-950/5 text-olive-600 dark:bg-white/10 dark:text-olive-300">
                  <span className="size-4"><CheckmarkIcon /></span>
                </span>
                <span className="text-sm font-medium text-olive-950 dark:text-white">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="bg-olive-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-olive-400">About us</p>
              <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
                Local experts who care about your property.
              </h2>
              <p className="mt-4 text-base/7 text-white/70">
                Green Valley Landscaping has been serving Ventura County since 2009. We are a family-owned business that takes pride in every project — from weekly lawn care to complete landscape redesigns.
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {[
                  'Licensed & fully insured',
                  'Free estimates on all projects',
                  'Same-week availability for new clients',
                  'Satisfaction guaranteed',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                    <span className="mt-0.5 size-4 shrink-0 text-olive-400"><CheckmarkIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="size-5 text-olive-400"><MapPinIcon /></span>
                <p className="text-sm text-white/70">Serving Ventura County & surrounding areas</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: '15+', label: 'Years in business' },
                  { stat: '1,200+', label: 'Happy customers' },
                  { stat: '200+', label: 'Google reviews' },
                  { stat: '5.0 ★', label: 'Average rating' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/8 p-4">
                    <p className="font-display text-2xl text-white">{item.stat}</p>
                    <p className="mt-1 text-xs text-white/55">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-olive-500">Reviews</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl text-olive-950 dark:text-white">
            What our customers say.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="flex flex-col gap-3 rounded-2xl border border-olive-950/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <span key={i} className="size-4 text-yellow-400"><StarIcon /></span>
                  ))}
                </div>
                <p className="text-sm/6 text-olive-700 dark:text-olive-300">{r.text}</p>
                <p className="text-xs font-semibold text-olive-950 dark:text-white">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section id="contact" className="bg-gradient-to-br from-olive-900 to-olive-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl tracking-tight">Ready for a free estimate?</h2>
          <p className="mt-4 text-lg/8 text-white/75">
            Fill out the form below and we'll get back to you within the hour.
          </p>
          <div className="mt-8 rounded-2xl bg-white/10 border border-white/15 p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/40"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/40"
              />
              <textarea
                placeholder="Tell us about your project…"
                rows={3}
                className="w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/40 sm:col-span-2"
              />
            </div>
            <button className="mt-4 w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-olive-950 transition hover:bg-white/90">
              Send My Request
            </button>
            <p className="mt-3 text-xs text-white/40">
              By submitting, you agree to receive a text confirmation. Reply STOP to opt out.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-olive-950/10 px-6 py-8 dark:border-white/10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-olive-500 dark:text-olive-400">© 2024 Green Valley Landscaping. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-xs text-olive-400 dark:text-olive-500">
            <span className="size-3"><SparklesIcon /></span>
            AI site by <a href="https://kickbord.com" className="underline hover:text-olive-700 dark:hover:text-white">Kickbord</a>
          </p>
        </div>
      </footer>

      {/* ── GHL Chat Widget ── */}
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a3329ad81870ee2fd50f81e"
        strategy="afterInteractive"
      />

    </div>
  )
}
