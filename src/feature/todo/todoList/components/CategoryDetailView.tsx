'use client';

import { useState, useEffect } from 'react';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { motion, AnimatePresence } from 'motion/react';
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

type CategoryType = 'NOW' | 'STEADY' | 'SKIP' | 'DELETE';

const CATEGORY_META: Record<CategoryType, {
  title: string;
  badges: { label: string; color: string; bg: string }[];
  subtitle: string;
  emoji: string;
}> = {
  NOW: {
    title: '빨리 끝내기',
    badges: [
      { label: '신속', color: '#FF383C', bg: 'rgba(255,56,60,0.15)' },
      { label: '중요', color: '#FF383C', bg: 'rgba(255,56,60,0.15)' },
    ],
    subtitle: '컨디션이 가장 좋은 아침에 끝내세요.',
    emoji: '☀️',
  },
  STEADY: {
    title: '천천히 끝내기',
    badges: [
      { label: '꾸준', color: '#FF8904', bg: 'rgba(255,137,4,0.15)' },
    ],
    subtitle: '여유를 갖고 차근차근 진행하세요.',
    emoji: '🌙',
  },
  SKIP: {
    title: '넘겨도',
    badges: [
      { label: '유연', color: '#51A2FF', bg: 'rgba(81,162,255,0.15)' },
    ],
    subtitle: '오늘 못해도 괜찮아요.',
    emoji: '💨',
  },
  DELETE: {
    title: '지워도',
    badges: [
      { label: '정리', color: '#ABAB9C', bg: 'rgba(171,171,156,0.15)' },
    ],
    subtitle: '필요 없다면 과감히 지워도 돼요.',
    emoji: '🗑️',
  },
};

/** 루틴 반복 태그 */
const RoutineTag = ({ routine }: { routine: GoalTodo['routine'] }) => {
  if (!routine) return null;

  const labelMap: Record<string, string> = {
    DAILY: '매일',
    WEEKLY: '매주',
    BIWEEKLY: '격주',
    MONTHLY: '매월',
    YEARLY: '매년',
  };

  return (
    <span className="inline-flex items-center gap-1 bg-[#404040] rounded-xl px-1 py-0.5">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1.5 6.5C1.5 4 3.5 2 6 2c1.7 0 3.1.9 3.9 2.3M10.5 5.5C10.5 8 8.5 10 6 10c-1.7 0-3.1-.9-3.9-2.3" stroke="#A1A1A1" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M9 2v2.5h-2.5" stroke="#A1A1A1" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 10V7.5h2.5" stroke="#A1A1A1" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xs leading-[133%] text-[#A1A1A1]">{labelMap[routine.repeatType] || routine.repeatType}</span>
    </span>
  );
};

/** 목표 태그 */
const GoalTag = ({ name }: { name: string }) => (
  <span className="inline-flex items-center gap-1 bg-[#404040] rounded-xl px-1 py-0.5">
    <span className="text-xs leading-[133%] text-[#A1A1A1]">#{name}</span>
  </span>
);

interface CategoryDetailViewProps {
  category: CategoryType;
  todos: GoalTodo[];
  isOpen: boolean;
  onClose: () => void;
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  onDelete?: (todoId: string) => void;
  onEdit?: (todo: GoalTodo) => void;
  onAdd?: () => void;
}

const DetailTodoItem = ({
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

  const hasTime = !!todo.time;
  const hasTags = todo.routine || (todo.goal?.name && todo.goal.name !== '미분류');
  const isMultiLine = hasTime || hasTags;

  return (
    <SwipeableRow
      onComplete={handleCheck}
      onDelete={onDelete ? () => onDelete(todo.id) : undefined}
    >
      <div className={`flex gap-2 py-1.5 ${isMultiLine ? 'items-start' : 'items-center'}`}>
        <div className={isMultiLine ? 'pt-0.5' : ''}>
          <TodoItemCheckbox checked={checked} onClick={handleCheck} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <span
            className={`text-sm leading-[142%] font-medium cursor-pointer ${
              checked ? 'line-through text-[#A1A1A1]' : 'text-white'
            }`}
            onClick={() => onEdit?.(todo)}
          >
            {todo.content}
          </span>
          {hasTime && (
            <p className="text-[12px] leading-[1.33] text-[#737373]">
              {formatTimeLabel(todo.time as string)}
            </p>
          )}
          {hasTags && (
            <div className={`flex items-center gap-1 ${checked ? 'opacity-50' : ''}`}>
              {todo.routine && <RoutineTag routine={todo.routine} />}
              {todo.goal?.name && todo.goal.name !== '미분류' && (
                <GoalTag name={todo.goal.name} />
              )}
            </div>
          )}
        </div>
        <div className={isMultiLine ? 'pt-0.5' : ''}>
          <CategoryMatrixIcon
            category={(todo.category as MatrixCategory) || 'NOW'}
          />
        </div>
      </div>
    </SwipeableRow>
  );
};

export const CategoryDetailView = ({
  category,
  todos,
  isOpen,
  onClose,
  onToggle,
  onDelete,
  onEdit,
  onAdd,
}: CategoryDetailViewProps) => {
  const meta = CATEGORY_META[category];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-0 z-[999] flex flex-col max-w-md mx-auto"
        >
          {/* Figma 107:1219 — 3-layer 워크스페이스 배경 + dark gradient overlay */}
          <div className="absolute inset-0 overflow-hidden">
            {/* base: 전체 데스크 와이드샷 (Figma 107:1220) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/detail-bg-base.jpg)' }}
            />
            {/* mid: 작업 공간 (Figma 107:1221) — 화면 하단 정렬, 16px 아래로 살짝 빠짐 */}
            <div
              className="absolute inset-x-0 -bottom-4 bg-contain bg-bottom bg-no-repeat"
              style={{
                backgroundImage: 'url(/images/detail-bg-mid.jpg)',
                aspectRatio: '390/860',
              }}
            />
            {/* front: 커피 머그 + 캐릭터 (Figma 107:1222) — 가운데 정렬, 폭 113% */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-contain bg-bottom bg-no-repeat w-[113%]"
              style={{
                backgroundImage: 'url(/images/detail-bg-front.jpg)',
                aspectRatio: '442/895',
              }}
            />
            {/* dark gradient overlay (Figma 107:1223) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, #081C32 0%, rgba(64,85,115,0.25) 100%)',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative flex flex-col flex-1 pt-[50px] overflow-y-auto">
            {/* Figma 107:1230 — back / IcMatrixRed / add (각 40x40 rounded-3xl) */}
            <div className="flex items-center justify-between px-5 mb-6">
              <button
                onClick={onClose}
                aria-label="뒤로 가기"
                className="w-10 h-10 rounded-[24px] bg-[#EBEBEC] flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M10 12.667L5.333 8 10 3.333"
                    stroke="#27272A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <CategoryMatrixIcon category={category} size={40} />

              <button
                onClick={onAdd}
                aria-label="투두 추가"
                className="w-10 h-10 rounded-[24px] bg-[#EBEBEC] flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M8 3.33V12.67M3.33 8H12.67"
                    stroke="#27272A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Card - hug content, not flex-1 */}
            <div className="mx-5 rounded-2xl bg-[#171717] shadow-[0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_rgba(0,0,0,0.06),0px_2px_4px_rgba(0,0,0,0.04)]">
              <div className="px-6 pt-6 pb-8 flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[20px] font-bold leading-[130%] text-white">
                      {meta.title}
                    </h2>
                    <div className="flex items-center gap-1">
                      {meta.badges.map(badge => (
                        <span
                          key={badge.label}
                          className="px-2 py-1.5 rounded-3xl text-xs font-medium leading-[134%]"
                          style={{ backgroundColor: badge.bg, color: badge.color }}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-base">{meta.emoji}</span>
                    <span className="text-xs leading-[133%] text-[#A1A1A1]">
                      {meta.subtitle}
                    </span>
                  </div>
                </div>

                {/* Todo list */}
                <div className="flex flex-col gap-4">
                  {todos.length > 0 ? (
                    todos.map(todo => (
                      <DetailTodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-[#737373]">할 일이 없어요</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
