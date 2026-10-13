/**
 * Shared landing copy from the approved copy deck (COPY.md, section B),
 * verbatim. The hero is deliberately absent: each variant owns its own.
 */

export const githubOrgUrl = 'https://github.com/just-every';

export const wordmark = 'JustEvery_';

export const nav = [
  { label: 'Products', href: '#all' },
  { label: 'Watch', href: '#running' },
  { label: 'Questions', href: '#questions' },
  { label: 'GitHub', href: githubOrgUrl },
] as const;

export const collection = {
  id: 'all',
  heading: 'Pick your replacement.',
  line: "Fourteen products so far, each one an alternative to software you're probably paying for.",
  /** Use instead of `line` if the owner prefers no number. */
  lineWithoutNumber:
    "Each one an alternative to software you're probably paying for.",
  /** Card anatomy: Name, `${alternativeTo} <X>`, one line, repo state. */
  alternativeTo: 'Alternative to',
  githubLabel: 'GitHub',
  /** A quiet pill with no link, not a disabled button. */
  notYetPublicLabel: 'Opening soon',
  /** Shown only on cards whose reel is on the page. */
  watchLabel: 'Watch it run',
} as const;

export const reels = {
  id: 'running',
  heading: 'See them running.',
  line: 'Real footage of the real apps, clicked at true speed.',
  /** Caption pattern: the product name, the seed's own headline, then this link. */
  githubLabel: 'Get it on GitHub',
} as const;

/** Video accessibility label: `Demo of <Name> running: <one line from the card>`. */
export function demoLabel(name: string, line: string): string {
  return `Demo of ${name} running: ${line}`;
}

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
      question: 'Fourteen products? From one team?',
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
      question: 'Can I really change anything?',
      answer:
        "Anything: screens, data, workflows, the lot. It's all source, with no locked core.",
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
  heading: 'Quality is the product.',
  lines: [
    "Code is nearly free now. Good software still isn't: someone has to care how it works, how it looks and what it promises.",
  ],
  points: [
    {
      title: 'Written down.',
      text: "Every product ships a contract: what it does, and what it doesn't.",
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
  afterLine:
    'It installs, sets up a local owner and prints a link that opens the app, signed in.',
  altLine: {
    before: 'No npm?',
    command: 'curl -fsSL https://runeditrun.com/install.sh | sh',
    after: 'installs the same command.',
  },
} as const;

export const makers = {
  heading: 'Made something this good?',
  line: "Just Every is open to more makers. If you've built a free, open-source alternative with this much care, we'd love to see it.",
  link: { label: 'Say hello on GitHub', href: githubOrgUrl },
} as const;

export const footer = {
  line: 'High-quality open-source alternatives to the software you rent.',
  links: [
    { label: 'Products', href: '#all' },
    { label: 'GitHub', href: githubOrgUrl },
  ],
  smallPrint:
    'Every product MIT licensed. Made with care, and a lot of coding agents.',
} as const;
