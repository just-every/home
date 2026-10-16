/**
 * The site's first-party usage log: the names shared by the page (beacons,
 * src/lib/usage-client.ts), /api/events (storage in D1, migration 0005) and
 * `npm run usage` (the report).
 */

/**
 * The events recorded. Two belong to the hero: `hero_pick` is a pick in its
 * rented-tool picker and `hero_cta` a click on its "Switch to <Seed>" button
 * or one of its seed rows.
 */
export const USAGE_EVENTS = [
  'search',
  'product_opened',
  'reel_played',
  'github_click',
  'run_site_click',
  'command_copied',
  'suggestion_sent',
  'contact_sent',
  'hero_pick',
  'hero_cta',
] as const;

export type UsageEventName = (typeof USAGE_EVENTS)[number];

export function isUsageEvent(value: unknown): value is UsageEventName {
  return (USAGE_EVENTS as readonly unknown[]).includes(value);
}

const VIEW_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** A page view's random id, as the page mints it. */
export function isViewId(value: unknown): value is string {
  return typeof value === 'string' && VIEW_ID.test(value);
}
