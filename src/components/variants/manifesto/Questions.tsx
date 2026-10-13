import { nav, questions } from '@/content/landing';

import m from './manifesto.module.css';
import styles from './questions.module.css';

const eyebrow =
  nav.find(item => item.href === `#${questions.id}`)?.label ?? 'Questions';

/** The skeptic's questions, as one crisp list. */
export function Questions() {
  return (
    <section
      id={questions.id}
      className={styles.section}
      aria-labelledby="manifesto-questions-title"
    >
      <div className={m.container}>
        <div className={styles.inner}>
          <p className={m.eyebrow}>{eyebrow}</p>
          <h2
            id="manifesto-questions-title"
            className={`${m.display} ${styles.title}`}
          >
            {questions.heading}
          </h2>
          <p className={styles.lede}>{questions.line}</p>
          <dl className={styles.list}>
            {questions.items.map(item => (
              <div key={item.question} className={styles.item}>
                <dt>{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
