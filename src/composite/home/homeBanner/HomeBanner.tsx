'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdviceQuery } from '@/model/advice/queries';
import { GrorongMood } from '@/model/advice/types';
import { BANNER_MESSAGES } from './constants';
import { getDailyRandomIndex, getVideoUrl } from './utils';

export const HomeBanner = () => {
  const { data: advice } = useQuery(AdviceQuery.getGrorongAdvice());
  const [bannerIndex, setBannerIndex] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  const mood: GrorongMood = advice?.mood ?? 'NORMAL';

  useEffect(() => {
    setIsClient(true);
    setBannerIndex(getDailyRandomIndex(mood));
  }, [mood]);

  const videoUrl = useMemo(() => getVideoUrl(mood, bannerIndex), [mood, bannerIndex]);
  const bannerMessage = useMemo(() => BANNER_MESSAGES[mood][bannerIndex]?.message || '', [mood, bannerIndex]);

  // NEXT 하이드레이션 미스매칭 방지를 위한 코드
  // 서버와 클라이언트가 getDailyRandomIndex() 실행 시 다른 값을 반환하면 하이드레이션 에러 발생
  if (!isClient) {
    return (
      <div className="relative w-full h-[168px] bg-[#0F0F10]">
        <div className="absolute inset-0 animate-pulse bg-gray-800" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[168px] overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover" src={videoUrl} autoPlay muted playsInline />
      {bannerMessage && (
        <div className="absolute top-1/4 left-4 z-10 max-w-[70%]">
          <p className="text-[18px] font-bold text-white leading-tight whitespace-pre-line">{bannerMessage}</p>
        </div>
      )}
    </div>
  );
};
