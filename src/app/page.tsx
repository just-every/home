import { ArrowRight } from 'lucide-react';

import { HeroMedia } from '@/components/HeroMedia';

const everyCodeHref = 'https://github.com/just-every/code';

export default function Home() {
  return (
    <div className="relative h-[100svh] overflow-hidden px-6">
      <HeroMedia />

      <div className="absolute top-1/2 left-1/2 z-10 -mt-[3.375rem] w-full max-w-4xl -translate-x-1/2 -translate-y-full text-center">
        <h1 className="hero-title font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
          <span className="hero-warp">Push frontier AI further, faster.</span>
        </h1>
      </div>

      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <a
          href={everyCodeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group focus-visible:ring-brand-cyan/70 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold whitespace-nowrap text-black transition-all hover:scale-[1.03] hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
        >
          Every Code
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="absolute top-1/2 left-1/2 z-10 mt-[3.375rem] w-full max-w-md -translate-x-1/2">
        <div className="hero-command rounded-lg border border-white/15 px-4 py-2 text-center font-mono text-xs text-white sm:text-sm">
          <code>npx -y @just-every/code</code>
        </div>
      </div>
    </div>
  );
}
