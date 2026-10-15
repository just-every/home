import type { CSSProperties } from 'react';

import { comingSoon } from '@/data/upcoming';

import { Arrow, SwitchArrow } from './art';
import { pairs, upcomingCount } from './data';
import { notes } from './fonts';
import styles from './heroA.module.css';

const vol = (slug: string) => `#vol-${slug}`;

/**
 * The two cards: the tools you rent (each a button that picks it) and their
 * Just Every alternatives in the seeds' own pastels (each opens that
 * product's panel). The picked pair is marked in both.
 */
export function ToolLists({
  selected,
  tool,
  pulse,
  onPick,
}: {
  selected: string;
  /** The picked tool: its row is pressed when it is one of the listed tools. */
  tool: string;
  pulse: number;
  onPick: (slug: string, tool: string) => void;
}) {
  return (
    <div className={styles.comparison}>
      <section className={`${styles.panel} ${styles.rented}`}>
        <h2 id="hero-a-rented">The tools you rent</h2>
        <ul aria-labelledby="hero-a-rented">
          {pairs.map(seed => (
            <li key={seed.slug}>
              <button
                type="button"
                className={styles.tool}
                aria-pressed={seed.primaryReplace === tool}
                onClick={() => onPick(seed.slug, seed.primaryReplace)}
              >
                {seed.primaryReplace}
              </button>
            </li>
          ))}
        </ul>
        <a className={styles.more} href={`#${comingSoon.id}`}>
          {`+ ${upcomingCount} more…`}
        </a>
      </section>
      <p className={`${styles.switchNote} ${notes.className}`}>
        <span>
          Make
          <br />
          the switch.
        </span>
        <SwitchArrow />
      </p>
      <section className={`${styles.panel} ${styles.alternatives}`}>
        <h2 id="hero-a-alternatives">Your Just Every alternative</h2>
        <ul aria-labelledby="hero-a-alternatives">
          {pairs.map(seed => {
            const picked = seed.slug === selected;
            return (
              <li
                key={picked ? `${seed.slug}-${pulse}` : seed.slug}
                className={picked ? styles.picked : undefined}
                style={
                  {
                    '--pastel': seed.pastel,
                    '--seed-ink': seed.ink,
                  } as CSSProperties
                }
              >
                <a
                  href={vol(seed.slug)}
                  aria-current={picked ? 'true' : undefined}
                  aria-label={`${seed.name}, alternative to ${seed.primaryReplace}`}
                >
                  {seed.name} <Arrow />
                </a>
              </li>
            );
          })}
        </ul>
        <a className={styles.more} href={`#${comingSoon.id}`}>
          {`+ ${upcomingCount} more coming soon…`}
        </a>
      </section>
    </div>
  );
}
