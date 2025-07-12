import { TodayMissionBoard, CheerMessageCard, WeeklyPlanBoard, GoalRoadMap, ContributionGraph } from '@/composite/home';
import { apiClient } from '@/shared/lib/apiClient';

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
      <div className="flex flex-col sm:overflow-y-scroll sm:flex-1">
        <div className="flex flex-col max-sm:mx-[20px] sm:mx-[40px] gap-[48px]">
          <CheerMessageCard />
          <TodayMissionBoard />
          <WeeklyPlanBoard />
        </div>
      </div>
      {/* 서브 레이아웃 - 로드맵 & 잔디그래프 확인 */}
      <div className="flex flex-col gap-8 p-[16px] border-l border-line-normal max-sm:w-full sm:overflow-y-scroll sm:w-[334px]">
        <GoalRoadMap />
        <ContributionGraph contribution={contribution} />
      </div>
    </div>
  );
}
