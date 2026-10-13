import type { CSSProperties } from 'react';

import type { CollectionItem } from './types';

/**
 * A card's brand colours, and the view-transition name that lets the same
 * product move and grow between its card and the feature.
 */
export function cardStyle(item: CollectionItem): CSSProperties {
  return {
    '--pastel': item.pastel,
    '--brand-ink': item.ink,
    viewTransitionName: `vol-${item.slug}`,
  } as CSSProperties;
}
