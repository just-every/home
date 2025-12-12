import type { MinimalBackdropConfig } from '@/lib/backgrounds';

export function MinimalBackdrop({ config }: { config: MinimalBackdropConfig }) {
  const hue = Math.round(config.accentHue);
  const accent = Math.max(0, Math.min(1, config.accentStrength));
  const vignette = Math.max(0, Math.min(1, config.vignette));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 35%, hsla(${hue}, 90%, 60%, ${
            0.22 * accent
          }), transparent 55%), radial-gradient(circle at 80% 70%, hsla(${
            (hue + 70) % 360
          }, 90%, 62%, ${0.14 * accent}), transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 85%)',
          opacity: vignette,
        }}
      />
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:6px_6px] opacity-[0.08] mix-blend-soft-light" />
    </div>
  );
}
