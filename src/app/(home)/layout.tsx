'use client';

import { useAutoLogout } from '@/shared/hooks';
import { NavigationBar } from '@/shared/components/layout';
import { NotifyOnboardModal } from '@/feature/onboard/notifyOnboardModal';

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function HomePageLayout({ children }: HomeLayoutProps) {
  useAutoLogout();

  return (
    <div className="flex flex-1 max-sm:flex-col max-w-md w-full mx-auto h-full">
      <NavigationBar />
      <NotifyOnboardModal />
      <div className="flex flex-1 sm:flex-col overflow-x-hidden pb-20">{children}</div>
    </div>
  );
}
