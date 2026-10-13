'use client';

import { ChevronRight, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { collection, nav, questions } from '@/content/landing';
import type { Seed } from '@/data/seed-types';
import { seeds } from '@/data/seeds';

import styles from './collection.module.css';
import m from './manifesto.module.css';
import { ProductCard } from './ProductCard';

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
    count: seeds.filter(seed => seed.status !== 'public').length,
  },
];

const catchQuestion = questions.items[0];
const productsLabel =
  nav.find(item => item.href === `#${collection.id}`)?.label ?? 'Products';
const questionsLabel =
  nav.find(item => item.href === `#${questions.id}`)?.label ?? 'Questions';

function matches(seed: Seed, filter: Filter, query: string): boolean {
  if (filter === 'public' && seed.status !== 'public') return false;
  if (filter === 'soon' && seed.status === 'public') return false;
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [seed.name, seed.category, seed.line, ...seed.replaces].some(text =>
    text.toLowerCase().includes(needle)
  );
}

export function Collection() {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const narrowed = useRef(false);

  useEffect(() => {
    narrowed.current = filter !== 'all' || query.trim() !== '';
  }, [filter, query]);

  // A link to a card the filters hide clears them, then shows the card.
  useEffect(() => {
    const onHash = () => {
      const match = window.location.hash.match(/^#product-(.+)$/);
      if (!match || !narrowed.current) return;
      setFilter('all');
      setQuery('');
      requestAnimationFrame(() =>
        document.getElementById(`product-${match[1]}`)?.scrollIntoView()
      );
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const shown = seeds.filter(seed => matches(seed, filter, query));

  return (
    <section
      id={collection.id}
      className={styles.section}
      aria-labelledby="manifesto-collection-title"
    >
      <div className={m.container}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <div className={styles.intro}>
              <p className={m.eyebrow}>{productsLabel}</p>
              <h2
                id="manifesto-collection-title"
                className={`${m.display} ${styles.title}`}
              >
                {collection.heading}
              </h2>
              <p className={styles.lede}>{collection.line}</p>
            </div>
            <aside className={styles.aside} aria-label={catchQuestion.question}>
              <div className={styles.asideText}>
                <p className={styles.asideQuestion}>{catchQuestion.question}</p>
                <p className={styles.asideAnswer}>{catchQuestion.answer}</p>
                <a href={`#${questions.id}`} className={styles.asideLink}>
                  {questionsLabel}
                  <ChevronRight size={17} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/variants/manifesto/code-windows.webp"
                alt="Two app windows, one of them showing code"
                width={620}
                height={288}
                loading="lazy"
                decoding="async"
                className={styles.asideArt}
              />
            </aside>
          </div>

          <div className={styles.tools}>
            <div
              className={styles.chips}
              role="group"
              aria-label="Filter products"
            >
              {filters.map(item => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={filter === item.id}
                  className={styles.chip}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                  <span className={styles.chipCount}>{item.count}</span>
                </button>
              ))}
            </div>
            <label className={styles.search}>
              <Search size={18} strokeWidth={1.75} aria-hidden="true" />
              <span className={m.srOnly}>Search products</span>
              <input
                type="search"
                value={query}
                placeholder="Search products"
                onChange={event => setQuery(event.target.value)}
              />
            </label>
          </div>

          <p className={m.srOnly} aria-live="polite">
            {shown.length === seeds.length
              ? `${seeds.length} products`
              : `${shown.length} of ${seeds.length} products`}
          </p>

          {shown.length ? (
            <ul className={styles.grid}>
              {shown.map(seed => (
                <li key={seed.slug}>
                  <ProductCard seed={seed} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>No product matches “{query.trim()}”.</p>
          )}
        </div>
      </div>
    </section>
  );
}
