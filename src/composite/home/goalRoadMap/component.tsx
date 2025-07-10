import { Earth } from './icons';
import Image from 'next/image';
import StepBox from '@/composite/roadMap/stepBox';

export const GoalRoadMap = () => {
  return (
    <aside>
      <h2 className="heading-1-bold flex gap-2 text-primary-normal pb-4">
        <Earth />
        로드맵
      </h2>
      <section className="relative">
        <Image src={'/road-map-bg.png'} alt="road-map" width={278} height={570} />
        <Image src={'/earth-blue.png'} alt="earth" width={96} height={89} className="absolute top-12 right-16" />
        <Image src={'/rocket.png'} alt="earth" width={96} height={89} className="absolute bottom-12 right-16" />
        <svg className="absolute top-8 w-[470px] h-[500px]" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M48,45 Q-15,100 -10,150 Q-15,200 48,255"
            stroke="white"
            fill="none"
            strokeWidth="1"
            strokeDasharray="3,8"
            strokeLinecap="round"
          />
        </svg>
        <StepBox step={1} className="absolute bottom-32 right-40" />
        <StepBox step={2} className="absolute top-1/2 left-6" />
        <StepBox step={3} className="absolute top-1/3 left-6" />
        <StepBox step={4} className="absolute top-1/5 left-1/4" />
      </section>
    </aside>
  );
};
