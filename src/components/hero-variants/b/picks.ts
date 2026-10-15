import { seeds } from '@/data/seeds';
import type { Seed } from '@/data/seeds';
import { upcoming } from '@/data/upcoming';

/**
 * The card's two lists. "The tool you rent" is every seed's primary
 * incumbent in two columns, read row by row as in the design (Notion,
 * Typeform, Slack, Mailchimp, ...). "Yours to own" lists the seeds of the
 * column the picked incumbent sits in, so the picked pair always shows side
 * by side. A seed added to seeds.ts later joins the end of the grid.
 */
const designOrder = [
  'slate',
  'pencil',
  'nook',
  'mango',
  'happytohelp',
  'lamp',
  'dial',
  'uptime',
  'vector',
  'spool',
  'orbit',
  'penny',
  'cradle',
  'oncall',
];

export interface Pick {
  slug: string;
  name: string;
  /** The incumbent named in the left list and in "(for ...)". */
  incumbent: string;
  /** Every incumbent the seed replaces, for matching typed names. */
  replaces: string[];
  line: string;
  /** 0 for the grid's left column, 1 for its right. */
  column: 0 | 1;
}

const toPick = (seed: Seed, index: number): Pick => ({
  slug: seed.slug,
  name: seed.name,
  incumbent: seed.primaryReplace,
  replaces: seed.replaces,
  line: seed.line,
  column: (index % 2) as 0 | 1,
});

const ordered: Seed[] = [
  ...designOrder.flatMap(slug => seeds.filter(seed => seed.slug === slug)),
  ...seeds.filter(seed => !designOrder.includes(seed.slug)),
];

export const picks: Pick[] = ordered.map(toPick);

/** The design's pairing: Slack, so Nook. */
export const defaultSlug = 'nook';

export const upcomingCount = upcoming.length;

/** The seeds listed under "Yours to own" for the picked one. */
export const ownedFor = (pick: Pick) =>
  picks.filter(other => other.column === pick.column);

/**
 * Type-ahead in the left list: the seed whose primary incumbent starts with
 * what was typed, else one replacing any incumbent that does ("Teams" finds
 * Nook, "Jira" finds Vector).
 */
export function matchIncumbent(text: string): Pick | null {
  const query = text.trim().toLowerCase();
  if (!query) return null;
  const starts = (name: string) => name.toLowerCase().startsWith(query);
  return (
    picks.find(pick => starts(pick.incumbent)) ??
    picks.find(pick =>
      pick.replaces.some(
        name => starts(name) || name.toLowerCase().split(' ').some(starts)
      )
    ) ??
    null
  );
}
