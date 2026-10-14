import type { Metadata } from 'next';

import { ContactPage } from '@/components/contact/ContactPage';
import { contactMeta } from '@/content/contact';
import { siteMeta } from '@/content/meta';

export const metadata: Metadata = {
  title: { absolute: `${contactMeta.title} · ${siteMeta.name}` },
  description: contactMeta.description,
  alternates: { canonical: '/contact' },
  // A page's openGraph and twitter replace the layout's, so they restate it.
  openGraph: {
    title: contactMeta.ogTitle,
    description: contactMeta.description,
    url: '/contact',
    siteName: siteMeta.name,
    images: [siteMeta.ogImage],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: contactMeta.ogTitle,
    description: contactMeta.description,
    images: [siteMeta.ogImage.url],
  },
};

export default function Contact() {
  return <ContactPage />;
}
