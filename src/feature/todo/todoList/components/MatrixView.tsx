'use client';

import { GoalTodo } from '@/shared/type/GoalTodo';
import { CategoryGroups } from '../helper';
import { CategoryCard } from './CategoryCard';

interface MatrixViewProps {
  groups: CategoryGroups;
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  onDelete?: (todoId: string) => void;
  onEdit?: (todo: GoalTodo) => void;
  onAdd?: (category?: string) => void;
  onCardClick?: (category: 'URGENT' | 'CONSISTENT' | 'DEFERABLE' | 'DELETABLE') => void;
}

// Figma 196:1617 — color/lime/900 (#35530E) × opacity 16%
const CARD_BG = 'bg-[rgba(53,83,14,0.16)]';

// Accent colors per Figma 196:1623, 196:1646, etc. (Pretendard SemiBold 12px)
// Icon assets exported from Figma 196:1554 (IcChar03/04 등 디자인 시스템)
const CATEGORY_CONFIG = {
  URGENT: { title: '긴급', iconSrc: '/icon/category-now.png', accentColor: '#FF6467', bgStyle: CARD_BG },
  CONSISTENT: { title: '꾸준히', iconSrc: '/icon/category-steady.png', accentColor: '#FF8904', bgStyle: CARD_BG },
  DEFERABLE: { title: '넘겨도', iconSrc: '/icon/category-skip.png', accentColor: '#51A2FF', bgStyle: CARD_BG },
  DELETABLE: { title: '지워도', iconSrc: '/icon/category-delete.png', accentColor: '#A1A1A1', bgStyle: CARD_BG },
} as const;

export const MatrixView = ({ groups, onToggle, onDelete, onEdit, onAdd, onCardClick }: MatrixViewProps) => {
  return (
    <div className="flex flex-col gap-4 mb-5 flex-1 min-h-0">
      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <p className="text-[13px] font-medium text-[#F4F4F5]">중요</p>
        <div className="flex flex-row gap-2 flex-1 min-h-0">
          <CategoryCard
            title={CATEGORY_CONFIG.URGENT.title}
            iconSrc={CATEGORY_CONFIG.URGENT.iconSrc}
            accentColor={CATEGORY_CONFIG.URGENT.accentColor}
            bgStyle={CATEGORY_CONFIG.URGENT.bgStyle}
            todos={groups.URGENT}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onAdd={() => onAdd?.('URGENT')}
            onCardClick={() => onCardClick?.('URGENT')}
          />
          <CategoryCard
            title={CATEGORY_CONFIG.CONSISTENT.title}
            iconSrc={CATEGORY_CONFIG.CONSISTENT.iconSrc}
            accentColor={CATEGORY_CONFIG.CONSISTENT.accentColor}
            bgStyle={CATEGORY_CONFIG.CONSISTENT.bgStyle}
            todos={groups.CONSISTENT}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onAdd={() => onAdd?.('CONSISTENT')}
            onCardClick={() => onCardClick?.('CONSISTENT')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <p className="text-[13px] font-medium text-[#F4F4F5]">여유</p>
        <div className="flex flex-row gap-2 flex-1 min-h-0">
          <CategoryCard
            title={CATEGORY_CONFIG.DEFERABLE.title}
            iconSrc={CATEGORY_CONFIG.DEFERABLE.iconSrc}
            accentColor={CATEGORY_CONFIG.DEFERABLE.accentColor}
            bgStyle={CATEGORY_CONFIG.DEFERABLE.bgStyle}
            todos={groups.DEFERABLE}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onAdd={() => onAdd?.('DEFERABLE')}
            onCardClick={() => onCardClick?.('DEFERABLE')}
          />
          <CategoryCard
            title={CATEGORY_CONFIG.DELETABLE.title}
            iconSrc={CATEGORY_CONFIG.DELETABLE.iconSrc}
            accentColor={CATEGORY_CONFIG.DELETABLE.accentColor}
            bgStyle={CATEGORY_CONFIG.DELETABLE.bgStyle}
            todos={groups.DELETABLE}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onAdd={() => onAdd?.('DELETABLE')}
            onCardClick={() => onCardClick?.('DELETABLE')}
          />
        </div>
      </div>
    </div>
  );
};
