import { heroContext, recordEvent } from './hero-ab-client';
import type { AbEventName } from './hero-ab';

/**
 * The X (Twitter) base pixel's standard events (pixel id reblb, loaded in
 * app/layout.tsx), so X ads can report whether visitors use the site after
 * landing. The ids are the pixel's own event ids.
 */
export const X_EVENTS = {
  search: 'tw-reblb-13xo57',
  contentView: 'tw-reblb-13xo58',
  githubClick: 'tw-reblb-13xo55',
  runSiteClick: 'tw-reblb-13xo56',
  commandCopied: 'tw-reblb-13xo50',
  suggestionSent: 'tw-reblb-13xo51',
  contactSent: 'tw-reblb-13xo59',
} as const;

export type XEventId = (typeof X_EVENTS)[keyof typeof X_EVENTS];

export type XEventParams = Record<string, string | number>;

declare global {
  interface Window {
    twq?: (command: 'event', id: XEventId, params?: XEventParams) => void;
  }
}

const AB_NAMES: Record<XEventId, AbEventName> = {
  [X_EVENTS.search]: 'search',
  [X_EVENTS.contentView]: 'product_opened',
  [X_EVENTS.githubClick]: 'github_click',
  [X_EVENTS.runSiteClick]: 'run_site_click',
  [X_EVENTS.commandCopied]: 'command_copied',
  [X_EVENTS.suggestionSent]: 'suggestion_sent',
  [X_EVENTS.contactSent]: 'contact_sent',
};

/** A content view's `content_type`, as the A/B test names the event. */
const CONTENT_TYPES: Record<string, AbEventName> = {
  reel: 'reel_played',
  'hero-pick': 'hero_pick',
  'hero-switch': 'hero_cta',
};

/**
 * The event as the hero A/B test stores it. A content view is a product
 * opened, a reel played, a pick in the hero's own picker or a click on the
 * hero's call to action; the detail is the product or repository name, or
 * the hero link's target slug (or `all`), only (never search text or form
 * contents).
 */
function abEvent(eventId: XEventId, params?: XEventParams) {
  const type = params?.content_type;
  const name =
    (eventId === X_EVENTS.contentView && typeof type === 'string'
      ? CONTENT_TYPES[type]
      : undefined) ?? AB_NAMES[eventId];
  const detail = params?.content_name;
  return { name, detail: typeof detail === 'string' ? detail : undefined };
}

/**
 * Sends one engagement event: to our own A/B measurement (/api/ab) with the
 * visitor's hero, and to the X pixel with that hero as `content_category`
 * (`hero-<id>`) so X can split by hero. The pixel part does nothing without
 * `window.twq` (an ad blocker removed it). Never throws.
 */
export function track(eventId: XEventId, params?: XEventParams): void {
  try {
    const hero = heroContext();
    if (hero) {
      const { name, detail } = abEvent(eventId, params);
      recordEvent(hero, name, detail);
    }
    if (typeof window === 'undefined' || typeof window.twq !== 'function') {
      return;
    }
    window.twq(
      'event',
      eventId,
      hero ? { ...params, content_category: `hero-${hero.variant}` } : params
    );
  } catch {
    // Analytics never gets in the visitor's way.
  }
}

/** A fresh id for one form submission, so a server-side event can deduplicate. */
export function conversionId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  }
}
