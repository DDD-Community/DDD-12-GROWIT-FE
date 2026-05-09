'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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

interface BgLayer {
  src: string;
  /** bg-position 앵커 — 캔버스 어디에 이미지를 붙일지 */
  anchor: 'top' | 'bottom' | 'center';
}

/**
 * Figma 107:1218 / 107:1279 / 115:929 / 116:929 — 카테고리별 배경 레이어.
 * 위에서부터 아래 순으로 stacking 되며, 마지막은 dark gradient overlay 별도.
 */
const CATEGORY_BG_LAYERS: Record<CategoryType, BgLayer[]> = {
  NOW: [
    { src: '/images/detail-bg-base.jpg', anchor: 'top' },
    { src: '/images/detail-bg-mid.jpg', anchor: 'bottom' },
    { src: '/images/detail-bg-front.jpg', anchor: 'bottom' },
  ],
  STEADY: [
    { src: '/images/detail-bg-base.jpg', anchor: 'top' },
    { src: '/images/detail-bg-mid.jpg', anchor: 'bottom' },
    { src: '/images/detail-bg-front.jpg', anchor: 'bottom' },
    { src: '/images/detail-bg-steady-1.jpg', anchor: 'top' },
    { src: '/images/detail-bg-steady-2.jpg', anchor: 'bottom' },
  ],
  SKIP: [
    { src: '/images/detail-bg-base.jpg', anchor: 'top' },
    { src: '/images/detail-bg-mid.jpg', anchor: 'bottom' },
    { src: '/images/detail-bg-front.jpg', anchor: 'bottom' },
    { src: '/images/detail-bg-steady-1.jpg', anchor: 'top' },
    { src: '/images/detail-bg-steady-2.jpg', anchor: 'bottom' },
    { src: '/images/detail-bg-skip-1.jpg', anchor: 'bottom' },
  ],
  DELETE: [
    { src: '/images/detail-bg-base.jpg', anchor: 'top' },
    { src: '/images/detail-bg-delete-1.jpg', anchor: 'bottom' },
    { src: '/images/detail-bg-delete-2.jpg', anchor: 'bottom' },
  ],
};

const CATEGORY_META: Record<
  CategoryType,
  {
    title: string;
    badge: { text: string; color: string };
    subtitle: string;
    iconSrc: string;
  }
> = {
  NOW: {
    title: '빨리 끝내기',
    badge: { text: '중요 · 긴급', color: '#FF383C' },
    subtitle: '컨디션이 가장 좋은 아침에 끝내세요.',
    iconSrc: '/icon/category-now.png',
  },
  STEADY: {
    title: '천천히 끝내기',
    badge: { text: '중요 · 천천히', color: '#FF8904' },
    subtitle: '여유를 갖고 차근차근 진행하세요.',
    iconSrc: '/icon/category-steady.png',
  },
  SKIP: {
    title: '넘겨도',
    badge: { text: '여유 · 긴급', color: '#51A2FF' },
    subtitle: '오늘 못해도 괜찮아요.',
    iconSrc: '/icon/category-skip.png',
  },
  DELETE: {
    title: '지워도',
    badge: { text: '여유 · 천천히', color: '#ABAB9C' },
    subtitle: '필요 없다면 과감히 지워도 돼요.',
    iconSrc: '/icon/category-delete.png',
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
          {/* Figma 107:1218 / 107:1279 / 115:929 / 116:929 — 카테고리별 워크스페이스 레이어 + dark gradient overlay */}
          <div className="absolute inset-0 overflow-hidden">
            {CATEGORY_BG_LAYERS[category].map((layer, i) => (
              <div
                key={`${category}-${i}`}
                className="absolute inset-0 bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${layer.src})`,
                  backgroundPosition:
                    layer.anchor === 'top'
                      ? 'center top'
                      : layer.anchor === 'bottom'
                      ? 'center bottom'
                      : 'center',
                }}
              />
            ))}
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
                {/* Figma 107:1249 — char icon + 타이틀 + 단일 배지 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={meta.iconSrc}
                      alt=""
                      width={24}
                      height={24}
                      className="shrink-0 select-none"
                      priority
                    />
                    <h2 className="text-[20px] font-bold leading-[130%] text-white truncate">
                      {meta.title}
                    </h2>
                    <span
                      className="shrink-0 px-2 py-1.5 rounded-3xl text-xs font-medium leading-[134%] whitespace-nowrap"
                      style={{ color: meta.badge.color }}
                    >
                      {meta.badge.text}
                    </span>
                  </div>
                  <p className="text-xs leading-[133%] text-[#A1A1A1] truncate">
                    {meta.subtitle}
                  </p>
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
