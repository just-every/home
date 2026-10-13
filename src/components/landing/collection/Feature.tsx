import { collection } from '@/content/landing';
import { Reel } from '@/components/shared/Reel';

import { BrandMark } from '../BrandMark';
import ui from '../label.module.css';
import { cardId } from '../volumes';
import styles from './collection.module.css';
import { cardStyle } from './cardStyle';
import type { Placed } from './types';
import { featureHeadingId } from './useSelection';

const host = (url: string) => new URL(url).host;

/** The product's reel where it has one, else a real picture of it. */
function Media({ item }: { item: Placed['item'] }) {
  if (item.reel) {
    return <Reel key={item.slug} seed={item} className={styles.picture} />;
  }
  if (!item.still) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={item.slug}
      className={styles.picture}
      src={item.still.src}
      width={item.still.width}
      height={item.still.height}
      alt={item.still.alt}
      decoding="async"
    />
  );
}

/**
 * The selected product, large: its media, name and family, what it
 * replaces, its own headline and line (or Claude's reason, after a search),
 * its homepage where it is live, and GitHub.
 */
export function Feature({ placed }: { placed: Placed }) {
  const { item, replaces, reason } = placed;
  const line = reason ?? item.line;
  const primary = item.homepage
    ? {
        href: item.homepage,
        label: host(item.homepage),
        name: undefined,
        arrow: '↗',
      }
    : {
        href: item.repo,
        label: collection.githubLabel,
        name: `${item.name} on ${collection.githubLabel}`,
        arrow: '→',
      };
  return (
    <li
      className={`${ui.card} ${ui.tinted} ${styles.feature}`}
      id={cardId(item.slug)}
      style={cardStyle(item)}
    >
      <div className={styles.featureText}>
        <BrandMark className={styles.featureMark} volume={item} size={52} />
        <p className={styles.num}>{item.number}</p>
        <h3 className={styles.featureName} id={featureHeadingId} tabIndex={-1}>
          {item.name}{' '}
          <span className={styles.family}>
            <span aria-hidden="true">· </span>
            <span className={ui.srOnly}>, </span>
            {item.family}
          </span>
        </h3>
        <p className={styles.alt}>
          {collection.alternativeTo} {replaces}
        </p>
        {item.headline ? (
          <p className={styles.headline}>{item.headline}</p>
        ) : null}
        <p className={styles.line}>{line}</p>
        <div className={styles.links}>
          <a
            className={`${ui.pill} ${ui.pillSmall} ${styles.primary}`}
            href={primary.href}
            aria-label={primary.name}
          >
            {primary.label}{' '}
            <span className={ui.arrow} aria-hidden="true">
              {primary.arrow}
            </span>
          </a>
          {item.homepage ? (
            <a
              className={`${ui.under} ${styles.secondary}`}
              href={item.repo}
              aria-label={`${item.name} on ${collection.githubLabel}`}
            >
              <span>{collection.githubLabel}</span>
              <span className={ui.arrow} aria-hidden="true">
                →
              </span>
            </a>
          ) : null}
        </div>
      </div>
      <div className={styles.media}>
        <Media item={item} />
      </div>
    </li>
  );
}
