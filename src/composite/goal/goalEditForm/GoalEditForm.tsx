'use client';

import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { EditGoalFormElement } from '@/feature/goal/editGoalFormElement';
import { useGoalSelector } from '@/model/goal/context';
import { Info } from 'lucide-react';
import { EditGoalFormData } from '@/feature/goal/editGoalFormElement/type';
import { useToast } from '@/shared/components/feedBack/toast';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';

export const GoalEditForm = () => {
  const { push } = useRouter();
  const { showToast } = useToast();
  const { isLoading, currentGoal, updateGoal } = useGoalSelector();

  const handleFormSubmit = (data: EditGoalFormData) => {
    updateGoal({
      request: data,
      onSuccess: () => {
        showToast('수정이 완료되었습니다.', 'success');
        push(ROUTES.GOAL);
      },
      onError: () => showToast('수정에 실패했습니다.', 'error'),
    });
  };

  return (
    <EditGoalFormElement.Provider initValue={currentGoal || undefined}>
      <EditGoalFormElement.FormContainer onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <EditGoalFormElement.Name />
            <EditGoalFormElement.DurationSelector />
            <EditGoalFormElement.DateSelector />

            {/* TODO : 필드 활성화 상태 API 배포 시 삭제할 것 */}
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#FF6363]" />
              <span className="label-2-regular text-[#FF6363]">기간 및 날짜 수정은 불가해요.</span>
            </div>
          </div>
          <FunnelNextButton text="수정 완료" disabled={isLoading} type="submit" />
        </div>
      </EditGoalFormElement.FormContainer>
    </EditGoalFormElement.Provider>
  );
};
