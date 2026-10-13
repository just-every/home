'use client';

import { ArrowUpRight, Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { collection } from '@/content/landing';
import { seeds } from '@/data/seeds';
import type { Seed } from '@/data/seed-types';

import styles from './Collection.module.css';
import { GitHubMark } from './icons';
import { lightMark, reelAnchor } from './seed-view';

type Filter = 'all' | 'public' | 'soon';

const filters: { id: Filter; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: seeds.length },
  {
    id: 'public',
    label: collection.githubLabel,
    count: seeds.filter(seed => seed.status === 'public').length,
  },
  {
    id: 'soon',
    label: collection.notYetPublicLabel,
    count: seeds.filter(seed => seed.status === 'soon').length,
  },
];

function ProductCard({ seed }: { seed: Seed }) {
  return (
    <li className={styles.card}>
      <div className={styles.cardHead}>
        <Image
          className={styles.mark}
          src={lightMark(seed)}
          alt=""
          width={30}
          height={30}
          unoptimized
        />
        <div className={styles.names}>
          <h3 className={styles.name}>{seed.name}</h3>
          <p className={styles.replaces}>
            {collection.alternativeTo} {seed.primaryReplace}
          </p>
        </div>
      </div>
      <p className={styles.line}>{seed.line}</p>
      <div className={styles.links}>
        {seed.status === 'public' && seed.repo ? (
          <a
            className={styles.link}
            href={seed.repo}
            aria-label={`${seed.name} on GitHub`}
          >
            <GitHubMark className={styles.linkIcon} />
            {collection.githubLabel}
            <ArrowUpRight className={styles.linkArrow} aria-hidden="true" />
          </a>
        ) : (
          <span className={styles.soon}>{collection.notYetPublicLabel}</span>
        )}
        {seed.reel && (
          <a
            className={styles.link}
            href={`#${reelAnchor(seed.slug)}`}
            aria-label={`${collection.watchLabel}: ${seed.name}`}
          >
            <Play className={styles.playIcon} aria-hidden="true" />
            {collection.watchLabel}
          </a>
        )}
      </div>
    </li>
  );
}

export function Collection() {
  const [filter, setFilter] = useState<Filter>('all');
  const shown =
    filter === 'all' ? seeds : seeds.filter(seed => seed.status === filter);

  return (
    <section
      id={collection.id}
      className={styles.collection}
      aria-labelledby="running-collection-title"
    >
      <div className={styles.head}>
        <div>
          <h2 id="running-collection-title" className={styles.title}>
            {collection.heading}
          </h2>
          <p className={styles.intro}>{collection.line}</p>
        </div>
        <div className={styles.filters} role="group" aria-label="Show">
          {filters.map(item => (
            <button
              key={item.id}
              type="button"
              className={styles.filter}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
              <span className={styles.count}>{item.count}</span>
            </button>
          ))}
        </div>
      </div>
      <ul className={styles.grid}>
        {shown.map(seed => (
          <ProductCard key={seed.slug} seed={seed} />
        ))}
      </ul>
    </section>
  );
}
