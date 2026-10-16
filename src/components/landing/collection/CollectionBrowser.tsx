'use client';

import { useMemo } from 'react';

import { search as searchCopy } from '@/content/landing';
import { comingSoon, upcoming } from '@/data/upcoming';

import { namedReplace } from '../search/localMatch';
import { SearchForm } from '../search/SearchForm';
import searchStyles from '../search/search.module.css';
import { useCollectionSearch } from '../search/useCollectionSearch';
import { SoonItem } from '../soon/SoonItem';
import soonStyles from '../soon/soon.module.css';
import styles from './collection.module.css';
import { areas, results } from './place';
import { ProductCard } from './ProductCard';
import type { CollectionItem } from './types';

/**
 * The collection: the search, then every product as a card under its area's
 * small heading. A search shows only its products, with no headings, and
 * the seeds in the works that match what is typed, as coming soon (each
 * naming the tool typed, where it replaces it). Every card, and every coming
 * soon row, links to the seed's own page.
 */
export function CollectionBrowser({ items }: { items: CollectionItem[] }) {
  const search = useCollectionSearch(items, upcoming);
  const grouped = useMemo(() => areas(items), [items]);
  const searching = search.mode === 'instant' || search.mode === 'answer';

  return (
    <>
      <SearchForm state={search} />
      {searching && search.matches.length > 0 ? (
        <ul className={styles.results}>
          {results(search.mode, search.matches, search.text).map(entry => (
            <ProductCard key={entry.item.slug} shown={entry} level="h3" />
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
                  <ProductCard key={entry.item.slug} shown={entry} level="h4" />
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
