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
  /** `small` serves the 1280x720 encode. */
  size?: 'full' | 'small';
};

/**
 * An accessible demo video. It has no styling opinions: size it with
 * `className`. Unless the visitor asked for reduced motion it plays muted the
 * first time it scrolls into view; otherwise the visitor presses play.
 */
export function Reel({ seed, size = 'full', className, ...rest }: ReelProps) {
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

  const full = size === 'full';
  return (
    <video
      {...rest}
      ref={ref}
      className={className}
      src={assetUrl(full ? reel.src : reel.src720)}
      poster={reel.poster}
      width={full ? 1920 : 1280}
      height={full ? 1080 : 720}
      playsInline
      controls
      preload="metadata"
      aria-label={demoLabel(seed.name, seed.line)}
    />
  );
}
