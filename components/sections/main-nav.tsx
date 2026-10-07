'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import { Button } from '../elements/button'
import {
  Bars3Icon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  PhoneArrowDownLeftIcon,
  ShieldCheckIcon,
  StarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { PlainButtonLink } from '../elements/button'

const systems = [
  { name: 'Functional Website', description: 'Captures every visitor and follows up automatically', href: '/systems/functional-website', icon: GlobeAltIcon },
  { name: 'Fallback AI Receptionist', description: 'Answers missed calls so leads don’t call a competitor', href: '/systems/ai-receptionist', icon: PhoneArrowDownLeftIcon },
  { name: '5-Star Review Funnel', description: 'Automatic review requests the moment the job is done', href: '/systems/5-star-review-funnel', icon: StarIcon },
  { name: 'Local SEO', description: 'Show up at the top when locals search for you', href: '/systems/local-seo', icon: MagnifyingGlassIcon },
  { name: 'One-Click Campaigns', description: 'Fill slow weeks with one-click SMS & email promos', href: '/systems/one-click-campaigns', icon: MegaphoneIcon },
  { name: 'Local Service Ads', description: 'Top of Google, Google Verified badge, pay per lead', href: '/systems/local-service-ads', icon: ShieldCheckIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '/ai-agent-demo', icon: PlayCircleIcon },
  { name: 'Book a call', href: '/booking', icon: PhoneIcon },
]

export default function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-background dark:bg-background">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Kickbord</span>
            <img
              alt=""
              src="/logos/kb-icon-blk.png"
              className="h-12 w-auto dark:hidden"
            />
            <img
              alt=""
              src="/logos/kb-icon-white.png"
              className="h-12 w-auto not-dark:hidden"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 dark:text-white">
              Systems
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400 dark:text-gray-500" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-sm bg-white shadow-lg outline-1 outline-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in dark:bg-[#243a42] dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
            >
              <div className="p-4">
                {systems.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-gray-700/50 dark:group-hover:bg-gray-700">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-gray-600 group-hover:text-[#9CA88F] dark:text-gray-400 dark:group-hover:text-white"
                      />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900 dark:text-white">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:divide-white/10 dark:bg-gray-700/50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700/50"
                  >
                    <item.icon aria-hidden="true" className="size-5 flex-none text-gray-400 dark:text-gray-500" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a href="/pricing" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
            Pricing
          </a>
          <a href="/how-it-works" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
            How it Works
          </a>
          <a href="/about" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
            About Us
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div> 
              <Button size="md" className="mr-4">  <a href="/lp/booking"> Book a Call</a></Button>
       
          <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>

          </div>
         
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Kickbord</span>
              <img
                alt=""
                src="/logos/kb-icon-blk.png"
                className="h-8 w-auto dark:hidden"
              />
              <img
                alt=""
                src="/logos/kb-icon-white.png"
                className="h-8 w-auto not-dark:hidden"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5">
                    Systems
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...systems, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="/pricing"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Pricing
                </a>
                <a
                  href="/how-it-works"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  How it Works
                </a>
                <a
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  About Us
                </a>
              </div>
              <div className="py-6">
                <Button >
                 <a href="/booking">  Book a Call</a>
                
                </Button>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
