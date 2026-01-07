'use client';

import { PlanSelectorProvider, usePlanSelector } from './hooks';
import { useGoalSelector } from '@/model/goal/context';
import { useSelectedDayActions } from '@/model/todo/selectedDay';

interface PlanProviderProps {
  children: React.ReactNode;
}

export const PlanSelect = () => {
  const { plans, selectedPlanIndex, goPrev, goNext, selectedWeekIndex } = usePlanSelector();
  const { initWeekDatesToMonday } = useSelectedDayActions();
  const { currentGoal } = useGoalSelector();

  if (!plans.length) return null;

  const hasPlans = plans.length > 0;
  const isPrevDisabled = !hasPlans || selectedPlanIndex === 0;
  const isNextDisabled = !hasPlans || selectedPlanIndex === plans.length - 1;

  const handlePrev = () => {
    const newIdx = selectedPlanIndex > 0 ? selectedPlanIndex - 1 : selectedPlanIndex;
    if (newIdx !== selectedPlanIndex) {
      goPrev();
      const newWeekIndex = plans[newIdx]?.weekOfMonth;
      if (currentGoal?.duration && newWeekIndex) {
        initWeekDatesToMonday(currentGoal.duration.startDate, currentGoal.duration.endDate, newWeekIndex);
      }
    }
  };

  const handleNext = () => {
    const newIdx = selectedPlanIndex < plans.length - 1 ? selectedPlanIndex + 1 : selectedPlanIndex;
    if (newIdx !== selectedPlanIndex) {
      goNext();
      const newWeekIndex = plans[newIdx]?.weekOfMonth;
      if (currentGoal?.duration && newWeekIndex) {
        initWeekDatesToMonday(currentGoal.duration.startDate, currentGoal.duration.endDate, newWeekIndex);
      }
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handlePrev}
        disabled={isPrevDisabled}
        className="flex items-center justify-center w-8 h-8 rounded-lg text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <span className="flex items-center justify-center text-white text-[16px] font-[700] whitespace-nowrap min-w-[44px] text-center">
        {selectedPlanIndex + 1}주차
      </span>

      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className="flex items-center justify-center w-8 h-8 rounded-lg text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export const PlanProvider = ({ children }: PlanProviderProps) => {
  const { currentGoal } = useGoalSelector();

  return <PlanSelectorProvider goal={currentGoal!}>{children}</PlanSelectorProvider>;
};
