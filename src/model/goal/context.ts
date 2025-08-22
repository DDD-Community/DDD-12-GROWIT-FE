import { AxiosError } from 'axios';
import { useCallback, useEffect, useState, createContext, useContext, ReactNode, createElement } from 'react';
import { Goal } from '@/shared/type/goal';
import { CommonError } from '@/shared/type/response';
import { useToast } from '@/shared/components/feedBack/toast';
import { getGoalList, getCurrentProgressGoal } from './api';

interface GoalContextType {
  isLoading: boolean;
  goalList: Goal[];
  currentGoal: Goal | null;
  selectedGoal: Goal | null;
  selectedPlans: Goal['plans'];
  selectedGoalId: string;
  setSelectedGoalId: (id: string) => void;
  fetchGoalList: (shouldThrow?: boolean) => Promise<void>;
  fetchCurrentGoal: (shouldThrow?: boolean) => Promise<void>;
}

const GoalContext = createContext<GoalContextType | null>(null);

interface GoalProviderProps {
  children: ReactNode;
}

export function GoalProvider({ children }: GoalProviderProps) {
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [goalList, setGoalList] = useState<Goal[]>([]);
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');

  const fetchGoalList = useCallback(
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

  const fetchCurrentGoal = useCallback(
    async (shouldThrow = false) => {
      try {
        setLoading(true);

        const goals = await getCurrentProgressGoal();
        if (goals && goals.length > 0) {
          setCurrentGoal(goals[0]);
          setSelectedGoalId(goals[0].id);
        } else {
          setCurrentGoal(null);
        }

        setLoading(false);
      } catch (err) {
        const axiosError = err as AxiosError<CommonError>;
        let errorMessage = '현재 진행 중인 목표를 불러오는데 실패했습니다.';

        if (axiosError.isAxiosError && axiosError.response?.data.message) {
          errorMessage = axiosError.response.data.message;
        }

        setLoading(false);
        setCurrentGoal(null);

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
    fetchGoalList();
    fetchCurrentGoal();
  }, []);

  const selectedGoal = goalList.find(goal => goal.id === selectedGoalId) || null;
  const selectedPlans = selectedGoal?.plans || [];

  const value: GoalContextType = {
    isLoading,
    goalList,
    currentGoal,
    selectedGoal,
    selectedPlans,
    selectedGoalId,
    setSelectedGoalId,
    fetchGoalList,
    fetchCurrentGoal,
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
