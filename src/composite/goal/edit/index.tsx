'use client';

import { EditGoalFormElement } from '@/feature/goal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GoalQuery } from '@/model/goal/queries';
import { GoalQueryKeys } from '@/model/goal/queryKeys';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import Button from '@/shared/components/input/Button';
import { GoalMutation } from '@/model/goal/queries';
import { useToast } from '@/shared/components/feedBack/toast';
import { useRouter, notFound } from 'next/navigation';
import type { Goal } from '@/shared/type/goal';

export default function GoalEditFormContent({ goalId }: { goalId: string }) {
  const { data: currentGoal, isError, isPending } = useQuery(
    GoalQuery.getGoalById(goalId, {
      enabled: !!goalId,
    })
  );

  if (!goalId) {
    notFound();
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center bg-bg-default">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
      </div>
    );
  }

  if (isError || !currentGoal) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-bg-default">
      <GoalEditForm currentGoal={currentGoal} />
    </div>
  );
}

export const GoalEditForm = ({ currentGoal }: { currentGoal: Goal }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate: editGoal } = useMutation(
    GoalMutation.editGoal({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: GoalQueryKeys.progress() });
        queryClient.invalidateQueries({ queryKey: GoalQueryKeys.byId(currentGoal.id) });
        showToast('수정이 완료되었습니다.', 'success');
        router.back();
      },
      onError: () => {
        showToast('수정에 실패했습니다.', 'error');
      },
    })
  );

  return (
    <EditGoalFormElement.Provider initValue={currentGoal || undefined}>
      <EditGoalFormElement.FormContainer
        onSubmit={data => editGoal({ ...currentGoal, name: data.name, duration: data.duration })}
      >
        <PageHeader
          title="목표 수정"
          rightSection={<Button type="submit" variant="tertiary" size="sm" text="완료" />}
        />
        <div className="flex flex-col gap-8 pt-10 px-5">
          <div className="flex flex-col gap-5">
            <EditGoalFormElement.Name />
            <EditGoalFormElement.SelectStartDate />
            <EditGoalFormElement.SelectEndDate />
            <EditGoalFormElement.DurationErrorMessage />
          </div>
        </div>
      </EditGoalFormElement.FormContainer>
    </EditGoalFormElement.Provider>
  );
};
