import MainNav from "@/components/sections/main-nav";
import { HeroTwoColumnWithPhoto } from "@/components/sections/hero-two-column-with-photo";
import { StatsWithGraph, Stat as StatGraph } from "@/components/sections/stats-with-graph";
import { StatsFourColumns, Stat } from "@/components/sections/stats-four-columns";
import { MagnifyingGlassIcon } from "@/components/icons/magnifying-glass-icon";
import { StarIcon } from "@/components/icons/star-icon";
import { UiLayoutIcon } from "@/components/icons/ui-layout-icon";
import { ChatBubbleCircleIcon } from "@/components/icons/chat-bubble-circle-icon";
import { CallToActionSimple } from "@/components/sections/call-to-action-simple";
import { ButtonLink } from "@/components/elements/button";

export default function FunctionalWebsite() {
  return (
    <>
      <MainNav /> 
      <HeroTwoColumnWithPhoto 
        headline="Functional Websites"
        subheadline={
          <>
            <p>
              Your Kickbord website includes a live AI chatbot, SMS lead notifications, and automated follow-up — so when someone lands on your site at 10pm on a Tuesday, they get an instant response. Not a voicemail. Not a form that goes nowhere.
            </p>
          </>
        }
        photo={
          <wistia-player 
            media-id="docfron0i3" 
            aspect="1.7777777777777777"
            className="w-full h-full"
          />
        }
      />
      <StatsWithGraph  
      headline="The Numbers Don't Lie"
      eyebrow="Why Your Website Matters"
      subheadline="Here's what happens when you actually follow up on every lead."
      >
        <StatGraph stat="75%" text="of people judge a company's credibility based on their website" />
        <StatGraph stat="78%" text="of small business owners say a website has boosted their growth." />
        <StatGraph stat="67%" text="of users trust websites with a seamless experience, boosting sales." />
      </StatsWithGraph>

      <StatsFourColumns 
      headline="What Makes a Website Functional?"
      eyebrow="Built to Work, Not Just Look Good"
      subheadline="A functional website doesn't just sit there—it actively helps you grow your business."
      >
        <Stat 
          icon={<MagnifyingGlassIcon className="size-6 text-olive-500 dark:text-white" />}
          stat="Actually Get Found Online" 
          text="We ensure all our websites are properly indexed to appear on Google. We follow all of Google's best practices for SEO. Before building, we add the right keywords, meta tags, H1 and H2 headers, and make sure everything is optimized for page speed. We also offer blog posts to help with your content creation." 
        />
        <Stat 
          icon={<StarIcon className="size-6 text-olive-500 dark:text-white" />}
          stat="Showcase Your Best Reviews" 
          text="An online reputation is arguably the most important part of any business. We ensure your company puts its best foot forward by showcasing your top reviews on every page of your website. We'll keep your reviews updated and ensure they are all responded to promptly." 
        />
        <Stat 
          icon={<UiLayoutIcon className="size-6 text-olive-500 dark:text-white" />}
          stat="Mobile Friendly" 
          text="87% of customers search for local businesses on their mobile devices. Ensuring your website loads and functions properly on mobile is our top priority. Our mobile optimizations include clear call-to-actions, hyperlinked phone numbers, and quick load speeds." 
        />
        <Stat 
          icon={<ChatBubbleCircleIcon className="size-6 text-olive-500 dark:text-white" />}
          stat="Instantly Starts SMS Conversations" 
          text="We aim to create SMS conversations with potential customers, eliminating the need for email back-and-forths for quotes. Each of our websites includes functional quote forms and a chat widget that instantly starts a text conversation with" 
        />
      </StatsFourColumns>
      <CallToActionSimple 
        eyebrow="Ready to Get Started?"
        headline="Book a Call Today"
        subheadline="Let's discuss how we can help your business grow with a functional website."
        cta={<ButtonLink href="/booking">Book a Call</ButtonLink>}
      />
    </>
  )
}