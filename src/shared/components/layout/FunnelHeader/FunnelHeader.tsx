'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useFunnelHeader } from './FunnelHeaderContext';

interface FunnelHeaderProps {
  currentStep?: number;
  totalSteps?: number;
  onBack?: () => void;
  title?: string;
  isVisible?: boolean;
}

export const FunnelHeader = ({
  currentStep: propCurrentStep,
  totalSteps: propTotalSteps,
  onBack: propOnBack,
  title: propTitle = '',
  isVisible: propIsVisible,
}: FunnelHeaderProps) => {
  const router = useRouter();
  const contextValue = useFunnelHeader();

  const currentStep = propCurrentStep ?? 1;
  const totalSteps = propTotalSteps ?? 1;
  const title = propTitle || '';
  const isVisible = propIsVisible ?? contextValue?.isVisible ?? true;

  const handleBack = () => {
    if (propOnBack) {
      propOnBack();
    } else {
      router.push('/home');
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="max-sm:hidden h-[65px]" />

      {/* Mobile Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 max-w-md mx-auto ${currentStep === 1 ? 'bg-transparent' : 'bg-[#1C1C1E]'}`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-base font-semibold text-white">{title}</h1>
          </div>

          <div className="text-white text-sm min-w-[40px] text-right" />
        </div>

        {currentStep > 1 && (
          <div className="w-full px-4">
            <div className="h-1 bg-[#70737C38] rounded-full">
              <div
                className="h-full bg-[#3AEE49] rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="sm:hidden h-[65px]" />
    </>
  );
};
