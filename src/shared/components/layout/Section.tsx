import React, { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * ### Section
 * > 랜딩 페이지의 섹션들을 위한 공통 레이아웃 컴포넌트
 *
 * ### description
 * - 최소 높이: 화면 전체 높이 (min-h-screen)
 * - 기본 패딩: 상단 160px, 하단 16px (모바일) / 20px (데스크톱)
 * - 중앙 정렬: flex items-center
 * - 접근성: tabIndex={0}으로 키보드 네비게이션 지원
 */
const Section = ({ children, className, ...props }: SectionProps) => {
  return (
    <section
      tabIndex={0}
      className={cn('min-h-screen', 'flex items-center', 'pt-[160px] pb-16 sm:pb-20', className)}
      {...props}
    >
      {children}
    </section>
  );
};

Section.displayName = 'Section';

export default Section;
