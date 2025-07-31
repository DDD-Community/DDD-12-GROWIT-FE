import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getGoalList, getWeeklyTodoList } from './api';
import type { TodoWeeklyListRequest } from './api';
import { Goal } from '@/shared/type/goal';

import { CommonError } from '@/shared/type/response';
import { useToast } from '@/shared/components/feedBack/toast';
import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { Todo } from '@/shared/type/Todo';

export function useFetchGetGoal() {
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [goalList, setGoalList] = useState<Goal[]>([]);
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
export function useGoalSelector(goalList: Goal[]) {
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

export function useAutoGoOnboarding(isLoading: boolean, goalList: Goal[]) {
  const router = useRouter();
  // goal이 없고 로딩이 끝났으며, 온보딩 기록이 없으면 온보딩 페이지로 이동
  useEffect(() => {
    if (!isLoading && goalList.length === 0) {
      // const onboardingVisited = typeof window !== 'undefined' && localStorage.getItem('onboarding_visited_at');
      // if (!onboardingVisited) {
      //   router.replace('/onboarding');
      // }
      router.replace('/onboarding'); // 임시로 온보딩 페이지로 이동
    } else {
      router.replace('/home'); // 임시로 온보딩 페이지로 이동
    }
  }, [isLoading, goalList]);
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

// 주간 투두 목록의 파생 상태를 관리하는 Hook
export function useWeeklyTodoListState(initialData: Record<DAY_OF_THE_WEEK, Todo[]> | null) {
  const [todoList, setTodoList] = useState<Record<DAY_OF_THE_WEEK, Todo[]> | null>(initialData);

  // 초기 데이터가 변경되면 상태 업데이트
  useEffect(() => {
    setTodoList(initialData);
  }, [initialData]);

  // 투두 체크 상태 토글
  const toggleTodoStatus = useCallback(
    (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => {
      if (!todoList) return;

      setTodoList(prev => {
        if (!prev) return prev;

        const dayTodos = prev[dayOfWeek] || [];
        const updatedDayTodos = dayTodos.map(todo =>
          todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );

        return {
          ...prev,
          [dayOfWeek]: updatedDayTodos,
        };
      });
    },
    [todoList]
  );

  // 투두 추가
  const addTodo = useCallback((dayOfWeek: DAY_OF_THE_WEEK, newTodo: Todo) => {
    setTodoList(prev => {
      if (!prev) return prev;

      const dayTodos = prev[dayOfWeek] || [];
      return {
        ...prev,
        [dayOfWeek]: [...dayTodos, newTodo],
      };
    });
  }, []);

  // 투두 삭제
  const removeTodo = useCallback((dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => {
    setTodoList(prev => {
      if (!prev) return prev;

      const dayTodos = prev[dayOfWeek] || [];
      const updatedDayTodos = dayTodos.filter(todo => todo.id !== todoId);

      return {
        ...prev,
        [dayOfWeek]: updatedDayTodos,
      };
    });
  }, []);

  // 투두 수정
  const updateTodo = useCallback((dayOfWeek: DAY_OF_THE_WEEK, todoId: string, updates: Partial<Todo>) => {
    setTodoList(prev => {
      if (!prev) return prev;

      const dayTodos = prev[dayOfWeek] || [];
      const updatedDayTodos = dayTodos.map(todo => (todo.id === todoId ? { ...todo, ...updates } : todo));

      return {
        ...prev,
        [dayOfWeek]: updatedDayTodos,
      };
    });
  }, []);

  // 특정 요일의 투두 목록 가져오기
  const getTodosByDay = useCallback(
    (dayOfWeek: DAY_OF_THE_WEEK) => {
      return todoList?.[dayOfWeek] || [];
    },
    [todoList]
  );

  // 모든 투두 목록 가져오기
  const getAllTodos = useCallback(() => {
    return todoList;
  }, [todoList]);

  // 상태 초기화
  const resetTodoList = useCallback((newData: Record<DAY_OF_THE_WEEK, Todo[]> | null) => {
    setTodoList(newData);
  }, []);

  return {
    todoList,
    toggleTodoStatus,
    addTodo,
    removeTodo,
    updateTodo,
    getTodosByDay,
    getAllTodos,
    resetTodoList,
  };
}
