import { useState, useEffect } from 'react';
import { GrorongAdvice } from './type';
import { getGrorongAdvice } from './api';

export const useGrorongAdvice = () => {
  const [advice, setAdvice] = useState<GrorongAdvice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        setIsLoading(true);
        const data = await getGrorongAdvice();
        setAdvice(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('그로롱 조언 패칭에 실패했습니다'));
        console.error('Failed to fetch grorong advice:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvice();
  }, []);

  return { advice, isLoading, error };
};
