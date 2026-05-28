# Kickbord Design System
> Reference document for building pages and components in the kb-lite codebase.
> Every new page, form, or flow should conform to this system.

---

## 1. Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS v4 — uses `@theme` in `globals.css`, NOT `tailwind.config.ts` |
| Font loading | `next/font/google` in `app/layout.tsx` |
| Class merging | `clsx` from `'clsx/lite'` |
| Component library | kb-lite custom system — **no shadcn, no external UI libs** |

---

## 2. Color Palette

The site uses **Olive** as its primary brand color scale (native to Tailwind v4) plus a **Mist** scale defined in `globals.css` for subtle neutrals.

### Olive scale (primary)
| Token | Usage |
|---|---|
| `olive-950` | Primary text, dark button fills, nav/footer backgrounds |
| `olive-900` | Dark section backgrounds |
| `olive-800` | Hover states on dark buttons |
| `olive-700` | Eyebrow labels, body text on light |
| `olive-600` | Accent text, subtext on light |
| `olive-500` | Muted/placeholder text |
| `olive-400` | Body text in dark mode |
| `olive-300` | Dark mode button fills |
| `olive-200` | Dark mode button hover |
| `olive-100` | Page background (light mode) |
| `olive-50` | Subtle section backgrounds |

### Mist scale (secondary/neutral)
| Token | Usage |
|---|---|
| `mist-100` | Page background (light) — defined in `globals.css` |
| `mist-950` | Page background (dark) — defined in `globals.css` |

### Opacity utilities used throughout
- `olive-950/5` — very subtle section dividers, button hover backgrounds
- `olive-950/10` — soft button fills (SoftButton), borders
- `olive-950/15` — soft button hover
- `olive-950/20` — announcement badge backgrounds
- `white/5`, `white/10`, `white/20` — dark mode equivalents

### Wallpaper gradients (used in Screenshot and hero backgrounds)
Four named wallpaper colors, light/dark variants:
| Name | Light gradient | Dark gradient |
|---|---|---|
| `green` | `#9ca88f` → `#596352` | `#333a2b` → `#26361b` |
| `blue` | `#637c86` → `#778599` | `#243a42` → `#232f40` |
| `purple` | `#7b627d` → `#8f6976` | `#412c42` → `#3c1a26` |
| `brown` | `#8d7359` → `#765959` | `#382d23` → `#3d2323` |

**Use `green` wallpaper as the default Kickbord brand wallpaper.**

---

## 3. Typography

### Font families
| Variable | Font | Usage |
|---|---|---|
| `font-display` | Instrument Serif | Headlines, hero text, brand wordmark, large section titles |
| `font-sans` | Inter | Body copy, buttons, labels, metadata, UI text |

### Type scale (Tailwind classes)
| Role | Classes | Usage |
|---|---|---|
| Page headline (`Heading`) | `font-display text-5xl/12 sm:text-[5rem]/20` | H1 / hero headline only |
| Section headline (`Subheading`) | `font-display text-[2rem]/10 sm:text-5xl/14` | Section titles, H2 |
| Eyebrow | `text-sm/7 font-semibold text-olive-700 dark:text-olive-400` | Labels above headlines |
| Body (`Text` md) | `text-base/7 text-olive-700 dark:text-olive-400` | Paragraphs, descriptions |
| Body (`Text` lg) | `text-lg/8 text-olive-700 dark:text-olive-400` | Hero subheadlines |
| Button | `text-sm/7 font-medium` | All button variants |
| Fine print | `text-sm text-olive-500` | Footer fine print, captions |
| Mono / label | `font-mono text-xs` | Code, tech labels (showcase, install commands) |

---

## 4. Spacing & Layout

### Container
```tsx
// max-w-2xl on mobile, max-w-3xl at md, max-w-7xl at lg
<Container className="mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-7xl lg:px-10">
```

### Section vertical padding
- Standard sections: `py-16` (via `Section` element or applied manually)
- Hero sections: larger internal padding managed by the hero component itself

### Page wrapper
```tsx
<main className="isolate overflow-clip">  {/* Main element */}
```

### Grid patterns used in sections
- 3-column features: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`
- 4-column stats: `grid-cols-2 lg:grid-cols-4`
- 2-column alternating: side-by-side rows that swap image/text

---

## 5. Buttons

All buttons use `rounded-full`, `text-sm/7 font-medium`, `inline-flex items-center gap-1` as base.

| Variant | Import | Background | Text | Use case |
|---|---|---|---|---|
| `Button` / `ButtonLink` | `elements/button` | `olive-950` / dark: `olive-300` | white / dark: `olive-950` | Primary CTA |
| `Button color="light"` | `elements/button` | `white` | `olive-950` | CTA on dark/wallpaper backgrounds |
| `SoftButton` / `SoftButtonLink` | `elements/button` | `olive-950/10` | `olive-950` | Secondary actions |
| `PlainButton` / `PlainButtonLink` | `elements/button` | transparent (hover: `olive-950/10`) | `olive-950` | Tertiary / text-style CTA |
| `PlainButton color="light"` | `elements/button` | transparent (hover: `white/15`) | `white` | Tertiary on dark backgrounds |

### Sizes
- `md` — `px-3 py-1` — default, used in navbars and inline CTAs
- `lg` — `px-4 py-2` — used in hero CTAs and section CTAs

### Button with icon
Always pair icons to the right of text with `gap-1`:
```tsx
<ButtonLink href="/get-started" size="lg">
  Get started <ArrowNarrowRightIcon />
</ButtonLink>
```

---

## 6. Navigation

### Standard navbar pattern
```tsx
<NavbarWithLogoActionsAndCenteredLinks
  logo={<NavbarLogo href="/"><img src="/Logos/icon.svg" .../></NavbarLogo>}
  links={<>
    <NavbarLink href="/about">About</NavbarLink>
    <NavbarLink href="/services">Services</NavbarLink>
    <NavbarLink href="/contact">Contact</NavbarLink>
  </>}
  actions={<>
    <PlainButtonLink href="#" className="max-sm:hidden">Log in</PlainButtonLink>
    <ButtonLink href="/get-started">Get started <ArrowNarrowRightIcon /></ButtonLink>
  </>}
/>
```

### Logo
- Primary: `<img src="/Logos/icon.svg" alt="Kickbord" width={85} height={28} />`
- Fallback: `<h1 className="text-4xl font-display">Kickbord</h1>`
- Use separate light/dark `src` img tags with `.dark:hidden` / `.not-dark:hidden`

### Active nav links
- Current page links should use `text-olive-950 dark:text-white font-semibold`
- Default: `text-olive-700 dark:text-olive-400`

---

## 7. Page Structure Pattern

Every page follows this shell:

```tsx
<>
  {/* Navbar */}
  <NavbarWithLogoActionsAndCenteredLinks ... />

  {/* Main content */}
  <Main>
    {/* 1. Hero section */}
    {/* 2. Primary feature/value section */}
    {/* 3. Supporting content (stats, testimonials, secondary features) */}
    {/* 4. CTA section */}
  </Main>

  {/* Footer */}
  <FooterWithLinkCategories ... />
</>
```

---

## 8. Section Components (quick reference)

### Heroes
| Component | When to use |
|---|---|
| `HeroWithDemoOnBackground` | Homepage — wallpaper background, full-bleed demo image |
| `HeroSimpleLeftAligned` | Inner pages — clean left-aligned headline + CTA, no image |
| `HeroSimpleCentered` | Standalone pages — centered, minimal (e.g., legal, contact) |
| `HeroTwoColumnWithPhoto` | Feature callouts — text left, photo/image right |
| `HeroLeftAlignedWithDemo` / `WithPhoto` | Feature pages with demo below |
| `HeroCenteredWithDemo` / `WithPhoto` | Centered page with media below headline |

### Features
| Component | When to use |
|---|---|
| `FeaturesThreeColumn` | Icon + headline + body grid, no media |
| `FeaturesThreeColumnWithDemos` (`Features`) | Card tiles with demo screenshots |
| `FeaturesTwoColumnWithDemos` | 2 featured cards side by side |
| `FeaturesStackedAlternatingWithDemos` | Step-by-step or alternating feature rows |
| `FeaturesWithLargeDemo` | One large demo + 3-column feature grid below |

### Stats
| Component | When to use |
|---|---|
| `StatsFourColumns` | 4 highlight numbers in a row |
| `StatsThreeColumnWithDescription` | Heading left + 3 stat cards right |
| `StatsWithGraph` | Stats with decorative graph background |

### Pricing
| Component | When to use |
|---|---|
| `PricingMultiTier` | 2–3 plan cards in a grid |
| `PricingHeroMultiTier` | Billing toggle + plan cards |
| `PricingSingleTierTwoColumn` | One plan, two-column layout |
| `PlanComparisonTable` | Feature comparison across plans |

### Social Proof
| Component | When to use |
|---|---|
| `TestimonialLargeQuote` | Single prominent quote, centered |
| `TestimonialTwoColumnWithLargePhoto` | Quote left + photo right |
| `TestimonialsThreeColumnGrid` | Grid of 3 testimonial cards |

### CTAs
| Component | When to use |
|---|---|
| `CallToActionSimple` | Left-aligned eyebrow + headline + CTA |
| `CallToActionSimpleCentered` | Centered headline + CTA |

### Other
| Component | When to use |
|---|---|
| `FAQsAccordion` | Single-column expandable FAQ |
| `FAQsTwoColumnAccordion` | Heading left + accordion right |
| `BrandsCardsMultiColumn` | Logo/brand card grid |
| `TeamThreeColumnGrid` / `TeamFourColumnGrid` | Team member grids |
| `DocumentLeftAligned` / `DocumentCentered` | Prose/legal pages |

---

## 9. Form Design Guidelines

Since kb-lite doesn't include a form component, forms should be built with raw HTML elements styled to match the design system:

### Input fields
```tsx
<input
  type="text"
  className="w-full rounded-lg border border-olive-950/15 bg-white px-4 py-3 text-sm text-olive-950 placeholder:text-olive-400 focus:outline-none focus:ring-2 focus:ring-olive-950/20 dark:border-white/10 dark:bg-olive-900 dark:text-white dark:placeholder:text-olive-500 dark:focus:ring-white/20"
/>
```

### Textarea
```tsx
<textarea
  className="w-full rounded-lg border border-olive-950/15 bg-white px-4 py-3 text-sm text-olive-950 placeholder:text-olive-400 focus:outline-none focus:ring-2 focus:ring-olive-950/20 resize-none dark:border-white/10 dark:bg-olive-900 dark:text-white dark:placeholder:text-olive-500"
/>
```

### Select
```tsx
<select
  className="w-full rounded-lg border border-olive-950/15 bg-white px-4 py-3 text-sm text-olive-950 focus:outline-none focus:ring-2 focus:ring-olive-950/20 dark:border-white/10 dark:bg-olive-900 dark:text-white"
/>
```

### Radio / Checkbox cards (for multi-step flows)
```tsx
<label className="flex cursor-pointer items-start gap-4 rounded-xl border border-olive-950/10 bg-white p-5 hover:border-olive-950/25 has-[:checked]:border-olive-950 has-[:checked]:bg-olive-950/5 dark:border-white/10 dark:bg-olive-900/50 dark:hover:border-white/20 dark:has-[:checked]:border-white dark:has-[:checked]:bg-white/5">
  <input type="radio" className="mt-0.5 accent-olive-950 dark:accent-olive-300" />
  <div>
    <p className="text-sm font-semibold text-olive-950 dark:text-white">Option label</p>
    <p className="text-sm text-olive-600 dark:text-olive-400">Optional description</p>
  </div>
</label>
```

### Form field label
```tsx
<label className="block text-sm font-semibold text-olive-950 dark:text-white mb-2">
  Field name
</label>
```

### Form error state
```tsx
<p className="mt-1.5 text-sm text-red-600 dark:text-red-400">Error message here</p>
```

### Form submit button
Use `Button size="lg"` with `type="submit"` and `className="w-full justify-center"` for full-width form submissions.

---

## 10. Multi-Step Flow Design Guidelines

For wizard/onboarding flows (like `/get-started`):

### Progress indicator
```tsx
{/* Step X of N */}
<div className="flex items-center gap-3">
  <div className="flex gap-1.5">
    {steps.map((_, i) => (
      <div key={i} className={clsx(
        'h-1 rounded-full transition-all duration-300',
        i < currentStep ? 'w-6 bg-olive-950 dark:bg-olive-300' :
        i === currentStep ? 'w-8 bg-olive-950 dark:bg-olive-300' :
        'w-4 bg-olive-950/15 dark:bg-white/15'
      )} />
    ))}
  </div>
  <span className="text-sm text-olive-500">Step {currentStep + 1} of {steps.length}</span>
</div>
```

### Question card layout
- Single centered card: `max-w-2xl mx-auto`
- Generous padding: `p-8 sm:p-12`
- White card on `mist-100` background: `bg-white rounded-2xl shadow-sm dark:bg-olive-900`
- Question text: `font-display text-2xl sm:text-3xl text-olive-950 dark:text-white`
- Supporting text: `text-base text-olive-600 dark:text-olive-400`

### Transition animation
Use CSS `transition-all duration-300` on the step container. Fade + slide:
```tsx
className="transition-all duration-300 ease-in-out"
```

### Navigation pattern
- **Back** button: `PlainButton` on the left
- **Next / Continue** button: `Button size="lg"` on the right
- Final step: `Button size="lg"` labeled "Submit" or "Complete"

---

## 11. Dark Mode

All components support dark mode via Tailwind's `dark:` variant. The site background toggles between `mist-100` (light) and `mist-950` (dark), set in `globals.css`.

Rules:
- Light backgrounds → `bg-white dark:bg-olive-900` for cards/forms
- Text → `text-olive-950 dark:text-white` for headings, `text-olive-700 dark:text-olive-400` for body
- Borders → `border-olive-950/10 dark:border-white/10`
- Icons → inherit text color

---

## 12. Icon Usage

All icons live in `@/components/icons/`. Import by name:
```tsx
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
```

- Icons inherit the current text color
- Default size is `size-4` (16px) — set via className if override needed
- Always pair icons with text; never use icon-only buttons without aria-label

### Most used icons
| Icon | Use case |
|---|---|
| `ArrowNarrowRightIcon` | CTA buttons, link arrows |
| `ChevronIcon` | Dropdowns, FAQ expand |
| `CheckmarkIcon` | Feature lists, success states |
| `SparklesIcon` | AI / premium features |
| `MicrophoneIcon` | Voice agent features |
| `UiLayoutIcon` | Website / design features |
| `TargetIcon` | Strategy / marketing features |
| `ChartLineIcon` | Analytics / growth |
| `LightBulbIcon` | Ideas / consulting |
| `RocketIcon` | Launch / delivery speed |

---

## 13. Images & Media

### Public assets
| Path | Description |
|---|---|
| `/Logos/icon.svg` | Kickbord SVG logo (use in navbar) |
| `/images/hero.png` | Homepage hero background image |
| `/images/ai.png` | AI feature screenshot |
| `/mike.png` | Founder photo (Mike Mathias) |
| `/field.jpeg` | Field/outdoor photo |
| `/hand.jpeg` | Hand photo |

### Image pattern for responsive hero images
Use multiple `<img>` tags with Tailwind breakpoint visibility classes:
```tsx
<img className="sm:hidden dark:hidden" src="/images/hero.png" width={1200} height={736} />
<img className="not-dark:hidden sm:hidden" src="/images/hero.png" width={1200} height={736} />
<img className="max-sm:hidden lg:hidden dark:hidden" src="/images/hero.png" width={1800} height={736} />
{/* etc. */}
```

### Brand logos (external CDN pattern)
```tsx
<img
  src="https://cdn.brandfetch.io/{id}/..."
  className="grayscale brightness-0 dark:brightness-0 dark:invert"
  alt="Brand name"
/>
```

---

## 14. Page File Conventions

### App Router pages
```
app/
  page.tsx              ← homepage (currently imports pages/home-02.tsx)
  layout.tsx            ← root layout, fonts, metadata
  globals.css           ← @theme tokens
  about/page.tsx        ← imports pages/about-02.tsx
  services/page.tsx     ← imports pages/about-02.tsx (same — to update)
  contact/page.tsx      ← contact page
  get-started/
    page.tsx            ← multi-step onboarding flow
    complete/page.tsx   ← completion page with video + booking
```

### Naming conventions
- Pages built inline in `app/` use `export default function PageName()`
- Heavier pages can be extracted to `pages/` and imported
- `'use client'` required for: `useState`, `useEffect`, form handlers, accordion interactivity
- Static pages (no hooks) do NOT need `'use client'`
- `export const metadata: Metadata = { title: '...', description: '...' }` on every page (only works in Server Components — remove if page has `'use client'`)

---

## 15. Existing Navbar Pattern (Copy-Paste Template)

```tsx
<NavbarWithLogoActionsAndCenteredLinks
  id="navbar"
  links={
    <>
      <NavbarLink href="/about">About</NavbarLink>
      <NavbarLink href="/services">Services</NavbarLink>
      <NavbarLink href="/contact">Contact</NavbarLink>
      <NavbarLink href="#" className="sm:hidden">Log in</NavbarLink>
    </>
  }
  logo={
    <NavbarLogo href="/">
      <img src="/Logos/icon.svg" alt="Kickbord" className="dark:hidden" width={85} height={28} />
      <img src="/Logos/icon.svg" className="not-dark:hidden" width={85} height={28} />
    </NavbarLogo>
  }
  actions={
    <>
      <PlainButtonLink href="#" className="max-sm:hidden">Log in</PlainButtonLink>
      <ButtonLink href="/get-started">Get started <ArrowNarrowRightIcon /></ButtonLink>
    </>
  }
/>
```

## 16. Existing Footer Pattern (Copy-Paste Template)

```tsx
<FooterWithLinkCategories
  id="footer"
  links={
    <>
      <FooterCategory title="Services">
        <FooterLink href="/ai-voice-agents">AI Voice Agents</FooterLink>
        <FooterLink href="/websites">Websites</FooterLink>
        <FooterLink href="/consulting">Consulting</FooterLink>
      </FooterCategory>
      <FooterCategory title="Company">
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/results">Results</FooterLink>
        <FooterLink href="/contact">Contact</FooterLink>
      </FooterCategory>
      <FooterCategory title="Legal">
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Terms of Service</FooterLink>
      </FooterCategory>
    </>
  }
  fineprint="© 2026 Kickbord. All rights reserved."
/>
```
