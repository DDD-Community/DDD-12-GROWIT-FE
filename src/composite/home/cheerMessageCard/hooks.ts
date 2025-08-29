import { useState, useEffect } from 'react';
import { getCheerMessage } from './api';

interface CheerMessage {
  message: string;
  from: string;
}

export const useCheerMessage = () => {
  const [cheerMessage, setCheerMessage] = useState<CheerMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCheerMessage = async () => {
      try {
        setIsLoading(true);
        const data = await getCheerMessage();
        setCheerMessage(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch cheer message'));
        console.error('Failed to fetch cheer message:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheerMessage();
  }, []);

  return { cheerMessage, isLoading, error };
};