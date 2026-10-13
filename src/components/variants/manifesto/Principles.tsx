import m from './manifesto.module.css';
import styles from './principles.module.css';
import { RunOne } from './RunOne';
import { Stand } from './Stand';

/**
 * What Just Every stands for, then running one: two sections laid out as the
 * design's single spread, text on the left and the cards stacked on the right.
 */
export function Principles() {
  return (
    <div className={styles.wrap}>
      <div className={`${m.container} ${styles.grid}`}>
        <Stand />
        <RunOne />
      </div>
    </div>
  );
}
