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

const CARD_BG = 'bg-[#0A0A0A]';

const CATEGORY_CONFIG = {
  NOW: { title: '긴급', emoji: '🎃', accentColor: '#FF8904', bgStyle: CARD_BG },
  STEADY: { title: '꾸준히', emoji: '🐻', accentColor: '#FFB900', bgStyle: CARD_BG },
  SKIP: { title: '넘겨도', emoji: '➡️', accentColor: '#51A2FF', bgStyle: CARD_BG },
  DELETE: { title: '지워도', emoji: '🗑️', accentColor: '#A1A1A1', bgStyle: CARD_BG },
} as const;

export const MatrixView = ({ groups, onToggle, onDelete, onEdit, onAdd, onCardClick }: MatrixViewProps) => {
  return (
    <div className="flex flex-col gap-4 mt-5 mb-5">
      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-medium text-[#F4F4F5]">중요</p>
        <div className="flex flex-row flex-wrap gap-2">
          <CategoryCard
            title={CATEGORY_CONFIG.NOW.title}
            emoji={CATEGORY_CONFIG.NOW.emoji}
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
            emoji={CATEGORY_CONFIG.STEADY.emoji}
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

      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-medium text-[#F4F4F5]">여유</p>
        <div className="flex flex-row flex-wrap gap-2">
          <CategoryCard
            title={CATEGORY_CONFIG.SKIP.title}
            emoji={CATEGORY_CONFIG.SKIP.emoji}
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
            emoji={CATEGORY_CONFIG.DELETE.emoji}
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
