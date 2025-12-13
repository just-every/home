import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Footer from '@/components/Footer';
import { assetUrl } from '@/lib/asset-url';
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
  title: {
    default: 'JustEvery',
    template: '%s · JustEvery',
  },
  description:
    'Push frontier AI further. Ship faster. JustEvery builds professional tools that turn powerful models into reliable workflows.',
  metadataBase: new URL('https://justevery.com'),
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
    title: 'JustEvery',
    description:
      'Push frontier AI further. Ship faster. Professional tools for reliable AI workflows.',
    url: 'https://justevery.com',
    siteName: 'JustEvery',
    images: [
      {
        url: 'https://justevery.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JustEvery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JustEvery',
    description:
      'Push frontier AI further. Ship faster. Professional tools for reliable AI workflows.',
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
    name: 'JustEvery',
    description:
      'Push frontier AI further. Ship faster. JustEvery builds professional tools that turn powerful models into reliable workflows.',
    url: 'https://justevery.com',
  };

  return (
    <html lang="en" className="dark overflow-x-hidden">
      <head>
        <link rel="preload" as="image" href="/img/hero-bg.jpeg" />
        <link
          rel="preload"
          as="video"
          href={assetUrl('/video/hero-intro.webm')}
          type="video/webm"
        />
        <link
          rel="preload"
          as="video"
          href={assetUrl('/video/hero-loop.webm')}
          type="video/webm"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} flex min-h-[100svh] flex-col overflow-x-hidden bg-black font-sans text-white antialiased`}
      >
        <main className="flex flex-1 flex-col overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
