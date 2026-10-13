import { makers } from '@/content/landing';

import p from './page.module.css';
import s from './makers.module.css';

export function Makers() {
  return (
    <section className={`${p.wrap} ${s.makers}`} aria-labelledby="makers-title">
      <div className={s.copy}>
        <h2 id="makers-title" className={s.title}>
          {makers.heading}
        </h2>
        <p className={s.line}>{makers.line}</p>
      </div>
      <a href={makers.link.href} className={`${p.btn} ${s.cta}`}>
        {makers.link.label}
      </a>
    </section>
  );
}
