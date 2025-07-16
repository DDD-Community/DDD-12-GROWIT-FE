import { TodayMissionBoard, CheerMessageCard, WeeklyPlanBoard, GoalRoadMap, ContributionGraph } from '@/composite/home';
import OpenRoadMapButton from '@/composite/home/openRoadMapButton/component';

export default async function MainPage() {
  return (
    <div className="flex w-full max-sm:flex-col">
      {/* 메인 레이아웃 */}
      <div className="flex flex-col sm:overflow-y-scroll sm:flex-1 pt-[48px] pb-[48px]">
        <div className="flex flex-col max-sm:mx-[20px] sm:mx-[40px] gap-[48px]">
          <CheerMessageCard />
          <TodayMissionBoard />
          <WeeklyPlanBoard />
        </div>
      </div>
      {/* 서브 레이아웃 - 로드맵 & 잔디그래프 확인 */}
      <div className="flex flex-col gap-8 sm:overflow-y-scroll p-[16px] md:border-l border-line-normal w-[335px] mx-auto">
        {/* Todo 추가 버튼 */}
        <GoalRoadMap />
        <ContributionGraph />
        {/* 로드맵 모바일 버전 */}
        <OpenRoadMapButton />
      </div>
    </div>
  );
}
