'use client';

import { useState, useEffect } from 'react';
import { GoalTodo } from '@/shared/type/GoalTodo';
import Checkbox from '@/shared/components/input/Checkbox';
import { SwipeableRow } from './SwipeableRow';

interface CategoryCardProps {
  title: string;
  emoji: string;
  accentColor: string;
  bgStyle?: string;
  todos: GoalTodo[];
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  onDelete?: (todoId: string) => void;
  onEdit?: (todo: GoalTodo) => void;
  onAdd?: () => void;
  onCardClick?: () => void;
}

const TodoItem = ({
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
      <div className="flex items-start gap-1 bg-transparent" onClick={e => e.stopPropagation()}>
        <div className="pt-1 shrink-0">
          <Checkbox checked={checked} onClick={handleCheck} />
        </div>
        <div
          className="flex flex-col flex-1 min-w-0 cursor-pointer"
          onClick={() => onEdit?.(todo)}
        >
          <p
            className={`text-[14px] leading-[1.42] truncate ${
              checked ? 'line-through text-[#A1A1A1]' : 'text-white'
            }`}
          >
            {todo.content}
          </p>
          <p className="text-[10px] leading-[1.33] text-[#737373] min-h-[13px]">
            {/* 시간 표시는 BE datetime 필드 추가 후 활성 (DEVS-12 PR-C 트랙) */}
          </p>
        </div>
      </div>
    </SwipeableRow>
  );
};

export const CategoryCard = ({
  title,
  emoji,
  accentColor,
  bgStyle,
  todos,
  onToggle,
  onDelete,
  onEdit,
  onAdd,
  onCardClick,
}: CategoryCardProps) => {
  const completed = todos.filter(t => t.isCompleted).length;
  const total = todos.length;

  return (
    <div
      className={`relative flex-1 rounded-[24px] flex flex-col gap-3 px-4 py-3 min-w-[calc(50%-4px)] min-h-[200px] cursor-pointer overflow-hidden ${bgStyle ?? 'bg-[rgba(53,83,14,0.16)]'}`}
      onClick={onCardClick}
    >
      {/* Header: char icon + label + count + add (Figma 196:1618) */}
      <div className="flex items-center gap-1 relative z-10">
        <span
          className="text-[20px] leading-none shrink-0 w-6 h-6 flex items-center justify-center"
          aria-hidden="true"
        >
          {emoji}
        </span>
        <div className="flex items-center gap-1.5 flex-1 min-w-0 text-[12px] leading-[1.33]">
          <span
            className="font-semibold truncate"
            style={{ color: accentColor }}
          >
            {title}
          </span>
          <span className="font-normal text-[#737373] shrink-0">
            {completed}/{total}
          </span>
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            onAdd?.();
          }}
          className="flex items-center justify-center w-8 h-8 p-2 rounded-2xl text-[#A1A1A1] hover:text-white transition-colors shrink-0"
          aria-label={`${title} 투두 추가`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8 3.33V12.67M3.33 8H12.67"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Todo items */}
      <div className="flex flex-col gap-2 relative z-10">
        {todos.length > 0 ? (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        ) : (
          <p className="text-[14px] leading-[1.42] text-[#737373]">등록된 투두가 없어요</p>
        )}
      </div>
    </div>
  );
};
