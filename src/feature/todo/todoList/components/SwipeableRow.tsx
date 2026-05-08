'use client';

import { ReactNode } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

const COMPLETE_THRESHOLD = -64;
const DELETE_THRESHOLD = 64;

interface SwipeableRowProps {
  children: ReactNode;
  onComplete?: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * 좌측 스와이프 → 완료 토글 (우측에 파란 체크 노출)
 * 우측 스와이프 → 삭제 (좌측에 빨간 휴지통 노출)
 */
export const SwipeableRow = ({ children, onComplete, onDelete, className }: SwipeableRowProps) => {
  const x = useMotionValue(0);
  const completeOpacity = useTransform(x, [COMPLETE_THRESHOLD, 0], [1, 0]);
  const deleteOpacity = useTransform(x, [0, DELETE_THRESHOLD], [0, 1]);

  return (
    <div className={`relative ${className ?? ''}`}>
      <motion.div
        style={{ opacity: deleteOpacity }}
        className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-[#FB2C36] pointer-events-none"
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 4.5h8M5.5 4.5V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1.5M4.5 4.5l.5 7a1 1 0 0 0 1 .9h2a1 1 0 0 0 1-.9l.5-7"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <motion.div
        style={{ opacity: completeOpacity }}
        className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-[#2B7FFF] pointer-events-none"
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7.5l3 3 5-6" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <motion.div
        drag="x"
        dragConstraints={{ left: COMPLETE_THRESHOLD, right: DELETE_THRESHOLD }}
        dragElastic={0.15}
        dragMomentum={false}
        style={{ x, touchAction: 'pan-y' }}
        onDragEnd={(_, info) => {
          if (info.offset.x <= COMPLETE_THRESHOLD) {
            onComplete?.();
          } else if (info.offset.x >= DELETE_THRESHOLD) {
            onDelete?.();
          }
          x.set(0);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
