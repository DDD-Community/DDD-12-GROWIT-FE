import GoalCollectionNavButton from '@/feature/goal/goalCollectionNavButton';
import PlanetSelectorContainer from '@/composite/goal/planetSelector/PlanetSelector';

export const dynamic = 'force-dynamic';

export default async function GoalPageRoute() {
  return (
    <div className="relative w-full h-full flex flex-col pb-2 justify-between bg-normal">
      <div className="w-full flex items-center justify-start px-5 pt-5">
        <GoalCollectionNavButton />
      </div>

      <div className="absolute inset-0 w-full h-full opacity-[0.20]">
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
  );
}
