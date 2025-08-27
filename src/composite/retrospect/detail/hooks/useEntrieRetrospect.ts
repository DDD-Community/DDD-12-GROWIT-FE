import { useEffect, useState } from 'react';
import { Analysis } from '../type';
import { getGoalRetrosepctById } from '../api';

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
