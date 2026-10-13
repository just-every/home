import { collection } from '@/content/landing';

import { BrandMark } from './BrandMark';
import ui from './label.module.css';
import styles from './collection.module.css';
import { RepoState } from './RepoState';
import { CollectionSearch } from './search/CollectionSearch';
import type { SearchVolume } from './search/localMatch';
import { cardId, volumeCount, volumeStyle, volumes } from './volumes';
import type { Volume } from './volumes';

/** Volumes 01 to 03 are the featured covers; every later one is a card. */
const coverVolumes = volumes.slice(0, 3);
const cardVolumes = volumes.slice(3);

/** What the search filters and shows, from the same volumes as the cards. */
const searchVolumes: SearchVolume[] = volumes.map(volume => ({
  slug: volume.slug,
  number: volume.number,
  name: volume.name,
  category: volume.seed.category,
  replaces: volume.seed.replaces,
  primaryReplace: volume.seed.primaryReplace,
  line: volume.seed.line,
  repo: volume.seed.status === 'public' ? volume.seed.repo : null,
  reel: volume.seed.reel !== null,
  mark: volume.mark,
  pastel: volume.colour,
  ink: volume.ink,
}));

function CoverCard({ volume }: { volume: Volume }) {
  const { seed } = volume;
  return (
    <li
      className={`${ui.card} ${styles.cover}`}
      id={cardId(volume.slug)}
      style={volumeStyle(volume)}
    >
      <p className={styles.num}>{volume.number}</p>
      <h3 className={styles.coverName}>{volume.name}</h3>
      <p className={styles.coverLine}>{seed.line}</p>
      <BrandMark className={styles.coverMark} volume={volume} size={104} />
      <div className={styles.coverFoot}>
        <p className={styles.coverAlt}>
          {collection.alternativeTo} {seed.primaryReplace}
        </p>
        <RepoState seed={seed} shape="circle" />
      </div>
    </li>
  );
}

function VolumeCard({ volume }: { volume: Volume }) {
  const { seed } = volume;
  return (
    <li
      className={`${ui.card} ${styles.volume}`}
      id={cardId(volume.slug)}
      style={volumeStyle(volume)}
    >
      <BrandMark className={styles.volumeMark} volume={volume} size={44} />
      <div className={styles.volumeBody}>
        <p className={styles.num}>{volume.number}</p>
        <h3 className={styles.volumeName}>{volume.name}</h3>
        <p className={styles.volumeAlt}>
          <span>{collection.alternativeTo}</span>{' '}
          <span>{seed.primaryReplace}</span>
        </p>
        <p className={styles.volumeLine}>{seed.line}</p>
      </div>
      <div className={styles.volumeFoot}>
        <RepoState seed={seed} shape="text" />
      </div>
    </li>
  );
}

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
      <CollectionSearch volumes={searchVolumes}>
        <ol className={styles.covers}>
          {coverVolumes.map(volume => (
            <CoverCard key={volume.slug} volume={volume} />
          ))}
        </ol>
        {cardVolumes.length > 0 ? (
          <ol className={styles.grid} start={coverVolumes.length + 1}>
            {cardVolumes.map(volume => (
              <VolumeCard key={volume.slug} volume={volume} />
            ))}
          </ol>
        ) : null}
        <p className={styles.note}>
          {volumeCount === 14 ? collection.line : collection.lineWithoutNumber}
        </p>
      </CollectionSearch>
    </section>
  );
}
