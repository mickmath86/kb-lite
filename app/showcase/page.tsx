'use client'

/**
 * KB-LITE COMPONENT SHOWCASE
 * ─────────────────────────────────────────────────────────────────────────────
 * Every section, element, and icon rendered with test props covering all
 * prop variants. Grouped by type for easy reference.
 *
 * Sections:
 *   1.  Navigation
 *   2.  Footers
 *   3.  Heroes
 *   4.  Features
 *   5.  Stats
 *   6.  Pricing
 *   7.  Testimonials
 *   8.  Team
 *   9.  Brands
 *   10. FAQs
 *   11. Call to Action
 *   12. Documents
 *   13. Elements
 *   14. Icons
 */

import Image from 'next/image'

// ── Elements ─────────────────────────────────────────────────────────────────
import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import {
  Button,
  ButtonLink,
  PlainButton,
  PlainButtonLink,
  SoftButton,
  SoftButtonLink,
} from '@/components/elements/button'
import { EmailSignupForm } from '@/components/elements/email-signup-form'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { InstallCommand } from '@/components/elements/install-command'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Screenshot } from '@/components/elements/screenshot'
import { Wallpaper } from '@/components/elements/wallpaper'

// ── Icons ─────────────────────────────────────────────────────────────────────
import { AlertTriangleIcon } from '@/components/icons/alert-triangle-icon'
import { ArchiveBoxIcon } from '@/components/icons/archive-box-icon'
import { ArchiveBoxXIcon } from '@/components/icons/archive-box-x-icon'
import { ArrowDownArrowUpIcon } from '@/components/icons/arrow-down-arrow-up-icon'
import { ArrowLeftArrowRightIcon } from '@/components/icons/arrow-left-arrow-right-icon'
import { ArrowNarrowDownIcon } from '@/components/icons/arrow-narrow-down-icon'
import { ArrowNarrowLeftIcon } from '@/components/icons/arrow-narrow-left-icon'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ArrowNarrowUpIcon } from '@/components/icons/arrow-narrow-up-icon'
import { AtSymbolIcon } from '@/components/icons/at-symbol-icon'
import { BanknotesIcon } from '@/components/icons/banknotes-icon'
import { BeakerIcon } from '@/components/icons/beaker-icon'
import { BellIcon } from '@/components/icons/bell-icon'
import { BookOpenIcon } from '@/components/icons/book-open-icon'
import { BriefcaseIcon } from '@/components/icons/briefcase-icon'
import { Building2Icon } from '@/components/icons/building-2-icon'
import { BuildingIcon } from '@/components/icons/building-icon'
import { BuildingLibraryIcon } from '@/components/icons/building-library-icon'
import { BuildingStorefrontIcon } from '@/components/icons/building-storefront-icon'
import { CalendarIcon } from '@/components/icons/calendar-icon'
import { CameraIcon } from '@/components/icons/camera-icon'
import { CameraVideoIcon } from '@/components/icons/camera-video-icon'
import { ChartBarIcon } from '@/components/icons/chart-bar-icon'
import { ChartLineIcon } from '@/components/icons/chart-line-icon'
import { ChartPieCircleIcon } from '@/components/icons/chart-pie-circle-icon'
import { ChatBubbleCircleEllipsisIcon } from '@/components/icons/chat-bubble-circle-ellipsis-icon'
import { ChatBubbleCircleIcon } from '@/components/icons/chat-bubble-circle-icon'
import { ChatBubbleCircleStackedIcon } from '@/components/icons/chat-bubble-circle-stacked-icon'
import { ChatBubbleRectangleEllipsisIcon } from '@/components/icons/chat-bubble-rectangle-ellipsis-icon'
import { ChatBubbleRectangleIcon } from '@/components/icons/chat-bubble-rectangle-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { ClipboardIcon } from '@/components/icons/clipboard-icon'
import { ClockIcon } from '@/components/icons/clock-icon'
import { CloudArrowDownIcon } from '@/components/icons/cloud-arrow-down-icon'
import { CloudArrowUpIcon } from '@/components/icons/cloud-arrow-up-icon'
import { CloudIcon } from '@/components/icons/cloud-icon'
import { CodeSquareIcon } from '@/components/icons/code-square-icon'
import { CogIcon } from '@/components/icons/cog-icon'
import { CompassIcon } from '@/components/icons/compass-icon'
import { CpuIcon } from '@/components/icons/cpu-icon'
import { Document2StackedIcon } from '@/components/icons/document-2-stacked-icon'
import { DocumentIcon } from '@/components/icons/document-icon'
import { EducationCapIcon } from '@/components/icons/education-cap-icon'
import { FilterIcon } from '@/components/icons/filter-icon'
import { FingerprintIcon } from '@/components/icons/fingerprint-icon'
import { FlagIcon } from '@/components/icons/flag-icon'
import { FolderArrowLeftIcon } from '@/components/icons/folder-arrow-left-icon'
import { FolderArrowRightIcon } from '@/components/icons/folder-arrow-right-icon'
import { FolderIcon } from '@/components/icons/folder-icon'
import { FolderMinusIcon } from '@/components/icons/folder-minus-icon'
import { FolderPlusIcon } from '@/components/icons/folder-plus-icon'
import { GitBranchIcon } from '@/components/icons/git-branch-icon'
import { GitDiffIcon } from '@/components/icons/git-diff-icon'
import { GitMergeIcon } from '@/components/icons/git-merge-icon'
import { GitPullIcon } from '@/components/icons/git-pull-icon'
import { HardDriveIcon } from '@/components/icons/hard-drive-icon'
import { HeartIcon } from '@/components/icons/heart-icon'
import { HeartPulseIcon } from '@/components/icons/heart-pulse-icon'
import { HomeIcon } from '@/components/icons/home-icon'
import { InboxIcon } from '@/components/icons/inbox-icon'
import { InformationCircleIcon } from '@/components/icons/information-circle-icon'
import { KeyIcon } from '@/components/icons/key-icon'
import { LanguageIcon } from '@/components/icons/language-icon'
import { LifebuoyIcon } from '@/components/icons/lifebuoy-icon'
import { LightBulbIcon } from '@/components/icons/light-bulb-icon'
import { LightingBoltIcon } from '@/components/icons/lighting-bolt-icon'
import { LockIcon } from '@/components/icons/lock-icon'
import { LockOpenIcon } from '@/components/icons/lock-open-icon'
import { MagnifyingGlassIcon } from '@/components/icons/magnifying-glass-icon'
import { MailIcon } from '@/components/icons/mail-icon'
import { MapIcon } from '@/components/icons/map-icon'
import { MapPinIcon } from '@/components/icons/map-pin-icon'
import { MicrophoneIcon } from '@/components/icons/microphone-icon'
import { MinusCircleIcon } from '@/components/icons/minus-circle-icon'
import { MinusIcon } from '@/components/icons/minus-icon'
import { MoonIcon } from '@/components/icons/moon-icon'
import { NewspaperIcon } from '@/components/icons/newspaper-icon'
import { PaperclipIcon } from '@/components/icons/paperclip-icon'
import { PencilOnSquareIcon } from '@/components/icons/pencil-on-square-icon'
import { PhotoIcon } from '@/components/icons/photo-icon'
import { PlusCircleIcon } from '@/components/icons/plus-circle-icon'
import { PlusIcon } from '@/components/icons/plus-icon'
import { QuestionCircleIcon } from '@/components/icons/question-circle-icon'
import { RepeatIcon } from '@/components/icons/repeat-icon'
import { RocketIcon } from '@/components/icons/rocket-icon'
import { ShieldExclamationIcon } from '@/components/icons/shield-exclamation-icon'
import { ShoppingBagIcon } from '@/components/icons/shopping-bag-icon'
import { ShoppingCartIcon } from '@/components/icons/shopping-cart-icon'
import { SlidersIcon } from '@/components/icons/sliders-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { Square3Stack3dIcon } from '@/components/icons/square-3-stack-3d-icon'
import { Squares2StackedIcon } from '@/components/icons/squares-2-stacked-icon'
import { StarIcon } from '@/components/icons/star-icon'
import { SunIcon } from '@/components/icons/sun-icon'
import { TagIcon } from '@/components/icons/tag-icon'
import { TargetIcon } from '@/components/icons/target-icon'
import { TerminalIcon } from '@/components/icons/terminal-icon'
import { TicketIcon } from '@/components/icons/ticket-icon'
import { TrashIcon } from '@/components/icons/trash-icon'
import { UiLayoutIcon } from '@/components/icons/ui-layout-icon'
import { UnorderedListIcon } from '@/components/icons/unordered-list-icon'
import { User2Icon } from '@/components/icons/user-2-icon'
import { UserArrowLeftIcon } from '@/components/icons/user-arrow-left-icon'
import { UserArrowRightIcon } from '@/components/icons/user-arrow-right-icon'
import { UserCircleDottedIcon } from '@/components/icons/user-circle-dotted-icon'
import { UserCircleIcon } from '@/components/icons/user-circle-icon'
import { FacebookIcon } from '@/components/icons/social/facebook-icon'
import { GitHubIcon } from '@/components/icons/social/github-icon'
import { InstagramIcon } from '@/components/icons/social/instagram-icon'
import { XIcon } from '@/components/icons/social/x-icon'
import { YouTubeIcon } from '@/components/icons/social/youtube-icon'

// ── Sections ──────────────────────────────────────────────────────────────────
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/components/sections/navbar-with-links-actions-and-centered-logo'
import {
  NavbarLink as NavbarLink2,
  NavbarLogo as NavbarLogo2,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'
import {
  NavbarLink as NavbarLink3,
  NavbarLogo as NavbarLogo3,
  NavbarWithLogoActionsAndLeftAlignedLinks,
} from '@/components/sections/navbar-with-logo-actions-and-left-aligned-links'

import {
  FooterCategory,
  FooterLink,
  FooterWithLinkCategories,
} from '@/components/sections/footer-with-link-categories'
import {
  FooterLink as FooterLink2,
  SocialLink as SocialLink2,
  FooterWithLinksAndSocialIcons,
} from '@/components/sections/footer-with-links-and-social-icons'
import {
  FooterCategory as FooterCategory3,
  FooterLink as FooterLink3,
  NewsletterForm,
  SocialLink as SocialLink3,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'

import { HeroCenteredWithDemo } from '@/components/sections/hero-centered-with-demo'
import { HeroCenteredWithPhoto } from '@/components/sections/hero-centered-with-photo'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'
import { HeroLeftAlignedWithPhoto } from '@/components/sections/hero-left-aligned-with-photo'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'
import { HeroSimpleLeftAligned } from '@/components/sections/hero-simple-left-aligned'
import { HeroTwoColumnWithPhoto } from '@/components/sections/hero-two-column-with-photo'
import { HeroWithDemoOnBackground } from '@/components/sections/hero-with-demo-on-background'

import {
  Feature as Feature3Col,
  FeaturesThreeColumn,
} from '@/components/sections/features-three-column'
import {
  FeatureThreeColumnWithDemos,
  Features as FeaturesThreeColWithDemos,
} from '@/components/sections/features-three-column-with-demos'
import {
  Feature as Feature2ColDemo,
  FeaturesTwoColumnWithDemos,
} from '@/components/sections/features-two-column-with-demos'
import {
  Feature as FeatureStacked,
  FeaturesStackedAlternatingWithDemos,
} from '@/components/sections/features-stacked-alternating-with-demos'
import {
  Feature as FeatureLargeDemo,
  FeaturesWithLargeDemo,
} from '@/components/sections/features-with-large-demo'

import { Stat as Stat4, StatsFourColumns } from '@/components/sections/stats-four-columns'
import { Stat as Stat3, StatsThreeColumnWithDescription } from '@/components/sections/stats-three-column-with-description'
import { Stat as StatGraph, StatsWithGraph } from '@/components/sections/stats-with-graph'

import { Plan as PlanHero, PricingHeroMultiTier } from '@/components/sections/pricing-hero-multi-tier'
import { Plan as PlanMulti, PricingMultiTier } from '@/components/sections/pricing-multi-tier'
import { PricingSingleTierTwoColumn } from '@/components/sections/pricing-single-tier-two-column'
import { PlanComparisonTable } from '@/components/sections/plan-comparison-table'

import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'

import { TeamMember as TeamMember4, TeamFourColumnGrid } from '@/components/sections/team-four-column-grid'
import { TeamMember as TeamMember3, TeamThreeColumnGrid } from '@/components/sections/team-three-column-grid'

import { BrandCard, BrandsCardsMultiColumn } from '@/components/sections/brands-cards-multi-column'

import { Faq as FaqSingle, FAQsAccordion } from '@/components/sections/faqs-accordion'
import { Faq as FaqTwo, FAQsTwoColumnAccordion } from '@/components/sections/faqs-two-column-accordion'

import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'

import { DocumentCentered } from '@/components/sections/document-centered'
import { DocumentLeftAligned } from '@/components/sections/document-left-aligned'

// ─────────────────────────────────────────────────────────────────────────────
// Shared demo helpers
// ─────────────────────────────────────────────────────────────────────────────

function DemoPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-olive-950/5 dark:bg-white/5">
      <p className="text-sm text-olive-500 dark:text-olive-400">{label}</p>
    </div>
  )
}

function AvatarPlaceholder({ size = 'full' }: { size?: string }) {
  return (
    <div className={`flex ${size === 'full' ? 'h-full w-full' : 'size-12'} items-center justify-center bg-olive-200 dark:bg-olive-800`}>
      <UserCircleIcon />
    </div>
  )
}

function PhotoPlaceholder() {
  return (
    <div className="flex h-full min-h-64 w-full items-center justify-center bg-olive-200 dark:bg-olive-800">
      <PhotoIcon />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Showcase label wrapper
// ─────────────────────────────────────────────────────────────────────────────

function ShowcaseGroup({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t-4 border-olive-950/10 dark:border-white/10">
      <div className="sticky top-0 z-20 bg-olive-100/95 backdrop-blur-sm px-6 py-4 lg:px-10 dark:bg-olive-950/95">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-olive-500 dark:text-olive-400">
          {title}
        </p>
      </div>
      <div>{children}</div>
    </section>
  )
}

function ShowcaseItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-olive-950/5 dark:border-white/5">
      <div className="bg-olive-950/2 px-6 py-2 lg:px-10 dark:bg-white/2">
        <p className="font-mono text-xs text-olive-400 dark:text-olive-500">{label}</p>
      </div>
      <div>{children}</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Showcase TOC
// ─────────────────────────────────────────────────────────────────────────────

const groups = [
  { id: 'navigation', label: '1. Navigation' },
  { id: 'footers', label: '2. Footers' },
  { id: 'heroes', label: '3. Heroes' },
  { id: 'features', label: '4. Features' },
  { id: 'stats', label: '5. Stats' },
  { id: 'pricing', label: '6. Pricing' },
  { id: 'testimonials', label: '7. Testimonials' },
  { id: 'team', label: '8. Team' },
  { id: 'brands', label: '9. Brands' },
  { id: 'faqs', label: '10. FAQs' },
  { id: 'cta', label: '11. Call to Action' },
  { id: 'documents', label: '12. Documents' },
  { id: 'elements', label: '13. Elements' },
  { id: 'icons', label: '14. Icons' },
]

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-olive-100 text-olive-950 dark:bg-olive-950 dark:text-white">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="border-b border-olive-950/10 px-6 py-12 lg:px-10 dark:border-white/10">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-olive-500">kb-lite</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-olive-950 dark:text-white">
          Component Showcase
        </h1>
        <p className="mt-3 text-base text-olive-600 dark:text-olive-400">
          Every section, element, and icon in the kb-lite library — rendered with test props covering all variants.
        </p>

        {/* TOC */}
        <nav className="mt-8 flex flex-wrap gap-2">
          {groups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="inline-flex rounded-full bg-olive-950/5 px-3 py-1 font-mono text-xs text-olive-700 hover:bg-olive-950/10 dark:bg-white/5 dark:text-olive-300 dark:hover:bg-white/10"
            >
              {g.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          1. NAVIGATION
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="navigation" title="1. Navigation">

        <ShowcaseItem label="NavbarWithLogoActionsAndLeftAlignedLinks — logo left, links left (used in Kickbord site)">
          <NavbarWithLogoActionsAndLeftAlignedLinks
            className="static"
            logo={
              <NavbarLogo3 href="#">
                <span className="font-display text-xl text-olive-950 dark:text-white">Kickbord</span>
              </NavbarLogo3>
            }
            links={
              <>
                <NavbarLink3 href="#">Services</NavbarLink3>
                <NavbarLink3 href="#">AI Voice Agents</NavbarLink3>
                <NavbarLink3 href="#">Websites</NavbarLink3>
                <NavbarLink3 href="#">About</NavbarLink3>
                <NavbarLink3 href="#">Results</NavbarLink3>
              </>
            }
            actions={
              <Button size="md">Book a Call</Button>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="NavbarWithLogoActionsAndCenteredLinks — logo left, links center">
          <NavbarWithLogoActionsAndCenteredLinks
            className="static"
            logo={
              <NavbarLogo2 href="#">
                <span className="font-display text-xl text-olive-950 dark:text-white">Kickbord</span>
              </NavbarLogo2>
            }
            links={
              <>
                <NavbarLink2 href="#">Product</NavbarLink2>
                <NavbarLink2 href="#">Pricing</NavbarLink2>
                <NavbarLink2 href="#">Blog</NavbarLink2>
              </>
            }
            actions={
              <>
                <a href="#" className="text-sm/7 text-olive-950 dark:text-white">Sign in</a>
                <Button size="md">Get started</Button>
              </>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="NavbarWithLinksActionsAndCenteredLogo — links left, logo center">
          <NavbarWithLinksActionsAndCenteredLogo
            className="static"
            logo={
              <NavbarLogo href="#">
                <span className="font-display text-xl text-olive-950 dark:text-white">Kickbord</span>
              </NavbarLogo>
            }
            links={
              <>
                <NavbarLink href="#">Features</NavbarLink>
                <NavbarLink href="#">Integrations</NavbarLink>
                <NavbarLink href="#">Enterprise</NavbarLink>
              </>
            }
            actions={
              <>
                <a href="#" className="text-sm/7 text-olive-950 dark:text-white">Log in</a>
                <Button size="md">Start free</Button>
              </>
            }
          />
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          2. FOOTERS
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="footers" title="2. Footers">

        <ShowcaseItem label="FooterWithNewsletterFormCategoriesAndSocialIcons — newsletter + categories + social (used in Kickbord site)">
          <FooterWithNewsletterFormCategoriesAndSocialIcons
            cta={
              <NewsletterForm
                headline={<p className="font-semibold text-olive-950 dark:text-white">Stay in the loop</p>}
                subheadline={<p>Product updates, tips, and resources for small business owners.</p>}
              />
            }
            links={
              <>
                <FooterCategory3 title="Services">
                  <FooterLink3 href="#">AI Voice Agents</FooterLink3>
                  <FooterLink3 href="#">Websites & Redesigns</FooterLink3>
                  <FooterLink3 href="#">Consulting</FooterLink3>
                </FooterCategory3>
                <FooterCategory3 title="Company">
                  <FooterLink3 href="#">About</FooterLink3>
                  <FooterLink3 href="#">Results</FooterLink3>
                  <FooterLink3 href="#">Contact</FooterLink3>
                </FooterCategory3>
              </>
            }
            fineprint={<p>© 2026 Kickbord. All rights reserved.</p>}
            socialLinks={
              <>
                <SocialLink3 href="#" name="X"><XIcon /></SocialLink3>
                <SocialLink3 href="#" name="Instagram"><InstagramIcon /></SocialLink3>
                <SocialLink3 href="#" name="Facebook"><FacebookIcon /></SocialLink3>
              </>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="FooterWithLinksAndSocialIcons — horizontal links + social icons">
          <FooterWithLinksAndSocialIcons
            links={
              <>
                <FooterLink2 href="#">About</FooterLink2>
                <FooterLink2 href="#">Services</FooterLink2>
                <FooterLink2 href="#">Privacy</FooterLink2>
                <FooterLink2 href="#">Terms</FooterLink2>
              </>
            }
            socialLinks={
              <>
                <SocialLink2 href="#" name="X"><XIcon /></SocialLink2>
                <SocialLink2 href="#" name="Instagram"><InstagramIcon /></SocialLink2>
                <SocialLink2 href="#" name="GitHub"><GitHubIcon /></SocialLink2>
                <SocialLink2 href="#" name="YouTube"><YouTubeIcon /></SocialLink2>
              </>
            }
            fineprint={<p>© 2026 Kickbord LLC. All rights reserved.</p>}
          />
        </ShowcaseItem>

        <ShowcaseItem label="FooterWithLinkCategories — categorized link grid only">
          <FooterWithLinkCategories
            links={
              <>
                <FooterCategory title="Product">
                  <FooterLink href="#">Features</FooterLink>
                  <FooterLink href="#">Pricing</FooterLink>
                  <FooterLink href="#">Changelog</FooterLink>
                </FooterCategory>
                <FooterCategory title="Company">
                  <FooterLink href="#">About</FooterLink>
                  <FooterLink href="#">Blog</FooterLink>
                  <FooterLink href="#">Careers</FooterLink>
                </FooterCategory>
                <FooterCategory title="Resources">
                  <FooterLink href="#">Docs</FooterLink>
                  <FooterLink href="#">Support</FooterLink>
                </FooterCategory>
              </>
            }
            fineprint={<p>© 2026 Kickbord. Built for small business.</p>}
          />
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          3. HEROES
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="heroes" title="3. Heroes">

        <ShowcaseItem label="HeroWithDemoOnBackground — wallpaper background + demo slot (premium, used on Kickbord home)">
          <HeroWithDemoOnBackground
            eyebrow={<AnnouncementBadge href="#" text="New: AI Voice Agents now available" variant="overlay" />}
            headline="Bring Fortune 500 marketing to your business."
            subheadline={<p>Kickbord helps small businesses modernize their websites, automate their marketing, and compete with confidence.</p>}
            cta={
              <div className="flex flex-wrap gap-4">
                <Button color="light" size="lg">Book a free call</Button>
                <PlainButton color="light" size="lg">See how it works <ArrowNarrowRightIcon /></PlainButton>
              </div>
            }
            demo={<DemoPlaceholder label="hero demo image / screenshot" />}
            footer={
              <LogoGrid className="opacity-60">
                <Logo><span className="text-xs font-semibold text-olive-700">Google</span></Logo>
                <Logo><span className="text-xs font-semibold text-olive-700">Nike</span></Logo>
                <Logo><span className="text-xs font-semibold text-olive-700">Samsung</span></Logo>
                <Logo><span className="text-xs font-semibold text-olive-700">Verizon</span></Logo>
              </LogoGrid>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="HeroSimpleLeftAligned — left-aligned, no demo (used on inner pages)">
          <HeroSimpleLeftAligned
            eyebrow={<Eyebrow>AI Voice Agents</Eyebrow>}
            headline="Answer every call, qualify every lead — automatically."
            subheadline={<p>Kickbord deploys AI voice agents that handle inbound calls, book appointments, and follow up with leads 24/7 without any human intervention.</p>}
            cta={
              <div className="flex flex-wrap gap-4">
                <ButtonLink href="#" size="lg">Get started</ButtonLink>
                <PlainButtonLink href="#" size="lg">Learn more <ArrowNarrowRightIcon /></PlainButtonLink>
              </div>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="HeroSimpleCentered — centered, no demo">
          <HeroSimpleCentered
            eyebrow={<Eyebrow>About us</Eyebrow>}
            headline="We help small businesses punch above their weight."
            subheadline={<p>Kickbord was built to make Fortune 500-level marketing accessible to the businesses that need it most.</p>}
            cta={
              <div className="flex flex-wrap justify-center gap-4">
                <ButtonLink href="#" size="lg">Meet the team</ButtonLink>
                <PlainButtonLink href="#" size="lg">Our story <ArrowNarrowRightIcon /></PlainButtonLink>
              </div>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="HeroCenteredWithDemo — centered + demo below">
          <HeroCenteredWithDemo
            eyebrow={<Eyebrow>Platform tour</Eyebrow>}
            headline="Everything your marketing needs, in one place."
            subheadline={<p>From AI voice agents to campaign strategy, Kickbord brings the full stack of modern marketing to your business.</p>}
            cta={
              <div className="flex flex-wrap justify-center gap-4">
                <ButtonLink href="#" size="lg">Start free trial</ButtonLink>
              </div>
            }
            demo={
              <Screenshot wallpaper="green" placement="bottom" className="w-full">
                <DemoPlaceholder label="product screenshot" />
              </Screenshot>
            }
            footer={<p className="text-center text-sm text-olive-500">Trusted by 50+ small businesses</p>}
          />
        </ShowcaseItem>

        <ShowcaseItem label="HeroLeftAlignedWithDemo — left-aligned + demo below">
          <HeroLeftAlignedWithDemo
            eyebrow={<Eyebrow>New dashboard</Eyebrow>}
            headline="See your entire marketing operation at a glance."
            subheadline={<p>Real-time call logs, lead pipelines, campaign performance, and website analytics — all in a single dashboard.</p>}
            cta={<ButtonLink href="#" size="lg">View demo</ButtonLink>}
            demo={
              <Screenshot wallpaper="blue" placement="bottom">
                <DemoPlaceholder label="dashboard screenshot" />
              </Screenshot>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="HeroCenteredWithPhoto — centered + full-width photo">
          <HeroCenteredWithPhoto
            eyebrow={<Eyebrow>Customer story</Eyebrow>}
            headline="How a local HVAC company tripled their leads with AI."
            subheadline={<p>Learn how Pacific Coast Heating deployed Kickbord's voice agent and saw a 3× increase in qualified leads within 90 days.</p>}
            cta={<ButtonLink href="#" size="lg">Read the story</ButtonLink>}
            photo={<PhotoPlaceholder />}
          />
        </ShowcaseItem>

        <ShowcaseItem label="HeroLeftAlignedWithPhoto — left-aligned + full-width photo">
          <HeroLeftAlignedWithPhoto
            eyebrow={<Eyebrow>Results</Eyebrow>}
            headline="Real results from real small businesses."
            subheadline={<p>Every Kickbord client gets a dedicated strategy session, a custom implementation plan, and ongoing support to make sure things actually work.</p>}
            cta={<ButtonLink href="#" size="lg">See the work</ButtonLink>}
            photo={<PhotoPlaceholder />}
          />
        </ShowcaseItem>

        <ShowcaseItem label="HeroTwoColumnWithPhoto — two-column layout, text left / photo right">
          <HeroTwoColumnWithPhoto
            eyebrow={<Eyebrow>Meet your AI agent</Eyebrow>}
            headline="Your best salesperson. Available 24/7."
            subheadline={<p>Kickbord's AI voice agents handle inbound inquiries, qualify leads, and book appointments while you focus on running the business.</p>}
            cta={
              <div className="flex flex-wrap gap-4">
                <ButtonLink href="#" size="lg">Deploy in 2 weeks</ButtonLink>
                <PlainButtonLink href="#" size="lg">How it works <ArrowNarrowRightIcon /></PlainButtonLink>
              </div>
            }
            photo={<PhotoPlaceholder />}
          />
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          4. FEATURES
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="features" title="4. Features">

        <ShowcaseItem label="FeaturesThreeColumn — icon + headline + subheadline grid (most common)">
          <FeaturesThreeColumn
            eyebrow="What's included"
            headline="Everything a modern SMB marketing stack needs."
            subheadline="Kickbord bundles the tools, strategy, and execution that used to require a team of specialists."
            features={
              <>
                <Feature3Col icon={<MicrophoneIcon />} headline="AI voice agents" subheadline={<p>24/7 call handling, lead qualification, and appointment booking — no human required.</p>} />
                <Feature3Col icon={<UiLayoutIcon />} headline="Website redesigns" subheadline={<p>Modern, fast, conversion-focused websites delivered in 2–4 weeks.</p>} />
                <Feature3Col icon={<CompassIcon />} headline="Marketing strategy" subheadline={<p>Clear positioning, campaign planning, and systems that actually run.</p>} />
                <Feature3Col icon={<ChartLineIcon />} headline="Performance analytics" subheadline={<p>Track what's working across channels with unified reporting.</p>} />
                <Feature3Col icon={<SparklesIcon />} headline="AI automation" subheadline={<p>Workflows that reduce manual work and respond to customers instantly.</p>} />
                <Feature3Col icon={<TargetIcon />} headline="Lead generation" subheadline={<p>Paid, organic, and referral strategies tailored to your market.</p>} />
              </>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="FeaturesThreeColumnWithDemos (Features) — card tiles with demo slot">
          <FeaturesThreeColWithDemos
            eyebrow="Platform capabilities"
            headline="Built for the way small businesses actually work."
            subheadline="Each feature was designed around the real constraints and goals of 1–50 person teams."
            features={
              <>
                <FeatureThreeColumnWithDemos
                  demo={<DemoPlaceholder label="voice agent interface" />}
                  headline="AI Voice Agents"
                  subheadline={<p>Deploy a conversational AI agent on your phone line. Handles calls, qualifies leads, and books appointments automatically.</p>}
                />
                <FeatureThreeColumnWithDemos
                  demo={<DemoPlaceholder label="website builder interface" />}
                  headline="Website Redesigns"
                  subheadline={<p>From wireframe to live site in under a month. Modern design, fast load, mobile-first.</p>}
                />
                <FeatureThreeColumnWithDemos
                  demo={<DemoPlaceholder label="marketing dashboard" />}
                  headline="Marketing Dashboard"
                  subheadline={<p>All your campaigns, channels, and metrics in one place — with clear recommendations on what to do next.</p>}
                />
              </>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="FeaturesTwoColumnWithDemos — 2-col cards with demo + CTA">
          <FeaturesTwoColumnWithDemos
            eyebrow="Featured capabilities"
            headline="Two flagship products. One seamless experience."
            features={
              <>
                <Feature2ColDemo
                  demo={<DemoPlaceholder label="voice agent demo" />}
                  headline="AI Voice Agents"
                  subheadline={<p>Handle every call with an AI agent trained on your business. Available 24/7, no hold times, no missed leads.</p>}
                  cta={<ButtonLink href="#" size="md">Learn more</ButtonLink>}
                />
                <Feature2ColDemo
                  demo={<DemoPlaceholder label="website demo" />}
                  headline="Website Redesigns"
                  subheadline={<p>We build fast, modern websites that convert visitors and reflect the quality of your business.</p>}
                  cta={<ButtonLink href="#" size="md">See examples</ButtonLink>}
                />
              </>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="FeaturesStackedAlternatingWithDemos — alternating layout rows">
          <FeaturesStackedAlternatingWithDemos
            eyebrow="How it works"
            headline="From kickoff to live in three steps."
            features={
              <>
                <FeatureStacked
                  headline="Step 1 — Discovery & Strategy"
                  subheadline={<p>We start by understanding your business, your customers, and your goals. This shapes every decision that follows.</p>}
                  cta={<PlainButtonLink href="#" size="md">Start here <ArrowNarrowRightIcon /></PlainButtonLink>}
                  demo={<DemoPlaceholder label="discovery session visual" />}
                />
                <FeatureStacked
                  headline="Step 2 — Build & Configure"
                  subheadline={<p>We build your website, configure your AI agent, or execute your campaign strategy — fast, with full transparency.</p>}
                  cta={<PlainButtonLink href="#" size="md">See the process <ArrowNarrowRightIcon /></PlainButtonLink>}
                  demo={<DemoPlaceholder label="build process visual" />}
                />
                <FeatureStacked
                  headline="Step 3 — Launch & Optimize"
                  subheadline={<p>Your deliverable goes live with performance checks and a clear handoff. We stay available for questions and iteration.</p>}
                  cta={<PlainButtonLink href="#" size="md">Get started <ArrowNarrowRightIcon /></PlainButtonLink>}
                  demo={<DemoPlaceholder label="launch visual" />}
                />
              </>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="FeaturesWithLargeDemo — single large demo + feature grid below">
          <FeaturesWithLargeDemo
            eyebrow="Platform overview"
            headline="One platform. Every marketing channel you need."
            subheadline="Kickbord brings your website, AI agents, and campaign analytics under one roof."
            demo={
              <Screenshot wallpaper="purple" placement="bottom-left" className="w-full">
                <DemoPlaceholder label="full platform screenshot" />
              </Screenshot>
            }
            features={
              <>
                <FeatureLargeDemo icon={<LightBulbIcon />} headline="Strategy-first approach" subheadline={<p>We start with your business goals, not the tools.</p>} />
                <FeatureLargeDemo icon={<RocketIcon />} headline="Fast delivery" subheadline={<p>2–4 week timelines for websites and agent deployments.</p>} />
                <FeatureLargeDemo icon={<ChartBarIcon />} headline="Measurable results" subheadline={<p>Every engagement is tied to a clear, trackable business outcome.</p>} />
              </>
            }
          />
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          5. STATS
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="stats" title="5. Stats">

        <ShowcaseItem label="StatsFourColumns — 4-col stat cards (used on Results page)">
          <StatsFourColumns
            eyebrow="By the numbers"
            headline="The results that matter most."
            subheadline="Across every Kickbord engagement, these are the metrics clients care about."
          >
            <Stat4 stat="24/7" text="AI voice agent availability — never misses a lead." />
            <Stat4 stat="2–4 wks" text="Average website delivery from kickoff to launch." />
            <Stat4 stat="3×" text="Average conversion improvement after redesign." />
            <Stat4 stat="10+" text="Fortune 500 brands in the founder's background." />
          </StatsFourColumns>
        </ShowcaseItem>

        <ShowcaseItem label="StatsThreeColumnWithDescription — heading + description left, 3 stats right">
          <StatsThreeColumnWithDescription
            heading="Built for businesses ready to grow."
            description={<p>Kickbord works with founder-led businesses who know their product is great but know their marketing doesn't reflect it yet.</p>}
          >
            <Stat3 stat="50+" text="Small businesses served across Ventura County and beyond." />
            <Stat3 stat="90 days" text="Average time to see measurable marketing improvement." />
            <Stat3 stat="100%" text="Founder-led — Mike is on every engagement." />
          </StatsThreeColumnWithDescription>
        </ShowcaseItem>

        <ShowcaseItem label="StatsWithGraph — stats with decorative graph visual">
          <StatsWithGraph
            eyebrow="Growth metrics"
            headline="Marketing performance over time."
            subheadline="Kickbord clients see consistent improvement across key metrics in the first 90 days."
          >
            <StatGraph stat="↑ 3.2×" text="Lead volume increase after AI voice agent deployment." />
            <StatGraph stat="↓ 42%" text="Cost-per-lead reduction through better targeting." />
            <StatGraph stat="↑ 58%" text="Website conversion rate improvement after redesign." />
            <StatGraph stat="↑ 91%" text="Customer satisfaction score across all engagements." />
          </StatsWithGraph>
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          6. PRICING
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="pricing" title="6. Pricing">

        <ShowcaseItem label="PricingMultiTier — multi-plan card grid (used on Services page)">
          <PricingMultiTier
            eyebrow="Pricing"
            headline="Simple, transparent pricing."
            subheadline="No surprise fees. Pick the engagement model that fits your business."
            plans={
              <>
                <PlanMulti
                  name="Strategic Build"
                  price="$3,500"
                  subheadline={<p>A one-time project engagement. Ideal for websites, AI agent setups, or focused strategy work.</p>}
                  features={['Custom website or AI agent', 'Strategy session included', '30-day post-launch support', 'Full handoff documentation']}
                  cta={<ButtonLink href="#" size="lg" className="w-full justify-center">Get started</ButtonLink>}
                />
                <PlanMulti
                  name="90-Day Sprint"
                  price="$1,500"
                  period="/ month"
                  badge="Most popular"
                  subheadline={<p>A structured 3-month engagement covering strategy, execution, and ongoing optimization.</p>}
                  features={['Everything in Strategic Build', 'Monthly strategy sessions', 'Campaign management', 'Performance reporting', 'Priority support']}
                  cta={<ButtonLink href="#" size="lg" className="w-full justify-center">Start your sprint</ButtonLink>}
                />
                <PlanMulti
                  name="Fractional CMO"
                  price="$3,000"
                  period="/ month"
                  subheadline={<p>Ongoing senior marketing leadership embedded in your business. Full strategic and executional ownership.</p>}
                  features={['Full CMO responsibilities', 'Weekly check-ins', 'Team management', 'Vendor coordination', 'Board-level reporting']}
                  cta={<ButtonLink href="#" size="lg" className="w-full justify-center">Talk to us</ButtonLink>}
                />
              </>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="PricingHeroMultiTier — hero-style pricing with billing toggle">
          <PricingHeroMultiTier
            eyebrow="Flexible pricing"
            headline="Pay for what you need."
            subheadline={<p>All plans include a strategy session, implementation support, and direct access to Mike.</p>}
            options={['Monthly', 'Annual'] as const}
            plans={{
              Monthly: (
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                  <PlanHero
                    name="Starter"
                    price="$1,500"
                    period="/ month"
                    subheadline={<p>Perfect for businesses getting started with digital marketing modernization.</p>}
                    features={['1 active project', 'Monthly strategy call', 'Email support']}
                    cta={<ButtonLink href="#" size="lg" className="w-full justify-center">Get started</ButtonLink>}
                  />
                  <PlanHero
                    name="Growth"
                    price="$3,000"
                    period="/ month"
                    badge="Best value"
                    subheadline={<p>For businesses ready to go all-in on marketing modernization.</p>}
                    features={['Unlimited projects', 'Weekly strategy calls', 'Slack access', 'Priority delivery']}
                    cta={<ButtonLink href="#" size="lg" className="w-full justify-center">Start growing</ButtonLink>}
                  />
                </div>
              ),
              Annual: (
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                  <PlanHero
                    name="Starter"
                    price="$1,200"
                    period="/ month"
                    subheadline={<p>Save 20% with annual billing. Perfect for businesses getting started.</p>}
                    features={['1 active project', 'Monthly strategy call', 'Email support']}
                    cta={<ButtonLink href="#" size="lg" className="w-full justify-center">Get started</ButtonLink>}
                  />
                  <PlanHero
                    name="Growth"
                    price="$2,400"
                    period="/ month"
                    badge="Best value"
                    subheadline={<p>Save 20% annually. For businesses going all-in on marketing modernization.</p>}
                    features={['Unlimited projects', 'Weekly strategy calls', 'Slack access', 'Priority delivery']}
                    cta={<ButtonLink href="#" size="lg" className="w-full justify-center">Start growing</ButtonLink>}
                  />
                </div>
              ),
            }}
          />
        </ShowcaseItem>

        <ShowcaseItem label="PricingSingleTierTwoColumn — single plan, two-column layout">
          <PricingSingleTierTwoColumn
            headline="One plan. Everything included."
            subheadline={<p>Kickbord's all-in engagement gives you dedicated marketing leadership, full execution support, and measurable results — without the overhead of a full agency.</p>}
            price="$3k"
            period="per month"
            features={[
              'AI voice agent deployment',
              'Website design & development',
              'Campaign planning & execution',
              'Monthly strategy sessions',
              'Performance reporting',
              'Slack & email support',
            ]}
            cta={<ButtonLink href="#" size="lg">Book a discovery call</ButtonLink>}
          />
        </ShowcaseItem>

        <ShowcaseItem label="PlanComparisonTable — feature comparison across plans">
          <PlanComparisonTable
            plans={['Starter', 'Growth', 'CMO']}
            features={[
              {
                title: 'Core features',
                features: [
                  { name: 'Strategy sessions', value: { Starter: 'Monthly', Growth: 'Weekly', CMO: 'Ongoing' } },
                  { name: 'AI voice agent', value: { Starter: false, Growth: true, CMO: true } },
                  { name: 'Website redesign', value: { Starter: '1/year', Growth: 'Unlimited', CMO: 'Unlimited' } },
                  { name: 'Campaign management', value: { Starter: false, Growth: true, CMO: true } },
                ],
              },
              {
                title: 'Support',
                features: [
                  { name: 'Email support', value: true },
                  { name: 'Slack access', value: { Starter: false, Growth: true, CMO: true } },
                  { name: 'Priority delivery', value: { Starter: false, Growth: true, CMO: true } },
                ],
              },
            ]}
          />
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          7. TESTIMONIALS
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="testimonials" title="7. Testimonials">

        <ShowcaseItem label="TestimonialThreeColumnGrid — 3-col card grid">
          <TestimonialThreeColumnGrid
            eyebrow="What clients say"
            headline="Small businesses. Real results."
            subheadline="Here's what Kickbord clients say about working with us."
          >
            <Testimonial
              quote={<p>Kickbord deployed our AI voice agent in two weeks. We went from missing 40% of calls to capturing every single lead. It paid for itself in the first month.</p>}
              img={<AvatarPlaceholder />}
              name="Sarah Gutierrez"
              byline="Owner, Pacific Plumbing Co."
            />
            <Testimonial
              quote={<p>Our old website was embarrassing. Mike rebuilt it in three weeks and it looks better than companies 10× our size. Our close rate jumped almost immediately.</p>}
              img={<AvatarPlaceholder />}
              name="Tom Chen"
              byline="Founder, Ventura Dental Group"
            />
            <Testimonial
              quote={<p>I'd been putting off a real marketing strategy for years. After 90 days with Kickbord, we had a system that runs without me having to think about it every day.</p>}
              img={<AvatarPlaceholder />}
              name="Maria Delgado"
              byline="Principal, Coastal Real Estate Partners"
            />
          </TestimonialThreeColumnGrid>
        </ShowcaseItem>

        <ShowcaseItem label="TestimonialLargeQuote — single large centered quote">
          <TestimonialLargeQuote
            quote={<p>Working with Kickbord is like having a CMO who actually understands small business. Not a consultant giving advice from 30,000 feet — a partner who gets in and builds things.</p>}
            img={<AvatarPlaceholder />}
            name="James Park"
            byline="CEO, Park & Associates Law"
          />
        </ShowcaseItem>

        <ShowcaseItem label="TestimonialTwoColumnWithLargePhoto — quote left + photo right">
          <TestimonialTwoColumnWithLargePhoto
            quote={<p>The AI voice agent handles our after-hours calls better than our old answering service ever did. Customers get answers instantly, leads get booked, and I sleep better at night.</p>}
            img={<AvatarPlaceholder />}
            name="Alex Rivera"
            byline="Owner, Sunrise HVAC Services"
          />
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          8. TEAM
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="team" title="8. Team">

        <ShowcaseItem label="TeamThreeColumnGrid — 3-col team member grid">
          <TeamThreeColumnGrid
            eyebrow="The team"
            headline="The people behind Kickbord."
          >
            <TeamMember3
              img={<div className="flex h-full w-full items-center justify-center bg-olive-200 dark:bg-olive-800"><UserCircleIcon /></div>}
              name="Mike Mathias"
              byline="Founder & CEO — Google, Nike, Samsung"
            />
            <TeamMember3
              img={<div className="flex h-full w-full items-center justify-center bg-olive-200 dark:bg-olive-800"><UserCircleIcon /></div>}
              name="Ana Flores"
              byline="Head of Client Success"
            />
            <TeamMember3
              img={<div className="flex h-full w-full items-center justify-center bg-olive-200 dark:bg-olive-800"><UserCircleIcon /></div>}
              name="Jordan Kim"
              byline="AI Systems Engineer"
            />
          </TeamThreeColumnGrid>
        </ShowcaseItem>

        <ShowcaseItem label="TeamFourColumnGrid — 4-col team member grid">
          <TeamFourColumnGrid
            eyebrow="Our crew"
            headline="Meet everyone on the Kickbord team."
          >
            <TeamMember4
              img={<div className="flex h-full w-full items-center justify-center bg-olive-200 dark:bg-olive-800"><UserCircleIcon /></div>}
              name="Mike Mathias"
              byline="Founder & CEO"
            />
            <TeamMember4
              img={<div className="flex h-full w-full items-center justify-center bg-olive-200 dark:bg-olive-800"><UserCircleIcon /></div>}
              name="Ana Flores"
              byline="Client Success"
            />
            <TeamMember4
              img={<div className="flex h-full w-full items-center justify-center bg-olive-200 dark:bg-olive-800"><UserCircleIcon /></div>}
              name="Jordan Kim"
              byline="AI Engineer"
            />
            <TeamMember4
              img={<div className="flex h-full w-full items-center justify-center bg-olive-200 dark:bg-olive-800"><UserCircleIcon /></div>}
              name="Taylor Cruz"
              byline="Design Lead"
            />
          </TeamFourColumnGrid>
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          9. BRANDS
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="brands" title="9. Brands">

        <ShowcaseItem label="BrandsCardsMultiColumn — brand card grid with logo + text + footnote">
          <BrandsCardsMultiColumn
            eyebrow="Partner brands"
            headline="Trusted by great companies."
            subheadline="Kickbord integrations and strategic partnerships that power your growth stack."
          >
            <BrandCard
              logo={<span className="font-display text-xl font-bold text-olive-950 dark:text-white">Google</span>}
              text="Analytics, Ads, and Search Console integrations for unified performance tracking."
              footnote="Active integration partner"
            />
            <BrandCard
              logo={<span className="font-display text-xl font-bold text-olive-950 dark:text-white">GoHighLevel</span>}
              text="CRM, pipeline, and automation backbone powering Kickbord's client delivery system."
              footnote="Core platform partner"
            />
            <BrandCard
              logo={<span className="font-display text-xl font-bold text-olive-950 dark:text-white">Meta</span>}
              text="Paid social campaign management and lead gen integrations for local businesses."
              footnote="Advertising partner"
            />
            <BrandCard
              logo={<span className="font-display text-xl font-bold text-olive-950 dark:text-white">Twilio</span>}
              text="Phone infrastructure powering the AI voice agent platform."
              footnote="Infrastructure partner"
            />
          </BrandsCardsMultiColumn>
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          10. FAQs
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="faqs" title="10. FAQs">

        <ShowcaseItem label="FAQsAccordion — single-column expandable accordion">
          <FAQsAccordion
            headline="Frequently asked questions"
            subheadline={<p>Everything you need to know about working with Kickbord.</p>}
          >
            <FaqSingle
              question="How long does it take to deploy an AI voice agent?"
              answer={<p>Most AI voice agent deployments are live within 2 weeks of kickoff. We handle all the configuration, scripting, and testing — you just need to show up for the kickoff call.</p>}
            />
            <FaqSingle
              question="What kind of businesses does Kickbord work with?"
              answer={<p>We primarily work with local service businesses and professional service firms with 1–50 employees who are ready to modernize their marketing. Think HVAC, dental, law, real estate, and trades.</p>}
            />
            <FaqSingle
              question="Do I need any technical knowledge to work with you?"
              answer={<p>None at all. Kickbord handles the technical setup, integrations, and ongoing maintenance. You just run your business — we handle the tech stack behind your marketing.</p>}
            />
            <FaqSingle
              question="What happens after my project is delivered?"
              answer={<p>All engagements include a 30-day support window after delivery. For ongoing clients, we're available via Slack and have regular check-in calls to keep things running and improving.</p>}
            />
          </FAQsAccordion>
        </ShowcaseItem>

        <ShowcaseItem label="FAQsTwoColumnAccordion — headline left, accordion right">
          <FAQsTwoColumnAccordion
            headline="Got questions?"
            subheadline={<p>Here's what small business owners most often ask us before getting started.</p>}
          >
            <FaqTwo
              question="Is there a setup fee?"
              answer={<p>No hidden setup fees. Our pricing is all-inclusive — strategy, implementation, and the first 30 days of support are included in the project price.</p>}
            />
            <FaqTwo
              question="Can I start with just one service?"
              answer={<p>Absolutely. Many clients start with a website redesign or an AI voice agent and then expand from there as they see results.</p>}
            />
            <FaqTwo
              question="Do you work with businesses outside Ventura County?"
              answer={<p>Yes — we work with businesses across California and remotely nationwide. Most of our work is fully remote-friendly.</p>}
            />
          </FAQsTwoColumnAccordion>
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          11. CALL TO ACTION
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="cta" title="11. Call to Action">

        <ShowcaseItem label="CallToActionSimple — left-aligned eyebrow + headline + subheadline + CTA">
          <CallToActionSimple
            eyebrow="Ready to modernize your marketing?"
            headline="Let's figure out where you are and what's holding you back."
            subheadline={<p>A 30-minute strategy conversation is free and could change how you think about your business growth. No pressure, no hard sell — just honest advice from someone who's done it at the highest level.</p>}
            cta={
              <div className="flex flex-wrap gap-4">
                <ButtonLink href="#" size="lg">Book a free strategy call</ButtonLink>
                <PlainButtonLink href="#" size="lg">See how it works <ArrowNarrowRightIcon /></PlainButtonLink>
              </div>
            }
          />
        </ShowcaseItem>

        <ShowcaseItem label="CallToActionSimpleCentered — centered headline + subheadline + CTA">
          <CallToActionSimpleCentered
            headline="Ready to have a website you're proud to share?"
            subheadline={<p>Kickbord delivers clean, modern, conversion-ready websites in 2–4 weeks. Let's talk about what your business needs.</p>}
            cta={
              <div className="flex flex-wrap justify-center gap-4">
                <ButtonLink href="#" size="lg">Start a redesign conversation</ButtonLink>
              </div>
            }
          />
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          12. DOCUMENTS
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="documents" title="12. Documents">

        <ShowcaseItem label="DocumentLeftAligned — left-aligned headline + prose content">
          <DocumentLeftAligned
            headline="Privacy Policy"
            subheadline={<p>Last updated May 22, 2026</p>}
          >
            <p>Kickbord ("we", "us", or "our") operates kickbord.com and is committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights.</p>
            <h2>Information we collect</h2>
            <p>We collect information you provide directly — such as your name and email address when you fill out a contact form — and information collected automatically when you use our site, including your IP address, browser type, and pages visited.</p>
            <h2>How we use your information</h2>
            <p>We use your information to respond to inquiries, send marketing communications (with your consent), and improve our services. We do not sell your personal data to third parties.</p>
          </DocumentLeftAligned>
        </ShowcaseItem>

        <ShowcaseItem label="DocumentCentered — centered headline + prose content">
          <DocumentCentered
            headline="Terms of Service"
            subheadline={<p>Effective date: January 1, 2026</p>}
          >
            <p>By engaging Kickbord for any service, you agree to the following terms. These terms apply to all clients and projects.</p>
            <h2>Scope of services</h2>
            <p>Kickbord provides digital marketing services including AI voice agent deployment, website design and development, and marketing consulting. The specific scope of each engagement is defined in a separate Statement of Work.</p>
            <h2>Payment terms</h2>
            <p>Project-based engagements require a 50% deposit to begin work, with the balance due upon delivery. Monthly retainers are billed on the first of each month.</p>
          </DocumentCentered>
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          13. ELEMENTS
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="elements" title="13. Elements">

        <ShowcaseItem label="Heading — color: dark/light (default) and light">
          <div className="flex flex-col gap-6 p-10">
            <Heading color="dark/light">Heading — dark/light (default)</Heading>
            <div className="rounded-lg bg-olive-900 p-6">
              <Heading color="light">Heading — light (for dark backgrounds)</Heading>
            </div>
          </div>
        </ShowcaseItem>

        <ShowcaseItem label="Subheading">
          <div className="p-10">
            <Subheading>Subheading — used for section titles and CTAs</Subheading>
          </div>
        </ShowcaseItem>

        <ShowcaseItem label="Eyebrow">
          <div className="p-10">
            <Eyebrow>Eyebrow — small label above headlines</Eyebrow>
          </div>
        </ShowcaseItem>

        <ShowcaseItem label="Text — size: md (default) and lg">
          <div className="flex flex-col gap-4 p-10">
            <Text size="md">Text size md (default) — Used for body copy, feature descriptions, and general paragraph text throughout the site.</Text>
            <Text size="lg">Text size lg — Used for hero subheadlines and prominent supporting copy where more visual weight is needed.</Text>
          </div>
        </ShowcaseItem>

        <ShowcaseItem label="Button — all variants: Button, ButtonLink, SoftButton, SoftButtonLink, PlainButton, PlainButtonLink × sizes md/lg × colors">
          <div className="flex flex-wrap items-center gap-4 p-10">
            <Button size="md">Button md (dark/light)</Button>
            <Button size="lg">Button lg (dark/light)</Button>
            <Button size="md" color="light" className="bg-olive-800">Button md (light)</Button>
            <Button size="lg" color="light" className="bg-olive-800">Button lg (light)</Button>
            <ButtonLink href="#" size="md">ButtonLink md</ButtonLink>
            <ButtonLink href="#" size="lg">ButtonLink lg</ButtonLink>
            <SoftButton size="md">SoftButton md</SoftButton>
            <SoftButton size="lg">SoftButton lg</SoftButton>
            <SoftButtonLink href="#" size="md">SoftButtonLink md</SoftButtonLink>
            <SoftButtonLink href="#" size="lg">SoftButtonLink lg</SoftButtonLink>
            <PlainButton size="md">PlainButton md</PlainButton>
            <PlainButton size="lg">PlainButton lg <ArrowNarrowRightIcon /></PlainButton>
            <PlainButtonLink href="#" size="md">PlainButtonLink md</PlainButtonLink>
            <PlainButtonLink href="#" size="lg">PlainButtonLink lg <ArrowNarrowRightIcon /></PlainButtonLink>
          </div>
        </ShowcaseItem>

        <ShowcaseItem label="AnnouncementBadge — variant: normal and overlay">
          <div className="flex flex-col gap-6 p-10">
            <AnnouncementBadge href="#" text="New: AI Voice Agents are live" cta="See what's new" variant="normal" />
            <div className="rounded-lg bg-olive-800 p-6">
              <AnnouncementBadge href="#" text="Now serving businesses nationwide" cta="Learn more" variant="overlay" />
            </div>
          </div>
        </ShowcaseItem>

        <ShowcaseItem label="InstallCommand — variant: normal and overlay">
          <div className="flex flex-col gap-6 p-10 max-w-xl">
            <InstallCommand snippet="npx kickbord-cli init" variant="normal" />
            <div className="rounded-lg bg-olive-800 p-6">
              <InstallCommand snippet="npx kickbord-cli init --agent voice" variant="overlay" />
            </div>
          </div>
        </ShowcaseItem>

        <ShowcaseItem label="EmailSignupForm — variant: normal and overlay">
          <div className="flex flex-col gap-6 p-10 max-w-xl">
            <EmailSignupForm cta="Subscribe" variant="normal" />
            <div className="rounded-lg bg-olive-800 p-6">
              <EmailSignupForm cta="Join" placeholder="your@email.com" variant="overlay" />
            </div>
          </div>
        </ShowcaseItem>

        <ShowcaseItem label="Wallpaper — all 4 color variants: green, blue, purple, brown">
          <div className="grid grid-cols-2 gap-2 p-6 lg:grid-cols-4">
            {(['green', 'blue', 'purple', 'brown'] as const).map((color) => (
              <Wallpaper key={color} color={color} className="rounded-lg">
                <div className="flex h-32 items-center justify-center">
                  <p className="font-semibold text-white">{color}</p>
                </div>
              </Wallpaper>
            ))}
          </div>
        </ShowcaseItem>

        <ShowcaseItem label="Screenshot — all 6 placements × all 4 wallpaper colors">
          <div className="grid grid-cols-2 gap-4 p-6 lg:grid-cols-3">
            {(['bottom', 'bottom-left', 'bottom-right', 'top', 'top-left', 'top-right'] as const).map((placement) => (
              <div key={placement} className="flex flex-col gap-2">
                <p className="font-mono text-xs text-olive-500">{placement}</p>
                <Screenshot wallpaper="green" placement={placement}>
                  <div className="h-24 w-full rounded bg-white/20 dark:bg-white/10" />
                </Screenshot>
              </div>
            ))}
          </div>
        </ShowcaseItem>

        <ShowcaseItem label="LogoGrid + Logo — responsive logo row">
          <div className="p-10">
            <LogoGrid>
              <Logo><span className="text-sm font-semibold text-olive-700 dark:text-olive-300">Google</span></Logo>
              <Logo><span className="text-sm font-semibold text-olive-700 dark:text-olive-300">Nike</span></Logo>
              <Logo><span className="text-sm font-semibold text-olive-700 dark:text-olive-300">Samsung</span></Logo>
              <Logo><span className="text-sm font-semibold text-olive-700 dark:text-olive-300">Verizon</span></Logo>
              <Logo><span className="text-sm font-semibold text-olive-700 dark:text-olive-300">LinkedIn</span></Logo>
            </LogoGrid>
          </div>
        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ══════════════════════════════════════════════════════════════════
          14. ICONS
      ══════════════════════════════════════════════════════════════════ */}
      <ShowcaseGroup id="icons" title="14. Icons">

        <ShowcaseItem label="All 100+ icons — grouped by category">

          {/* Arrows & Navigation */}
          <div className="p-6 pb-2">
            <p className="mb-3 font-mono text-xs font-semibold text-olive-500">Arrows & Navigation</p>
            <div className="flex flex-wrap gap-6">
              {[
                [<ArrowNarrowRightIcon />, 'arrow-narrow-right'],
                [<ArrowNarrowLeftIcon />, 'arrow-narrow-left'],
                [<ArrowNarrowUpIcon />, 'arrow-narrow-up'],
                [<ArrowNarrowDownIcon />, 'arrow-narrow-down'],
                [<ArrowLeftArrowRightIcon />, 'arrow-left-right'],
                [<ArrowDownArrowUpIcon />, 'arrow-down-up'],
                [<ChevronIcon />, 'chevron'],
              ].map(([icon, name]: any) => (
                <div key={String(name)} className="flex flex-col items-center gap-1">
                  <div className="flex size-8 items-center justify-center text-olive-950 dark:text-white">{icon}</div>
                  <p className="text-center font-mono text-[10px] text-olive-500">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Communication */}
          <div className="p-6 pb-2">
            <p className="mb-3 font-mono text-xs font-semibold text-olive-500">Communication</p>
            <div className="flex flex-wrap gap-6">
              {[
                [<MailIcon />, 'mail'],
                [<AtSymbolIcon />, 'at-symbol'],
                [<ChatBubbleCircleIcon />, 'chat-circle'],
                [<ChatBubbleCircleEllipsisIcon />, 'chat-circle-ellipsis'],
                [<ChatBubbleCircleStackedIcon />, 'chat-circle-stacked'],
                [<ChatBubbleRectangleIcon />, 'chat-rect'],
                [<ChatBubbleRectangleEllipsisIcon />, 'chat-rect-ellipsis'],
                [<MicrophoneIcon />, 'microphone'],
                [<BellIcon />, 'bell'],
                [<InboxIcon />, 'inbox'],
              ].map(([icon, name]: any) => (
                <div key={String(name)} className="flex flex-col items-center gap-1">
                  <div className="flex size-8 items-center justify-center text-olive-950 dark:text-white">{icon}</div>
                  <p className="text-center font-mono text-[10px] text-olive-500">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Business & Commerce */}
          <div className="p-6 pb-2">
            <p className="mb-3 font-mono text-xs font-semibold text-olive-500">Business & Commerce</p>
            <div className="flex flex-wrap gap-6">
              {[
                [<BriefcaseIcon />, 'briefcase'],
                [<BanknotesIcon />, 'banknotes'],
                [<TagIcon />, 'tag'],
                [<TicketIcon />, 'ticket'],
                [<ShoppingCartIcon />, 'cart'],
                [<ShoppingBagIcon />, 'bag'],
                [<ChartLineIcon />, 'chart-line'],
                [<ChartBarIcon />, 'chart-bar'],
                [<ChartPieCircleIcon />, 'chart-pie'],
                [<TargetIcon />, 'target'],
                [<FlagIcon />, 'flag'],
                [<StarIcon />, 'star'],
              ].map(([icon, name]: any) => (
                <div key={String(name)} className="flex flex-col items-center gap-1">
                  <div className="flex size-8 items-center justify-center text-olive-950 dark:text-white">{icon}</div>
                  <p className="text-center font-mono text-[10px] text-olive-500">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buildings & Places */}
          <div className="p-6 pb-2">
            <p className="mb-3 font-mono text-xs font-semibold text-olive-500">Buildings & Places</p>
            <div className="flex flex-wrap gap-6">
              {[
                [<BuildingIcon />, 'building'],
                [<Building2Icon />, 'building-2'],
                [<BuildingLibraryIcon />, 'building-library'],
                [<BuildingStorefrontIcon />, 'building-storefront'],
                [<HomeIcon />, 'home'],
                [<MapIcon />, 'map'],
                [<MapPinIcon />, 'map-pin'],
                [<CompassIcon />, 'compass'],
              ].map(([icon, name]: any) => (
                <div key={String(name)} className="flex flex-col items-center gap-1">
                  <div className="flex size-8 items-center justify-center text-olive-950 dark:text-white">{icon}</div>
                  <p className="text-center font-mono text-[10px] text-olive-500">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Users & People */}
          <div className="p-6 pb-2">
            <p className="mb-3 font-mono text-xs font-semibold text-olive-500">Users & People</p>
            <div className="flex flex-wrap gap-6">
              {[
                [<UserCircleIcon />, 'user-circle'],
                [<UserCircleDottedIcon />, 'user-circle-dotted'],
                [<User2Icon />, 'user-2'],
                [<UserArrowLeftIcon />, 'user-arrow-left'],
                [<UserArrowRightIcon />, 'user-arrow-right'],
                [<EducationCapIcon />, 'education-cap'],
              ].map(([icon, name]: any) => (
                <div key={String(name)} className="flex flex-col items-center gap-1">
                  <div className="flex size-8 items-center justify-center text-olive-950 dark:text-white">{icon}</div>
                  <p className="text-center font-mono text-[10px] text-olive-500">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech & Dev */}
          <div className="p-6 pb-2">
            <p className="mb-3 font-mono text-xs font-semibold text-olive-500">Tech & Development</p>
            <div className="flex flex-wrap gap-6">
              {[
                [<CpuIcon />, 'cpu'],
                [<TerminalIcon />, 'terminal'],
                [<CodeSquareIcon />, 'code-square'],
                [<CloudIcon />, 'cloud'],
                [<CloudArrowUpIcon />, 'cloud-up'],
                [<CloudArrowDownIcon />, 'cloud-down'],
                [<HardDriveIcon />, 'hard-drive'],
                [<GitBranchIcon />, 'git-branch'],
                [<GitDiffIcon />, 'git-diff'],
                [<GitMergeIcon />, 'git-merge'],
                [<GitPullIcon />, 'git-pull'],
                [<SparklesIcon />, 'sparkles'],
                [<RocketIcon />, 'rocket'],
                [<CogIcon />, 'cog'],
                [<SlidersIcon />, 'sliders'],
              ].map(([icon, name]: any) => (
                <div key={String(name)} className="flex flex-col items-center gap-1">
                  <div className="flex size-8 items-center justify-center text-olive-950 dark:text-white">{icon}</div>
                  <p className="text-center font-mono text-[10px] text-olive-500">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Files & Documents */}
          <div className="p-6 pb-2">
            <p className="mb-3 font-mono text-xs font-semibold text-olive-500">Files & Documents</p>
            <div className="flex flex-wrap gap-6">
              {[
                [<DocumentIcon />, 'document'],
                [<Document2StackedIcon />, 'document-2'],
                [<ClipboardIcon />, 'clipboard'],
                [<PaperclipIcon />, 'paperclip'],
                [<FolderIcon />, 'folder'],
                [<FolderPlusIcon />, 'folder-plus'],
                [<FolderMinusIcon />, 'folder-minus'],
                [<FolderArrowLeftIcon />, 'folder-left'],
                [<FolderArrowRightIcon />, 'folder-right'],
                [<ArchiveBoxIcon />, 'archive'],
                [<ArchiveBoxXIcon />, 'archive-x'],
                [<NewspaperIcon />, 'newspaper'],
                [<BookOpenIcon />, 'book-open'],
              ].map(([icon, name]: any) => (
                <div key={String(name)} className="flex flex-col items-center gap-1">
                  <div className="flex size-8 items-center justify-center text-olive-950 dark:text-white">{icon}</div>
                  <p className="text-center font-mono text-[10px] text-olive-500">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* UI & Actions */}
          <div className="p-6 pb-2">
            <p className="mb-3 font-mono text-xs font-semibold text-olive-500">UI & Actions</p>
            <div className="flex flex-wrap gap-6">
              {[
                [<UiLayoutIcon />, 'ui-layout'],
                [<PencilOnSquareIcon />, 'pencil'],
                [<TrashIcon />, 'trash'],
                [<MagnifyingGlassIcon />, 'search'],
                [<FilterIcon />, 'filter'],
                [<PlusIcon />, 'plus'],
                [<PlusCircleIcon />, 'plus-circle'],
                [<MinusIcon />, 'minus'],
                [<MinusCircleIcon />, 'minus-circle'],
                [<CheckmarkIcon />, 'checkmark'],
                [<AlertTriangleIcon />, 'alert'],
                [<InformationCircleIcon />, 'info'],
                [<QuestionCircleIcon />, 'question'],
                [<ShieldExclamationIcon />, 'shield-exclamation'],
                [<LockIcon />, 'lock'],
                [<LockOpenIcon />, 'lock-open'],
                [<KeyIcon />, 'key'],
                [<FingerprintIcon />, 'fingerprint'],
                [<RepeatIcon />, 'repeat'],
                [<UnorderedListIcon />, 'list'],
                [<Square3Stack3dIcon />, 'stack-3d'],
                [<Squares2StackedIcon />, 'squares-2'],
              ].map(([icon, name]: any) => (
                <div key={String(name)} className="flex flex-col items-center gap-1">
                  <div className="flex size-8 items-center justify-center text-olive-950 dark:text-white">{icon}</div>
                  <p className="text-center font-mono text-[10px] text-olive-500">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Misc */}
          <div className="p-6 pb-2">
            <p className="mb-3 font-mono text-xs font-semibold text-olive-500">Misc</p>
            <div className="flex flex-wrap gap-6">
              {[
                [<CalendarIcon />, 'calendar'],
                [<ClockIcon />, 'clock'],
                [<SunIcon />, 'sun'],
                [<MoonIcon />, 'moon'],
                [<LightBulbIcon />, 'light-bulb'],
                [<LightingBoltIcon />, 'lightning-bolt'],
                [<BeakerIcon />, 'beaker'],
                [<HeartIcon />, 'heart'],
                [<HeartPulseIcon />, 'heart-pulse'],
                [<LifebuoyIcon />, 'lifebuoy'],
                [<CameraIcon />, 'camera'],
                [<CameraVideoIcon />, 'camera-video'],
                [<PhotoIcon />, 'photo'],
                [<LanguageIcon />, 'language'],
              ].map(([icon, name]: any) => (
                <div key={String(name)} className="flex flex-col items-center gap-1">
                  <div className="flex size-8 items-center justify-center text-olive-950 dark:text-white">{icon}</div>
                  <p className="text-center font-mono text-[10px] text-olive-500">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="p-6 pb-6">
            <p className="mb-3 font-mono text-xs font-semibold text-olive-500">Social</p>
            <div className="flex flex-wrap gap-6">
              {[
                [<XIcon />, 'x (twitter)'],
                [<InstagramIcon />, 'instagram'],
                [<FacebookIcon />, 'facebook'],
                [<YouTubeIcon />, 'youtube'],
                [<GitHubIcon />, 'github'],
              ].map(([icon, name]: any) => (
                <div key={String(name)} className="flex flex-col items-center gap-1">
                  <div className="flex size-8 items-center justify-center text-olive-950 dark:text-white">{icon}</div>
                  <p className="text-center font-mono text-[10px] text-olive-500">{name}</p>
                </div>
              ))}
            </div>
          </div>

        </ShowcaseItem>

      </ShowcaseGroup>

      {/* ── Page Footer ──────────────────────────────────────────────────── */}
      <div className="border-t border-olive-950/10 px-6 py-10 text-center dark:border-white/10">
        <p className="font-mono text-xs text-olive-500">kb-lite component showcase · {new Date().getFullYear()}</p>
      </div>

    </div>
  )
}
