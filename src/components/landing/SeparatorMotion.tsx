'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import styles from './separator-motion.module.css';

/**
 * The box that holds a painted SVG and its moving parts. Its parts' motion
 * runs only while the box is on screen: an IntersectionObserver sets
 * data-play, and the parts are paused without it (separator-motion.module.css).
 */
export function MotionStage({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.some(entry => entry.isIntersecting);
      if (visible) element.dataset.play = '';
      else delete element.dataset.play;
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.stage} ${className ?? ''}`}
      style={style}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
