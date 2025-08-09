'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { getWeeklyTodoList, type TodoWeeklyListRequest } from './api';
import { useGoalSelector } from '@/models/goal/context';
import { usePlanSelector } from '@/models/todo/planSelector/hooks';

interface TodoBoardContextValue {
  // fetch 결과
  weeklyTodos: Record<DAY_OF_THE_WEEK, Todo[]> | null;
  isLoading: boolean;
  error: string | null;
  fetchWeeklyTodos: (params: TodoWeeklyListRequest) => Promise<void>;

  // 파생 상태 및 제어 함수
  todoList: Record<DAY_OF_THE_WEEK, Todo[]> | null;
  toggleTodoStatus: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  addTodo: (dayOfWeek: DAY_OF_THE_WEEK, newTodo: Todo) => void;
  removeTodo: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  updateTodo: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string, updates: Partial<Todo>) => void;
  getTodosByDay: (dayOfWeek: DAY_OF_THE_WEEK) => Todo[];
  resetTodoList: (newData: Record<DAY_OF_THE_WEEK, Todo[]> | null) => void;
}

const TodoBoardContext = createContext<TodoBoardContextValue | undefined>(undefined);

export function TodoListProvider({ children }: { children: React.ReactNode }) {
  const { selectedGoal } = useGoalSelector();
  const { selectedPlanId } = usePlanSelector();

  const [weeklyTodos, setWeeklyTodos] = useState<Record<DAY_OF_THE_WEEK, Todo[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 파생 상태 (UI용 가공 리스트)
  const [todoList, setTodoList] = useState<Record<DAY_OF_THE_WEEK, Todo[]> | null>(null);

  const fetchWeeklyTodos = useCallback(async (params: TodoWeeklyListRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getWeeklyTodoList(params);
      setWeeklyTodos(result);
      setTodoList(result);
    } catch (err: any) {
      setError(err?.message || '주간 할 일 목록을 불러오지 못했습니다.');
      setWeeklyTodos(null);
      setTodoList(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 초기 로드 및 의존성 변경 시 재조회
  useEffect(() => {
    const goalId = selectedGoal?.id;
    const planId = selectedPlanId;
    if (goalId && planId) {
      fetchWeeklyTodos({ goalId, planId });
    }
  }, [selectedGoal?.id, selectedPlanId, fetchWeeklyTodos]);

  // 파생 상태 제어 함수들
  const toggleTodoStatus = useCallback((dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => {
    setTodoList(prev => {
      if (!prev) return prev;
      const updated = { ...prev };
      const dayTodos = updated[dayOfWeek] || [];
      updated[dayOfWeek] = dayTodos.map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      return updated;
    });
  }, []);

  const addTodo = useCallback((dayOfWeek: DAY_OF_THE_WEEK, newTodo: Todo) => {
    setTodoList(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [dayOfWeek]: [...(prev[dayOfWeek] || []), newTodo],
      };
    });
  }, []);

  const removeTodo = useCallback((dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => {
    setTodoList(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [dayOfWeek]: (prev[dayOfWeek] || []).filter(todo => todo.id !== todoId),
      };
    });
  }, []);

  const updateTodo = useCallback((dayOfWeek: DAY_OF_THE_WEEK, todoId: string, updates: Partial<Todo>) => {
    setTodoList(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [dayOfWeek]: (prev[dayOfWeek] || []).map(todo => (todo.id === todoId ? { ...todo, ...updates } : todo)),
      };
    });
  }, []);

  const getTodosByDay = useCallback((dayOfWeek: DAY_OF_THE_WEEK) => todoList?.[dayOfWeek] || [], [todoList]);

  const resetTodoList = useCallback((newData: Record<DAY_OF_THE_WEEK, Todo[]> | null) => {
    setTodoList(newData);
  }, []);

  const value: TodoBoardContextValue = useMemo(
    () => ({
      weeklyTodos,
      isLoading,
      error,
      fetchWeeklyTodos,
      todoList,
      toggleTodoStatus,
      addTodo,
      removeTodo,
      updateTodo,
      getTodosByDay,
      resetTodoList,
    }),
    [
      weeklyTodos,
      isLoading,
      error,
      fetchWeeklyTodos,
      todoList,
      toggleTodoStatus,
      addTodo,
      removeTodo,
      updateTodo,
      getTodosByDay,
      resetTodoList,
    ]
  );

  return <TodoBoardContext.Provider value={value}>{children}</TodoBoardContext.Provider>;
}

function useTodoBoard() {
  const ctx = useContext(TodoBoardContext);
  if (!ctx) throw new Error('useTodoBoard must be used within TodoListProvider');
  return ctx;
}

// 읽기 전용 상태 훅
export function useTodoBoardState() {
  const ctx = useTodoBoard();
  const { weeklyTodos, isLoading, error, todoList, getTodosByDay } = ctx;
  return { weeklyTodos, isLoading, error, todoList, getTodosByDay };
}

// 액션 전용 훅
export function useTodoBoardActions() {
  const ctx = useTodoBoard();
  const { fetchWeeklyTodos, toggleTodoStatus, addTodo, removeTodo, updateTodo, resetTodoList } = ctx;
  return { fetchWeeklyTodos, toggleTodoStatus, addTodo, removeTodo, updateTodo, resetTodoList };
}
