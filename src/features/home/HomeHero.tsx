import { ArrowRight, Github } from 'lucide-react';

import { PrimaryCTA } from '@/components/PrimaryCTA';
import type { HomeVariant } from '@/features/home/variants';

const everyCodeHref = 'https://github.com/just-every/code';

type HomeHeroProps = {
  variant: HomeVariant;
};

export function HomeHero({ variant }: HomeHeroProps) {
  const hero = variant.hero;

  return (
    <section className={hero.sectionClassName}>
      {hero.accents?.map((accent, idx) => (
        <div key={idx} aria-hidden className={accent.className} />
      ))}
      <div aria-hidden className={hero.scrimClassName} />

      <div className={hero.containerClassName}>
        <div className={hero.panelClassName ?? ''}>
          <h1 className={hero.h1ClassName}>
            Push frontier AI further.
            <span className={hero.h1AccentClassName}>Ship faster.</span>
          </h1>

          <p className={hero.pClassName}>
            Professional tools that turn powerful models into reliable
            workflows.
          </p>

          <div className={hero.ctaRowClassName}>
            <PrimaryCTA
              href={everyCodeHref}
              className={hero.primaryCtaClassName}
            >
              Install Every Code
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </PrimaryCTA>

            <a
              href={everyCodeHref}
              target="_blank"
              rel="noopener noreferrer"
              className={hero.secondaryLinkClassName}
            >
              View on GitHub
              <Github className="h-4 w-4" />
            </a>
          </div>

          <div className={hero.commandClassName}>
            <code>npx -y @just-every/code</code>
          </div>
        </div>
      </div>
    </section>
  );
}
