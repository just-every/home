import type { ShelfVolume } from './volumes';

interface BrandMarkProps {
  volume: Pick<ShelfVolume, 'mark'>;
  className?: string;
  /** Rendered size in CSS pixels, for the intrinsic width and height. */
  size: number;
}

/**
 * A product's real mark, as printed on its volume. It always sits beside the
 * product's name, so it is decorative to assistive tech.
 */
export function BrandMark({ volume, className, size }: BrandMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={volume.mark}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={className}
      decoding="async"
      draggable={false}
    />
  );
}
