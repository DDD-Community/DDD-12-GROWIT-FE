import { useEffect, useState } from 'react';
import { Plan, Retrospect } from './type';
import { getWeeklyRetrospectByGoalId } from './inProgress/api';
import { putWeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/api';
import { useToast } from '@/shared/components/feedBack/toast';

export const useWeeklyRetrospect = (id: string) => {
  const [weeklyRetrospect, setWeeklyRetrospect] = useState<Retrospect[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!id) return;
    fetchWeeklyRetrosepct();
  }, [id]);

  const fetchWeeklyRetrosepct = async () => {
    setIsLoading(true);
    try {
      const response = await getWeeklyRetrospectByGoalId(id);
      const totalWeeklyRetrospect = response.data.map(e => e.retrospect);
      const totalPlans = response.data.map(e => e.plan);
      setWeeklyRetrospect(totalWeeklyRetrospect);
      setPlans(totalPlans);
      setIsError(false);
    } catch (error: any) {
      setIsError(true);
      showToast(error?.response?.data?.message || error?.message || '주간 회고 조회에 실패했습니다.', 'error');
      console.error(error);
    }
    setIsLoading(false);
  };

  const updateWeeklyRetrospect = async (
    e: React.FormEvent<HTMLFormElement>,
    weeklyRetrospectId: string,
    newRetrospect: string
  ) => {
    e.preventDefault();
    try {
      const result = await putWeeklyRetrospect(weeklyRetrospectId, newRetrospect);
      if (result.isSuccess) {
        showToast('성공적으로 수정되었습니다.', 'success');
        if (weeklyRetrospectId) fetchWeeklyRetrosepct();
      } else {
        showToast(result.message || '수정에 실패했습니다.', 'error');
      }
    } catch (error: any) {
      showToast(error?.response?.data?.message || error?.message || '수정에 실패했습니다.', 'error');
      console.error(error);
    }
  };

  return { weeklyRetrospect, plans, isLoading, isError, updateWeeklyRetrospect };
};
