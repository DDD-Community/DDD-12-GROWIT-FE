'use client';

import { CircularProgress } from '@/shared/components/display/CircluarProgress';
import FlexBox from '@/shared/components/foundation/FlexBox';
import Button from '@/shared/components/input/Button';
import { useRouter, useParams } from 'next/navigation';
import Checkbox from '@/shared/components/input/Checkbox';
import { useEffect, useState } from 'react';
import { getGoalById, getWeeklyTodos, WeeklyTodosData } from '../api';
import { Goal } from '@/shared/type/goal';
import { useWeeklyTodos } from '../hooks/useWeeklyTodos';

export const LastWeeklyPlans = () => {
  const router = useRouter();
  const goalId = useParams<{ id: string }>().id;
  const [goal, setGoal] = useState<Goal | null>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [totalWeeklyTodos, setTotalWeeklyTodos] = useState<WeeklyTodosData[]>([]); // 모든 주차의 todos를 담는 상태
  const { weeklyStates, selectedDay, setSelectedDay, selectedDayTodos, handleWeekChange, currentWeek } = useWeeklyTodos(
    totalWeeklyTodos,
    plans
  );

  const getAllWeeklyTodos = async (goalId: string, plansData: any[]) => {
    // 모든 주차 데이터를 병렬로 가져오기
    const allWeeklyTodos = await Promise.all(
      plansData.map(async plan => {
        try {
          const todoResponse = await getWeeklyTodos(goalId, plan.id);
          return todoResponse.data;
        } catch (error) {
          console.error(`Failed to fetch todos for plan ${plan.id}:`, error);
          return {};
        }
      })
    );
    return allWeeklyTodos;
  };

  useEffect(() => {
    const initData = async () => {
      const res = await getGoalById(goalId);
      const goalData = res.data;
      setGoal(goalData);
      setPlans([]);

      const weeklyTodos = await getAllWeeklyTodos(goalId, []);
      setTotalWeeklyTodos(weeklyTodos);
    };
    initData();
  }, []);

  return (
    <>
      <FlexBox className="w-full justify-center pb-4">
        <button onClick={() => router.back()} className="cursor-pointer">
          <svg
            width="14"
            height="14"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180"
          >
            <path
              d="M1.5 11L6.5 6L1.5 1"
              stroke="white"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="title-3-bold text-label-normal px-4 py-4 md:p-5">지난 주간 플랜</h1>
      </FlexBox>

      <FlexBox direction="col" className="gap-4 text-primary-normal">
        <FlexBox className="gap-4 font-semibold">
          <Button
            onClick={() => handleWeekChange(-1)}
            variant="tertiary"
            layout="icon-only"
            size="xl"
            icon={
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180"
              >
                <path
                  d="M1.5 11L6.5 6L1.5 1"
                  stroke={`white`}
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <span className="body-1-normal">{currentWeek}주차</span>
          <Button
            onClick={() => handleWeekChange(1)}
            variant="tertiary"
            layout="icon-only"
            size={'xl'}
            icon={
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.5 11L6.5 6L1.5 1"
                  stroke="white"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </FlexBox>
        <FlexBox className="gap-4 w-full">
          <div className="flex-1 border border-line-normal rounded-lg bg-normal-assistive py-4 px-5">
            <p className="label-2-bold text-label-alternative">주차 목표</p>
            {goal && <p className="body-1-normal text-label-normal">'{goal.name}'</p>}
          </div>
          <div className="flex-1 border border-line-normal rounded-lg bg-normal-assistive py-4 px-5">
            <p className="label-2-bold text-label-alternative">주차 완료율</p>
            <p className="body-1-bold text-brand-neon">{weeklyStates[0].progress}%</p>
          </div>
        </FlexBox>
        <FlexBox className="w-full justify-between">
          {weeklyStates.map(state => (
            <FlexBox key={state.korDay} direction="col" className={`gap-1`}>
              <CircularProgress
                progress={state.progress}
                dayOfWeek={state.korDay}
                isSelected={selectedDay === state.korDay}
                onClick={() => setSelectedDay(state.korDay)}
              />
              <span
                className={`caption-1-bold ${selectedDay === state.korDay ? 'text-white' : 'text-label-alternative'}`}
              >
                {state.dateString}
              </span>
            </FlexBox>
          ))}
        </FlexBox>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-between gap-8 bg-normal-assistive border border-line-normal py-5 px-4 rounded-lg text-sm">
          {/* 선택된 요일의 todo 리스트 */}
          {selectedDay ? (
            selectedDayTodos.length > 0 ? (
              selectedDayTodos.map(todo => (
                <FlexBox key={todo.id} className="gap-2 cursor-pointer">
                  <Checkbox checked={todo.isCompleted} readOnly />
                  <p
                    className={`text-sm ${todo.isCompleted ? 'text-label-alternative line-through' : 'text-label-normal'}`}
                  >
                    {todo.content}
                  </p>
                </FlexBox>
              ))
            ) : (
              <p className="text-label-alternative">{selectedDay}요일에 등록된 할 일이 없습니다.</p>
            )
          ) : (
            <p className="text-label-alternative">요일을 선택하면 해당 요일의 할 일을 확인할 수 있습니다.</p>
          )}
        </div>
      </FlexBox>
    </>
  );
};
