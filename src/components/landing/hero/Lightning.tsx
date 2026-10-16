'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';

import styles from './lightning.module.css';

/** The cloud art's box, which every position and size below is measured in. */
const ART_W = 1120;
const ART_H = 540;

const pct = (n: number, of: number) => `${((n / of) * 100).toFixed(3)}%`;

/** Seconds before the first flash, and between one flash and the next. */
const FIRST: [number, number] = [6, 12];
const NEXT: [number, number] = [12, 25];

/** How often a flash shows a bolt under the cloud. */
const BOLT_CHANCE = 0.5;

/**
 * Two painted bolts under the cloud, their tops tucked behind it, over the
 * gap above the stack card. One is drawn mirrored.
 */
const BOLTS = [
  { x: 350, y: 262, w: 84, h: 236, flip: false },
  { x: 690, y: 268, w: 74, h: 206, flip: true },
] as const;

/**
 * One flash: a quick rise and a slow fall, never a flicker, so it is one
 * flash however it is counted (WCAG 2.3.1 allows three a second; these
 * come twelve seconds or more apart). Only opacity changes.
 */
const FLASH: Keyframe[] = [
  { opacity: 0, easing: 'ease-out' },
  { opacity: 1, offset: 0.08, easing: 'ease-in-out' },
  { opacity: 0.6, offset: 0.3, easing: 'ease-in' },
  { opacity: 0 },
];
const FLASH_MS = 1300;

/** A bolt drops from the cloud in a blink, holds, and fades. */
const boltFrames = (flip: boolean): Keyframe[] => {
  const base = flip ? 'scaleX(-1) ' : '';
  return [
    { opacity: 0, transform: `${base}scaleY(0.5)`, easing: 'ease-out' },
    { opacity: 1, transform: `${base}scaleY(1)`, offset: 0.12 },
    { opacity: 1, transform: `${base}scaleY(1)`, offset: 0.4 },
    { opacity: 0, transform: `${base}scaleY(1)` },
  ];
};
const BOLT_MS = 700;

const between = ([lo, hi]: [number, number]) =>
  (lo + Math.random() * (hi - lo)) * 1000;

/**
 * Now and then, lightning in the rain cloud: the sky behind it lifts a
 * little, the cloud brightens, and sometimes a small flat bolt shows under
 * it for a moment. Each part is a still layer whose opacity (and, for a
 * bolt, transform) the browser animates on the compositor; the painted
 * cloud itself never changes (a brightened copy fades over it). The timer
 * only strikes while the cloud is on screen and the tab is in view, and
 * never under reduced motion.
 */
export function Lightning({ cloud }: { cloud: string }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const skyRef = useRef<HTMLSpanElement | null>(null);
  const glowRef = useRef<HTMLImageElement | null>(null);
  const boltRefs = useRef<(SVGSVGElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const sky = skyRef.current;
    const glow = glowRef.current;
    if (!root || !sky || !glow || typeof IntersectionObserver === 'undefined')
      return;
    if (typeof root.animate !== 'function') return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let running: Animation[] = [];

    const strike = () => {
      if (!visible || document.hidden || motion.matches) return;
      running = [
        sky.animate(FLASH, { duration: FLASH_MS }),
        glow.animate(FLASH, { duration: FLASH_MS }),
      ];
      if (Math.random() < BOLT_CHANCE) {
        const i = Math.floor(Math.random() * BOLTS.length);
        const bolt = boltRefs.current[i];
        if (bolt) {
          running.push(
            bolt.animate(boltFrames(BOLTS[i].flip), { duration: BOLT_MS })
          );
        }
      }
    };

    const schedule = (range: [number, number]) => {
      timer = setTimeout(() => {
        strike();
        schedule(NEXT);
      }, between(range));
    };

    const stop = () => {
      clearTimeout(timer);
      running.forEach(animation => animation.cancel());
      running = [];
    };

    const onMotion = () => {
      stop();
      if (!motion.matches) schedule(FIRST);
    };

    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
    });
    observer.observe(root);
    motion.addEventListener('change', onMotion);
    if (!motion.matches) schedule(FIRST);

    return () => {
      stop();
      observer.disconnect();
      motion.removeEventListener('change', onMotion);
    };
  }, []);

  return (
    <div className={styles.layer} ref={rootRef} aria-hidden="true">
      <span className={styles.sky} ref={skyRef} />
      {BOLTS.map((bolt, i) => (
        <svg
          key={i}
          className={styles.bolt}
          ref={el => {
            boltRefs.current[i] = el;
          }}
          style={
            {
              left: pct(bolt.x, ART_W),
              top: pct(bolt.y, ART_H),
              width: pct(bolt.w, ART_W),
              height: pct(bolt.h, ART_H),
            } as CSSProperties
          }
          viewBox="0 0 54 160"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            className={styles.boltShade}
            d="M21 0H44L36 58H52L13 160L22 86H6z"
          />
          <path
            className={styles.boltFace}
            d="M19 0H40L32 58H47L11 156L19 82H4z"
          />
        </svg>
      ))}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.glow}
        ref={glowRef}
        src={cloud}
        alt=""
        width={ART_W}
        height={ART_H}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
