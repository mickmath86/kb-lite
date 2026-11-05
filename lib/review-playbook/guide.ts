export type GuideItem = string | { lead: string; text: string }

export type GuideBlock =
  | { type: 'p'; text: string }
  | { type: 'ul' | 'ol'; items: GuideItem[] }
  | { type: 'sample'; label: string; text: string; note?: string }
  | { type: 'emphasis'; text: string }

export type GuideSection = {
  id: string
  title: string
  blocks: GuideBlock[]
}

export type ReviewPlaybookGuide = {
  title: string
  intro: string
  disclaimer: string
  sections: GuideSection[]
}

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

export function getReviewPlaybookGuide(): ReviewPlaybookGuide {
  return {
    title: 'Review Request Playbook',
    intro:
      'For the owner who finishes the job and gets back in the truck. Read it once, put the messages in your phone, and run the last section as a checklist.',
    disclaimer:
      'This is an operating guide, not legal advice and not a promise of more calls, a higher rating, or a better map ranking. Text and email rules depend on consent, your location, and the tool you send from. The templates and the follow-up timing below are not a guarantee that a message is legally compliant.',
    sections: [
      {
        id: 'owner',
        title: 'Choose an owner and a completion trigger',
        blocks: [
          { type: 'p', text: 'Reviews stall when "someone" is supposed to ask. Pick one person who owns the request. On a small crew that is usually you. On a larger crew it can be the office manager or the lead tech who closes the job. Write the name down, and name a backup for days that person is out.' },
          { type: 'p', text: "A completion trigger is the moment the job is actually done in the customer's eyes. Pick one and use it every time:" },
          { type: 'ul', items: [
            'The job is marked complete in your invoice, schedule, or job system.',
            'The customer pays the final invoice or signs off on the work.',
            'The crew lead tells the office the job is done, before the truck leaves the driveway.',
          ] },
          { type: 'p', text: 'The owner of the request is responsible for the ask going out after that trigger, whether they send it or a tool does. If you do not have software, the trigger can be simple: the invoice is marked paid, and the message goes out before the laptop closes.' },
          { type: 'p', text: 'Do not use "when we remember" as the trigger. That is how a busy week produces zero reviews.' },
        ],
      },
      {
        id: 'every-customer',
        title: 'Ask every customer, the same way',
        blocks: [
          { type: 'p', text: 'Ask every customer who had a completed job. Same script. Same link. Same timing rule. The ask is for an honest review of the work, not for a perfect score.' },
          { type: 'p', text: 'Do not:' },
          { type: 'ul', items: [
            'Offer a discount, gift card, entry in a drawing, or anything else in exchange for a review.',
            'Ask only the customers who seemed happiest.',
            'Send happy customers to Google and route unhappy customers to a private form so low scores never appear. That is review gating.',
            'Ask for five stars, or say "if we earned five stars."',
          ] },
          { type: 'p', text: 'Give every customer the same public review link. If something went wrong, handle that as customer service, in person or by phone, separate from the review ask. Fix the job. Do not hide the customer from the public page.' },
          { type: 'p', text: "Google's review policies prohibit incentives and reviews that do not reflect a real customer experience. Filtering who is invited also builds a profile that does not match the work you actually do. You lose the signal that tells you what is breaking in the field." },
          { type: 'p', text: 'A short, plain ask after every job beats a clever campaign you run when the schedule finally slows down.' },
        ],
      },
      {
        id: 'google-link',
        title: 'Get a direct Google review link',
        blocks: [
          { type: 'p', text: 'You want a link that opens the review box for your business. The customer should not have to search your name and guess which listing is yours.' },
          { type: 'p', text: 'Get it this way. Menu labels in Google move, so do not follow an old screenshot click by click:' },
          { type: 'ol', items: [
            'Sign in to the Google account that manages the Business Profile.',
            'Open the Business Profile manager. business.google.com is the usual starting point.',
            'Find the tool for that location that asks for reviews or shares a review link. Copy the link Google gives you.',
            'Open the link on your phone before you send it to anyone.',
          ] },
          { type: 'p', text: 'The link is often a short g.page link, or a search.google.com link, for that location. On your phone it should open your business and offer a way to leave a review. If it opens a competitor with a similar name, stop and get the link again.' },
          { type: 'p', text: 'If you have more than one location, use the link for the location that did the work. Paste the same link into the text, the email, and the follow-up, replacing [Review link]. Do not send people to your website and hope they find Google.' },
          { type: 'p', text: "If you cannot find the control, search Google's Business Profile help for how to get a link to ask for reviews. The labels change. The job does not: copy the link Google provides, test it, and reuse it." },
        ],
      },
      {
        id: 'timing',
        title: 'Timing, permission, and opt-out',
        blocks: [
          { type: 'p', text: 'Send the request after the job is complete and the customer has seen the result. For a repair, that is often the same day, once they have confirmed it works. For a remodel or a multi-day install, wait until the punch list is done and they have walked the work. Do not ask while tools are still in the hallway.' },
          { type: 'p', text: 'That timing is a recommendation, because the work is finished and still easy to remember. It is not a rule published by Google or by a phone carrier.' },
          { type: 'p', text: 'Text and email are not the same as handing someone a card.' },
          { type: 'ul', items: [
            'Text customers who agreed to receive texts from your business, or who are already texting with you about this job. If you are unsure, ask in person or call.',
            'Email customers who gave you an email address for the job and have not asked you to stop.',
            'Make opting out obvious in the first message. For texts, tell them they can reply STOP. For email, tell them they can reply "no thanks," and keep the unsubscribe link your email tool adds.',
            'If they opt out, stop. Do not switch channels and ask again.',
            'Keep the message about the finished job and the review. Do not bury the ask in a promotion.',
          ] },
          { type: 'p', text: "Your carrier, your email provider, and local law set the real requirements. Nothing in this playbook makes a message compliant. If you use a texting platform, follow that platform's consent rules." },
        ],
      },
      {
        id: 'messages',
        title: 'Messages you can copy',
        blocks: [
          { type: 'p', text: "Replace the brackets with your business name, the customer's first name, and the review link from the previous section. Do not add a request for a star rating. Send the follow-up once, not as a series." },
          { type: 'sample', label: 'In person, at the end of the job', text: IN_PERSON, note: 'Then send the text. Do not stand over them while they type.' },
          { type: 'sample', label: 'Text message', text: SMS },
          { type: 'sample', label: 'Email', text: EMAIL },
          { type: 'sample', label: 'One follow-up', text: FOLLOW_UP, note: 'Send this a few days after the first message, not the same day. Skip it if they already reviewed, opted out, or told you something is still wrong.' },
        ],
      },
      {
        id: 'stop',
        title: 'When to stop asking',
        blocks: [
          { type: 'p', text: 'The sequence ends when any of these is true:' },
          { type: 'ul', items: [
            'You can see a new review from that customer, or they tell you they left one.',
            'They reply STOP, unsubscribe, "no thanks," or anything else that means stop.',
            'You already sent the one follow-up.',
            'They raised a problem that is not resolved. Fix the job first. Do not keep asking for a review while they are waiting on you.',
          ] },
          { type: 'p', text: 'Do not send a third message. Do not have a second person from the company ask. Do not call only to chase the review. One polite ask, one reminder, then you are done.' },
          { type: 'p', text: 'Pressure creates reviews you would not want read out loud in front of the customer. It also trains people to ignore you the next time.' },
        ],
      },
      {
        id: 'replies',
        title: 'Reply without sharing the job',
        blocks: [
          { type: 'p', text: 'Reply to reviews. The next customer reads the reply as much as the stars. Thank people by the name on the review. Mention the type of work only if they already said it. Do not add the price, the street address, a gate code, or a complaint they made in private.' },
          { type: 'sample', label: 'Reply to a positive review', text: POSITIVE_REPLY },
          { type: 'sample', label: 'Reply to a negative or mixed review', text: NEGATIVE_REPLY, note: 'Stay calm. Do not argue, and do not explain the private backstory in public.' },
          { type: 'p', text: 'In a public reply, do not:' },
          { type: 'ul', items: [
            'Blame a technician by name.',
            'Post photos from inside the home.',
            'Quote text messages or the invoice.',
            'Offer a public discount in exchange for changing or removing the review.',
          ] },
          { type: 'p', text: 'If the review describes a job you cannot match, say that briefly and ask them to call. Do not look up other customers in the reply while you check.' },
        ],
      },
      {
        id: 'tracking',
        title: 'Track the skips, then review them weekly',
        blocks: [
          { type: 'p', text: 'You do not need a dashboard. A note on the job, or a column on a spreadsheet, is enough. For each completed job, record:' },
          { type: 'ul', items: [
            'The date the job was completed.',
            'Whether the request was sent.',
            'The channel: in person, text, or email.',
            'Whether they opted out.',
            'Whether a review showed up: yes, no, or not yet.',
            'Anything that skipped the process, such as no mobile number, no review link, or the owner being out.',
          ] },
          { type: 'p', text: 'Once a week, the request owner spends about fifteen minutes on four questions:' },
          { type: 'ol', items: [
            'How many jobs were completed?',
            'How many of those got the ask?',
            'How many reviews came in?',
            'Where did the process skip a job, and what will change this week?',
          ] },
          { type: 'p', text: 'Look for skips, not for a magic number. If the asks went out and reviews did not, read the message out loud and check the link. If the asks did not go out, the trigger or the owner is the problem, not the wording.' },
        ],
      },
      {
        id: 'automation',
        title: 'Automation blueprint',
        blocks: [
          { type: 'p', text: 'When you are ready to stop relying on memory, the sequence is the same one a person would run:' },
          { type: 'emphasis', text: 'Completed job, then request, then wait, then an optional follow-up, then stop.' },
          { type: 'ul', items: [
            { lead: 'Completed job.', text: 'The trigger from the first section fires. The contact has a name and at least one channel you are allowed to use. If the job is not actually finished, nothing sends.' },
            { lead: 'Request.', text: 'Send the first text or email. Include the review link and the opt-out line. Do not send if they already opted out.' },
            { lead: 'Wait.', text: 'Wait long enough that they are not getting two messages in one afternoon, and short enough that the job is still easy to remember. Three to five days is a reasonable starting point. Shorten it for a simple repair if you want, and leave it longer for a remodel. This is a working choice, not a platform requirement.' },
            { lead: 'Optional follow-up.', text: 'Send the single follow-up only if you cannot match a review to them, they have not opted out, and they have not replied with a problem. If your tool cannot tell whether they reviewed, stop when they say they did or when you see a new review with their name. Do not guess past that.' },
            { lead: 'Stop.', text: 'End the sequence after that follow-up, or immediately on a review, an opt-out, or an open complaint. No further review messages for that job.' },
          ] },
          { type: 'p', text: 'A calendar reminder can run this. Software can run it the same way. The conditions matter more than the tool. If a tool cannot honor the stop rules, keep a person in the loop.' },
        ],
      },
      {
        id: 'rollout',
        title: 'Rollout checklist',
        blocks: [
          { type: 'p', text: 'Use this once, to start. Then go back to the weekly review. Print this page if you want to mark it up.' },
          { type: 'ul', items: [
            'Name the request owner and the backup.',
            'Write down the completion trigger.',
            'Copy the Google review link and open it on a phone.',
            'Paste the link into the text, the email, and the follow-up.',
            'Decide the first channel: text, email, or an in-person ask plus a text.',
            'Confirm you will only text or email people you have permission to contact.',
            'Leave the opt-out line in the text and the email.',
            'Tell the crew: every finished job, no star request, nothing offered in exchange.',
            'Start the tracker, on paper or in a sheet.',
            'Send the first real request after the next completed job.',
            "Put the weekly fifteen-minute review on the owner's calendar.",
            'After two weeks, decide whether a person still sends the message or a tool should, using the conditions in the previous section.',
          ] },
          { type: 'p', text: 'If the weekly review shows the ask keeps slipping, that is a process problem. A phone and a spreadsheet are enough to run this. If you want the message tied to the moment a job is marked complete, Kickbord can set that up with you. Book a call from the site when you are ready. The playbook still works if you do it yourself.' },
        ],
      },
    ],
  }
}
