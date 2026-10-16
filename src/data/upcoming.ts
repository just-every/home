import { collection } from '@/content/landing';

/**
 * Seeds in the works: public repository, no release tag yet, so not in the
 * collection. They are listed apart from `seeds.ts` and shown quietly (no
 * reel, no homepage, not selectable). Each line is checked against that
 * seed's README and CONTRACT.md; the pastel keeps the seed's own brand hue at
 * the lightness and softness of the collection's pastels. A seed moves to
 * `seeds.ts` when it gets its first release tag. `primaryReplace` and
 * `replaces` name what the seed's repo says it stands in for, and are empty
 * where the repo names no product.
 */
export interface UpcomingSeed {
  slug: string;
  name: string;
  /** What the seed is, in a few words. */
  category: string;
  /** Every incumbent the seed's repo names; empty where it names none. */
  replaces: string[];
  /** The one incumbent named on the card; empty where the repo names none. */
  primaryReplace: string;
  /** What the code does, in one plain line. */
  line: string;
  /** Public GitHub repository. */
  repo: string;
  /** Brand hue softened to a pastel (OKLCH, lightness 0.87 to 0.90). */
  pastel: string;
  mark: string;
}

const mark = (slug: string) => `/seeds/${slug}/mark.svg`;
const repo = (slug: string) => `https://github.com/just-every/run-${slug}`;

export const upcoming: UpcomingSeed[] = [
  {
    slug: 'balm',
    name: 'Balm',
    category: 'Clinic management',
    replaces: ['Cliniko'],
    primaryReplace: 'Cliniko',
    line: 'Bookings, intake forms, private notes and invoices for small clinics.',
    repo: repo('balm'),
    // Pastel from #356c60 (src/branding.json primaryColor, hue 177), the Base default.
    pastel: '#b5e3d7',
    mark: mark('balm'),
  },
  {
    slug: 'barrow',
    name: 'Barrow',
    category: 'Wholesale ordering',
    replaces: ['B2B Wave', 'Orderspace', 'Shopify B2B'],
    primaryReplace: 'B2B Wave',
    line: 'Wholesale ordering where each stockist sees its own prices.',
    repo: repo('barrow'),
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
    // Pastel from the orange of its mark (#e15d0f); its brand colour is near-black.
    pastel: '#ffc8b1',
    mark: mark('buoy'),
  },
  {
    slug: 'cabin',
    name: 'Cabin',
    category: 'Holiday rental operations',
    replaces: [],
    primaryReplace: '',
    line: 'Calendar imports, cleaner photo checklists and owner statements.',
    repo: repo('cabin'),
    // Pastel from #356c60, the Base default its repo has not replaced yet.
    pastel: '#b5e3d7',
    mark: mark('cabin'),
  },
  {
    slug: 'coffer',
    name: 'Coffer',
    category: 'Donor records',
    replaces: [],
    primaryReplace: '',
    line: 'Gifts, consent and acknowledgement letters for a US nonprofit.',
    repo: repo('coffer'),
    // Pastel from #356c60, the Base default its repo has not replaced yet.
    pastel: '#b5e3d7',
    mark: mark('coffer'),
  },
  {
    slug: 'crank',
    name: 'Crank',
    category: 'Workflow automation',
    replaces: ['n8n'],
    primaryReplace: 'n8n',
    line: 'Workflow automation where a person approves each run.',
    repo: repo('crank'),
    pastel: '#d1dda1',
    mark: mark('crank'),
  },
  {
    slug: 'evidence',
    name: 'Evidence',
    category: 'Audit evidence',
    replaces: ['Drata'],
    primaryReplace: 'Drata',
    line: 'Controls, proof on a schedule, gaps and expiring auditor folders.',
    repo: repo('evidence'),
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
    pastel: '#bbe2bf',
    mark: mark('lanyard'),
  },
  {
    slug: 'mallet',
    name: 'Mallet',
    category: 'Workshop repair jobs',
    replaces: ['RepairShopr', 'Shopmonkey', 'Tekmetric'],
    primaryReplace: 'RepairShopr',
    line: 'Estimates, customer authorisation, parts and labour for workshop repairs.',
    repo: repo('mallet'),
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
    pastel: '#bdd8fe',
    mark: mark('pane'),
  },
  {
    slug: 'placemat',
    name: 'Placemat',
    category: 'Restaurant bookings',
    replaces: ['Tablein'],
    primaryReplace: 'Tablein',
    line: 'Table bookings, walk-ins, waitlist and guest history for restaurants.',
    repo: repo('placemat'),
    // Pastel from #356c60, the Base default its repo has not replaced yet.
    pastel: '#b5e3d7',
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
    pastel: '#bae1ca',
    mark: mark('plinth'),
  },
  {
    slug: 'satchel',
    name: 'Satchel',
    category: 'Legal practice management',
    replaces: ['Clio', 'MyCase', 'PracticePanther'],
    primaryReplace: 'Clio',
    line: 'Conflict checks, time, bills, files and deadlines for law firms.',
    repo: repo('satchel'),
    pastel: '#f0cebc',
    mark: mark('satchel'),
  },
  {
    slug: 'stall',
    name: 'Stall',
    category: 'Online shop',
    replaces: ['Shopify'],
    primaryReplace: 'Shopify',
    line: 'An online shop with Stripe Checkout, shipping and partial refunds.',
    repo: repo('stall'),
    // Pastel from #356c60, the Base default its repo has not replaced yet.
    pastel: '#b5e3d7',
    mark: mark('stall'),
  },
  {
    slug: 'strap',
    name: 'Strap',
    category: 'Studio management',
    replaces: ['Mindbody'],
    primaryReplace: 'Mindbody',
    line: 'Studio classes, pack credits, waitlists and member balances.',
    repo: repo('strap'),
    // Pastel from #356c60, the Base default its repo has not replaced yet.
    pastel: '#b5e3d7',
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
    pastel: '#d1dabe',
    mark: mark('terrace'),
  },
  {
    slug: 'vane',
    name: 'Vane',
    category: 'Web analytics',
    replaces: ['Google Analytics', 'Plausible', 'Fathom'],
    primaryReplace: 'Google Analytics',
    line: 'Website visits, sources, campaigns and goals without cookies.',
    repo: repo('vane'),
    pastel: '#c7d4ff',
    mark: mark('vane'),
  },
];

/** The words around the block, with the card's shared phrasing. */
export const comingSoon = {
  id: 'soon',
  heading: 'Coming soon.',
  line: 'Twenty more in the works. Source is already public.',
  label: 'Coming soon',
  alternativeTo: collection.alternativeTo,
  githubLabel: collection.githubLabel,
} as const;
