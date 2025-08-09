import { AxiosError } from 'axios';
import { useCallback, useEffect, useState, createContext, useContext, ReactNode, createElement } from 'react';
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

interface GoalContextType {
  isLoading: boolean;
  goalList: Goal[];
  selectedGoal: Goal | null;
  selectedPlans: Goal['plans'];
  selectedGoalId: string;
  setSelectedGoalId: (id: string) => void;
  fetchGoal: (shouldThrow?: boolean) => Promise<void>;
}

const GoalContext = createContext<GoalContextType | null>(null);

interface GoalProviderProps {
  children: ReactNode;
}

export function GoalProvider({ children }: GoalProviderProps) {
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [goalList, setGoalList] = useState<Goal[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');

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

  useEffect(() => {
    if (goalList.length > 0 && !selectedGoalId) {
      setSelectedGoalId(goalList[0].id);
    }
  }, [goalList, selectedGoalId]);

  const selectedGoal = goalList.find(goal => goal.id === selectedGoalId) || null;
  const selectedPlans = selectedGoal?.plans || [];

  const value: GoalContextType = {
    isLoading,
    goalList,
    selectedGoal,
    selectedPlans,
    selectedGoalId,
    setSelectedGoalId,
    fetchGoal,
  };

  return createElement(GoalContext.Provider, { value }, children);
}

export function useGoalSelector() {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoalSelector must be used within a GoalProvider');
  }
  return context;
}
