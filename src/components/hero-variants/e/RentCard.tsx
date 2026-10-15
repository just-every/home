import type { RefObject } from 'react';

import styles from './hero-e.module.css';
import { PeopleIcon } from './icons';
import {
  alsoTools,
  moreTools,
  shownTools,
  toolNamed,
  type RentedTool,
} from './tools';

interface RentCardProps {
  picked: RentedTool | null;
  onPick: (tool: RentedTool) => void;
  firstRef: RefObject<HTMLButtonElement | null>;
}

const moreCount = moreTools.length + alsoTools.length;

/**
 * "Tools you rent": the picker. Each of the seven rows is a toggle button;
 * "+ N more" is a native select of every other incumbent a seed replaces,
 * the seeds' own primary ones first.
 */
export function RentCard({ picked, onPick, firstRef }: RentCardProps) {
  const fromMore =
    picked && !shownTools.some(tool => tool.name === picked.name)
      ? picked.name
      : '';

  return (
    <article className={`${styles.card} ${styles.rent}`} id="hero-e-rent">
      <div className={styles.cardHead}>
        <h2>Tools you rent</h2>
        <p>Per seat. Not yours.</p>
      </div>
      <ul className={styles.rentList} aria-label="Pick the tool you rent">
        {shownTools.map((tool, index) => {
          const on = picked?.name === tool.name;
          return (
            <li key={tool.name}>
              <button
                type="button"
                ref={index === 0 ? firstRef : undefined}
                className={`${styles.rentRow} ${on ? styles.on : ''}`}
                aria-pressed={on}
                onClick={() => onPick(tool)}
              >
                <span>{tool.name}</span>
                <PeopleIcon className={styles.people} />
              </button>
            </li>
          );
        })}
        <li>
          <label className={`${styles.more} ${fromMore ? styles.on : ''}`}>
            <span className={styles.srOnly}>More tools you might rent</span>
            <select
              value={fromMore}
              onChange={event => {
                const tool = toolNamed(event.target.value);
                if (tool) onPick(tool);
              }}
            >
              <option value="" disabled>
                + {moreCount} more
              </option>
              <optgroup label="More tools">
                {moreTools.map(tool => (
                  <option key={tool.name} value={tool.name}>
                    {tool.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Also replaced">
                {alsoTools.map(tool => (
                  <option key={tool.name} value={tool.name}>
                    {tool.name}
                  </option>
                ))}
              </optgroup>
            </select>
            <svg
              className={styles.chevron}
              viewBox="0 0 12 8"
              aria-hidden="true"
            >
              <path d="m1 1.5 5 5 5-5" />
            </svg>
          </label>
        </li>
      </ul>
    </article>
  );
}
