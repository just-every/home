'use client';

import { useCallback, useMemo, useRef } from 'react';

import { search as searchCopy } from '@/content/landing';

import { SearchForm } from '../search/SearchForm';
import searchStyles from '../search/search.module.css';
import { useCollectionSearch } from '../search/useCollectionSearch';
import styles from './collection.module.css';
import { Feature } from './Feature';
import { featured, place } from './place';
import { ProductCard } from './ProductCard';
import type { CollectionItem } from './types';
import { useSelection } from './useSelection';

/**
 * The collection: the search, the selected product in a box across the
 * width, then every volume as a card in a grid that keeps its order and
 * sizes. Selecting (a card, a search result, a shelf volume or any other
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
  const { selected, select } = useSelection(slugs, onNavigate);

  const search = useCollectionSearch(items, {
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

  const shown = featured(
    items,
    selected,
    search.mode,
    search.matches,
    search.text
  );
  const placed = place(items, search.mode, search.matches, search.text);

  return (
    <>
      <SearchForm state={search} />
      {shown ? <Feature shown={shown} /> : null}
      <ul className={styles.grid} data-collection-grid="">
        {placed.map(entry => (
          <ProductCard
            key={entry.item.slug}
            placed={entry}
            current={entry.item.slug === shown?.item.slug}
          />
        ))}
      </ul>
      {search.mode === 'answer' ? (
        <p className={searchStyles.credit}>{searchCopy.credit}</p>
      ) : null}
    </>
  );
}
