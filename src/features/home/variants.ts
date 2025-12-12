import 'server-only';

import type { WarpFieldConfig } from '@/lib/warp';

export type HeroStylePreset = {
  sectionClassName: string;
  scrimClassName: string;
  containerClassName: string;
  h1ClassName: string;
  h1AccentClassName: string;
  pClassName: string;
  ctaRowClassName: string;
  primaryCtaClassName: string;
  secondaryLinkClassName: string;
  commandClassName: string;
  accents?: Array<{ className: string }>; // aria-hidden decorative layers
  panelClassName?: string; // optional local panel behind text
};

export type HomeVariant = {
  id: string;
  name: string;
  metadata: {
    title: string;
    description: string;
    robotsIndex: boolean;
  };
  warp: Partial<WarpFieldConfig>;
  hero: HeroStylePreset;
};

const baseHero: Omit<HeroStylePreset, 'accents'> = {
  sectionClassName:
    'relative flex min-h-screen items-center justify-center px-6 pt-24 sm:px-10',
  scrimClassName: 'pointer-events-none absolute inset-0 bg-black/60',
  containerClassName:
    'relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center',
  h1ClassName:
    'font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl',
  h1AccentClassName:
    'from-brand-cyan via-brand-violet to-brand-pink mt-3 block bg-gradient-to-r bg-clip-text text-transparent',
  pClassName: 'mt-6 max-w-2xl text-lg text-pretty text-white/75 sm:text-xl',
  ctaRowClassName: 'mt-8 flex flex-col items-center gap-4 sm:flex-row',
  primaryCtaClassName:
    'group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all hover:scale-[1.03] hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
  secondaryLinkClassName:
    'inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
  commandClassName:
    'mt-5 w-full max-w-md rounded-lg border border-white/10 bg-black/30 px-4 py-2 font-mono text-xs text-white/80 sm:text-sm',
  panelClassName: undefined,
};

const subtleAccents: Array<{ className: string }> = [
  {
    className:
      'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,224,255,0.12),transparent_55%)]',
  },
];

export const ROOT_VARIANT: HomeVariant = {
  id: 'root',
  name: 'Calm Minimal',
  metadata: {
    title: 'JustEvery',
    description:
      'Push frontier AI further. Ship faster. Professional tools that turn powerful models into reliable workflows.',
    robotsIndex: true,
  },
  warp: {
    densityMultiplier: 0.55,
    baseSpeed: 0.26,
    trailFade: 0.3,
    trailFadeSpool: 0.18,
    highlightChance: 0.03,
    streakMode: 'highlights',
    streakLength: 12,
    glowBase: 6,
    glowSpoolBoost: 12,
  },
  hero: {
    ...baseHero,
    scrimClassName: 'pointer-events-none absolute inset-0 bg-black/78',
  },
};

export const HOME_VARIANTS: Record<string, HomeVariant> = {
  '1': {
    id: '1',
    name: 'Clean Warp',
    metadata: {
      title: 'JustEvery /1 — Clean Warp',
      description: 'A calm, clean warp field. Minimal. Precise. Future-ready.',
      robotsIndex: false,
    },
    warp: {
      densityMultiplier: 0.7,
      baseSpeed: 0.34,
      trailFade: 0.26,
      trailFadeSpool: 0.14,
      highlightChance: 0.04,
      streakMode: 'highlights',
      streakLength: 16,
      centerMaskStrength: 0.3,
      centerMaskRadius: 0.22,
      centerMaskSoftness: 0.2,
    },
    hero: {
      ...baseHero,
      scrimClassName: 'pointer-events-none absolute inset-0 bg-black/70',
      h1AccentClassName: 'mt-3 block text-white',
      accents: [],
    },
  },
  '2': {
    id: '2',
    name: 'Neon Lanes',
    metadata: {
      title: 'JustEvery /2 — Neon Lanes',
      description: 'Structured neon lanes. Smooth acceleration.',
      robotsIndex: false,
    },
    warp: {
      densityMultiplier: 0.95,
      baseSpeed: 0.55,
      trailFade: 0.18,
      trailFadeSpool: 0.08,
      tunnelScale: 0.4,
      paletteStops: ['#00e0ff', '#00ffd1', '#7c5cff', '#ff4ecd'],
      highlightChance: 0.065,
      chromaOffset: 0.6,
      centerMaskStrength: 0.3,
    },
    hero: {
      ...baseHero,
      accents: subtleAccents,
    },
  },
  '3': {
    id: '3',
    name: 'Hyperdrive Streaks',
    metadata: {
      title: 'JustEvery /3 — Hyperdrive Streaks',
      description: 'Faster baseline with crisp streaking.',
      robotsIndex: false,
    },
    warp: {
      densityMultiplier: 1.05,
      baseSpeed: 0.8,
      spoolBoost: 4.2,
      trailFade: 0.14,
      trailFadeSpool: 0.06,
      streakMode: 'highlights',
      streakLength: 46,
      glowBase: 12,
      glowSpoolBoost: 28,
      centerMaskStrength: 0.35,
    },
    hero: {
      ...baseHero,
      containerClassName:
        'relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center',
      scrimClassName: 'pointer-events-none absolute inset-0 bg-black/58',
      accents: [
        ...subtleAccents,
        {
          className:
            'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(124,92,255,0.16),transparent_55%)]',
        },
      ],
    },
  },
  '4': {
    id: '4',
    name: 'Prismatic Shift',
    metadata: {
      title: 'JustEvery /4 — Prismatic Shift',
      description: 'Prismatic color split and bloom.',
      robotsIndex: false,
    },
    warp: {
      densityMultiplier: 1.12,
      baseSpeed: 1.0,
      spoolBoost: 4.8,
      trailFade: 0.12,
      trailFadeSpool: 0.05,
      chromaOffset: 1.2,
      glowBase: 14,
      glowSpoolBoost: 34,
      streakLength: 64,
      centerMaskStrength: 0.4,
    },
    hero: {
      ...baseHero,
      scrimClassName: 'pointer-events-none absolute inset-0 bg-black/54',
      accents: [
        {
          className:
            'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,78,205,0.18),transparent_55%)]',
        },
        {
          className:
            'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_65%,rgba(0,224,255,0.16),transparent_55%)]',
        },
      ],
    },
  },
  '5': {
    id: '5',
    name: 'Corkscrew Drive',
    metadata: {
      title: 'JustEvery /5 — Corkscrew Drive',
      description: 'Helical motion. Strong forward pull. Controlled chaos.',
      robotsIndex: false,
    },
    warp: {
      densityMultiplier: 1.25,
      baseSpeed: 1.35,
      spoolBoost: 5.8,
      trailFade: 0.095,
      trailFadeSpool: 0.042,
      tunnelScale: 0.42,
      tunnelScaleSpoolBoost: 0.24,
      swirlStrength: 1.3,
      lensStrength: 0.22,
      chromaOffset: 1.6,
      streakMode: 'highlights',
      streakLength: 86,
      glowBase: 16,
      glowSpoolBoost: 38,
      centerMaskStrength: 0.62,
      centerMaskRadius: 0.26,
    },
    hero: {
      ...baseHero,
      scrimClassName: 'pointer-events-none absolute inset-0 bg-black/50',
      panelClassName:
        'rounded-2xl border border-white/10 bg-black/35 px-7 py-8 backdrop-blur-sm shadow-[0_0_60px_rgba(124,92,255,0.15)]',
      accents: [
        {
          className:
            'pointer-events-none absolute -inset-24 opacity-80 blur-3xl bg-[radial-gradient(circle_at_50%_40%,rgba(0,224,255,0.16),transparent_60%)]',
        },
        {
          className:
            'pointer-events-none absolute -inset-24 opacity-70 blur-3xl bg-[radial-gradient(circle_at_60%_70%,rgba(255,78,205,0.12),transparent_60%)]',
        },
      ],
    },
  },
  '6': {
    id: '6',
    name: 'Pulse Gates',
    metadata: {
      title: 'JustEvery /6 — Pulse Gates',
      description: 'Rhythmic acceleration gates and dense streaking.',
      robotsIndex: false,
    },
    warp: {
      densityMultiplier: 1.35,
      baseSpeed: 1.5,
      spoolBoost: 6.5,
      trailFade: 0.09,
      trailFadeSpool: 0.04,
      pulseRateHz: 0.85,
      pulseDepth: 0.45,
      chromaOffset: 1.8,
      streakLength: 92,
      centerMaskStrength: 0.6,
    },
    hero: {
      ...baseHero,
      pClassName:
        'mt-6 max-w-2xl text-base text-pretty text-white/75 sm:text-lg',
      commandClassName:
        'mt-5 w-full max-w-md rounded-lg border border-white/10 bg-black/45 px-4 py-2 font-mono text-xs text-white/85 sm:text-sm',
      accents: [
        {
          className:
            'pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]',
        },
      ],
    },
  },
  '7': {
    id: '7',
    name: 'Singularity Lens',
    metadata: {
      title: 'JustEvery /7 — Singularity Lens',
      description: 'Gravitational lensing. Controlled center-safe warp.',
      robotsIndex: false,
    },
    warp: {
      densityMultiplier: 1.45,
      baseSpeed: 1.8,
      spoolBoost: 7.6,
      trailFade: 0.08,
      trailFadeSpool: 0.035,
      lensStrength: 0.45,
      chromaOffset: 2.0,
      streakLength: 104,
      centerMaskStrength: 0.72,
      centerMaskRadius: 0.3,
      centerMaskSoftness: 0.2,
    },
    hero: {
      ...baseHero,
      scrimClassName: 'pointer-events-none absolute inset-0 bg-black/46',
      panelClassName:
        'rounded-2xl border border-white/10 bg-black/40 px-7 py-8 backdrop-blur-md shadow-[0_0_80px_rgba(0,224,255,0.14)]',
      accents: [
        {
          className:
            'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_52%)]',
        },
      ],
    },
  },
  '8': {
    id: '8',
    name: 'Quantum Shards',
    metadata: {
      title: 'JustEvery /8 — Quantum Shards',
      description: 'Crystalline shards and glitch bursts.',
      robotsIndex: false,
    },
    warp: {
      densityMultiplier: 1.6,
      baseSpeed: 2.1,
      spoolBoost: 8.4,
      trailFade: 0.075,
      trailFadeSpool: 0.03,
      chromaOffset: 2.2,
      lensStrength: 0.6,
      streakMode: 'all',
      streakLength: 112,
      shake: 2.4,
      centerMaskStrength: 0.75,
    },
    hero: {
      ...baseHero,
      scrimClassName: 'pointer-events-none absolute inset-0 bg-black/48',
      panelClassName:
        'rounded-2xl border border-white/10 bg-black/40 px-7 py-8 backdrop-blur-md shadow-[0_0_80px_rgba(255,78,205,0.12)]',
      accents: [
        {
          className:
            'pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_80%,rgba(255,138,0,0.22),transparent_55%)]',
        },
        {
          className:
            'pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_80%_30%,rgba(0,224,255,0.22),transparent_55%)]',
        },
      ],
    },
  },
  '9': {
    id: '9',
    name: 'Overclock Plasma',
    metadata: {
      title: 'JustEvery /9 — Overclock Plasma',
      description: 'Dense plasma streaks with heavy optics.',
      robotsIndex: false,
    },
    warp: {
      densityMultiplier: 1.85,
      baseSpeed: 2.6,
      spoolBoost: 9.6,
      trailFade: 0.065,
      trailFadeSpool: 0.026,
      chromaOffset: 2.6,
      lensStrength: 0.8,
      streakMode: 'all',
      streakLength: 132,
      swirlStrength: 1.6,
      shake: 3.0,
      centerMaskStrength: 0.8,
    },
    hero: {
      ...baseHero,
      h1ClassName:
        'font-display text-5xl font-semibold tracking-[-0.04em] text-balance sm:text-7xl md:text-8xl',
      scrimClassName: 'pointer-events-none absolute inset-0 bg-black/40',
      panelClassName:
        'rounded-3xl border border-white/10 bg-black/45 px-7 py-8 backdrop-blur-lg shadow-[0_0_90px_rgba(255,78,205,0.16)]',
      accents: [
        {
          className:
            'pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(0,224,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,78,205,0.08)_1px,transparent_1px)] [background-size:72px_72px]',
        },
      ],
    },
  },
  '10': {
    id: '10',
    name: 'Event Horizon',
    metadata: {
      title: 'JustEvery /10 — Event Horizon',
      description:
        'Maximum future-warp: roll, lensing, streaks — still readable at the center.',
      robotsIndex: false,
    },
    warp: {
      densityMultiplier: 1.25,
      baseSpeed: 3.4,
      spoolBoost: 11.0,
      spoolDurationMs: 1100,
      trailFade: 0.06,
      trailFadeSpool: 0.025,
      tunnelScale: 0.44,
      tunnelScaleSpoolBoost: 0.3,
      sizeSpoolBoost: 0.6,
      chromaOffset: 3.1,
      lensStrength: 1.05,
      swirlStrength: 2.2,
      pulseRateHz: 1.1,
      pulseDepth: 0.55,
      cameraRoll: 0.12,
      cameraRollRate: 1.25,
      shake: 1.6,
      streakMode: 'all',
      streakLength: 150,
      glowBase: 18,
      glowSpoolBoost: 46,
      highlightChance: 0.13,
      centerMaskStrength: 0.86,
      centerMaskRadius: 0.34,
      centerMaskSoftness: 0.22,
    },
    hero: {
      ...baseHero,
      scrimClassName: 'pointer-events-none absolute inset-0 bg-black/36',
      containerClassName:
        'relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center',
      h1ClassName:
        'font-display text-5xl font-semibold tracking-[-0.05em] text-balance sm:text-7xl md:text-8xl',
      h1AccentClassName:
        'from-brand-cyan via-brand-violet to-brand-pink mt-3 block bg-gradient-to-r bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(0,224,255,0.22)]',
      panelClassName:
        'rounded-[2rem] border border-white/10 bg-black/42 px-7 py-8 backdrop-blur-xl shadow-[0_0_120px_rgba(0,224,255,0.12)]',
      accents: [
        {
          className:
            'pointer-events-none absolute -inset-40 opacity-70 blur-3xl bg-[radial-gradient(circle_at_35%_45%,rgba(0,224,255,0.18),transparent_62%)]',
        },
        {
          className:
            'pointer-events-none absolute -inset-40 opacity-70 blur-3xl bg-[radial-gradient(circle_at_70%_60%,rgba(124,92,255,0.16),transparent_62%)]',
        },
        {
          className:
            'pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]',
        },
      ],
    },
  },
};

export function getHomeVariant(id: string): HomeVariant | null {
  return HOME_VARIANTS[id] ?? null;
}

export function getVariantIds(): string[] {
  return Object.keys(HOME_VARIANTS);
}
