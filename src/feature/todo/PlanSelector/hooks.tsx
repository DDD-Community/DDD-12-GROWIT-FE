'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode, useEffect, useRef } from 'react';
import { Goal } from '@/shared/type/goal';
import { getCurrentWeekIndex } from './utils';

// 확장된 Plan 타입 (weekOfMonth 포함)
interface ExtendedPlan {
  id: string;
  content: string;
  weekOfMonth?: number;
}

interface PlanSelectorContextValue {
  plans: ExtendedPlan[];
  selectedPlanId: string;
  selectedPlanContent: string;
  selectedWeekIndex: number;
  setSelectedPlanId: (id: string) => void;
  selectedPlanIndex: number;
  setSelectedPlanIndex: (idx: number) => void;
  goPrev: () => void;
  goNext: () => void;
}

const PlanSelectorContext = createContext<PlanSelectorContextValue | undefined>(undefined);

export const PlanSelectorProvider = ({
  plans,
  children,
  goal,
}: {
  plans: ExtendedPlan[];
  children: ReactNode;
  goal: Goal;
}) => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const selectedPlanId = plans[selectedPlanIndex]?.id || '';
  const selectedPlanContent = plans[selectedPlanIndex]?.content || '';
  const selectedWeekIndex = plans[selectedPlanIndex]?.weekOfMonth || 0;
  const isInitialized = useRef(false);

  useEffect(() => {
    if (plans.length > 0 && !isInitialized.current) {
      const currentWeekIndex = getCurrentWeekIndex(goal.duration.startDate);
      const todayPlanIndex = plans.findIndex(plan => plan.weekOfMonth === currentWeekIndex + 1); // weekOfMonth는 1부터 시작

      // 오늘 날짜에 맞는 주차가 있으면 선택, 없으면 첫 번째 주차 선택
      if (todayPlanIndex !== -1) {
        setSelectedPlanIndex(todayPlanIndex);
      } else {
        setSelectedPlanIndex(0);
      }

      isInitialized.current = true;
    }
  }, [plans, goal?.duration.startDate]);

  const setSelectedPlanId = (id: string) => {
    const idx = plans.findIndex(p => p.id === id);
    if (idx !== -1) setSelectedPlanIndex(idx);
  };

  const goPrev = () => setSelectedPlanIndex(idx => (idx > 0 ? idx - 1 : idx));
  const goNext = () => setSelectedPlanIndex(idx => (idx < plans.length - 1 ? idx + 1 : idx));

  const value = useMemo(
    () => ({
      plans,
      selectedPlanId,
      selectedPlanContent,
      selectedWeekIndex,
      setSelectedPlanId,
      selectedPlanIndex,
      setSelectedPlanIndex,
      goPrev,
      goNext,
    }),
    [plans, selectedPlanId, selectedPlanIndex]
  );

  return <PlanSelectorContext.Provider value={value}>{children}</PlanSelectorContext.Provider>;
};

export function usePlanSelector() {
  const ctx = useContext(PlanSelectorContext);
  if (!ctx) throw new Error('usePlanSelector must be used within a PlanSelectorProvider');
  return ctx;
}
