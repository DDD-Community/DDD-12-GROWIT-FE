'use client';

import { useCallback } from 'react';
import { usePlanSelector } from '@/model/todo/planSelector';
import { useGoalSelector } from '@/model/goal/context';
import { WeeklyTodoList } from '@/feature/todo/weeklyTodoList';
import { PlanSelect } from '@/model/todo/planSelector';
import { Goal } from '@/shared/type/goal';
import { AddRetroSpectButton } from '@/feature/retrospects';
import { WeeklyGoalBoard } from '@/feature/goal/weeklyGoalBoard';

export const WeeklyPlanBoard = () => {
  const { currentGoal, refetchCurrentGoal } = useGoalSelector();
  if (!currentGoal) return null;
  return <WeeklyPlanBoardInner goal={currentGoal} refetchGoal={refetchCurrentGoal} />;
};

const WeeklyPlanBoardInner = ({ goal, refetchGoal }: { goal: Goal; refetchGoal: () => void }) => {
  const { selectedPlanId, selectedPlanContent, selectedWeekIndex, setSelectedPlanId } = usePlanSelector();

  const handleRefreshGoal = useCallback(() => {
    refetchGoal();
  }, []);

  const handleWeekChange = useCallback(
    (weekOfMonth: number) => {
      const targetPlan = goal.plans.find(plan => plan.weekOfMonth === weekOfMonth);
      if (targetPlan) {
        setSelectedPlanId(targetPlan.id);
      }
    },
    [goal.plans, setSelectedPlanId]
  );

  return (
    <>
      <div className="flex flex-col min-h-[300px] w-full gap-[24px]">
        <div className="flex flex-1 justify-between items-end gap-2">
          <PlanSelect />
          <AddRetroSpectButton goal={goal} selectedPlanId={selectedPlanId} currentWeekIndex={selectedWeekIndex} />
        </div>
        <WeeklyGoalBoard
          goalId={goal.id}
          planId={selectedPlanId}
          selectedWeekIndex={selectedWeekIndex}
          selectedPlanContent={selectedPlanContent}
          onSuccessAddPlan={handleRefreshGoal}
          refetchGoal={refetchGoal}
        />
        <WeeklyTodoList goal={goal} currentWeekIndex={selectedWeekIndex} onWeekChange={handleWeekChange} />
      </div>
    </>
  );
};
