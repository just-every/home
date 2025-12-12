export type WarpStreakMode = 'none' | 'highlights' | 'all';

export type WarpFieldConfig = {
  densityMultiplier: number;
  paletteStops: readonly string[];
  glyphs: readonly string[];

  // Motion
  baseSpeed: number;
  spoolBoost: number;
  spoolDurationMs: number;

  // Rendering
  trailFade: number; // 0..1 alpha for black fill; lower = longer trails
  trailFadeSpool: number;
  tunnelScale: number;
  tunnelScaleSpoolBoost: number;
  sizeSpoolBoost: number;

  // Particles
  particleSpeedMin: number;
  particleSpeedMax: number;
  particleDriftMin: number;
  particleDriftMax: number;
  particleSizeMin: number;
  particleSizeMax: number;
  highlightChance: number;

  // Effects
  glowBase: number;
  glowSpoolBoost: number;
  streakMode: WarpStreakMode;
  streakLength: number;
  chromaOffset: number;
  mouseStrength: number;
  swirlStrength: number;
  pulseRateHz: number;
  pulseDepth: number;
  lensStrength: number;
  cameraRoll: number;
  cameraRollRate: number;
  shake: number;

  // Legibility
  centerMaskStrength: number; // 0..1
  centerMaskRadius: number; // 0..1 of min(viewport)
  centerMaskSoftness: number; // 0..1 of min(viewport)
};

export const DEFAULT_GLYPHS = ['▢', '▣', '▪', '▫', '·', '•'] as const;

export const DEFAULT_WARP_CONFIG: WarpFieldConfig = {
  densityMultiplier: 1,
  paletteStops: ['#00e0ff', '#7c5cff', '#ff4ecd', '#ff8a00'],
  glyphs: DEFAULT_GLYPHS,

  baseSpeed: 0.5,
  spoolBoost: 3.0,
  spoolDurationMs: 900,

  trailFade: 0.18,
  trailFadeSpool: 0.07,
  tunnelScale: 0.38,
  tunnelScaleSpoolBoost: 0.18,
  sizeSpoolBoost: 0.35,

  particleSpeedMin: 0.12,
  particleSpeedMax: 0.4,
  particleDriftMin: 0.02,
  particleDriftMax: 0.07,
  particleSizeMin: 0.8,
  particleSizeMax: 2.2,
  highlightChance: 0.06,

  glowBase: 10,
  glowSpoolBoost: 26,
  streakMode: 'highlights',
  streakLength: 28,
  chromaOffset: 0,
  mouseStrength: 0.002,
  swirlStrength: 0,
  pulseRateHz: 0,
  pulseDepth: 0,
  lensStrength: 0,
  cameraRoll: 0,
  cameraRollRate: 0.9,
  shake: 0,

  centerMaskStrength: 0,
  centerMaskRadius: 0.24,
  centerMaskSoftness: 0.18,
};

export function mergeWarpConfig(
  base: WarpFieldConfig,
  override?: Partial<WarpFieldConfig>
): WarpFieldConfig {
  return { ...base, ...(override ?? {}) };
}

export function clamp01(v: number) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}
