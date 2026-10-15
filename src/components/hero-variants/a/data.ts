import { seeds } from '@/data/seeds';
import type { Seed } from '@/data/seeds';
import { upcoming } from '@/data/upcoming';

/**
 * Hero A's rows: each rented tool beside its Just Every alternative, in the
 * 12ui design's order (Notion beside Slate, Slack beside Nook, and so on).
 * A seed added later joins the end of the list.
 */
const designOrder = [
  'slate',
  'nook',
  'happytohelp',
  'dial',
  'vector',
  'orbit',
  'cradle',
  'pencil',
  'mango',
  'lamp',
  'uptime',
  'spool',
  'penny',
  'oncall',
];

const rank = (seed: Seed) => {
  const index = designOrder.indexOf(seed.slug);
  return index < 0 ? designOrder.length : index;
};

export const pairs: Seed[] = [...seeds].sort((a, b) => rank(a) - rank(b));

export interface ToolOption {
  /** The incumbent as the visitor knows it, e.g. 'Notion'. */
  tool: string;
  slug: string;
}

/** One option per seed: the incumbent named on its card. */
export const primaryTools: ToolOption[] = pairs.map(seed => ({
  tool: seed.primaryReplace,
  slug: seed.slug,
}));

/**
 * Every other incumbent a seed replaces, alphabetically, so a visitor who
 * rents Zendesk or Confluence finds it too. A name already covered (or one
 * that only adds a vendor to a covered name, like "Atlassian Statuspage")
 * appears once, for the first seed in collection order.
 */
export const moreTools: ToolOption[] = (() => {
  const covered = primaryTools.map(option => option.tool.toLowerCase());
  const seen = new Set(covered);
  const more: ToolOption[] = [];
  for (const seed of seeds) {
    for (const tool of seed.replaces) {
      const key = tool.toLowerCase();
      if (seen.has(key) || covered.some(name => key.includes(name))) continue;
      seen.add(key);
      more.push({ tool, slug: seed.slug });
    }
  }
  return more.sort((a, b) => a.tool.localeCompare(b.tool));
})();

const bySlug = new Map(pairs.map(seed => [seed.slug, seed]));
const byTool = new Map(
  [...primaryTools, ...moreTools].map(option => [option.tool, option.slug])
);

export function seedFor(slug: string): Seed {
  return bySlug.get(slug) ?? pairs[0];
}

/** The seed that replaces `tool`, or undefined for an unknown name. */
export function slugForTool(tool: string): string | undefined {
  return byTool.get(tool);
}

/** Seeds in the works, counted under both lists. */
export const upcomingCount = upcoming.length;
