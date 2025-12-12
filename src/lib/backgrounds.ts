import type { WarpFieldConfig } from '@/lib/warp';

export type BackgroundKind =
  | 'minimal'
  | 'starfield'
  | 'asciiTunnel'
  | 'vectorLanes'
  | 'warp'
  | 'warpGates'
  | 'wireframe'
  | 'nebula'
  | 'aiImage'
  | 'raymarch';

export type MinimalBackdropConfig = {
  vignette: number; // 0..1
  accentHue: number; // 0..360
  accentStrength: number; // 0..1
};

export type StarfieldConfig = {
  starCount: number;
  speed: number;
  depth: number;
  twinkle: number;
  colorMode: 'mono' | 'cool' | 'prismatic';
};

export type AsciiTunnelConfig = {
  glyphs: string;
  density: number;
  speed: number;
  swirl: number;
  chroma: number;
};

export type VectorLanesConfig = {
  lanes: number;
  speed: number;
  glow: number;
  colorMode: 'cyan' | 'violet' | 'prismatic';
};

export type WarpGatesConfig = {
  warp: Partial<WarpFieldConfig>;
  gates: {
    rateHz: number;
    thickness: number;
    glow: number;
  };
};

export type WireframeConfig = {
  gridSize: number;
  speed: number;
  roll: number;
  color: string;
};

export type NebulaConfig = {
  intensity: number;
  speed: number;
  scale: number;
  colorMode: 'blue' | 'violet' | 'sunset';
};

export type AIImageConfig = {
  variantId: string;
  opacity: number;
  blur: number;
};

export type RaymarchConfig = {
  intensity: number;
  speed: number;
  palette: 'cyan' | 'prismatic' | 'infra';
};

export type BackgroundPreset =
  | { kind: 'minimal'; config: MinimalBackdropConfig }
  | { kind: 'starfield'; config: StarfieldConfig }
  | { kind: 'asciiTunnel'; config: AsciiTunnelConfig }
  | { kind: 'vectorLanes'; config: VectorLanesConfig }
  | { kind: 'warp'; config: Partial<WarpFieldConfig> }
  | { kind: 'warpGates'; config: WarpGatesConfig }
  | { kind: 'wireframe'; config: WireframeConfig }
  | { kind: 'nebula'; config: NebulaConfig }
  | { kind: 'aiImage'; config: AIImageConfig }
  | { kind: 'raymarch'; config: RaymarchConfig };
