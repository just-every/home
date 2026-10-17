import { collection } from '@/content/landing';
import { numberWord } from '@/lib/number-word';

/**
 * Seeds in the works: public repository, no release tag yet, so not in the
 * collection. They are listed apart from `seeds.ts` and shown quietly (no
 * reel, not selectable), and the collection's search finds them as coming
 * soon; a seed's own page links its live homepage and shows a still of it
 * (captured 17 Oct 2026 at 1280x720). Each category and line is true to that
 * homepage's headline and subhead (checked 17 Oct 2026, after every homepage
 * was rebuilt); the pastel keeps the seed's own brand hue at the lightness
 * and softness of the collection's pastels. A seed moves to `seeds.ts` when
 * it gets its first release tag. `replaces` lists the products named in the
 * homepage's "alternative to" line, in that line's order, and
 * `primaryReplace` is the first of them.
 */
export interface UpcomingSeed {
  slug: string;
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
    slug: 'barrow',
    name: 'Barrow',
    category: 'Wholesale ordering',
    replaces: ['B2B Wave', 'Orderspace', 'Shopify B2B'],
    primaryReplace: 'B2B Wave',
    line: 'Wholesale ordering where each stockist sees its own prices.',
    repo: repo('barrow'),
    homepage: homepage('barrow'),
    homepageShot: shot('barrow'),
    // Pastel from the blue of its mark (#2348a8); its brand colour is near-black.
    pastel: '#c2d6ff',
    mark: mark('barrow'),
  },
  {
    slug: 'blotter',
    name: 'Blotter',
    category: 'Accounting practice workflow',
    replaces: ['Karbon', 'Financial Cents', 'TaxDome'],
    primaryReplace: 'Karbon',
    line: 'Recurring client jobs, document requests and sign-off for accounting practices.',
    repo: repo('blotter'),
    homepage: homepage('blotter'),
    homepageShot: shot('blotter'),
    pastel: '#c9d6f1',
    mark: mark('blotter'),
  },
  {
    slug: 'buoy',
    name: 'Buoy',
    category: 'Customer success and renewals',
    replaces: ['Vitally', 'Planhat', 'ChurnZero'],
    primaryReplace: 'Vitally',
    line: 'Renewal dates beside billing and support evidence, each decision recorded.',
    repo: repo('buoy'),
    homepage: homepage('buoy'),
    homepageShot: shot('buoy'),
    // Pastel from the orange of its mark (#e15d0f); its brand colour is near-black.
    pastel: '#ffc8b1',
    mark: mark('buoy'),
  },
  {
    slug: 'cabin',
    name: 'Cabin',
    category: 'Vacation rental management',
    replaces: ['Guesty', 'Hostaway', 'OwnerRez'],
    primaryReplace: 'Guesty',
    line: 'Syncs your booking channels, answers guests, sends the cleaner and builds owner statements.',
    repo: repo('cabin'),
    homepage: homepage('cabin'),
    homepageShot: shot('cabin'),
    // Its colour is still the Base default #356c60; pastel from the pine green of its mark (hue 140).
    pastel: '#c2e0bb',
    mark: mark('cabin'),
  },
  {
    slug: 'coffer',
    name: 'Coffer',
    category: 'Donor management',
    replaces: ['Bloomerang', 'Little Green Light', 'Neon CRM'],
    primaryReplace: 'Bloomerang',
    line: "Takes donations, keeps every donor's story and sends the receipts and thank-yous.",
    repo: repo('coffer'),
    homepage: homepage('coffer'),
    homepageShot: shot('coffer'),
    // Pastel from the amber coin of its mark (#f39a2e, hue 65): its violet (#7c4dff) would match Chest's.
    pastel: '#f6cda6',
    mark: mark('coffer'),
  },
  {
    slug: 'crank',
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
    name: 'Inkwell',
    category: 'Electronic signatures',
    replaces: ['DocuSign', 'Dropbox Sign', 'PandaDoc'],
    primaryReplace: 'DocuSign',
    line: 'Ordered PDF signatures, with the signed file and audit trail.',
    repo: repo('inkwell'),
    homepage: homepage('inkwell'),
    homepageShot: shot('inkwell'),
    pastel: '#f0cad8',
    mark: mark('inkwell'),
  },
  {
    slug: 'lanyard',
    name: 'Lanyard',
    category: 'Rostering and timesheets',
    replaces: ['Deputy', 'When I Work', 'Homebase'],
    primaryReplace: 'Deputy',
    line: 'Weekly rosters, phone clocking and approved timesheets for payroll.',
    repo: repo('lanyard'),
    homepage: homepage('lanyard'),
    homepageShot: shot('lanyard'),
    pastel: '#bbe2bf',
    mark: mark('lanyard'),
  },
  {
    slug: 'mallet',
    name: 'Mallet',
    category: 'Workshop repair jobs',
    replaces: ['Shopmonkey', 'Tekmetric', 'RepairShopr'],
    primaryReplace: 'Shopmonkey',
    line: 'Estimates, customer authorisation, parts and labour for workshop repairs.',
    repo: repo('mallet'),
    homepage: homepage('mallet'),
    homepageShot: shot('mallet'),
    // Pastel from the red of its mark (#b4231c); its brand colour is near-black.
    pastel: '#ffc6bd',
    mark: mark('mallet'),
  },
  {
    slug: 'pane',
    name: 'Pane',
    category: 'Small-business website',
    replaces: ['Squarespace', 'Wix'],
    primaryReplace: 'Squarespace',
    line: 'A five-page business site with a contact inbox and rollback.',
    repo: repo('pane'),
    homepage: homepage('pane'),
    homepageShot: shot('pane'),
    pastel: '#bdd8fe',
    mark: mark('pane'),
  },
  {
    slug: 'placemat',
    name: 'Placemat',
    category: 'Restaurant bookings',
    replaces: ['OpenTable', 'Resy', 'SevenRooms'],
    primaryReplace: 'OpenTable',
    line: 'Table bookings, walk-ins, waitlist and guest history for restaurants.',
    repo: repo('placemat'),
    homepage: homepage('placemat'),
    homepageShot: shot('placemat'),
    // Its primaryColor #1f242b is near-black, so a pastel of its own (hue 25).
    pastel: '#fbc7c2',
    mark: mark('placemat'),
  },
  {
    slug: 'platter',
    name: 'Platter',
    category: 'Proposals and quotes',
    replaces: ['Qwilr', 'Proposify', 'PandaDoc'],
    primaryReplace: 'Qwilr',
    line: 'Two-option proposals that clients accept online.',
    repo: repo('platter'),
    homepage: homepage('platter'),
    homepageShot: shot('platter'),
    // Pastel from the teal of its mark (#8cbbba); its brand colour is near-black.
    pastel: '#b8dfde',
    // Its teal ring nearly vanishes on its own pastel: the same mark in ink.
    mark: '/seeds/platter/mark-ink.svg',
  },
  {
    slug: 'plinth',
    name: 'Plinth',
    category: 'Contractor project management',
    replaces: ['JobTread', 'Buildertrend', 'Procore'],
    primaryReplace: 'JobTread',
    line: 'Quotes, site diaries, variations and progress claims for builders.',
    repo: repo('plinth'),
    homepage: homepage('plinth'),
    homepageShot: shot('plinth'),
    pastel: '#bae1ca',
    mark: mark('plinth'),
  },
  {
    slug: 'satchel',
    name: 'Satchel',
    category: 'Legal practice management',
    replaces: ['Clio', 'MyCase', 'Smokeball'],
    primaryReplace: 'Clio',
    line: 'Conflict checks, time, bills, files and deadlines for law firms.',
    repo: repo('satchel'),
    homepage: homepage('satchel'),
    homepageShot: shot('satchel'),
    pastel: '#f0cebc',
    mark: mark('satchel'),
  },
  {
    slug: 'stall',
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
    name: 'Strap',
    category: 'Studio management',
    replaces: ['Mindbody', 'TeamUp', 'Momence'],
    primaryReplace: 'Mindbody',
    line: 'Studio classes, pack credits, waitlists and member balances.',
    repo: repo('strap'),
    homepage: homepage('strap'),
    homepageShot: shot('strap'),
    // Pastel from src/branding.json primaryColor #94174b (hue 3).
    pastel: '#ffc3d2',
    mark: mark('strap'),
  },
  {
    slug: 'terrace',
    name: 'Terrace',
    category: 'Property management',
    replaces: ['PropertyMe', 'Console Cloud', 'Buildium'],
    primaryReplace: 'PropertyMe',
    line: 'Tenancies, recorded rent, photo inspections and maintenance for landlords.',
    repo: repo('terrace'),
    homepage: homepage('terrace'),
    homepageShot: shot('terrace'),
    pastel: '#d1dabe',
    mark: mark('terrace'),
  },
  {
    slug: 'vane',
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
