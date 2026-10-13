import type { Metadata } from 'next';

// Variants are review copies of the same page: keep them out of search.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function VariantsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
