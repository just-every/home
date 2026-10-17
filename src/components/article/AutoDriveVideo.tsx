'use client';

import { useEffect, useRef, useState } from 'react';

import { autoDrive } from './autoDrive';
import styles from './video.module.css';

/** The player's address for this page: YouTube asks embeds to name their origin. */
function embedSrc(): string {
  const url = new URL(autoDrive.embedUrl);
  url.searchParams.set('origin', window.location.origin);
  return url.toString();
}

/**
 * The Auto Drive video, behind a facade: Every Code's own poster for it
 * (docs/images/video-auto-drive-new-play.jpg, with its play button) until a
 * click, then YouTube's privacy-enhanced player, playing where the browser
 * lets a click start it (Safari waits for a press on YouTube's own play
 * button). Nothing loads from YouTube before the click.
 */
export function AutoDriveVideo() {
  const [src, setSrc] = useState<string | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);

  // The button the reader pressed is gone; keep their place on the player.
  useEffect(() => {
    if (src) frame.current?.focus();
  }, [src]);

  const poster = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/articles/auto-drive-960.webp"
      srcSet="/articles/auto-drive-960.webp 960w, /articles/auto-drive-1600.webp 1600w"
      sizes="(max-width: 899px) 100vw, 860px"
      alt=""
      width={1600}
      height={900}
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <div className={styles.video}>
      {src ? (
        <>
          {/* The poster stays underneath until YouTube's player paints over it. */}
          <div className={styles.backdrop} aria-hidden="true">
            {poster}
          </div>
          <iframe
            ref={frame}
            src={src}
            title={autoDrive.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </>
      ) : (
        <button
          type="button"
          className={styles.facade}
          onClick={() => setSrc(embedSrc())}
          aria-label={`Play ${autoDrive.title} (${autoDrive.length})`}
        >
          {poster}
          <span className={styles.label} aria-hidden="true">
            <svg viewBox="0 0 12 12">
              <path d="M3 1.8v8.4L10.2 6z" />
            </svg>
            Play · {autoDrive.length}
          </span>
        </button>
      )}
    </div>
  );
}
