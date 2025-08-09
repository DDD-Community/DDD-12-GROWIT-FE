'use client';

import { useState } from 'react';
import Checkbox from '@/shared/components/input/Checkbox';
import { Todo } from '@/shared/type/Todo';
import { useTodayTodoListActions, useTodayTodoListState } from '@/model/todo/todayTodoList/context';
import { useTodoBoardActions } from '../../../../model/todo/todoList';
import { useSelectedDayState } from '@/model/todo/selectedDay';

interface WeeklyTodoItemProps {
  todo: Todo;
}

export const TodayMissionItem = ({ todo }: WeeklyTodoItemProps) => {
  const { isLoading } = useTodayTodoListState();
  const { selectedDay } = useSelectedDayState();
  const { toggleTodoStatus: toggleTodoStatus } = useTodoBoardActions();
  const { toggleTodoStatus: toggleTodayTodoStatus } = useTodayTodoListActions();
  const [checked, setChecked] = useState(todo.isCompleted);
  const [hideCheckbox, setHideCheckbox] = useState(false);

  const handleCheck = async () => {
    if (checked) return;
    setChecked(true);
    await toggleTodoStatus(selectedDay, todo.id);
    await toggleTodayTodoStatus(todo.id, true);
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
