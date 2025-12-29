'use client';

import Image from 'next/image';
import Button from '@/shared/components/input/Button/Button';

const INSTAGRAM_URL = 'https://www.instagram.com/growit.ddd/';
const MAINTENANCE_PERIOD = '12/30~1/4일까지';

export default function MaintenancePage() {
  const handleInstagramClick = () => {
    window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full h-dvh bg-normal overflow-hidden">
      {/* 캐릭터 배경 이미지 (화면 꽉 채움) */}
      <div className="absolute inset-0">
        <Image
          src="/maintenance/maintenance-character.png"
          alt="점검 중 캐릭터"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col h-full items-center justify-between max-w-md mx-auto">
        {/* 상단 영역 (Safe Area + 텍스트) */}
        <div className="flex flex-col items-center pt-[124px] px-2 text-center">
          <h1 className="font-bold text-[22px] leading-[1.36] tracking-[-0.43px] text-label-normal">
            현재 서버 점검중이에요
          </h1>
          <p className="mt-2 font-normal text-[16px] leading-normal tracking-[0.09px] text-label-neutral">
            {MAINTENANCE_PERIOD} 서비스 이용이 불가해요
          </p>
        </div>

        {/* 빈 공간 (캐릭터 표시 영역) */}
        <div className="flex-1" />

        {/* 하단 버튼 영역 */}
        <div className="w-full px-6 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4">
          <Button size="xl" variant="primary" text="그로잇 인스타 구경가기" onClick={handleInstagramClick} />
        </div>
      </div>
    </div>
  );
}
