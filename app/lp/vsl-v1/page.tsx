import { Eyebrow } from "@/components/elements/eyebrow";
import { LeadQualifierModal } from "@/components/elements/lead-qualifier-modal";
import { Screenshot } from "@/components/elements/screenshot";
import Image from "next/image";
import { HeroCenteredWithDemo } from "@/components/sections/hero-centered-with-demo";
import { FooterWithLinksAndSocialIcons } from "@/components/sections/footer-with-links-and-social-icons";
import { PreserveQueryParams } from "@/components/elements/preserve-query-params";

export default function VslV1() {
    return (
        <div>
            <PreserveQueryParams />
            <div className="w-full flex items-center justify-center my-12">
                <img src="/logos/kb-icon-white.png"  className="h-16" alt="Kickbord Logo" />
            </div>
            <HeroCenteredWithDemo
                        eyebrow={<Eyebrow>Marketing for home service businesses</Eyebrow>}
                        headline="Never miss another call. Get more 5-star reviews. Show up first on Google."
                        subheadline={<p>See how Kickbord gets your happy customers leaving Google reviews, then answers and books every call those reviews bring in, even when you&rsquo;re on a job.</p>}
                        cta2={
                          <LeadQualifierModal
                            triggerLabel="Watch the Demo"
                            triggerClassName="px-10 py-5 text-2xl"
                          />
                        }
                        demo={
                          <Screenshot wallpaper="blue" placement="bottom" className="w-full">
                            <div className="relative">
                              <Image
                                src="/images/vsl-demo-preview.png"
                                alt="Kickbord platform demo preview"
                                width={1024}
                                height={536}
                                priority
                                className="h-auto w-full"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <LeadQualifierModal
                                  triggerLabel="▶"
                                  triggerAriaLabel="Play: Watch the Demo"
                                  triggerClassName="size-16 rounded-2xl bg-green-600 text-3xl text-white shadow-xl transition hover:bg-green-500 sm:size-20"
                                />
                              </div>
                            </div>
                          </Screenshot>
                        }
                        // footer={<p className="text-center text-sm text-olive-500">Trusted by 50+ small businesses</p>}
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