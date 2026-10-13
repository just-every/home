'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { collection, reels } from '@/content/landing';
import { Reel } from '@/components/shared/Reel';

import { BrandMark } from './BrandMark';
import ui from './label.module.css';
import styles from './running.module.css';
import { volumeStyle, volumes } from './volumes';

/** Every volume that has a reel, in volume order. New reels appear here. */
const reelVolumes = volumes.filter(volume => volume.seed.reel);

const tabId = (slug: string) => `label-reel-tab-${slug}`;
const panelId = 'label-reel-panel';

export function Running() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(true);
  const screenRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const current = reelVolumes[active];
  const slug = current?.seed.slug;

  // Follow the reel element the shared Reel renders, so the big play button
  // shows only while it is paused.
  useEffect(() => {
    const video = screenRef.current?.querySelector('video');
    if (!video) return;
    const sync = () => setPaused(video.paused);
    sync();
    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    video.addEventListener('ended', sync);
    return () => {
      video.removeEventListener('play', sync);
      video.removeEventListener('pause', sync);
      video.removeEventListener('ended', sync);
    };
  }, [slug]);

  // "Watch it run" links on the collection cards pick their reel.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[data-reel]');
      if (!link) return;
      const index = reelVolumes.findIndex(
        volume => volume.seed.slug === link.getAttribute('data-reel')
      );
      if (index >= 0) setActive(index);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const play = useCallback(() => {
    const video = screenRef.current?.querySelector('video');
    video?.play().catch(() => {});
  }, []);

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = reelVolumes.length - 1;
    const targets: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  if (!current) return null;
  const { seed } = current;
  const caption = seed.headline ?? seed.line;

  return (
    <section
      className={styles.running}
      id={reels.id}
      aria-labelledby="label-running-heading"
    >
      <div className={styles.plant} aria-hidden="true" />
      <div className={`${ui.wrap} ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={ui.eyebrow}>Watch</p>
          <h2 className={ui.h2} id="label-running-heading">
            {reels.heading}
          </h2>
          <p className={`${ui.lead} ${styles.line}`}>{reels.line}</p>
          <p className={styles.caption} aria-live="polite">
            <span className={styles.captionNum}>{current.number}</span>{' '}
            <strong>{seed.name}</strong>
            <span aria-hidden="true"> · </span>
            <span className={ui.srOnly}>: </span>
            {caption}
          </p>
          <div className={styles.actions}>
            {seed.status === 'public' && seed.repo ? (
              <a className={`${ui.pill} ${ui.pillSmall}`} href={seed.repo}>
                {reels.githubLabel}{' '}
                <span className={ui.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            ) : (
              <span className={styles.soon}>
                {collection.notYetPublicLabel}
              </span>
            )}
          </div>
        </div>

        <div className={styles.player}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Product reels"
          >
            {reelVolumes.map((volume, index) => {
              const selected = index === active;
              return (
                <button
                  key={volume.seed.slug}
                  ref={element => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={tabId(volume.seed.slug)}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  className={styles.tab}
                  style={volumeStyle(volume)}
                  onClick={() => setActive(index)}
                  onKeyDown={onTabKey}
                >
                  <span className={styles.dot}>
                    <BrandMark
                      className={styles.dotMark}
                      volume={volume}
                      size={22}
                    />
                  </span>
                  <span className={styles.tabText}>
                    <span className={styles.tabName}>
                      <span className={styles.tabNum}>{volume.number}</span>{' '}
                      {volume.seed.name}
                    </span>
                    <small>
                      {collection.alternativeTo} {volume.seed.primaryReplace}
                    </small>
                  </span>
                </button>
              );
            })}
          </div>
          <div
            ref={screenRef}
            className={styles.screen}
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabId(seed.slug)}
          >
            <Reel
              key={seed.slug}
              seed={seed}
              size="small"
              className={styles.video}
            />
            {paused ? (
              <button
                type="button"
                className={styles.play}
                onClick={play}
                aria-label={`Play the ${seed.name} reel`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
