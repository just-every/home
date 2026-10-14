import { Footer } from '@/components/landing/Footer';
import { handwriting, sans } from '@/components/landing/fonts';
import { Header } from '@/components/landing/Header';
import ui from '@/components/landing/label.module.css';
import { contact } from '@/content/contact';

import styles from './contact.module.css';
import { ContactPanels } from './ContactPanels';
import { HelloArt } from './HelloArt';
import { OpenStrip } from './OpenStrip';

/**
 * /contact: "Say hello." The route cards and the form share one client
 * component (the Makers and Everything else routes fill and focus the form);
 * everything else is server-rendered inside the site's header and footer.
 */
export function ContactPage() {
  return (
    <div className={`${ui.page} ${sans.variable}`}>
      <Header />
      <main className={styles.room}>
        <div className={`${ui.wrap} ${styles.content}`}>
          <section className={styles.hero}>
            <div className={styles.copy}>
              <h1>{contact.heading}</h1>
              <p>{contact.line}</p>
            </div>
            <div className={styles.art}>
              <p className={`${styles.note} ${handwriting.className}`}>
                <span>{contact.note}</span>
                <svg viewBox="0 0 64 44" aria-hidden="true">
                  <path
                    d="M6 6C10 30 34 40 58 30M58 30l-12-1M58 30l-8 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
              <HelloArt />
            </div>
          </section>
          <ContactPanels />
          <OpenStrip />
        </div>
      </main>
      <Footer />
    </div>
  );
}
