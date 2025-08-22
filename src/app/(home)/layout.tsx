'use client';

import { useAutoLogout } from '@/shared/hooks';
import { NavigationBar } from '@/shared/components/layout';

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function HomePageLayout({ children }: HomeLayoutProps) {
  useAutoLogout();

  return (
    <div className="flex w-scree h-screen max-sm:flex-col">
      <NavigationBar />
      <div className="flex flex-1 sm:flex-col overflow-x-hidden">{children}</div>
    </div>
  );
}
