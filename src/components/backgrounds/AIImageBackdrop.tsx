import type { AIImageConfig } from '@/lib/backgrounds';

export function AIImageBackdrop({ config }: { config: AIImageConfig }) {
  const opacity = Math.max(0, Math.min(1, config.opacity));
  const blur = Math.max(0, config.blur);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-black" />
      <img
        alt=""
        src={`/api/ai/backdrop/${encodeURIComponent(config.variantId)}`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity,
          filter: `blur(${blur}px) saturate(1.15) contrast(1.05)`,
          transform: 'scale(1.03)',
        }}
        decoding="async"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,224,255,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_65%,rgba(255,78,205,0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
