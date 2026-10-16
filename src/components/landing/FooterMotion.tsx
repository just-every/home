'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

import layout from './footer-motion.json';
import styles from './footer-motion.module.css';

type Box = number[];

const [VX, VY, VW, VH] = layout.view;
const SRC = '/landing/footer/motion';

/** A part's box in the art as a percentage box over the art, and its pivot. */
function place(box: Box, origin?: number[]): CSSProperties {
  const [x, y, w, h] = box;
  return {
    left: `${((x - VX) / VW) * 100}%`,
    top: `${((y - VY) / VH) * 100}%`,
    width: `${(w / VW) * 100}%`,
    height: `${(h / VH) * 100}%`,
    ...(origin && {
      transformOrigin: `${((origin[0] - x) / w) * 100}% ${((origin[1] - y) / h) * 100}%`,
    }),
  };
}

/** The pivot of a part, for an element that fills the part's box. */
function pivot(box: Box, origin: number[]): CSSProperties {
  const [x, y, w, h] = box;
  return {
    transformOrigin: `${((origin[0] - x) / w) * 100}% ${((origin[1] - y) / h) * 100}%`,
  };
}

function Part({
  name,
  className,
}: {
  name: keyof typeof layout.parts;
  className: string;
}) {
  const part = layout.parts[name] as { box: Box; origin?: Box };
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={`${SRC}/${name}.svg`}
      style={place(part.box, part.origin)}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}

const BIRDS = ['bird1', 'bird2', 'bird3'] as const;

/** Class names, leaving out any the style sheet does not define. */
const cx = (...names: (string | undefined)[]) =>
  names.filter(Boolean).join(' ');

/**
 * The footer art's moving parts, laid exactly over the static art (the parent
 * is the art's full box): three birds crossing the sky, the person's head,
 * the dog's ear and tail, petals falling from the crown and glints on the
 * sea. Each part is its own small image moved by CSS transforms and opacity
 * only, so the browser composites them and never repaints the art. They run
 * only while the footer is on screen, and never with reduced motion.
 */
export function FooterMotion() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries)
        element.toggleAttribute('data-run', entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.motion} aria-hidden="true">
      {Array.from({ length: layout.glints.sets }, (_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          className={cx(styles.glint, styles[`glint${i + 1}`])}
          src={`${SRC}/glints-${i + 1}.svg`}
          style={place(layout.glints.box)}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ))}
      {BIRDS.map(name => {
        const { box, origin } = layout.parts[name];
        return (
          <div
            key={name}
            className={cx(styles.bird, styles[name])}
            style={place(box)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.wings}
              src={`${SRC}/${name}.svg`}
              style={pivot(box, origin)}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        );
      })}
      <Part name="head" className={styles.head} />
      <Part name="ear" className={styles.ear} />
      <Part name="tail" className={styles.tail} />
      <Part name="dog" className={styles.still} />
      {layout.petals.map((petal, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          className={cx(styles.petal, styles[`fall-${petal.path}`])}
          src={`${SRC}/petal.svg`}
          style={{
            ...place(petal.box),
            animationDuration: `${petal.seconds}s`,
            animationDelay: `${petal.delay}s`,
          }}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}
