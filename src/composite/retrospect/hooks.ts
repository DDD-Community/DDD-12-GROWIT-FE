import { useEffect, useState } from 'react';
import { Plan, Retrospect } from './type';
import { getWeeklyRetrospectByGoalId } from './inProgress/api';
import { putWeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/api';

export const useWeeklyRetrospect = (id: string | null) => {
  const [weeklyRetrospect, setWeeklyRetrospect] = useState<Retrospect[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
    } catch (error) {
      console.error(error);
    }
  };

  return { weeklyRetrospect, plans, isLoading, isError, updateWeeklyRetrospect };
};
