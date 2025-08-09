'use client';

import Button from '@/shared/components/input/Button';
import { PlanSelectorProvider, usePlanSelector } from './hooks';
import { useRedirectToOnboarding } from '@/shared/hooks';
import { useGoalSelector } from '@/models/goal/context';
import { CreateNewGoal } from './components/CreateNewGoal';

interface PlanProviderProps {
  children: React.ReactNode;
}

export const PlanSelect = () => {
  const { plans, selectedPlanIndex, goPrev, goNext } = usePlanSelector();

  if (!plans.length) return null;

  return (
    <div className="flex gap-2 max-sm:py-[12px]">
      <Button size={'sm'} variant={'secondary'} text={'<'} disabled={selectedPlanIndex === 0} onClick={goPrev} />
      <span className="sm:hidden text-white text-[16px] font-[700] whitespace-nowrap min-w-[50px] text-center">
        {selectedPlanIndex + 1}주차
      </span>
      <Button
        size={'sm'}
        variant={'secondary'}
        text={'>'}
        disabled={selectedPlanIndex === plans.length - 1}
        onClick={goNext}
      />
    </div>
  );
};

export const PlanProvider = ({ children }: PlanProviderProps) => {
  const { isLoading, goalList, selectedGoal, selectedPlans } = useGoalSelector();

  useRedirectToOnboarding({
    isLoading,
    goalListLength: goalList.length,
  });

  if (!isLoading && goalList.length === 0) {
    return <CreateNewGoal />;
  }

  return (
    <PlanSelectorProvider plans={selectedPlans} goal={selectedGoal!}>
      {children}
    </PlanSelectorProvider>
  );
};
