'use client';

import { useFormContext } from 'react-hook-form';
import { GoalFormData } from '@/shared/type/form';
import { GoalCategoryEnum } from '@/shared/type/goal';
import { GOAL_CATEGORIES } from '@/shared/constants/goalCategory';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useFunnelHeader } from '@/shared/components/layout/FunnelHeader';
import { CreateGoalResponseData } from '@/feature/goal/confimGoal/api';
import { MentorCharacterType } from '@/feature/goal/mentorCharacterCard';
import Image from 'next/image';

interface Step5SummaryProps {
  onNext: () => void;
  createGoalResult: CreateGoalResponseData | null;
}

export const Step5Summary = ({ onNext, createGoalResult }: Step5SummaryProps) => {
  const { hideHeader } = useFunnelHeader();
  const { watch } = useFormContext<GoalFormData>();
  const formValues = watch();
  const selectedCategory = GOAL_CATEGORIES.find(cat => cat.id === formValues.category);
  const duration = formValues.duration;

  const getBackgroundImageByMentor = (mentor: MentorCharacterType | undefined) => {
    switch (mentor) {
      case MentorCharacterType.CONFUCIUS:
        return '/image/goal-bg-confucius.png';
      case MentorCharacterType.WARREN_BUFFETT:
        return '/image/goal-bg-warren.png';
      case MentorCharacterType.TIM_COOK:
        return '/image/goal-bg-timcook.png';
      default:
        return '/image/goal-bg-confucius.png';
    }
  };

  const getBackgroundImageByCategory = (category: string | undefined) => {
    switch (category) {
      case GoalCategoryEnum.STUDY:
        return '/image/goal-bg-confucius.png';
      case GoalCategoryEnum.FINANCE:
        return '/image/goal-bg-warren.png';
      case GoalCategoryEnum.IT_PROJECT:
        return '/image/goal-bg-timcook.png';
      default:
        return '/image/goal-bg-confucius.png';
    }
  };

  const getBackgroundImage = () => {
    if (createGoalResult?.mentor) {
      return getBackgroundImageByMentor(createGoalResult.mentor);
    }
    return getBackgroundImageByCategory(formValues.category);
  };

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return '-';
    const d = new Date(date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} (${['일', '월', '화', '수', '목', '금', '토'][d.getDay()]})`;
  };

  const formatDateRange = () => {
    if (!formValues.durationDate.startDate || !formValues.durationDate.endDate) return '-';
    const start = new Date(formValues.durationDate.startDate);
    const end = new Date(formValues.durationDate.endDate);
    return `${formatDate(start)} ~ ${formatDate(end)}`;
  };

  useEffect(() => {
    hideHeader();
  }, []);

  return (
    <div className="flex flex-1 flex-col bg-[#1B1C1E] overflow-hidden">
      {/* 백그라운드 이미지 */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.15) 48%, rgba(0, 0, 0, 0.51) 71%, rgba(0, 0, 0, 1) 81%), url(${getBackgroundImage()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 z-0">
        <Image src={getBackgroundImage()} alt="Background" fill className="object-cover" priority />
      </div>

      {/* 컨텐츠 */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* 헤더 영역 */}
        <div className="flex flex-col items-center gap-2 px-2 pt-12">
          <h1 className="text-[22px] text-[#F7F7F8] font-bold text-center leading-[1.364] tracking-[-0.0194em]">
            나만의 여정 시작하기
          </h1>
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="flex-1 flex flex-col items-center justify-end px-5 pb-[40px]">
          <div className="w-full max-w-[335px]">
            {/* 목표 정보 카드 */}
            <div className="bg-[#0F0F10] border border-[rgba(112,115,124,0.32)] rounded-lg p-5 space-y-4">
              {/* 목표명 */}
              <div className="bg-[rgba(46,47,51,0.88)] rounded-lg p-[10px_14px] flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#F7F7F8]" strokeWidth={1.67} />
                <span className="text-[#F7F7F8] text-base font-normal leading-[1.5] tracking-[0.0057em]">
                  {formValues.name || '-'}
                </span>
              </div>

              {/* 정보 목록 */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[rgba(174,176,182,0.61)] text-base font-medium leading-[1.5] tracking-[0.0057em]">
                    기간
                  </span>
                  <span className="text-[#3AEE49] text-base font-medium leading-[1.5] tracking-[0.0057em]">{`<${duration}주>`}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[rgba(174,176,182,0.61)] text-base font-medium leading-[1.5] tracking-[0.0057em]">
                    날짜
                  </span>
                  <span className="text-[#F7F7F8] text-base font-medium leading-[1.5] tracking-[0.0057em]">
                    {formatDateRange()}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[rgba(174,176,182,0.61)] text-base font-medium leading-[1.5] tracking-[0.0057em]">
                    분야
                  </span>
                  <span className="text-[#F7F7F8] text-base font-medium leading-[1.5] tracking-[0.0057em]">
                    {selectedCategory?.label || '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <FunnelNextButton onClick={onNext} variant="brand" text="여정 시작하기" />
      </div>
    </div>
  );
};
