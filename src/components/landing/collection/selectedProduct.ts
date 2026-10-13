'use client';

import { useSyncExternalStore } from 'react';

/**
 * The one selected product on the page, shared by the collection's box and
 * the reels section: picking a product in either shows it in both. Null
 * until something is picked, which reads as the first product.
 */
let selected: string | null = null;
const listeners = new Set<() => void>();
const picks = new Set<(slug: string) => void>();

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

/**
 * A pick made outside the collection (the reels section): the collection
 * hears of it, to clear a search that hides the product, and the address
 * follows where it already names a product.
 */
export function pickProduct(slug: string) {
  setSelectedProduct(slug);
  if (window.location.hash.startsWith('#vol-')) {
    window.history.replaceState(null, '', `#vol-${slug}`);
  }
  picks.forEach(pick => pick(slug));
}

/** Runs `onPick` after each pick made outside the collection. */
export function onOutsidePick(onPick: (slug: string) => void) {
  picks.add(onPick);
  return () => {
    picks.delete(onPick);
  };
}
