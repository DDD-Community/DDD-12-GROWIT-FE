'use client';

import { AnimatedStack } from '@/shared/components/layout/AnimatedStack';
import { useSelectedLayoutSegment } from 'next/navigation';

type MyPageLayoutProps = {
  children: React.ReactNode;
  stack: React.ReactNode;
};

export default function MyPageLayout({ children, stack }: MyPageLayoutProps) {
  const stackSegment = useSelectedLayoutSegment('stack');

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {children}
      <AnimatedStack isActive={!!stackSegment}>{stack}</AnimatedStack>
    </div>
  );
}
