'use client';

import { CheerMessageCard, PlanBoard, ContributionGraph } from '@/composite/home';
import { GoalRoadMap } from '@/composite/home/goalRoadMap/component';
import Image from 'next/image';
import { GoalProvider } from '@/shared/hooks';

export default function MainPage() {
  return (
    <GoalProvider>
      <div className="flex w-full max-sm:flex-col">
        {/* 메인 레이아웃 */}
        <div className="flex flex-col sm:overflow-y-scroll sm:flex-1 pt-[32px] pb-[48px]">
          <div className="flex flex-col max-sm:mx-[20px] sm:mx-[40px] gap-[48px]">
            <Image src="/logo-text.svg" alt="logo" width={86} height={32} />
            <CheerMessageCard />
            <PlanBoard />
          </div>
        </div>
        {/* 서브 레이아웃 - 로드맵 & 잔디그래프 확인 */}
        <div className="flex flex-col gap-8 sm:overflow-y-scroll p-[16px] md:border-l border-line-normal w-[335px] mx-auto">
          {/* Todo 추가 버튼 */}
          <GoalRoadMap.Desktop />
          <ContributionGraph />
          <GoalRoadMap.Mobile />
        </div>
      </div>
    </GoalProvider>
  );
}
