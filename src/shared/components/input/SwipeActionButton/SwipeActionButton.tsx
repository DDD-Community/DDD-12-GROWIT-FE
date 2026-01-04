'use client';

import { useState, useRef, useCallback } from 'react';
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

const THUMB_SIZE = 52;
const PADDING = 8;

export const SwipeActionButton = ({
  text,
  onSwipeComplete,
  disabled = false,
  className = '',
  threshold = 1,
}: SwipeActionButtonProps) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const x = useMotionValue(0);
  const background = useTransform(x, [0, 300], ['#333438', '#1b1c1e']);
  const containerRef = useRef<HTMLDivElement>(null);

  const getMaxSwipeDistance = useCallback(() => {
    if (!containerRef.current) return 200;
    return containerRef.current.offsetWidth - THUMB_SIZE - PADDING;
  }, []);

  const handleDrag = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const maxDistance = getMaxSwipeDistance();
      let newX = info.offset.x;

      // 범위 제한: 0 ~ maxDistance
      if (newX < 0) newX = 0;
      if (newX > maxDistance) newX = maxDistance;

      x.set(newX);
    },
    [getMaxSwipeDistance, x]
  );

  const handleDragEnd = useCallback(() => {
    const maxDistance = getMaxSwipeDistance();
    const thresholdDistance = maxDistance * threshold;
    const currentX = x.get();

    if (currentX >= thresholdDistance) {
      // threshold 넘었으면 끝까지 애니메이션 + 완료
      animate(x, maxDistance, { type: 'spring', stiffness: 400, damping: 30 });
      setIsCompleted(true);
      onSwipeComplete();
    } else {
      // threshold 안 넘었으면 원위치
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 });
    }
  }, [getMaxSwipeDistance, threshold, x, onSwipeComplete]);

  const handleReset = useCallback(() => {
    setIsCompleted(false);
    animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 });
  }, [x]);

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
        dragMomentum={false}
        dragElastic={0}
        style={{ x }}
        onDrag={handleDrag}
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
