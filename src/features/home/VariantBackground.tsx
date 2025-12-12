'use client';

import dynamic from 'next/dynamic';

import { MinimalBackdrop } from '@/components/backgrounds/MinimalBackdrop';
import { AIImageBackdrop } from '@/components/backgrounds/AIImageBackdrop';
import { WarpFieldCanvas } from '@/components/WarpFieldCanvas';
import { WarpGatesOverlay } from '@/components/backgrounds/WarpGatesOverlay';

import type { BackgroundPreset } from '@/lib/backgrounds';

const StarfieldCanvas = dynamic(
  () =>
    import('@/components/backgrounds/StarfieldCanvas').then(
      m => m.StarfieldCanvas
    ),
  { ssr: false }
);

const AsciiTunnelCanvas = dynamic(
  () =>
    import('@/components/backgrounds/AsciiTunnelCanvas').then(
      m => m.AsciiTunnelCanvas
    ),
  { ssr: false }
);

const VectorLanesCanvas = dynamic(
  () =>
    import('@/components/backgrounds/VectorLanesCanvas').then(
      m => m.VectorLanesCanvas
    ),
  { ssr: false }
);

const NebulaCanvas = dynamic(
  () =>
    import('@/components/backgrounds/NebulaCanvas').then(m => m.NebulaCanvas),
  { ssr: false }
);

const WireframeCorridorCanvas = dynamic(
  () =>
    import('@/components/backgrounds/WireframeCorridorCanvas').then(
      m => m.WireframeCorridorCanvas
    ),
  { ssr: false }
);

const RaymarchCanvas = dynamic(
  () =>
    import('@/components/backgrounds/RaymarchCanvas').then(
      m => m.RaymarchCanvas
    ),
  { ssr: false }
);

export function VariantBackground({ preset }: { preset: BackgroundPreset }) {
  switch (preset.kind) {
    case 'minimal':
      return <MinimalBackdrop config={preset.config} />;
    case 'starfield':
      return <StarfieldCanvas config={preset.config} />;
    case 'asciiTunnel':
      return <AsciiTunnelCanvas config={preset.config} />;
    case 'vectorLanes':
      return <VectorLanesCanvas config={preset.config} />;
    case 'nebula':
      return <NebulaCanvas config={preset.config} />;
    case 'wireframe':
      return <WireframeCorridorCanvas config={preset.config} />;
    case 'raymarch':
      return <RaymarchCanvas config={preset.config} />;
    case 'aiImage':
      return <AIImageBackdrop config={preset.config} />;
    case 'warp':
      return <WarpFieldCanvas config={preset.config} />;
    case 'warpGates':
      return (
        <>
          <WarpFieldCanvas config={preset.config.warp} />
          <WarpGatesOverlay
            rateHz={preset.config.gates.rateHz}
            thickness={preset.config.gates.thickness}
            glow={preset.config.gates.glow}
          />
        </>
      );
    default:
      return null;
  }
}
