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
 * soon row, links to the seed's own page. `level` is the level of the
 * collection's own headings (each area, coming soon, and a search's
 * results): 2 on /products, right under its h1; 3 under a section's h2.
 */
export function CollectionBrowser({
  items,
  level,
}: {
  items: CollectionItem[];
  level: 2 | 3;
}) {
  const search = useCollectionSearch(items, upcoming);
  const grouped = useMemo(() => areas(items), [items]);
  const searching = search.mode === 'instant' || search.mode === 'answer';
  const Heading = level === 2 ? 'h2' : 'h3';
  const under = level === 2 ? 'h3' : 'h4';

  return (
    <>
      <SearchForm state={search} />
      {searching && search.matches.length > 0 ? (
        <ul className={styles.results}>
          {results(search.mode, search.matches, search.text).map(entry => (
            <ProductCard key={entry.item.slug} shown={entry} level={Heading} />
          ))}
        </ul>
      ) : null}
      {search.soon.length > 0 ? (
        <div className={styles.soon}>
          <Heading className={styles.areaHeading}>{comingSoon.label}</Heading>
          <ul className={soonStyles.list}>
            {search.soon.map(seed => (
              <SoonItem
                key={seed.slug}
                seed={seed}
                level={under}
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
              <Heading className={styles.areaHeading}>{area.heading}</Heading>
              <ul className={styles.list}>
                {area.items.map(entry => (
                  <ProductCard
                    key={entry.item.slug}
                    shown={entry}
                    level={under}
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
