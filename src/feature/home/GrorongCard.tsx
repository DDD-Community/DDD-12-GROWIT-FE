import Image from 'next/image';
import { GrorongAdvice } from '@/composite/home/cheerMessageCard/type';
import { getGrorongImage } from '@/feature/home/utils';

interface GrorongCardProps extends GrorongAdvice {}

export const GrorongCard = ({ mood, message, saying }: GrorongCardProps) => {
  const imagePath = getGrorongImage(mood, message);

  return (
    <div className="absolute top-0 left-0 w-full h-[180px] z-0">
      <div className="max-w-sm:mx-[20px] sm:mx-[40px] mx-auto h-full">
        <div className="relative pt-6 h-full px-4 pb-24">
          <Image
            src={imagePath}
            alt="grorong-advice"
            fill
            className={`object-cover object-top`}
            sizes="100%"
            priority
          />
          <div className="relative z-10">
            <h2 className="headline-1-bold text-white">{saying}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
