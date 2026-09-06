'use client';

import { useState, useCallback, useMemo } from 'react';

interface UseStackNavigationOptions<T extends string> {
  /** 초기 뷰 */
  initialView: T;
}

interface UseStackNavigationReturn<T extends string> {
  /** 현재 뷰 */
  currentView: T;
  /** 특정 뷰로 이동 (스택에 push) */
  navigateTo: (view: T) => void;
  /** 이전 뷰로 돌아가기 (스택에서 pop) */
  goBack: () => void;
  /** 메인 뷰로 바로 이동 (스택 초기화) */
  goToMain: () => void;
  /** 상태 리셋 */
  reset: () => void;
}

/**
 * 스택 네비게이션 훅
 * BottomSheet 내에서 여러 뷰 간 스택 방식 전환을 관리합니다.
 */
export function useStackNavigation<T extends string>({
  initialView,
}: UseStackNavigationOptions<T>): UseStackNavigationReturn<T> {
  // 스택 히스토리 (현재 뷰 포함)
  const [history, setHistory] = useState<T[]>([initialView]);

  const currentView = useMemo(() => history[history.length - 1], [history]);

  const navigateTo = useCallback((view: T) => {
    setHistory(prev => [...prev, view]);
  }, []);

  const goBack = useCallback(() => {
    setHistory(prev => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
  }, []);

  const goToMain = useCallback(() => {
    setHistory([initialView]);
  }, [initialView]);

  const reset = useCallback(() => {
    setHistory([initialView]);
  }, [initialView]);

  return {
    currentView,
    navigateTo,
    goBack,
    goToMain,
    reset,
  };
}

export default useStackNavigation;
