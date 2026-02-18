import { EndedGoalsNavButton } from '@/feature/goal/components/EndedGoalsNavButton';

import { GoalPlanetSection } from '@/composite/goal/goalPlanetSection';
import { GoalProvider } from '@/model/goal/context';
import GoalProgressSheet from '@/composite/goal/progress';

export default function GoalPageRoute() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-normal">
      <header className="w-full flex items-center justify-start px-5 pt-5">
        <EndedGoalsNavButton />
      </header>
      <div className="absolute inset-0 w-full h-full opacity-[0.20] pointer-events-none">
        {/* Gradient Overlay - 하단 부분을 더 밝게 조정 */}
        <GradientOverlay />
      </div>

      <GoalProvider>
        {/** 행성 swiper 섹션 */}
        <section className="overflow-y-auto w-full h-full flex flex-col">
          <div className="w-full my-auto">
            <GoalPlanetSection />
          </div>
        </section>
        <footer className="w-full flex flex-col items-center justify-end">
          <GoalProgressSheet />
        </footer>
      </GoalProvider>
    </div>
  );
}

function GradientOverlay() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.1) 100%)',
      }}
    />
  );
}
