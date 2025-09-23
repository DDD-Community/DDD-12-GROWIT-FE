'use client';

import { useCallback } from 'react';
import { usePlanSelector } from '@/model/todo/planSelector';
import { useTodoBoardActions } from '@/model/todo/todoList';
import { useTodayTodoListActions } from '@/model/todo/todayTodoList';
import { useGoalSelector } from '@/model/goal/context';
import { WeeklyTodoList } from '@/feature/todo/weeklyTodoList';
import { PlanSelect } from '@/model/todo/planSelector';
import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { Goal } from '@/shared/type/goal';
import { AddRetroSpectButton } from '@/feature/retrospects';
import { WeeklyGoalBoard } from '@/feature/goal/weeklyGoalBoard';

export const WeeklyPlanBoard = () => {
  const { currentGoal, refetchCurrentGoal } = useGoalSelector();
  if (!currentGoal) return null;
  return <WeeklyPlanBoardInner goal={currentGoal} refetchGoal={refetchCurrentGoal} />;
};

const WeeklyPlanBoardInner = ({ goal, refetchGoal }: { goal: Goal; refetchGoal: () => void }) => {
  const { refetchTodayList } = useTodayTodoListActions();
  const { toggleTodoStatus, refreshTodoList } = useTodoBoardActions();
  const { selectedPlanId, selectedPlanContent, selectedWeekIndex, setSelectedPlanId } = usePlanSelector();

  const handleRefreshGoal = useCallback(() => {
    refetchGoal();
  }, []);

  const handleRefreshTodoList = useCallback(() => {
    if (goal?.id && selectedPlanId) {
      refreshTodoList();
      refetchTodayList();
    }
  }, [goal?.id, selectedPlanId]);

  const handleWeekChange = useCallback(
    (weekOfMonth: number) => {
      const targetPlan = goal.plans.find(plan => plan.weekOfMonth === weekOfMonth);
      if (targetPlan) {
        setSelectedPlanId(targetPlan.id);
      }
    },
    [goal.plans, setSelectedPlanId]
  );

  const handleToggleTodo = useCallback(
    (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => {
      // 투두 상태 토글
      toggleTodoStatus(dayOfWeek, todoId);
      refetchTodayList();
    },
    [toggleTodoStatus, refetchTodayList]
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
        />
        <WeeklyTodoList
          goal={goal}
          currentWeekIndex={selectedWeekIndex}
          onRefreshTodoList={handleRefreshTodoList}
          onToggleTodo={handleToggleTodo}
          onWeekChange={handleWeekChange}
        />
      </div>
    </>
  );
};
