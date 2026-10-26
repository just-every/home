import { collection } from '@/content/landing';
import { numberWord } from '@/lib/number-word';

/**
 * Seeds in the works: public repository, no release tag yet, so not in the
 * collection. They are listed apart from `seeds.ts` and shown quietly (no
 * reel, not selectable), and the collection's search finds them as coming
 * soon; a seed's own page links its live homepage and shows a 1280x720
 * still of it. Each category and line was written true to that homepage's
 * headline and subhead (17 Oct 2026); the pastel keeps the seed's own brand
 * hue at the lightness and softness of the collection's pastels. A tag on one
 * is reported by `npm run seeds:sync`; moving it to `seeds.ts` is a decision
 * (Auth stays here by owner intent). `replaces` lists the products named in
 * the homepage's "alternative to" line, in that line's order, and
 * `primaryReplace` is the first of them; the sync keeps both, the mark, the
 * pastel and the still current.
 */
export interface UpcomingSeed {
  slug: string;
  accent: string;
  ink: string;
  paper: string;
  name: string;
  /** What the seed is, in a few words. */
  category: string;
  /** Every incumbent the homepage's "alternative to" line names, in its order. */
  replaces: string[];
  /** The one incumbent named on the card: the first of `replaces`. */
  primaryReplace: string;
  /** What the product does, in one plain line. */
  line: string;
  /** Public GitHub repository. */
  repo: string;
  /** As on a released seed (seed-types.ts): the live homepage, or null. */
  homepage: string | null;
  /** As on a released seed: a 1280x720 still of `homepage`, or null. */
  homepageShot: string | null;
  /** Brand hue softened to a pastel (OKLCH, lightness 0.87 to 0.90). */
  pastel: string;
  mark: string;
}

const mark = (slug: string) => `/seeds/${slug}/mark.svg`;
const repo = (slug: string) => `https://github.com/just-every/run-${slug}`;
const homepage = (slug: string) => `https://run-${slug}.com`;
const shot = (slug: string) => `/seeds/${slug}/home.webp`;

export const upcoming: UpcomingSeed[] = [
  {
    slug: 'auth',
    accent: '#14536e',
    ink: '#1f2428',
    paper: '#fbf8f2',
    name: 'Auth',
    category: 'Identity provider',
    replaces: ['Auth0', 'Okta', 'Microsoft Entra'],
    primaryReplace: 'Auth0',
    line: 'Email-link and passkey sign-in that you run yourself.',
    repo: repo('auth'),
    homepage: homepage('auth'),
    homepageShot: shot('auth'),
    // Pastel from src/branding.json primaryColor #14536e (hue 232).
    pastel: '#bcdbec',
    // Its mark turns light in a dark colour scheme; this copy keeps its light-surface colours.
    mark: '/seeds/auth/mark-light.svg',
  },
  {
    slug: 'blotter',
    accent: '#111111',
    ink: '#111111',
    paper: '#ffffff',
    name: 'Blotter',
    category: 'Accounting practice workflow',
    replaces: ['Karbon', 'TaxDome', 'Canopy'],
    primaryReplace: 'Karbon',
    line: 'Recurring client jobs, document requests and sign-off for accounting practices.',
    repo: repo('blotter'),
    homepage: homepage('blotter'),
    homepageShot: shot('blotter'),
    // Pastel from the lilac of its mark's calendar (#b88aee, hue 304); its brand colour is black.
    pastel: '#dfccfa',
    mark: mark('blotter'),
  },
  {
    slug: 'crank',
    accent: '#011646',
    ink: '#061943',
    paper: '#f3f8fd',
    name: 'Crank',
    category: 'Workflow automation',
    replaces: ['Zapier', 'Make', 'Workato'],
    primaryReplace: 'Zapier',
    line: 'Workflow automation that connects your apps and retries what fails.',
    repo: repo('crank'),
    homepage: homepage('crank'),
    homepageShot: shot('crank'),
    // Pastel from src/branding.json primaryColor #011646 (hue 262).
    pastel: '#c7d7f3',
    mark: mark('crank'),
  },
  {
    slug: 'evidence',
    accent: '#16181d',
    ink: '#080c1a',
    paper: '#f4f9fe',
    name: 'Evidence',
    category: 'Compliance automation',
    replaces: ['Vanta', 'Drata', 'Secureframe'],
    primaryReplace: 'Vanta',
    line: 'Tests your controls on a schedule, collects the proof and hands your auditor everything.',
    repo: repo('evidence'),
    homepage: homepage('evidence'),
    homepageShot: shot('evidence'),
    // Pastel from its --ev-spectrum sky blue (#c9e6ff); its brand colour and mark are black.
    pastel: '#c1d9ef',
    mark: mark('evidence'),
  },
  {
    slug: 'inkwell',
    accent: '#0a9e6c',
    ink: '#0b0d12',
    paper: '#ffffff',
    name: 'Inkwell',
    category: 'Electronic signatures',
    replaces: ['Docusign', 'Adobe Acrobat Sign', 'Dropbox Sign'],
    primaryReplace: 'Docusign',
    line: 'Ordered PDF signatures, with the signed file and audit trail.',
    repo: repo('inkwell'),
    homepage: homepage('inkwell'),
    homepageShot: shot('inkwell'),
    // Pastel from src/branding.json primaryColor #0a9e6c (hue 162).
    pastel: '#b3e3ca',
    mark: mark('inkwell'),
  },
  {
    slug: 'mallet',
    accent: '#2a0a2b',
    ink: '#22061f',
    paper: '#f3f7fa',
    name: 'Mallet',
    category: 'Workshop repair jobs',
    replaces: ['Tekmetric', 'Shopmonkey', 'Mitchell 1 Manager SE'],
    primaryReplace: 'Tekmetric',
    line: 'Estimates, customer authorisation, parts and labour for workshop repairs.',
    repo: repo('mallet'),
    homepage: homepage('mallet'),
    homepageShot: shot('mallet'),
    // Pastel from its rer-theme focus #0a86c2 (hue 239).
    pastel: '#b3dcf9',
    mark: mark('mallet'),
  },
  {
    slug: 'pane',
    accent: '#e8176e',
    ink: '#1f0717',
    paper: '#ffffff',
    name: 'Pane',
    category: 'Small-business website',
    replaces: ['Squarespace', 'Wix', 'WordPress.com'],
    primaryReplace: 'Squarespace',
    line: 'A five-page business site with a contact inbox and rollback.',
    repo: repo('pane'),
    homepage: homepage('pane'),
    homepageShot: shot('pane'),
    // Pastel from src/branding.json primaryColor #e8176e (hue 6).
    pastel: '#ffc4cf',
    mark: mark('pane'),
  },
  {
    slug: 'placemat',
    accent: '#16583d',
    ink: '#0b2a20',
    paper: '#fbf8f2',
    name: 'Placemat',
    category: 'Restaurant bookings',
    replaces: ['OpenTable', 'Resy', 'SevenRooms'],
    primaryReplace: 'OpenTable',
    line: 'Table bookings, walk-ins, waitlist and guest history for restaurants.',
    repo: repo('placemat'),
    homepage: homepage('placemat'),
    homepageShot: shot('placemat'),
    // Pastel from src/branding.json primaryColor #16583d (hue 162).
    pastel: '#c0dfce',
    mark: mark('placemat'),
  },
  {
    slug: 'platter',
    accent: '#1f2121',
    ink: '#1c1c24',
    paper: '#ffffff',
    name: 'Platter',
    category: 'Proposals and quotes',
    replaces: ['PandaDoc', 'Proposify', 'Better Proposals'],
    primaryReplace: 'PandaDoc',
    line: 'Two-option proposals that clients accept online.',
    repo: repo('platter'),
    homepage: homepage('platter'),
    homepageShot: shot('platter'),
    // Pastel from the blue of its current published mark (#06699c).
    pastel: '#b9dbf5',
    mark: mark('platter'),
  },
  {
    slug: 'plinth',
    accent: '#801030',
    ink: '#061320',
    paper: '#ffffff',
    name: 'Plinth',
    category: 'Contractor project management',
    replaces: ['Buildertrend', 'Procore', 'Houzz Pro'],
    primaryReplace: 'Buildertrend',
    line: 'Quotes, site diaries, variations and progress claims for builders.',
    repo: repo('plinth'),
    homepage: homepage('plinth'),
    homepageShot: shot('plinth'),
    // Pastel from src/branding.json primaryColor #801030 (hue 12).
    pastel: '#fdc5ca',
    mark: mark('plinth'),
  },
  {
    slug: 'satchel',
    accent: '#0f5c66',
    ink: '#0e333c',
    paper: '#f4f7f6',
    name: 'Satchel',
    category: 'Legal practice management',
    replaces: ['Clio', 'MyCase', 'Smokeball'],
    primaryReplace: 'Clio',
    line: 'Conflict checks, time, bills, files and deadlines for law firms.',
    repo: repo('satchel'),
    homepage: homepage('satchel'),
    homepageShot: shot('satchel'),
    // Pastel from src/branding.json primaryColor #0f5c66 (hue 208).
    pastel: '#b8dee4',
    mark: mark('satchel'),
  },
  {
    slug: 'stall',
    accent: '#ff6a13',
    ink: '#0e0e10',
    paper: '#fefefe',
    name: 'Stall',
    category: 'Online shop',
    replaces: ['Shopify', 'Squarespace Commerce', 'BigCommerce'],
    primaryReplace: 'Shopify',
    line: 'An online shop with checkout, sales tax, shipping labels and returns.',
    repo: repo('stall'),
    homepage: homepage('stall'),
    homepageShot: shot('stall'),
    // Pastel from src/branding.json primaryColor #ff6a13 (hue 44).
    pastel: '#ffc8b1',
    mark: mark('stall'),
  },
  {
    slug: 'strap',
    accent: '#6e1041',
    ink: '#1d1a2a',
    paper: '#f5f8fb',
    name: 'Strap',
    category: 'Studio management',
    replaces: ['Mindbody', 'WellnessLiving', 'Vagaro'],
    primaryReplace: 'Mindbody',
    line: 'Studio classes, pack credits, waitlists and member balances.',
    repo: repo('strap'),
    homepage: homepage('strap'),
    homepageShot: shot('strap'),
    // Pastel from src/branding.json primaryColor #6e1041 (hue 354).
    pastel: '#f7c6d8',
    mark: mark('strap'),
  },
  {
    slug: 'vane',
    accent: '#1d58f0',
    ink: '#0b0d14',
    paper: '#f5f9fd',
    name: 'Vane',
    category: 'Web analytics',
    replaces: ['Plausible', 'Fathom', 'Matomo'],
    primaryReplace: 'Plausible',
    line: 'Website visits, sources, campaigns and goals without cookies.',
    repo: repo('vane'),
    homepage: homepage('vane'),
    homepageShot: shot('vane'),
    // Pastel from src/branding.json primaryColor #1d58f0 (hue 264).
    pastel: '#c2d6fe',
    mark: mark('vane'),
  },
];

/** The words around the block, with the card's shared phrasing. */
export const comingSoon = {
  id: 'soon',
  heading: 'Coming soon.',
  line: `${numberWord(upcoming.length, true)} more in the works. Source is already public.`,
  /** Over the seeds in the works that the collection's search finds. */
  label: 'Coming soon',
  alternativeTo: collection.alternativeTo,
  githubLabel: collection.githubLabel,
} as const;
