import type { Metadata } from 'next';

import { siteMeta } from '@/content/meta';

/**
 * The site's essays, from the second-pass drafts of 14 Oct 2026
 * (JOURNEY-ESSAY-v2.md and PROCESS-ESSAY-v2.md): the title and dek head the
 * page. Journey's description is its draft's; Process's draft gives none, so
 * its description is its dek.
 */
export interface Essay {
  slug: 'journey' | 'process';
  title: string;
  dek: string;
  /** The browser title, before " · Just Every". */
  pageTitle: string;
  /** Meta and Open Graph description. */
  description: string;
  /** Open Graph and Twitter title. */
  shareTitle: string;
  date: string;
  /** ISO date for <time> and the article metadata. */
  published: string;
  readingTime: string;
}

export const essays = {
  journey: {
    slug: 'journey',
    title: 'We could have built this in 2025.',
    dek: 'We didn’t, because it would have been slop. This is the long way round we took instead, and why it matters now that code is nearly free.',
    pageTitle: 'How we got here',
    description:
      'We could have built free SaaS alternatives in 2025. They would have been slop. This is the long way round we took instead.',
    shareTitle: 'We could have built this in 2025.',
    date: '14 October 2026',
    published: '2026-10-14',
    readingTime: '4 min read',
  },
  process: {
    slug: 'process',
    title: 'Quality, written down',
    dek: 'Code got cheap. What’s worth keeping now is a short list of sentences that says what a product is for, and a machine that won’t let anyone break one quietly.',
    pageTitle: 'Quality, written down',
    description:
      'Code got cheap. What’s worth keeping now is a short list of sentences that says what a product is for, and a machine that won’t let anyone break one quietly.',
    shareTitle: 'Quality, written down.',
    date: '14 October 2026',
    published: '2026-10-14',
    readingTime: '5 min read',
  },
} as const satisfies Record<Essay['slug'], Essay>;

/** The page metadata: "<page title> · Just Every", the decks' description and share title, the site's share image. */
export function essayMetadata(essay: Essay): Metadata {
  const path = `/${essay.slug}`;
  return {
    title: { absolute: `${essay.pageTitle} · ${siteMeta.name}` },
    description: essay.description,
    alternates: { canonical: path },
    // A page's openGraph and twitter replace the layout's, so they restate it.
    openGraph: {
      title: essay.shareTitle,
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
      title: essay.shareTitle,
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
