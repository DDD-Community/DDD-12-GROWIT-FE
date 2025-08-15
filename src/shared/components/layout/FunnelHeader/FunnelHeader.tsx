'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface FunnelHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  title?: string;
}

export const FunnelHeader = ({ currentStep, totalSteps, onBack, title = '목표 생성하기' }: FunnelHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (currentStep === 1) {
      // 첫 번째 단계에서는 홈으로 이동
      router.push('/home');
    } else {
      // 다른 단계에서는 이전 단계로
      onBack();
    }
  };

  return (
    <>
      {/* Desktop Header - Mobile 스타일 적용 */}
      <div className="max-sm:hidden fixed top-0 left-[88px] right-0 bg-[#1C1C1E] border-b-[1px] border-line-normal z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* 왼쪽: 뒤로가기 버튼 */}
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* 중앙: 페이지 제목 */}
          <div className="flex-1 text-center">
            <h1 className="text-base font-semibold text-white">{title}</h1>
          </div>

          {/* 오른쪽: 단계 표시 */}
          <div className="text-white text-sm min-w-[40px] text-right" />
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-700">
          <div
            className="h-full bg-accent-violet transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop에서 fixed header를 위한 spacer */}
      <div className="max-sm:hidden h-[69px]" />

      {/* Mobile Header */}
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-[#1C1C1E] border-b-[1px] border-line-normal z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* 왼쪽: 뒤로가기 버튼 */}
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* 중앙: 페이지 제목 */}
          <div className="flex-1 text-center">
            <h1 className="text-base font-semibold text-white">{title}</h1>
          </div>

          {/* 오른쪽: 단계 표시 */}
          <div className="text-white text-sm min-w-[40px] text-right" />
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-700">
          <div
            className="h-full bg-accent-violet transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Mobile에서 fixed header를 위한 spacer */}
      <div className="sm:hidden h-[69px]" />
    </>
  );
};
