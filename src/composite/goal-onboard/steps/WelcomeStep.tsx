'use client';

import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';

interface WelcomeStepProps {
  userName?: string;
}

export const WelcomeStep = ({ userName = '' }: WelcomeStepProps) => {
  const displayName = userName || '친구';

  return (
    <FlexBox direction="col" className="flex-1 items-center justify-center px-5">
      <FlexBox direction="col" className="items-center gap-4 text-center mb-8">
        <h1 className="text-2xl font-bold text-white whitespace-pre-line">{`${displayName}, 동행해줘서 고마워.`}</h1>
        <p className="text-base text-text-secondary whitespace-pre-line">
          {`이제 그로롱과 함께 목표 행성을\n모으러 떠나보자!`}
        </p>
      </FlexBox>
      <div className="relative w-[280px] h-[280px]">
        <Image src="/image/growit-landing.png" alt="그로롱 캐릭터" fill className="object-contain" priority />
      </div>
    </FlexBox>
  );
};
