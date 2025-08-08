'use client';

import Button from '@/shared/components/input/Button';
import { usePlanSelector } from './hooks';

export const PlanSelect = () => {
  const { plans, selectedPlanIndex, goPrev, goNext } = usePlanSelector();

  if (!plans.length) return null;

  return (
    <div className="flex items-center gap-2">
      <Button size={'sm'} variant={'secondary'} text={'<'} disabled={selectedPlanIndex === 0} onClick={goPrev} />
      <Button
        size={'sm'}
        variant={'secondary'}
        text={'>'}
        disabled={selectedPlanIndex === plans.length - 1}
        onClick={goNext}
      />
    </div>
  );
};
