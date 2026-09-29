'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { PhoneIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Button, ButtonLink } from './button'
import { Container } from './container'

// TODO: replace with the real demo line
const DEMO_NUMBER = '1 (805) 716-5613'
const DEMO_NUMBER_TEL = 'tel:+18057165613'

export function TryReceptionist() {
  const [open, setOpen] = useState(false)

  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-olive-600 dark:text-olive-400">
              Try it yourself
            </p>
            <h2 className="font-display text-3xl/10 text-olive-950 sm:text-4xl dark:text-white">
              Call it. Test it. Try to stump it.
            </h2>
          </div>
          <p className="text-lg/8 text-olive-700 dark:text-olive-400">
            This is the exact same AI that answers for our clients. Call the demo
            line, pretend you&rsquo;re a customer, and hear what your callers
            would experience when you can&rsquo;t pick up.
          </p>
          <Button size="lg" onClick={() => setOpen(true)}>
            <PhoneIcon className="size-4" /> Try the AI receptionist
          </Button>
        </div>
      </Container>

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <div
          className="fixed inset-0 bg-olive-950/50 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-olive-900">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 rounded-full p-1.5 text-olive-500 hover:bg-olive-950/10 hover:text-olive-950 dark:text-olive-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="size-5" />
            </button>
            <DialogTitle className="font-display text-2xl/8 text-olive-950 dark:text-white">
              Call our demo line
            </DialogTitle>
            <p className="mt-2 text-sm/6 text-olive-700 dark:text-olive-400">
              Pretend you&rsquo;re a customer calling for a quote — the AI will
              answer, answer your questions, and try to book you.
            </p>
            <a
              href={DEMO_NUMBER_TEL}
              className="mt-6 block font-display text-4xl/10 text-olive-950 hover:text-olive-700 dark:text-white dark:hover:text-olive-300"
            >
              {DEMO_NUMBER}
            </a>
            <p className="mt-2 text-xs/5 text-olive-500 dark:text-olive-400">
              After the call, we&rsquo;ll text you the transcript so you can see
              what your customers would get.
            </p>
            <div className="mt-6 flex justify-center">
              <ButtonLink href={DEMO_NUMBER_TEL} size="lg">
                <PhoneIcon className="size-4" /> Call now
              </ButtonLink>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  )
}
