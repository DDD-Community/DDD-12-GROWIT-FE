'use client';

import { useFormContext } from 'react-hook-form';
import { GoalFormData } from '@/shared/type/form';

interface Step4SummaryProps {}

const GOAL_CATEGORIES = [
  { id: 'health', label: '건강', icon: '💪' },
  { id: 'study', label: '학습', icon: '📚' },
  { id: 'career', label: '커리어', icon: '💼' },
  { id: 'hobby', label: '취미', icon: '🎨' },
  { id: 'relationship', label: '관계', icon: '🤝' },
  { id: 'finance', label: '재정', icon: '💰' },
];

export const Step4Summary = ({}: Step4SummaryProps) => {
  const { watch } = useFormContext<GoalFormData>();
  const formValues = watch();
  
  const selectedCategory = GOAL_CATEGORIES.find(cat => cat.id === (formValues as any).category);
  
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return '-';
    const d = new Date(date);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };
  
  const calculateDuration = () => {
    if (!formValues.duration.startDate || !formValues.duration.endDate) return '-';
    const start = new Date(formValues.duration.startDate);
    const end = new Date(formValues.duration.endDate);
    const weeks = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7));
    return `${weeks}주`;
  };


  return (
    <div className="flex flex-col gap-8">
      {/* 요약 정보 영역 */}
      <div>
        <div className="flex flex-col gap-[8px] mb-[24px]">
          <p className="heading-2-bold text-white">목표 설정 완료</p>
          <p className="label-1-regular text-neutral-400">
            설정하신 목표 내용을 확인해주세요.
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          {/* 카테고리 */}
          <div className="border-b border-gray-700 pb-4">
            <p className="caption-1-regular text-neutral-400 mb-2">카테고리</p>
            <div className="flex items-center gap-2">
              {selectedCategory && (
                <>
                  <span className="text-2xl">{selectedCategory.icon}</span>
                  <span className="label-1-bold text-white">{selectedCategory.label}</span>
                </>
              )}
            </div>
          </div>
          
          {/* 목표 이름 */}
          <div className="border-b border-gray-700 pb-4">
            <p className="caption-1-regular text-neutral-400 mb-2">목표 이름</p>
            <p className="body-1-regular text-white">{formValues.name || '-'}</p>
          </div>
          
          {/* 기간 */}
          <div className="border-b border-gray-700 pb-4">
            <p className="caption-1-regular text-neutral-400 mb-2">기간</p>
            <p className="body-1-regular text-white">{calculateDuration()}</p>
          </div>
          
          {/* 시작일 & 종료일 */}
          <div className="flex gap-8">
            <div className="flex-1">
              <p className="caption-1-regular text-neutral-400 mb-2">시작일</p>
              <p className="body-1-regular text-white">{formatDate(formValues.duration.startDate)}</p>
            </div>
            <div className="flex-1">
              <p className="caption-1-regular text-neutral-400 mb-2">종료일</p>
              <p className="body-1-regular text-white">{formatDate(formValues.duration.endDate)}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};