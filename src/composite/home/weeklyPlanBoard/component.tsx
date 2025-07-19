'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  useAutoGoOnboarding,
  useFetchGetGoal,
  useFetchWeeklyTodoList,
  useGoalSelector,
  useWeeklyTodoListState,
} from './hooks';
import { usePlanSelector, WeeklyTodoList } from '@/feature/todo';
import { PlanSelector } from '@/feature/todo';
import { Goal } from '@/shared/type/goal';
import { AddToDo } from '@/feature/todo/addToDoButton/component';
import { WeeklyGoalProgress } from '@/feature/goal';
import { Todo, DAY_OF_THE_WEEK } from '@/shared/type/Todo';

export const WeeklyPlanBoard = () => {
  const { isLoading, goalList } = useFetchGetGoal();
  const { selectedGoal, selectedPlans } = useGoalSelector(goalList);

  useAutoGoOnboarding(isLoading, goalList);

  if (!selectedPlans.length) return null;

  return (
    <PlanSelector.Provider plans={selectedPlans}>
      {selectedGoal && <WeeklyPlanBoardInner goal={selectedGoal} />}
    </PlanSelector.Provider>
  );
};

const WeeklyPlanBoardInner = ({ goal }: { goal: Goal }) => {
  const { selectedPlanId, selectedPlanContent, selectedWeekIndex, setSelectedPlanId } = usePlanSelector();
  const { data: weeklyTodos, fetchWeeklyTodoList } = useFetchWeeklyTodoList({
    goalId: goal?.id || '',
    planId: selectedPlanId,
  });

  // 파생 상태로 투두 목록 관리
  const { todoList, toggleTodoStatus } = useWeeklyTodoListState(weeklyTodos);

  // 주말 표시 상태 관리
  const [showWeekend, setShowWeekend] = useState(false);

  // todo 목록 새로고침 함수
  const handleRefreshTodoList = () => {
    if (goal?.id && selectedPlanId) {
      fetchWeeklyTodoList({ goalId: goal.id, planId: selectedPlanId });
    }
  };

  // 주차 변경 함수
  const handleWeekChange = (weekOfMonth: number) => {
    // 해당 주차의 plan을 찾아서 선택
    const targetPlan = goal.plans.find(plan => plan.weekOfMonth === weekOfMonth);
    if (targetPlan) {
      setSelectedPlanId(targetPlan.id);
    }
  };

  // 주말 표시 토글 함수
  const handleToggleWeekend = (showWeekend: boolean) => {
    setShowWeekend(showWeekend);
  };

  // Todo 편집 핸들러
  const handleEdit = (updatedTodo: Todo) => {
    // Todo 수정 후 리스트 새로고침
    handleRefreshTodoList();

    // 수정된 Todo의 날짜가 다른 주차에 있다면 해당 주차로 이동
    if (updatedTodo.date) {
      const todoDate = new Date(updatedTodo.date);
      const goalStartDate = new Date(goal.duration.startDate);

      // 목표 시작일로부터 몇 주차인지 계산
      const timeDiff = todoDate.getTime() - goalStartDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const weekOfMonth = Math.floor(daysDiff / 7) + 1;

      // 현재 주차와 다르다면 해당 주차로 이동
      if (weekOfMonth !== selectedWeekIndex && weekOfMonth >= 1 && weekOfMonth <= goal.plans.length) {
        handleWeekChange(weekOfMonth);
      }
    }
  };

  // Todo 삭제 핸들러
  const handleDelete = (deletedTodo: Todo) => {
    // Todo 삭제 후 리스트 새로고침
    handleRefreshTodoList();

    // 삭제된 Todo의 날짜가 다른 주차에 있다면 해당 주차로 이동
    if (deletedTodo.date) {
      const todoDate = new Date(deletedTodo.date);
      const goalStartDate = new Date(goal.duration.startDate);

      // 목표 시작일로부터 몇 주차인지 계산
      const timeDiff = todoDate.getTime() - goalStartDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const weekOfMonth = Math.floor(daysDiff / 7) + 1;

      // 현재 주차와 다르다면 해당 주차로 이동
      if (weekOfMonth !== selectedWeekIndex && weekOfMonth >= 1 && weekOfMonth <= goal.plans.length) {
        handleWeekChange(weekOfMonth);
      }
    }
  };

  // Todo 상태 토글 핸들러 (모바일용)
  const handleToggleTodo = (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => {
    // 기존 toggleTodoStatus와 동일한 로직 사용
    toggleTodoStatus(dayOfWeek, todoId);
  };

  return (
    <div className="flex flex-col min-h-[300px] w-full gap-[24px]">
      {/* 상단 바 */}
      <div className="flex items-center max-sm:flex-col max-sm:gap-2 max-sm:items-start justify-between pb-4 border-b-[1px] border-b-[#70737C52]">
        <div className="flex items-center gap-2">
          <Image src="/icon/growit-calendar.svg" alt="icon of growit" width={24} height={24} />
          <span className="text-lg font-bold text-label-normal w-[130px]">주간 플랜</span>
        </div>
        <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-between">
          <PlanSelector.Selector />
          <AddToDo
            goal={goal}
            selectedPlanId={selectedPlanId}
            onSuccess={handleRefreshTodoList}
            onWeekChange={handleWeekChange}
            onToggleWeekend={handleToggleWeekend}
          />
        </div>
      </div>
      {/* 목표/플랜/진행률 */}
      {goal && (
        <WeeklyGoalProgress
          goal={goal}
          selectedPlanContent={selectedPlanContent}
          selectedPlanId={selectedPlanId}
          selectedWeekIndex={selectedWeekIndex}
          todoList={todoList}
        />
      )}
      {/* 요일별 컬럼 */}
      {todoList && (
        <>
          <div className="invisible sm:visible h-0 sm:h-auto overflow-hidden sm:overflow-visible">
            <WeeklyTodoList.Desktop
              weeklyTodos={todoList}
              goal={goal}
              currentWeekIndex={selectedWeekIndex}
              onToggleTodo={toggleTodoStatus}
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
  );
};
