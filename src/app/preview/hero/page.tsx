import type { Metadata } from 'next';

import { sans } from '@/components/landing/fonts';
import { heroGroups } from '@/components/landing/heroVariants/variants';
import ui from '@/components/landing/label.module.css';

import styles from './index.module.css';

export const metadata: Metadata = {
  title: 'Hero previews',
  robots: { index: false, follow: false },
};

const toneLabel = { light: 'Light header', dark: 'Dark header' } as const;

/**
 * Preview only: every header and hero look side by side, light header and
 * dark, each linking to the whole page in that look. The thumbnails are the
 * looks' first viewports at 1440 (scripts/shoot-hero-variants.mjs).
 */
export default function HeroPreviews() {
  return (
    <div className={`${ui.page} ${sans.variable} ${styles.page}`}>
      <main className={`${ui.wrap} ${styles.main}`}>
        <p className={ui.eyebrow}>Preview</p>
        <h1 className={ui.h2}>Header and hero looks</h1>
        <p className={`${ui.lead} ${styles.lead}`}>
          Each look is the whole landing page with only its header and hero
          changed. Open one to scroll it, resize it and try the shelf.
        </p>
        <ol className={styles.groups}>
          {heroGroups.map(group => (
            <li key={group.key} className={styles.group}>
              <div className={styles.about}>
                <h2 className={styles.name}>
                  {group.letter ? (
                    <span className={styles.letter}>{group.letter}</span>
                  ) : null}
                  {group.name}
                </h2>
                <p className={styles.summary}>{group.summary}</p>
              </div>
              <ul className={styles.shots}>
                {group.variants.map(variant => (
                  <li key={variant.id}>
                    <a
                      className={styles.shot}
                      href={`/preview/hero/${variant.id}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/landing/preview/hero/${variant.id}.webp`}
                        width={720}
                        height={450}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <span className={styles.caption}>
                        <span>{toneLabel[variant.chrome]}</span>
                        <span className={styles.path}>
                          /preview/hero/{variant.id}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
