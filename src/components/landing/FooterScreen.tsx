import type { CSSProperties } from 'react';

import layout from './footer-motion.json';
import styles from './footer-screen.module.css';

const [VX, VY, VW, VH] = layout.view;
const { origin, x, y, inset, radius, pitch, line, band, seconds, rows } =
  layout.screen;

/** The code area, in its own units: the screen less its inset. */
const W = x[0] - inset[0] - inset[2];
const H = y[1] - inset[1] - inset[3];
const L = rows.length;
/** One loop: every row typed once while the block scrolls up L rows. */
const T = L * seconds;
/** The column holds the rows twice: the ones already typed, then the ones typing. */
const COLUMN = 2 * L * pitch;

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * The screen's frame: a box of the screen's size at its top left corner,
 * slanted onto the screen's edges, so everything inside is laid out square.
 */
const frame: CSSProperties = {
  left: pct(origin[0] - VX, VW),
  top: pct(origin[1] - VY, VH),
  width: pct(x[0], VW),
  height: pct(y[1], VH),
  transform: `matrix(1, ${x[1] / x[0]}, ${y[0] / y[1]}, 1, 0, 0)`,
};

const area: CSSProperties = {
  left: pct(inset[0], x[0]),
  top: pct(inset[1], y[1]),
  width: pct(W, x[0]),
  height: pct(H, y[1]),
  borderRadius: `${pct(radius, W)} / ${pct(radius, H)}`,
};

/** Rows show down to just past the row being typed, never the ones below it. */
const V = band + (line + pitch) / 2;
const view: CSSProperties = { height: pct(V, H) };

const column: CSSProperties = {
  top: pct(band - L * pitch, V),
  height: pct(COLUMN, V),
  animationDuration: `${T}s`,
};

function Row({ index, typing }: { index: number; typing: boolean }) {
  const segments = rows[index % L];
  const start = segments[0]?.[0] ?? 14;
  const end = segments.length
    ? Math.max(...segments.map(([s, n]) => s + n))
    : start;
  const top = pct(index * pitch, COLUMN);
  const height = pct(line, COLUMN);
  // A row starts typing a slot after the one above it.
  const timing = {
    animationDuration: `${T}s`,
    animationDelay: `${(index % L) * seconds - T}s`,
  };
  const caret = 3;
  return (
    <>
      {segments.length > 0 && (
        <span
          className={typing ? `${styles.row} ${styles.typing}` : styles.row}
          style={{
            top,
            height,
            left: pct(start, W),
            width: pct(end - start, W),
            ...(typing && {
              ...timing,
              animationTimingFunction: `steps(${Math.ceil((end - start) / 5)}, end)`,
            }),
          }}
        >
          {segments.map(([s, n]) => (
            <span
              key={s}
              className={styles.text}
              style={{
                left: pct(s - start, end - start),
                width: pct(n, end - start),
              }}
            />
          ))}
        </span>
      )}
      {typing && (
        <span
          className={styles.caret}
          style={
            {
              top,
              height,
              left: pct(start, W),
              width: pct(caret, W),
              '--to': `${((end - start + 1.5) / caret) * 100}%`,
              ...timing,
              animationTimingFunction: `steps(${Math.max(1, Math.ceil((end - start) / 5))}, end)`,
            } as CSSProperties
          }
        >
          <span className={styles.blink} />
        </span>
      )}
    </>
  );
}

/**
 * The laptop's screen, alive: code types out a row at a time at the bottom
 * of the block, a caret blinking at the row's end, while the block scrolls
 * slowly up. It covers the art's screen in the art's own dark and mid tones
 * and its pale code rows, clipped to the screen's slanted, rounded shape,
 * and loops seamlessly: the column holds the typed rows above the typing
 * ones, and moves up exactly one copy per loop. Transforms and opacity only.
 */
export function FooterScreen() {
  return (
    <div className={styles.frame} style={frame}>
      <div className={styles.area} style={area}>
        <div className={styles.glow} />
        <div className={styles.view} style={view}>
          <div className={styles.column} style={column}>
            {Array.from({ length: 2 * L }, (_, i) => (
              <Row key={i} index={i} typing={i >= L} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
