'use client';

import { useCallback, useMemo, useRef } from 'react';

import { search as searchCopy } from '@/content/landing';

import { SearchForm } from '../search/SearchForm';
import searchStyles from '../search/search.module.css';
import { useCollectionSearch } from '../search/useCollectionSearch';
import styles from './collection.module.css';
import { Feature } from './Feature';
import { place } from './place';
import { ProductCard } from './ProductCard';
import type { CollectionItem } from './types';
import { useSelection } from './useSelection';

/**
 * The collection: the search, then every volume as a card, with the selected
 * one large. Selecting (a card, a search result, a shelf volume or any other
 * `#vol-<slug>` link) makes that product the feature.
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
  const { selected, select } = useSelection(slugs, onNavigate);

  const search = useCollectionSearch(items, {
    onAnswer: (slug, apply) =>
      select(slug, { history: 'replace', also: apply }),
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

  const placed = place(
    items,
    selected,
    search.mode,
    search.matches,
    search.text
  );

  return (
    <>
      <SearchForm state={search} />
      <ul className={styles.grid} data-collection-grid="">
        {placed.map(entry =>
          entry.role === 'feature' ? (
            <Feature key={entry.item.slug} placed={entry} />
          ) : (
            <ProductCard key={entry.item.slug} placed={entry} />
          )
        )}
      </ul>
      {search.mode === 'answer' ? (
        <p className={searchStyles.credit}>{searchCopy.credit}</p>
      ) : null}
    </>
  );
}
