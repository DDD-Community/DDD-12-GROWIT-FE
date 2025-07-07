'use client';
import { useFetchGetGoal, useAutoGoOnboarding } from './hooks';

export const WeeklyPlanBoard = () => {
  const { isLoading, goal } = useFetchGetGoal();
  useAutoGoOnboarding(isLoading, goal);

  return (
    <div className="flex flex-col bg-accent-fg-orange">
      <p>히히 보드</p>
      {goal && (
        <div className="flex flex-col gap-4">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-white text-xl font-semibold mb-4">현재 목표</h2>
            <div className="space-y-2">
              <p className="text-white">{`목표이름 : ${goal.name}`}</p>
              <p className="text-white">{`현재 : ${goal.beforeAfter.asIs}`}</p>
              <p className="text-white">{`미래 : ${goal.beforeAfter.toBe}`}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
