import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { GitDiffIcon } from '@/components/icons/git-diff-icon'
import { HeartIcon } from '@/components/icons/heart-icon'
import { RocketIcon } from '@/components/icons/rocket-icon'
import { StarIcon } from '@/components/icons/star-icon'
import { TargetIcon } from '@/components/icons/target-icon'
import { User2Icon } from '@/components/icons/user-2-icon'


import { BrandCard, BrandsCardsMultiColumn } from '@/components/sections/brands-cards-multi-column'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { Feature, FeaturesThreeColumn } from '@/components/sections/features-three-column'
import { FooterCategory, FooterLink, FooterWithLinkCategories } from '@/components/sections/footer-with-link-categories'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'
import { HeroTwoColumnWithPhoto } from '@/components/sections/hero-two-column-with-photo'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'
import { Plan as PlanMulti, PricingMultiTier } from '@/components/sections/pricing-multi-tier'
import { Stat as Stat3, StatsThreeColumnWithDescription } from '@/components/sections/stats-three-column-with-description'
import { TeamMember, TeamThreeColumnGrid } from '@/components/sections/team-three-column-grid'

export default function Page() {
  return (
    <>
      <NavbarWithLogoActionsAndCenteredLinks
              id="navbar"
              links={
                <>
                  <NavbarLink href="/about">About</NavbarLink>
                  <NavbarLink href="/services">Services</NavbarLink>
                  <NavbarLink href="#">Contact</NavbarLink>
                  <NavbarLink href="#" className="sm:hidden">
                    Log in
                  </NavbarLink>
                </>
              }
              logo={
                <NavbarLogo href="/">
                  <img
                    src="/logos/icon.png"
                    alt="Kickbord"
                    className="dark:hidden"
                    width={85}
                    height={28}
                  />
                  <img
                    src="/logos/icon.png"
                    alt="Oatmeal"
                    className="not-dark:hidden"
                    width={85}
                    height={28}
                  />
                  {/* <h1 className="text-4xl  font-display">Kickbord</h1> */}
                </NavbarLogo>
              }
              actions={
                <>
                  <PlainButtonLink href="#" className="max-sm:hidden">
                    Log in
                  </PlainButtonLink>
                  <ButtonLink href="#">Get started <ArrowNarrowRightIcon /></ButtonLink>
                </>
              }
            />

      <Main>
        {/* Hero */}
        
        <HeroTwoColumnWithPhoto
          id="origin-story"
          
          headline="Built to give growing businesses bigger-business capability"
          subheadline={
            <p>
              Kickbord was created to help ambitious businesses strengthen their marketing, modernize their digital presence, and use AI more practically. It is a founder-led partner for companies that want enterprise-level thinking without enterprise-level complexity.
            </p>
          }
          photo={
            <>
              <img
                className="not-dark:bg-white/75 max-xl:hidden dark:bg-black/75"
                src="/images/ventura-kb.jpg"
                width={1800}
                height={1600}
                alt=""
              />
              <img
                className="not-dark:bg-white/75 xl:hidden dark:bg-black/75"
                src="https://assets.tailwindplus.com/photos/1.webp"
                width={1800}
                height={945}
                alt=""
              />
            </>
          }
        />

        <HeroLeftAlignedWithDemo 
        eyebrow="Origin Story"
          headline="From enterprise campaigns to giving growing businesses a real shot"
          subheadline={
             <>  
            <p>
              I spent my career inside top agencies building websites, apps, and social campaigns for Fortune 500 brands, working alongside some of the most creative minds in advertising. I loved the creativity and the scale of that work – like leading the team that rebuilt the entire Google Ads web platform, a product used by tens of millions of people.
            </p>
            <p>
              But the longer I worked at that level, the more a pattern bothered me. Smaller and mid-sized businesses almost never got access to this kind of thinking or execution. They were bootstrapping, hiring whoever they could afford, or trying to figure out marketing, websites, and operations on their own – while the best talent was busy shipping massive campaigns for the biggest companies.
              </p>
              <p>
              While freelancing as a lead producer at R/GA on Google projects, I had a realization: if smaller businesses could see what truly goes into enterprise-level marketing and business consulting, they would be blown away by what’s possible for them. With modern AI tools, one experienced enterprise-level marketer who knows what questions to ask and what problems to solve can now deliver that caliber of strategy, creative, and systems to growing businesses at a fraction of the old cost. Kickbord exists to do exactly that – bringing enterprise-level marketing and business consulting to small and mid-sized businesses that are ready to grow but should not have to do it alone.
            </p>
            <p>
                -Mike M 
            </p>
            </>
          }
          demo={
            <Screenshot wallpaper="green" placement="bottom">
            <img
              className="not-dark:bg-white/75 max-xl:hidden dark:bg-black/75"
              src="/images/ventura.jpg"
              width={1800}
              height={1600}
              alt=""
            />
            </Screenshot>
          }
          
        />
        
        <StatsThreeColumnWithDescription 
       
          heading="Who We Help" 
          description="Kickbord works with growing businesses that need stronger marketing, better digital systems, and a clearer path to scale. These are companies with real opportunity, but not always the time, in-house expertise, or internal infrastructure to turn that opportunity into consistent growth."
          children={
            <>
              <Stat3 stat="Home services & trades" text="Plumbers, electricians, HVAC, roofers, landscapers, cleaners — businesses that need a steady pipeline of local jobs." />
              <Stat3 stat="1–50 person companies" text="Small enough that every lead matters, big enough that you're ready to grow with a system behind you." />
              <Stat3 stat="No marketing team in-house" text="You don't need to hire a CMO. Kickbord is your marketing department — strategy, website, ads, and automation included." />
            </>
          }
        />
        
        <PricingMultiTier 
        eyebrow="How Kickbord Helps"
        headline="Strategy, execution, and systems built to move the business forward"
         plans={
                      <>
                        <PlanMulti
                          name="Strategy"
                          price="Clarity and direction"
                          subheadline={<p>Kickbord helps businesses clarify positioning, identify growth opportunities, and make better marketing decisions with a clear plan forward.</p>}
                          features={['Brand and positioning clarity', 'Growth opportunity mapping', 'Website and funnel strategy', 'Marketing roadmap development']}
                       
                        />
                        <PlanMulti
                          name="90-Day Sprint"
                          price="$1,500"
                          period="/ month"
                          badge="Most popular"
                          subheadline={<p>A structured 3-month engagement covering strategy, execution, and ongoing optimization.</p>}
                          features={['Everything in Strategic Build', 'Monthly strategy sessions', 'Campaign management', 'Performance reporting', 'Priority support']}
                          
                        />
                        <PlanMulti
                          name="Fractional CMO"
                          price="$3,000"
                          period="/ month"
                          subheadline={<p>Ongoing senior marketing leadership embedded in your business. Full strategic and executional ownership.</p>}
                          features={['Full CMO responsibilities', 'Weekly check-ins', 'Team management', 'Vendor coordination', 'Board-level reporting']}
                       
                        />
                      </>
                    }/>

        {/* Team */}
        <TeamThreeColumnGrid
          id="team"
          headline="Our leadership team"
          subheadline={
            <p>
              Oatmeals's leadership team combines decades of experience in private equity, where they honed their skills
              in cost-cutting and maximizing shareholder value.
            </p>
          }
        >
          <TeamMember
            img={
              <img
                src="https://assets.tailwindplus.com/avatars/1.webp?w=800&h=800"
                alt=""
                className="not-dark:bg-white/75 dark:bg-black/75"
                width={800}
                height={800}
              />
            }
            name="Leslie Alexander"
            byline="Co-Founder / CEO"
          />
          <TeamMember
            img={
              <img
                src="https://assets.tailwindplus.com/avatars/2.webp?w=800&h=800"
                alt=""
                className="not-dark:bg-white/75 dark:bg-black/75"
                width={800}
                height={800}
              />
            }
            name="Michael Foster"
            byline="Co-Founder / CTO"
          />
          <TeamMember
            img={
              <img
                src="https://assets.tailwindplus.com/avatars/7.webp?w=800&h=800"
                alt=""
                className="not-dark:bg-white/75 dark:bg-black/75"
                width={800}
                height={800}
              />
            }
            name="Dries Vincent"
            byline="Business Relations"
          />
        </TeamThreeColumnGrid>

        {/* Features */}
        <FeaturesThreeColumn
          id="features"
          headline="Our values."
          subheadline={
            <p>
              Work smarter, reply faster, and keep every customer conversation right where it belongs — in one simple
              inbox, where you can ignore it.
            </p>
          }
          features={
            <>
              <Feature
                icon={<RocketIcon />}
                headline="Innovation"
                subheadline={
                  <p>
                    We are constantly pushing the boundaries of what's possible, and legal, in customer support to
                    deliver cutting-edge solutions for our clients.
                  </p>
                }
              />
              <Feature
                icon={<HeartIcon />}
                headline="Integrity"
                subheadline={
                  <p>
                    We are driven by a commitment to ethical business practices, transparency, and most of all,
                    maximizing shareholder value.
                  </p>
                }
              />
              <Feature
                icon={<GitDiffIcon />}
                headline="Collaboration"
                subheadline={
                  <p>
                    We believe teamwork makes the dream work, especially when that dream is offshoring local jobs to the
                    lowest bidder.
                  </p>
                }
              />
              <Feature
                icon={<User2Icon />}
                headline="Diversity"
                subheadline={
                  <p>
                    Diversity can mean many things, but to us it mainly means hiring people from countries with the
                    lowest labour costs.
                  </p>
                }
              />
              <Feature
                icon={<TargetIcon />}
                headline="Accountability"
                subheadline={
                  <p>
                    Our customers' success is our success and their failure is our failure, except in the legal sense
                    where our liability is limited.
                  </p>
                }
              />
              <Feature
                icon={<StarIcon />}
                headline="Quality"
                subheadline={
                  <p>
                    We believe that you can move fast without breaking things, unless those things are labour laws in
                    third world countries.
                  </p>
                }
              />
            </>
          }
        />

        {/* Call To Action */}
        <CallToActionSimple
          id="call-to-action"
          headline="Have anymore questions?"
          subheadline={
            <p>Chat to someone on our sales team, who will make promises about our roadmap that we won't keep.</p>
          }
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="#" size="lg">
                Chat with us
              </ButtonLink>

              <PlainButtonLink href="#" size="lg">
                Book a demo <ChevronIcon />
              </PlainButtonLink>
            </div>
          }
        />
      </Main>

      <FooterWithLinkCategories
        id="footer"
        links={
          <>
            <FooterCategory title="Product">
              <FooterLink href="#">Features</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
              <FooterLink href="#">Integrations</FooterLink>
            </FooterCategory>
            <FooterCategory title="Company">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Press Kit</FooterLink>
            </FooterCategory>
            <FooterCategory title="Resources">
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">API Docs</FooterLink>
              <FooterLink href="#">Status</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </FooterCategory>
            <FooterCategory title="Legal">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Security</FooterLink>
            </FooterCategory>
            <FooterCategory title="Connect">
              <FooterLink href="#">X</FooterLink>
              <FooterLink href="#">GitHub</FooterLink>
              <FooterLink href="#">YouTube</FooterLink>
            </FooterCategory>
          </>
        }
        fineprint="© 2025 Oatmeal, Inc."
      />
    </>
  )
}
