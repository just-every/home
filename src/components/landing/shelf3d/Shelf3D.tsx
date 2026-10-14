'use client';

import { useEffect, useRef } from 'react';

import { ShelfEngine } from './engine';
import styles from './shelf.module.css';
import type { ShelfTone } from './tones';
import type { ShelfVolume } from './types';

export interface Shelf3DProps {
  volumes: ShelfVolume[];
  /** Slug of the volume shown face-out at the front. */
  featured: string;
  /** The room around the set: the page's light, or a dark stage. */
  tone?: ShelfTone;
  className?: string;
}

/**
 * The collection as a lit box set in three.js. Everything it draws comes from
 * the props: order, numbers, names, colours, marks and taglines. It sets
 * `data-ready` on its root once the first frame is on screen.
 */
export default function Shelf3D({
  volumes,
  featured,
  tone = 'light',
  className,
}: Shelf3DProps) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const spec = JSON.stringify({ volumes, featured, tone });

  useEffect(() => {
    const root = host.current;
    const surface = canvas.current;
    if (!root || !surface) return;
    const props = JSON.parse(spec) as {
      volumes: ShelfVolume[];
      featured: string;
      tone: ShelfTone;
    };
    let engine: ShelfEngine;
    try {
      engine = new ShelfEngine(
        root,
        surface,
        props.volumes,
        props.featured,
        props.tone
      );
    } catch {
      // No WebGL here: the static render stays in place.
      return;
    }
    engine.start().catch((error: unknown) => console.error(error));
    return () => {
      engine.dispose();
      delete root.dataset.ready;
    };
  }, [spec]);

  return (
    <div
      ref={host}
      className={className ? `${styles.stage} ${className}` : styles.stage}
    >
      <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
    </div>
  );
}
