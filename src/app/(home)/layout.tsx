'use client';

import { useAutoLogout } from '@/shared/hooks';
//import { NavigationBar } from '@/shared/components/layout';
import { GoalOnboardRedirect } from '@/feature/onboard';
import { BottomNavigation } from '@/shared/components/layout/Navigation/BottomNavigation';
import { AnimatedStack } from '@/shared/components/layout/AnimatedStack';
import { useSelectedLayoutSegment } from 'next/navigation';
import { AppAuthProvider } from '@/shared/components/providers/AppAuthProvider';
import { AppBridgeProvider } from '@/shared/components/providers/AppBridgeProvider';

interface HomeLayoutProps {
  children?: React.ReactNode;
  stack?: React.ReactNode;
}

export const dynamic = 'force-dynamic';

export default function HomePageLayout({ children, stack }: HomeLayoutProps) {
  useAutoLogout();
  const stackSegment = useSelectedLayoutSegment('stack');

  return (
    <AppAuthProvider
      loadingFallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      }
      errorFallback={
        <div className="flex h-screen w-full items-center justify-center text-white">
          <p>인증에 실패했습니다</p>
          <p className="text-sm text-gray-400 mt-2">앱을 다시 시작해주세요</p>
        </div>
      }
    >
      <AppBridgeProvider>
        <div className="flex flex-1 max-sm:flex-col max-w-md w-full mx-auto h-full">
          <GoalOnboardRedirect />
          <div className="flex flex-1 flex-col overflow-hidden relative">
            <div className="flex-1 overflow-y-auto">
              {children}
              <BottomNavigation />
            </div>
            <AnimatedStack isActive={!!stackSegment}>{stack}</AnimatedStack>
          </div>
        </div>
      </AppBridgeProvider>
    </AppAuthProvider>
  );
}
