import { namedReplace } from '../search/localMatch';
import type { SearchMatch, SearchMode } from '../search/useCollectionSearch';
import type { CardRole, CollectionItem, Placed } from './types';

/** The rows under the feature: five cards, then six. */
const MEDIUM_ROW = 5;

function card(
  item: CollectionItem,
  role: CardRole,
  query = '',
  reason: string | null = null
): Placed {
  return {
    item,
    role,
    replaces: query ? namedReplace(item, query) : item.primaryReplace,
    reason,
  };
}

/**
 * Which cards show, in what order and at what size.
 *
 * The whole collection: the selected product as the feature, the next two in
 * volume order beside it, the rest in rows of five and six. Typing: only the
 * matches, best first, as cards. A submitted search: its pick as the feature
 * (the selection follows it) with the other picks beside it.
 */
export function place(
  items: CollectionItem[],
  selected: string,
  mode: SearchMode,
  matches: SearchMatch<CollectionItem>[],
  query: string
): Placed[] {
  if (mode === 'instant') {
    return matches.map(({ volume }) => card(volume, 'm', query));
  }
  if (mode === 'answer') {
    const feature =
      matches.find(match => match.volume.slug === selected) ?? matches[0];
    return [feature, ...matches.filter(match => match !== feature)].map(
      (match, index) =>
        card(
          match.volume,
          index === 0 ? 'feature' : 'side',
          query,
          match.reason
        )
    );
  }
  const feature = items.find(item => item.slug === selected) ?? items[0];
  const rest = items.filter(item => item !== feature);
  return [
    card(feature, 'feature'),
    ...rest.map((item, index) =>
      card(item, index < 2 ? 'side' : index < 2 + MEDIUM_ROW ? 'm' : 's')
    ),
  ];
}
