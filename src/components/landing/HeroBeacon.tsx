'use client';

import { useEffect } from 'react';

import { HERO_PARAM, HERO_SELECTOR } from '@/lib/hero-ab';
import type { HeroVariantId } from '@/lib/hero-ab';
import { recordExposure, setShownHero } from '@/lib/hero-ab-client';
import { track, X_EVENTS } from '@/lib/x-pixel';

/** The hero's links into the page: a product's panel or the collection. */
const CTA = ['a[href^="#vol-"]', 'a[href="#all"]']
  .map(link => `${HERO_SELECTOR} ${link}`)
  .join(', ');

/** The slug a hero link opens, or `all` for the collection. */
const ctaTarget = (link: Element) => {
  const href = link.getAttribute('href') ?? '';
  return href === '#all' ? 'all' : href.slice('#vol-'.length);
};

/**
 * Reports which hero this page view showed, once the page is live, and makes
 * it the hero the page's engagement events count for. The server already
 * rendered that hero, so nothing on screen changes. `?hero=<id>` naming the
 * shown hero means the middleware forced it for a preview.
 *
 * A click on one of the hero's links into the page (`#vol-<slug>` or `#all`,
 * inside its `data-hero` root) is its call to action: a content view of
 * type `hero-switch` for the pixel, `hero_cta` for the A/B test, never a
 * product opened, so every hero's main button counts the same way.
 */
export function HeroBeacon({ variant }: { variant: HeroVariantId }) {
  useEffect(() => {
    const forced =
      new URLSearchParams(window.location.search).get(HERO_PARAM) === variant;
    const context = { variant, forced };
    setShownHero(context);
    recordExposure(context);
    return () => setShownHero(null);
  }, [variant]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      const link = (event.target as Element | null)?.closest?.(CTA);
      if (!link) return;
      track(X_EVENTS.contentView, {
        content_name: ctaTarget(link),
        content_type: 'hero-switch',
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
