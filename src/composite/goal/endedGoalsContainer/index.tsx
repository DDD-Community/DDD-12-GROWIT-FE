'use client';

import Button from '@/shared/components/input/Button';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { EndedGoalItem } from '@/feature/goal/endedGoalItem';
import { GoalQuery, GoalMutation } from '@/model/goal/queries';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { GoalQueryKeys } from '@/model/goal/queryKeys';
import { useToast } from '@/shared/components/feedBack/toast';
import { Goal } from '@/shared/type/goal';

export default function EndedGoalsContainer() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [checkedGoals, setCheckedGoals] = useState<Set<Goal['id']>>(new Set());

  const { mutateAsync: deleteGoals } = useMutation(
    GoalMutation.deleteGoals({
      // 낙관적 업데이트 적용
      onMutate: () => {
        const previousData = queryClient.getQueryData<Goal[]>(GoalQueryKeys.ended());
        queryClient.setQueryData(GoalQueryKeys.ended(), (old: Goal[]) => {
          return old.filter(goal => !checkedGoals.has(goal.id));
        });

        return { previousData };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: GoalQueryKeys.ended() });
      },
      onError: (_, __, onMutateResult) => {
        // 실패 시, 롤백
        if (onMutateResult && typeof onMutateResult === 'object' && 'previousData' in onMutateResult) {
          queryClient.setQueryData(GoalQueryKeys.ended(), onMutateResult.previousData);
        }
        showToast('목표 삭제에 실패했습니다.', 'error');
      },
    })
  );

  const handleDelete = async () => {
    if (!isEditMode) return;
    if (checkedGoals.size > 0) await deleteGoals(checkedGoals);
    setCheckedGoals(new Set());
    setIsEditMode(false);
  };

  const renderRightSection = () => {
    return isEditMode ? (
      <Button
        type="button"
        size="sm"
        text="삭제"
        variant="tertiary"
        className="text-text-danger"
        onClick={handleDelete}
      />
    ) : (
      <Button
        type="button"
        size="sm"
        text="편집"
        variant="tertiary"
        className="text-text-primary"
        onClick={() => setIsEditMode(true)}
      />
    );
  };

  return (
    <main>
      <PageHeader title="종료 목표 수집함" rightSection={renderRightSection()} />
      <EndedGoalsList isEditMode={isEditMode} checkedGoals={checkedGoals} setCheckedGoals={setCheckedGoals} />
    </main>
  );
}

type EndedGoalsListProps = {
  isEditMode: boolean;
  checkedGoals: Set<Goal['id']>;
  setCheckedGoals: (checkedGoals: Set<Goal['id']>) => void;
};

function EndedGoalsList({ isEditMode, checkedGoals, setCheckedGoals }: EndedGoalsListProps) {
  const { data: endedGoals } = useSuspenseQuery(GoalQuery.getEndedGoals());

  const handleCheck = (goalId: Goal['id']) => {
    const newCheckedGoals = new Set(checkedGoals);
    if (newCheckedGoals.has(goalId)) {
      newCheckedGoals.delete(goalId);
    } else {
      newCheckedGoals.add(goalId);
    }
    setCheckedGoals(newCheckedGoals);
  };

  return (
    <ul className="grid grid-cols-2 gap-3 p-5">
      {!endedGoals || !endedGoals.length ? (
        <p className="col-span-2 body-2-regular text-text-secondary text-center pt-5">아직 종료된 목표가 없어요</p>
      ) : (
        endedGoals.map(goal => (
          <EndedGoalItem
            key={goal.id}
            goal={goal}
            isEditMode={isEditMode}
            checked={checkedGoals.has(goal.id)}
            onCheck={() => handleCheck(goal.id)}
          />
        ))
      )}
    </ul>
  );
}
