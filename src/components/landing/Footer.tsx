import Link from 'next/link';

import { footer } from '@/content/landing';

import ui from './label.module.css';
import { Logo } from './Logo';
import styles from './footer.module.css';
import { TokenCount } from './TokenCount';

/**
 * The illustrated footer (owner's pick B3, 15 Oct): a flat landscape in the
 * collection's pastels as a full-bleed band that runs to the bottom of the
 * page, with the wordmark, the token line and the site's links set over its
 * sky. The art is one SVG (traced shapes coloured by region;
 * scripts/footer-colours.mjs sets the colourway), loaded lazily as an image
 * so the page's HTML stays light.
 *
 * `rise`: the page above ends on an opaque card, so the art may rise behind
 * it (by the stylesheet's --rise), the tree's crown growing out from under
 * the card. Pages that end on bare text leave it off.
 */
export function Footer({ rise = false }: { rise?: boolean }) {
  return (
    <footer
      className={rise ? `${styles.footer} ${styles.rise}` : styles.footer}
    >
      <div className={styles.scene}>
        <div className={`${ui.wrap} ${styles.top}`}>
          <div className={styles.text}>
            <div className={styles.mark}>
              {/* The page links to itself: no prefetch needed. */}
              <Link className={styles.brand} href="/" prefetch={false}>
                <Logo />
              </Link>
              <TokenCount />
            </div>
            <nav aria-label="Footer" className={styles.nav}>
              {footer.groups.map(group => (
                <div key={group.heading} className={styles.group}>
                  <h2 className={styles.heading}>{group.heading}</h2>
                  <ul className={styles.links}>
                    {group.links.map(link => (
                      <li key={link.label}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
        {/* An SVG: next/image would only pass it through. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.art}
          src="/landing/footer/footer-art.svg"
          width={7040}
          height={2186}
          alt="A person with a laptop and a white dog sit under a big tree on a grassy hill, looking over a bay at the setting sun, with a small village and cypress trees beyond."
          loading="lazy"
          decoding="async"
        />
      </div>
    </footer>
  );
}
