'use client';

import { useState, useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { motion, AnimatePresence } from 'motion/react';
import { SwipeableRow } from './SwipeableRow';
import { TodoItemCheckbox } from './TodoItemCheckbox';
import { CategoryMatrixIcon, MatrixCategory } from './CategoryMatrixIcon';
import { CategoryNavigation } from './CategoryNavigation';
import { TODO_CATEGORY_ORDER, type TodoCategory } from '../category';

const SWIPE_START_THRESHOLD = 12;
const SWIPE_COMPLETE_THRESHOLD = 96;
const SWIPE_EDGE_RESISTANCE = 0.2;

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

interface BgLayer {
  src: string;
  /** bg-position 앵커 — 캔버스 어디에 이미지를 붙일지 */
  anchor: 'top' | 'bottom' | 'center';
}

/**
 * Figma 107:1218 / 107:1279 / 115:929 / 116:929 — 카테고리별 배경 레이어.
 * 위에서부터 아래 순으로 stacking 되며, 마지막은 dark gradient overlay 별도.
 */
const CATEGORY_BG_LAYERS: Record<TodoCategory, BgLayer[]> = {
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

const CategoryBackground = ({ category }: { category: TodoCategory }) => (
  <div className="absolute inset-0 overflow-hidden">
    {CATEGORY_BG_LAYERS[category].map((layer, index) => (
      <div
        key={`${category}-${index}`}
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
        background: 'linear-gradient(180deg, #081C32 0%, rgba(64,85,115,0.25) 100%)',
      }}
    />
  </div>
);

const CATEGORY_META: Record<
  TodoCategory,
  {
    title: string;
    badge: { text: string; color: string };
    subtitle: string;
    iconSrc: string;
  }
> = {
  NOW: {
    title: '빨리 끝내기',
    badge: { text: '긴급', color: '#FF383C' },
    subtitle: '컨디션이 가장 좋은 아침에 끝내세요.',
    iconSrc: '/icon/category-now.png',
  },
  STEADY: {
    title: '꾸준히하기',
    badge: { text: '꾸준히', color: '#FF8904' },
    subtitle: '여유를 갖고 차근차근 진행하세요.',
    iconSrc: '/icon/category-steady.png',
  },
  SKIP: {
    title: '여유롭게 끝내기',
    badge: { text: '넘겨도', color: '#51A2FF' },
    subtitle: '오늘 못해도 괜찮아요.',
    iconSrc: '/icon/category-skip.png',
  },
  DELETE: {
    title: '천천히 끝내기',
    badge: { text: '지워도', color: '#ABAB9C' },
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
  category: TodoCategory;
  todosByCategory: Record<TodoCategory, GoalTodo[]>;
  isOpen: boolean;
  onClose: () => void;
  onCategoryChange: (category: TodoCategory) => void;
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

interface CategoryPanelCardProps {
  category: TodoCategory;
  todos: GoalTodo[];
  isPreview?: boolean;
  onAdd?: () => void;
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  onDelete?: (todoId: string) => void;
  onEdit?: (todo: GoalTodo) => void;
}

const CategoryPanelCard = ({
  category,
  todos,
  isPreview = false,
  onAdd,
  onToggle,
  onDelete,
  onEdit,
}: CategoryPanelCardProps) => {
  const meta = CATEGORY_META[category];

  return (
    <div
      aria-hidden={isPreview || undefined}
      className="flex h-fit max-h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-[#171717] shadow-[0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_rgba(0,0,0,0.06),0px_2px_4px_rgba(0,0,0,0.04)]"
    >
      <div className="flex h-fit max-h-full min-h-0 flex-col gap-8 px-6 pb-8 pt-6">
        <div className="flex shrink-0 flex-col gap-3">
          <div className="flex items-center gap-2">
            <Image
              src={meta.iconSrc}
              alt=""
              width={24}
              height={24}
              className="shrink-0 select-none"
              priority
            />
            <h2 className="truncate text-[20px] font-bold leading-[130%] text-white">
              {meta.title}
            </h2>
            <span
              className="shrink-0 whitespace-nowrap rounded-3xl px-2 py-1.5 text-xs font-medium leading-[134%]"
              style={{ color: meta.badge.color }}
            >
              {meta.badge.text}
            </span>
          </div>
          <p className="truncate text-xs leading-[133%] text-[#A1A1A1]">
            {meta.subtitle}
          </p>
        </div>

        <div
          id={isPreview ? undefined : 'todo-category-panel'}
          role={isPreview ? undefined : 'tabpanel'}
          aria-labelledby={isPreview ? undefined : `todo-category-tab-${category.toLowerCase()}`}
          className="flex h-fit max-h-full min-h-0 flex-[0_1_auto] flex-col gap-4 overflow-y-auto overscroll-contain"
        >
          {todos.length > 0 ? (
            todos.map(todo => (
              <DetailTodoItem
                key={todo.id}
                todo={todo}
                onToggle={isPreview ? undefined : onToggle}
                onDelete={isPreview ? undefined : onDelete}
                onEdit={isPreview ? undefined : onEdit}
              />
            ))
          ) : (
            <button
              type="button"
              aria-label={`${CATEGORY_META[category].badge.text} 투두 추가`}
              className="w-full cursor-pointer text-left text-sm text-[#737373] transition-colors hover:text-[#A1A1A1]"
              onClick={isPreview ? undefined : onAdd}
            >
              할 일이 없어요
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const CategoryDetailView = ({
  category,
  todosByCategory,
  isOpen,
  onClose,
  onCategoryChange,
  onToggle,
  onDelete,
  onEdit,
  onAdd,
}: CategoryDetailViewProps) => {
  const [dragX, setDragX] = useState(0);
  const [isSettling, setIsSettling] = useState(false);
  const detailViewportRef = useRef<HTMLDivElement | null>(null);
  const touchDirectionRef = useRef<{
    x: number;
    y: number;
    direction: 'pending' | 'horizontal' | 'vertical';
  } | null>(null);
  const pointerStartRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
    isDragging: boolean;
  } | null>(null);
  const dragXRef = useRef(0);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentIndex = TODO_CATEGORY_ORDER.indexOf(category);
  const previousCategory = TODO_CATEGORY_ORDER[currentIndex - 1];
  const nextCategory = TODO_CATEGORY_ORDER[currentIndex + 1];

  useEffect(() => {
    const viewport = detailViewportRef.current;
    if (!viewport) return;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        touchDirectionRef.current = null;
        return;
      }

      const touch = event.touches[0];
      touchDirectionRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        direction: 'pending',
      };
    };

    const handleTouchMove = (event: TouchEvent) => {
      const start = touchDirectionRef.current;
      if (!start || event.touches.length !== 1) return;

      const touch = event.touches[0];
      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;

      if (start.direction === 'pending') {
        if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < SWIPE_START_THRESHOLD) return;
        start.direction = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
      }

      if (start.direction === 'horizontal') event.preventDefault();
    };

    const clearTouchDirection = () => {
      touchDirectionRef.current = null;
    };

    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchmove', handleTouchMove, { passive: false });
    viewport.addEventListener('touchend', clearTouchDirection, { passive: true });
    viewport.addEventListener('touchcancel', clearTouchDirection, { passive: true });

    return () => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      viewport.removeEventListener('touchstart', handleTouchStart);
      viewport.removeEventListener('touchmove', handleTouchMove);
      viewport.removeEventListener('touchend', clearTouchDirection);
      viewport.removeEventListener('touchcancel', clearTouchDirection);
    };
  }, []);

  const handlePanelPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isSettling) return;

    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('button, [role="tablist"], [data-todo-swipe-row]')) return;

    pointerStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      isDragging: false,
    };
  };

  const handlePanelPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (!start.isDragging) {
      if (Math.abs(deltaX) < SWIPE_START_THRESHOLD) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY)) {
        pointerStartRef.current = null;
        return;
      }

      start.isDragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    event.preventDefault();

    const isBlockedDirection = (deltaX > 0 && !previousCategory) || (deltaX < 0 && !nextCategory);
    const nextX = isBlockedDirection ? deltaX * SWIPE_EDGE_RESISTANCE : deltaX;

    dragXRef.current = nextX;
    setDragX(nextX);
  };

  const finishPanelSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;

    const endDeltaX = event.clientX - start.x;
    const effectiveDeltaX =
      (endDeltaX > 0 && !previousCategory) || (endDeltaX < 0 && !nextCategory)
        ? endDeltaX * SWIPE_EDGE_RESISTANCE
        : endDeltaX;

    const completedCategory =
      effectiveDeltaX <= -SWIPE_COMPLETE_THRESHOLD
        ? nextCategory
        : effectiveDeltaX >= SWIPE_COMPLETE_THRESHOLD
          ? previousCategory
          : undefined;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    pointerStartRef.current = null;
    setIsSettling(true);

    if (completedCategory) {
      const exitX = effectiveDeltaX < 0 ? -event.currentTarget.clientWidth : event.currentTarget.clientWidth;
      dragXRef.current = exitX;
      setDragX(exitX);
      settleTimerRef.current = setTimeout(() => {
        onCategoryChange(completedCategory);
        dragXRef.current = 0;
        setDragX(0);
        setIsSettling(false);
      }, 180);
      return;
    }

    dragXRef.current = 0;
    setDragX(0);
    settleTimerRef.current = setTimeout(() => {
      setIsSettling(false);
    }, 180);
  };

  const cancelPanelSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    pointerStartRef.current = null;
    dragXRef.current = 0;
    setIsSettling(true);
    setDragX(0);

    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      setIsSettling(false);
    }, 180);
  };

  const handleCategorySelection = (selectedCategory: TodoCategory) => {
    if (selectedCategory === category || isSettling) return;

    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    setIsSettling(true);
    onCategoryChange(selectedCategory);
    settleTimerRef.current = setTimeout(() => {
      setIsSettling(false);
    }, 180);
  };

  const slideTransition = isSettling ? 'transform 180ms ease-out' : 'none';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={detailViewportRef}
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-0 z-[999] isolate mx-auto max-w-md overflow-hidden touch-pan-y overscroll-x-none"
          onPointerDown={event => {
            event.stopPropagation();
            handlePanelPointerDown(event);
          }}
          onPointerMove={event => {
            event.stopPropagation();
            handlePanelPointerMove(event);
          }}
          onPointerUp={event => {
            event.stopPropagation();
            finishPanelSwipe(event);
          }}
          onPointerCancel={event => {
            event.stopPropagation();
            cancelPanelSwipe(event);
          }}
        >
          {/* 상단 컨트롤은 화면에 하나만 고정 */}
          <div className="pointer-events-auto absolute inset-x-0 top-[50px] z-20 flex items-center justify-between px-5 [transform:translateZ(0)]">
            <button
              onClick={onClose}
              aria-label="아래로 내리기"
              className="flex h-10 w-10 items-center justify-center rounded-[24px] bg-[#EBEBEC]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3.333 6L8 10.667 12.667 6"
                  stroke="#27272A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <CategoryNavigation value={category} onValueChange={handleCategorySelection} />

            <button
              onClick={onAdd}
              aria-label="투두 추가"
              className="flex h-10 w-10 items-center justify-center rounded-[24px] bg-[#EBEBEC]"
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

          {/* 배경·카드를 포함한 네 페이지를 하나의 가로 track으로 이동 */}
          <div
            className="absolute inset-0 z-0 flex h-full w-full"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragX}px))`,
              transition: slideTransition,
            }}
          >
            {TODO_CATEGORY_ORDER.map(panelCategory => {
              const isCurrentPage = panelCategory === category;

              return (
                <div
                  key={panelCategory}
                  aria-hidden={!isCurrentPage}
                  className={`relative h-full w-full shrink-0 overflow-hidden pt-[114px] ${
                    isCurrentPage ? '' : 'pointer-events-none'
                  }`}
                >
                  <CategoryBackground category={panelCategory} />

                  <div className="relative flex h-full min-h-0 flex-col pb-5">
                    <div className="mx-5 min-h-0 flex-1">
                      <CategoryPanelCard
                        category={panelCategory}
                        todos={todosByCategory[panelCategory]}
                        isPreview={!isCurrentPage}
                        onAdd={isCurrentPage ? onAdd : undefined}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
