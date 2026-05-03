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
      className={`flex-1 rounded-xl p-4 flex flex-col gap-3 min-w-[calc(50%-4px)] min-h-[200px] cursor-pointer ${bgStyle || 'bg-[#1C1917]'}`}
      onClick={onCardClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold" style={{ color: accentColor }}>
          {title}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onAdd?.(); }}
          className="w-5 h-5 flex items-center justify-center text-[#A1A1A1] hover:text-white transition-colors"
          aria-label={`${title} 투두 추가`}
        >
          <span className="text-base leading-none">+</span>
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
