import { namedReplace } from '../search/localMatch';
import type { SearchMatch, SearchMode } from '../search/useCollectionSearch';
import type { CardRole, CollectionItem, Placed, Shown } from './types';

/** The grid's rows: three covers, then five cards, then the rest (six). */
const COVERS = 3;
const MEDIUM_ROW = 5;

function shown(
  item: CollectionItem,
  query = '',
  reason: string | null = null
): Shown {
  return {
    item,
    replaces: query ? namedReplace(item, query) : item.primaryReplace,
    reason,
  };
}

/**
 * The grid's cards, in what order and at what size.
 *
 * The whole collection: every product in volume order, the same whatever is
 * selected: three covers, then rows of five and six. Typing: only the
 * matches, best first. A submitted search: its picks, each with its reason.
 */
export function place(
  items: CollectionItem[],
  mode: SearchMode,
  matches: SearchMatch<CollectionItem>[],
  query: string
): Placed[] {
  if (mode === 'instant') {
    return matches.map(({ volume }) => ({
      ...shown(volume, query),
      role: 'm',
    }));
  }
  if (mode === 'answer') {
    return matches.map(({ volume, reason }) => ({
      ...shown(volume, query, reason),
      role: 'cover',
    }));
  }
  return items.map((item, index) => {
    const role: CardRole =
      index < COVERS ? 'cover' : index < COVERS + MEDIUM_ROW ? 'm' : 's';
    return { ...shown(item), role };
  });
}

/**
 * The product in the box above the grid: the selected one, or after a
 * submitted search its pick (with Claude's reason). None while typing
 * narrows the grid, so the page shows only what matches.
 */
export function featured(
  items: CollectionItem[],
  selected: string,
  mode: SearchMode,
  matches: SearchMatch<CollectionItem>[],
  query: string
): Shown | null {
  if (mode === 'instant') return null;
  if (mode === 'answer') {
    const pick =
      matches.find(match => match.volume.slug === selected) ?? matches[0];
    return pick ? shown(pick.volume, query, pick.reason) : null;
  }
  return shown(items.find(item => item.slug === selected) ?? items[0]);
}
