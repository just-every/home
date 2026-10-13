import type { Metadata } from 'next';

import { UnsubscribePage } from '@/components/variants/unsubscribe/UnsubscribePage';

export const metadata: Metadata = {
  title: 'Unsubscribe',
};

export default function UnsubscribeVariant() {
  return <UnsubscribePage />;
}
