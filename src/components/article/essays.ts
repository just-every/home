import type { Metadata } from 'next';

import { siteMeta } from '@/content/meta';

/**
 * The site's essays, from the approved essay drafts of 14 Oct 2026
 * (JOURNEY-ESSAY.md and PROCESS-ESSAY.md). The nav label names the page; the
 * title and dek head it.
 */
export interface Essay {
  slug: 'journey' | 'process';
  label: string;
  title: string;
  dek: string;
  /** Meta and Open Graph description. */
  description: string;
  date: string;
  /** ISO date for <time> and the article metadata. */
  published: string;
  readingTime: string;
}

export const essays = {
  journey: {
    slug: 'journey',
    label: 'Journey',
    title: 'We could have built this in 2025.',
    dek: 'We didn’t, because it would have been slop. This is what we built first, and why quality is the whole point now.',
    description:
      'We could have built free SaaS alternatives in 2025. They would have been slop. Here’s what we built first, and why quality is the point now.',
    date: '14 October 2026',
    published: '2026-10-14',
    readingTime: '6 min read',
  },
  process: {
    slug: 'process',
    label: 'Process',
    title: 'Quality, written down',
    dek: 'Agents can now write the code, check it against plain-English promises, and keep a fork alive for months. Here is how we use that to keep fourteen products good.',
    description:
      'Agents can now write the code, check it against plain-English promises, and keep a fork alive for months. Here is how we use that to keep fourteen products good.',
    date: '14 October 2026',
    published: '2026-10-14',
    readingTime: '7 min read',
  },
} as const satisfies Record<Essay['slug'], Essay>;

/** The page metadata: "<Label> · Just Every", the dek, the site's share image. */
export function essayMetadata(essay: Essay): Metadata {
  const path = `/${essay.slug}`;
  return {
    title: { absolute: `${essay.label} · ${siteMeta.name}` },
    description: essay.description,
    alternates: { canonical: path },
    // A page's openGraph and twitter replace the layout's, so they restate it.
    openGraph: {
      title: essay.title,
      description: essay.description,
      url: path,
      siteName: siteMeta.name,
      images: [siteMeta.ogImage],
      locale: 'en_US',
      type: 'article',
      publishedTime: essay.published,
    },
    twitter: {
      card: 'summary_large_image',
      title: essay.title,
      description: essay.description,
      images: [siteMeta.ogImage.url],
    },
  };
}

/** schema.org BlogPosting for the essay. */
export function essayJsonLd(essay: Essay) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: essay.title,
    description: essay.description,
    datePublished: essay.published,
    url: `${siteMeta.url}/${essay.slug}`,
    image: `${siteMeta.url}${siteMeta.ogImage.url}`,
    author: { '@id': `${siteMeta.url}/#organization` },
    publisher: { '@id': `${siteMeta.url}/#organization` },
  };
}
