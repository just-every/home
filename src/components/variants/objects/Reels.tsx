'use client';

import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { Reel } from '@/components/shared/Reel';
import { collection, nav, reels, runOne } from '@/content/landing';
import { seeds } from '@/data/seeds';

import { ObjectImage } from './ObjectImage';
import shared from './page.module.css';
import styles from './reels.module.css';

/** Uptime leads: it is the product the run-one-yourself block starts. */
const lead = ['uptime'];
const reelSeeds = [...seeds]
  .filter(seed => seed.reel)
  .sort((a, b) => {
    const rank = (slug: string) => {
      const i = lead.indexOf(slug);
      return i === -1 ? lead.length : i;
    };
    return rank(a.slug) - rank(b.slug);
  });

const scene = '/variants/objects';
const tabId = (slug: string) => `reel-${slug}`;

export function Reels() {
  const [active, setActive] = useState(reelSeeds[0]?.slug ?? '');
  const [playing, setPlaying] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = useCallback((slug: string) => {
    setActive(slug);
    setPlaying(false);
  }, []);

  // Cards link to #reel-<slug>: open that reel when the hash points at one.
  useEffect(() => {
    const fromHash = () => {
      const match = window.location.hash.match(/^#reel-(.+)$/);
      if (match && reelSeeds.some(seed => seed.slug === match[1])) {
        select(match[1]);
      }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [select]);

  const seed = reelSeeds.find(s => s.slug === active);
  if (!seed) return null;

  const video = () => screenRef.current?.querySelector('video') ?? null;
  const toggle = () => {
    const el = video();
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const i = reelSeeds.findIndex(s => s.slug === active);
    let next = -1;
    if (event.key === 'ArrowRight') next = (i + 1) % reelSeeds.length;
    if (event.key === 'ArrowLeft')
      next = (i - 1 + reelSeeds.length) % reelSeeds.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = reelSeeds.length - 1;
    if (next < 0) return;
    event.preventDefault();
    const slug = reelSeeds[next].slug;
    select(slug);
    tabRefs.current[slug]?.focus();
  };

  const watchLabel = nav.find(link => link.href === `#${reels.id}`)?.label;

  return (
    <section
      id={reels.id}
      className={styles.reels}
      aria-labelledby="objects-reels-title"
    >
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet={`${scene}/reels-1536.webp 1536w, ${scene}/reels-3072.webp 3072w`}
          sizes="(min-width: 1536px) 1536px, 100vw"
        />
        <img
          className={styles.scene}
          src={`${scene}/wall-1100.webp`}
          alt="A tablet on a wooden stand on a sunlit desk, beside books, a mug and a plant"
          width={1536}
          height={490}
        />
      </picture>

      <div className={styles.copy}>
        {watchLabel ? <p className={shared.eyebrow}>{watchLabel}</p> : null}
        <h2 id="objects-reels-title" className={styles.title}>
          {reels.heading}
        </h2>
        <p className={styles.lead}>{reels.line}</p>

        <div className={styles.tabs} role="tablist" aria-label="Product reels">
          {reelSeeds.map(s => {
            const selected = s.slug === active;
            return (
              <button
                key={s.slug}
                id={tabId(s.slug)}
                ref={el => {
                  tabRefs.current[s.slug] = el;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="objects-reel-panel"
                tabIndex={selected ? 0 : -1}
                className={styles.tab}
                onClick={() => select(s.slug)}
                onKeyDown={onTabKey}
              >
                {s.name}
              </button>
            );
          })}
        </div>

        <div
          id="objects-reel-panel"
          role="tabpanel"
          aria-labelledby={tabId(seed.slug)}
          className={styles.panel}
        >
          <p className={styles.caption}>
            <ObjectImage
              slug={seed.slug}
              className={styles.captionObject}
              eager
            />
            <span>
              <strong>{seed.name}</strong> · {seed.headline ?? seed.line}
            </span>
          </p>
          <div className={styles.actions}>
            <button type="button" className={shared.pill} onClick={toggle}>
              {playing ? (
                <Pause aria-hidden="true" className={styles.icon} />
              ) : (
                <Play aria-hidden="true" className={styles.icon} />
              )}
              {playing ? 'Pause' : collection.watchLabel}
            </button>
            {seed.repo ? (
              <a className={shared.textlink} href={seed.repo}>
                {reels.githubLabel}
                <ArrowUpRight aria-hidden="true" className={styles.icon} />
              </a>
            ) : (
              <span className={shared.soon}>
                {collection.notYetPublicLabel}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.device}>
          <div ref={screenRef} className={styles.screen}>
            <Reel
              key={seed.slug}
              seed={seed}
              size="small"
              className={styles.video}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />
            {playing ? null : (
              <button
                type="button"
                className={styles.bigPlay}
                onClick={toggle}
                aria-label={`Play the ${seed.name} reel`}
              >
                <Play aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <div className={styles.object} key={seed.slug}>
          <ObjectImage slug={seed.slug} eager />
        </div>
      </div>

      <a href="#run" className={`${shared.note} ${styles.sticky}`}>
        {runOne.heading} <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
