'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { AnimatedStack } from '@/shared/components/layout/AnimatedStack';

type GoalPageLayoutProps = {
  children: React.ReactNode;
  stack: React.ReactNode;
};

export default function GoalLayout({ children, stack }: GoalPageLayoutProps) {
  const stackSegment = useSelectedLayoutSegment('stack');

  return (
    <>
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-bg-default">
        {children}
      </div>
      <AnimatedStack isActive={!!stackSegment}>{stack}</AnimatedStack>
    </>
  );
}
