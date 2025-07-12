import { Earth } from './icons';
import { GetRoadMap } from '@/feature/goal/getRoadMap/component';

export const GoalRoadMap = () => {
  return (
    <aside>
      <h2 className="heading-1-bold flex gap-2 text-primary-normal pb-4">
        <Earth />
        로드맵
      </h2>
      <GetRoadMap />
    </aside>
  );
};
