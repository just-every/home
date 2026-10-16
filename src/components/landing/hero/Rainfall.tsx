import type { CSSProperties } from 'react';

import styles from './rainfall.module.css';
import { rainItems } from './rain-items';
import type { SpecialKind } from './rain-items';
import {
  DROP_TILT,
  RAIN_FADE,
  RAIN_SIDES,
  RAIN_WINDOW,
  rainSheets,
} from './rain-sheets';

/** The cloud art's box, which every position and size below is measured in. */
const ART_W = 1120;
const ART_H = 540;

const VIEW: Record<SpecialKind, string> = {
  dollar: '-11 -22 22 44',
  coin: '-19 -19 38 38',
};

const pct = (n: number, of: number) => `${((n / of) * 100).toFixed(3)}%`;

/**
 * The shapes, drawn once and reused by every falling item. Their colours
 * are custom properties, so the hero's dusk sky can tint them (hero.module.css).
 */
function Sprites() {
  const v = (name: string, raw: string) => `var(--rf-${name}, ${raw})`;
  const drop = v('drop', '#9fc1e7');
  return (
    <svg className={styles.sprites} aria-hidden="true" focusable="false">
      <defs>
        <path
          id="rf-drop"
          style={{ fill: drop }}
          d="M0 0A4.1 4.1 0 0 0 7 4L18-13A4.1 4.1 0 0 0 11-18z"
        />
        <g
          id="rf-dollar"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ stroke: drop }}
        >
          <path
            strokeWidth="5.8"
            d="M6 -7.6C5 -11.4 1 -12.8 -2.2 -12.4C-7 -11.8 -7.8 -5.8 -2.8 -2.8C1.8 -0.2 7.6 1.4 7 6.6C6.4 11.8 0 13.4 -3.4 12.2C-5.2 11.6 -6.4 10.2 -6.8 8.6"
          />
          <path strokeWidth="4.6" d="M0.6 -18.4V-12.6M-0.6 12.6V18.4" />
        </g>
        <g id="rf-coin">
          <circle r="17" style={{ fill: v('coin-rim', '#e2a682') }} />
          <circle
            cx="-0.9"
            cy="-0.9"
            r="14.4"
            style={{ fill: v('coin-face', '#f2bf9b') }}
          />
          <circle
            cx="-0.9"
            cy="-0.9"
            r="8.6"
            style={{ fill: v('coin-core', '#eab08b') }}
          />
          <path
            style={{ fill: v('coin-shine', '#fde6d4') }}
            d="M-11.6 -2.8C-11 -8.6 -6.6 -12 -1.6 -12.4C-5.2 -10.4 -8.2 -7.4 -9.2 -2.6C-9.6 -1 -11.8 -1 -11.6 -2.8z"
          />
        </g>
      </defs>
    </svg>
  );
}

/**
 * The rain's moving parts, as layers laid exactly over the cloud art (same
 * box, drawn under the cloud so everything comes out of it). The painted
 * cloud stays a static image; here only `translate`, `rotate`, a coin's
 * `transform` tilt and `opacity` change, so the browser moves each layer on the compositor and
 * never repaints or re-rasterises the art. The painted drops are two sheets
 * (rain-sheets.ts); a third of what falls is a dollar sign or a
 * coin, larger, falling with the drops at their speed and slant, each its
 * own layer so it can sway or tilt as it comes down (rain-items.ts).
 */
export function Rainfall() {
  const w = RAIN_WINDOW;
  return (
    <div
      className={styles.layer}
      style={
        {
          '--edge-out': pct(RAIN_SIDES.out, ART_W),
          '--edge-in': pct(RAIN_SIDES.in, ART_W),
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <Sprites />
      <div
        className={styles.sheets}
        style={
          {
            left: pct(w.x, ART_W),
            top: pct(w.y, ART_H),
            width: pct(w.w, ART_W),
            height: pct(w.h, ART_H),
            '--fade-from': pct(RAIN_FADE.from - w.y, w.h),
            '--fade-to': pct(RAIN_FADE.to - w.y, w.h),
          } as CSSProperties
        }
      >
        {rainSheets.map((sheet, i) => {
          const b = sheet.box;
          const style = {
            left: pct(b.x - w.x, w.w),
            top: pct(b.y - w.y, w.h),
            width: pct(b.w, w.w),
            height: pct(b.h, w.h),
            opacity: sheet.opacity,
            '--dx': `${((sheet.dx / b.w) * 100).toFixed(2)}%`,
            '--dy': `${((sheet.dy / b.h) * 100).toFixed(2)}%`,
            '--t': `${sheet.t}s`,
            '--o': `${sheet.o.toFixed(2)}s`,
          } as CSSProperties;
          return (
            <span key={i} className={styles.sheet} style={style}>
              <svg
                viewBox={`${b.x.toFixed(1)} ${b.y.toFixed(1)} ${b.w.toFixed(1)} ${b.h.toFixed(1)}`}
                preserveAspectRatio="none"
                focusable="false"
              >
                {sheet.drops.map((d, j) => (
                  <use
                    key={j}
                    href="#rf-drop"
                    transform={`translate(${d.x.toFixed(1)} ${d.y.toFixed(1)}) scale(${sheet.scale}) rotate(${DROP_TILT})`}
                  />
                ))}
              </svg>
            </span>
          );
        })}
      </div>
      {rainItems.map((item, i) => {
        const h = item.w / item.aspect;
        const style = {
          left: pct(item.x - item.w / 2, ART_W),
          top: pct(item.y - h / 2, ART_H),
          width: pct(item.w, ART_W),
          '--dx': `${((item.dx / item.w) * 100).toFixed(1)}%`,
          '--dy': `${((item.dy / h) * 100).toFixed(1)}%`,
          '--p': item.p.toFixed(2),
          '--t': `${item.t.toFixed(2)}s`,
          '--o': `${item.o.toFixed(2)}s`,
          '--a': `${item.a.toFixed(0)}deg`,
          '--s': `${item.s.toFixed(1)}s`,
        } as CSSProperties;
        return (
          <span
            key={i}
            className={`${styles.item} ${styles[item.kind]}`}
            style={style}
          >
            <svg viewBox={VIEW[item.kind]} focusable="false">
              <use href={`#rf-${item.kind}`} />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
