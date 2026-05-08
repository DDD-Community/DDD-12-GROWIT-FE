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
      <div className="flex items-center gap-2 bg-transparent" onClick={e => e.stopPropagation()}>
        <Checkbox checked={checked} onClick={handleCheck} />
        <span
          className={`text-sm leading-snug tracking-tight flex-1 cursor-pointer truncate ${
            checked ? 'line-through text-[#70737C]' : 'text-white'
          }`}
          onClick={() => onEdit?.(todo)}
        >
          {todo.content}
        </span>
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
      className={`flex-1 rounded-3xl p-4 flex flex-col gap-3 min-w-[calc(50%-4px)] min-h-[200px] cursor-pointer ${bgStyle || 'bg-[#0A0A0A]'}`}
      onClick={onCardClick}
    >
      {/* Header: emoji + label + count + add */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-base leading-none shrink-0" aria-hidden="true">
            {emoji}
          </span>
          <span className="text-xs font-semibold truncate" style={{ color: accentColor }}>
            {title}
          </span>
          <span className="text-xs font-medium text-[#70737C] shrink-0">
            {completed}/{total}
          </span>
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            onAdd?.();
          }}
          className="w-6 h-6 flex items-center justify-center text-[#A1A1A1] hover:text-white transition-colors shrink-0"
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
            <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Todo items */}
      {todos.length > 0 ? (
        <div className="flex flex-col gap-2">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#70737C]">등록된 투두가 없어요</p>
      )}
    </div>
  );
};
