/**
 * The hero's arrangements of the copy around the two cards, offered to the
 * owner at /hero-preview/1 to /hero-preview/4 until he picks one. Each is a
 * CSS variant (hero.module.css) from 1280px wide; narrower screens stack
 * every layout the same way.
 *
 * 1. Text left, cards right, with a capped column so they never meet.
 * 2. Text centred above, the two cards side by side under it.
 * 3. The cards flank a centred text column: rain card left, sun card right,
 *    with a long switch arrow under the copy from one card to the other.
 * 4. A split heading row (headline left, subhead and button right), the
 *    cards spread wide below with the switch arrow between them.
 */
export const HERO_LAYOUTS = [1, 2, 3, 4] as const;

export type HeroLayout = (typeof HERO_LAYOUTS)[number];

/** The layout the home page uses. */
export const DEFAULT_HERO_LAYOUT: HeroLayout = 3;

export const isHeroLayout = (n: number): n is HeroLayout =>
  (HERO_LAYOUTS as readonly number[]).includes(n);

/**
 * The hero's background: the default rain-grey, or a darker option: the
 * storm, or the dusk halfway between the two.
 */
export type HeroTone = 'storm' | 'dusk';

/**
 * What falls from the rented stack's cloud, offered to the owner at
 * /hero-preview/rain-a to /hero-preview/rain-c until he picks one:
 * a. Gentle painted rain with three drops shaped like dollar signs.
 * b. A few small paper bills drifting down like leaves.
 * c. A few pale peach coins, some face-on and some tilted.
 */
export type HeroRain = 'a' | 'b' | 'c';

/** The rain the home page uses: the bills say what renting costs. */
export const DEFAULT_HERO_RAIN: HeroRain = 'b';
