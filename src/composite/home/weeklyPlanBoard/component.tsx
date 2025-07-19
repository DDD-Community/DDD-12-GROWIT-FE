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
  const handleEdit = (todo: Todo) => {
    // TODO: 편집 모달 열기 로직 구현
    console.log('Edit todo:', todo);
  };

  // Todo 삭제 핸들러
  const handleDelete = (todo: Todo) => {
    // TODO: 삭제 모달 열기 로직 구현
    console.log('Delete todo:', todo);
  };

  // Todo 상태 토글 핸들러 (모바일용)
  const handleToggleTodo = (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => {
    // 기존 toggleTodoStatus와 동일한 로직 사용
    toggleTodoStatus(dayOfWeek, todoId);
  };

  return (
    <div className="flex flex-col min-h-[300px] w-full gap-[24px]">
      {/* 상단 바 */}
      <div className="flex items-center justify-between pb-4 border-b-[1px] border-b-[#70737C52]">
        <div className="flex items-center gap-2">
          <Image src="/icon/growit-calendar.svg" alt="icon of growit" width={24} height={24} />
          <span className="text-lg font-bold text-label-normal w-[130px]">주간 플랜</span>
        </div>
        <div className="flex items-center gap-2">
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
            />
          </div>
        </>
      )}
    </div>
  );
};
