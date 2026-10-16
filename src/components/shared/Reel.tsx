'use client';

import { useEffect, useRef } from 'react';
import type { ComponentProps } from 'react';

import { demoLabel } from '@/content/landing';
import type { Seed, SeedReel } from '@/data/seed-types';
import { assetUrl } from '@/lib/asset-url';
import { track, X_EVENTS } from '@/lib/x-pixel';

import { bindReelSound } from './reelSound';
import type { ReelSound } from './reelSound';

type ReelProps = Omit<
  ComponentProps<'video'>,
  'src' | 'poster' | 'aria-label' | 'children'
> & {
  seed: Pick<Seed, 'name' | 'line'> & { reel: SeedReel };
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
 * the visitor asked for reduced motion it plays while at least half of it
 * shows and pauses when it leaves; once the visitor pauses it (or it ends),
 * it stays paused until they play it again. Every reel shares one muted
 * preference (see reelSound): muted until the visitor unmutes any of them. With reduced motion the
 * visitor presses play. A play the visitor starts (never the autoplay) is
 * reported to the X pixel, once per player.
 */
export function Reel({ seed, player, className, ...rest }: ReelProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const sound = useRef<ReelSound | null>(null);
  // Set while this component's own autoplay is starting the video.
  const autoplaying = useRef(false);
  const name = seed.name;
  const file = assetUrl(seed.reel.src);
  const src = player ? `${file}?player=${encodeURIComponent(player)}` : file;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let reported = false;
    const onStart = () => {
      if (autoplaying.current) {
        autoplaying.current = false;
        return;
      }
      if (reported) return;
      reported = true;
      track(X_EVENTS.contentView, { content_name: name, content_type: 'reel' });
    };
    video.addEventListener('play', onStart);
    return () => video.removeEventListener('play', onStart);
  }, [src, name]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const bound = bindReelSound(video);
    sound.current = bound;
    return () => {
      bound.dispose();
      sound.current = null;
    };
  }, [src]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
          autoplaying.current = true;
          (sound.current?.play() ?? video.play()).catch(() => {
            autoplaying.current = false;
          });
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
