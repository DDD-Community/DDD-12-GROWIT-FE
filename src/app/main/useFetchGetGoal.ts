'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Goal, Plan } from '@/shared/type/goal';
import { CommonError } from '@/shared/type/response';
import { useToast } from '@/shared/components/toast';
import { getGoalList } from '@/app/main/api';

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
      const goalList = await getGoalList();

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
