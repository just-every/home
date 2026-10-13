import { ArrowRight } from 'lucide-react';

import { AppTile } from './AppTile';
import styles from './Hero.module.css';
import { PlayGlyph } from './icons';
import ui from './running.module.css';
import { wallRows } from './wall-tiles';

/** The hero copy is owner-fixed for this variant. */
const hero = {
  headline: 'Just every app your business runs on.',
  subhead:
    'Open-source alternatives to Notion, Linear, Intercom and eleven more. 100% free, MIT licensed, yours to change.',
  primary: 'See them all',
  secondary: 'Watch the demos',
} as const;

const sizes = {
  top: '(min-width: 1200px) 31vw, (min-width: 768px) 46vw, 46vw',
  middle: '(min-width: 1200px) 50vw, 94vw',
  bottom: '(min-width: 1200px) 33vw, (min-width: 768px) 46vw, 46vw',
};

/** Keeps a phrase on one line; here it gives the approved design's breaks. */
function keepTogether(text: string, phrase: string) {
  const [before, after] = text.split(phrase);
  return (
    <>
      {before}
      <span className={styles.nowrap}>{phrase}</span>
      {after}
    </>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="running-hero-title">
      <div className={styles.top}>
        <div className={styles.intro}>
          <h1 id="running-hero-title" className={styles.title}>
            {hero.headline}
          </h1>
          <p className={styles.subhead}>
            {keepTogether(hero.subhead, 'MIT licensed,')}
          </p>
          <div className={styles.actions}>
            <a className={`${ui.pill} ${styles.primary}`} href="#all">
              {hero.primary}
              <ArrowRight className={styles.arrow} aria-hidden="true" />
            </a>
            <a className={styles.watch} href="#running">
              <span className={styles.watchText}>{hero.secondary}</span>
              <PlayGlyph className={styles.play} />
            </a>
          </div>
        </div>
        <div className={styles.wallTop}>
          {wallRows.top.map(tile => (
            <AppTile key={tile.slug} tile={tile} sizes={sizes.top} />
          ))}
        </div>
      </div>
      <div className={styles.wallMiddle}>
        {wallRows.middle.map(tile => (
          <AppTile key={tile.slug} tile={tile} sizes={sizes.middle} />
        ))}
      </div>
      <div className={styles.wallBottom}>
        {wallRows.bottom.map(tile => (
          <AppTile key={tile.slug} tile={tile} sizes={sizes.bottom} />
        ))}
      </div>
    </section>
  );
}
