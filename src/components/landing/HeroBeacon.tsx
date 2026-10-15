'use client';

import { useEffect } from 'react';

import { HERO_PARAM } from '@/lib/hero-ab';
import type { HeroVariantId } from '@/lib/hero-ab';
import { recordExposure, setShownHero } from '@/lib/hero-ab-client';

/**
 * Reports which hero this page view showed, once the page is live, and makes
 * it the hero the page's engagement events count for. The server already
 * rendered that hero, so nothing on screen changes. `?hero=<id>` naming the
 * shown hero means the middleware forced it for a preview.
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
  return null;
}
