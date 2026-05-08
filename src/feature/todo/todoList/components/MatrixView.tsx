'use client';

import { GoalTodo } from '@/shared/type/GoalTodo';
import { CategoryGroups } from '../helper';
import { CategoryCard } from './CategoryCard';

interface MatrixViewProps {
  groups: CategoryGroups;
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  onEdit?: (todo: GoalTodo) => void;
  onAdd?: (category?: string) => void;
  onCardClick?: (category: 'NOW' | 'STEADY' | 'SKIP' | 'DELETE') => void;
}

const CATEGORY_CONFIG = {
  NOW: { title: '빨리 끝내기', accentColor: '#FF6467', bgStyle: 'bg-[#1D161E]' },
  STEADY: { title: '천천히 끝내기', accentColor: '#FF8904', bgStyle: 'bg-[#1C1917]' },
  SKIP: { title: '넘겨도', accentColor: '#51A2FF', bgStyle: 'bg-[#101828]' },
  DELETE: { title: '지워도', accentColor: '#ABAB9C', bgStyle: 'bg-[#18181B]' },
} as const;

export const MatrixView = ({ groups, onToggle, onEdit, onAdd, onCardClick }: MatrixViewProps) => {
  return (
    <div className="flex flex-col gap-4 mt-5 mb-5">
      {/* 중요 section */}
      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-medium text-[#F4F4F5]">
          <span style={{ fontSize: 18 }}>🔥</span> 중요
        </p>
        <div className="flex flex-row flex-wrap gap-2">
          <CategoryCard
            title={CATEGORY_CONFIG.NOW.title}
            accentColor={CATEGORY_CONFIG.NOW.accentColor}
            bgStyle={CATEGORY_CONFIG.NOW.bgStyle}
            todos={groups.NOW}
            onToggle={onToggle}
            onEdit={onEdit}
            onAdd={() => onAdd?.('NOW')}
            onCardClick={() => onCardClick?.('NOW')}
          />
          <CategoryCard
            title={CATEGORY_CONFIG.STEADY.title}
            accentColor={CATEGORY_CONFIG.STEADY.accentColor}
            bgStyle={CATEGORY_CONFIG.STEADY.bgStyle}
            todos={groups.STEADY}
            onToggle={onToggle}
            onEdit={onEdit}
            onAdd={() => onAdd?.('STEADY')}
            onCardClick={() => onCardClick?.('STEADY')}
          />
        </div>
      </div>

      {/* 여유 section */}
      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-medium text-[#F4F4F5]">
          <span style={{ fontSize: 18 }}>☕️</span> 여유
        </p>
        <div className="flex flex-row flex-wrap gap-2">
          <CategoryCard
            title={CATEGORY_CONFIG.SKIP.title}
            accentColor={CATEGORY_CONFIG.SKIP.accentColor}
            bgStyle={CATEGORY_CONFIG.SKIP.bgStyle}
            todos={groups.SKIP}
            onToggle={onToggle}
            onEdit={onEdit}
            onAdd={() => onAdd?.('SKIP')}
            onCardClick={() => onCardClick?.('SKIP')}
          />
          <CategoryCard
            title={CATEGORY_CONFIG.DELETE.title}
            accentColor={CATEGORY_CONFIG.DELETE.accentColor}
            bgStyle={CATEGORY_CONFIG.DELETE.bgStyle}
            todos={groups.DELETE}
            onToggle={onToggle}
            onEdit={onEdit}
            onAdd={() => onAdd?.('DELETE')}
            onCardClick={() => onCardClick?.('DELETE')}
          />
        </div>
      </div>
    </div>
  );
};
