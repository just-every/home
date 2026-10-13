'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { Reel } from '@/components/shared/Reel';
import { collection, reels } from '@/content/landing';
import type { Seed } from '@/data/seed-types';

import { useWideScreen } from './use-wide-screen';
import styles from './Reels.module.css';
import { formatDuration, lightMark, reelAnchor } from './seed-view';

export function ReelPlayer({ seeds }: { seeds: Seed[] }) {
  const [active, setActive] = useState(seeds[0].slug);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const wide = useWideScreen();

  const selectFromHash = useCallback(() => {
    const slug = window.location.hash.replace(/^#reel-/, '');
    if (seeds.some(seed => seed.slug === slug)) setActive(slug);
  }, [seeds]);

  useEffect(() => {
    selectFromHash();
    window.addEventListener('hashchange', selectFromHash);
    return () => window.removeEventListener('hashchange', selectFromHash);
  }, [selectFromHash]);

  const seed = seeds.find(item => item.slug === active) ?? seeds[0];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = seeds.findIndex(item => item.slug === active);
    const last = seeds.length - 1;
    const next = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowRight: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const slug = seeds[next].slug;
    setActive(slug);
    tabRefs.current[slug]?.focus();
  }

  return (
    <div className={styles.card}>
      <div className={styles.side}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Product demos"
          aria-orientation={wide === false ? 'horizontal' : 'vertical'}
        >
          {seeds.map(item => {
            const selected = item.slug === seed.slug;
            return (
              <button
                key={item.slug}
                ref={node => {
                  tabRefs.current[item.slug] = node;
                }}
                id={reelAnchor(item.slug)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="running-reel-panel"
                tabIndex={selected ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(item.slug)}
                onKeyDown={onKeyDown}
              >
                {item.reel && (
                  // A decorative preview, drawn as a background so it is
                  // never fetched where the layout hides it.
                  <span
                    className={styles.thumb}
                    style={{ backgroundImage: `url(${item.reel.poster})` }}
                    aria-hidden="true"
                  />
                )}
                <span className={styles.tabRow}>
                  <Image
                    className={styles.tabMark}
                    src={lightMark(item)}
                    alt=""
                    width={18}
                    height={18}
                    unoptimized
                  />
                  <span className={styles.tabName}>{item.name}</span>
                  {item.reel && (
                    <span className={styles.tabTime}>
                      {formatDuration(item.reel.durationSeconds)}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <div className={styles.caption} aria-live="polite">
          <div className={styles.captionHead}>
            <Image
              className={styles.captionMark}
              src={lightMark(seed)}
              alt=""
              width={30}
              height={30}
              unoptimized
            />
            <h3 className={styles.captionName}>{seed.name}</h3>
          </div>
          <p className={styles.captionLine}>{seed.headline ?? seed.line}</p>
          {seed.repo ? (
            <a className={styles.repo} href={seed.repo}>
              {reels.githubLabel}
              <ArrowUpRight className={styles.repoIcon} aria-hidden="true" />
            </a>
          ) : (
            <span className={styles.soon}>{collection.notYetPublicLabel}</span>
          )}
        </div>
      </div>
      <div
        id="running-reel-panel"
        className={styles.stage}
        role="tabpanel"
        aria-labelledby={reelAnchor(seed.slug)}
      >
        {wide === null || !seed.reel ? (
          // Until the width is known, hold the frame with the poster so the
          // reel loads once, at the right size.
          <Image
            className={styles.video}
            src={seed.reel?.poster ?? ''}
            alt=""
            width={1920}
            height={1080}
            unoptimized
          />
        ) : (
          <Reel
            key={`${seed.slug}-${wide ? 'full' : 'small'}`}
            seed={seed}
            size={wide ? 'full' : 'small'}
            className={styles.video}
          />
        )}
      </div>
    </div>
  );
}
