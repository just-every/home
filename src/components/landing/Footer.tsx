import Link from 'next/link';

import { footer } from '@/content/landing';

import ui from './label.module.css';
import { Logo } from './Logo';
import styles from './footer.module.css';
import { TokenCount } from './TokenCount';

/**
 * The illustrated footer (owner's pick B3, 15 Oct): a two-ink riso landscape
 * as a full-bleed band, the page links over its sky, then the wordmark, a
 * rule and the token line on the same paper. The art is one SVG (two ink
 * plates over a cream for the shirt and dog; scripts/footer-inks.mjs sets
 * their colours), loaded lazily as an image so the page's HTML stays light.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.scene}>
        {/* An SVG: next/image would only pass it through. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.art}
          src="/landing/footer/footer-art.svg"
          width={3072}
          height={1766}
          alt="A person with a laptop and a white dog sit under a big tree on a grassy hill, looking over a bay at a pink setting sun, with a small village and cypress trees beyond."
          loading="lazy"
          decoding="async"
        />
        <div className={`${ui.wrap} ${styles.top}`}>
          <nav aria-label="Footer" className={styles.nav}>
            {footer.links.map(link => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className={`${ui.wrap} ${styles.base}`}>
        <div className={styles.mark}>
          {/* The page links to itself: no prefetch needed. */}
          <Link className={styles.brand} href="/" prefetch={false}>
            <Logo />
          </Link>
        </div>
        <TokenCount />
      </div>
    </footer>
  );
}
