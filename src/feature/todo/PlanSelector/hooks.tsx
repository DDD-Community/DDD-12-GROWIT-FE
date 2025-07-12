'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Plan } from '@/shared/type/goal';

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
  setSelectedPlanId: (id: string) => void;
  selectedPlanIndex: number;
  setSelectedPlanIndex: (idx: number) => void;
  goPrev: () => void;
  goNext: () => void;
}

const PlanSelectorContext = createContext<PlanSelectorContextValue | undefined>(undefined);

export const PlanSelectorProvider = ({ plans, children }: { plans: ExtendedPlan[]; children: ReactNode }) => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const selectedPlanId = plans[selectedPlanIndex]?.id || '';
  const selectedPlanContent = plans[selectedPlanIndex]?.content || '';

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
