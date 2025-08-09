'use client';

import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useFetchTodayMissionList } from './hooks/useFetchTodayMissionList';
import { usePatchTodoStatus } from './hooks/usePatchTodoStatus';
import { Todo } from '@/shared/type/Todo';

interface TodayTodoListContextValue {
  // state
  todayTodoList: Todo[] | null;
  isLoading: boolean;
  error: string | null;

  // actions
  refetchTodayList: () => Promise<void>;
  toggleTodoStatus: (todoId: string, isCompleted: boolean) => Promise<void>;
}

const TodayTodoListContext = createContext<TodayTodoListContextValue | undefined>(undefined);

export function TodayTodoListProvider({ children }: { children: React.ReactNode }) {
  const { todayTodoList, isLoading, error, refetch, fetchTodayMissionList } = useFetchTodayMissionList();
  const { mutate, isLoading: isMutating } = usePatchTodoStatus();

  const refetchTodayList = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const toggleTodoStatus = useCallback(
    async (todoId: string, isCompleted: boolean) => {
      await mutate(todoId, isCompleted);
      await fetchTodayMissionList();
    },
    [mutate, fetchTodayMissionList]
  );

  const value = useMemo(
    () => ({ todayTodoList, isLoading: isLoading || isMutating, error, refetchTodayList, toggleTodoStatus }),
    [todayTodoList, isLoading, isMutating, error, refetchTodayList, toggleTodoStatus]
  );

  return <TodayTodoListContext.Provider value={value}>{children}</TodayTodoListContext.Provider>;
}

// 읽기 전용 훅
export function useTodayTodoListState() {
  const ctx = useContext(TodayTodoListContext);
  if (!ctx) throw new Error('useTodayTodoListState must be used within TodayTodoListProvider');
  const { todayTodoList, isLoading, error } = ctx;
  return { todayTodoList, isLoading, error };
}

// 액션 훅
export function useTodayTodoListActions() {
  const ctx = useContext(TodayTodoListContext);
  if (!ctx) throw new Error('useTodayTodoListActions must be used within TodayTodoListProvider');
  const { refetchTodayList, toggleTodoStatus } = ctx;
  return { refetchTodayList, toggleTodoStatus };
}
