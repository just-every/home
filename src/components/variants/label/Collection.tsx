import type { CSSProperties } from 'react';

import { collection, reels } from '@/content/landing';

import ui from './label.module.css';
import styles from './collection.module.css';
import { RepoState } from './RepoState';
import { VolumeMark } from './VolumeMark';
import { coverVolumes, spineVolumes, volumeCount, volumes } from './volumes';
import type { Volume } from './volumes';

const lastNumber = volumes[volumes.length - 1]?.number ?? '';

function volumeStyle(volume: Volume): CSSProperties {
  return {
    '--tint': volume.tint,
    '--ink': volume.ink,
    '--spine': volume.spine,
  } as CSSProperties;
}

function CoverCard({ volume }: { volume: Volume }) {
  const { seed } = volume;
  return (
    <li className={styles.cover} style={volumeStyle(volume)}>
      <p className={styles.num}>{volume.number}</p>
      <h3 className={styles.coverName}>{seed.name}</h3>
      <p className={styles.coverLine}>{seed.line}</p>
      <VolumeMark
        className={styles.coverMark}
        shape={volume.shape}
        color={volume.ink}
      />
      <div className={styles.coverFoot}>
        <p className={styles.coverAlt}>
          {collection.alternativeTo} {seed.primaryReplace}
        </p>
        <RepoState seed={seed} variant="circle" />
      </div>
    </li>
  );
}

function VolumeCard({ volume }: { volume: Volume }) {
  const { seed } = volume;
  return (
    <li className={styles.volume} style={volumeStyle(volume)}>
      <VolumeMark
        className={styles.volumeMark}
        shape={volume.shape}
        color={volume.ink}
      />
      <div className={styles.volumeBody}>
        <p className={styles.num}>{volume.number}</p>
        <h3 className={styles.volumeName}>{seed.name}</h3>
        <p className={styles.volumeAlt}>
          <span>{collection.alternativeTo}</span>{' '}
          <span>{seed.primaryReplace}</span>
        </p>
        <p className={styles.volumeLine}>{seed.line}</p>
      </div>
      <div className={styles.volumeFoot}>
        <RepoState seed={seed} variant="text" />
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
      <div className={styles.head}>
        <div>
          <p className={ui.eyebrow}>Volumes 01–{lastNumber}</p>
          <h2 className={ui.h2} id="label-all-heading">
            {collection.heading}
          </h2>
        </div>
        <p className={styles.headLine}>
          {volumeCount === 14 ? collection.line : collection.lineWithoutNumber}
        </p>
        <a className={`${ui.under} ${styles.headLink}`} href={`#${reels.id}`}>
          <span>
            {reels.heading.replace(/\.$/, '')}{' '}
            <span className={ui.arrow} aria-hidden="true">
              →
            </span>
          </span>
        </a>
      </div>
      <ol className={styles.covers}>
        {coverVolumes.map(volume => (
          <CoverCard key={volume.seed.slug} volume={volume} />
        ))}
      </ol>
      <ol className={styles.grid} start={coverVolumes.length + 1}>
        {spineVolumes.map(volume => (
          <VolumeCard key={volume.seed.slug} volume={volume} />
        ))}
      </ol>
    </section>
  );
}
