import type { Metadata } from 'next';

import { ManifestoPage } from '@/components/variants/manifesto/ManifestoPage';

export const metadata: Metadata = {
  title: 'Manifesto',
};

export default function ManifestoVariant() {
  return <ManifestoPage />;
}
