import { volumes } from '../volumes';
import type { CollectionItem } from './types';

/** Every released product, as the collection shows and searches it. */
export const collectionItems: CollectionItem[] = volumes.map(
  ({ seed, ...volume }) => ({
    slug: volume.slug,
    number: volume.number,
    name: volume.name,
    family: volume.family,
    area: seed.area,
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
    homepageShot: seed.homepageShot,
  })
);
