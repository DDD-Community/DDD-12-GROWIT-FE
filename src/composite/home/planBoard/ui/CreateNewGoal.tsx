'use client';

import { CreateGoalButton } from '@/feature/goal';

export const CreateNewGoal = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-[#232326] rounded-2xl">
      <div className="text-center">
        <h2 className="heading-2-bold text-white mb-2">목표를 추가해주세요.</h2>
        <p className="text-label-neutral text-sm leading-relaxed">
          <br />첫 번째 목표를 만들어 4주간의 여정을 시작해볼까요?.
        </p>
      </div>
      <CreateGoalButton />
    </div>
  );
};
