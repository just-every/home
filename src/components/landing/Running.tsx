'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { reels } from '@/content/landing';
import { Reel } from '@/components/shared/Reel';

import { BrandMark } from './BrandMark';
import { pickProduct, useSelectedProduct } from './collection/selectedProduct';
import ui from './label.module.css';
import styles from './running.module.css';
import { volumeStyle, volumes } from './volumes';

const tabId = (slug: string) => `label-reel-tab-${slug}`;
const panelId = 'label-reel-panel';

/**
 * Every product's reel, one at a time: the player beside the copy, and every
 * product as its mark and name to pick from (one row of fourteen, two rows of
 * seven, or four to a row on a phone). The pick is the page's selected product, the same one
 * the collection's box shows.
 */
export function Running() {
  const slug = useSelectedProduct(volumes[0].slug);
  const active = Math.max(
    0,
    volumes.findIndex(volume => volume.slug === slug)
  );
  const current = volumes[active];
  const { seed } = current;
  const [paused, setPaused] = useState(true);
  const screenRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
  }, [seed.slug]);

  const play = useCallback(() => {
    const video = screenRef.current?.querySelector('video');
    video?.play().catch(() => {});
  }, []);

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = volumes.length - 1;
    const targets: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    pickProduct(volumes[next].slug);
    tabRefs.current[next]?.focus();
  };

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
          <p className={styles.caption}>
            <span className={styles.captionNum}>{current.number}</span>{' '}
            <strong>{seed.name}</strong>
            <span aria-hidden="true"> · </span>
            <span className={ui.srOnly}>: </span>
            {seed.line}
          </p>
          <div className={styles.actions}>
            <a className={`${ui.pill} ${ui.pillSmall}`} href={seed.repo}>
              {reels.githubLabel}{' '}
              <span className={ui.arrow} aria-hidden="true">
                →
              </span>
            </a>
          </div>
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
            player="reels"
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

        <div
          className={styles.picker}
          role="tablist"
          aria-label="Product reels"
        >
          {volumes.map((volume, index) => {
            const selected = index === active;
            return (
              <button
                key={volume.slug}
                ref={element => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={tabId(volume.slug)}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                className={styles.tab}
                style={volumeStyle(volume)}
                onClick={() => pickProduct(volume.slug)}
                onKeyDown={onTabKey}
              >
                <span className={styles.dot}>
                  <BrandMark
                    className={styles.dotMark}
                    volume={volume}
                    size={22}
                  />
                </span>
                <span className={styles.tabName}>{volume.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
