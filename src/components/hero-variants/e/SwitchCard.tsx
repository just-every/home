import type { CSSProperties } from 'react';

import type { Volume } from '@/components/landing/volumes';

import styles from './hero-e.module.css';
import { restVolumes, shownVolumes, type RentedTool } from './tools';

interface RowProps {
  volume: Volume;
  /** The incumbent named on the row: the picked one when it is this seed's. */
  tool: string;
  on: boolean;
}

function SeedRow({ volume, tool, on }: RowProps) {
  return (
    <li className={on ? styles.on : undefined}>
      <span
        className={styles.appIcon}
        style={{ '--tile': volume.colour } as CSSProperties}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={volume.mark} alt="" width={20} height={20} decoding="async" />
      </span>
      <a className={styles.appLink} href={volume.href}>
        <span className={styles.appName}>{volume.name}</span>
        <small>for {tool}</small>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </a>
    </li>
  );
}

const restNames = restVolumes.slice(0, 4).map(volume => volume.name);

/**
 * "Switch to JustEvery": the seeds across from the rented tools, each a
 * link to its panel (#vol-<slug>). The picked seed highlights; when it is
 * not one of the seven, it takes the "+ N more" row's place.
 */
export function SwitchCard({ picked }: { picked: RentedTool | null }) {
  const pickedSlug = picked?.volume.slug;
  const pickedRest = picked && !shownVolumes.includes(picked.volume);

  return (
    <article className={`${styles.card} ${styles.switch}`}>
      <div className={styles.cardHead}>
        <h2>Switch to JustEvery</h2>
        <p>Free. Open source. Yours.</p>
      </div>
      <ul className={styles.switchList}>
        {shownVolumes.map(volume => (
          <SeedRow
            key={volume.slug}
            volume={volume}
            on={volume.slug === pickedSlug}
            tool={
              volume.slug === pickedSlug && picked
                ? picked.name
                : volume.seed.primaryReplace
            }
          />
        ))}
        {pickedRest ? (
          <SeedRow volume={picked.volume} tool={picked.name} on />
        ) : (
          <li className={styles.extra}>
            <span
              className={`${styles.appIcon} ${styles.dots}`}
              aria-hidden="true"
            >
              •••
            </span>
            <a className={styles.appLink} href="#all">
              <span className={styles.appName}>
                + {restVolumes.length} more
              </span>
              <small>(including {restNames.join(', ')})</small>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </a>
          </li>
        )}
      </ul>
    </article>
  );
}
