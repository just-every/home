import type { SeedArea } from '@/data/seed-types';
import { seeds } from '@/data/seeds';
import { numberWord } from '@/lib/number-word';

/**
 * Shared landing copy from the approved copy deck (COPY.md, section B),
 * verbatim. The hero copy lives in src/components/landing/hero/Hero.tsx.
 * Counts of products follow the data.
 */

export const githubOrgUrl = 'https://github.com/just-every';
export const githubReposUrl =
  'https://github.com/orgs/just-every/repositories?q=run-';

/**
 * The site's navigation. Paths are absolute ("/#all", not "#all") so the
 * header and footer work from every page; on / the anchor stays in-page.
 */
export const nav = [
  { label: 'Process', href: '/process' },
  { label: 'Journey', href: '/journey' },
  { label: 'Contact', href: '/contact' },
  { label: 'GitHub', href: githubOrgUrl },
] as const;

/**
 * The four reasons to switch, at the hero's foot (owner feedback of 14 Oct): four plain
 * reasons to switch, each a bold lead and one line.
 */
export const benefits = {
  label: 'Why switch',
  items: [
    {
      lead: 'No more per-seat bills.',
      line: 'Free to use, however big your team gets.',
    },
    {
      lead: 'Your data stays yours.',
      line: 'It runs on your computer or your own Cloudflare account.',
    },
    {
      lead: 'Change anything.',
      line: "It's your code, so you or your AI can add the feature you need.",
    },
    {
      lead: 'No price hikes, no lock-in.',
      line: 'Nobody can change the deal on you.',
    },
  ],
} as const;

export const collection = {
  id: 'all',
  heading: 'Pick your replacement.',
  /**
   * Card anatomy: mark, name, `${alternativeTo} <X>`, GitHub, what it does
   * (its line). The card opens the seed's own page, `/<slug>`.
   */
  alternativeTo: 'Alternative to',
  githubLabel: 'GitHub',
  /**
   * The small heading over each area's products, in the order the
   * collection shows the areas.
   */
  areas: {
    customers: 'Customers and sales',
    team: 'Teamwork',
    engineering: 'Engineering',
    finance: 'Finance',
    people: 'People',
    operations: 'Operations',
  } satisfies Record<SeedArea, string>,
} as const;

/**
 * The search under the collection heading (not in the copy deck: the
 * interactive brief of 13 Oct sets its label, placeholder and button).
 * Typing filters the products on the page; the button asks Claude.
 */
/** A visitor's text in quotes, shortened so a long one stays on a line or two. */
function quoted(text: string): string {
  const short = text.length > 48 ? `${text.slice(0, 46).trimEnd()}…` : text;
  return `“${short}”`;
}

export const search = {
  label: 'What do you use today?',
  placeholder: "Notion, Intercom, or 'booking client calls'",
  /** The same idea where the full placeholder would be cut off (phones). */
  placeholderShort: "Notion, or 'booking client calls'",
  button: 'Find my replacement',
  busy: 'Finding…',
  showAll: 'Back to all products',
  /**
   * Typing matched names, replaced products, categories or lines: `count`
   * released products and `soon` in the works.
   */
  instant: (count: number, soon: number, query: string) =>
    count === 0
      ? `${soon === 1 ? '1 product in the works matches' : `${soon} products in the works match`} ${quoted(query)}.`
      : `${count === 1 ? '1 product matches' : `${count} products match`} ${quoted(query)}${soon ? `, and ${soon} coming soon` : ''}.`,
  /** Typing matched nothing by name: the button matches by what it does. */
  hint: (query: string) =>
    `Press Find my replacement to match ${quoted(query)} by what it does.`,
  /** The button pressed with nothing typed. */
  empty: 'Type a product you use, or a task.',
  finding: (query: string) => `Finding the best fit for ${quoted(query)}…`,
  results: (query: string) => `Best fit for ${quoted(query)}.`,
  credit: "Picked by Claude from each product's own description.",
  noMatch: 'Nothing in the collection does that yet.',
  suggestIt: 'Suggest it',
  /** The matcher is switched off, misconfigured or failing. */
  unavailable:
    "Matching by task isn't available right now. Typing a product's name still works.",
  rateLimited: 'Too many searches from here. Try again in a minute.',
  network: "Couldn't reach the matcher. Check your connection and try again.",
} as const;

/** "What should we build next?", after the makers panel (copy from the same brief). */
export const suggest = {
  id: 'suggest',
  eyebrow: 'Requests',
  heading: 'What should we build next?',
  line: "Tell us the software you'd like an open-source version of.",
  productLabel: 'Product or task',
  productPlaceholder: "Zapier, or 'invoicing clients'",
  noteLabel: 'Anything we should know?',
  optional: 'Optional',
  emailLabel: 'Email',
  emailHint: 'Optional. Only to tell you if we build it.',
  button: 'Suggest it',
  busy: 'Sending…',
  success: "Thanks. It's on the list.",
  another: 'Suggest another',
  /** Checked on the page before sending (the same words as the server's). */
  productMissing: 'Tell us the product or task you have in mind.',
  emailInvalid: 'That email address does not look right.',
  /** Storage or the limiter is down or not set up. */
  unavailable: "Couldn't save that right now. Try again in a moment.",
  network: "Couldn't send that. Check your connection and try again.",
} as const;

export const reels = {
  id: 'running',
  heading: 'See them running.',
  line: 'Real footage of the real apps, clicked at true speed.',
  /** Caption pattern: the product name, what it does (its line), then this link. */
  githubLabel: 'Get it on GitHub',
} as const;

/** Video accessibility label: `Demo of <Name> running: <one line from the card>`. */
export function demoLabel(name: string, line: string): string {
  return `Demo of ${name} running: ${line}`;
}

/**
 * "Nothing to upsell." (owner brief of 13 Oct; its line made plain on 14
 * Oct): a free product has no premium tier to sell. Each example is a
 * product's own line from seeds.ts, shown beside its real mark; `examples`
 * lists the slugs, in order.
 */
export const nothingToUpsell = {
  id: 'why-free',
  eyebrow: 'Why free',
  heading: 'Nothing to upsell.',
  line: 'No premium tier, no upgrade nags. Every feature is already yours.',
  examples: ['happytohelp', 'uptime', 'nook'],
  listLabel: 'Three products, and what each one does',
} as const;

export const questions = {
  id: 'questions',
  heading: "Surely this can't work?",
  line: "Fair. We'd ask too.",
  items: [
    {
      question: "Free? What's the catch?",
      answer:
        'No catch. Every one is MIT licensed and 100% free. Take it, run it, change it.',
    },
    {
      question: `${numberWord(seeds.length, true)} products? From one team?`,
      answer:
        'Coding agents write the code. We decide what good looks like, write it down as a contract, and ship the tests with it.',
    },
    {
      question: 'Is it a real product or a demo?',
      answer:
        "Real. Run the three lines further down this page and you're signed in to the whole app on your own computer.",
    },
    {
      question: 'What happens when it breaks?',
      answer:
        "It's your code, so you or your coding agent can fix it on the spot. Every repo ships instructions written for agents, and our fixes arrive as tagged releases.",
    },
    {
      question: 'Where does my data live?',
      answer:
        "Wherever you run it: your computer, or your own Cloudflare account, in a database that's yours.",
    },
    {
      question: 'Does it do everything Notion does?',
      answer:
        "No, and it isn't trying to. Each one does its job properly, and the source is yours if you need more.",
    },
  ],
} as const;

export const stand = {
  heading: 'Built to be good, not just to exist.',
  lines: [
    "Code is nearly free now. Good software still isn't: someone has to care how it works, how it looks and what it promises.",
  ],
  points: [
    {
      title: 'Written down.',
      text: "Every product lists exactly what it does, and what it doesn't.",
    },
    { title: 'Checked.', text: 'One command runs all its checks.' },
    { title: 'Yours.', text: 'MIT licensed. Change anything you like.' },
  ],
} as const;

export const runOne = {
  heading: 'Run one yourself.',
  line: 'Install the command once, then clone a product and start it.',
  commands: [
    'npx -y @runeditrun/rer cli install',
    'git clone https://github.com/just-every/run-uptime',
    'cd run-uptime && rer dev',
  ],
  altLine: {
    before: 'No npm?',
    command: 'curl -fsSL https://runeditrun.com/install.sh | sh',
    after: 'installs the same command.',
  },
} as const;

export const makers = {
  heading: 'Made something this good?',
  line: "Just Every is open to more makers. If you've built a free, open-source alternative with this much care, we'd love to see it.",
  welcome: 'Issues, pull requests and collaborators are welcome on every repo.',
  link: { label: 'Say hello on GitHub', href: githubOrgUrl },
  reposLink: { label: 'Browse the repos', href: githubReposUrl },
} as const;

/**
 * The footer over the art's sky: the wordmark, one line of small print and
 * the site's links in two short columns. With a measured token count the
 * line is `${tokensBefore}<N>${tokensAfter}`; without one, or when the count
 * cannot be read, it is `line`. The collection is the home page itself, so
 * the footer does not link to it.
 */
export const footer = {
  groups: [
    {
      heading: 'Essays',
      links: [
        { label: 'Process', href: '/process' },
        { label: 'Journey', href: '/journey' },
      ],
    },
    {
      heading: 'Get in touch',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'GitHub', href: githubOrgUrl },
      ],
    },
  ],
  line: 'Made with care and a lot of coding agents.',
  tokensBefore: 'Made with care and ',
  tokensAfter: ' tokens.',
} as const;

/** The 404 page. */
export const notFound = {
  heading: 'Nothing here.',
  line: "This page doesn't exist, or it has moved.",
  home: 'Back to Just Every',
} as const;
