import { ArrowUpRight, Play } from 'lucide-react';

import { collection, nav } from '@/content/landing';
import { seeds } from '@/data/seeds';

import { ObjectImage } from './ObjectImage';
import styles from './collection.module.css';
import shared from './page.module.css';

export function Collection() {
  const eyebrow = nav.find(link => link.href === `#${collection.id}`)?.label;

  return (
    <section
      id={collection.id}
      className={styles.collection}
      aria-labelledby="objects-collection-title"
    >
      <header className={styles.header}>
        {eyebrow ? <p className={shared.eyebrow}>{eyebrow}</p> : null}
        <h2 id="objects-collection-title" className={styles.title}>
          {collection.heading}
        </h2>
        <p className={styles.line}>{collection.line}</p>
      </header>
      <p className={`${shared.note} ${styles.note}`} aria-hidden="true">
        {/* Quotes the footer's small print. */}
        Every product MIT licensed.
      </p>

      <ul className={styles.grid}>
        {seeds.map(seed => (
          <li key={seed.slug} className={styles.card}>
            <div className={styles.art}>
              <ObjectImage slug={seed.slug} className={styles.object} />
            </div>
            <div className={styles.text}>
              <h3 className={styles.name}>{seed.name}</h3>
              <p className={styles.replaces}>
                {collection.alternativeTo} {seed.primaryReplace}
              </p>
              <p className={styles.desc}>{seed.line}</p>
              <div className={styles.links}>
                {seed.reel ? (
                  <a className={styles.link} href={`#reel-${seed.slug}`}>
                    <Play aria-hidden="true" className={styles.icon} />
                    {collection.watchLabel}
                  </a>
                ) : null}
                {seed.status === 'public' && seed.repo ? (
                  <a
                    className={styles.link}
                    href={seed.repo}
                    aria-label={`${seed.name} on GitHub`}
                  >
                    {collection.githubLabel}
                    <ArrowUpRight aria-hidden="true" className={styles.icon} />
                  </a>
                ) : (
                  <span className={`${shared.soon} ${styles.soon}`}>
                    {collection.notYetPublicLabel}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
