'use client';

import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

/** 기본 뷰 전환 애니메이션 variants */
const defaultVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

interface StackViewProps {
  /** 현재 뷰 키 (변경 시 애니메이션 트리거) */
  viewKey: string;
  /** 애니메이션 방향 (1: 앞으로, -1: 뒤로) */
  direction: number;
  /** 렌더링할 컨텐츠 */
  children: React.ReactNode;
  /** 커스텀 애니메이션 variants */
  variants?: Variants;
  /** 애니메이션 지속 시간 (초) */
  duration?: number;
  /** 추가 className */
  className?: string;
}

/**
 * 스택 뷰 컴포넌트
 * 좌우 슬라이드 애니메이션으로 뷰 전환을 제공합니다.
 */
export const StackView = ({
  viewKey,
  direction,
  children,
  variants = defaultVariants,
  duration = 0.2,
  className,
}: StackViewProps) => {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={viewKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: 'tween', duration }}
        className={cn('h-full', className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default StackView;
