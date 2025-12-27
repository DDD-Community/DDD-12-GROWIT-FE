'use client';

import { useContext, createContext } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, type PanInfo, type MotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

// 높이 타입 정의: 'auto' | '{x}px' | '{x}%'
export type BottomSheetHeight = 'auto' | `${number}px` | `${number}%`;

// Context 타입 정의
interface BottomSheetContextType {
  isOpen: boolean;
  showSheet: () => void;
  closeSheet: () => void;
  snapPoints: {
    closed: number;
    half: number;
    expanded: number;
  };
  minHeight: number;
  height: MotionValue<number>;
  springHeight: MotionValue<number>;
  initDragHeight: React.MutableRefObject<number>;
  heightMode: BottomSheetHeight;
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

// Context 사용을 위한 훅
const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('BottomSheet 컴포넌트는 BottomSheet.Provider 내부에서 사용되어야 합니다.');
  }
  return context;
};

interface BottomSheetProviderProps {
  isOpen: boolean;
  showSheet: () => void;
  closeSheet: () => void;
  children: React.ReactNode;
  heightMode?: BottomSheetHeight;
}

// 높이 문자열을 픽셀 값으로 변환하는 유틸리티 함수
const parseHeightToPixels = (heightMode: BottomSheetHeight, viewportHeight: number): number | 'auto' => {
  if (heightMode === 'auto') {
    return 'auto';
  }

  if (heightMode.endsWith('px')) {
    return parseInt(heightMode.slice(0, -2), 10);
  }

  if (heightMode.endsWith('%')) {
    const percentage = parseInt(heightMode.slice(0, -1), 10);
    return (viewportHeight * percentage) / 100;
  }

  return viewportHeight * 0.55; // 기본값
};

// Provider 컴포넌트
const BottomSheetProvider = ({
  children,
  isOpen,
  showSheet,
  closeSheet,
  heightMode = '55%',
}: BottomSheetProviderProps) => {
  const [snapPoints, setSnapPoints] = useState({
    closed: 0,
    half: 0,
    expanded: 0,
  });
  const [minHeight, setMinHeight] = useState(200);
  const height = useMotionValue(0);
  const springHeight = useSpring(height, {
    stiffness: 400,
    damping: 50,
  });
  const initDragHeight = useRef(0);

  // 뷰포트 높이 기반 스냅 포인트 설정
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const viewportHeight = window.innerHeight;
      const parsedHeight = parseHeightToPixels(heightMode, viewportHeight);

      // auto 모드가 아닌 경우에만 스냅 포인트 설정
      const initialHeight = parsedHeight === 'auto' ? viewportHeight * 0.55 : parsedHeight;

      const newSnapPoints = {
        closed: 0,
        half: initialHeight,
        expanded: viewportHeight * 0.9,
      };
      setSnapPoints(newSnapPoints);
      setMinHeight(Math.min(initialHeight * 0.5, viewportHeight * 0.3));
    }
  }, [heightMode]);

  // 열릴 때 초기 높이 설정 및 body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      height.set(snapPoints.half);
      initDragHeight.current = snapPoints.half;

      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    } else {
      height.set(snapPoints.closed);
    }
  }, [isOpen, snapPoints, height]);

  return (
    <BottomSheetContext.Provider
      value={{
        isOpen,
        showSheet,
        closeSheet,
        snapPoints,
        minHeight,
        height,
        springHeight,
        initDragHeight,
        heightMode,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

// Root 컴포넌트 (오버레이 + 시트 컨테이너)
const BottomSheetRoot = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, closeSheet, springHeight, snapPoints, heightMode } = useBottomSheetContext();

  const isAutoHeight = heightMode === 'auto';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={e => {
              if (e.target === e.currentTarget) {
                closeSheet();
              }
            }}
            className="fixed inset-0 bg-black z-998"
          />
          {/* 바텀시트 컨테이너 */}
          <motion.aside
            key="bottom-sheet"
            style={{
              height: isAutoHeight ? 'auto' : springHeight,
              maxHeight: '90vh',
              touchAction: 'none',
              willChange: 'height',
            }}
            initial={{ height: 0 }}
            animate={{ height: isAutoHeight ? 'auto' : snapPoints.half }}
            exit={{ height: 0 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-elevated-assistive max-w-96 w-full rounded-t-lg z-999"
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

// Handle 컴포넌트
const SheetHandle = () => {
  return (
    <motion.div className="absolute">
      <div className="w-14 h-1 bg-fill-strong rounded-full" />
    </motion.div>
  );
};

// Title 컴포넌트 (드래그 가능한 헤더)
const SheetTitle = ({ children }: { children: React.ReactNode }) => {
  const { snapPoints, minHeight, height, initDragHeight, closeSheet } = useBottomSheetContext();

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
    if (info.velocity.y > 800 && info.offset.y < 0) {
      closeSheet();
      return;
    }
    // 현재 높이가 최소 높이 이하로 내려가면 닫기
    if (currentHeight < minHeight) {
      closeSheet();
      return;
    }
    // 놓았을 때 가장 가까운 스냅 포인트로 이동
    const targetHeight = findClosestSnapPoint(currentHeight);
    setTimeout(() => {
      height.set(targetHeight);
    }, 100);
  };

  return (
    <motion.div
      onPanStart={() => {
        initDragHeight.current = height.get();
      }}
      onPan={(_, info) => {
        const deltaY = -info.offset.y;
        const newHeight = initDragHeight.current + deltaY;
        if (newHeight < minHeight) {
          closeSheet();
          return;
        }
        height.set(newHeight);
      }}
      onPanEnd={(_, info) => handleDragEnd(info)}
      className="bg-transparent pt-3 flex flex-col items-center gap-4 cursor-grab active:cursor-grabbing"
    >
      <SheetHandle />

      {children}
    </motion.div>
  );
};

// Content 컴포넌트
const SheetContent = ({ children }: { children: React.ReactNode }) => {
  return <section className="bg-transparent p-4 max-h-[80%] h-full overflow-y-auto">{children}</section>;
};

export const BottomSheet = ({
  children,
  isOpen,
  showSheet,
  closeSheet,
  height,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  showSheet: () => void;
  closeSheet: () => void;
  /** 높이 설정: 'auto' | '{x}px' | '{x}%' (기본값: '55%') */
  height?: BottomSheetHeight;
}) => {
  return (
    <BottomSheetProvider isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet} heightMode={height}>
      <BottomSheetRoot>{children}</BottomSheetRoot>
    </BottomSheetProvider>
  );
};

// 서브 컴포넌트 할당
BottomSheet.Title = SheetTitle;
BottomSheet.Content = SheetContent;

interface UseBottomSheetReturn {
  isOpen: boolean;
  showSheet: () => void;
  closeSheet: () => void;
}
// 외부에서 사용할 수 있는 훅
export const useBottomSheet = (): UseBottomSheetReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const showSheet = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSheet = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    showSheet,
    closeSheet,
  };
};
