/**
 * The browser side of the hero A/B test: which hero this visitor is measured
 * under, and the beacons to /api/ab. The visitor id never reaches scripts; it
 * travels in its HttpOnly cookie and /api/ab reads it there.
 */
import { HERO_COOKIE, isHeroVariant } from './hero-ab';
import type { AbEventName, HeroVariantId } from './hero-ab';

export interface HeroContext {
  variant: HeroVariantId;
  /** Shown by `?hero=`, not by the random assignment. */
  forced: boolean;
}

/** The hero on the current page, while it is mounted. */
let shown: HeroContext | null = null;

export function setShownHero(context: HeroContext | null): void {
  shown = context;
}

function assignedHero(): HeroContext | null {
  try {
    const value = document.cookie
      .split('; ')
      .find(pair => pair.startsWith(`${HERO_COOKIE}=`))
      ?.slice(HERO_COOKIE.length + 1);
    return isHeroVariant(value) ? { variant: value, forced: false } : null;
  } catch {
    return null;
  }
}

/**
 * The hero this page's events count for: the one on the page, else (on a
 * page without the hero) the visitor's assignment, else none.
 */
export function heroContext(): HeroContext | null {
  if (typeof window === 'undefined') return null;
  return shown ?? assignedHero();
}

function beacon(body: Record<string, unknown>): void {
  try {
    void fetch('/api/ab', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      // Survives the navigation a GitHub or run-site click starts.
      keepalive: true,
      credentials: 'same-origin',
    }).catch(() => {});
  } catch {
    // Measurement never gets in the visitor's way.
  }
}

const clip = (value: string | null, max: number) =>
  value ? value.slice(0, max) : null;

const EXPOSED_KEY = 'je_hero_exposed';

/**
 * One exposure for the hero on this page, at most once per browser session
 * for the same variant: reloads and returning to the page send nothing more.
 */
export function recordExposure(context: HeroContext): void {
  const mark = `${context.variant}:${context.forced ? 1 : 0}`;
  try {
    if (sessionStorage.getItem(EXPOSED_KEY) === mark) return;
    sessionStorage.setItem(EXPOSED_KEY, mark);
  } catch {
    // Without session storage, every view sends; the results count visitors.
  }
  const params = new URLSearchParams(window.location.search);
  beacon({
    kind: 'exposure',
    variant: context.variant,
    forced: context.forced,
    utm_source: clip(params.get('utm_source'), 100),
    utm_campaign: clip(params.get('utm_campaign'), 100),
    utm_content: clip(params.get('utm_content'), 100),
    landing: clip(window.location.pathname + window.location.hash, 200),
  });
}

/** One engagement event, recorded with the hero it counts for. */
export function recordEvent(
  context: HeroContext,
  name: AbEventName,
  detail?: string
): void {
  beacon({
    kind: 'event',
    variant: context.variant,
    forced: context.forced,
    name,
    detail: clip(detail ?? null, 120),
  });
}
