'use client';

import { useState } from 'react';
import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { formatDateRange } from '@/shared/lib/dateUtils';

interface CompleteStepProps {
  goalName: string;
  startDate?: string;
  endDate?: string;
  planet?: {
    name: string;
    image: {
      done: string;
      progress: string;
    };
  };
}

export const CompleteStep = ({ goalName, startDate, endDate, planet }: CompleteStepProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <FlexBox direction="col" className="relative flex-1 items-center px-5 pt-12 overflow-hidden">
      {/* 배경 블러 이미지 */}
      <div className="absolute -inset-[30px] flex items-center justify-center pointer-events-none -translate-y-[30px]">
        <div className="relative w-full h-full">
          <Image
            src="/goal-onboard/goal-onboard-4.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* 콘텐츠 */}
      <FlexBox direction="col" className="relative z-10 items-center gap-2 text-center mb-8">
        <h1 className="text-2xl font-bold text-white">나의 목표 행성이에요</h1>
        <p className="text-base text-text-secondary">목표를 끝까지 완료해 행성을 완성시키세요</p>
      </FlexBox>

      <div className="relative z-10 w-[200px] h-[200px] mb-4">
        {/* 로딩 중 - 행성 생성 이펙트 */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* 내부 펄스 */}
            <div
              className="absolute w-[120px] h-[120px] rounded-full bg-[#FFD700]/10 animate-ping"
              style={{ animationDuration: '1.5s' }}
            />
          </div>
        )}
        <Image
          src={planet?.image.progress || '/goal/goal-progress.png'}
          alt="목표 행성"
          fill
          className={`object-contain transition-all duration-700 ease-out ${
            isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          priority
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      <p
        className={`relative z-10 text-sm text-white mb-8 transition-opacity duration-500 delay-300 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {planet?.name ? `${planet.name} 행성` : '행성'}
      </p>

      <div className="relative z-10 w-full bg-fill-normal rounded-2xl p-4 border border-line-normal">
        <h3 className="text-lg font-semibold text-white mb-2">{goalName}</h3>
        {startDate && endDate && (
          <div className="flex items-center gap-2">
            <p className="text-sm text-text-secondary">기간</p>
            <p className="text-sm text-white"> {formatDateRange(startDate, endDate)}</p>
          </div>
        )}
      </div>
    </FlexBox>
  );
};
