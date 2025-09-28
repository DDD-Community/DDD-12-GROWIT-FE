import { createContext, useContext, useEffect, useState } from 'react';
import { AIMentorAdvice } from './type';
import { getAIMentorAdvice } from './api';

export const AiMentorAdviceContext = createContext<AiMentorAdviceContextType | null>(null);

export type AiMentorAdviceContextType = {
  aiMentorAdvice: AIMentorAdvice | null;
  isLoading: boolean;
  error: Error | null;
};

export const AIMentorProvider = ({ children }: { children: React.ReactNode }) => {
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
  return (
    <AiMentorAdviceContext.Provider value={{ aiMentorAdvice, isLoading, error }}>
      {children}
    </AiMentorAdviceContext.Provider>
  );
};

export const useAIMentorAdvice = () => {
  const context = useContext(AiMentorAdviceContext);
  if (!context) {
    throw new Error('useAiMentorAdvice must be used within AiMentorProvider');
  }
  return context;
};
