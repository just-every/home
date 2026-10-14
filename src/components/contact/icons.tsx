/** Line and mark icons for the route cards, drawn at 24px and sized in CSS. */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export const GithubIcon = () => (
  <Icon>
    <path
      fill="currentColor"
      d="M12 .6a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .6Z"
    />
  </Icon>
);

export const SproutIcon = () => (
  <Icon>
    <g {...stroke}>
      <path d="M12 21v-9" />
      <path d="M12 12.5C12 8.5 9 6 4.5 6c0 4 2.6 6.5 7.5 6.5Z" />
      <path d="M12 14c0-3.4 2.5-6 7.5-6 0 3.6-2.7 6-7.5 6Z" />
    </g>
  </Icon>
);

export const MailIcon = () => (
  <Icon>
    <g {...stroke}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.8 7.3 8.2 6.2 8.2-6.2" />
    </g>
  </Icon>
);

export const HeartIcon = () => (
  <Icon>
    <path
      fill="currentColor"
      d="M12 20.6c-.3 0-.6-.1-.8-.3C6.4 16.4 3 13.4 3 9.6 3 7 5 5 7.5 5c1.9 0 3.5 1 4.5 2.6C13 6 14.6 5 16.5 5 19 5 21 7 21 9.6c0 3.8-3.4 6.8-8.2 10.7-.2.2-.5.3-.8.3Z"
    />
  </Icon>
);
