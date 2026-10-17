'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Each slide's scroll position: its offset from the first slide. */
function positions(track: HTMLElement) {
  const slides = Array.from(track.children) as HTMLElement[];
  const first = slides[0]?.offsetLeft ?? 0;
  return slides.map(slide => slide.offsetLeft - first);
}

/** The slide the track rests on: the last at the scroll's end, else the nearest. */
function nearest(track: HTMLElement) {
  const lefts = positions(track);
  const max = track.scrollWidth - track.clientWidth;
  if (max > 0 && track.scrollLeft >= max - 2) return lefts.length - 1;
  let best = 0;
  lefts.forEach((left, i) => {
    const off = Math.abs(left - track.scrollLeft);
    if (off < Math.abs(lefts[best] - track.scrollLeft)) best = i;
  });
  return best;
}

const STEPS: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

/**
 * A scroll-snap carousel's state: which slide shows, whether the visitor has
 * moved it, and a polite "Slide 2 of 5" for screen readers after each move.
 * `go` scrolls to a slide (instantly under reduced motion); a swipe or
 * trackpad scroll updates the slide as it passes. Left and right arrows,
 * Home and End move it, except inside a video, whose controls own them. Under
 * reduced motion a reel's own autoplay is off, so a video the visitor started
 * is paused here when its slide is left; otherwise the reel pauses itself
 * when it scrolls out of view (Reel's IntersectionObserver).
 */
export function useCarousel(count: number) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [moved, setMoved] = useState(false);
  const [status, setStatus] = useState('');
  // The slide a programmatic scroll is heading for; passing slides are ignored.
  const pending = useRef<number | null>(null);
  const announced = useRef(0);

  const announce = useCallback(
    (i: number) => {
      if (announced.current === i) return;
      announced.current = i;
      setStatus(`Slide ${i + 1} of ${count}`);
    },
    [count]
  );

  const go = useCallback(
    (target: number) => {
      const el = track.current;
      if (!el) return;
      const i = Math.max(0, Math.min(count - 1, target));
      const left = Math.min(positions(el)[i], el.scrollWidth - el.clientWidth);
      setIndex(i);
      setMoved(true);
      announce(i);
      if (Math.abs(el.scrollLeft - left) < 1) return;
      pending.current = i;
      el.scrollTo({ left, behavior: reducedMotion() ? 'auto' : 'smooth' });
    },
    [count, announce]
  );

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let timer = 0;
    let frame = 0;
    // A scroll has settled when no scroll event follows for a moment
    // (scrollend is not everywhere yet).
    const settle = () => {
      pending.current = null;
      const i = nearest(el);
      setIndex(i);
      announce(i);
    };
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, 120);
      if (pending.current !== null) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setIndex(nearest(el));
        setMoved(true);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [announce]);

  useEffect(() => {
    const el = track.current;
    if (!el || !reducedMotion()) return;
    Array.from(el.children).forEach((slide, i) => {
      if (i === index) return;
      slide.querySelectorAll('video').forEach(video => {
        if (!video.paused) video.pause();
      });
    });
  }, [index]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if ((event.target as HTMLElement).closest('video')) return;
      let target: number;
      if (event.key in STEPS) target = index + STEPS[event.key];
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = count - 1;
      else return;
      event.preventDefault();
      go(target);
    },
    [count, go, index]
  );

  return { track, index, moved, status, go, onKeyDown };
}
