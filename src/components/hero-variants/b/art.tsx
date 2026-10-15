/** The design's small pixel and line drawings, all decorative. */

/** The dashed pixel arrow between the two lists. */
export const PixelArrow = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 26 14"
    aria-hidden="true"
    shapeRendering="crispEdges"
  >
    <path
      fill="currentColor"
      d="M0 6h4v2H0zM6 6h4v2H6zM12 6h4v2h-4zM17 0h2v2h2v2h2v2h2v2h-2v2h-2v2h-2v2h-2v-2h2v-2h2V8h-6V6h6V4h-2V2h-2z"
    />
  </svg>
);

/** The pixel burst over the card's corner. */
export const PixelBurst = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 16 18"
    aria-hidden="true"
    shapeRendering="crispEdges"
  >
    <path
      fill="currentColor"
      d="M9 0h3v8H9zM0 8h3v3h3v3h3v3H6v-3H3v-3H0zM12 9h3v3h-3z"
    />
  </svg>
);

/** Two four-point stars beside the line under the lists. */
export const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 6c.9 5.2 2.8 7.1 8 8-5.2.9-7.1 2.8-8 8-.9-5.2-2.8-7.1-8-8 5.2-.9 7.1-2.8 8-8zM24 1c.5 2.9 1.6 4 4.5 4.5C25.6 6 24.5 7.1 24 10c-.5-2.9-1.6-4-4.5-4.5C22.4 5 23.5 3.9 24 1zM24 20c.5 2.9 1.6 4 4.5 4.5-2.9.5-4 1.6-4.5 4.5-.5-2.9-1.6-4-4.5-4.5 2.9-.5 4-1.6 4.5-4.5z"
    />
  </svg>
);

/** The note arrows, drawn by hand. */
export const NoteArrowDown = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 54" aria-hidden="true">
    <path
      d="M59 8C36 8 14 24 12 39m-4-13 3 14 14-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const NoteArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 40" aria-hidden="true">
    <path
      d="M2 26c16 9 37 3 52-14m-13-3 14 1-5 13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** The benefit icons: a gift, code brackets and a document. */
export const GiftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 38 40" aria-hidden="true">
    <path d="M5 15h28v22H5zM2 15h34M19 13v24M4 11h30v5M19 11c-16 0-13-12-4-6l4 6c1-11 13-10 8-3z" />
  </svg>
);

export const CodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
    <path d="m12 10-11 10 11 10M28 10l11 10-11 10M24 6l-9 29" />
  </svg>
);

export const LicenceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 38 40" aria-hidden="true">
    <path d="M7 3h17l9 9v25H7zM24 3v10h9M13 20h14M13 26h14" />
  </svg>
);
