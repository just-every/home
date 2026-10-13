'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { cardId } from '../volumes';

const PREFIX = '#vol-';

interface SelectOptions {
  /** How the address bar follows: a new entry, the same entry, or not at all. */
  history: 'push' | 'replace' | 'none';
  /** Runs in the same update as the selection. */
  also?: () => void;
  /** Move keyboard focus to the feature (the visitor picked it in the grid). */
  focus?: boolean;
  /** Animate the change and the scroll; false for the first paint. */
  animate?: boolean;
}

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The feature's heading, which takes focus after a pick in the grid. */
export const featureHeadingId = 'collection-feature-heading';

/** Scroll the feature into view unless its top is already near the top. */
function reveal(slug: string, smooth: boolean) {
  const feature = document.getElementById(cardId(slug));
  if (!feature) return;
  const top = feature.getBoundingClientRect().top;
  if (top >= 0 && top < window.innerHeight * 0.35) return;
  feature.scrollIntoView({
    behavior: smooth ? 'smooth' : 'instant',
    block: 'start',
  });
}

/**
 * One product is always selected: the collection's first (Uptime) until the
 * address says `#vol-<slug>`. Any link to `#vol-<slug>` on the page (the
 * hero's shelf, the grid's own cards, the ledger) selects it, the hash
 * follows so the view can be shared, and the change animates as one view
 * transition where the browser has them (instantly with reduced motion).
 * `onNavigate` runs when a link or the address picks a product.
 */
export function useSelection(
  slugs: string[],
  onNavigate: (slug: string) => void
) {
  const [selected, setSelected] = useState(slugs[0]);
  const navigateRef = useRef(onNavigate);
  navigateRef.current = onNavigate;
  const settleRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const settle = settleRef.current;
    settleRef.current = null;
    settle?.();
  }, [selected]);

  const select = useCallback((slug: string, options: SelectOptions) => {
    const { history, also, focus = false, animate = true } = options;
    if (history !== 'none') {
      const url = `${PREFIX}${slug}`;
      if (history === 'push') window.history.pushState(null, '', url);
      else window.history.replaceState(null, '', url);
    }
    const smooth = animate && !reducedMotion();
    const update = () => {
      setSelected(slug);
      also?.();
    };
    const settle = () => {
      if (focus) {
        document
          .getElementById(featureHeadingId)
          ?.focus({ preventScroll: true });
      }
      reveal(slug, smooth);
    };
    if (smooth && typeof document.startViewTransition === 'function') {
      // The browser snapshots, the new layout commits at once, then it
      // animates every card from its old place and size to its new one.
      const transition = document.startViewTransition(() => flushSync(update));
      transition.finished.then(settle, settle);
    } else if (animate) {
      flushSync(update);
      settle();
    } else {
      // From an effect (the first paint): settle once React has committed.
      settleRef.current = settle;
      update();
    }
  }, []);

  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith(PREFIX)) return null;
      const slug = decodeURIComponent(hash.slice(PREFIX.length));
      return slugs.includes(slug) ? slug : null;
    };

    // A shared link opens on its product.
    const initial = fromHash();
    if (initial) select(initial, { history: 'none', animate: false });

    const onHash = () => {
      // Back to the address with no hash: the first product again.
      const slug = window.location.hash === '' ? slugs[0] : fromHash();
      if (!slug) return;
      select(slug, { history: 'none', also: () => navigateRef.current(slug) });
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest?.(
        `a[href^="${PREFIX}"]`
      );
      if (!link) return;
      const slug = link.getAttribute('href')!.slice(PREFIX.length);
      if (!slugs.includes(slug)) return;
      event.preventDefault();
      select(slug, {
        history: 'push',
        also: () => navigateRef.current(slug),
        focus: link.closest('[data-collection-grid]') !== null,
      });
    };

    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onClick);
    };
  }, [slugs, select]);

  return { selected, select };
}
