import { useEffect, useState } from 'react';
//import { Plan, Retrospect } from '../type';
import { Analysis } from './type';
//import { getWeeklyRetrospectByGoalId } from '../inProgress/api';
import { getGoalRetrosepctById } from './api';
//import { putWeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/api';

// export const useWeekylRetrospect = (id: string) => {
//   const [weeklyRetrospect, setWeeklyRetrospect] = useState<Retrospect[]>([]);
//   const [plans, setPlans] = useState<Plan[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     fetchWeeklyRetrosepct();
//   }, []);

//   const fetchWeeklyRetrosepct = async () => {
//     setIsLoading(true);
//     try {
//       setIsError(false);
//       const response = await getWeeklyRetrospectByGoalId(id);
//       const totalWeeklyRetrospect = response.data.map(e => e.retrospect);
//       const totalPlans = response.data.map(e => e.plan);
//       setWeeklyRetrospect(totalWeeklyRetrospect);
//       setPlans(totalPlans);
//     } catch (error) {
//       setIsError(true);
//       console.error(error);
//       throw Error;
//     }
//     setIsLoading(false);
//   };

//   const updateWeeklyRetrospect = async (
//     e: React.FormEvent<HTMLFormElement>,
//     weeklyRetrospectId: string,
//     newRetrospect: string
//   ) => {
//     e.preventDefault();
//     try {
//       await putWeeklyRetrospect(weeklyRetrospectId, newRetrospect);
//       fetchWeeklyRetrosepct();
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };

//   return { weeklyRetrospect, plans, isLoading, isError, updateWeeklyRetrospect };
// };

export const useEntireRetrospect = (id: string) => {
  const [todoCompletedRate, setTodoCompletedRate] = useState(0);
  const [analysis, setAnalysis] = useState<Analysis>();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchEntrieRetrospect = async () => {
      try {
        setIsError(false);
        const response = await getGoalRetrosepctById(id);
        const goalRetrosepct = response.data;
        setTodoCompletedRate(goalRetrosepct.todoCompletedRate);
        setAnalysis(goalRetrosepct.analysis);
        setContent(goalRetrosepct.content);
      } catch (error) {
        setIsError(true);
        console.error(error);
        throw error;
      }
      setIsLoading(false);
    };
    fetchEntrieRetrospect();
  }, []);

  return { todoCompletedRate, analysis, content, isLoading, isError };
};
