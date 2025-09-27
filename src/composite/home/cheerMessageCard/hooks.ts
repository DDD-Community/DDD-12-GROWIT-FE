import { useState, useEffect } from 'react';
import { GrorongAdvice, AIMentorAdvice } from './type';
import { getGrorongAdvice, getAIMentorAdvice } from './api';

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

export const useAIMentorAdvice = () => {
  const [aiMentorAdvice, setAiMentorAdvice] = useState<AIMentorAdvice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAiMentorAdvice = async () => {
      try {
        setIsLoading(true);
        const data = await getAIMentorAdvice();
        setAiMentorAdvice(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('AI 멘토 조언 패칭에 실패했습니다'));
        console.error('Failed to fetch ai mentor advice:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAiMentorAdvice();
  }, []);

  return { aiMentorAdvice, isLoading, error };
};
