'use client';

import { useSyncExternalStore } from 'react';

const query = '(min-width: 1024px)';

function subscribe(onChange: () => void) {
  const list = window.matchMedia(query);
  list.addEventListener('change', onChange);
  return () => list.removeEventListener('change', onChange);
}

/**
 * True at desktop widths, false below, and null while the server renders and
 * the page hydrates (when the width is not yet known).
 */
export function useWideScreen(): boolean | null {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => null
  );
}
