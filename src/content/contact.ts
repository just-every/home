import { githubReposUrl } from './landing';

/**
 * The /contact copy: the approved deck (evidence/home/pages/CONTACT.md) with
 * the chosen design's layout. No reading or reply is promised, and no email
 * address is shown: the form is the way in.
 */
export const contactMeta = {
  title: 'Contact',
  description:
    "Questions, bugs, or something you've made? Here's how to reach Just Every, and where to go.",
  ogTitle: 'Say hello.',
} as const;

export const contact = {
  heading: 'Say hello.',
  line: "Questions, bugs, ideas, or something you've made. Here's where each one goes.",
  note: 'Open source friends are always welcome.',
} as const;

export const routes = {
  label: 'Where to go',
  bugs: {
    heading: 'Questions and bugs',
    line: "Open an issue on the product's GitHub repo. That's where the fixes happen.",
    link: 'View on GitHub',
    href: githubReposUrl,
  },
  makers: {
    heading: 'Makers',
    line: 'Built a free, open-source alternative with this much care? Tell us about it, with a link to the repo.',
    link: 'Tell us about it',
  },
  other: {
    heading: 'Everything else',
    line: 'Partnerships, ideas, feedback or a friendly note: use the form. It comes straight to us.',
    link: 'Write to us',
  },
} as const;

export const form = {
  id: 'message',
  heading: 'Send a message',
  nameLabel: 'Name',
  namePlaceholder: 'Your name',
  optional: 'Optional',
  emailLabel: 'Email',
  emailPlaceholder: 'you@domain.com',
  emailHint: 'So we can reply.',
  messageLabel: 'Message',
  placeholder: {
    general: "What's on your mind?",
    maker: 'What did you make? Paste the repo link.',
  },
  topicChip: 'About: something I made',
  topicRemove: 'Remove topic: something I made',
  button: 'Send message',
  busy: 'Sending…',
  smallPrint:
    'We store what you type here and the time you sent it. Nothing else.',
  success: 'Thanks. Your message is with us.',
  another: 'Send another',
  /** Checked on the page before sending (the server's words, or its equivalent). */
  emailMissing: 'Add your email so we can reply.',
  emailInvalid: 'That email address does not look right.',
  messageMissing: 'Write a message first.',
  /** Storage or the limiter is down or not set up. */
  unavailable: "Couldn't save that right now. Try again in a moment.",
  network: "Couldn't send that. Check your connection and try again.",
} as const;

export const open = {
  heading: 'Every repo is open.',
  line: 'Issues, pull requests and collaborators are welcome on every repo.',
  note: 'Pull requests welcome.',
} as const;
