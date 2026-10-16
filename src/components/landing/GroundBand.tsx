import styles from './ground-band.module.css';

/**
 * The hero's painted ground (public/landing/hero/ground.svg), cut to a band
 * that closes a section: damp and cool at its left, sunlit at its right. It
 * sits at the section's foot and ignores the pointer; decorative.
 */
export function GroundBand({ className = '' }: { className?: string }) {
  return (
    <div className={`${styles.band} ${className}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/landing/hero/ground.svg"
        alt=""
        width={7680}
        height={600}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
