'use client';

import { EditGoalFormElement } from '@/feature/goal/editGoalFormElement';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoalQueryKeys } from '@/model/goal/queryKeys';
import { Goal } from '@/shared/type/goal';
import { Info } from 'lucide-react';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import Button from '@/shared/components/input/Button';
import { createEditGoalMutation } from '@/model/goal/hooks';
import { useToast } from '@/shared/components/feedBack/toast';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';

export default function GoalEditFormController({ goalId }: { goalId: string }) {
  const queryClient = useQueryClient();
  const progressGoals = queryClient.getQueryData<Goal[]>(GoalQueryKeys.progress());
  const currentGoal = progressGoals?.find(goal => goal.id === goalId);

  // 새로고침 대응을 위해 캐시가 없으면 현재 목표 패칭하는 로직 추가 예정

  if (!currentGoal) return <div>목표를 찾을 수 없습니다</div>;

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-[#1B1C1E]">
      <GoalEditForm currentGoal={currentGoal} />
    </div>
  );
}

export const GoalEditForm = ({ currentGoal }: { currentGoal: Goal }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate: editGoal } = useMutation(
    createEditGoalMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: GoalQueryKeys.progress() });
        showToast('수정이 완료되었습니다.', 'success');
        router.push(ROUTES.GOAL);
      },
      onError: () => {
        showToast('수정에 실패했습니다.', 'error');
      },
    })
  );

  return (
    <EditGoalFormElement.Provider initValue={currentGoal || undefined}>
      <EditGoalFormElement.FormContainer onSubmit={data => editGoal(data)}>
        <PageHeader
          title="목표 수정"
          rightSection={<Button type="submit" variant="tertiary" size="sm" text="완료" />}
        />
        <div className="flex flex-col gap-8 pt-10 px-5">
          <div className="flex flex-col gap-5">
            <EditGoalFormElement.Name />
            <EditGoalFormElement.SelectStartDate />
            <EditGoalFormElement.SelectEndDate />
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#FF6363]" />
              <span className="label-2-regular text-[#FF6363]">
                기간에 포함되지 않는 투두는 자동으로 기본 투두로 이동돼요.
              </span>
            </div>
          </div>
        </div>
      </EditGoalFormElement.FormContainer>
    </EditGoalFormElement.Provider>
  );
};
