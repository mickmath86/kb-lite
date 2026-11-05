import type { PlaybookDocument } from './schema'

if (typeof window !== 'undefined') {
  throw new Error('The review playbook is only sent after the server accepts a request.')
}

const playbook: PlaybookDocument = {
  title: 'The review-request playbook',
  dek: 'A practical way for a home-service company to ask every customer for a Google review after the work is finished. One owner, one link, plain words, and a separate conversation when something went wrong.',
  sections: [
    {
      id: 'how-to-use',
      number: '01',
      title: 'How to use this',
      blocks: [
        {
          type: 'paragraph',
          text: 'Read it once with the person who closes jobs. Then put the link and the messages where that person already works: the phone, the inbox, the job sheet. You do not need new software to start.',
        },
        {
          type: 'paragraph',
          text: 'Anywhere you see [Business] or [Review link], replace the brackets with your company name and your real Google review link before you send a word to a customer. Leave the brackets in and the message looks unfinished.',
        },
        {
          type: 'note',
          title: 'What this is not',
          text: 'It is not a promise about your star rating, your ranking, or how many calls you will get. It is a habit for asking, the same way, after finished work.',
        },
      ],
    },
    {
      id: 'assign-an-owner',
      number: '02',
      title: 'Assign an owner',
      blocks: [
        {
          type: 'paragraph',
          text: 'Reviews go quiet when “the office” is supposed to ask and nobody’s name is on it. Pick one person. Usually that is the owner, the office manager, or whoever already marks a job complete. Their job is not to beg. Their job is to send the same request, the same way, after every job that is actually finished.',
        },
        {
          type: 'paragraph',
          text: 'Write the name down. Tell that person this is part of closing the job, not extra credit after hours. If they are out, a backup sends it. Name the backup before the week starts. A system with no owner becomes a good intention.',
        },
        {
          type: 'list',
          items: [
            'Confirm the job is complete and the customer has what you were hired to do.',
            'Send the request the same day, or the next morning if you finished late.',
            'Mark that it was sent: a check on the work order, a column on the sheet, or a note in the system you already use.',
            'Send one follow-up only when the rules below say to.',
            'Hand a complaint to whoever can fix the work. Do not hold the review link hostage while you do that.',
          ],
        },
        {
          type: 'note',
          title: 'If crews close their own jobs',
          text: 'The owner of the ask can still be one person. The crew lead texts them the same day: job done, customer name, and the number or email on file. One person sending the words keeps the ask from drifting into five different versions.',
        },
      ],
    },
    {
      id: 'ask-every-customer',
      number: '03',
      title: 'Ask every customer after a completed job',
      blocks: [
        {
          type: 'paragraph',
          text: 'The ask goes to every customer when the job is done. Not only the ones who smiled. Not only the big tickets. Not only the days you felt good about. A random ask, when someone remembers, is how a profile goes quiet for months.',
        },
        {
          type: 'paragraph',
          text: '“Completed” means the work you were hired to do is finished, the place is left the way you promised, and the customer knows you are done. Do not ask halfway through a multi-day job. Do not ask before a walkthrough if that walkthrough is how you finish.',
        },
        {
          type: 'paragraph',
          text: 'Same timing, same words, same link. That is the whole method. The owner does not decide who is allowed to review. Skip the ask only in these cases:',
        },
        {
          type: 'list',
          items: [
            'No working phone or email on file. Get it on the next job before you leave.',
            'The job was canceled before any work was done. There is nothing to review.',
            'They asked you not to contact them. Respect that and note it.',
          ],
        },
        {
          type: 'note',
          title: 'A rough day is not an exception',
          text: 'If the customer is unhappy, use the section on concerns. You still do not sort people into “gets the link” and “does not.” The list above is about missing contact info, no work performed, or a request to stop. It is not a filter for mood.',
        },
      ],
    },
    {
      id: 'google-review-link',
      number: '04',
      title: 'Use a direct Google review link',
      blocks: [
        {
          type: 'paragraph',
          text: 'Do not send people to Google and hope they search your name. Give them the review box for the location that did the work. Google provides that link on the Business Profile. You copy it. You do not invent it.',
        },
        {
          type: 'steps',
          items: [
            'Sign in at business.google.com as a manager of the location.',
            'Open the location that did the job. If you have more than one shop or city, each one has its own link.',
            'Find the control for asking for reviews or sharing the review form. Copy the link Google shows you. It is a Google address, often a short g.page or search.google.com link, with “review” in it.',
            'Paste it into a private note. Open it on your phone without coaching the page. You should land where a customer can write a review of your business, not a search page and not a different company with a similar name.',
            'Save the working link next to the message templates. Do not retype it for each job.',
          ],
        },
        {
          type: 'note',
          title: 'If the button is not where you remember',
          text: 'Google moves labels. Search Google’s own help for how to get a link to ask for reviews from your Business Profile, then test the result. Do not guess a place id and build a link from memory. A wrong link sends a customer to the wrong listing, or nowhere. Skip extra link shorteners. The Google link is already short, and a mystery redirect makes people hesitate.',
        },
      ],
    },
    {
      id: 'first-message',
      number: '05',
      title: 'Send a short, honest first message',
      blocks: [
        {
          type: 'paragraph',
          text: 'Send it while the work is still fresh. The same day is best. The next morning is fine if you finished after dinner. Say who you are, point at the job you just finished, and ask for an honest review. Do not tell them how many stars to leave. Do not ask them to write it only if they were happy.',
        },
        {
          type: 'paragraph',
          text: 'You can add a first name when you are sure you have the right person, and you can name the job (“the water heater”, “the roof repair”) when that makes the note clearer. Do not add a discount, a gift, or an entry in a drawing.',
        },
        {
          type: 'template',
          label: 'Text message',
          body: 'Hi, this is [Business]. Thanks for having us out. The job we just finished is wrapped up. If you have a minute, an honest Google review helps the next person know what to expect: [Review link]',
        },
        {
          type: 'template',
          label: 'Email',
          subject: 'A Google review for [Business]?',
          body: 'Hi,\n\nThis is [Business]. Thank you for trusting us with the job we just finished.\n\nIf you have a minute, an honest Google review helps your neighbors decide who to call. Whatever your experience was, the link is the same:\n\n[Review link]\n\nThank you,\n[Business]',
        },
        {
          type: 'note',
          title: 'Before the first real send',
          text: 'Read it out loud. If it sounds like a script from a billboard, cut words until it sounds like you. Keep the link. Keep the word honest. Then save it as the template the owner actually uses, so the next fifty jobs are not rewritten from scratch.',
        },
      ],
    },
    {
      id: 'one-follow-up',
      number: '06',
      title: 'One courteous follow-up',
      blocks: [
        {
          type: 'paragraph',
          text: 'Most people are busy. One reminder is courteous. A second reminder starts to feel like pressure, and pressure is how you get reviews you would not want read out loud. Send the follow-up only when all of this is true: you sent the first message, three to five days have passed, they have not told you they left a review, and they have not asked you to stop.',
        },
        {
          type: 'paragraph',
          text: 'Then stop. Do not call to ask if they saw the text unless you are calling about the work itself. Do not send a third note next week. The owner’s list should show “first sent” and “follow-up sent” so a different person does not nudge them again.',
        },
        {
          type: 'template',
          label: 'Follow-up text',
          body: 'Hi, this is [Business] again. One follow-up in case the review link got buried. No trouble if now is a bad time: [Review link]',
        },
        {
          type: 'template',
          label: 'Follow-up email',
          subject: 'One follow-up from [Business]',
          body: 'Hi,\n\nI sent a note a few days ago with a link to leave a Google review for the job we finished. If you already left one, thank you. You can ignore this.\n\nIf not, here is the link again:\n\n[Review link]\n\nThis is the only reminder we send.\n\nThank you,\n[Business]',
        },
        {
          type: 'note',
          title: 'When to skip the follow-up',
          text: 'Skip it if they replied, if they asked you not to text, if the first message bounced, or if you are in the middle of fixing a problem and another ping would be noise. Fixing the job comes first. The follow-up is not a way to outrun a complaint.',
        },
      ],
    },
    {
      id: 'concerns',
      number: '07',
      title: 'Handle concerns separately from the review',
      blocks: [
        {
          type: 'paragraph',
          text: 'Sometimes the job was not right. A leak came back. The color is off. They are frustrated. That is a service conversation. Call them. Go back if you need to. Fix what you agreed to fix. Do that because the work was yours, not because you are managing a star.',
        },
        {
          type: 'paragraph',
          text: 'Their ability to leave a review is a different thing. Do not withhold the link until they say they are happy. Do not run a private “how did we do?” score that sends only the high scores to Google. Do not make a repair conditional on them changing or removing a review. Those moves hide the public record from the people who had a hard time, and they teach the crew that the ask is a filter.',
        },
        {
          type: 'paragraph',
          text: 'You can say both things in the same human conversation: you are sorry it was not right, you are going to fix it, and they are welcome to describe what happened in a Google review. The link is the same one you send everyone. If they want to talk first, listen. Fix the job. The link still stands. If they later want to add to their review, that is their choice. Do not script it.',
        },
        {
          type: 'list',
          items: [
            'Answer a public review that describes a problem the way you would want to be spoken to: thank them, say you are on it, and take the details offline.',
            'Do not argue in the reply, and do not offer a gift to change the stars.',
            'Bring the real issue to the person who can fix the operation. A review that says you left a mess is more useful in a crew meeting than on a trophy wall.',
          ],
        },
        {
          type: 'note',
          title: 'Two tracks, on purpose',
          text: 'Track one is the repair: who owns the callback, when you will be there, and how you will know it is done. Track two is the review link, already sent or still owed because you send it to everyone. Do not merge the tracks into “we will send the link after they cool off.”',
        },
      ],
    },
    {
      id: 'rollout',
      number: '08',
      title: 'Roll it out this week',
      blocks: [
        {
          type: 'paragraph',
          text: 'You need the owner, the link, and a place to mark that the ask went out. A notebook column is enough. A checkbox you already have is enough. Do not wait for a perfect setup.',
        },
        {
          type: 'steps',
          items: [
            'Name the owner and the backup. Tell them this is part of closeout.',
            'Copy the Google review link and test it on a phone.',
            'Paste the text into the phone or texting tool they already use. Paste the email where they send mail. Replace [Business] and [Review link]. Leave the customer’s details to fill in per job.',
            'Add one mark to job closeout: “Review request sent,” with the date.',
            'Use it on the next five completed jobs, including the ordinary ones. Five in a row shows you whether the link is wrong, the wording is stiff, or the owner is too buried at the end of the day.',
            'Fix what those five jobs exposed. Then keep the same ask. Do not redesign it every Monday.',
          ],
        },
        {
          type: 'paragraph',
          text: 'After two weeks, look at whether the ask is going out the same day or sliding to “sometime next week.” If it is sliding, the problem is the closeout habit, not the adjectives in the text. Move the step earlier in the way you finish a job: before the truck leaves, or as the last line on the invoice the owner already touches.',
        },
      ],
    },
    {
      id: 'what-to-measure',
      number: '09',
      title: 'What to measure',
      blocks: [
        {
          type: 'paragraph',
          text: 'Count things you can see on your own jobs. Once a week, the owner writes down a few marks. Keep it small enough that it still happens on a busy Friday.',
        },
        {
          type: 'list',
          items: [
            'Jobs completed.',
            'Review requests actually sent.',
            'Follow-ups sent.',
            'Customers who asked you not to contact them.',
            'New Google reviews that showed up. Read them. The count is not the point by itself.',
            'Jobs where a concern came in, and whether someone called the customer back.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The useful question is: of the jobs we finished, how many got the ask on the same day? If that number is low, fix the handoff. Do not shop for a sharper adjective.',
        },
        {
          type: 'paragraph',
          text: 'Read every new review and notice what people mention: showed up when you said, explained the price, left a mess, had to come back. Share the useful parts with the crew. Skip the victory lap.',
        },
        {
          type: 'note',
          title: 'What these notes will not tell you',
          text: 'They will not tell you that your rating will hit a certain number, or that reviews will turn into a certain number of leads, or that one sentence beats another by a percentage. Watch your own profile over the next couple of months and keep the habit. That is the measurement. Do not tape someone else’s statistic to the wall and call it yours.',
        },
      ],
    },
    {
      id: 'what-to-leave-out',
      number: '10',
      title: 'What to leave out',
      blocks: [
        {
          type: 'paragraph',
          text: 'The habit works because the reviews are from real customers, about real jobs, asked the same way. The shortcuts below wreck that, and several of them conflict with Google’s rules on reviews. Leave them out even when a slow month makes them tempting.',
        },
        {
          type: 'list',
          items: [
            'Do not pay, discount, gift, or enter people into a drawing in exchange for a review.',
            'Do not ask only the happy jobs, and do not hide the Google link behind a private score.',
            'Do not buy reviews, and do not ask friends or family to pose as customers.',
            'Do not post reviews from accounts you control, and do not write the review and ask them to paste it.',
            'Do not promise a star rating, a map ranking, or a pile of leads from this habit.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Start with the next job you close. The owner sends the ask. The link is the real one. The words are honest. One follow-up, then you leave it alone.',
        },
        {
          type: 'link',
          href: '/contact',
          label: 'Talk with Kickbord',
          text: 'if you want this tied to the way you already finish a job, so nobody has to remember it at the end of the day. The steps above work with a phone and a notebook either way.',
        },
      ],
    },
  ],
}

export function getReviewPlaybook(): PlaybookDocument {
  return playbook
}
