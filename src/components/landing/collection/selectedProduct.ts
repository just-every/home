'use client';

import { useSyncExternalStore } from 'react';

/**
 * The reels section's pick: the product whose reel plays. Null until
 * something is picked, which reads as the first product.
 */
let selected: string | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The selected product's slug, `first` until one is picked. */
export function useSelectedProduct(first: string): string {
  return useSyncExternalStore(
    subscribe,
    () => selected ?? first,
    () => first
  );
}

export function setSelectedProduct(slug: string) {
  if (slug === selected) return;
  selected = slug;
  listeners.forEach(listener => listener());
}
