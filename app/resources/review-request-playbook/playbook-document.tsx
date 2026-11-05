'use client'

import { useEffect, useState } from 'react'

import { PLAYBOOK_OUTLINE } from '@/lib/review-playbook/outline'

const IN_PERSON = `We're glad we could get this done. If you have a minute later today, an honest Google review helps other homeowners find [Business]. I can text you the link.`

const SMS = `Hi [First name], this is [Business]. Thanks for having us out. If you're willing, an honest Google review helps other neighbors choose a contractor: [Review link]

Reply STOP if you'd rather not get messages like this.`

const EMAIL = `Subject: A quick note after today's job

Hi [First name],

Thanks for choosing [Business]. The job is complete on our side.

If you have a minute, an honest Google review helps other homeowners see what it is like to work with us:

[Review link]

If something about the job still needs attention, reply to this email and we will take care of it. If you would rather not hear from us about reviews, reply "no thanks" and we will not ask again.

Thank you,
[Business]`

const FOLLOW_UP = `Hi [First name], a short follow-up from [Business]. If you have a minute, an honest review is here: [Review link]

If you already left one, thank you. You can ignore this. Reply STOP to opt out.`

const POSITIVE_REPLY = `Thanks, [First name]. Glad we could take care of it. Call [Business] anytime you need us.`

const NEGATIVE_REPLY = `Thanks for telling us. That is not the result we want. Please call [Business] and ask for the owner so we can look into what happened.`

function CopyBlock({
  label,
  text,
  note,
}: {
  label: string
  text: string
  note?: string
}) {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setFailed(false)
      setCopied(true)
    } catch {
      setCopied(false)
      setFailed(true)
    }
  }

  return (
    <figure className="mt-5 overflow-hidden rounded-2xl border border-olive-950/10 bg-olive-50 dark:border-white/10 dark:bg-olive-950/40">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-olive-950/10 px-4 py-3 sm:px-5 dark:border-white/10">
        <span className="text-sm font-semibold text-olive-950 dark:text-white">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="playbook-no-print inline-flex min-h-10 items-center rounded-full bg-olive-950 px-3 text-sm font-medium text-white hover:bg-olive-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-950 dark:bg-olive-300 dark:text-olive-950 dark:hover:bg-olive-200"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 font-sans text-sm/6 whitespace-pre-wrap text-olive-800 sm:px-5 dark:text-olive-200">
        {text}
      </pre>
      {note ? <p className="px-4 pb-4 text-sm/6 text-olive-600 sm:px-5 dark:text-olive-400">{note}</p> : null}
      <p className="sr-only" aria-live="polite">
        {copied ? `${label} copied.` : failed ? `Could not copy ${label}. Select the text and copy it manually.` : ''}
      </p>
      {failed ? (
        <p className="px-4 pb-4 text-sm text-red-700 sm:px-5 dark:text-red-400">
          Clipboard access was blocked. Select the message and copy it manually.
        </p>
      ) : null}
    </figure>
  )
}

function Section({
  id,
  children,
}: {
  id: (typeof PLAYBOOK_OUTLINE)[number]['id']
  children: React.ReactNode
}) {
  const section = PLAYBOOK_OUTLINE.find((item) => item.id === id)
  if (!section) return null
  const number = String(PLAYBOOK_OUTLINE.findIndex((item) => item.id === id) + 1).padStart(2, '0')

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-8 border-t border-olive-950/10 pt-10 dark:border-white/10">
      <p className="font-display text-xl text-[#596352] dark:text-olive-300">{number}</p>
      <h2 id={`${id}-title`} className="mt-1 font-display text-3xl tracking-tight text-olive-950 sm:text-4xl dark:text-white">
        {section.title}
      </h2>
      <div className="mt-4 space-y-4 text-base/7 text-olive-700 dark:text-olive-300">{children}</div>
    </section>
  )
}

export default function PlaybookDocument() {
  useEffect(() => {
    document.getElementById('playbook')?.focus()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  function printPlaybook() {
    window.print()
  }

  return (
    <article id="playbook" tabIndex={-1} data-testid="playbook-document" className="playbook-doc outline-none">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <p className="text-sm/7 font-semibold text-olive-700 dark:text-olive-400">Kickbord playbook</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-olive-950 sm:text-5xl dark:text-white">
            Review Request Playbook
          </h1>
          <p className="mt-4 text-base/7 text-olive-700 dark:text-olive-300">
            For the owner who finishes the job and gets back in the truck. Read it once, put the messages in your phone, and run the last section as a checklist.
          </p>
        </div>
        <button
          type="button"
          onClick={printPlaybook}
          className="playbook-no-print inline-flex min-h-11 items-center rounded-full bg-olive-950/10 px-4 text-sm font-medium text-olive-950 hover:bg-olive-950/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-950 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        >
          Print or save as PDF
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-[#7b627d]/30 bg-[#7b627d]/10 px-5 py-4 text-sm/6 text-olive-800 dark:border-white/10 dark:bg-white/5 dark:text-olive-200">
        <p>
          This is an operating guide, not legal advice and not a promise of more calls, a higher rating, or a better map ranking. Text and email rules depend on consent, your location, and the tool you send from. The templates and the follow-up timing below are not a guarantee that a message is legally compliant.
        </p>
      </div>

      <div className="mt-10 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        <nav aria-label="Playbook contents" className="mb-10 lg:sticky lg:top-8 lg:mb-0 lg:self-start">
          <p className="text-sm font-semibold text-olive-950 dark:text-white">Contents</p>
          <ol className="mt-3 space-y-2 text-sm/6">
            {PLAYBOOK_OUTLINE.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-olive-700 underline-offset-4 hover:text-olive-950 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-950 dark:text-olive-300 dark:hover:text-white"
                >
                  {index + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div>
          <Section id="owner">
            <p>
              Reviews stall when &quot;someone&quot; is supposed to ask. Pick one person who owns the request. On a small crew that is usually you. On a larger crew it can be the office manager or the lead tech who closes the job. Write the name down, and name a backup for days that person is out.
            </p>
            <p>
              A completion trigger is the moment the job is actually done in the customer&apos;s eyes. Pick one and use it every time:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>The job is marked complete in your invoice, schedule, or job system.</li>
              <li>The customer pays the final invoice or signs off on the work.</li>
              <li>The crew lead tells the office the job is done, before the truck leaves the driveway.</li>
            </ul>
            <p>
              The owner of the request is responsible for the ask going out after that trigger, whether they send it or a tool does. If you do not have software, the trigger can be simple: the invoice is marked paid, and the message goes out before the laptop closes.
            </p>
            <p>
              Do not use &quot;when we remember&quot; as the trigger. That is how a busy week produces zero reviews.
            </p>
          </Section>

          <Section id="every-customer">
            <p>
              Ask every customer who had a completed job. Same script. Same link. Same timing rule. The ask is for an honest review of the work, not for a perfect score.
            </p>
            <p>Do not:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Offer a discount, gift card, entry in a drawing, or anything else in exchange for a review.</li>
              <li>Ask only the customers who seemed happiest.</li>
              <li>Send happy customers to Google and route unhappy customers to a private form so low scores never appear. That is review gating.</li>
              <li>Ask for five stars, or say &quot;if we earned five stars.&quot;</li>
            </ul>
            <p>
              Give every customer the same public review link. If something went wrong, handle that as customer service, in person or by phone, separate from the review ask. Fix the job. Do not hide the customer from the public page.
            </p>
            <p>
              Google&apos;s review policies prohibit incentives and reviews that do not reflect a real customer experience. Filtering who is invited also builds a profile that does not match the work you actually do. You lose the signal that tells you what is breaking in the field.
            </p>
            <p>
              A short, plain ask after every job beats a clever campaign you run when the schedule finally slows down.
            </p>
          </Section>

          <Section id="google-link">
            <p>
              You want a link that opens the review box for your business. The customer should not have to search your name and guess which listing is yours.
            </p>
            <p>Get it this way. Menu labels in Google move, so do not follow an old screenshot click by click:</p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Sign in to the Google account that manages the Business Profile.</li>
              <li>Open the Business Profile manager. business.google.com is the usual starting point.</li>
              <li>Find the tool for that location that asks for reviews or shares a review link. Copy the link Google gives you.</li>
              <li>Open the link on your phone before you send it to anyone.</li>
            </ol>
            <p>
              The link is often a short g.page link, or a search.google.com link, for that location. On your phone it should open your business and offer a way to leave a review. If it opens a competitor with a similar name, stop and get the link again.
            </p>
            <p>
              If you have more than one location, use the link for the location that did the work. Paste the same link into the text, the email, and the follow-up, replacing [Review link]. Do not send people to your website and hope they find Google.
            </p>
            <p>
              If you cannot find the control, search Google&apos;s Business Profile help for how to get a link to ask for reviews. The labels change. The job does not: copy the link Google provides, test it, and reuse it.
            </p>
          </Section>

          <Section id="timing">
            <p>
              Send the request after the job is complete and the customer has seen the result. For a repair, that is often the same day, once they have confirmed it works. For a remodel or a multi-day install, wait until the punch list is done and they have walked the work. Do not ask while tools are still in the hallway.
            </p>
            <p>
              That timing is a recommendation, because the work is finished and still easy to remember. It is not a rule published by Google or by a phone carrier.
            </p>
            <p>
              Text and email are not the same as handing someone a card.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Text customers who agreed to receive texts from your business, or who are already texting with you about this job. If you are unsure, ask in person or call.</li>
              <li>Email customers who gave you an email address for the job and have not asked you to stop.</li>
              <li>Make opting out obvious in the first message. For texts, tell them they can reply STOP. For email, tell them they can reply &quot;no thanks,&quot; and keep the unsubscribe link your email tool adds.</li>
              <li>If they opt out, stop. Do not switch channels and ask again.</li>
              <li>Keep the message about the finished job and the review. Do not bury the ask in a promotion.</li>
            </ul>
            <p>
              Your carrier, your email provider, and local law set the real requirements. Nothing in this playbook makes a message compliant. If you use a texting platform, follow that platform&apos;s consent rules.
            </p>
          </Section>

          <Section id="messages">
            <p>
              Replace the brackets with your business name, the customer&apos;s first name, and the review link from the previous section. Do not add a request for a star rating. Send the follow-up once, not as a series.
            </p>
            <CopyBlock
              label="In person, at the end of the job"
              text={IN_PERSON}
              note="Then send the text. Do not stand over them while they type."
            />
            <CopyBlock label="Text message" text={SMS} />
            <CopyBlock label="Email" text={EMAIL} />
            <CopyBlock
              label="One follow-up"
              text={FOLLOW_UP}
              note="Send this a few days after the first message, not the same day. Skip it if they already reviewed, opted out, or told you something is still wrong."
            />
          </Section>

          <Section id="stop">
            <p>The sequence ends when any of these is true:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>You can see a new review from that customer, or they tell you they left one.</li>
              <li>They reply STOP, unsubscribe, &quot;no thanks,&quot; or anything else that means stop.</li>
              <li>You already sent the one follow-up.</li>
              <li>They raised a problem that is not resolved. Fix the job first. Do not keep asking for a review while they are waiting on you.</li>
            </ul>
            <p>
              Do not send a third message. Do not have a second person from the company ask. Do not call only to chase the review. One polite ask, one reminder, then you are done.
            </p>
            <p>
              Pressure creates reviews you would not want read out loud in front of the customer. It also trains people to ignore you the next time.
            </p>
          </Section>

          <Section id="replies">
            <p>
              Reply to reviews. The next customer reads the reply as much as the stars. Thank people by the name on the review. Mention the type of work only if they already said it. Do not add the price, the street address, a gate code, or a complaint they made in private.
            </p>
            <CopyBlock label="Reply to a positive review" text={POSITIVE_REPLY} />
            <CopyBlock
              label="Reply to a negative or mixed review"
              text={NEGATIVE_REPLY}
              note="Stay calm. Do not argue, and do not explain the private backstory in public."
            />
            <p>In a public reply, do not:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Blame a technician by name.</li>
              <li>Post photos from inside the home.</li>
              <li>Quote text messages or the invoice.</li>
              <li>Offer a public discount in exchange for changing or removing the review.</li>
            </ul>
            <p>
              If the review describes a job you cannot match, say that briefly and ask them to call. Do not look up other customers in the reply while you check.
            </p>
          </Section>

          <Section id="tracking">
            <p>
              You do not need a dashboard. A note on the job, or a column on a spreadsheet, is enough. For each completed job, record:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>The date the job was completed.</li>
              <li>Whether the request was sent.</li>
              <li>The channel: in person, text, or email.</li>
              <li>Whether they opted out.</li>
              <li>Whether a review showed up: yes, no, or not yet.</li>
              <li>Anything that skipped the process, such as no mobile number, no review link, or the owner being out.</li>
            </ul>
            <p>
              Once a week, the request owner spends about fifteen minutes on four questions:
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>How many jobs were completed?</li>
              <li>How many of those got the ask?</li>
              <li>How many reviews came in?</li>
              <li>Where did the process skip a job, and what will change this week?</li>
            </ol>
            <p>
              Look for skips, not for a magic number. If the asks went out and reviews did not, read the message out loud and check the link. If the asks did not go out, the trigger or the owner is the problem, not the wording.
            </p>
          </Section>

          <Section id="automation">
            <p>
              When you are ready to stop relying on memory, the sequence is the same one a person would run:
            </p>
            <p className="font-medium text-olive-950 dark:text-white">
              Completed job, then request, then wait, then an optional follow-up, then stop.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold text-olive-950 dark:text-white">Completed job.</span> The trigger from the first section fires. The contact has a name and at least one channel you are allowed to use. If the job is not actually finished, nothing sends.
              </li>
              <li>
                <span className="font-semibold text-olive-950 dark:text-white">Request.</span> Send the first text or email. Include the review link and the opt-out line. Do not send if they already opted out.
              </li>
              <li>
                <span className="font-semibold text-olive-950 dark:text-white">Wait.</span> Wait long enough that they are not getting two messages in one afternoon, and short enough that the job is still easy to remember. Three to five days is a reasonable starting point. Shorten it for a simple repair if you want, and leave it longer for a remodel. This is a working choice, not a platform requirement.
              </li>
              <li>
                <span className="font-semibold text-olive-950 dark:text-white">Optional follow-up.</span> Send the single follow-up only if you cannot match a review to them, they have not opted out, and they have not replied with a problem. If your tool cannot tell whether they reviewed, stop when they say they did or when you see a new review with their name. Do not guess past that.
              </li>
              <li>
                <span className="font-semibold text-olive-950 dark:text-white">Stop.</span> End the sequence after that follow-up, or immediately on a review, an opt-out, or an open complaint. No further review messages for that job.
              </li>
            </ul>
            <p>
              A calendar reminder can run this. Software can run it the same way. The conditions matter more than the tool. If a tool cannot honor the stop rules, keep a person in the loop.
            </p>
          </Section>

          <Section id="rollout">
            <p>Use this once, to start. Then go back to the weekly review. Print this page if you want to mark it up.</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Name the request owner and the backup.</li>
              <li>Write down the completion trigger.</li>
              <li>Copy the Google review link and open it on a phone.</li>
              <li>Paste the link into the text, the email, and the follow-up.</li>
              <li>Decide the first channel: text, email, or an in-person ask plus a text.</li>
              <li>Confirm you will only text or email people you have permission to contact.</li>
              <li>Leave the opt-out line in the text and the email.</li>
              <li>Tell the crew: every finished job, no star request, nothing offered in exchange.</li>
              <li>Start the tracker, on paper or in a sheet.</li>
              <li>Send the first real request after the next completed job.</li>
              <li>Put the weekly fifteen-minute review on the owner&apos;s calendar.</li>
              <li>After two weeks, decide whether a person still sends the message or a tool should, using the conditions in the previous section.</li>
            </ul>
            <p>
              If the weekly review shows the ask keeps slipping, that is a process problem. A phone and a spreadsheet are enough to run this. If you want the message tied to the moment a job is marked complete, Kickbord can set that up with you. Book a call from the site when you are ready. The playbook still works if you do it yourself.
            </p>
          </Section>
        </div>
      </div>
    </article>
  )
}
