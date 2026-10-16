import type { PromiseArt } from './art';

/** A promise's painted icon. Decoration: the promise's text is the content. */
export function PromiseIcon({
  art,
  className,
}: {
  art: PromiseArt;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fillRule="evenodd"
      aria-hidden="true"
      focusable="false"
    >
      {art.layers.map(([fill, d], i) => (
        <path key={i} fill={fill} d={d} />
      ))}
    </svg>
  );
}
