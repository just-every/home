import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Now and then, a breath of wind: a painted leaf or petal (now and then a
 * second just behind it) blows across from the rain cloud's right end and
 * out past the screen's left edge. The rain never moves with it. The first
 * comes within ten seconds, so a visitor sees one; then one every fifteen
 * to thirty seconds, at random, never the same twice.
 *
 * A leaf is a small layer the browser moves on the compositor (transform
 * and opacity only). It only sets off while the rain is on screen and the
 * tab is in view (one that falls due off screen blows two to four seconds
 * after the rain comes back into view), a leaf in flight pauses while the
 * rain is off screen, and under reduced motion none blows at all.
 */

export type WindParts = {
  /** The cloud art's box; the wind only blows while it is on screen. */
  root: RefObject<HTMLElement | null>;
  /** The leaves and petals, each with its own width and height in art units. */
  leaves: RefObject<(HTMLElement | null)[]>;
  leafSize: readonly { w: number; h: number }[];
  /** Where a leaf sets off (art x). */
  from: number;
  /** The box's width in art units, to find the screen's left edge in. */
  width: number;
};

/** Seconds before the first leaf, and from one to the next. */
const FIRST: [number, number] = [4, 9];
const NEXT: [number, number] = [15, 30];
/** Seconds from the rain coming into view to a leaf it missed. */
const SOON: [number, number] = [2, 4];

/** A leaf's pace: seconds for every 1330 art units it flies. */
const PACE: [number, number] = [2.2, 4.7];
const PACE_SPAN = 1330;

/** How often a second leaf follows the first. */
const PAIR_CHANCE = 0.375;

const between = ([lo, hi]: [number, number]) => lo + Math.random() * (hi - lo);

/** A leaf's flight: across the sky, bobbing and tumbling, faded in and out. */
function flight(size: { w: number; h: number }, span: number): Keyframe[] {
  const steps = 8;
  const lift = between([-60, 40]);
  const bob = between([28, 50]);
  const turns = between([0.9, 1.6]) * (Math.random() < 0.5 ? -1 : 1);
  const out: Keyframe[] = [];
  for (let k = 0; k <= steps; k++) {
    const f = k / steps;
    // Quick at first in the breath's push, then slowing as it passes.
    const along = 1 - (1 - f) ** 1.6;
    const x = (-along * span * 100) / size.w;
    const y = ((lift * f + Math.sin(f * Math.PI * 2.2) * bob) * 100) / size.h;
    const flip = 0.55 + 0.45 * Math.abs(Math.cos(f * Math.PI * 1.7));
    out.push({
      offset: f,
      transform: `translate(${x.toFixed(1)}%, ${y.toFixed(1)}%) rotate(${(turns * 360 * f).toFixed(0)}deg) scaleY(${flip.toFixed(2)})`,
      opacity: f === 0 || f === 1 ? 0 : f < 0.15 || f > 0.85 ? 0.7 : 1,
    });
  }
  return out;
}

export function useWind(parts: WindParts) {
  useEffect(() => {
    const root = parts.root.current;
    if (!root) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (typeof root.animate !== 'function') return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    // A leaf that fell due while the rain was off screen: it blows soon
    // after the rain comes into view instead (on a phone the rain starts
    // below the fold).
    let owed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    // Each leaf's current flight, if it has one.
    const flights: (Animation | null)[] = [];

    const flying = (i: number) => {
      const state = flights[i]?.playState;
      return state === 'running' || state === 'paused';
    };

    const blow = () => {
      if (document.hidden || motion.matches) return;
      if (!visible) {
        owed = true;
        return;
      }
      owed = false;
      const leaves = parts.leaves.current ?? [];
      const free = leaves.map((_, i) => i).filter(i => !flying(i));
      if (free.length === 0) return;
      // From the cloud's right end to the screen's left edge, wherever
      // the layout puts the cloud.
      const box = root.getBoundingClientRect();
      const edge = (-box.left * parts.width) / box.width;
      const span = parts.from - edge;
      const duration = (between(PACE) * 1000 * span) / PACE_SPAN;
      const first = free[Math.floor(Math.random() * free.length)];
      const picks = [first];
      const second = (first + 2) % leaves.length;
      if (Math.random() < PAIR_CHANCE && free.includes(second)) {
        picks.push(second);
      }
      picks.forEach((i, k) => {
        const leaf = leaves[i];
        if (!leaf) return;
        flights[i] = leaf.animate(
          flight(parts.leafSize[i], span + parts.leafSize[i].w),
          {
            duration,
            delay: 150 + k * between([350, 700]),
            easing: 'linear',
          }
        );
      });
    };

    const schedule = (range: [number, number]) => {
      timer = setTimeout(
        () => {
          blow();
          schedule(NEXT);
        },
        between(range) * 1000
      );
    };

    const stop = () => {
      clearTimeout(timer);
      flights.forEach(animation => animation?.cancel());
      flights.length = 0;
    };

    const onMotion = () => {
      stop();
      if (!motion.matches) schedule(FIRST);
    };

    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      // A leaf in flight waits, off screen, where it was.
      flights.forEach(animation => {
        if (!visible && animation?.playState === 'running') animation.pause();
        if (visible && animation?.playState === 'paused') animation.play();
      });
      if (visible && owed && !motion.matches) {
        owed = false;
        clearTimeout(timer);
        schedule(SOON);
      }
    });
    observer.observe(root);
    motion.addEventListener('change', onMotion);
    if (!motion.matches) schedule(FIRST);

    return () => {
      stop();
      observer.disconnect();
      motion.removeEventListener('change', onMotion);
    };
    // The parts are refs and fixed tables: the wind is set up once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
