import styles from './contact.module.css';

/**
 * Three soft rounded cards, one with a friendly face: the page's greeting.
 * Decorative; the colours are the site's pastels.
 */
export function HelloArt() {
  return (
    <svg
      className={styles.helloArt}
      viewBox="0 0 360 230"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="hello-soft" x="-40%" y="-40%" width="180%" height="190%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <linearGradient id="hello-lav" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d6d1fa" />
          <stop offset="1" stopColor="#c0b9f3" />
        </linearGradient>
        <linearGradient id="hello-mint" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bdeed9" />
          <stop offset="1" stopColor="#d9f6ea" />
        </linearGradient>
        <linearGradient id="hello-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f0effa" />
        </linearGradient>
      </defs>
      <g transform="rotate(24 236 92)">
        <rect
          x="168"
          y="40"
          width="136"
          height="136"
          rx="26"
          fill="#8d86cf"
          opacity=".3"
          filter="url(#hello-soft)"
        />
        <rect
          x="168"
          y="22"
          width="136"
          height="136"
          rx="26"
          fill="url(#hello-lav)"
        />
      </g>
      <rect
        x="268"
        y="106"
        width="68"
        height="92"
        rx="24"
        fill="url(#hello-mint)"
        transform="rotate(28 302 152)"
      />
      <g transform="rotate(16 123 142)">
        <rect
          x="36"
          y="80"
          width="174"
          height="152"
          rx="28"
          fill="#8a84b8"
          opacity=".3"
          filter="url(#hello-soft)"
        />
        <rect
          x="36"
          y="66"
          width="174"
          height="152"
          rx="28"
          fill="url(#hello-card)"
        />
      </g>
      <path
        d="M87 140l9-13 10 11M127 152l9-13 10 11"
        fill="none"
        stroke="#2b2858"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
