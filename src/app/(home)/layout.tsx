'use client';

import { useAutoLogout } from '@/shared/hooks';
import { NavigationBar } from '@/shared/components/layout';
import { GoalOnboardRedirect } from '@/feature/onboard';

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function HomePageLayout({ children }: HomeLayoutProps) {
  useAutoLogout();

  return (
    <div className="flex flex-1 max-sm:flex-col max-w-md w-full mx-auto h-full">
      <NavigationBar />
      <GoalOnboardRedirect />
      <div className="flex flex-1 flex-col overflow-x-hidden">{children}</div>
    </div>
  );
}
