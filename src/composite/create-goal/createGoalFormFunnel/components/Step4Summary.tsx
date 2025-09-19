'use client';

import { useFormContext } from 'react-hook-form';
import { GoalFormData } from '@/shared/type/form';
import { GOAL_CATEGORIES } from '@/shared/constants/goalCategory';
import { GuideMessage } from './GuideMessage';
import { ConfirmGoalButton } from '@/feature/goal/confimGoalButton';

interface Step4SummaryProps {}

export const Step4Summary = ({}: Step4SummaryProps) => {
  const { watch } = useFormContext<GoalFormData>();
  const formValues = watch();
  const selectedCategory = GOAL_CATEGORIES.find(cat => cat.id === formValues.category);
  const duration = formValues.duration;

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

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-8">
        <GuideMessage status="default" text={'수고했어 :)\n마지막으로 목표를 확인해보자!'} highlight={['목표']} />
        <div className="bg-[#0F0F10] mt-[20px] rounded-lg p-6 space-y-6">
          <div>
            <h3 className="body-1-bold text-white mb-4">{formValues.name || '-'}</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-zinc-300 mr-3">기간</span>
              <span className="text-[var(--color-brand-neon)]">{`<${duration}주>`}</span>
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
        <ConfirmGoalButton />
      </div>
    </div>
  );
};
