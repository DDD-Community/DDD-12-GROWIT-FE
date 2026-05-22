'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { SwipeableRow } from './SwipeableRow';
import { TodoItemCheckbox } from './TodoItemCheckbox';

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

interface CategoryCardProps {
  title: string;
  iconSrc: string;
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
      <div
        className={`flex gap-1 bg-transparent ${todo.time ? 'items-start' : 'items-center'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className={todo.time ? 'pt-0.5 shrink-0' : 'shrink-0'}>
          <TodoItemCheckbox checked={checked} onClick={handleCheck} />
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
          {todo.time && (
            <p className="text-[10px] leading-[1.33] text-[#737373]">
              {formatTimeLabel(todo.time)}
            </p>
          )}
        </div>
      </div>
    </SwipeableRow>
  );
};

export const CategoryCard = ({
  title,
  iconSrc,
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
      className={`relative flex-1 h-full rounded-[24px] flex flex-col gap-3 px-4 py-3 min-w-[calc(50%-4px)] cursor-pointer overflow-hidden shadow-[0px_2px_4px_rgba(0,0,0,0.04),0px_1px_2px_rgba(0,0,0,0.06),0px_0px_1px_rgba(0,0,0,0.06)] drop-shadow-[0px_1px_1px_rgba(10,13,18,0.05)] ${bgStyle ?? 'bg-[rgba(53,83,14,0.16)]'}`}
      onClick={onCardClick}
    >
      {/* Header: char icon + label + count + add (Figma 196:1618) */}
      <div className="flex items-center gap-1 relative z-10">
        <Image
          src={iconSrc}
          alt=""
          width={24}
          height={24}
          className="shrink-0 select-none"
          priority
        />
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
          <p className="text-[14px] leading-[1.42] text-[#525252] w-full text-center">
            등록된 투두가 없어요
          </p>
        )}
      </div>
    </div>
  );
};
