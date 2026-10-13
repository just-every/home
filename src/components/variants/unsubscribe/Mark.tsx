import type { Seed } from '@/data/seed-types';

type MarkProps = {
  seed: Pick<Seed, 'name' | 'mark' | 'markLight' | 'markInk'>;
  className?: string;
  size: number;
};

/**
 * A product's real mark, in the variant that stays fixed on light surfaces.
 * It always sits beside the product's name, so assistive tech skips it.
 */
export function Mark({ seed, className, size }: MarkProps) {
  const src = seed.markLight ?? seed.markInk ?? seed.mark;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${seed.name} mark`}
      aria-hidden="true"
      width={size}
      height={size}
      className={className}
      decoding="async"
    />
  );
}
