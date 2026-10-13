import type { CSSProperties, ReactNode } from 'react';

import { stand } from '@/content/landing';

import ui from './label.module.css';
import styles from './stand.module.css';

/** The design's principle symbols, in its order. */
const symbols: { tint: string; art: ReactNode }[] = [
  {
    tint: '#e9f7f0',
    art: (
      <svg viewBox="0 0 110 110" aria-hidden="true">
        <circle cx="55" cy="38" r="35" fill="#43c79e" opacity=".9" />
        <circle cx="34" cy="72" r="31" fill="#65dcb8" opacity=".7" />
        <circle cx="76" cy="70" r="34" fill="#15a379" opacity=".78" />
      </svg>
    ),
  },
  {
    tint: '#e8f3ff',
    art: (
      <svg viewBox="0 0 50 50" aria-hidden="true">
        <path d="M1 13h34v34H1z" fill="#83bdff" />
        <path d="M11 2h34v34H11z" fill="#348aff" opacity=".85" />
      </svg>
    ),
  },
  {
    tint: '#fff8e3',
    art: (
      <svg viewBox="0 0 50 50" aria-hidden="true">
        <path d="M25 2 48 46H2z" fill="#fbc438" />
        <path d="M25 2 13 46H2z" fill="#fff" opacity=".12" />
      </svg>
    ),
  },
];

export function Stand() {
  return (
    <section
      className={`${ui.wrap} ${styles.stand}`}
      aria-labelledby="label-stand-heading"
    >
      <div className={styles.intro}>
        <p className={ui.eyebrow}>What we stand for</p>
        <h2 className={styles.heading} id="label-stand-heading">
          {stand.heading}
        </h2>
        {stand.lines.map(line => (
          <p key={line} className={styles.line}>
            {line}
          </p>
        ))}
      </div>
      <ul className={styles.points}>
        {stand.points.map((point, index) => {
          const symbol = symbols[index % symbols.length];
          return (
            <li
              key={point.title}
              className={styles.point}
              style={{ '--tint': symbol.tint } as CSSProperties}
            >
              <span className={styles.symbol}>{symbol.art}</span>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
