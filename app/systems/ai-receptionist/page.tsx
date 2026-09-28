import MainNav from "@/components/sections/main-nav";
import { HeroTwoColumnWithPhoto } from "@/components/sections/hero-two-column-with-photo";
import { StatsWithGraph, Stat as StatGraph } from "@/components/sections/stats-with-graph";
import { StatsFourColumns, Stat } from "@/components/sections/stats-four-columns";
import { MicrophoneIcon } from "@/components/icons/microphone-icon";
import { BellIcon } from "@/components/icons/bell-icon";
import { CalendarIcon } from "@/components/icons/calendar-icon";
import { ChatBubbleCircleIcon } from "@/components/icons/chat-bubble-circle-icon";
import { CallToActionSimple } from "@/components/sections/call-to-action-simple";
import { ButtonLink } from "@/components/elements/button";
import {
  FeatureThreeColumnWithDemos,
  Features as FeaturesThreeColWithDemos,
} from '@/components/sections/features-three-column-with-demos'
import { Screenshot } from "@/components/elements/screenshot";
import { TryReceptionist } from "@/components/elements/try-receptionist";

export default function AIReceptionist() {
  return (
    <>
      <MainNav /> 
      <HeroTwoColumnWithPhoto 
        headline="Never lose a job to a missed call"
        subheadline={
          <>
            <p>
              When you can't pick up — on a roof, under a house, mid-job with a customer — your AI receptionist answers on your existing number, handles the conversation, and books the job. Your caller talks to you instead of dialing the next competitor on Google.
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
      <TryReceptionist />
      <StatsWithGraph  
      headline="Missed calls are lost jobs"
      eyebrow="The Cost of Not Answering"
      subheadline="Here's what really happens when a customer calls and nobody picks up."
      >
        <StatGraph stat="85%" text="of callers who can't reach you won't call back — they dial the next business on the list" />
        <StatGraph stat="62%" text="of calls to small businesses go unanswered during the workday" />
        <StatGraph stat="80%" text="of callers who hit voicemail hang up without leaving a message" />
      </StatsWithGraph>

      <StatsFourColumns 
      headline="More Than an Answering Machine"
      eyebrow="Always On, Never On a Break"
      subheadline="It doesn't just take a message — it handles the call the way your best employee would."
      >
        <Stat 
          icon={<MicrophoneIcon className="size-6 text-olive-500 dark:text-white" />}
          stat="Answers on Your Existing Number" 
          text="You keep your number. When a call goes unanswered, the AI steps in and picks up like a real receptionist — no phone trees, no voicemail dead ends, no new hardware or lines to set up." 
        />
        <Stat 
          icon={<ChatBubbleCircleIcon className="size-6 text-olive-500 dark:text-white" />}
          stat="Handles the Whole Conversation" 
          text="It's trained on your business — your services, service area, hours, and how you price work. Callers get real answers to their questions instead of 'please leave a message.'" 
        />
        <Stat 
          icon={<CalendarIcon className="size-6 text-olive-500 dark:text-white" />}
          stat="Books the Job for You" 
          text="Qualified callers get scheduled on the spot. A missed call turns into a booked estimate on your calendar — not a lead for whoever answers next." 
        />
        <Stat 
          icon={<BellIcon className="size-6 text-olive-500 dark:text-white" />}
          stat="Sends You Everything Instantly" 
          text="The moment the call ends you get the transcript, the caller's details, and what they need — so when you call back, you already know the job." 
        />
      </StatsFourColumns>

      
      <FeaturesThreeColWithDemos
                        id="site-examples"
                        eyebrow="Who It's For"
                        headline="Built for the trades that can't always pick up"
                        subheadline="If customers call to book jobs, get quotes, or report emergencies — every one of those calls gets answered."
                        features={
                          <>
                            <FeatureThreeColumnWithDemos
                              demo={
                                <Screenshot wallpaper="green" placement="bottom-right">
                                  <img
                                    src="/images/trade-images/general-contractor.png"
                                    alt=""
                                    width={1500}
                                    height={1240}
                                  />
                                </Screenshot>
                              }
                              headline="General Contractors"
                              subheadline={<p>Remodels, additions, renovations, and project management.</p>}
                            />
                            <FeatureThreeColumnWithDemos
                              demo={
                                <Screenshot wallpaper="purple" placement="bottom-right">
                                  <img
                                    src="/images/trade-images/plumber.png"
                                    alt=""
                                    width={1500}
                                    height={1240}
                                  />
                                </Screenshot>
                              }
                              headline="Plumbers"
                              subheadline={<p>Repairs, drain cleaning, water heaters, repipes, and emergency calls.</p>}
                            />
                            
                        
                            <FeatureThreeColumnWithDemos
                              demo={
                                <Screenshot wallpaper="green" placement="bottom-right">
                                  <img
                                    src="/images/trade-images/mason.png"
                                    alt=""
                                    width={1500}
                                    height={1240}
                                  />
                                </Screenshot>
                              }
                              headline="Concrete & Masonry Contractors"
                              subheadline={<p>Driveways, patios, foundations, retaining walls, and stonework.</p>}
                            />
                            <FeatureThreeColumnWithDemos
                              demo={
                                <Screenshot wallpaper="brown" placement="bottom-right">
                                  <img
                                    src="/images/trade-images/flooring.png"
                                    alt=""
                                    width={1500}
                                    height={1240}
                                  />
                                </Screenshot>
                              }
                              headline="Flooring Contractors"
                              subheadline={<p>Hardwood, tile, carpet, vinyl, refinishing, and installation.</p>}
                            />
                            <FeatureThreeColumnWithDemos
                              demo={
                                <Screenshot wallpaper="purple" placement="bottom-right">
                                  <img
                                    src="/images/trade-images/garage.png"
                                    alt=""
                                    width={1500}
                                    height={1240}
                                  />
                                </Screenshot>
                              }
                              headline="Garage Door Contractors"
                              subheadline={<p>Repairs, replacements, openers, and emergency service.</p>}
                            />
                            <FeatureThreeColumnWithDemos
                              demo={
                                <Screenshot wallpaper="blue" placement="bottom-right">
                                  <img
                                    src="/images/trade-images/pest-control.png"
                                    alt=""
                                    width={1500}
                                    height={1240}
                                  />
                                </Screenshot>
                              }
                              headline="Pest Control Companies"
                              subheadline={<p>Inspections, treatment plans, exclusion, and recurring maintenance.</p>}
                            />
                          </>
                        }
            />

      <CallToActionSimple 
        eyebrow="Stop Losing Jobs to Voicemail"
        headline="Every missed call is money out the door"
        subheadline="Book a call and we'll show you exactly how the AI receptionist handles calls for your business."
        cta={<ButtonLink href="/booking">Book a Call</ButtonLink>}
      />
    </>
  )
}