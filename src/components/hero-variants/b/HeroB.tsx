import ui from '@/components/landing/label.module.css';

import { CodeIcon, GiftIcon, LicenceIcon, NoteArrowRight } from './art';
import { display, hand, mono, pixel } from './fonts';
import styles from './heroB.module.css';
import { PickLink } from './PickLink';
import { Switcher } from './Switcher';

const fonts = [display, mono, pixel, hand].map(font => font.variable).join(' ');

/**
 * Hero B (12ui design "r1 b"): "Stop renting your software." beside the
 * "Pick your switch" terminal card, over a pixel-art landscape whose sign
 * reads "Open source". The visitor picks the tool they rent and the card's
 * button switches to the seed that replaces it. The page's own floating
 * header sits over the top; the hero leaves its height free.
 */
export default function HeroB() {
  return (
    <section
      className={`${styles.hero} ${fonts}`}
      aria-labelledby="hero-b-heading"
    >
      <div className={`${ui.wrap} ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Same work. Yours to own.</p>
          <h1 id="hero-b-heading" className={styles.headline}>
            <span>Stop renting</span> <span>your software.</span>
          </h1>
          <p className={styles.description}>
            Free, open-source alternatives to Notion, Slack, Intercom, Calendly
            and more. Run them yourself and keep control.
          </p>
          <PickLink className={styles.primary}>
            <span>Pick a tool to replace</span>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </PickLink>
          <ul className={styles.benefits}>
            <li>
              <GiftIcon className={styles.benefitIcon} />
              <span>100% free</span>
            </li>
            <li>
              <CodeIcon className={styles.benefitIcon} />
              <span>Open source</span>
            </li>
            <li>
              <LicenceIcon className={styles.benefitIcon} />
              <span>MIT licensed</span>
            </li>
          </ul>
        </div>
        <Switcher />
      </div>
      <div className={styles.landscape}>
        <div className={styles.scene}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.sceneArt}
            src="/hero-variants/b/landscape-1536.webp"
            srcSet="/hero-variants/b/landscape-800.webp 800w, /hero-variants/b/landscape-1536.webp 1536w, /hero-variants/b/landscape-3072.webp 3072w"
            sizes="(max-width: 1023px) 860px, 100vw"
            width={1536}
            height={304}
            alt=""
            decoding="async"
            fetchPriority="high"
            draggable={false}
          />
          <p className={styles.sign} aria-hidden="true">
            <strong>Open source</strong>
            <span>MIT licensed</span>
          </p>
        </div>
        <p className={`${styles.annotation} ${styles.bottomNote}`}>
          <span>Same work. Different owner.</span>
          <NoteArrowRight className={styles.bottomNoteArrow} />
        </p>
      </div>
    </section>
  );
}
