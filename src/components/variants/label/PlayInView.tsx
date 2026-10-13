'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface PlayInViewProps {
  className?: string;
  children: ReactNode;
}

type State = 'still' | 'ready' | 'play';

/**
 * Plays its children's entrance once, when it scrolls into view. It renders
 * the finished state until then: with reduced motion, without JavaScript, or
 * when it is already on screen at load, nothing moves.
 */
export function PlayInView({ className, children }: PlayInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>('still');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    setState('ready');
    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        setState('play');
      },
      { threshold: 0.2 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} data-state={state}>
      {children}
    </div>
  );
}
