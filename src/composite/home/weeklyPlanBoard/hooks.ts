'use client';

import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getGoalList, getWeeklyTodoList } from './api';
import type { TodoWeeklyListRequest } from './api';
import { Goal } from '@/shared/type/goal';

// 확장된 Plan 타입 (weekOfMonth 포함)
export interface ExtendedPlan {
  id: string;
  content: string;
  weekOfMonth?: number;
}

// 확장된 Goal 타입
export interface ExtendedGoal extends Omit<Goal, 'plans'> {
  plans: ExtendedPlan[];
}

import { CommonError } from '@/shared/type/response';
import { useToast } from '@/shared/components/feedBack/toast';
import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { Todo } from '@/shared/type/Todo';

export function useFetchGetGoal() {
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [goalList, setGoalList] = useState<ExtendedGoal[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGoal();
  }, []);

  const fetchGoal = async (shouldThrow = false) => {
    try {
      setLoading(true);
      setError(null);

      const goals = await getGoalList();
      setGoalList(goals);

      setLoading(false);
    } catch (err) {
      const axiosError = err as AxiosError<CommonError>;
      let errorMessage = '목표를 불러오는데 실패했습니다.';

      if (axiosError.isAxiosError && axiosError.response?.data.message) {
        errorMessage = axiosError.response.data.message;
      }

      setError(errorMessage);
      setLoading(false);
      setGoalList([]);

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
    goalList,
    isLoading,
    error,
    fetchGoal,
    clearError,
  };
}

// Goal 선택을 위한 Hook
export function useGoalSelector(goalList: ExtendedGoal[]) {
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');

  // goalList가 변경되면 첫 번째 goal을 자동 선택
  useEffect(() => {
    if (goalList.length > 0 && !selectedGoalId) {
      setSelectedGoalId(goalList[0].id);
    }
  }, [goalList, selectedGoalId]);

  const selectedGoal = goalList.find(goal => goal.id === selectedGoalId) || null;
  const selectedPlans = selectedGoal?.plans || [];

  return {
    selectedGoalId,
    selectedGoal,
    selectedPlans,
    setSelectedGoalId,
  };
}

export function useAutoGoOnboarding(isLoading: boolean, goalList: ExtendedGoal[]) {
  const router = useRouter();
  // goal이 없고 로딩이 끝났으며, 온보딩 기록이 없으면 온보딩 페이지로 이동
  useEffect(() => {
    if (!isLoading && goalList.length === 0) {
      const onboardingVisited = typeof window !== 'undefined' && localStorage.getItem('onboarding_visited_at');
      if (!onboardingVisited) {
        router.replace('/onboarding');
      }
    }
  }, [isLoading, goalList, router]);
}

export function useFetchWeeklyTodoList({ goalId, planId }: TodoWeeklyListRequest) {
  const [data, setData] = useState<Record<DAY_OF_THE_WEEK, Todo[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeeklyTodoList = useCallback(async (params: TodoWeeklyListRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getWeeklyTodoList(params);
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
