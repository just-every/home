import type { CSSProperties } from 'react';

import styles from './sun.module.css';

/**
 * The sun, in layers laid over one another on the art's 960 x 720 box, each
 * cropped to what it draws: three soft glows that breathe, the small static
 * pieces between them, and two thin pink clouds that drift. Each is its own
 * still image, so the browser moves and fades them on the compositor and
 * never repaints the art.
 */
const layers = [
  {
    src: 'glow-0',
    className: styles.glow0,
    left: '43.750%',
    top: '19.722%',
    width: '50.104%',
    height: '43.194%',
    origin: '49.9% 49.8%',
  },
  {
    src: 'glow-1',
    className: styles.glow1,
    left: '43.750%',
    top: '25.556%',
    width: '43.021%',
    height: '31.250%',
    origin: '58.1% 50.2%',
  },
  {
    src: 'glow-2',
    className: styles.glow2,
    left: '43.750%',
    top: '31.056%',
    width: '39.333%',
    height: '21.806%',
    origin: '63.6% 46.8%',
  },
  {
    src: 'base',
    className: styles.base,
    left: '79.062%',
    top: '58.333%',
    width: '14.792%',
    height: '2.361%',
  },
  {
    src: 'cloud-a',
    className: styles.cloudA,
    left: '43.542%',
    top: '46.986%',
    width: '37.917%',
    height: '6.042%',
  },
  {
    src: 'cloud-b',
    className: styles.cloudB,
    left: '78.958%',
    top: '58.194%',
    width: '15.208%',
    height: '2.694%',
  },
] as const;

export function SunLayers() {
  return (
    <>
      {layers.map(layer => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={layer.src}
          className={`${styles.layer} ${layer.className}`}
          style={
            {
              left: layer.left,
              top: layer.top,
              width: layer.width,
              height: layer.height,
              ...('origin' in layer ? { transformOrigin: layer.origin } : null),
            } as CSSProperties
          }
          src={`/landing/hero/sun-${layer.src}.svg`}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ))}
    </>
  );
}
