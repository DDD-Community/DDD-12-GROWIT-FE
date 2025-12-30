'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Button from '@/shared/components/input/Button';
import { PlusIcon } from '@/shared/constants/icons';
import { ROUTES } from '@/shared/constants/routes';
import { useTodosByDate } from '@/model/todo/todoList';

interface AddGoalButtonProps {
  selectedDate: Date;
}

export const AddGoalButton = ({ selectedDate }: AddGoalButtonProps) => {
  const router = useRouter();
  const dateString = format(selectedDate, 'yyyy-MM-dd');
  const { data: todosData } = useTodosByDate({ date: dateString });

  const todoCount = todosData?.length ?? 0;

  const handleAddGoal = useCallback(() => {
    router.push(ROUTES.CREATE_GOAL);
  }, [router]);

  // todo가 없으면 버튼 숨김
  if (todoCount === 0) {
    return null;
  }

  return (
    <div className="flex justify-center mb-[120px]">
      <Button
        size="ml"
        variant="tertiary"
        layout="icon-left"
        text="목표 추가하기"
        icon={<PlusIcon />}
        onClick={handleAddGoal}
        className="w-auto"
      />
    </div>
  );
};

export default AddGoalButton;
