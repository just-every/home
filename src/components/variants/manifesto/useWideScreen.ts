import { useSyncExternalStore } from 'react';

const query = '(min-width: 1024px)';

function subscribe(onChange: () => void) {
  const list = window.matchMedia(query);
  list.addEventListener('change', onChange);
  return () => list.removeEventListener('change', onChange);
}

/**
 * True on screens wide enough for the 1080p reel, false on smaller ones, and
 * null while server rendering, before the screen size is known.
 */
export function useWideScreen(): boolean | null {
  return useSyncExternalStore<boolean | null>(
    subscribe,
    () => window.matchMedia(query).matches,
    () => null
  );
}
