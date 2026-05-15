'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { SwipeableRow } from './SwipeableRow';
import { TodoItemCheckbox } from './TodoItemCheckbox';

/** "HH:mm" → "AM/PM h:mm" (Figma 169:1646 sample shows "AM 10:45") */
const formatTimeLabel = (time: string): string => {
  const m = /^(\d{2}):(\d{2})$/.exec(time);
  if (!m) return time;
  const hour24 = Number(m[1]);
  const minute = m[2];
  const isAM = hour24 < 12;
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${isAM ? 'AM' : 'PM'} ${hour12}:${minute}`;
};

type StatusCategory = 'NOW' | 'STEADY';

const STATUS_META: Record<
  StatusCategory,
  { label: string; labelColor: string; iconSrc: string }
> = {
  NOW: {
    label: '긴급',
    labelColor: '#FF6467',
    iconSrc: '/icon/category-now.png',
  },
  STEADY: {
    label: '꾸준히',
    labelColor: '#FF8904',
    iconSrc: '/icon/category-steady.png',
  },
};

interface WeeklyImportantStatusViewProps {
  todos: GoalTodo[];
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  onDelete?: (todoId: string) => void;
  onEdit?: (todo: GoalTodo) => void;
  onAdd?: (category?: StatusCategory) => void;
}

const StatusTaskItem = ({
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
    const next = !checked;
    setChecked(next);
    onToggle?.(todo.id, next);
  };

  return (
    <SwipeableRow
      onComplete={handleCheck}
      onDelete={onDelete ? () => onDelete(todo.id) : undefined}
    >
      <div
        className={`flex gap-1 ${todo.time ? 'items-start' : 'items-center'}`}
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

const StatusCard = ({
  category,
  todos,
  onToggle,
  onDelete,
  onEdit,
  onAdd,
}: {
  category: StatusCategory;
  todos: GoalTodo[];
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  onDelete?: (todoId: string) => void;
  onEdit?: (todo: GoalTodo) => void;
  onAdd?: (category: StatusCategory) => void;
}) => {
  const meta = STATUS_META[category];
  const completed = todos.filter(t => t.isCompleted).length;
  const total = todos.length;
  const ratio = total > 0 ? completed / total : 0;

  return (
    <div className="flex-1 min-w-0 relative h-full overflow-hidden rounded-[24px] px-4 py-3 flex flex-col gap-3 shadow-[0px_2px_4px_rgba(0,0,0,0.04),0px_1px_2px_rgba(0,0,0,0.06),0px_0px_1px_rgba(0,0,0,0.06)] drop-shadow-[0px_1px_1px_rgba(10,13,18,0.05)]">
      {/* base lime-900 16% */}
      <div
        className="absolute inset-0 rounded-[24px]"
        style={{ backgroundColor: 'rgba(53,83,14,0.16)' }}
        aria-hidden="true"
      />
      {/* gauge: lime-400 32%, height = completion ratio (Figma 169:1629) */}
      <div
        className="absolute left-0 right-0 bottom-0 rounded-bl-[24px] rounded-br-[24px] transition-[height] duration-500 ease-out"
        style={{
          height: `${ratio * 100}%`,
          backgroundColor: 'rgba(154,230,0,0.32)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-1">
        <Image
          src={meta.iconSrc}
          alt=""
          width={24}
          height={24}
          className="shrink-0 select-none"
          priority
        />
        <div className="flex items-center gap-1.5 flex-1 min-w-0 text-[12px] leading-[1.33]">
          <span
            className="font-semibold truncate"
            style={{ color: meta.labelColor }}
          >
            {meta.label}
          </span>
          <span className="font-normal text-[#737373] shrink-0">
            {completed}/{total}
          </span>
        </div>
        <button
          onClick={() => onAdd?.(category)}
          className="flex items-center justify-center w-8 h-8 p-2 rounded-2xl text-[#A1A1A1] hover:text-white transition-colors shrink-0"
          aria-label={`${meta.label} 투두 추가`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 3.33V12.67M3.33 8H12.67"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Tasks */}
      <div className="relative z-10 flex flex-col gap-2">
        {todos.length > 0 ? (
          todos.map(todo => (
            <StatusTaskItem
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

/**
 * Figma 169:1559 — 시안1_다크_주_현황 (중요 태스크 현황).
 *
 * 선택된 날짜의 중요(NOW)/꾸준히(STEADY) 카테고리 투두를 카드 두 개로 보여주고,
 * 각 카드는 완료 비율만큼 lime-400/0.32 게이지가 차오른다.
 */
export const WeeklyImportantStatusView = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onAdd,
}: WeeklyImportantStatusViewProps) => {
  const nowTodos = todos.filter(t => t.category === 'NOW');
  const steadyTodos = todos.filter(t => t.category === 'STEADY');
  const importantTodos = [...nowTodos, ...steadyTodos];
  const completed = importantTodos.filter(t => t.isCompleted).length;
  const total = importantTodos.length;

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0 mb-5">
      {/* Header: 중요 태스크 현황 + n/m */}
      <div className="flex flex-col gap-1 p-1 overflow-hidden">
        <p className="text-[14px] font-bold leading-[1.429] tracking-[0.203px] text-[#A1A1A1] truncate">
          중요 태스크 현황
        </p>
        <div className="flex items-end font-medium text-[56px] leading-[1.286] tracking-[-1.7864px]">
          <span className="text-white">{completed}</span>
          <span className="text-[#525252]">/{total}</span>
        </div>
      </div>

      {/* Two cards */}
      <div className="flex gap-2 flex-1 min-h-0 items-stretch">
        <StatusCard
          category="NOW"
          todos={nowTodos}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onAdd={onAdd}
        />
        <StatusCard
          category="STEADY"
          todos={steadyTodos}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onAdd={onAdd}
        />
      </div>
    </div>
  );
};
