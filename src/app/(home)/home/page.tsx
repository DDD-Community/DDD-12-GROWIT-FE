import { TodayMissionBoard, CheerMessageCard, WeeklyPlanBoard, GoalRoadMap, ContributionGraph } from '@/composite/home';
import { CreateGoalButton } from '@/feature/goal';
import { apiClient } from '@/shared/lib/apiClient';
import { AddToDo } from '@/feature/addToDo/component';

export default async function MainPage() {
  const fetchContribution = async () => {
    const response: any = await apiClient.get('/mock/todos');
    const result = response.data.data;
    return result;
  };
  const contribution = await fetchContribution();

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
      <div className="flex flex-col gap-8 max-sm:w-full sm:w-[334px] p-[16px] border-l border-line-normal">
        {/* Todo 추가 버튼 */}
        <GoalRoadMap />
        <ContributionGraph contribution={contribution} />
      </div>
    </div>
  );
}
