/** Public table of contents. Full guidance lives in the playbook document. */
export const PLAYBOOK_OUTLINE = [
  {
    id: 'owner',
    title: 'Choose an owner and a completion trigger',
    blurb: 'Name who sends the ask, and the exact moment a job counts as finished.',
  },
  {
    id: 'every-customer',
    title: 'Ask every customer, the same way',
    blurb: 'Ask for an honest review every time. No gifts, no star requests, and no filtering.',
  },
  {
    id: 'google-link',
    title: 'Get a direct Google review link',
    blurb: 'Where the link comes from, and how to tell it opens the right business.',
  },
  {
    id: 'timing',
    title: 'Timing, permission, and opt-out',
    blurb: 'When to send the ask, and how text and email permission should work.',
  },
  {
    id: 'messages',
    title: 'Messages you can copy',
    blurb: 'An in-person script, a short text, an email, and one follow-up.',
  },
  {
    id: 'stop',
    title: 'When to stop asking',
    blurb: 'End the sequence after a review, an opt-out, or the single follow-up.',
  },
  {
    id: 'replies',
    title: 'Reply without sharing the job',
    blurb: 'Public replies for positive and negative reviews that leave private details offline.',
  },
  {
    id: 'tracking',
    title: 'Track the skips, then review them weekly',
    blurb: 'A few notes per job, and a short weekly review for the owner.',
  },
  {
    id: 'automation',
    title: 'Automation blueprint',
    blurb: 'Completed job, request, wait, one optional follow-up, then stop, and when each step fires.',
  },
  {
    id: 'rollout',
    title: 'Rollout checklist',
    blurb: 'A one-time list to put the process in place on the next finished job.',
  },
] as const

export type PlaybookSectionId = (typeof PLAYBOOK_OUTLINE)[number]['id']
