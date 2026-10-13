import type { Metadata } from 'next';

import { ObjectsPage } from '@/components/variants/objects/ObjectsPage';
import { siteMeta } from '@/content/meta';

export const metadata: Metadata = {
  title: { absolute: siteMeta.title },
};

export default function ObjectsVariant() {
  return <ObjectsPage />;
}
