'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  
  return <Header isHomepage={isHomepage} />;
}