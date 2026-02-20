'use client';

import { useAutoLogout } from '@/shared/hooks';
//import { NavigationBar } from '@/shared/components/layout';
import { GoalOnboardRedirect } from '@/feature/onboard';
import { BottomNavigation } from '@/shared/components/layout/Navigation/BottomNavigation';
import { AnimatedStack } from '@/shared/components/layout/AnimatedStack';
import { useSelectedLayoutSegment } from 'next/navigation';

interface HomeLayoutProps {
  children?: React.ReactNode;
  stack?: React.ReactNode;
}

export const dynamic = 'force-dynamic';

export default function HomePageLayout({ children, stack }: HomeLayoutProps) {
  useAutoLogout();
  const stackSegment = useSelectedLayoutSegment('stack');

  return (
    <div className="flex flex-1 max-sm:flex-col max-w-md w-full mx-auto h-full">
      {/* <NavigationBar /> */}
      <GoalOnboardRedirect />
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto">{children}</div>
        <AnimatedStack isActive={!!stackSegment}>{stack}</AnimatedStack>
        <BottomNavigation />
      </div>
    </div>
  );
}
