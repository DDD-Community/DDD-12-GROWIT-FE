'use client';

import { useFormContext } from 'react-hook-form';
import { GoalFormData } from '@/shared/type/form';
import { GOAL_CATEGORIES } from '@/shared/constants/goalCategory';
import { GuideMessage } from './GuideMessage';

interface Step4SummaryProps {}

export const Step4Summary = ({}: Step4SummaryProps) => {
  const { watch } = useFormContext<GoalFormData>();
  const formValues = watch();

  const selectedCategory = GOAL_CATEGORIES.find(cat => cat.id === formValues.category);

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
      <div>
        <GuideMessage status="excited" text={'수고했어 :)\n마지막으로 목표를 확인해보자!'} highlight={['목표']} />
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <div className="border-b border-gray-700 pb-4">
            <p className="caption-1-regular text-neutral-400 mb-2">카테고리</p>
            <div className="flex items-center gap-2">
              {selectedCategory && <span className="label-1-bold text-white">{selectedCategory.label}</span>}
            </div>
          </div>

          <div className="border-b border-gray-700 pb-4">
            <p className="caption-1-regular text-neutral-400 mb-2">목표 이름</p>
            <p className="body-1-regular text-white">{formValues.name || '-'}</p>
          </div>

          <div className="border-b border-gray-700 pb-4">
            <p className="caption-1-regular text-neutral-400 mb-2">기간</p>
            <p className="body-1-regular text-white">{calculateDuration()}</p>
          </div>

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
