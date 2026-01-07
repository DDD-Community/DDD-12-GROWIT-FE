import { EndedGoalsNavButton } from '@/feature/goal/components/EndedGoalsNavButton';

import PlanetSelectorSection from '@/composite/goal/planet-select';

export default function GoalPageRoute() {
  return (
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
      {/** 행성 swiper 섹션 */}
      <PlanetSelectorSection />
    </div>
  );
}
