import { collection } from '@/content/landing';

import { CollectionBrowser } from './collection/CollectionBrowser';
import styles from './collection/collection.module.css';
import type { CollectionItem } from './collection/types';
import ui from './label.module.css';
import { volumes } from './volumes';

/** Every volume, as the collection shows and searches it. */
const items: CollectionItem[] = volumes.map(({ seed, ...volume }) => ({
  slug: volume.slug,
  number: volume.number,
  name: volume.name,
  family: volume.family,
  category: seed.category,
  replaces: seed.replaces,
  primaryReplace: seed.primaryReplace,
  line: seed.line,
  headline: seed.headline,
  repo: seed.repo,
  homepage: seed.homepage,
  mark: volume.mark,
  pastel: volume.colour,
  ink: volume.ink,
  reel: seed.reel,
}));

export function Collection() {
  return (
    <section
      className={`${ui.wrap} ${styles.collection}`}
      id={collection.id}
      aria-labelledby="label-all-heading"
    >
      <h2 className={`${ui.h2} ${styles.heading}`} id="label-all-heading">
        {collection.heading}
      </h2>
      <CollectionBrowser items={items} />
    </section>
  );
}
