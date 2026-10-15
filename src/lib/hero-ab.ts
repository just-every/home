/**
 * The hero A/B test: which heroes exist, how visitors are split between them,
 * and the names shared by the middleware (assignment), the page (rendering),
 * the client (beacons), /api/ab (storage) and `npm run ab` (results).
 *
 * To add a hero: add it here and give its id a component in
 * src/components/landing/heroes.tsx (type-check fails until you do). It can
 * be previewed at /?hero=<id> while `enabled` is false; set `enabled: true`
 * to put it into the random split.
 */
export interface HeroVariant {
  /** Lower-case letters, digits and dashes; stored in cookies and D1. */
  readonly id: string;
  /** Share of new visitors, relative to the other enabled variants. */
  readonly weight: number;
  /** In the random split. A disabled variant can still be forced. */
  readonly enabled: boolean;
}

export const HERO_VARIANTS = [
  { id: 'control', weight: 1, enabled: true },
] as const satisfies readonly HeroVariant[];

export type HeroVariantId = (typeof HERO_VARIANTS)[number]['id'];

/** The variant every other one is compared against. */
export const CONTROL: HeroVariantId = 'control';

/** The randomised assignment; readable by the page's scripts. */
export const HERO_COOKIE = 'je_hero';
/** A random id for the visitor, minted with each new assignment; HttpOnly. */
export const VISITOR_COOKIE = 'je_vid';
/** How long one assignment (and its visitor id) lasts. */
export const ASSIGNMENT_MAX_AGE = 30 * 24 * 60 * 60;
/** `?hero=<id>` shows that variant for previews, marked as forced. */
export const HERO_PARAM = 'hero';
/** The internal route the middleware rewrites `/` to, one static page per variant. */
export const HERO_ROUTE = '/hero';

/** The engagement events recorded with the variant, as stored in D1. */
export const AB_EVENTS = [
  'search',
  'product_opened',
  'reel_played',
  'github_click',
  'run_site_click',
  'command_copied',
  'suggestion_sent',
  'contact_sent',
] as const;

export type AbEventName = (typeof AB_EVENTS)[number];

const VARIANT_IDS: ReadonlySet<string> = new Set(HERO_VARIANTS.map(v => v.id));

export function isHeroVariant(value: unknown): value is HeroVariantId {
  return typeof value === 'string' && VARIANT_IDS.has(value);
}

const inSplit = (variant: HeroVariant) => variant.enabled && variant.weight > 0;

/** True when `value` is a variant new visitors can still be assigned. */
export function isAssignable(value: unknown): value is HeroVariantId {
  return HERO_VARIANTS.some(
    variant => variant.id === value && inSplit(variant)
  );
}

/**
 * A variant drawn by weight from the enabled ones; `unit` is uniform in
 * [0, 1). With nothing enabled, everyone sees the control.
 */
export function pickVariant(unit: number): HeroVariantId {
  const pool = HERO_VARIANTS.filter(inSplit);
  const total = pool.reduce((sum, variant) => sum + variant.weight, 0);
  let point = unit * total;
  for (const variant of pool) {
    point -= variant.weight;
    if (point < 0) return variant.id;
  }
  return pool.at(-1)?.id ?? CONTROL;
}

const VISITOR_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function isVisitorId(value: unknown): value is string {
  return typeof value === 'string' && VISITOR_ID.test(value);
}
