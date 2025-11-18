'use client';

import { AnimatePresence, motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { X, Folder } from 'lucide-react';

interface IBottomSheetProps {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface IBottomSheetTitleProps {
  title: string;
  onOpenChange: (open: boolean) => void;
}
function SheetTitle({ title, onOpenChange }: IBottomSheetTitleProps) {
  return (
    <motion.div className="bg-transparent p-4 flex items-center justify-between border-b border-line-normal">
      <button onClick={() => onOpenChange(false)}>
        <X size={24} className="text-primary-normal" />
      </button>
      <div className="flex items-center gap-2 text-primary-normal">
        <Folder size={24} />
        {title}
      </div>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17L4 12" stroke="#3AEE49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </motion.div>
  );
}

const SheetContent = ({ children }: { children: React.ReactNode }) => {
  return <section className="bg-transparent p-4 max-h-[80%] h-full overflow-y-auto">{children}</section>;
};

export const BottomSheet = ({ title, open, onOpenChange, children }: IBottomSheetProps) => {
  const [snapPoints, setSnapPoints] = useState({
    closed: 0,
    half: 0,
    expanded: 0,
  });
  const [minHeight, setMinHeight] = useState(200);
  const height = useMotionValue(0);
  const springHeight = useSpring(height, {
    stiffness: 500,
    damping: 50,
  });
  const initDragHeight = useRef(0);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const viewportHeight = window.innerHeight;
      const newSnapPoints = {
        closed: 0,
        half: viewportHeight * 0.55,
        expanded: viewportHeight * 0.9,
      };
      setSnapPoints(newSnapPoints);
      setMinHeight(viewportHeight * 0.3);
      // snapPoints가 설정된 후 initDragHeight도 업데이트
      if (open) {
        height.set(newSnapPoints.half);
        initDragHeight.current = newSnapPoints.half;
      }
    }
  }, []);

  useEffect(() => {
    if (open) {
      height.set(snapPoints.half);
      initDragHeight.current = snapPoints.half;
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open && snapPoints.closed !== undefined) {
      height.set(snapPoints.closed);
    }
  }, [open, snapPoints.closed, height, springHeight]);

  const findClosestSnapPoint = useCallback(
    (currentHeight: number) => {
      if (snapPoints.half === 0) return currentHeight;
      const distances = {
        closed: Math.abs(currentHeight - snapPoints.closed),
        half: Math.abs(currentHeight - snapPoints.half),
        expanded: Math.abs(currentHeight - snapPoints.expanded),
      };
      const closest = Object.entries(distances).reduce((a, b) => (a[1] < b[1] ? a : b))[0] as keyof typeof snapPoints;
      return snapPoints[closest];
    },
    [snapPoints]
  );

  const handleDragEnd = (info: PanInfo) => {
    const currentHeight = height.get();
    // 아래로 빠르게 내리면 닫기
    if (info.velocity.y > 1000 && info.offset.y < 0) {
      onOpenChange(false);
      return;
    }
    // 현재 높이가 최소 높이이하로 내려가면 닫기
    if (currentHeight < minHeight) {
      onOpenChange(false);
      return;
    }
    // 놓았을때 가장 가까운 스냅 포인트로 이동
    const targetHeight = findClosestSnapPoint(currentHeight);
    setTimeout(() => {
      height.set(targetHeight);
    }, 100);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={e => {
              if (e.target === e.currentTarget) {
                onOpenChange(false);
              }
            }}
            className="fixed inset-0 bg-black z-998"
          />
          <motion.aside
            key="bottom-sheet"
            style={{
              height: springHeight,
              touchAction: 'none',
              willChange: 'height',
            }}
            initial={{ height: 0 }}
            animate={{ height: snapPoints.half }}
            exit={{ height: 0 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-elevated-assistive max-w-96 w-full rounded-t-lg z-999"
          >
            <motion.div
              onPanStart={() => {
                initDragHeight.current = height.get();
              }}
              onPan={(_, info) => {
                const deltaY = -info.offset.y;
                const newHeight = initDragHeight.current + deltaY;
                if (newHeight < minHeight) {
                  onOpenChange(false);
                  return;
                }

                height.set(newHeight);
              }}
              onPanEnd={(_, info) => handleDragEnd(info)}
              className="cursor-grab active:cursor-grabbing"
            >
              <SheetTitle title={title} onOpenChange={onOpenChange} />
            </motion.div>
            <SheetContent>{children}</SheetContent>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
