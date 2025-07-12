'use client';

import { usePlanSelector } from './hooks';

export const PlanSelect = () => {
  const { plans, selectedPlanIndex, goPrev, goNext } = usePlanSelector();

  if (!plans.length) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={goPrev}
        disabled={selectedPlanIndex === 0}
        className="px-2 py-1 text-lg disabled:opacity-20 text-white"
      >
        {'<'}
      </button>
      <span className="font-semibold text-label-normal">{selectedPlanIndex + 1}주차</span>
      <button
        onClick={goNext}
        disabled={selectedPlanIndex === plans.length - 1}
        className="px-2 py-1 text-lg disabled:opacity-20 text-white"
      >
        {'>'}
      </button>
    </div>
  );
};
