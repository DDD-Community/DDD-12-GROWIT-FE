'use client';

import { CreateGoalButton } from '@/feature/goal';

export const CreateNewGoal = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-6 px-8 py-64  rounded-2xl">
      <p className="text-label-neutral leading-relaxed text-center">진행중인 목표가 없습니다.</p>
      <CreateGoalButton className="w-36" />
    </div>
  );
};
