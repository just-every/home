'use client';

import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { Reel } from '@/components/shared/Reel';
import { demoLabel, reels } from '@/content/landing';
import { seeds } from '@/data/seeds';

import m from './manifesto.module.css';
import { ReelFacts } from './ReelFacts';
import styles from './running.module.css';
import { useWideScreen } from './useWideScreen';

/** Every seed with a reel, in collection order. New reels appear on their own. */
const reelSeeds = seeds.filter(seed => seed.reel);
const panelId = 'manifesto-reel-panel';

function reelFromHash(): string | null {
  const match = window.location.hash.match(/^#reel-(.+)$/);
  if (!match) return null;
  return reelSeeds.some(seed => seed.slug === match[1]) ? match[1] : null;
}

function nextIndex(key: string, index: number, count: number): number | null {
  if (key === 'ArrowRight') return (index + 1) % count;
  if (key === 'ArrowLeft') return (index - 1 + count) % count;
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  return null;
}

export function Running() {
  const [active, setActive] = useState(reelSeeds[0]?.slug ?? '');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const screen = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(true);
  const wide = useWideScreen();

  useEffect(() => {
    const sync = () => {
      const slug = reelFromHash();
      if (slug) setActive(slug);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // Mirror the reel's play state so the big play button shows only while paused.
  useEffect(() => {
    const video = screen.current?.querySelector('video');
    if (!video) return;
    const update = () => setPaused(video.paused);
    update();
    video.addEventListener('play', update);
    video.addEventListener('pause', update);
    video.addEventListener('ended', update);
    return () => {
      video.removeEventListener('play', update);
      video.removeEventListener('pause', update);
      video.removeEventListener('ended', update);
    };
  }, [active, wide]);

  const seed = reelSeeds.find(item => item.slug === active);
  if (!seed) return null;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = reelSeeds.findIndex(item => item.slug === active);
    const next = nextIndex(event.key, index, reelSeeds.length);
    if (next === null) return;
    event.preventDefault();
    setActive(reelSeeds[next].slug);
    tabs.current[next]?.focus();
  };

  const play = () => {
    const video = screen.current?.querySelector('video');
    if (!video) return;
    video.play().catch(() => {});
    video.focus();
  };

  return (
    <section
      id={reels.id}
      className={styles.section}
      aria-labelledby="manifesto-running-title"
    >
      <div className={`${m.container} ${styles.grid}`}>
        <div className={styles.copy}>
          <h2
            id="manifesto-running-title"
            className={`${m.display} ${styles.title}`}
          >
            <span>See them</span> <span>running.</span>
          </h2>
          <p className={styles.lede}>{reels.line}</p>
        </div>

        <div className={styles.panel}>
          <div
            role="tablist"
            aria-label="Product reels"
            className={styles.tabs}
            onKeyDown={onKeyDown}
          >
            {reelSeeds.map((item, index) => {
              const selected = item.slug === active;
              return (
                <button
                  key={item.slug}
                  ref={element => {
                    tabs.current[index] = element;
                  }}
                  id={`reel-${item.slug}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  className={styles.tab}
                  onClick={() => setActive(item.slug)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.markLight ?? item.mark}
                    alt={`${item.name} logo`}
                    width={28}
                    height={28}
                  />
                  {item.name}
                </button>
              );
            })}
          </div>
          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={`reel-${seed.slug}`}
            className={styles.stage}
          >
            <div ref={screen} className={styles.screen}>
              {wide === null || !seed.reel ? (
                // Until the screen size is known, show the reel's poster so
                // the page never fetches an encode it then throws away.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={seed.reel?.poster}
                  alt={demoLabel(seed.name, seed.line)}
                  width={1920}
                  height={1080}
                  className={styles.video}
                />
              ) : (
                <Reel
                  key={seed.slug}
                  seed={seed}
                  size={wide ? 'full' : 'small'}
                  className={styles.video}
                />
              )}
              {paused ? (
                <button
                  type="button"
                  className={styles.bigPlay}
                  onClick={play}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Play size={34} strokeWidth={0} fill="currentColor" />
                </button>
              ) : null}
            </div>
            <p className={styles.captionTitle}>{seed.headline ?? seed.name}</p>
            <p className={styles.captionLine}>{seed.line}</p>
          </div>
        </div>

        <ReelFacts seed={seed} onPlay={play} />
      </div>
    </section>
  );
}
