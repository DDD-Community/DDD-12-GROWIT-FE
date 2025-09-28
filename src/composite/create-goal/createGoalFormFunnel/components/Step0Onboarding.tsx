'use client';

import { useFetchUserName } from '@/shared/hooks/useFetchUserName';
import Button from '@/shared/components/input/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';

interface Step0OnboardingProps {
  onNext: () => void;
}

export const Step0Onboarding = ({ onNext }: Step0OnboardingProps) => {
  const router = useRouter();
  const { userName } = useFetchUserName();

  const handleGoalSetting = () => {
    onNext();
  };

  const handleLater = () => {
    router.replace(ROUTES.HOME);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="absolute inset-0 z-0">
        <Image src="/landing/landing-background.png" alt="Background" fill className="object-cover" priority />
      </div>

      <div className="flex flex-col my-auto z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-[22px] font-bold leading-[1.36] text-[#F7F7F8] mb-2">
            그로롱과
            <br />
            목표를 설정해보세요
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          {/* Speech Bubble */}
          <div className="relative">
            <div className="bg-[#2E2F33] rounded-[20px] px-5 py-5 max-w-[243px]">
              <p className="text-[16px] font-normal leading-[1.5] text-white text-center">
                {userName ? `${userName}아, 반가워 👋` : '반가워 👋'}
                <br />
                함께 여정을 떠나볼까?
              </p>
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#2E2F33]" />
            </div>
          </div>

          {/* Growit Character */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-[200px] h-[200px]">
              <Image
                src="/image/grorong-welcome-m.png"
                alt="그로롱"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-[rgba(112,115,124,0.22)] rounded-2xl px-3 py-1">
              <span className="text-[14px] font-medium text-[rgba(194,196,200,0.88)]">그로롱</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="h-[150px]" />
      <div className="fixed bottom-0 left-0 right-0 p-[20px] border-gray-800 sm:hidden">
        <Button size="xl" text="목표 설정하기" onClick={handleGoalSetting} className="w-full" />
        <div className="h-[20px]" />
        <Button
          size="xl"
          type="button"
          text="다음에 할래요"
          variant="tertiary"
          onClick={handleLater}
          className="w-full"
        />
      </div>
    </div>
  );
};
