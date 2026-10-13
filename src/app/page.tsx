import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'justevery.com, five directions' },
  robots: { index: false, follow: false },
};

const directions = [
  {
    slug: 'label',
    name: 'Label',
    summary: 'The collection as numbered volumes.',
  },
  {
    slug: 'objects',
    name: 'Objects',
    summary: 'Products as objects on a shelf.',
  },
  {
    slug: 'unsubscribe',
    name: 'Unsubscribe',
    summary: 'Renewal emails vs owned products.',
  },
  {
    slug: 'running',
    name: 'Running',
    summary: 'A wall of the real apps.',
  },
  {
    slug: 'manifesto',
    name: 'Manifesto',
    summary: '“Code got cheap. We made it good.”',
  },
] as const;

export default function ReviewIndex() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        justevery.com, five directions
      </h1>
      <p className="mt-3 max-w-2xl text-black/70">
        Five complete pages for the same collection. Open each, scroll it end to
        end, and pick one.
      </p>

      <ul className="mt-12 grid gap-10 sm:grid-cols-2">
        {directions.map(({ slug, name, summary }) => (
          <li key={slug}>
            <Link
              href={`/v/${slug}`}
              className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/review/${slug}.webp`}
                alt={`The ${name} hero design`}
                width={1536}
                height={1024}
                loading="lazy"
                className="w-full rounded-lg border border-black/10"
              />
              <h2 className="mt-4 text-xl font-semibold group-hover:underline group-hover:underline-offset-4">
                {name}
              </h2>
              <p className="mt-1 text-black/70">{summary}</p>
              <p className="mt-1 font-mono text-sm text-black/50">/v/{slug}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
