import type { CSSProperties } from 'react';

import { objectArt } from './objects';

interface ObjectImageProps {
  slug: string;
  className?: string;
  /** Load it straight away (it is in the first viewport). */
  eager?: boolean;
}

/**
 * One product object as a transparent cut-out. It exposes its canvas size as
 * --ow and --oh (canvas pixels) so each layout can scale every object by the
 * same factor and keep their sizes true to the shelf.
 */
export function ObjectImage({ slug, className, eager }: ObjectImageProps) {
  const art = objectArt[slug];
  if (!art) return null;
  const style = {
    '--ow': art.width / 2,
    '--oh': art.height / 2,
  } as CSSProperties;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={art.src}
      alt={art.alt}
      width={art.width}
      height={art.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
