import Image from 'next/image';
import { GrorongAdvice } from '@/composite/home/cheerMessageCard/type';

interface GrorongCardProps extends GrorongAdvice {}

export const GrorongCard = ({ mood, message, saying }: GrorongCardProps) => {
  const renderBackgroundImage = () => {
    switch (mood) {
      case 'HAPPY':
        return '/home/grorong-happy-bg.png';
      case 'NORMAL':
        return '/home/grorong-normal-bg.png';
      case 'SAD':
        return '/home/grorong-sad-bg.png';
    }
  };

  const renderCharacterImage = () => {
    switch (mood) {
      case 'HAPPY':
        return '/home/grorong-love-max.png';
      case 'NORMAL':
        return '/home/grorong-love.png';
      case 'SAD':
        return '/home/grorong-sad-character.png';
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-[168px] z-0">
      <div className="max-w-sm:mx-[20px] sm:mx-[40px] mx-auto h-full">
        <div className="relative pt-4 h-full px-4 pb-16">
          {/* 배경 이미지 */}
          <Image
            src={renderBackgroundImage()}
            alt="grorong-background"
            fill
            className="object-cover object-top"
            sizes="100%"
            priority
          />

          {/* 캐릭터 이미지 */}
          <div className="absolute top-8 right-3 w-32 h-32 z-20">
            <Image
              src={renderCharacterImage()}
              alt="grorong-character"
              fill
              className="object-contain object-top"
              sizes="128px"
            />
          </div>

          <div className="absolute top-16 left-4 z-10 max-w-[55%]">
            <h2 className="font-semibold text-white leading-tight text-pretty">{saying}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
