'use client';

import { useState, useEffect } from 'react';
import { GoalTodo } from '@/shared/type/GoalTodo';
import Checkbox from '@/shared/components/input/Checkbox';

interface CategoryCardProps {
  title: string;
  accentColor: string;
  bgStyle?: string;
  todos: GoalTodo[];
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  onEdit?: (todo: GoalTodo) => void;
  onAdd?: () => void;
  onCardClick?: () => void;
}

const TodoItem = ({
  todo,
  onToggle,
  onEdit,
}: {
  todo: GoalTodo;
  onToggle?: (todoId: string, isCompleted: boolean) => void;
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
    <div className="flex items-center gap-2 bg-transparent" onClick={e => e.stopPropagation()}>
      <Checkbox checked={checked} onClick={handleCheck} />
      <span
        className={`text-sm leading-snug tracking-tight flex-1 cursor-pointer ${
          checked ? 'line-through text-[#70737C]' : 'text-white'
        }`}
        onClick={() => onEdit?.(todo)}
      >
        {todo.content}
      </span>
    </div>
  );
};

export const CategoryCard = ({ title, accentColor, bgStyle, todos, onToggle, onEdit, onAdd, onCardClick }: CategoryCardProps) => {
  return (
    <div
      className={`flex-1 rounded-3xl p-4 flex flex-col gap-3 min-w-[calc(50%-4px)] min-h-[200px] cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06),0_0_1px_rgba(0,0,0,0.06)] ${bgStyle || 'bg-[#1C1917]'}`}
      onClick={onCardClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold" style={{ color: accentColor }}>
          {title}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onAdd?.(); }}
          className="w-6 h-6 flex items-center justify-center text-[#A1A1A1] hover:text-white transition-colors"
          aria-label={`${title} 투두 추가`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Todo items */}
      {todos.length > 0 ? (
        <div className="flex flex-col gap-2">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onEdit={onEdit} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#70737C]">할 일이 없어요</p>
      )}
    </div>
  );
};
