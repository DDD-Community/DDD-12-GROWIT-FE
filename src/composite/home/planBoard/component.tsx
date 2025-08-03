'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { PlanSelector } from '@/feature/todo';
import { WeeklyGoalProgress } from '@/feature/goal';
import { AddToDoModal } from '@/feature/todo/AddToDoModal/component';
import { TodayMissionBoard, usePlanSelector, WeeklyTodoList } from '@/feature/todo';
import { Todo, DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { Goal } from '@/shared/type/goal';
import { useFetchWeeklyTodoList, useWeeklyTodoListState } from './hooks';
import { useTodayMissionList } from '@/feature/todo/todayMissionBoard';
import { useGoalSelector, useRedirectToOnboarding } from '@/shared/hooks';
import { CreateNewGoal } from './components/CreateNewGoal';

export const PlanBoard = () => {
  const { isLoading, goalList, selectedGoal, selectedPlans } = useGoalSelector();

  useRedirectToOnboarding({
    isLoading,
    goalListLength: goalList.length,
  });

  if (goalList.length === 0) {
    return <CreateNewGoal />;
  }

  return (
    <PlanSelector.Provider plans={selectedPlans} goal={selectedGoal!}>
      {selectedGoal && <WeeklyPlanBoard goal={selectedGoal} />}
    </PlanSelector.Provider>
  );
};

const WeeklyPlanBoard = ({ goal }: { goal: Goal }) => {
  const [showWeekend, setShowWeekend] = useState(false);
  const { selectedPlanId, selectedPlanContent, selectedWeekIndex, setSelectedPlanId } = usePlanSelector();
  const { weeklyTodos, fetchWeeklyTodoList } = useFetchWeeklyTodoList({
    goalId: goal?.id || '',
    planId: selectedPlanId,
  });
  const { todoList, toggleTodoStatus } = useWeeklyTodoListState(weeklyTodos);
  const { fetchTodayMissionList, ...todayMissionStatus } = useTodayMissionList();

  const handleRefreshTodoList = useCallback(() => {
    if (goal?.id && selectedPlanId) {
      fetchWeeklyTodoList({ goalId: goal.id, planId: selectedPlanId });
      fetchTodayMissionList();
    }
  }, [goal?.id, selectedPlanId, fetchWeeklyTodoList, fetchTodayMissionList]);

  const handleWeekChange = useCallback(
    (weekOfMonth: number) => {
      const targetPlan = goal.plans.find(plan => plan.weekOfMonth === weekOfMonth);
      if (targetPlan) {
        setSelectedPlanId(targetPlan.id);
      }
    },
    [goal.plans, setSelectedPlanId]
  );

  const handleToggleWeekend = useCallback((showWeekend: boolean) => {
    setShowWeekend(showWeekend);
  }, []);

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
      fetchTodayMissionList();
    },
    [toggleTodoStatus, fetchTodayMissionList]
  );

  return (
    <>
      <TodayMissionBoard
        {...todayMissionStatus}
        goalStartDate={goal.duration.startDate}
        onToggleTodo={handleToggleTodo}
      />
      <div className="flex flex-col min-h-[300px] w-full gap-[24px]">
        <div className="flex items-center max-sm:flex-col max-sm:gap-2 max-sm:items-start justify-between pb-4 border-b-[1px] border-b-[#70737C52]">
          <div className="flex items-center gap-2">
            <Image src="/icon/growit-calendar.svg" alt="icon of growit" width={24} height={24} />
            <span className="text-lg font-bold text-label-normal w-[130px]">주간 플랜</span>
          </div>
          <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-between">
            <PlanSelector.Selector />
            <AddToDoModal
              goal={goal}
              selectedPlanId={selectedPlanId}
              onSuccessAddTodo={handleRefreshTodoList}
              onWeekChange={handleWeekChange}
              onToggleWeekend={handleToggleWeekend}
            />
          </div>
        </div>
        {goal && (
          <WeeklyGoalProgress
            goal={goal}
            selectedPlanContent={selectedPlanContent}
            selectedPlanId={selectedPlanId}
            selectedWeekIndex={selectedWeekIndex}
            todoList={todoList}
          />
        )}
        {todoList && (
          <>
            <div className="invisible sm:visible h-0 sm:h-auto overflow-hidden sm:overflow-visible">
              <WeeklyTodoList.Desktop
                weeklyTodos={todoList}
                goal={goal}
                currentWeekIndex={selectedWeekIndex}
                onToggleTodo={handleToggleTodo}
                showWeekend={showWeekend}
                onToggleWeekend={handleToggleWeekend}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
            <div className="visible sm:invisible sm:h-0 sm:overflow-hidden">
              <WeeklyTodoList.Mobile
                weeklyTodos={todoList}
                goal={goal}
                currentWeekIndex={selectedWeekIndex}
                onToggleTodo={handleToggleTodo}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onWeekChange={handleWeekChange}
                onToggleWeekend={handleToggleWeekend}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
