import { EndedGoalsNavButton } from '@/feature/goal/EndedGoalsNavButton';
import PlanetSelectorContainer from '@/composite/goal/planetSelector/PlanetSelector';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function GoalPageRoute() {
  return (
    <Suspense fallback={<GoalPageLoader />}>
      <div className="relative w-full h-full flex flex-col pb-2 justify-between bg-normal">
        <div className="w-full flex items-center justify-start px-5 pt-5">
          <EndedGoalsNavButton />
        </div>

        <div className="absolute inset-0 w-full h-full opacity-[0.20] pointer-events-none">
          {/* Gradient Overlay - 하단 부분을 더 밝게 조정 */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.1) 100%)',
            }}
          />
        </div>
        <PlanetSelectorContainer />
      </div>
    </Suspense>
  );
}

function GoalPageLoader() {
  return (
    <div className="w-full h-screen flex flex-col bg-normal items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
      <p className="text-gray-100 text-sm font-medium">진행중인 목표를 불러오는 중입니다...</p>
    </div>
  );
}
