'use client';

import { CreateGoalFormElement } from '@/feature/goal';
import Button from '@/shared/components/input/Button';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { createCreateGoalMutation } from '@/model/goal/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';
import { useToast } from '@/shared/components/feedBack/toast';
import { GoalQueryKeys } from '@/model/goal/queryKeys';

export const CreateGoalForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { mutate: createGoal } = useMutation(
    createCreateGoalMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: GoalQueryKeys.progress() });
        router.push(ROUTES.GOAL);
        showToast('목표 생성이 완료되었습니다.', 'success');
      },
      onError: () => {
        showToast('목표 생성에 실패했습니다.', 'error');
      },
    })
  );
  return (
    <CreateGoalFormElement.Provider>
      <CreateGoalFormElement.FormContainer onSubmit={data => createGoal(data)}>
        <PageHeader
          title="목표 추가"
          rightSection={<Button type="submit" variant="tertiary" size="sm" text="완료" />}
        />
        <div className="flex flex-col gap-8 pt-10 px-5">
          <div className="flex flex-col gap-5">
            <CreateGoalFormElement.Name />
            <CreateGoalFormElement.SelectStartDate />
            <CreateGoalFormElement.SelectEndDate />
          </div>
        </div>
      </CreateGoalFormElement.FormContainer>
    </CreateGoalFormElement.Provider>
  );
};
