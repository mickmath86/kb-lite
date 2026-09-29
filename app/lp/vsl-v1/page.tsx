import { Eyebrow } from "@/components/elements/eyebrow";
import { LeadQualifierModal } from "@/components/elements/lead-qualifier-modal";
import { Screenshot } from "@/components/elements/screenshot";
import { HeroCenteredWithDemo } from "@/components/sections/hero-centered-with-demo";
import { FooterWithLinksAndSocialIcons } from "@/components/sections/footer-with-links-and-social-icons";

export default function VslV1() {
    return (
        <div>
            <div className="w-full flex items-center justify-center my-12">
                <img src="/logos/kb-icon-white.png"  className="h-16" alt="Kickbord Logo" />
            </div>
            <HeroCenteredWithDemo
                        eyebrow={<Eyebrow>Platform tour</Eyebrow>}
                        headline="Everything your marketing needs, in one place."
                        subheadline={<p>From AI voice agents to campaign strategy, Kickbord brings the full stack of modern marketing to your business.</p>}
                        cta2={
                          <LeadQualifierModal
                            triggerLabel="See how it works"
                            triggerClassName="px-10 py-5 text-2xl"
                          />
                        }
                        demo={
                          <Screenshot wallpaper="blue" placement="bottom" className="w-full">
                            <wistia-player
                              media-id="docfron0i3"
                              aspect="1.7777777777777777"
                              className="w-full h-full"
                            />
                          </Screenshot>
                        }
                        footer={<p className="text-center text-sm text-olive-500">Trusted by 50+ small businesses</p>}
            />
            <FooterWithLinksAndSocialIcons 
              links={
                <div className="flex flex-wrap justify-center gap-6 text-sm text-olive-600">
                  <a href="#" className="hover:text-olive-900">Privacy</a>
                  <a href="#" className="hover:text-olive-900">Terms</a>
                  <a href="#" className="hover:text-olive-900">Security</a>
                </div>
              }
              fineprint="© 2026 Kickbord. All rights reserved."
            />
        </div>
    );
}