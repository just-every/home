/**
 * The X (Twitter) base pixel's standard events (pixel id reblb, loaded in
 * app/layout.tsx), so X ads can report whether visitors use the site after
 * landing. The ids are the pixel's own event ids.
 */
export const X_EVENTS = {
  search: 'tw-reblb-13xo57',
  contentView: 'tw-reblb-13xo58',
  githubClick: 'tw-reblb-13xo55',
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

/**
 * Sends one pixel event. It does nothing without `window.twq` (an ad blocker
 * removed it) and never throws.
 */
export function track(eventId: XEventId, params?: XEventParams): void {
  try {
    if (typeof window === 'undefined' || typeof window.twq !== 'function') {
      return;
    }
    window.twq('event', eventId, params);
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
