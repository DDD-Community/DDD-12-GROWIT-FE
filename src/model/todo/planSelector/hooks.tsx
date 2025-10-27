'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode, useEffect, useRef, useCallback } from 'react';
import { Goal, Plan } from '@/shared/type/goal';
import { initCurrentWeekIndex } from './utils';

interface PlanSelectorContextValue {
  plans: Plan[];
  selectedPlanId: string;
  selectedPlanContent: string;
  selectedWeekIndex: number;
  setSelectedPlanId: (id: string) => void;
  selectedPlanIndex: number;
  setSelectedPlanIndex: (idx: number) => void;
  goPrev: () => void;
  goNext: () => void;
  changePlanByDate: (date: Date | string) => void;
}

const PlanSelectorContext = createContext<PlanSelectorContextValue | undefined>(undefined);

export const PlanSelectorProvider = ({ children, goal }: { children: ReactNode; goal: Goal }) => {
  const plans = goal?.plans || [];

  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const selectedPlanId = plans[selectedPlanIndex]?.id || '';
  const selectedPlanContent = plans[selectedPlanIndex]?.content || '';
  const selectedWeekIndex = plans[selectedPlanIndex]?.weekOfMonth || 0;
  const isInitialized = useRef(false);

  // 오늘 날짜에 맞는 주차가 있으면 선택, 없으면 첫 번째 주차 선택
  useEffect(() => {
    if (plans.length > 0 && !isInitialized.current) {
      changePlanByDate(new Date());
      isInitialized.current = true;
    }
  }, [goal]);

  const setSelectedPlanId = (id: string) => {
    const idx = plans.findIndex(p => p.id === id);
    if (idx !== -1) setSelectedPlanIndex(idx);
  };

  const goPrev = () => {
    const newIdx = selectedPlanIndex > 0 ? selectedPlanIndex - 1 : selectedPlanIndex;
    if (newIdx !== selectedPlanIndex) {
      setSelectedPlanIndex(newIdx);
    }
  };
  
  const goNext = () => {
    const newIdx = selectedPlanIndex < plans.length - 1 ? selectedPlanIndex + 1 : selectedPlanIndex;
    if (newIdx !== selectedPlanIndex) {
      setSelectedPlanIndex(newIdx);
    }
  };

  const changePlanByDate = useCallback(
    (date: Date | string) => {
      if (!goal?.duration?.startDate) return;

      const weekIndex = initCurrentWeekIndex(goal.duration.startDate, date);
      const targetPlanIndex = plans.findIndex(plan => plan.weekOfMonth === weekIndex + 1);

      if (targetPlanIndex !== -1) {
        setSelectedPlanIndex(targetPlanIndex);
      } else {
        setSelectedPlanIndex(0);
      }
    },
    [goal?.duration?.startDate, plans]
  );

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
      changePlanByDate,
    }),
    [plans, selectedPlanId, selectedPlanIndex, changePlanByDate]
  );

  return <PlanSelectorContext.Provider value={value}>{children}</PlanSelectorContext.Provider>;
};

export function usePlanSelector() {
  const ctx = useContext(PlanSelectorContext);
  if (!ctx) throw new Error('usePlanSelector must be used within a PlanSelectorProvider');
  return ctx;
}
