'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface SwipeActionButtonProps {
  text: string;
  onSwipeComplete: () => void;
  disabled?: boolean;
  className?: string;
  /** 스와이프 완료 임계값 (0~1, 기본값: 0.7 = 70%) */
  threshold?: number;
}

export const SwipeActionButton = ({
  text,
  onSwipeComplete,
  disabled = false,
  className = '',
  threshold = 1,
}: SwipeActionButtonProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const getMaxSwipeDistance = () => {
    if (!containerRef.current) return 200;
    return containerRef.current.offsetWidth - 60; // 버튼 크기(52px) + 패딩(8px)
  };

  const background = useTransform(x, [0, getMaxSwipeDistance()], ['#333438', '#1b1c1e']);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const maxDistance = getMaxSwipeDistance();
    const thresholdDistance = maxDistance * threshold;

    if (info.offset.x >= thresholdDistance) {
      // 스와이프 완료 - 끝까지 애니메이션
      animate(x, maxDistance, { type: 'spring', stiffness: 400, damping: 30 });
      setIsCompleted(true);
      onSwipeComplete();
    } else {
      // 원위치로 애니메이션
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 });
    }
  };

  const handleReset = () => {
    setIsCompleted(false);
    animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 });
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative flex items-center h-[60px] rounded-full overflow-hidden ${className}`}
      style={{ backgroundColor: background }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className={`text-[15px] tracking-[0.144px] transition-colors duration-200 ${
            isCompleted ? 'text-text-tertiary' : 'text-text-primary'
          }`}
        >
          {text}
        </span>
      </div>

      <motion.div
        className="relative z-10 p-1"
        drag={disabled || isCompleted ? false : 'x'}
        dragConstraints={{ left: 0, right: getMaxSwipeDistance() }}
        dragElastic={0}
        dragMomentum={false}
        style={{ x }}
        onDragEnd={handleDragEnd}
        onDoubleClick={isCompleted ? handleReset : undefined}
      >
        <div
          className={`flex items-center justify-center w-[52px] h-[52px] rounded-full bg-fill-inverse cursor-grab active:cursor-grabbing ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <ChevronRight className="w-7 h-7 text-text-inverse" />
        </div>
      </motion.div>
    </motion.div>
  );
};
