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
  onCardClick?: (category: 'NOW' | 'STEADY' | 'SKIP' | 'DELETE') => void;
}

// Figma 196:1617 — color/lime/900 (#35530E) × opacity 16%
const CARD_BG = 'bg-[rgba(53,83,14,0.16)]';

// Accent colors per Figma 196:1623, 196:1646, etc. (Pretendard SemiBold 12px)
// Icon assets exported from Figma 196:1554 (IcChar03/04 등 디자인 시스템)
const CATEGORY_CONFIG = {
  NOW: { title: '긴급', iconSrc: '/icon/category-now.png', accentColor: '#FF6467', bgStyle: CARD_BG },
  STEADY: { title: '꾸준히', iconSrc: '/icon/category-steady.png', accentColor: '#FF8904', bgStyle: CARD_BG },
  SKIP: { title: '넘겨도', iconSrc: '/icon/category-skip.png', accentColor: '#51A2FF', bgStyle: CARD_BG },
  DELETE: { title: '지워도', iconSrc: '/icon/category-delete.png', accentColor: '#A1A1A1', bgStyle: CARD_BG },
} as const;

export const MatrixView = ({ groups, onToggle, onDelete, onEdit, onAdd, onCardClick }: MatrixViewProps) => {
  return (
    <div className="flex flex-col gap-4 mb-5 flex-1 min-h-0">
      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <p className="text-[13px] font-medium text-[#F4F4F5]">중요</p>
        <div className="flex flex-row gap-2 flex-1 min-h-0">
          <CategoryCard
            title={CATEGORY_CONFIG.NOW.title}
            iconSrc={CATEGORY_CONFIG.NOW.iconSrc}
            accentColor={CATEGORY_CONFIG.NOW.accentColor}
            bgStyle={CATEGORY_CONFIG.NOW.bgStyle}
            todos={groups.NOW}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onAdd={() => onAdd?.('NOW')}
            onCardClick={() => onCardClick?.('NOW')}
          />
          <CategoryCard
            title={CATEGORY_CONFIG.STEADY.title}
            iconSrc={CATEGORY_CONFIG.STEADY.iconSrc}
            accentColor={CATEGORY_CONFIG.STEADY.accentColor}
            bgStyle={CATEGORY_CONFIG.STEADY.bgStyle}
            todos={groups.STEADY}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onAdd={() => onAdd?.('STEADY')}
            onCardClick={() => onCardClick?.('STEADY')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <p className="text-[13px] font-medium text-[#F4F4F5]">여유</p>
        <div className="flex flex-row gap-2 flex-1 min-h-0">
          <CategoryCard
            title={CATEGORY_CONFIG.SKIP.title}
            iconSrc={CATEGORY_CONFIG.SKIP.iconSrc}
            accentColor={CATEGORY_CONFIG.SKIP.accentColor}
            bgStyle={CATEGORY_CONFIG.SKIP.bgStyle}
            todos={groups.SKIP}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onAdd={() => onAdd?.('SKIP')}
            onCardClick={() => onCardClick?.('SKIP')}
          />
          <CategoryCard
            title={CATEGORY_CONFIG.DELETE.title}
            iconSrc={CATEGORY_CONFIG.DELETE.iconSrc}
            accentColor={CATEGORY_CONFIG.DELETE.accentColor}
            bgStyle={CATEGORY_CONFIG.DELETE.bgStyle}
            todos={groups.DELETE}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onAdd={() => onAdd?.('DELETE')}
            onCardClick={() => onCardClick?.('DELETE')}
          />
        </div>
      </div>
    </div>
  );
};
