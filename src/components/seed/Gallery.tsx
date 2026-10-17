'use client';

import { useId } from 'react';

import ui from '@/components/landing/label.module.css';
import { Reel } from '@/components/shared/Reel';

import { Frame } from './Frame';
import styles from './gallery.module.css';
import type { GallerySlide } from './model';
import { useCarousel } from './useCarousel';

type Props = {
  name: string;
  line: string;
  slides: GallerySlide[];
};

/**
 * A seed's pictures under its header: the reel first where it has one, then
 * the still of its homepage, then its product screenshots, each in a window
 * frame with its caption under it. One picture stands alone. More flick
 * through: a swipe (the next slide peeking on a phone), the arrows beside or
 * over the stage, the thumbnails (dots on a phone) or the arrow keys.
 */
export function Gallery({ name, line, slides }: Props) {
  if (slides.length === 1) {
    return (
      <div className={styles.gallery}>
        <Slide slide={slides[0]} name={name} line={line} eager />
      </div>
    );
  }
  return <Carousel name={name} line={line} slides={slides} />;
}

function Carousel({ name, line, slides }: Props) {
  const { track, index, moved, status, go, onKeyDown } = useCarousel(
    slides.length
  );
  const id = useId();
  const count = slides.length;
  return (
    <section
      className={`${styles.gallery} ${styles.carousel}`}
      aria-roledescription="carousel"
      aria-label={`Pictures of ${name}`}
    >
      <div className={styles.stage}>
        {/* The arrows come first, so a tab reaches them before a video's own
            controls. */}
        <button
          type="button"
          className={`${styles.arrow} ${styles.prev}`}
          aria-label="Previous slide"
          aria-controls={id}
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          <Chevron flip />
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.next}`}
          aria-label="Next slide"
          aria-controls={id}
          disabled={index === count - 1}
          onClick={() => go(index + 1)}
        >
          <Chevron />
        </button>
        <div
          className={styles.track}
          id={id}
          ref={track}
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.kind === 'reel' ? 'reel' : slide.src}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              <Slide
                slide={slide}
                name={name}
                line={line}
                // The first loads with the page; a neighbour of the slide
                // in view loads once the visitor starts flicking.
                eager={i === 0 || (moved && Math.abs(i - index) <= 1)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.picker}>
        {slides.map((slide, i) => (
          <button
            key={slide.kind === 'reel' ? 'reel' : slide.src}
            type="button"
            className={styles.thumb}
            aria-label={`Show slide ${i + 1} of ${count}: ${slide.caption}`}
            aria-controls={id}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => go(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.thumb}
              alt=""
              aria-hidden="true"
              width={80}
              height={45}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            {slide.kind === 'reel' ? <span className={styles.play} /> : null}
          </button>
        ))}
      </div>
      <p className={ui.srOnly} aria-live="polite" aria-atomic="true">
        {status}
      </p>
    </section>
  );
}

/** One picture in its frame: the reel, or a still (lazy unless `eager`). */
function Slide({
  slide,
  name,
  line,
  eager,
}: {
  slide: GallerySlide;
  name: string;
  line: string;
  eager: boolean;
}) {
  if (slide.kind === 'reel') {
    return (
      <Frame host={null} ratio={16 / 9} caption={slide.caption}>
        <Reel seed={{ name, line, reel: slide.reel }} />
      </Frame>
    );
  }
  return (
    <Frame
      host={slide.host}
      ratio={slide.width / slide.height}
      caption={slide.caption}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.src}
        alt={slide.alt}
        width={slide.width}
        height={slide.height}
        loading={eager ? undefined : 'lazy'}
        decoding="async"
        draggable={false}
      />
    </Frame>
  );
}

function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M7.5 4.5 13 10l-5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
