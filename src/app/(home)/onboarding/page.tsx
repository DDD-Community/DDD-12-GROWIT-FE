'use client';

import Image from 'next/image';
import Button from '@/shared/components/navigation/Button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnBoardingPage() {
  const router = useRouter();

  // 온보딩 페이지 진입 시 방문 날짜 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_visited_at', new Date().toISOString());
    }
  }, []);

  return (
    <div className="flex w-full h-full bg-[#1C1C1E]">
      <div className="flex flex-1 flex-col gap-14 px-4 py-8">
        <div className="flex w-full gap-5">
          <Image src="/niaaaang.png" alt="logo" className="w-[80px] h-[80px]" width={38} height={38} />
          <div className="bg-[#232326] rounded-2xl p-8 text-white text-base leading-relaxed shadow-lg">
            <p className="mb-2">안녕하다냥 🐱</p>
            <div>
              나는 정서의 목표 행성까지의 여정을 함께할 <b>동행자 그로냥</b>이당
              <br />
              우리의 4주간 여정의 목표 행성을 정해야한당
            </div>
            <div className="mt-4">
              <span className="underline text-accent-violet font-semibold">‘목표 추가 버튼’</span>을 눌러 최종 목적지를
              정해주라냥
            </div>
          </div>
          <div className="min-w-[80px] min-h-[80px]" />
        </div>
        <div className="flex w-full gap-5 flex-row-reverse">
          <div className="w-[80px] h-[80px]" />
          <div className="bg-[#232326] rounded-2xl p-6 flex flex-col gap-4 items-end shadow-lg">
            <div className="text-white">
              오케이 그로냥 반가워{' '}
              <span role="img" aria-label="waving hand">
                👋
              </span>
              <br />
              우리의 4주간의 여정 함께 잘 해보자!
            </div>
            <Button
              size="xl"
              text="+ 목표 추가"
              icon={<Image src="/icon/arrow-right.svg" alt="arrow right" width={24} height={24} />}
              onClick={() => router.push('/home/create-goal')}
            />
          </div>
          <div className="min-w-[80px] min-h-[80px]" />
        </div>
      </div>
    </div>
  );
}
