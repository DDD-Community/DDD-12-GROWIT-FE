'use client';

import { ReactNode, useState } from 'react';
import { motion, useMotionValue, type PanInfo } from 'motion/react';

/**
 * Figma 196:1676 swipe-to-reveal 인터랙션 (motion.dev/examples/react-swipe-actions).
 *
 * - 좌측으로 swipe → 우측 영역에 삭제 버튼 노출 → 클릭 시 onDelete
 * - 우측으로 swipe → 좌측 영역에 완료 버튼 노출 → 클릭 시 onComplete
 *
 * 완료 버튼은 Figma 196:1676 사양 (XS 20x20, bg #2B7FFF, rounded-2xl,
 * check_regular icon).
 */
const ACTION_WIDTH = 56;
const REVEAL_THRESHOLD = ACTION_WIDTH / 2;

interface SwipeableRowProps {
  children: ReactNode;
  onComplete?: () => void;
  onDelete?: () => void;
  className?: string;
}

type RevealedSide = 'none' | 'complete' | 'delete';

export const SwipeableRow = ({ children, onComplete, onDelete, className }: SwipeableRowProps) => {
  const x = useMotionValue(0);
  const [revealed, setRevealed] = useState<RevealedSide>('none');

  const close = () => {
    x.set(0);
    setRevealed('none');
  };

  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    // 좌측 스와이프(음수 offset) → 우측 영역(삭제) 노출
    if (info.offset.x <= -REVEAL_THRESHOLD && onDelete) {
      x.set(-ACTION_WIDTH);
      setRevealed('delete');
      return;
    }
    // 우측 스와이프(양수 offset) → 좌측 영역(완료) 노출
    if (info.offset.x >= REVEAL_THRESHOLD && onComplete) {
      x.set(ACTION_WIDTH);
      setRevealed('complete');
      return;
    }
    close();
  };

  const handleAction = (run?: () => void) => {
    run?.();
    close();
  };

  return (
    <div className={`relative ${className ?? ''}`}>
      {/* 좌측 영역 — 우측 스와이프 시 노출, Figma 196:1676 완료 버튼 */}
      {onComplete && (
        <button
          type="button"
          aria-label="완료"
          onClick={e => {
            e.stopPropagation();
            handleAction(onComplete);
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center size-5 p-[2px] rounded-2xl bg-[#2B7FFF]"
          style={{
            opacity: revealed === 'complete' ? 1 : 0,
            pointerEvents: revealed === 'complete' ? 'auto' : 'none',
            transition: 'opacity 150ms ease',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M3.5 8L6.5 11L12.5 4.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* 우측 영역 — 좌측 스와이프 시 노출, 삭제 버튼 */}
      {onDelete && (
        <button
          type="button"
          aria-label="삭제"
          onClick={e => {
            e.stopPropagation();
            handleAction(onDelete);
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center size-5 p-[2px] rounded-2xl bg-[#FB2C36]"
          style={{
            opacity: revealed === 'delete' ? 1 : 0,
            pointerEvents: revealed === 'delete' ? 'auto' : 'none',
            transition: 'opacity 150ms ease',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M3 4.5h8M5.5 4.5V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1.5M4.5 4.5l.5 7a1 1 0 0 0 1 .9h2a1 1 0 0 0 1-.9l.5-7"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Foreground row — drag handle */}
      <motion.div
        drag="x"
        dragConstraints={{ left: onDelete ? -ACTION_WIDTH : 0, right: onComplete ? ACTION_WIDTH : 0 }}
        dragElastic={0.15}
        dragMomentum={false}
        style={{ x, touchAction: 'pan-y' }}
        onDragEnd={handleDragEnd}
        animate={{ x: revealed === 'complete' ? ACTION_WIDTH : revealed === 'delete' ? -ACTION_WIDTH : 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
