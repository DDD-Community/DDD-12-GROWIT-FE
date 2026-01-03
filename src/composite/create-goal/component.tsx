'use client';

import { CreateGoalFormElement } from '@/feature/goal';
import Button from '@/shared/components/input/Button';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { GoalMutation } from '@/model/goal/queries';
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
    GoalMutation.createGoal({
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
          <p className="flex items-center gap-x-2 text-text-danger caption-1-medium">
            <WarningIcon />
            목표 기간은 최소 1주, 최대 1년까지 설정 가능합니다.
          </p>
        </div>
      </CreateGoalFormElement.FormContainer>
    </CreateGoalFormElement.Provider>
  );
};

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.00016 14.6668C4.31816 14.6668 1.3335 11.6822 1.3335 8.00016C1.3335 4.31816 4.31816 1.3335 8.00016 1.3335C11.6822 1.3335 14.6668 4.31816 14.6668 8.00016C14.6668 11.6822 11.6822 14.6668 8.00016 14.6668ZM8.00016 13.3335C9.41465 13.3335 10.7712 12.7716 11.7714 11.7714C12.7716 10.7712 13.3335 9.41465 13.3335 8.00016C13.3335 6.58567 12.7716 5.22912 11.7714 4.22893C10.7712 3.22873 9.41465 2.66683 8.00016 2.66683C6.58567 2.66683 5.22912 3.22873 4.22893 4.22893C3.22873 5.22912 2.66683 6.58567 2.66683 8.00016C2.66683 9.41465 3.22873 10.7712 4.22893 11.7714C5.22912 12.7716 6.58567 13.3335 8.00016 13.3335ZM8.00016 4.66683C8.17697 4.66683 8.34654 4.73707 8.47157 4.86209C8.59659 4.98712 8.66683 5.15669 8.66683 5.3335V8.66683C8.66683 8.84364 8.59659 9.01321 8.47157 9.13823C8.34654 9.26326 8.17697 9.3335 8.00016 9.3335C7.82335 9.3335 7.65378 9.26326 7.52876 9.13823C7.40373 9.01321 7.3335 8.84364 7.3335 8.66683V5.3335C7.3335 5.15669 7.40373 4.98712 7.52876 4.86209C7.65378 4.73707 7.82335 4.66683 8.00016 4.66683ZM8.00016 11.3335C7.82335 11.3335 7.65378 11.2633 7.52876 11.1382C7.40373 11.0132 7.3335 10.8436 7.3335 10.6668C7.3335 10.49 7.40373 10.3204 7.52876 10.1954C7.65378 10.0704 7.82335 10.0002 8.00016 10.0002C8.17697 10.0002 8.34654 10.0704 8.47157 10.1954C8.59659 10.3204 8.66683 10.49 8.66683 10.6668C8.66683 10.8436 8.59659 11.0132 8.47157 11.1382C8.34654 11.2633 8.17697 11.3335 8.00016 11.3335Z"
        fill="#FF6363"
      />
    </svg>
  );
}
