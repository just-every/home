import { products } from '@/content/landing';
import { seeds } from '@/data/seeds';
import { upcoming } from '@/data/upcoming';
import { numberWord } from '@/lib/number-word';

import { Collection } from './Collection';
import { ComingSoon } from './ComingSoon';
import { sans } from './fonts';
import { Footer } from './Footer';
import { Header } from './Header';
import ui from './label.module.css';
import panels from './panels.module.css';
import styles from './products.module.css';
import { Separator } from './Separator';
import { Suggest } from './suggest/Suggest';

/**
 * /products: the full index. The search and every released product by area,
 * then the seeds in the works, then one painted strip that eases into the
 * suggestion form, so the page never ends on the strip.
 */
export function ProductsPage() {
  return (
    <div className={`${ui.page} ${sans.variable}`}>
      <Header />
      <main>
        <div className={styles.room}>
          <div className={ui.wrap}>
            <h1 className={styles.title}>
              {products.heading(numberWord(seeds.length + upcoming.length))}
            </h1>
            <p className={`${ui.lead} ${styles.line}`}>{products.line}</p>
          </div>
        </div>
        <Collection standalone />
        <ComingSoon />
        <Separator variant="garden" />
        <div className={`${ui.wrap} ${panels.panels}`}>
          <Suggest />
        </div>
      </main>
      <Footer rise />
    </div>
  );
}
