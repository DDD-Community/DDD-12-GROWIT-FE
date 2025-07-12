'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { useFetchGetGoal, useFetchWeeklyTodoList } from './hooks';
import { usePlanSelector, WeeklyTodoList } from '@/feature/todo';
import { PlanSelector } from '@/feature/todo';
import { Goal } from '@/shared/type/goal';
import { AddToDo } from '@/feature/todo/addToDoButton/component';
import { AddRetroSpectButton } from '@/feature/retrospects';

// 확장된 Plan 타입 (weekOfMonth 포함)
interface ExtendedPlan {
  id: string;
  content: string;
  weekOfMonth?: number;
}

// 확장된 Goal 타입
interface ExtendedGoal extends Omit<Goal, 'plans'> {
  plans: ExtendedPlan[];
}

export const WeeklyPlanBoard = () => {
  const { isLoading, goal, plans } = useFetchGetGoal();
  if (!plans.length) return null;

  return <PlanSelector.Provider plans={plans}>{goal && <WeeklyPlanBoardInner goal={goal} />}</PlanSelector.Provider>;
};

const WeeklyPlanBoardInner = ({ goal }: { goal: ExtendedGoal }) => {
  const { selectedPlanId, selectedPlanContent, selectedWeekIndex } = usePlanSelector();
  const { data: weeklyTodos } = useFetchWeeklyTodoList({
    goalId: goal?.id || '',
    planId: selectedPlanId,
  });

  // 완료율 계산
  const { percent, total, done } = useMemo(() => {
    if (!weeklyTodos) return { percent: 0, total: 0, done: 0 };
    const todos = Object.values(weeklyTodos).flat();
    const total = todos.length;
    const done = todos.filter(t => t.isCompleted).length;
    return { percent: total ? Math.round((done / total) * 100) : 0, total, done };
  }, [weeklyTodos]);

  return (
    <div className="flex flex-col min-h-[300px] w-full gap-[24px]">
      {/* 상단 바 */}
      <div className="flex items-center justify-between pb-4 border-b-[1px] border-b-[#70737C52]">
        <div className="flex items-center gap-2">
          <Image src="/icon/growit-calendar.svg" alt="icon of growit" width={24} height={24} />
          <span className="text-lg font-bold text-label-normal">주간 플랜</span>
        </div>
        <div className="flex items-center gap-2">
          <PlanSelector.Selector />
          <AddToDo goal={goal} />
        </div>
      </div>
      {/* 목표/플랜/진행률 */}
      {goal && (
        <div className="flex items-center gap-4 px-6 py-[17px] rounded-2xl bg-[#37383C47]">
          <div className="flex gap-[12px] items-center">
            <span className="text-[#C2C4C8E0] text-[14px] font-[500]">이번주 목표</span>
            <div className="bg-[#70737C52] h-[16px] w-[1px]"></div>
            <span className="text-white text-[16px] font-[700]">‘{selectedPlanContent}’</span>
            <AddRetroSpectButton goal={goal} currentWeekIndex={selectedWeekIndex} />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <div className="w-full h-2 bg-fill-normal rounded">
              <div className="h-2 bg-accent-violet rounded" style={{ width: percent + '%' }} />
            </div>
            <span className="text-label-normal text-xs">{percent}%</span>
          </div>
        </div>
      )}
      {/* 요일별 컬럼 */}
      {weeklyTodos && <WeeklyTodoList weeklyTodos={weeklyTodos} goal={goal} currentWeekIndex={selectedWeekIndex} />}
    </div>
  );
};
