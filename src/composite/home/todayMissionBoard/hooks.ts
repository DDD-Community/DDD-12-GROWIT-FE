import { useState, useEffect, useCallback } from 'react';
import { getTodayMissionList } from './api';
import { Todo } from '@/shared/type/Todo';

export function useTodayMissionList() {
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

  useEffect(() => {
    fetchTodayMissionList();
  }, [fetchTodayMissionList]);

  return {
    data,
    isLoading,
    error,
    fetchTodayMissionList,
  };
}
