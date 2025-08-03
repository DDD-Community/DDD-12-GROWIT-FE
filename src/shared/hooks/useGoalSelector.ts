import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Goal } from '@/shared/type/goal';
import { CommonError } from '@/shared/type/response';
import { useToast } from '@/shared/components/feedBack/toast';
import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface GoalListResponse extends CommonResponse<Goal[]> {}

async function getGoalList() {
  const { data } = await apiClient.get<GoalListResponse>('/goals');
  return data.data;
}

function useFetchGoalList() {
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [goalList, setGoalList] = useState<Goal[]>([]);

  const fetchGoal = useCallback(
    async (shouldThrow = false) => {
      try {
        setLoading(true);

        const goals = await getGoalList();
        setGoalList(goals);

        setLoading(false);
      } catch (err) {
        const axiosError = err as AxiosError<CommonError>;
        let errorMessage = '목표를 불러오는데 실패했습니다.';

        if (axiosError.isAxiosError && axiosError.response?.data.message) {
          errorMessage = axiosError.response.data.message;
        }

        setLoading(false);
        setGoalList([]);

        if (!shouldThrow) {
          showToast(errorMessage);
        }

        if (shouldThrow) {
          throw new Error(errorMessage);
        }
      }
    },
    [showToast]
  );

  useEffect(() => {
    fetchGoal();
  }, [fetchGoal]);

  return {
    goalList,
    isLoading,
    fetchGoal,
  };
}

export function useGoalSelector() {
  const { goalList, isLoading, fetchGoal } = useFetchGoalList();
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');

  useEffect(() => {
    if (goalList.length > 0 && !selectedGoalId) {
      setSelectedGoalId(goalList[0].id);
    }
  }, [goalList, selectedGoalId]);

  const selectedGoal = goalList.find(goal => goal.id === selectedGoalId) || null;
  const selectedPlans = selectedGoal?.plans || [];

  return {
    isLoading,

    goalList,
    selectedGoal,
    selectedPlans,
    selectedGoalId,

    setSelectedGoalId,
    fetchGoal,
  };
}
