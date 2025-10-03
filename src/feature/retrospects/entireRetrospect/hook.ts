import { useEffect, useState } from 'react';
import { postCompletedGoalRetrospect, getCompletedGoalRetrospect } from './api';
import { useToast } from '@/shared/components/feedBack/toast';
import { RetrospectAIResponse } from './type';

export const usePostRetrospectAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useToast();

  const postAISummary = async (goalId: string) => {
    setIsLoading(true);
    setIsSuccess(false); // 성공 상태 초기화

    try {
      const res = await postCompletedGoalRetrospect(goalId);
      setIsSuccess(true);
      const data = res.data;
      return data;
    } catch (error) {
      setIsSuccess(false);
      if (error instanceof Error) {
        showToast(error.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isSuccess, postAISummary };
};

export const useGetRetrospectAI = (goalRetrospectId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [AISummary, setAISummary] = useState<RetrospectAIResponse | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const initData = async () => {
      if (goalRetrospectId.length) {
        const response = await getAISummary(goalRetrospectId);
        if (response) {
          setAISummary(response);
        }
      }
    };
    initData();
  }, [goalRetrospectId]);

  const getAISummary = async (goalRetrospectId: string) => {
    setIsLoading(true);
    try {
      if (goalRetrospectId.length) {
        const res = await getCompletedGoalRetrospect(goalRetrospectId);
        return res?.data;
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, AISummary, setAISummary, getAISummary };
};
