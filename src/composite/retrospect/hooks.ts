import { useEffect, useState } from 'react';
import { Plan, Retrospect } from './type';
import { getWeeklyRetrospectByGoalId } from './inProgress/api';
import { putWeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/api';
import { useToast } from '@/shared/components/feedBack/toast';
import { AxiosError } from 'axios';

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
    } catch (error) {
      setIsError(true);
      console.error(error);
      throw Error;
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
      await putWeeklyRetrospect(weeklyRetrospectId, newRetrospect);
      if (weeklyRetrospectId) fetchWeeklyRetrosepct();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error(error);

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }

      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  };

  return { weeklyRetrospect, plans, isLoading, isError, updateWeeklyRetrospect };
};
