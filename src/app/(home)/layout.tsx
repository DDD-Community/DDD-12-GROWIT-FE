'use client';

import { useAutoLogout } from '@/shared/hooks';
import { SideBar, Header } from '@/shared/components/layout';

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function HomePageLayout({ children }: HomeLayoutProps) {
  useAutoLogout();

  return (
    <div className="flex w-scree sm:h-screen max-sm:h-full max-sm:flex-col">
      <SideBar />
      <Header.Mobile />
      <div className="flex flex-1 sm:flex-col overflow-x-hidden">{children}</div>
    </div>
  );
}
