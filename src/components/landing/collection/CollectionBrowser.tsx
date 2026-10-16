'use client';

import { useCallback, useMemo, useRef } from 'react';

import { search as searchCopy } from '@/content/landing';
import { comingSoon, upcoming } from '@/data/upcoming';
import { track, X_EVENTS } from '@/lib/x-pixel';

import { namedReplace } from '../search/localMatch';
import { SearchForm } from '../search/SearchForm';
import searchStyles from '../search/search.module.css';
import { useCollectionSearch } from '../search/useCollectionSearch';
import { SoonItem } from '../soon/SoonItem';
import soonStyles from '../soon/soon.module.css';
import styles from './collection.module.css';
import { Feature } from './Feature';
import { areas, featured, results } from './place';
import { ProductCard } from './ProductCard';
import type { CollectionItem } from './types';
import { useSelection } from './useSelection';

/**
 * The collection: the search, the selected product in a box across the
 * width, then every product as a card under its area's small heading, the
 * same whatever is selected. A search shows only its products, with no
 * headings, and the seeds in the works that match what is typed, as coming
 * soon (each naming the tool typed, where it replaces it). Selecting (a card, a search result, a hero seed row or any other
 * `#vol-<slug>` link) puts that product in the box and rings its card.
 */
export function CollectionBrowser({ items }: { items: CollectionItem[] }) {
  const slugs = useMemo(() => items.map(item => item.slug), [items]);

  // The selection needs the search (a link to a product that a search is
  // hiding shows the whole collection again) and the search needs the
  // selection (its best pick becomes the feature): this ref joins them.
  const searchRef = useRef<{
    clear: () => void;
    keeps: (slug: string) => boolean;
  }>({ clear: () => {}, keeps: () => false });
  const onNavigate = useCallback((slug: string) => {
    if (!searchRef.current.keeps(slug)) searchRef.current.clear();
  }, []);
  const onOpen = useCallback(
    (slug: string) => {
      const name = items.find(item => item.slug === slug)?.name ?? slug;
      track(X_EVENTS.contentView, {
        content_name: name,
        content_type: 'product',
      });
    },
    [items]
  );
  const { selected, select } = useSelection(slugs, onNavigate, onOpen);

  const search = useCollectionSearch(items, upcoming, {
    onAnswer: (slug, apply) =>
      select(slug, { history: 'replace', also: apply, reveal: 'nearest' }),
  });
  const answerSlugs =
    search.mode === 'answer'
      ? search.matches.map(match => match.volume.slug)
      : [];
  searchRef.current = {
    clear: search.clear,
    // A pick among a submitted search's answers keeps the answers showing.
    keeps: slug => answerSlugs.includes(slug),
  };

  // A submitted search that found nothing, or failed, leaves no product in
  // the box: nothing from an earlier answer may read as its result.
  const shown =
    search.mode === 'none' || search.failed
      ? null
      : featured(items, selected, search.mode, search.matches, search.text);
  const grouped = useMemo(() => areas(items), [items]);
  const searching = search.mode === 'instant' || search.mode === 'answer';
  const current = (slug: string) => slug === shown?.item.slug;

  return (
    <>
      <SearchForm state={search} />
      {shown ? <Feature shown={shown} /> : null}
      {searching && search.matches.length > 0 ? (
        <ul className={styles.results}>
          {results(search.mode, search.matches, search.text).map(entry => (
            <ProductCard
              key={entry.item.slug}
              shown={entry}
              current={current(entry.item.slug)}
              level="h3"
            />
          ))}
        </ul>
      ) : null}
      {search.soon.length > 0 ? (
        <div className={styles.soon}>
          <h3 className={styles.areaHeading}>{comingSoon.label}</h3>
          <ul className={soonStyles.list}>
            {search.soon.map(seed => (
              <SoonItem
                key={seed.slug}
                seed={seed}
                level="h4"
                replaces={namedReplace(seed, search.text)}
              />
            ))}
          </ul>
        </div>
      ) : null}
      {searching ? null : (
        <div className={styles.areas}>
          {grouped.map(area => (
            <div className={styles.area} key={area.id}>
              <h3 className={styles.areaHeading}>{area.heading}</h3>
              <ul className={styles.list}>
                {area.items.map(entry => (
                  <ProductCard
                    key={entry.item.slug}
                    shown={entry}
                    current={current(entry.item.slug)}
                    level="h4"
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {search.mode === 'answer' ? (
        <p className={searchStyles.credit}>{searchCopy.credit}</p>
      ) : null}
    </>
  );
}
