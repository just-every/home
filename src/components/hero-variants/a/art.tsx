import styles from './heroA.module.css';

/**
 * Hero A's artwork: the astronaut at the switch (one bitmap from the 12ui
 * conversion, with RENT and OWN as live text), the misty hills behind the
 * lists that the conversion dropped, redrawn as soft SVG, and the
 * hand-drawn arrows beside the notes.
 */

const asset = (name: string) => `/hero-variants/a/${name}`;

export function Scene({ pulse }: { pulse: number }) {
  return (
    <div className={styles.scene}>
      {/* A transparent WebP with an exact frame: next/image adds nothing here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset('astronaut-scene.webp')}
        width={1398}
        height={1076}
        alt="An astronaut flips a large switch from rent to own."
        fetchPriority="high"
        decoding="async"
      />
      <span className={styles.rentLabel} aria-hidden="true">
        RENT
      </span>
      <span
        key={pulse}
        className={`${styles.ownLabel} ${pulse ? styles.flash : ''}`}
        aria-hidden="true"
      >
        OWN
      </span>
    </div>
  );
}

export function Terrain() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.terrain}
      src={asset('left-terrain.webp')}
      width={1040}
      height={382}
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}

export function Hills() {
  return (
    <svg
      className={styles.hills}
      viewBox="0 0 1100 360"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-a-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbfbff" stopOpacity="0" />
          <stop offset="0.82" stopColor="#fbfbff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fdfdff" />
        </linearGradient>
      </defs>
      <path
        d="M0 210c60-50 120-62 170-40 40-46 104-58 150-24 36-30 90-34 124 0 58-70 150-80 214-30 50-40 120-46 170-8 70-52 170-56 272-6V360H0Z"
        fill="#e4e4f6"
      />
      <path
        d="M0 262c90-36 170-40 250-14 70-46 160-52 236-12 80-40 170-44 250-6 90-50 210-58 364-6V360H0Z"
        fill="#d9d9f0"
        opacity="0.85"
      />
      <path
        d="M120 312c120-30 230-32 330-10 120-34 260-36 380-6 90-20 180-22 270-4V360H120Z"
        fill="#d9d9ef"
        opacity="0.55"
      />
      <rect width="1100" height="360" fill="url(#hero-a-mist)" />
    </svg>
  );
}

/** The short arrow of the design's buttons and rows. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 12" aria-hidden="true">
      <path d="M1 6h13.5M9.5 1.2 14.5 6l-5 4.8" />
    </svg>
  );
}

export function Cloud() {
  return <div className={styles.cloud} aria-hidden="true" />;
}

export function ChoiceArrow() {
  return (
    <svg className={styles.choiceArrow} viewBox="0 0 55 42" aria-hidden="true">
      <path d="M50 3C29 3 13 18 10 34m-2-9 2 9 9-6" />
    </svg>
  );
}

export function SwitchArrow() {
  return (
    <svg viewBox="0 0 140 49" aria-hidden="true">
      <path d="M4 38Q67-5 124 40m-4-16 4 16-18 1" />
    </svg>
  );
}

export function ClosingArrow() {
  return (
    <svg viewBox="0 0 40 50" aria-hidden="true">
      <path d="M35 44Q13 34 13 9m-5 8 5-8 7 8" />
    </svg>
  );
}

export function CodeIcon() {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <path d="m9 9-7 6 7 6m12-12 7 6-7 6M18 5l-6 20" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <path d="M7 13h16v13H7zM10 13V8a5 5 0 0 1 10 0v5m-5 7v3" />
      <circle cx="15" cy="18" r="1" />
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <path d="M15 26 4 15C-3 5 10 0 15 10 20 0 33 5 26 15Z" />
    </svg>
  );
}
