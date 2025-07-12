import { Earth } from './icons';
import { GetRoadMap } from '@/feature/goal/getRoadMap/component';
import type { Plan, BeforeAfter } from '@/feature/goal/getRoadMap/type';
import { apiClient } from '@/shared/lib/apiClient';

export const GoalRoadMap = async () => {
  const fetchRoadMap = async () => {
    const response = await apiClient.get('/mock/goals');
    const data: any = response.data;
    const beforeAfter: BeforeAfter = data.data[0].beforeAfter;
    const plans: Plan[] = data.data[0].plans;
    return { beforeAfter, plans };
  };
  const { beforeAfter, plans } = await fetchRoadMap();
  return (
    <aside>
      <h2 className="heading-1-bold flex gap-2 text-primary-normal pb-4">
        <Earth />
        로드맵
      </h2>
      <GetRoadMap beforeAfter={beforeAfter} plans={plans} />
    </aside>
  );
};
