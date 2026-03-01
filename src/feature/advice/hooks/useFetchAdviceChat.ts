import { AdviceQuery } from '@/model/advice/queries';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useFetchAdviceChat = () => {
  const { data: adviceChat } = useSuspenseQuery(
    AdviceQuery.getAdviceChat({
      staleTime: Infinity,
      gcTime: Infinity,
    })
  );

  if (!adviceChat) throw new Error('Advice chat data is undefined');

  return { adviceChat };
};
