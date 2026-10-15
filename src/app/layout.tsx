import type { Metadata } from 'next';
import Script from 'next/script';

import { sans } from '@/components/landing/fonts';
import { siteMeta } from '@/content/meta';
import './globals.css';

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

// X (Twitter) conversion tracking base code, pixel ID reblb.
const xPixel = `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','reblb');`;

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
      <body className={`${sans.variable} font-sans antialiased`}>
        {children}
        <Script id="x-pixel" strategy="afterInteractive">
          {xPixel}
        </Script>
      </body>
    </html>
  );
}
