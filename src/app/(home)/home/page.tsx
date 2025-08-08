'use client';

import { CheerMessageCard, PlanBoard, ContributionGraph } from '@/composite/home';
import { GoalRoadMap } from '@/composite/home/goalRoadMap/component';
import Image from 'next/image';
import { GoalProvider } from '@/shared/hooks';

export default function MainPage() {
  return (
    <GoalProvider>
      <div className="flex w-full flex-col">
        <div className="max-sm:mx-[20px] sm:mx-[40px] mt-[32px] mb-[20px]">
          <CheerMessageCard />
        </div>
        <div className="flex max-sm:flex-col overflow-y-scroll sm:flex-1 mt-[32px] mb-[48px]">
          {/* 메인 레이아웃 */}
          <div className="flex flex-col flex-1 max-sm:mx-[20px] sm:mx-[40px] gap-[48px]">
            <PlanBoard />
          </div>
          {/* 서브 레이아웃 - 로드맵 & 잔디그래프 확인 */}
          <div className="flex flex-col gap-8 sm:overflow-y-scroll md:border-l border-line-normal w-[335px] max-sm:mx-auto">
            {/* <GoalRoadMap.Desktop />
            <ContributionGraph />
            <GoalRoadMap.Mobile /> */}
          </div>
        </div>
      </div>
    </GoalProvider>
  );
}
