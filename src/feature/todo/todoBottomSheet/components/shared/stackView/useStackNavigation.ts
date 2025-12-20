'use client';

import { useState, useCallback } from 'react';

interface UseStackNavigationOptions<T extends string> {
  /** 초기 뷰 */
  initialView: T;
  /** 메인 뷰 (뒤로가기 시 이동할 뷰) */
  mainView: T;
}

interface UseStackNavigationReturn<T extends string> {
  /** 현재 뷰 */
  currentView: T;
  /** 애니메이션 방향 (1: 앞으로, -1: 뒤로) */
  direction: number;
  /** 특정 뷰로 이동 */
  navigateTo: (view: T) => void;
  /** 메인 뷰로 돌아가기 */
  goBack: () => void;
  /** 상태 리셋 */
  reset: () => void;
}

/**
 * 스택 네비게이션 훅
 * BottomSheet 내에서 여러 뷰 간 스택 방식 전환을 관리합니다.
 */
export function useStackNavigation<T extends string>({
  initialView,
  mainView,
}: UseStackNavigationOptions<T>): UseStackNavigationReturn<T> {
  const [currentView, setCurrentView] = useState<T>(initialView);
  const [direction, setDirection] = useState(0);

  const navigateTo = useCallback(
    (view: T) => {
      setDirection(view === mainView ? -1 : 1);
      setCurrentView(view);
    },
    [mainView]
  );

  const goBack = useCallback(() => {
    navigateTo(mainView);
  }, [navigateTo, mainView]);

  const reset = useCallback(() => {
    setCurrentView(initialView);
    setDirection(0);
  }, [initialView]);

  return {
    currentView,
    direction,
    navigateTo,
    goBack,
    reset,
  };
}

export default useStackNavigation;
