import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { siteMeta } from '@/content/meta';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteMeta.title,
    template: `%s · ${siteMeta.name}`,
  },
  description: siteMeta.description,
  metadataBase: new URL(siteMeta.url),
  icons: {
    icon: [
      { url: '/img/favicon.svg', type: 'image/svg+xml' },
      { url: '/img/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/img/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  openGraph: {
    title: siteMeta.ogTitle,
    description: siteMeta.description,
    url: siteMeta.url,
    siteName: siteMeta.name,
    images: [siteMeta.ogImage],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMeta.ogTitle,
    description: siteMeta.description,
    images: [siteMeta.ogImage.url],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteMeta.url}/#organization`,
      name: siteMeta.name,
      url: siteMeta.url,
      logo: `${siteMeta.url}/img/favicon-512x512.png`,
      sameAs: [siteMeta.githubUrl],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteMeta.url}/#website`,
      name: siteMeta.name,
      url: siteMeta.url,
      description: siteMeta.description,
      publisher: { '@id': `${siteMeta.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
