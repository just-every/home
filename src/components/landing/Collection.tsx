import { collection, products } from '@/content/landing';

import { CollectionBrowser } from './collection/CollectionBrowser';
import styles from './collection/collection.module.css';
import { collectionItems } from './collection/items';
import ui from './label.module.css';

/**
 * The search and every released product, grouped by area. On /products
 * (`standalone`) the page's own heading sits above it, so the section carries
 * only a label.
 */
export function Collection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      className={`${ui.wrap} ${styles.collection} ${standalone ? styles.standalone : ''}`}
      id={collection.id}
      {...(standalone
        ? { 'aria-label': products.label }
        : { 'aria-labelledby': 'label-all-heading' })}
    >
      {standalone ? null : (
        <h2 className={`${ui.h2} ${styles.heading}`} id="label-all-heading">
          {collection.heading}
        </h2>
      )}
      <CollectionBrowser items={collectionItems} level={standalone ? 2 : 3} />
    </section>
  );
}
