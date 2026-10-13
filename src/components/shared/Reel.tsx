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
  seed: Pick<Seed, 'name' | 'line' | 'reel'>;
  /**
   * Names a second player of the same reel on the page, so its download is
   * its own: a browser holds a second request for a file until the first,
   * from a paused player elsewhere, finishes.
   */
  player?: string;
};

/**
 * An accessible demo video. It has no styling opinions: size it with
 * `className`. It shows its poster and loads nothing until it plays. Unless
 * the visitor asked for reduced motion it plays muted while at least half of
 * it shows and pauses when it leaves; once the visitor pauses it (or it
 * ends), it stays paused until they play it again. With reduced motion the
 * visitor presses play.
 */
export function Reel({ seed, player, className, ...rest }: ReelProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const file = assetUrl(seed.reel.src);
  const src = player ? `${file}?player=${encodeURIComponent(player)}` : file;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let started = false;
    let pausing = false;
    let stopped = false;
    const onPause = () => {
      if (pausing) pausing = false;
      else stopped = true;
    };
    const onPlay = () => {
      stopped = false;
    };
    video.addEventListener('pause', onPause);
    video.addEventListener('play', onPlay);

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[entries.length - 1];
        if (entry.intersectionRatio < 0.5) {
          if (video.paused) return;
          pausing = true;
          video.pause();
        } else if (video.paused && !stopped) {
          // Muted the first time; after that, as the visitor left it.
          if (!started) video.muted = true;
          started = true;
          video.play().catch(() => {});
        }
      },
      { threshold: [0, 0.5] }
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener('pause', onPause);
      video.removeEventListener('play', onPlay);
    };
  }, [src]);

  return (
    <video
      {...rest}
      ref={ref}
      className={className}
      src={src}
      poster={seed.reel.poster}
      width={1280}
      height={720}
      playsInline
      controls
      preload="none"
      aria-label={demoLabel(seed.name, seed.line)}
    />
  );
}
