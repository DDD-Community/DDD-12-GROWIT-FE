import GoalCollectionNavButton from '@/feature/goal/goalCollectionNavButton';
import PlanetSelectorContainer from '@/composite/goal/planetSelector/PlanetSelector';

export default function GoalPageRoute() {
  return (
    <div className="relative w-full h-full bg-normal pt-10">
      <div className="absolute z-10 top-10 left-8">
        <GoalCollectionNavButton />
      </div>

      <div className="absolute inset-0 w-full h-full opacity-[0.08]">
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)',
          }}
        />

        {/* Background Image */}
        <div
          className="absolute w-[1623.81px] h-[1195.3px]"
          style={{
            backgroundImage: 'url(/image/goal-background-282330.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'translate(0px, -600px)',
          }}
        />
      </div>

      <section className="pt-36 px-5 pb-5 flex flex-col">
        <PlanetSelectorContainer />
      </section>
    </div>
  );
}
