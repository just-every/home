import { volumes } from '@/components/landing/volumes';
import { upcoming } from '@/data/upcoming';
import type { Volume } from '@/components/landing/volumes';

/**
 * The hero's rows: a curated dozen of the most recognisable tools a team
 * rents, each beside the seed that replaces it (Notion beside Slate, Slack
 * beside Nook, and so on). The cards were drawn for about a dozen rows, so
 * the rest of the collection sits behind the "and N more" link under the
 * seeds. The rented names are each seed's own `primaryReplace`; this list
 * only picks and orders the seeds. The first six are the tools a first-time
 * visitor most often rents; the later picks show the newer releases
 * (expenses, HR) beside the original fourteen.
 */
const heroPicks = [
  'slate',
  'nook',
  'happytohelp',
  'dial',
  'vector',
  'orbit',
  'cradle',
  'mango',
  'coaster',
  'willow',
  'spool',
  'uptime',
];

export const rows: Volume[] = heroPicks.flatMap(slug => {
  const volume = volumes.find(v => v.slug === slug);
  return volume ? [volume] : [];
});

/**
 * Every product the hero's rows leave out, released and coming soon, for its
 * "and N more" line.
 */
export const moreCount = volumes.length + upcoming.length - rows.length;
