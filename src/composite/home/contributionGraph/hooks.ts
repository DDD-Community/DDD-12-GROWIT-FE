import { useState, useEffect, useCallback } from 'react';
import { getContributionList } from './api';
import { Contribution } from '@/shared/type/Todo';

export function useFetchContributionList(goalId: string) {
  const [contributionList, setContributionList] = useState<(Contribution | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContributionList = useCallback(async () => {
    if (!goalId) return;

    setIsLoading(true);
    try {
      const serverData = await getContributionList({ goalId });
      const fullContributionList: (Contribution | null)[] = Array.from(
        { length: 28 },
        (_, index) => serverData[index] || null
      );

      setContributionList(fullContributionList);
    } catch (error) {
      console.error('Failed to fetch contribution list:', error);
      setContributionList(new Array(28).fill(null));
    } finally {
      setIsLoading(false);
    }
  }, [goalId]);

  const refetch = useCallback(async () => {
    await fetchContributionList();
  }, [fetchContributionList]);

  useEffect(() => {
    fetchContributionList();
  }, [fetchContributionList]);

  return {
    contributionList,
    isLoading,
    refetch,
  };
}
