'use client';

import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { CreateGoalFormElement } from '@/feature/goal';

export const DateStep = () => {
  return (
    <FlexBox direction="col" className="flex-1 px-5 pt-6 overflow-y-auto pb-24">
      <FlexBox direction="col" className="items-center mb-8">
        <div className="relative w-[236px] h-[190px] mb-4 -ml-5">
          <Image src="/goal-onboard/goal-onboard-3.png" alt="그로롱 캐릭터" fill className="object-contain" priority />
        </div>
        <h2 className="text-xl font-bold text-white text-center">언제까지 목표를 이뤄볼까?</h2>
      </FlexBox>

      <FlexBox direction="col" className="gap-4">
        <CreateGoalFormElement.SelectStartDate />
        <CreateGoalFormElement.SelectEndDate />
      </FlexBox>

      <p className="text-sm text-status-negative mt-4">ⓘ 목표 기간은 최소 1주, 최대 1년까지 설정 가능합니다.</p>
    </FlexBox>
  );
};
