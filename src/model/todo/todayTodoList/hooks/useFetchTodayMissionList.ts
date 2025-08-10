import { useCallback, useEffect, useState } from 'react';
import { getTodayMissionList } from '../api/api';
import { Todo } from '@/shared/type/Todo';

export function useFetchTodayMissionList() {
  const [data, setData] = useState<Todo[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodayMissionList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getTodayMissionList();
      setData(result);
    } catch (err: any) {
      setError(err?.message || '오늘 할 일 목록을 불러오지 못했습니다.');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchTodayMissionList();
  }, [fetchTodayMissionList]);

  useEffect(() => {
    fetchTodayMissionList();
  }, [fetchTodayMissionList]);

  return {
    todayTodoList: data,
    isLoading,
    error,
    fetchTodayMissionList,
    refetch,
  };
}
