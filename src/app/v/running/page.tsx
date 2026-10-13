import type { Metadata } from 'next';

import { RunningPage } from '@/components/variants/running/RunningPage';
import { siteMeta } from '@/content/meta';

export const metadata: Metadata = {
  title: { absolute: siteMeta.title },
  description: siteMeta.description,
};

export default function RunningVariant() {
  return <RunningPage />;
}
