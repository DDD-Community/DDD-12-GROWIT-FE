'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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
 * 바텀시트 위치를 유지하며 짧은 크로스페이드로 내부 화면을 전환합니다.
 */
export const StackView = ({ viewKey, children, className }: StackViewProps) => {
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0 : 0.15;

  return (
    <div className={cn('relative h-full overflow-hidden', className)}>
      <AnimatePresence initial={false}>
        <motion.div
          key={viewKey}
          data-view={viewKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: 'easeOut' }}
          className="absolute inset-0 flex h-full flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StackView;
