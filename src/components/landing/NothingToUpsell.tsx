import { nothingToUpsell } from '@/content/landing';

import { BrandMark } from './BrandMark';
import ui from './label.module.css';
import styles from './nothing-to-upsell.module.css';
import { volumeStyle, volumes } from './volumes';

const examples = nothingToUpsell.examples.flatMap(slug => {
  const volume = volumes.find(candidate => candidate.slug === slug);
  return volume ? [volume] : [];
});

/**
 * The incentive argument: three products, each shown as what it does, in the
 * line from its own card. Each links to that card.
 */
export function NothingToUpsell() {
  return (
    <section
      className={`${ui.wrap} ${styles.section}`}
      id={nothingToUpsell.id}
      aria-labelledby="label-upsell-heading"
    >
      <div className={styles.head}>
        <p className={ui.eyebrow}>{nothingToUpsell.eyebrow}</p>
        <h2 className={ui.h2} id="label-upsell-heading">
          {nothingToUpsell.heading}
        </h2>
        <p className={`${ui.lead} ${styles.line}`}>{nothingToUpsell.line}</p>
      </div>
      <ul className={styles.examples} aria-label={nothingToUpsell.listLabel}>
        {examples.map(volume => (
          <li key={volume.slug} className={styles.item}>
            <a
              className={`${ui.card} ${ui.tinted} ${styles.example}`}
              href={volume.href}
              style={volumeStyle(volume)}
            >
              <span className={styles.top}>
                <BrandMark className={styles.mark} volume={volume} size={28} />
                <span className={styles.name}>{volume.name}</span>
              </span>
              <span className={ui.srOnly}>: </span>
              <span className={styles.text}>{volume.seed.line}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
