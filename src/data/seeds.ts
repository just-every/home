import type { Seed, SeedImage, SeedImageKind } from './seed-types';

export type {
  Seed,
  SeedImage,
  SeedImageKind,
  SeedReel,
  SeedStatus,
} from './seed-types';

const dir = (slug: string) => `/seeds/${slug}`;

function shot(
  slug: string,
  name: string,
  width: number,
  height: number,
  alt: string,
  kind: SeedImageKind = 'app'
): SeedImage {
  return {
    src: `${dir(slug)}/${name}.webp`,
    src800: `${dir(slug)}/${name}-800.webp`,
    width,
    height,
    alt,
    kind,
  };
}

function reel(slug: string, durationSeconds: number) {
  return {
    src: `/video/reels/${slug}-1080.mp4`,
    src720: `/video/reels/${slug}-720.mp4`,
    poster: `/video/reels/${slug}-poster.webp`,
    durationSeconds,
  };
}

/**
 * The 14 active seeds in collection order: the owner's favourites (Uptime,
 * HappyToHelp, Nook) first. Facts come from the copy deck (COPY.md) and
 * seeds.json; where they disagree the copy deck wins. Orbit's headline is null
 * because the deck says none is final. Accent, ink and paper match each
 * product's own brand tokens; `pastel` softens one of them so all fourteen sit
 * together as a set.
 */
export const seeds: Seed[] = [
  {
    slug: 'uptime',
    name: 'Uptime',
    category: 'Uptime monitoring',
    replaces: ['UptimeRobot', 'Pingdom', 'Better Stack'],
    primaryReplace: 'Pingdom',
    line: 'Alerts you only when a failure is confirmed.',
    headline: 'Sleep through the night.',
    repo: 'https://github.com/just-every/run-uptime',
    status: 'public',
    accent: '#e8894f',
    ink: '#14204a',
    paper: '#f7f6fb',
    // Pastel from ink: the night-sky lavender of its own homepage.
    pastel: '#cfccf4',
    markOnPastel: 'colour',
    mark: `${dir('uptime')}/mark.svg`,
    markLight: `${dir('uptime')}/mark-light.svg`,
    markInk: null,
    images: [
      shot(
        'uptime',
        'app-1',
        1600,
        1000,
        'Uptime’s monitors overview: healthy, failing, unknown and degraded counts with per-monitor evidence'
      ),
      shot(
        'uptime',
        'app-2',
        1600,
        1000,
        'Uptime monitor detail: a failing Checkout API with its recent check results and evidence coverage'
      ),
      shot(
        'uptime',
        'app-3',
        1600,
        1000,
        'Uptime notifications: destinations and a proven alert drill'
      ),
    ],
    reel: reel('uptime', 29.1),
  },
  {
    slug: 'happytohelp',
    name: 'HappyToHelp',
    category: 'Customer support',
    replaces: ['Zendesk', 'Intercom', 'Help Scout', 'Freshdesk'],
    primaryReplace: 'Intercom',
    line: 'Your Codex or Claude fixes the problem and writes the reply.',
    headline: 'Customer Support, Solved.',
    repo: 'https://github.com/just-every/happytohelp',
    status: 'public',
    accent: '#8fe3ee',
    ink: '#141414',
    paper: '#f6f2ea',
    pastel: '#a9e5ed',
    markOnPastel: 'ink',
    mark: `${dir('happytohelp')}/mark.svg`,
    markLight: null,
    markInk: `${dir('happytohelp')}/mark-ink.svg`,
    images: [
      shot(
        'happytohelp',
        'app-1',
        1440,
        900,
        'HappyToHelp’s inbox with a customer conversation, an internal note and agent-suggested replies'
      ),
      shot(
        'happytohelp',
        'app-2',
        1440,
        1000,
        'HappyToHelp’s setup checklist: add the widget, connect an AI service'
      ),
      shot(
        'happytohelp',
        'app-3',
        1440,
        844,
        'HappyToHelp’s empty inbox welcome, with an install-the-widget action'
      ),
    ],
    reel: null,
  },
  {
    slug: 'nook',
    name: 'Nook',
    category: 'Team chat',
    replaces: ['Slack', 'Microsoft Teams'],
    primaryReplace: 'Slack',
    line: 'Team chat where a message becomes a decision.',
    headline: 'Talk it through. Get it done.',
    repo: null,
    status: 'soon',
    accent: '#c24e5b',
    ink: '#2a1d21',
    paper: '#faf5ef',
    pastel: '#fbc2c4',
    markOnPastel: 'ink',
    mark: `${dir('nook')}/mark.svg`,
    markLight: null,
    markInk: null,
    images: [
      shot(
        'nook',
        'app-1',
        1440,
        900,
        'A Nook channel conversation with message actions and the decisions counter'
      ),
      shot(
        'nook',
        'home-1',
        1440,
        689,
        'Nook’s homepage section: the “What needs you” attention list beside the hourglass drawing',
        'homepage-section'
      ),
      shot('nook', 'home-2', 1440, 900, 'Nook’s homepage hero', 'homepage'),
    ],
    reel: null,
  },
  {
    slug: 'lamp',
    name: 'Lamp',
    category: 'Status page',
    replaces: ['Atlassian Statuspage', 'Instatus', 'Better Stack'],
    primaryReplace: 'Statuspage',
    line: 'The status page that never leaves your customers in the dark.',
    headline: 'When something breaks, turn the light on.',
    repo: 'https://github.com/just-every/run-lamp',
    status: 'public',
    accent: '#f4c25c',
    ink: '#182d24',
    paper: '#f8f6f0',
    pastel: '#fbde9c',
    markOnPastel: 'ink',
    mark: `${dir('lamp')}/mark.svg`,
    markLight: `${dir('lamp')}/mark-light.svg`,
    markInk: null,
    images: [
      shot(
        'lamp',
        'app-1',
        1600,
        900,
        'Lamp’s public status page: overall status, 90-day component availability and incident history'
      ),
      shot(
        'lamp',
        'app-2',
        1600,
        900,
        'Lamp’s public status page during a major outage, with the live incident'
      ),
      shot(
        'lamp',
        'app-3',
        1600,
        900,
        'An operator composing a public incident update in Lamp, with a live customer preview'
      ),
    ],
    reel: reel('lamp', 55.5),
  },
  {
    slug: 'cradle',
    name: 'Cradle',
    category: 'Structured database',
    replaces: ['Airtable', 'Smartsheet'],
    primaryReplace: 'Airtable',
    line: 'Records, views and forms in one workspace.',
    headline: 'Everything comes together in one place.',
    repo: 'https://github.com/just-every/run-cradle',
    status: 'public',
    accent: '#d7f25b',
    ink: '#12372e',
    paper: '#f3f3ee',
    pastel: '#d8ea99',
    markOnPastel: 'ink',
    mark: `${dir('cradle')}/mark.svg`,
    markLight: null,
    markInk: null,
    images: [
      shot(
        'cradle',
        'app-1',
        1440,
        1000,
        'Cradle records: tables, saved views, forms and templates in one workspace'
      ),
      shot(
        'cradle',
        'app-2',
        1440,
        900,
        'A Cradle timeline view over campaign milestones'
      ),
      shot(
        'cradle',
        'app-3',
        1440,
        900,
        'A Cradle member record with its linked loans'
      ),
    ],
    reel: null,
  },
  {
    slug: 'vector',
    name: 'Vector',
    category: 'Work tracker',
    replaces: ['Linear', 'Jira', 'Asana'],
    primaryReplace: 'Linear',
    line: "Issue tracking that shows what's now, what's next and why.",
    headline: 'Know what happens next.',
    repo: 'https://github.com/just-every/run-vector',
    status: 'public',
    accent: '#2446dc',
    ink: '#171a20',
    paper: '#f4f0e6',
    pastel: '#b1c8fe',
    markOnPastel: 'colour',
    mark: `${dir('vector')}/mark.svg`,
    markLight: null,
    markInk: null,
    images: [
      shot(
        'vector',
        'app-1',
        1280,
        900,
        'Vector’s current stream: reports needing a decision, with the selected issue and its evidence'
      ),
      shot(
        'vector',
        'app-2',
        1280,
        900,
        'A Vector issue with the evidence and policy recommendation behind it'
      ),
      shot(
        'vector',
        'app-3',
        1280,
        900,
        'Vector’s projects portfolio with explainable health: at risk, on track and unknown'
      ),
    ],
    reel: null,
  },
  {
    slug: 'slate',
    name: 'Slate',
    category: 'Knowledge wiki',
    replaces: ['Notion', 'Confluence', 'Guru'],
    primaryReplace: 'Notion',
    line: 'Pages, databases and search in one wiki.',
    headline: 'One home for everything your team knows.',
    repo: 'https://github.com/just-every/run-slate',
    status: 'public',
    accent: '#526f62',
    ink: '#1b1b18',
    paper: '#f6f3e8',
    pastel: '#b6dbca',
    markOnPastel: 'colour',
    mark: `${dir('slate')}/mark.svg`,
    markLight: null,
    markInk: null,
    images: [
      shot(
        'slate',
        'app-1',
        1440,
        1000,
        'A Slate wiki page with the version history panel open, picking an earlier revision to restore as a new one'
      ),
      shot(
        'slate',
        'app-2',
        1440,
        1000,
        'A Slate wiki page open in the editor, with the page tree, search and sharing'
      ),
      shot(
        'slate',
        'app-3',
        1440,
        1000,
        'Slate’s share panel: invite people, set permission and expiry, revoke access'
      ),
    ],
    reel: null,
  },
  {
    slug: 'pencil',
    name: 'Pencil',
    category: 'Form builder',
    replaces: ['Typeform', 'Google Forms', 'Jotform'],
    primaryReplace: 'Typeform',
    line: 'Forms that ask only what fits the last answer.',
    headline: "Ask like you're listening.",
    repo: 'https://github.com/just-every/run-pencil',
    status: 'public',
    accent: '#f2b33d',
    ink: '#1e2124',
    paper: '#fbfaf6',
    pastel: '#fed07c',
    markOnPastel: 'colour',
    mark: `${dir('pencil')}/mark.svg`,
    markLight: `${dir('pencil')}/mark-light.svg`,
    markInk: null,
    images: [
      shot(
        'pencil',
        'brand-1',
        1200,
        630,
        'Pencil’s social card: a handwritten note card and a pencil',
        'brand-card'
      ),
      shot(
        'pencil',
        'stale-1',
        1280,
        900,
        'Pencil’s results screen: starts, completion and device split (an earlier dark interface)',
        'app-stale'
      ),
    ],
    reel: null,
  },
  {
    slug: 'orbit',
    name: 'Orbit',
    category: 'Sales CRM',
    replaces: ['HubSpot', 'Pipedrive', 'Salesforce'],
    primaryReplace: 'HubSpot',
    line: 'A CRM that shows which deal to work next, and why.',
    headline: null,
    repo: null,
    status: 'soon',
    accent: '#e85b1e',
    ink: '#16171d',
    paper: '#f5f1ea',
    pastel: '#febba9',
    markOnPastel: 'colour',
    mark: `${dir('orbit')}/mark.svg`,
    markLight: null,
    markInk: null,
    images: [
      shot(
        'orbit',
        'app-1',
        1440,
        995,
        'Orbit’s NOW queue: deals ranked by real signals, with the reason each is on top'
      ),
      shot(
        'orbit',
        'app-2',
        1440,
        1100,
        'Reviewing and confirming a follow-up in Orbit before it is sent, with cited evidence'
      ),
      shot(
        'orbit',
        'app-3',
        1440,
        1008,
        'Orbit’s signal sources feeding customer activity into the app'
      ),
    ],
    reel: null,
  },
  {
    slug: 'mango',
    name: 'Mango',
    category: 'Newsletters',
    replaces: ['Mailchimp', 'Klaviyo'],
    primaryReplace: 'Mailchimp',
    line: 'Newsletters that go only to people who said yes.',
    headline: 'Newsletters people are glad to get.',
    repo: null,
    status: 'soon',
    accent: '#f6b828',
    ink: '#1d1b17',
    paper: '#fbf7ee',
    pastel: '#ffca9c',
    markOnPastel: 'colour',
    mark: `${dir('mango')}/mark.svg`,
    markLight: null,
    markInk: null,
    images: [
      shot(
        'mango',
        'app-1',
        1440,
        900,
        'Reviewing a Mango campaign: approval checks, edit draft, approve and schedule'
      ),
      shot(
        'mango',
        'app-2',
        1440,
        900,
        'A saved Mango revision previewed in desktop and mobile email'
      ),
      shot(
        'mango',
        'app-3',
        1440,
        900,
        'An approved and scheduled Mango letter with its exact revision locked'
      ),
    ],
    reel: null,
  },
  {
    slug: 'dial',
    name: 'Dial',
    category: 'Scheduling',
    replaces: ['Calendly', 'Acuity Scheduling', 'SavvyCal'],
    primaryReplace: 'Calendly',
    line: 'Booking pages that check your live calendar.',
    headline: "Pick a time. That's it.",
    repo: null,
    status: 'soon',
    accent: '#dcab3c',
    ink: '#1d1c1a',
    paper: '#f4f1ea',
    pastel: '#e4d4b5',
    markOnPastel: 'ink',
    mark: `${dir('dial')}/mark.svg`,
    markLight: null,
    markInk: null,
    images: [
      shot(
        'dial',
        'stale-1',
        1440,
        1024,
        'Dial’s operator bookings workspace (an earlier green interface, before the rebrand)',
        'app-stale'
      ),
      shot(
        'dial',
        'stale-2',
        1440,
        1000,
        'Dial’s invitee page for picking a time (an earlier green interface, before the rebrand)',
        'app-stale'
      ),
    ],
    reel: null,
  },
  {
    slug: 'penny',
    name: 'Penny',
    category: 'Customer feedback',
    replaces: ['Canny', 'UserVoice', 'Productboard'],
    primaryReplace: 'Canny',
    line: 'Collect requests, and tell everyone who asked when it ships.',
    headline: 'Every customer, heard.',
    repo: null,
    status: 'soon',
    accent: '#c85d2f',
    ink: '#20211f',
    paper: '#faf7ef',
    pastel: '#e7b99e',
    markOnPastel: 'colour',
    mark: `${dir('penny')}/mark.svg`,
    markLight: null,
    markInk: null,
    images: [
      shot(
        'penny',
        'stale-1',
        1536,
        1101,
        'Penny’s operator overview: decisions, evidence and delivery promises (an earlier indigo interface, before the current brand)',
        'app-stale'
      ),
    ],
    reel: null,
  },
  {
    slug: 'oncall',
    name: 'Oncall',
    category: 'On-call rotas',
    replaces: ['PagerDuty', 'Opsgenie'],
    primaryReplace: 'PagerDuty',
    line: "Who's on now, who's next, and when they hand over.",
    headline: "Everyone knows who's on call.",
    repo: null,
    status: 'soon',
    accent: '#d48f7f',
    ink: '#1d2a35',
    paper: '#f8f0e3',
    // Pastel from ink: the dusk blue its rota uses for who is next.
    pastel: '#bfd1ea',
    markOnPastel: 'colour',
    mark: `${dir('oncall')}/mark.svg`,
    markLight: `${dir('oncall')}/mark-light.svg`,
    markInk: null,
    images: [
      shot(
        'oncall',
        'stale-1',
        1536,
        1024,
        'Oncall’s incident coordination screen (an earlier interface, before the brand refresh)',
        'app-stale'
      ),
    ],
    reel: null,
  },
  {
    slug: 'spool',
    name: 'Spool',
    category: 'Error tracking',
    replaces: ['Sentry', 'Bugsnag', 'Rollbar'],
    primaryReplace: 'Sentry',
    line: 'JavaScript errors, traced to the exact line in your source.',
    headline: 'See exactly what broke.',
    repo: null,
    status: 'soon',
    accent: '#f9d357',
    ink: '#1c1c1b',
    paper: '#f3f0e6',
    pastel: '#f7e890',
    markOnPastel: 'colour',
    mark: `${dir('spool')}/mark.svg`,
    markLight: null,
    markInk: null,
    images: [
      shot(
        'spool',
        'app-1',
        1440,
        1000,
        'Spool mapping an issue to original source lines, with the downloadable evidence packet'
      ),
      shot(
        'spool',
        'app-2',
        1440,
        914,
        'Spool’s issues list with unseen, open and resolved counts and regressions'
      ),
      shot(
        'spool',
        'app-3',
        1440,
        1074,
        'Spool’s releases and source maps: register a release and upload its map'
      ),
    ],
    reel: null,
  },
];

export const seedsBySlug: Record<string, Seed> = Object.fromEntries(
  seeds.map(seed => [seed.slug, seed])
);
