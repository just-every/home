import Link from 'next/link';

import { ArticleFigure } from '@/components/article/ArticleFigure';
import { autoDrive } from '@/components/article/autoDrive';
import { AutoDriveVideo } from '@/components/article/AutoDriveVideo';
import { Handnote } from '@/components/article/parts';
import { Logo } from '@/components/landing/Logo';
import { seeds } from '@/data/seeds';
import { numberWord } from '@/lib/number-word';

import styles from './journey.module.css';

/**
 * The header figure: our first homepage (commit f47ba68 in
 * just-every/home, src/app/page.tsx, 30 May 2025), redrawn in ink with its
 * own strings in their own order: the wordmark, the hero line, the fair
 * warning (circled), the question and its first two example cards.
 */
export function FirstHomepage() {
  return (
    <ArticleFigure
      className={styles.firstFigure}
      caption="Our first homepage, May 2025."
    >
      <div className={styles.browser}>
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.url}>justevery.com</span>
        </div>
        <div className={styles.screen}>
          <div className={styles.oldNav}>
            <Logo />
          </div>
          <p className={styles.oldHero}>When apps end, ideas begin.</p>
          <p className={styles.oldWarn}>
            <strong>Fair warning:</strong> We’re an MVP that will fail
            sometimes.
            <svg
              viewBox="0 0 200 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M30 9C70 1 168 3 191 20c13 11-6 29-62 34C66 59 10 52 6 33 3 18 32 7 74 6" />
            </svg>
          </p>
          <p className={styles.oldAsk}>What can you build in 30 seconds?</p>
          <div className={styles.oldCards}>
            <div>
              <span className={styles.thumb} />
              <p>Startup Metrics Dashboard</p>
            </div>
            <div>
              <span className={`${styles.thumb} ${styles.thumbTwo}`} />
              <p>AI Study Buddy</p>
            </div>
          </div>
        </div>
        <Handnote className={styles.stamp}>30 May 2025</Handnote>
      </div>
    </ArticleFigure>
  );
}

/** The Auto Drive video, playable in the page. */
export function AutoDrive() {
  return (
    <ArticleFigure
      caption={
        <>
          {autoDrive.title} ({autoDrive.length}). Hand it a planned task, then
          grab some lunch.{' '}
          <a href={autoDrive.watchUrl}>
            Watch on YouTube <span aria-hidden="true">↗</span>
          </a>
        </>
      }
    >
      <AutoDriveVideo />
    </ArticleFigure>
  );
}

/**
 * A painted figure: one of the essay's spot illustrations, traced flat in the
 * footer's dusk-mist hand (public/landing/essays/journey/), static on the
 * page's paper.
 */
function Painting({
  src,
  width,
  height,
  alt,
  caption,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}) {
  return (
    <ArticleFigure className={styles.painted} caption={caption}>
      {/* An SVG: next/image would only pass it through. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.paint}
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </ArticleFigure>
  );
}

/** After the opening: the quick version is a front with nothing behind it. */
export function Front() {
  return (
    <Painting
      src="/landing/essays/journey/front.svg"
      width={1440}
      height={834}
      alt="A cottage front that is only a flat painted board, braced from behind with nothing else there, while a winding path leads away over the hill to a small real cottage."
      caption="The quick version looks fine from the front. The real one was further down the path."
    />
  );
}

/** The boring part: the merges landed while nobody was at the table. */
export function Morning() {
  return (
    <Painting
      src="/landing/essays/journey/morning.svg"
      width={1440}
      height={729}
      alt="A garden table at sunrise with an open laptop showing lines of code and an untouched cup of coffee, an empty chair beside it and a white dog asleep underneath."
      caption="Seven in the morning, and nobody at the desk."
    />
  );
}

/** The render shows the first fourteen volumes, as there were in mid-October. */
const shelved = seeds.slice(0, 14);

/** The shelf render from the landing page, linking to the collection. */
export function Shelf() {
  return (
    <ArticleFigure caption="Fourteen products, all public and MIT licensed.">
      <Link className={styles.shelf} href="/products">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/shelf/shelf-1440.webp"
          srcSet="/landing/shelf/shelf-800.webp 800w, /landing/shelf/shelf-1440.webp 2242w"
          sizes="(max-width: 599px) 100vw, 860px"
          alt={`See all ${numberWord(seeds.length)} products. The shelf shows the first fourteen as a row of book spines, each in its own colour with its own mark: ${shelved.map(s => s.name).join(', ')}.`}
          width={2242}
          height={1092}
          loading="lazy"
          decoding="async"
        />
      </Link>
    </ArticleFigure>
  );
}
