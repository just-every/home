'use client';

import { useEffect, useRef } from 'react';
import type { ComponentProps } from 'react';

import { demoLabel } from '@/content/landing';
import type { Seed } from '@/data/seed-types';
import { assetUrl } from '@/lib/asset-url';

type ReelProps = Omit<
  ComponentProps<'video'>,
  'src' | 'poster' | 'aria-label' | 'children'
> & {
  /** A seed with a reel. Renders nothing when it has none. */
  seed: Pick<Seed, 'name' | 'line' | 'reel'>;
};

/**
 * An accessible demo video. It has no styling opinions: size it with
 * `className`. Unless the visitor asked for reduced motion it plays muted the
 * first time it scrolls into view; otherwise the visitor presses play.
 */
export function Reel({ seed, className, ...rest }: ReelProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const { reel } = seed;

  useEffect(() => {
    const video = ref.current;
    if (!video || !reel) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        video.muted = true;
        video.play().catch(() => {});
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reel]);

  if (!reel) return null;

  return (
    <video
      {...rest}
      ref={ref}
      className={className}
      src={assetUrl(reel.src)}
      poster={reel.poster}
      width={1280}
      height={720}
      playsInline
      controls
      preload="metadata"
      aria-label={demoLabel(seed.name, seed.line)}
    />
  );
}
