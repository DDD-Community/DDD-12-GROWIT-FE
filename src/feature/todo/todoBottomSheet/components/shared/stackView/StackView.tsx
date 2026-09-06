'use client';

import { cn } from '@/shared/lib/utils';

interface StackViewProps {
  /** 현재 뷰 키 */
  viewKey: string;
  /** 렌더링할 컨텐츠 */
  children: React.ReactNode;
  /** 추가 className */
  className?: string;
}

/**
 * 스택 뷰 컴포넌트
 * 바텀시트 내부 화면을 즉시 전환합니다.
 */
export const StackView = ({ viewKey, children, className }: StackViewProps) => (
  <div data-view={viewKey} className={cn('h-full transform-none transition-none animate-none', className)}>
    {children}
  </div>
);

export default StackView;
