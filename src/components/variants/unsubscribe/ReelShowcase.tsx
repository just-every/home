'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';

import { Reel } from '@/components/shared/Reel';
import type { Seed } from '@/data/seed-types';

import { watchId } from './anchors';
import { Mark } from './Mark';
import p from './page.module.css';
import s from './running.module.css';

export type ReelSeed = Pick<
  Seed,
  | 'slug'
  | 'name'
  | 'line'
  | 'headline'
  | 'repo'
  | 'reel'
  | 'mark'
  | 'markLight'
  | 'markInk'
  | 'accent'
  | 'paper'
>;

type ReelShowcaseProps = {
  id: string;
  heading: string;
  line: string;
  githubLabel: string;
  reelSeeds: ReelSeed[];
};

/** m:ss, rounded down the way the video's own controls show it. */
function duration(seconds: number) {
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

export function ReelShowcase({
  id,
  heading,
  line,
  githubLabel,
  reelSeeds,
}: ReelShowcaseProps) {
  const [active, setActive] = useState(reelSeeds[0].slug);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const pick = () => {
      const hash = window.location.hash.slice(1);
      const match = reelSeeds.find(seed => watchId(seed.slug) === hash);
      if (match) setActive(match.slug);
    };
    pick();
    window.addEventListener('hashchange', pick);
    return () => window.removeEventListener('hashchange', pick);
  }, [reelSeeds]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const keys = [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
      ];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const index = reelSeeds.findIndex(seed => seed.slug === active);
      const last = reelSeeds.length - 1;
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? last
            : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
              ? index === 0
                ? last
                : index - 1
              : index === last
                ? 0
                : index + 1;
      const slug = reelSeeds[next].slug;
      setActive(slug);
      tabs.current[slug]?.focus();
    },
    [active, reelSeeds]
  );

  const seed = reelSeeds.find(item => item.slug === active) ?? reelSeeds[0];
  const tint = {
    '--accent': seed.accent,
    '--paper': seed.paper,
  } as CSSProperties;

  return (
    <section
      id={id}
      className={`${p.wrap} ${s.running}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.copy}>
        <h2 id={`${id}-title`} className={p.sectionTitle}>
          {heading}
        </h2>
        <p className={`${p.lede} ${s.lede}`}>{line}</p>
        <div
          className={s.tabs}
          role="tablist"
          aria-label="Choose a reel"
          onKeyDown={onKeyDown}
        >
          {reelSeeds.map(item => {
            const selected = item.slug === active;
            return (
              <button
                key={item.slug}
                ref={node => {
                  tabs.current[item.slug] = node;
                }}
                id={watchId(item.slug)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                className={`${p.btn} ${s.tab} ${selected ? '' : p.btnLight}`}
                onClick={() => setActive(item.slug)}
              >
                <Play
                  aria-hidden="true"
                  className={s.play}
                  fill={selected ? 'currentColor' : 'none'}
                  strokeWidth={1.8}
                />
                Watch {item.name}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={watchId(seed.slug)}
        className={s.player}
        style={tint}
      >
        <div className={s.playerHead}>
          <span className={s.markTile}>
            <Mark seed={seed} size={40} className={s.mark} />
          </span>
          <div className={s.caption}>
            <h3 className={s.name}>{seed.name}</h3>
            <p className={s.headline}>{seed.headline ?? seed.line}</p>
          </div>
          {seed.reel && (
            <span className={s.duration}>
              {duration(seed.reel.durationSeconds)}
            </span>
          )}
        </div>
        <div className={s.frame}>
          <Reel key={seed.slug} seed={seed} size="small" className={s.video} />
        </div>
        {seed.repo && (
          <a href={seed.repo} className={`${p.textLink} ${s.repo}`}>
            {githubLabel}
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
          </a>
        )}
      </div>
    </section>
  );
}
