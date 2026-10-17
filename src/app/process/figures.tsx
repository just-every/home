import { ArticleFigure } from '@/components/article/ArticleFigure';
import { Handnote, parts } from '@/components/article/parts';

import styles from './process.module.css';

const art = '/landing/essays/process';

/**
 * A painted figure: one flat SVG in the footer's hand, still. The header's
 * (`lead`) loads first and keeps the header figure's width on phones.
 */
function Painting({
  src,
  width,
  height,
  alt,
  lead = false,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  lead?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={lead ? styles.leadPainting : styles.painting}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={lead ? 'eager' : 'lazy'}
      fetchPriority={lead ? 'high' : undefined}
      decoding="async"
      draggable={false}
    />
  );
}

/**
 * The header figure, the opening scene: the worst ten minutes. The shop is
 * dark in the storm, and its little status board still shows all green.
 * Lamp's light in the rain answers it further down.
 */
export function AllClear() {
  return (
    <ArticleFigure
      className={styles.lead}
      caption="Lights out, and the sign still says all clear."
    >
      <Painting
        lead
        src={`${art}/all-clear-in-the-storm.svg`}
        width={1200}
        height={678}
        alt="A painted corner shop in a storm, its lights out and its striped awning torn loose, under a rain cloud with a flash of lightning. Out front, a little sandwich board still shows a big green tick and three green lights."
      />
    </ArticleFigure>
  );
}

/**
 * Lamp's promise for a bad day (run-lamp v1.4.0 CONTRACT.md line 22): the
 * footer's dog looks up at a street lamp still lit in the rain.
 */
export function LampInTheRain() {
  return (
    <ArticleFigure caption="In a storm, Lamp shows what it last knew, and never an all-clear it can’t check.">
      <Painting
        src={`${art}/lamp-in-the-rain.svg`}
        width={1200}
        height={743}
        alt="A painted street lamp, lit, standing in a meadow under a rain cloud, with a cream dog sitting at its foot looking up at the light."
      />
    </ArticleFigure>
  );
}

/**
 * The scheduled-publish promise as Lamp 1.4.0 changed it (run-lamp v1.4.0
 * CONTRACT.md line 71, its opening words), and the measurement in
 * RELEASE.json contractChanges.UPDATE-006.summary.
 */
export function PromiseChanged() {
  return (
    <ArticleFigure caption="Lamp 1.4.0 changed a promise, and kept the reason.">
      <div className={styles.changed}>
        <div className={`${parts.sheet} ${styles.changedCard}`}>
          <p className={styles.changedTitle}>Scheduled publish.</p>
          <p className={styles.changedText}>
            “An update given a future publish time publishes within{' '}
            <span className={styles.nowrap}>
              <del className={styles.struck}>
                60
                <svg
                  viewBox="0 0 40 20"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M1 15C11 12 25 8 39 4" />
                </svg>
              </del>{' '}
              <ins className={styles.inserted}>240</ins>
            </span>{' '}
            seconds of that time…”
          </p>
        </div>
        <div>
          <p className={styles.marginLabel}>Lamp 1.4.0, release record</p>
          <Handnote className={styles.marginNote}>
            “…the latest became publicly visible 238.5 seconds after its due
            time.”
          </Handnote>
        </div>
      </div>
    </ArticleFigure>
  );
}

/**
 * Upstream keeps flowing into the fork: a stream from the hills splits in
 * two, and the footer's person and dog sit on the far branch's bank.
 */
export function ForkedStream() {
  return (
    <ArticleFigure caption="A fork doesn’t have to dry up. Upstream keeps flowing in, and your side stays yours.">
      <Painting
        src={`${art}/forked-stream.svg`}
        width={1200}
        height={567}
        alt="A painted stream runs down from lavender hills and splits in two around a meadow. Both branches flow full. On the bank of the right branch, a person works on a laptop with a cream dog beside them, near a little footbridge."
      />
    </ArticleFigure>
  );
}
