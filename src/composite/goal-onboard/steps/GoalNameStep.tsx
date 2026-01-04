'use client';

import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { CreateGoalFormElement } from '@/feature/goal';

export const GoalNameStep = () => {
  return (
    <FlexBox direction="col" className="flex-1 px-5 pt-6">
      <FlexBox direction="col" className="items-center mb-8">
        <div className="relative w-[236px] h-[190px] mb-4">
          <Image src="/goal-onboard/goal-onboard-2.png" alt="그로롱 캐릭터" fill className="object-contain" priority />
        </div>
        <h2 className="text-xl font-bold text-white text-center">어떤 목표를 이루고 싶어?</h2>
      </FlexBox>

      <div className="w-full">
        <CreateGoalFormElement.Name />
      </div>
    </FlexBox>
  );
};
