import { useEffect, useState } from 'react';
import { Duration, Plan, Retrospect } from '../type';
import { getProgressRetrospect, getWeeklyRetrospectByGoalId } from './api';

export const useInProgress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [weeklyRetrospect, setWeeklyRetrospect] = useState<Retrospect[]>();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [duration, setDuration] = useState<Duration>();
  const [currentWeekOfMonth, setCurrentWeekOfMonth] = useState<number>();
  const [totalWeek, setTotalWeek] = useState<number>();

  useEffect(() => {
    setIsLoading(true);
    const fetchWeeklyRetrospect = async () => {
      const goalId = await fetchProgressGoal();
      if (goalId) {
        const response = await getWeeklyRetrospectByGoalId(goalId);
        const totalWeeklyRetrospect = response.data.map(e => e.retrospect);
        const totalPlans = response.data.map(e => e.plan);
        setWeeklyRetrospect(totalWeeklyRetrospect);
        setPlans(totalPlans);

        for (const plan of totalPlans) {
          if (plan.isCurrentWeek) {
            setCurrentWeekOfMonth(plan.weekOfMonth);
            break;
          }
        }
        setTotalWeek(totalPlans.length);
      }
      setIsLoading(false);
    };
    const fetchProgressGoal = async (): Promise<string | undefined> => {
      const inProgressGoal = await getProgressRetrospect();
      const currentGoal = inProgressGoal.data[0];
      if (currentGoal) {
        const goalId = currentGoal.id;
        setDuration(currentGoal.duration);
        return goalId;
      }
    };
    fetchWeeklyRetrospect();
  }, []);

  return {
    isLoading,
    weeklyRetrospect,
    plans,
    duration,
    currentWeekOfMonth,
    totalWeek,
  };
};
