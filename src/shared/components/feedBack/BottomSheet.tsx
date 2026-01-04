'use client';

import { useContext, createContext } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, type PanInfo, type MotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Z_INDEX } from '@/shared/lib/z-index';

// 높이 타입 정의: 'auto' | '{x}px' | '{x}%'
export type BottomSheetHeight = 'auto' | `${number}px` | `${number}%`;

// 바텀시트 높이 상수
const HEADER_HEIGHT_VH = 10;
const SHEET_MAX_HEIGHT_VH = 90;
const SHEET_MAX_HEIGHT = `${SHEET_MAX_HEIGHT_VH}vh`;
const CONTENT_MAX_HEIGHT = `${SHEET_MAX_HEIGHT_VH - HEADER_HEIGHT_VH}vh`;

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
  // auto 모드용
  contentHeight: number;
  setContentHeight: (height: number) => void;
  autoSpringHeight: MotionValue<number>;
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

interface SnapPoints {
  closed: number;
  half: number;
  expanded: number;
}

// 스냅 포인트 계산 훅
const useSnapPoints = (heightMode: BottomSheetHeight) => {
  const [snapPoints, setSnapPoints] = useState<SnapPoints>({
    closed: 0,
    half: 0,
    expanded: 0,
  });
  const [minHeight, setMinHeight] = useState(200);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const viewportHeight = window.innerHeight;
    const parsedHeight = parseHeightToPixels(heightMode, viewportHeight);

    // auto 모드가 아닌 경우에만 스냅 포인트 설정
    const initialHeight = parsedHeight === 'auto' ? viewportHeight * 0.55 : parsedHeight;

    setSnapPoints({
      closed: 0,
      half: initialHeight,
      expanded: viewportHeight * 0.9,
    });
    setMinHeight(Math.min(initialHeight * 0.5, viewportHeight * 0.3));
  }, [heightMode]);

  return { snapPoints, minHeight };
};

// auto 모드 높이 관리 훅
const useAutoHeight = () => {
  const [contentHeight, setContentHeight] = useState(0);
  const autoHeight = useMotionValue(0);
  const autoSpringHeight = useSpring(autoHeight, {
    stiffness: 400,
    damping: 50,
  });

  // contentHeight가 변경되면 autoHeight 업데이트
  useEffect(() => {
    if (contentHeight > 0) {
      autoHeight.set(contentHeight);
    }
  }, [contentHeight, autoHeight]);

  return { contentHeight, setContentHeight, autoSpringHeight };
};

// 컨텐츠 높이 측정 컴포넌트 (auto 모드 전용)
const AutoHeightContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, heightMode, setContentHeight } = useBottomSheetContext();
  const ref = useRef<HTMLDivElement>(null);

  const isAutoHeight = heightMode === 'auto';

  useEffect(() => {
    if (!isAutoHeight || !isOpen) return;

    const element = ref.current;
    if (!element) return;

    // 초기 높이 측정
    const initialHeight = element.getBoundingClientRect().height;
    if (initialHeight > 0) {
      setContentHeight(initialHeight);
    }

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setContentHeight(entry.contentRect.height);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [isAutoHeight, isOpen, setContentHeight]);

  return <div ref={ref}>{children}</div>;
};

// Provider 컴포넌트
const BottomSheetProvider = ({
  children,
  isOpen,
  showSheet,
  closeSheet,
  heightMode = '55%',
}: BottomSheetProviderProps) => {
  const { snapPoints, minHeight } = useSnapPoints(heightMode);
  const { contentHeight, setContentHeight, autoSpringHeight } = useAutoHeight();

  const height = useMotionValue(0);
  const springHeight = useSpring(height, {
    stiffness: 400,
    damping: 50,
  });
  const initDragHeight = useRef(0);

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
        contentHeight,
        setContentHeight,
        autoSpringHeight,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

// Root 컴포넌트 (오버레이 + 시트 컨테이너)
const BottomSheetRoot = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, closeSheet, springHeight, snapPoints, heightMode, contentHeight, autoSpringHeight } =
    useBottomSheetContext();

  const isAutoHeight = heightMode === 'auto';
  const isMeasured = contentHeight > 0;

  // auto 모드: 측정 전에는 'auto', 측정 후에는 스프링 애니메이션 적용
  const resolvedHeight = isAutoHeight ? (isMeasured ? autoSpringHeight : 'auto') : springHeight;

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
            className={`fixed inset-0 bg-black ${Z_INDEX.SHEET}`}
          />
          {/* 바텀시트 컨테이너 */}
          <motion.aside
            key="bottom-sheet"
            style={{
              height: resolvedHeight,
              maxHeight: SHEET_MAX_HEIGHT,
              touchAction: 'none',
              willChange: 'height',
              overflow: 'hidden',
            }}
            initial={{ height: 0 }}
            animate={{ height: isAutoHeight ? (isMeasured ? contentHeight : 'auto') : snapPoints.half }}
            exit={{ height: 0 }}
            className={`fixed bottom-0 left-1/2 -translate-x-1/2 bg-bg-elevated max-w-md w-full rounded-t-lg ${Z_INDEX.SHEET}`}
          >
            <AutoHeightContent>{children}</AutoHeightContent>
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
const SheetContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <section className={cn('bg-transparent p-4 overflow-y-auto', `max-h-[${CONTENT_MAX_HEIGHT}]`, className)}>
      {children}
    </section>
  );
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
