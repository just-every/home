'use client';

import { useCallback, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

import { HERO_SELECTOR } from '../hero/Hero';

import {
  onOutsidePick,
  setSelectedProduct,
  useSelectedProduct,
} from './selectedProduct';

const PREFIX = '#vol-';

/** How the page brings the box into view after a selection. */
type Reveal = 'start' | 'nearest';

interface SelectOptions {
  /** How the address bar follows: a new entry, the same entry, or not at all. */
  history: 'push' | 'replace' | 'none';
  /** Runs in the same update as the selection. */
  also?: () => void;
  /** Move keyboard focus to the box (a link picked the product). */
  focus?: boolean;
  /**
   * `start` puts the box at the top unless it already shows; `nearest`
   * scrolls only as far as it takes (a search answer under its field).
   */
  reveal?: Reveal;
  /** Animate the scroll; false for the first paint. */
  animate?: boolean;
  /**
   * Back, forward or a typed address: the browser scrolls to the card
   * itself, so the box is brought back into view a frame later.
   */
  traversal?: boolean;
}

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The box above the grid that shows the selected product. */
export const featureId = 'collection-selected';

/** The box's heading, which takes focus after a pick from a link. */
export const featureHeadingId = 'collection-feature-heading';

/**
 * Scroll the box into view so the visitor sees the change; unless `force`,
 * not when it already shows.
 */
function reveal(how: Reveal, smooth: boolean, force = false) {
  const box = document.getElementById(featureId);
  if (!box) return;
  const behavior = smooth ? 'smooth' : 'instant';
  if (how === 'nearest') {
    box.scrollIntoView({ behavior, block: 'nearest' });
    return;
  }
  const { top, bottom } = box.getBoundingClientRect();
  const shows =
    top >= 0 &&
    (bottom <= window.innerHeight || top < window.innerHeight * 0.35);
  if (force || !shows) box.scrollIntoView({ behavior, block: 'start' });
}

/**
 * One product is always selected: the collection's first (Uptime) until the
 * address says `#vol-<slug>`. Any link to `#vol-<slug>` on the page (the
 * hero's seed rows, the grid's own cards, the Unsubscribe rows) selects it, the
 * hash follows so the view can be shared, and the box above the grid scrolls
 * into view (smoothly, or at once with reduced motion). `onNavigate` runs
 * when a link, the address or the reels section picks a product. The
 * selection is the page's one selected product (see selectedProduct).
 * `onOpen` runs once per visitor click that opens a product in the box,
 * except from the hero's own links: those are the hero's call to action,
 * which the hero reports itself.
 */
export function useSelection(
  slugs: string[],
  onNavigate: (slug: string) => void,
  onOpen: (slug: string) => void
) {
  const selected = useSelectedProduct(slugs[0]);
  const navigateRef = useRef(onNavigate);
  navigateRef.current = onNavigate;
  const openRef = useRef(onOpen);
  openRef.current = onOpen;
  const settleRef = useRef<(() => void) | null>(null);
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  useEffect(() => {
    const settle = settleRef.current;
    settleRef.current = null;
    settle?.();
  }, [selected]);

  const select = useCallback((slug: string, options: SelectOptions) => {
    const {
      history,
      also,
      focus = false,
      reveal: how = 'start',
      animate = true,
      traversal = false,
    } = options;
    if (history !== 'none') {
      const url = `${PREFIX}${slug}`;
      if (history === 'push') window.history.pushState(null, '', url);
      else window.history.replaceState(null, '', url);
    }
    const update = () => {
      setSelectedProduct(slug);
      also?.();
    };
    const settle = () => {
      if (focus) {
        document
          .getElementById(featureHeadingId)
          ?.focus({ preventScroll: true });
      }
      const smooth = animate && !reducedMotion();
      // The first paint always scrolls: the browser's own scroll to the
      // card in the grid is under way and this one replaces it.
      if (!traversal) reveal(how, smooth, !animate);
      else {
        // After the browser's own scroll to the card has begun.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => reveal(how, smooth, true))
        );
      }
    };
    if (animate) {
      flushSync(update);
      settle();
    } else {
      // From an effect (the first paint): settle once React has committed.
      settleRef.current = settle;
      update();
      // The collection's first product is already the one showing, so no
      // update commits and the effect above never runs: settle here.
      if (selectedRef.current === slug) {
        settleRef.current = null;
        settle();
      }
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
      select(slug, {
        history: 'none',
        also: () => navigateRef.current(slug),
        traversal: true,
      });
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
        focus: true,
      });
      if (!link.closest(HERO_SELECTOR)) openRef.current(slug);
    };

    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    const stopPicks = onOutsidePick(slug => navigateRef.current(slug));
    return () => {
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onClick);
      stopPicks();
    };
  }, [slugs, select]);

  return { selected, select };
}
