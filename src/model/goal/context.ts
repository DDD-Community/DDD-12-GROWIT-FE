import { AxiosError } from 'axios';
import { useCallback, useEffect, useState, createContext, useContext, ReactNode, createElement } from 'react';
import { Goal } from '@/shared/type/goal';
import { CommonError } from '@/shared/type/response';
import { useToast } from '@/shared/components/feedBack/toast';
import { getGoalList, deleteGoal, putEditGoal, GetGoalListOption, getGoalItem, GetGoalOption } from './api';

interface ServerRequest<Request> {
  request: Request;
  onSuccess?: () => void;
  onError?: () => void;
}

interface GoalContextType {
  isLoading: boolean;
  goalList: Goal[];
  currentGoal: Goal | null;
  setCurrentGoal: (goal: Goal) => void;
  refetchGoalList: (goalListOption?: GetGoalListOption, shouldThrow?: boolean) => Promise<void>;
  refetchCurrentGoal: (option?: GetGoalOption, shouldThrow?: boolean) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
  updateGoal: (req: ServerRequest<Goal>) => Promise<void>;
}

const GoalContext = createContext<GoalContextType | null>(null);

interface GoalProviderProps {
  children: ReactNode;
  goalListOption?: GetGoalListOption;
  goalItemOption?: GetGoalOption;
}

export function GoalProvider({ children, goalListOption, goalItemOption }: GoalProviderProps) {
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [goalList, setGoalList] = useState<Goal[]>([]);
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);

  const fetchGoalList = useCallback(
    async (option = goalListOption, shouldThrow = false) => {
      try {
        setLoading(true);

        const goals = await getGoalList(option);
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
    [goalListOption]
  );

  const fetchCurrentGoal = useCallback(async (option = goalItemOption, shouldThrow = false) => {
    try {
      setLoading(true);

      const goals = await getGoalItem(option);
      setCurrentGoal(goals);
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
  }, []);

  const fetchDeleteGoal = useCallback(async (goalId: string) => {
    try {
      setLoading(true);

      await deleteGoal(goalId);
      await fetchGoalList();

      setLoading(false);
    } catch (err) {
      const axiosError = err as AxiosError<CommonError>;
      let errorMessage = '목표를 삭제하는데 실패했습니다.';

      if (axiosError.isAxiosError && axiosError.response?.data.message) {
        errorMessage = axiosError.response.data.message;
      }

      setLoading(false);
      showToast(errorMessage);
    }
  }, []);

  const updateGoal = useCallback(async ({ request, onSuccess, onError }: ServerRequest<Goal>) => {
    try {
      setLoading(true);

      await putEditGoal(request);
      await fetchGoalList();

      onSuccess?.();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      onError?.();
    }
  }, []);

  useEffect(() => {
    fetchGoalList();
    fetchCurrentGoal();
  }, []);

  //const currentPlans = currentGoal?.plans || [];

  const value: GoalContextType = {
    isLoading,
    goalList,
    currentGoal,
    setCurrentGoal,
    refetchGoalList: fetchGoalList,
    refetchCurrentGoal: fetchCurrentGoal,
    deleteGoal: fetchDeleteGoal,
    updateGoal,
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
