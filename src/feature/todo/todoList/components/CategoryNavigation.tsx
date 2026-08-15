'use client';

import { KeyboardEvent, useRef } from 'react';
import { motion, type PanInfo } from 'motion/react';
import Button from '@/shared/components/input/Button';
import { TODO_CATEGORY_NAV_META, TODO_CATEGORY_ORDER, type TodoCategory } from '../category';

const SWIPE_THRESHOLD = 48;

interface CategoryNavigationProps {
  value: TodoCategory;
  onValueChange: (category: TodoCategory) => void;
}

export const CategoryNavigation = ({ value, onValueChange }: CategoryNavigationProps) => {
  const didDrag = useRef(false);

  const selectAt = (index: number) => {
    const category = TODO_CATEGORY_ORDER[index];
    if (!category) return;

    onValueChange(category);
    document.getElementById(`todo-category-tab-${category.toLowerCase()}`)?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowLeft') nextIndex = Math.max(0, index - 1);
    if (event.key === 'ArrowRight') nextIndex = Math.min(TODO_CATEGORY_ORDER.length - 1, index + 1);
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = TODO_CATEGORY_ORDER.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    selectAt(nextIndex);
  };

  const handleDragEnd = (_event: PointerEvent, info: PanInfo) => {
    const { x, y } = info.offset;
    if (Math.abs(x) <= SWIPE_THRESHOLD || Math.abs(x) <= Math.abs(y)) {
      window.setTimeout(() => {
        didDrag.current = false;
      }, 0);
      return;
    }

    const currentIndex = TODO_CATEGORY_ORDER.indexOf(value);
    const nextIndex = x < 0 ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < TODO_CATEGORY_ORDER.length) {
      onValueChange(TODO_CATEGORY_ORDER[nextIndex]);
    }

    window.setTimeout(() => {
      didDrag.current = false;
    }, 0);
  };

  return (
    <motion.div
      role="tablist"
      aria-label="투두 카테고리"
      className="grid h-10 w-[176px] touch-pan-y grid-cols-4 overflow-hidden rounded-[24px] bg-category-panel p-1"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={() => {
        didDrag.current = true;
      }}
      onDragEnd={handleDragEnd}
    >
      {TODO_CATEGORY_ORDER.map((category, index) => {
        const isSelected = category === value;
        const meta = TODO_CATEGORY_NAV_META[category];

        return (
          <Button
            key={category}
            size="sm"
            layout="icon-only"
            variant="tertiary"
            type="button"
            role="tab"
            id={`todo-category-tab-${category.toLowerCase()}`}
            aria-selected={isSelected}
            aria-controls={`todo-category-panel-${category.toLowerCase()}`}
            aria-label={meta.label}
            tabIndex={isSelected ? 0 : -1}
            className="rounded-[18px] p-0 transition-colors"
            onClick={() => {
              if (!didDrag.current) onValueChange(category);
            }}
            onKeyDown={event => handleKeyDown(event, index)}
            icon={
              <span
                aria-hidden="true"
                className={`size-3 rounded-[2px] ${isSelected ? meta.activeClassName : 'bg-category-tab-inactive'}`}
              />
            }
          />
        );
      })}
    </motion.div>
  );
};

export default CategoryNavigation;
