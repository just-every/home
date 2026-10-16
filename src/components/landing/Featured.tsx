import Link from 'next/link';

import { featured } from '@/content/landing';
import { seeds } from '@/data/seeds';
import { upcoming } from '@/data/upcoming';

import { caveat } from './hero/fonts';
import { collectionItems } from './collection/items';
import collectionStyles from './collection/collection.module.css';
import { ProductCard } from './collection/ProductCard';
import ui from './label.module.css';
import searchStyles from './search/search.module.css';
import styles from './featured.module.css';

const shown = featured.slugs.flatMap(slug => {
  const item = collectionItems.find(candidate => candidate.slug === slug);
  return item ? [{ item, replaces: item.primaryReplace, reason: null }] : [];
});

/**
 * The home page's portal to /products: a search that opens the full list with
 * its query, six featured products as cards, and the link to all of them
 * (its count, in digits, follows the data), with a handwritten "(so far)"
 * and a drawn arrow beside it. The form is a plain GET, so it works before
 * the page's scripts do.
 */
export function Featured() {
  const count = seeds.length + upcoming.length;
  return (
    <section
      className={styles.featured}
      aria-labelledby="label-featured-heading"
    >
      <div className={ui.wrap}>
        <h2
          className={`${ui.h2} ${styles.heading}`}
          id="label-featured-heading"
        >
          {featured.heading}
        </h2>
        <p className={`${ui.lead} ${styles.line}`}>{featured.line}</p>
        <form
          className={searchStyles.search}
          role="search"
          action="/products"
          method="get"
        >
          <label className={ui.srOnly} htmlFor="featured-search">
            {featured.searchLabel}
          </label>
          <div className={searchStyles.bar}>
            <div className={searchStyles.field}>
              <svg
                className={searchStyles.icon}
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m15.5 15.5 5 5" />
              </svg>
              <input
                id="featured-search"
                className={searchStyles.input}
                type="search"
                name="q"
                placeholder={featured.searchPlaceholder}
                maxLength={120}
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="search"
              />
            </div>
            <button
              className={`${ui.pill} ${ui.pillSmall} ${searchStyles.submit}`}
              type="submit"
            >
              {featured.searchButton}{' '}
              <span className={ui.arrow} aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </form>
        <ul className={`${collectionStyles.results} ${styles.cards}`}>
          {shown.map(entry => (
            <ProductCard key={entry.item.slug} shown={entry} level="h3" />
          ))}
        </ul>
        <p className={styles.all}>
          <Link className={ui.under} href="/products" prefetch={false}>
            <span>{featured.all(count)}</span>
            <span className={ui.arrow} aria-hidden="true">
              →
            </span>
          </Link>
          <span
            className={`${caveat.className} ${styles.note}`}
            aria-hidden="true"
          >
            <svg className={styles.drawn} viewBox="0 0 46 30" focusable="false">
              <path d="M43 6C34 1 18 3 10 19" />
              <path d="M3.5 12.5C5 15.5 7 18 9.5 22C12 19.5 15 17.5 18.5 16" />
            </svg>
            {featured.allNote}
          </span>
        </p>
      </div>
    </section>
  );
}
