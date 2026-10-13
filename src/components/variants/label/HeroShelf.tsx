import styles from './heroShelf.module.css';

/**
 * The hero's shelf of volumes, filling the width of its slot in Hero.
 *
 * For now this is the approved box-set art as a fixed picture, a placeholder
 * until the data-driven shelf (drawn from labelVolumes() in volumes.ts)
 * replaces this component.
 */
export function HeroShelf() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.shelf}
      src="/variants/label/box-set.webp"
      srcSet="/variants/label/box-set-800.webp 800w, /variants/label/box-set.webp 1588w"
      sizes="(min-width: 1440px) 749px, (min-width: 1024px) 52vw, 100vw"
      width={1588}
      height={912}
      alt="The collection as a box set: numbered volumes in pastel colours, the first one face out."
      fetchPriority="high"
      decoding="async"
    />
  );
}
