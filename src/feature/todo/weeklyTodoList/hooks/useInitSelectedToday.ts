'use client';

import { useEffect } from 'react';
import { useSelectedDayActions } from '@/model/todo/selectedDay';

/**
 * 최초 페이지 진입 시 오늘 날짜가 선택되도록 적용하는 Hook
 */
export function useInitSelectedToday() {
  const { updateDateInfo } = useSelectedDayActions();

  useEffect(() => {
    updateDateInfo(new Date());
  }, []);
}
