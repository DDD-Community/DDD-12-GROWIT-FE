import Image from 'next/image';
import { ToolTip } from '@/shared/components/display/ToolTip';
import { GrorongAdvice } from '@/composite/home/cheerMessageCard/type';
import { getGrorongImage } from '@/feature/home/utils';

interface GrorongCardProps extends GrorongAdvice {}

export const GrorongCard = ({ mood, message, saying }: GrorongCardProps) => {
  const imagePath = getGrorongImage(mood, message);

  return (
    <>
      <p className="body-1-bold text-label-neutral mb-1">그로롱의 한마디</p>
      <div className="relative pt-6 max-w-md min-h-[180px] px-4 pb-24 rounded-2xl overflow-hidden">
        <Image src={imagePath} alt="grorong-advice" fill className={`object-cover object-top`} />
        <div className="relative z-10">
          <h2 className="headline-1-bold text-white">{saying}</h2>
          <ToolTip text={message} position="bottom-left" />
        </div>
      </div>
    </>
  );
};
