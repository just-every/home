import type { CSSProperties } from 'react';

import type { CollectionItem } from './types';

/** A product's brand colours, for its card. */
export function cardStyle(item: CollectionItem): CSSProperties {
  return {
    '--pastel': item.pastel,
    '--brand-ink': item.ink,
  } as CSSProperties;
}
