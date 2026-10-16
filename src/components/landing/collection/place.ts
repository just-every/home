import { collection } from '@/content/landing';
import type { SeedArea } from '@/data/seed-types';

import { namedReplace } from '../search/localMatch';
import type { SearchMatch, SearchMode } from '../search/useCollectionSearch';
import type { Area, CollectionItem, Shown } from './types';

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
 * The whole collection: every product under its area's heading, the areas
 * in the copy's order and the products in volume order within each, the
 * same whatever is selected.
 */
export function areas(items: CollectionItem[]): Area[] {
  return (Object.entries(collection.areas) as [SeedArea, string][]).map(
    ([id, heading]) => ({
      id,
      heading,
      items: items.filter(item => item.area === id).map(item => shown(item)),
    })
  );
}

/**
 * A search's products, with no area headings: while typing, only the
 * matches, best first; after a submitted search, its picks, each with its
 * reason.
 */
export function results(
  mode: SearchMode,
  matches: SearchMatch<CollectionItem>[],
  query: string
): Shown[] {
  return matches.map(({ volume, reason }) =>
    shown(volume, query, mode === 'answer' ? reason : null)
  );
}

/**
 * The product in the box above the products: the selected one, or after a
 * submitted search its pick (with Claude's reason). None while typing
 * narrows the products, so the page shows only what matches.
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
