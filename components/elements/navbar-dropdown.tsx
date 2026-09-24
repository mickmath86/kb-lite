import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  GlobeAltIcon,
  InboxStackIcon,
  MegaphoneIcon,
  PhoneArrowDownLeftIcon,
  StarIcon,
} from '@heroicons/react/24/outline'

const products = [
  {
    name: 'Functional Website',
    description: 'A fast, mobile-friendly site built to turn visitors into booked jobs',
    href: '/products/functional-website',
    icon: GlobeAltIcon,
  },
  {
    name: 'Missed Call Text Back',
    description: 'Instantly text back callers you can’t answer so you never lose a lead',
    href: '#',
    icon: PhoneArrowDownLeftIcon,
  },
  {
    name: 'All-in-one Inbox',
    description: 'Every text, email, and social message in one shared inbox',
    href: '#',
    icon: InboxStackIcon,
  },
  {
    name: '5-Star Google Business Review Funnel',
    description: 'Automatically turn happy customers into 5-star Google reviews',
    href: '#',
    icon: StarIcon,
  },
  {
    name: 'Automated Lead Follow-Up',
    description: 'Automatic text and email follow-ups until every lead responds',
    href: '#',
    icon: ArrowPathIcon,
  },
  {
    name: 'One-Click Marketing Campaigns',
    description: 'Launch proven promos to your customer list with a single click',
    href: '#',
    icon: MegaphoneIcon,
  },
]

export default function NavDropDown() {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-3xl/10 font-medium text-olive-950 lg:text-sm/7 dark:text-white">
        <span>Products</span>
        <ChevronDownIcon aria-hidden="true" className="size-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-56 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 bg-transparent px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded bg-white text-sm/6 shadow-lg outline-1 outline-gray-900/5 lg:max-w-3xl">
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
            {products.map((item) => (
              <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                </div>
                <div>
                  <a href={item.href} className="font-semibold text-gray-900">
                    {item.name}
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 px-8 py-6">
            <div className="flex items-center gap-x-3">
              <h3 className="text-sm/6 font-semibold text-gray-900">Enterprise</h3>
              <p className="rounded-full bg-indigo-600/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">New</p>
            </div>
            <p className="mt-2 text-sm/6 text-gray-600">Empower your entire team with even more advanced tools.</p>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
