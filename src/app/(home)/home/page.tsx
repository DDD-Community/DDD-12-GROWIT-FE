import { TodayMissionBoard, CheerMessageCard, WeeklyPlanBoard, GoalRoadMap, ContributionGraph } from '@/composite/home';
import { CreateGoalButton } from '@/feature/goal';
import { AddToDo } from '@/feature/addToDo/component';
import OpenRoadMapButton from '@/composite/home/openRoadMapButton/component';

export default async function MainPage() {
  return (
    <div className="flex w-full max-sm:flex-col">
      {/* 메인 레이아웃 */}
      <div className="flex sm:flex-1 flex-col">
        <CreateGoalButton />
        <CheerMessageCard />
        <TodayMissionBoard />
        <WeeklyPlanBoard />
      </div>

      {/* Todo 추가 컴포넌트 (버튼 + 모달) */}
      <AddToDo />
      {/* 서브 레이아웃 - 로드맵 & 잔디그래프 확인 */}
      <div className="flex flex-col gap-8 md:min-h-[1109px] p-[16px] md:border-l border-line-normal w-[335px] mx-auto">
        {/* Todo 추가 버튼 */}
        <GoalRoadMap />
        <ContributionGraph />
        {/* 로드맵 모바일 버전 */}
        <OpenRoadMapButton />
      </div>
    </div>
  );
}
