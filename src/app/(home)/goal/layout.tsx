'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { AnimatedStack } from '@/shared/components/layout/AnimatedStack';

type GoalPageLayoutProps = {
  children: React.ReactNode;
  stack: React.ReactNode;
};

export default function GoalLayout({ children, stack }: GoalPageLayoutProps) {
  const stackSegment = useSelectedLayoutSegment('stack');

  // 바텀 네비게이션 만큼 높이 빼기
  return (
    <>
      <div className="relative flex h-[calc(100svh-70px)] flex-col overflow-hidden bg-bg-default">
        {children}
      </div>
      <AnimatedStack isActive={!!stackSegment}>{stack}</AnimatedStack>
    </>
  );
}
