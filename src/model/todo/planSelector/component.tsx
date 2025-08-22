'use client';

import { PlanSelectorProvider, usePlanSelector } from './hooks';
import { useRedirectToOnboarding } from '@/shared/hooks';
import { useGoalSelector } from '@/model/goal/context';
import { CreateNewGoal } from './components/CreateNewGoal';

interface PlanProviderProps {
  children: React.ReactNode;
}

export const PlanSelect = () => {
  const { plans, selectedPlanIndex, goPrev, goNext } = usePlanSelector();

  if (!plans.length) return null;

  const hasPlans = plans.length > 0;
  const isPrevDisabled = !hasPlans || selectedPlanIndex === 0;
  const isNextDisabled = !hasPlans || selectedPlanIndex === plans.length - 1;

  return (
    <div className="flex items-center">
      <button
        onClick={goPrev}
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
        onClick={goNext}
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
  const { isLoading, goalList, currentGoal, currentPlans } = useGoalSelector();

  useRedirectToOnboarding({
    isLoading,
    goalListLength: goalList.length,
  });

  if (!isLoading && goalList.length === 0) {
    return <CreateNewGoal />;
  }

  return (
    <PlanSelectorProvider plans={currentPlans} goal={currentGoal!}>
      {children}
    </PlanSelectorProvider>
  );
};
