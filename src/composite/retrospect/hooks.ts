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
      const response = await putWeeklyRetrospect(weeklyRetrospectId, newRetrospect);
      if ('message' in response) {
        showToast(response.message, 'error');
      } else {
        if (id) fetchWeeklyRetrosepct();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { weeklyRetrospect, plans, isLoading, isError, updateWeeklyRetrospect };
};
