'use client';

import { useState } from 'react';
import Checkbox from '@/shared/components/input/Checkbox';
import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { usePatchTodoStatus } from '../hooks';

interface WeeklyTodoItemProps {
  todo: Todo;
  currentDayOfWeek: DAY_OF_THE_WEEK;
  onToggleTodo: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
}

export const TodayMissionItem = ({ todo, onToggleTodo, currentDayOfWeek }: WeeklyTodoItemProps) => {
  const [checked, setChecked] = useState(todo.isCompleted);
  const [hideCheckbox, setHideCheckbox] = useState(false);
  const { mutate, isLoading } = usePatchTodoStatus();

  const handleCheck = async () => {
    if (checked || isLoading) return;
    setChecked(true);
    await mutate(todo.id, true);
    setHideCheckbox(true);
    onToggleTodo(currentDayOfWeek, todo.id);
  };

  return (
    <div className="flex items-center gap-3">
      {!hideCheckbox && <Checkbox checked={checked} onChange={handleCheck} disabled={checked || isLoading} />}
      <span className={`text-base ${checked ? 'line-through text-label-disable' : 'text-label-normal'}`}>
        {todo.content}
      </span>
    </div>
  );
};
