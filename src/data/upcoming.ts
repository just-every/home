import { collection } from '@/content/landing';

/**
 * Seeds in the works: public source, not yet in the collection. They are
 * listed apart from `seeds.ts` and shown quietly (no reel, no homepage, not
 * selectable). Each line is checked against that seed's README and
 * CONTRACT.md; the pastel keeps the seed's own brand hue at the lightness
 * and softness of the collection's pastels.
 */
export interface UpcomingSeed {
  slug: string;
  name: string;
  /** The one incumbent named on the card. */
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
    slug: 'auth',
    name: 'Auth',
    primaryReplace: 'Auth0',
    line: 'Email-link and passkey sign-in that you run yourself.',
    repo: repo('auth'),
    // src/branding.json primaryColor #356c60 (hue 177).
    pastel: '#b5e3d7',
    mark: mark('auth'),
  },
  {
    slug: 'chest',
    name: 'Chest',
    primaryReplace: 'Box',
    line: 'A document library that keeps every original and the approved version.',
    repo: repo('chest'),
    // Its primaryColor is plain black; the sand of its folder mark (#ead6b4, hue 81), also its band and app.
    pastel: '#f3dbb2',
    mark: mark('chest'),
  },
  {
    slug: 'easel',
    name: 'Easel',
    primaryReplace: 'Pigment',
    line: 'Budgets, forecasts and a plan-versus-actual review every month.',
    repo: repo('easel'),
    // src/branding.json primaryColor #8c1a1f (hue 25).
    pastel: '#fac6c1',
    mark: mark('easel'),
  },
  {
    slug: 'pier',
    name: 'Pier',
    primaryReplace: 'Zoho Inventory',
    line: 'Stock, reservations and wholesale orders for small wholesalers.',
    repo: repo('pier'),
    // public/rer-theme.css link teal #276f69 (hue 187); its branding.json #315b51 is the same family.
    pastel: '#bde8e4',
    mark: mark('pier'),
  },
  {
    slug: 'purse',
    name: 'Purse',
    primaryReplace: 'Procurify',
    line: 'Purchase requests, approvals, orders and receiving.',
    repo: repo('purse'),
    // src/branding.json primaryColor #9a2a4e (hue 6).
    pastel: '#fbc3ce',
    mark: mark('purse'),
  },
  {
    slug: 'willow',
    name: 'Willow',
    primaryReplace: 'BambooHR',
    line: 'Your people register, leave and joiner-to-leaver changes.',
    repo: repo('willow'),
    // src/branding.json primaryColor #5f7444 (hue 128).
    pastel: '#c9e2ad',
    mark: mark('willow'),
  },
];

/** The words around the block, with the card's shared phrasing. */
export const comingSoon = {
  id: 'soon',
  heading: 'Coming soon.',
  line: 'Six more in the works. Source is already public.',
  label: 'Coming soon',
  alternativeTo: collection.alternativeTo,
  githubLabel: collection.githubLabel,
} as const;
