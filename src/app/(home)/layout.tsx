'use client';

import { useAutoLogout } from '@/shared/hooks';
//import { NavigationBar } from '@/shared/components/layout';
import { GoalOnboardRedirect } from '@/feature/onboard';
import { BottomNavigation } from '@/shared/components/layout/Navigation/BottomNavigation';

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export const dynamic = 'force-dynamic';

export default function HomePageLayout({ children }: HomeLayoutProps) {
  useAutoLogout();

  return (
    <div className="flex flex-1 max-sm:flex-col max-w-md w-full mx-auto h-full">
      {/* <NavigationBar /> */}
      <GoalOnboardRedirect />
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto">{children}</div>
        <BottomNavigation />
      </div>
    </div>
  );
}
