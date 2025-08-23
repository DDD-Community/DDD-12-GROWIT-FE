'use client';

import { useCallback } from 'react';
import { usePlanSelector } from '@/model/todo/planSelector';
import { useTodoBoardActions, useTodoBoardState } from '@/model/todo/todoList';
import { useTodayTodoListActions } from '@/model/todo/todayTodoList';
import { useGoalSelector } from '@/model/goal/context';
import { WeeklyTodoList } from '@/feature/todo/weeklyTodoList';
import { PlanSelect } from '@/model/todo/planSelector';
import { Todo, DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { useDesktopWeekendToggle } from './hooks';
import { Goal } from '@/shared/type/goal';
import { AddPlanModal } from '@/feature/plan/addPlanModal';
import { AddRetroSpectButton } from '@/feature/retrospects';
import { useSelectedDay } from '@/model/todo/selectedDay';

export const WeeklyPlanBoard = () => {
  const { currentGoal, refetchCurrentGoal } = useGoalSelector();
  if (!currentGoal) return null;
  return <WeeklyPlanBoardInner goal={currentGoal} refetchGoal={refetchCurrentGoal} />;
};

const WeeklyPlanBoardInner = ({ goal, refetchGoal }: { goal: Goal; refetchGoal: () => void }) => {
  const { todoList } = useTodoBoardState();
  const { toggleWeekend } = useDesktopWeekendToggle();
  const { refetchTodayList } = useTodayTodoListActions();
  const { updateDateInfo } = useSelectedDay();
  const { toggleTodoStatus, refreshTodoList } = useTodoBoardActions();
  const { selectedPlanId, selectedPlanContent, selectedWeekIndex, setSelectedPlanId, changePlanByDate } =
    usePlanSelector();

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

  const handleToggleWeekend = useCallback(
    (showWeekend: boolean) => {
      toggleWeekend(showWeekend);
    },
    [toggleWeekend]
  );

  const handleEdit = useCallback((updatedTodo: Todo) => {
    if (updatedTodo.date) {
      changePlanByDate(updatedTodo.date);
      updateDateInfo(updatedTodo.date);
      handleRefreshTodoList();
    }
  }, []);

  const handleDelete = useCallback((deletedTodo: Todo) => {
    if (deletedTodo.date) {
      changePlanByDate(deletedTodo.date);
      handleRefreshTodoList();
    }
  }, []);

  const handleToggleTodo = useCallback(
    (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => {
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
        <AddPlanModal
          goalId={goal.id}
          planId={selectedPlanId}
          selectedPlanContent={selectedPlanContent}
          selectedPlanIndex={selectedWeekIndex}
          onSuccessAddPlan={handleRefreshGoal}
        />
        {todoList && (
          <WeeklyTodoList
            weeklyTodos={todoList}
            goal={goal}
            currentWeekIndex={selectedWeekIndex}
            onToggleTodo={handleToggleTodo}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onWeekChange={handleWeekChange}
            onToggleWeekend={handleToggleWeekend}
          />
        )}
      </div>
    </>
  );
};
