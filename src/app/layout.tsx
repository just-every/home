import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JustEvery_ Build any app. Just ask.',
  description:
    'JustEvery_ turns a single prompt into a live product—UI, back-end, hosting and all. Powered by Magi, backed by open-source brains.',
  manifest: '/manifest.json',
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
    title: 'JustEvery_ Build any app. Just ask.',
    description:
      'JustEvery_ turns a single prompt into a live product—UI, back-end, hosting and all. Powered by Magi, backed by open-source brains.',
    url: 'https://justevery.com',
    siteName: 'JustEvery_',
    images: [
      {
        url: 'https://justevery.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JustEvery_ - Build any app. Just ask.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JustEvery_ Build any app. Just ask.',
    description:
      'JustEvery_ turns a single prompt into a live product—UI, back-end, hosting and all.',
    images: ['https://justevery.com/twitter-image.jpg'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'JustEvery_',
    description:
      'JustEvery_ turns a single prompt into a live product—UI, back-end, hosting and all.',
    url: 'https://justevery.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://justevery.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} bg-dark-200 flex min-h-screen flex-col overflow-x-hidden font-sans text-white antialiased`}
      >
        <ServiceWorkerRegistration />
        <HeaderWrapper />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
