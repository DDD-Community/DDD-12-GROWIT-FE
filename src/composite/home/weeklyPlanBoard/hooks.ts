'use client';

import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getGoalList, getWeeklyTodoList } from './api';
import type { TodoWeeklyListRequest } from './api';
import { Goal, Plan } from '@/shared/type/goal';
import { CommonError } from '@/shared/type/response';
import { useToast } from '@/shared/components/feedBack/toast';
import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { Todo } from '@/shared/type/Todo';
import { todoMock } from '@/feature/mock';
import { mockGoals } from '@/mocks/domain/todo';

export function useFetchGetGoal() {
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGoal();
  }, []);

  const fetchGoal = async (shouldThrow = false) => {
    try {
      setLoading(true);
      setError(null);

      // const goalList = await getGoalList();
      const goalList = await todoMock.getGoals();

      // 첫 번째 goal을 가져오거나 null 처리
      const firstGoal = goalList.length > 0 ? goalList[0] : null;
      setGoal(firstGoal);

      // plans 데이터 별도 설정
      if (firstGoal) {
        setPlans(firstGoal.plans);
      } else {
        setPlans([]);
      }

      setLoading(false);
    } catch (err) {
      const axiosError = err as AxiosError<CommonError>;
      let errorMessage = '목표를 불러오는데 실패했습니다.';

      if (axiosError.isAxiosError && axiosError.response?.data.message) {
        errorMessage = axiosError.response.data.message;
      }

      setError(errorMessage);
      setLoading(false);
      setGoal(null);
      setPlans([]);

      // 토스트 메시지 표시 (shouldThrow가 false일 때만)
      if (!shouldThrow) {
        showToast(errorMessage);
      }

      // shouldThrow가 true이면 에러를 다시 throw
      if (shouldThrow) {
        throw new Error(errorMessage);
      }
    }
  };

  // 에러 상태 초기화
  const clearError = () => {
    setError(null);
  };

  return {
    goal,
    plans,
    isLoading,
    error,
    fetchGoal,
    clearError,
  };
}

export function useAutoGoOnboarding(isLoading: boolean, goal: Goal | null) {
  const router = useRouter();
  // goal이 없고 로딩이 끝났으며, 온보딩 기록이 없으면 온보딩 페이지로 이동
  useEffect(() => {
    if (!isLoading && !goal) {
      const onboardingVisited = typeof window !== 'undefined' && localStorage.getItem('onboarding_visited_at');
      if (!onboardingVisited) {
        router.replace('/onboarding');
      }
    }
  }, [isLoading, goal, router]);
}

export function useFetchWeeklyTodoList({ goalId, planId }: TodoWeeklyListRequest) {
  const [data, setData] = useState<Record<DAY_OF_THE_WEEK, Todo[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeeklyTodoList = useCallback(async (params: TodoWeeklyListRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      // const result = await getWeeklyTodoList(params);
      const result = await todoMock.getWeeklyTodoList(params);
      setData(result);
    } catch (err: any) {
      setError(err?.message || '주간 할 일 목록을 불러오지 못했습니다.');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (goalId && planId) {
      fetchWeeklyTodoList({ goalId, planId });
    }
  }, [goalId, planId, fetchWeeklyTodoList]);

  return {
    data,
    isLoading,
    error,
    fetchWeeklyTodoList,
  };
}
