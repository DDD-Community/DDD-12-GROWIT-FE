import { useCallback, useEffect, useState } from 'react';
import { getWeeklyTodoList } from './api';
import type { TodoWeeklyListRequest } from './api';
import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { Todo } from '@/shared/type/Todo';

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
    weeklyTodos: data,
    isLoading,
    error,
    fetchWeeklyTodoList,
  };
}

// 주간 투두 목록의 파생 상태를 관리하는 Hook
export function useWeeklyTodoListState(initialData: Record<DAY_OF_THE_WEEK, Todo[]> | null) {
  const [todoList, setTodoList] = useState<Record<DAY_OF_THE_WEEK, Todo[]> | null>(initialData);

  // 주의! initialData 는 함수로 전달할 것
  useEffect(() => {
    setTodoList(() => initialData);
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

export function useDesktopWeekendToggle() {
  const [showWeekend, setShowWeekend] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  if (!isInitialized) {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0: 일요일, 6: 토요일
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    setShowWeekend(isWeekend);
    setIsInitialized(true);
  }

  const toggleWeekend = useCallback((show: boolean) => {
    setShowWeekend(show);
  }, []);

  return {
    showWeekend,
    toggleWeekend,
  };
}