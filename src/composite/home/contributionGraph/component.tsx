'use client';

import { Rocket } from './icons';
import { useFetchContributionList } from './hooks';
import { useGoalSelector } from '@/model/goal/context';
import { ContributionTooltip } from './components/ContributionTooltip';
import { ContributionGrid } from './components/ContributionGrid';
import { ContributionSkeleton } from './components/ContributionSkeleton';

export const ContributionGraph = () => {
  const { selectedGoal } = useGoalSelector();
  const { contributionList, isLoading } = useFetchContributionList(selectedGoal?.id || '');

  if (!selectedGoal) {
    return null;
  }

  if (isLoading) {
    return (
      <article className="w-full p-6 border border-line-normal rounded-lg md:border-none relative">
        <h2 className="heading-1-bold flex items-center gap-2 text-primary-normal pb-4">
          <Rocket />
          진척도
        </h2>
        <ContributionSkeleton />
      </article>
    );
  }

  return (
    <article className="w-full p-6 border border-line-normal rounded-lg md:border-none relative">
      <h2 className="heading-1-bold flex items-center gap-2 text-primary-normal pb-4">
        <Rocket />
        진척도
      </h2>
      <ContributionGrid contributionList={contributionList} />
      <ContributionTooltip />
    </article>
  );
};
