import { ArrowUpRight, Play } from 'lucide-react';

import { collection } from '@/content/landing';
import type { Seed } from '@/data/seed-types';

import { cardId, watchId } from './anchors';
import { Mark } from './Mark';
import s from './collection.module.css';

export function ProductCard({ seed }: { seed: Seed }) {
  const isPublic = seed.status === 'public' && seed.repo;
  return (
    <article id={cardId(seed.slug)} className={s.card}>
      <Mark seed={seed} size={40} className={s.mark} />
      <div className={s.body}>
        <div className={s.top}>
          <h3 className={s.name}>{seed.name}</h3>
          {isPublic ? (
            <a
              href={seed.repo!}
              className={s.github}
              aria-label={`${seed.name} on ${collection.githubLabel}`}
            >
              {collection.githubLabel}
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
          ) : (
            <span className={s.soon}>{collection.notYetPublicLabel}</span>
          )}
        </div>
        <p className={s.replaces}>
          {collection.alternativeTo} {seed.primaryReplace}
        </p>
        <p className={s.line}>{seed.line}</p>
        {seed.reel && (
          <a href={`#${watchId(seed.slug)}`} className={s.watch}>
            <Play
              aria-hidden="true"
              size={13}
              strokeWidth={2}
              fill="currentColor"
            />
            {collection.watchLabel}
          </a>
        )}
      </div>
    </article>
  );
}
