import { Roboto_Mono } from 'next/font/google';

import { collection, runOne } from '@/content/landing';
import { seeds } from '@/data/seeds';

import { GitHubMark } from './icons';
import m from './manifesto.module.css';
import { MarkTile } from './MarkTile';
import styles from './run-one.module.css';

const mono = Roboto_Mono({ subsets: ['latin'], display: 'swap' });

/** The product the commands clone, found from the clone command itself. */
const product = seeds.find(
  seed =>
    seed.repo &&
    runOne.commands.some(command => command.includes(seed.repo as string))
);

export function RunOne() {
  return (
    <section className={styles.section} aria-labelledby="manifesto-run-title">
      <div id="run" className={styles.copy}>
        <h2 id="manifesto-run-title" className={`${m.display} ${styles.title}`}>
          {runOne.heading}
        </h2>
        <p className={styles.lede}>{runOne.line}</p>
        <p className={styles.after}>{runOne.afterLine}</p>
        <p className={styles.alt}>
          {runOne.altLine.before}{' '}
          <code className={mono.className}>{runOne.altLine.command}</code>{' '}
          {runOne.altLine.after}
        </p>
      </div>

      <div className={styles.window}>
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          Terminal
        </div>
        <pre
          className={`${styles.terminal} ${mono.className}`}
          tabIndex={0}
          role="region"
          aria-label="Commands"
        >
          <code>
            {runOne.commands.map(command => (
              <span key={command} className={styles.line}>
                <span className={styles.prompt} aria-hidden="true">
                  ${' '}
                </span>
                {command}
              </span>
            ))}
          </code>
        </pre>
        {product ? (
          <div className={styles.product}>
            <MarkTile seed={product} size={64} />
            <div className={styles.productText}>
              <p className={styles.productName}>{product.name}</p>
              <p className={styles.productLine}>
                {collection.alternativeTo} {product.primaryReplace}
              </p>
            </div>
            <a href={product.repo ?? undefined} className={styles.productLink}>
              <GitHubMark size={18} />
              <span>
                {collection.githubLabel}
                <span className={m.srOnly}>: {product.name}</span>
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
