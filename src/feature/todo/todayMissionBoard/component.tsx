'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { TodayMissionItem } from './components/TodayMissionItem';
import { useTodayTodoListState } from '@/models/todo/todayTodoList/context';
import Badge from '@/shared/components/display/Badge';

export const TodayMissionBoard = () => {
  const { todayTodoList, isLoading, error } = useTodayTodoListState();
  const missionCount = useMemo(() => todayTodoList?.length || 0, [todayTodoList]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex flex-col bg-elevated-assistive border-line-normal rounded-xl p-6 min-h-[120px] animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-gray-700 rounded-full" />
          <div className="w-24 h-4 bg-gray-700 rounded" />
        </div>
        <div className="w-full h-5 bg-gray-700 rounded mb-2" />
        <div className="w-2/3 h-5 bg-gray-700 rounded" />
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex flex-col bg-elevated-assistive border-line-normal rounded-xl p-6 min-h-[120px]">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  // 미션이 없을 때
  if (!todayTodoList || todayTodoList.length === 0) {
    return (
      <div className="flex flex-col bg-elevated-assistive rounded-xl border-[1px] border-line-normal p-6 min-h-[120px] items-center justify-center gap-4">
        <div className="flex items-center gap-2 mb-2 w-full">
          <Image src="/icon/growit-check.svg" alt="icon of growit" width={24} height={24} />
          <span className="text-lg font-semibold text-label-normal flex items-center gap-2">오늘의 미션</span>
        </div>
        <div className="flex flex-col items-center w-full gap-2 py-8">
          <div className="flex gap-[4px]">
            <Image src="/icon/growit-search-empty.svg" alt="icon of growit" width={24} height={24} />
            <span className="text-label-alternative font-medium">미션 없음</span>
          </div>
          <span className="text-label-alternative text-sm">투두를 생성해주세요</span>
        </div>
      </div>
    );
  }

  // 미션이 있을 때
  return (
    <div className="flex flex-col bg-elevated-assistive border-line-normal rounded-xl p-6 min-h-[120px]">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg font-semibold text-label-alternative flex-1 flex items-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1110 3.5a6.5 6.5 0 010 13z" fill="#B9B9BB" />
          </svg>
          오늘의 미션
        </span>
      </div>
      <ul className="flex flex-col gap-3">
        {todayTodoList.map(todoItem => (
          <TodayMissionItem key={todoItem.id} todo={todoItem} />
        ))}
      </ul>
    </div>
  );
};
