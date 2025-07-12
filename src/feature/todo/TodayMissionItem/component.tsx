import { useState } from 'react';
import Checkbox from '@/shared/components/input/Checkbox';
import { Todo } from '@/shared/type/Todo';
import { usePatchTodoStatus } from './hooks';

interface TodoItemProps {
  todo: Todo;
}

export const TodayMissionItem = ({ todo }: TodoItemProps) => {
  const [checked, setChecked] = useState(todo.isCompleted);
  const [hideCheckbox, setHideCheckbox] = useState(false);
  const { mutate, isLoading } = usePatchTodoStatus();

  const handleCheck = async () => {
    if (checked || isLoading) return;
    setChecked(true);
    await mutate(todo.id, true);
    setHideCheckbox(true);
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
