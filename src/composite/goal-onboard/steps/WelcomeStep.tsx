'use client';

import Image from 'next/image';

interface WelcomeStepProps {
  userName?: string;
}

export const WelcomeStep = ({ userName = '' }: WelcomeStepProps) => {
  const displayName = userName || '친구';

  return (
    <div className="relative flex-1 w-full h-full overflow-hidden">
      <Image
        src="/goal-onboard/goal-onboard-1.png"
        alt="목표 온보딩"
        fill
        className="object-cover object-top"
        priority
      />
      {/* 텍스트 오버레이 */}
      <div className="absolute top-20 left-0 right-0 flex flex-col items-center text-center px-5 z-10">
        <h1 className="text-2xl font-bold text-white mb-3">{displayName}, 동행해줘서 고마워.</h1>
        <p className="text-base text-text-secondary whitespace-pre-line">
          {`이제 그로롱과 함께 목표 행성을\n모으러 떠나보자!`}
        </p>
      </div>
    </div>
  );
};
