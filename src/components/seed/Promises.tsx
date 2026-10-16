import type { CSSProperties } from 'react';

import ui from '@/components/landing/label.module.css';
import type { SeedPromise } from '@/data/seed-pages';

import { splitPromises } from './model';
import { promiseArt } from './promise-icons';
import { PromiseIcon } from './promise-icons/PromiseIcon';
import styles from './promises.module.css';
import seed from './seed.module.css';

/**
 * What a seed promises, from its contract: the first promise of up to four
 * kinds leads as a soft card with that kind's painted icon, tinted in the
 * icon's hue, and the rest follow as a quiet ruled list, each group in
 * contract order. The contract's own ids stay out of sight, on the items
 * (some are blank and some repeat, so items are keyed by place).
 */
export function Promises({
  promises,
  contractUrl,
}: {
  promises: SeedPromise[];
  contractUrl: string;
}) {
  const { lead, rest } = splitPromises(promises);
  return (
    <section aria-labelledby="promises-heading">
      <h2 className={seed.h2} id="promises-heading">
        What it promises
      </h2>
      <ul className={styles.promises}>
        {lead.map((promise, i) => {
          const art = promiseArt[promise.category];
          return (
            <li
              key={`lead-${i}-${promise.id}`}
              className={`${styles.lead} ${lead.length === 1 ? styles.solo : ''}`}
              style={{ '--tint': art.tint } as CSSProperties}
              data-contract-id={promise.id || undefined}
            >
              <PromiseIcon art={art} className={styles.icon} />
              <span>{promise.text}</span>
            </li>
          );
        })}
        {rest.map((promise, i) => (
          <li
            key={`rest-${i}-${promise.id}`}
            className={styles.row}
            data-contract-id={promise.id || undefined}
          >
            {promise.text}
          </li>
        ))}
      </ul>
      {contractUrl ? (
        <a className={ui.under} href={contractUrl}>
          <span>Read the full contract</span>
          <span className={ui.arrow} aria-hidden="true">
            →
          </span>
        </a>
      ) : null}
    </section>
  );
}
