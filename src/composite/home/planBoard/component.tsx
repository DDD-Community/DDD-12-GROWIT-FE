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

export const WeeklyPlanBoard = () => {
  const { selectedGoal } = useGoalSelector();
  if (!selectedGoal) return null;
  return <WeeklyPlanBoardInner goal={selectedGoal} />;
};

const WeeklyPlanBoardInner = ({ goal }: { goal: Goal }) => {
  const { todoList } = useTodoBoardState();
  const { toggleWeekend } = useDesktopWeekendToggle();
  const { refetchTodayList } = useTodayTodoListActions();
  const { fetchWeeklyTodos, toggleTodoStatus } = useTodoBoardActions();
  const { selectedPlanId, selectedPlanContent, selectedWeekIndex, setSelectedPlanId } = usePlanSelector();

  const handleRefreshTodoList = useCallback(() => {
    if (goal?.id && selectedPlanId) {
      fetchWeeklyTodos({ goalId: goal.id, planId: selectedPlanId });
      refetchTodayList();
    }
  }, [goal?.id, selectedPlanId, fetchWeeklyTodos, refetchTodayList]);

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

  const handleEdit = useCallback(
    (updatedTodo: Todo) => {
      handleRefreshTodoList();

      if (updatedTodo.date) {
        const todoDate = new Date(updatedTodo.date);
        const goalStartDate = new Date(goal.duration.startDate);

        const timeDiff = todoDate.getTime() - goalStartDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const weekOfMonth = Math.floor(daysDiff / 7) + 1;

        if (weekOfMonth !== selectedWeekIndex && weekOfMonth >= 1 && weekOfMonth <= goal.plans.length) {
          handleWeekChange(weekOfMonth);
        }
      }
    },
    [handleRefreshTodoList, goal.duration.startDate, goal.plans.length, selectedWeekIndex, handleWeekChange]
  );

  const handleDelete = useCallback(
    (deletedTodo: Todo) => {
      handleRefreshTodoList();

      if (deletedTodo.date) {
        const todoDate = new Date(deletedTodo.date);
        const goalStartDate = new Date(goal.duration.startDate);
        const timeDiff = todoDate.getTime() - goalStartDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const weekOfMonth = Math.floor(daysDiff / 7) + 1;

        if (weekOfMonth !== selectedWeekIndex && weekOfMonth >= 1 && weekOfMonth <= goal.plans.length) {
          handleWeekChange(weekOfMonth);
        }
      }
    },
    [handleRefreshTodoList, goal.duration.startDate, goal.plans.length, selectedWeekIndex, handleWeekChange]
  );

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
          selectedPlanContent={selectedPlanContent}
          selectedPlanIndex={selectedWeekIndex}
          onSubmit={() => {}}
        />
        {todoList && (
          <WeeklyTodoList
            weeklyTodos={todoList}
            goal={goal}
            currentWeekIndex={selectedWeekIndex}
            onToggleTodo={handleToggleTodo}
            refreshTodoList={handleRefreshTodoList}
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
