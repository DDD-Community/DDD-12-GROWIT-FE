'use client';

import { useState, useEffect } from 'react';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { SwipeableRow } from './SwipeableRow';
import { TodoItemCheckbox } from './TodoItemCheckbox';
import { CategoryMatrixIcon, MatrixCategory } from './CategoryMatrixIcon';

/** "HH:mm" → "오전/오후 h:mm" */
const formatTimeLabel = (time: string): string => {
  const m = /^(\d{2}):(\d{2})$/.exec(time);
  if (!m) return time;
  const hour24 = Number(m[1]);
  const minute = m[2];
  const isAM = hour24 < 12;
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${isAM ? '오전' : '오후'} ${hour12}:${minute}`;
};

interface ListViewProps {
  todos: GoalTodo[];
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  onDelete?: (todoId: string) => void;
  onEdit?: (todo: GoalTodo) => void;
}

/** 목표 Tag (circle-dashed 아이콘 + label) */
const GoalTag = ({ name }: { name: string }) => (
  <span className="inline-flex items-center gap-1 bg-[#27272A] rounded-xl px-1 py-0.5">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="4.5" stroke="#9F9FA9" strokeWidth="0.8" strokeDasharray="2 2" />
    </svg>
    <span className="text-xs leading-[133%] text-[#9F9FA9]">{name}</span>
  </span>
);

const ListTodoItem = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: GoalTodo;
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  onDelete?: (todoId: string) => void;
  onEdit?: (todo: GoalTodo) => void;
}) => {
  const [checked, setChecked] = useState(todo.isCompleted);

  useEffect(() => {
    setChecked(todo.isCompleted);
  }, [todo.isCompleted]);

  const handleCheck = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggle?.(todo.id, newChecked);
  };

  return (
    <SwipeableRow
      onComplete={handleCheck}
      onDelete={onDelete ? () => onDelete(todo.id) : undefined}
    >
      <div
        className="flex items-center gap-2 bg-[#171717] rounded-[20px]"
        style={{ padding: '14px 16px' }}
      >
        <TodoItemCheckbox checked={checked} onClick={handleCheck} />
        <div className="flex flex-col gap-[2px] flex-1 min-w-0 cursor-pointer" onClick={() => onEdit?.(todo)}>
          <p
            className={`text-sm leading-[142%] truncate ${
              checked ? 'line-through text-[#70737C]' : 'text-white'
            }`}
          >
            {todo.content}
          </p>
          {todo.time && (
            <p className="text-[12px] leading-[1.33] text-[#737373]">
              {formatTimeLabel(todo.time)}
            </p>
          )}
        </div>
        {todo.goal?.name && todo.goal.name !== '미분류' && (
          <GoalTag name={todo.goal.name} />
        )}
        <CategoryMatrixIcon
          category={(todo.category as MatrixCategory) || 'NOW'}
          size={16}
        />
      </div>
    </SwipeableRow>
  );
};

export const ListView = ({ todos, onToggle, onDelete, onEdit }: ListViewProps) => {
  return (
    <div className="flex flex-col gap-2 mb-5">
      {todos.map(todo => (
        <ListTodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
