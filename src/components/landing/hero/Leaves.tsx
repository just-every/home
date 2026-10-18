'use client';

import { useRef } from 'react';

import styles from './leaves.module.css';
import { useWind } from './wind';

const ART = '/landing/hero/wind';

/** The cloud art's box (Rainfall.tsx measures in the same units). */
const ART_W = 1120;
const ART_H = 540;

const pct = (n: number, of: number) => `${((n / of) * 100).toFixed(3)}%`;

/**
 * The leaves and petals the wind blows across, each waiting unseen at the
 * cloud's right end, over the gap between the cloud and the stack card
 * (wind.ts picks one or two each time). They are painted in light tints
 * like the drops and coins they cross, against the dusk: the leaves in the
 * page's mint, the petals in blossom pink.
 */
const LEAVES = [
  { art: 'leaf-a', w: 62, h: 64.5, y: 360 },
  { art: 'petal-a', w: 46, h: 42.4, y: 420 },
  { art: 'leaf-b', w: 74, h: 37.3, y: 390 },
  { art: 'petal-b', w: 50, h: 33.5, y: 450 },
] as const;
const LEAF_X = 1110;

/**
 * Now and then a painted leaf or petal blows across the rain, from the
 * cloud's right end out past the screen's left edge (wind.ts). A layer of
 * its own over the cloud art's box, above the rain and under the cloud, so
 * the rain never moves with it; the cards and the copy sit over it.
 */
export function Leaves() {
  const root = useRef<HTMLDivElement | null>(null);
  const leaves = useRef<(HTMLSpanElement | null)[]>([]);

  useWind({ root, leaves, leafSize: LEAVES, from: LEAF_X, width: ART_W });

  return (
    <div ref={root} className={styles.layer} aria-hidden="true">
      {LEAVES.map((leaf, i) => (
        <span
          key={leaf.art}
          ref={el => {
            leaves.current[i] = el;
          }}
          className={styles.leaf}
          style={{
            left: pct(LEAF_X, ART_W),
            top: pct(leaf.y - leaf.h / 2, ART_H),
            width: pct(leaf.w, ART_W),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ART}/${leaf.art}.svg`}
            alt=""
            width={leaf.w}
            height={Math.round(leaf.h)}
            decoding="async"
          />
        </span>
      ))}
    </div>
  );
}
