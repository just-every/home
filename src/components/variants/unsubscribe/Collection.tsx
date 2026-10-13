import { collection } from '@/content/landing';
import { seeds } from '@/data/seeds';

import p from './page.module.css';
import { ProductCard } from './ProductCard';
import s from './collection.module.css';

export function Collection() {
  return (
    <section
      id={collection.id}
      className={`${p.wrap} ${s.collection}`}
      aria-labelledby={`${collection.id}-title`}
    >
      <h2 id={`${collection.id}-title`} className={p.sectionTitle}>
        {collection.heading}
      </h2>
      <p className={`${p.lede} ${s.lede}`}>{collection.line}</p>
      <ul className={s.cards}>
        {seeds.map(seed => (
          <li key={seed.slug} className={s.item}>
            <ProductCard seed={seed} />
          </li>
        ))}
      </ul>
    </section>
  );
}
