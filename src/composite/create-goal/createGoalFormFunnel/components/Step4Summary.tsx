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
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} (${['일', '월', '화', '수', '목', '금', '토'][d.getDay()]})`;
  };

  const calculateDuration = () => {
    if (!formValues.duration.startDate || !formValues.duration.endDate) return '-';
    const start = new Date(formValues.duration.startDate);
    const end = new Date(formValues.duration.endDate);
    const weeks = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7));
    return `<${weeks}주>`;
  };

  const formatDateRange = () => {
    if (!formValues.duration.startDate || !formValues.duration.endDate) return '-';
    const start = new Date(formValues.duration.startDate);
    const end = new Date(formValues.duration.endDate);
    return `${formatDate(start)} ~ ${formatDate(end)}`;
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <GuideMessage status="excited" text={'수고했어 :)\n마지막으로 목표를 확인해보자!'} highlight={['목표']} />
        <div className="bg-[#0F0F10] rounded-lg p-6 space-y-6">
          <div>
            <h3 className="body-1-bold text-white mb-4">{formValues.name || '-'}</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-zinc-300 mr-3">기간</span>
              <span className="text-[#3AEE49]">{calculateDuration()}</span>
            </div>

            <div className="flex items-center">
              <span className="text-zinc-300 mr-3">날짜</span>
              <span className="text-white">{formatDateRange()}</span>
            </div>

            <div className="flex items-center">
              <span className="text-zinc-300 mr-3">분야</span>
              <span className="text-white">{selectedCategory?.label || '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
