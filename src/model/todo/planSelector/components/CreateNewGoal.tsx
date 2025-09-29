'use client';

import { CreateGoalButton } from '@/feature/goal';

export const CreateNewGoal = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-6 px-8 py-64  rounded-2xl">
      <p className="text-label-neutral leading-relaxed text-center">진행중인 목표가 없습니다.</p>
      <CreateGoalButton
        icon={
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.99935 4.16699V15.8337M4.16602 10.0003H15.8327"
              stroke="black"
              stroke-width="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        className="w-[113px]"
      />
    </div>
  );
};
