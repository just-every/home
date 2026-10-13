import type { Metadata } from 'next';

import { LabelPage } from '@/components/variants/label/LabelPage';
import { siteMeta } from '@/content/meta';

export const metadata: Metadata = {
  title: { absolute: siteMeta.title },
};

export default function LabelVariant() {
  return <LabelPage />;
}
