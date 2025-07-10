import { TodayMissionBoard, CheerMessageCard, WeeklyPlanBoard, GoalRoadMap, ContributionGraph } from '@/composite/home';
import { CreateGoalButton } from '@/feature/goal';

export default function MainPage() {
  return (
    <div className="flex w-full max-sm:flex-col">
      {/* 메인 레이아웃 */}
      <div className="flex sm:flex-1 flex-col">
        <CreateGoalButton />
        <CheerMessageCard />
        <TodayMissionBoard />
        <WeeklyPlanBoard />
      </div>

      {/* 서브 레이아웃 - 로드맵 & 잔디그래프 확인 */}
      <div className="flex flex-col max-sm:w-full sm:w-[334px] p-[16px] border-l border-line-normal">
        <GoalRoadMap />
        <ContributionGraph />
      </div>
    </div>
  );
}
