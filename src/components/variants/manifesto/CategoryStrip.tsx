import {
  ChartNoAxesColumn,
  Database,
  FileText,
  LayoutGrid,
  ListTodo,
  MessageSquare,
  Send,
  type LucideIcon,
} from 'lucide-react';

import { footer } from '@/content/landing';
import { seedsBySlug, seeds } from '@/data/seeds';

import styles from './category-strip.module.css';

/** A line icon for a few product categories, in the design's strip style. */
const shown: { slug: string; icon: LucideIcon }[] = [
  { slug: 'slate', icon: FileText },
  { slug: 'vector', icon: ListTodo },
  { slug: 'cradle', icon: Database },
  { slug: 'penny', icon: MessageSquare },
  { slug: 'mango', icon: Send },
  { slug: 'uptime', icon: ChartNoAxesColumn },
];

const smallPrintLead = footer.smallPrint.split('. ')[0] + '.';

/** Keeps "open-source" on one line in the narrow caps column. */
function noBreakHyphens(text: string): string {
  return text.replace(/(\w)-(\w)/g, '$1\u2011$2');
}

/** The strip under the hero: a few real categories, each linking to its product. */
export function CategoryStrip() {
  const rest = seeds.length - shown.length;
  return (
    <div className={styles.wrap}>
      <div className={styles.strip}>
        <p className={styles.caps}>{noBreakHyphens(footer.line)}</p>
        <ul className={styles.items}>
          {shown.map(({ slug, icon: Icon }) => {
            const seed = seedsBySlug[slug];
            return (
              <li key={slug}>
                <a
                  href={`#product-${slug}`}
                  aria-label={`${seed.category}: ${seed.name}`}
                >
                  <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                  <span>{seed.category}</span>
                </a>
              </li>
            );
          })}
          <li>
            <a href="#all">
              <LayoutGrid size={26} strokeWidth={1.5} aria-hidden="true" />
              <span>{rest} more</span>
            </a>
          </li>
        </ul>
        <p className={`${styles.caps} ${styles.capsEnd}`}>{smallPrintLead}</p>
      </div>
    </div>
  );
}
