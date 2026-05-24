import { TodoCategory, TodoCountByDateItem } from '@/model/todo/todoList/dto';

type Indicators = Record<string, (string | null | undefined)[] | undefined>;

/**
 * Figma 196:1610 calendar-day DS 주석:
 *   - 인디케이터 2개만 노출: 긴급(URGENT), 꾸준히(CONSISTENT)
 *   - 모두 완료 시 opacity 100%, 미완료 항목 있으면 opacity 40%
 *   - DEFERABLE/DELETABLE은 인디케이터 없음
 */
const INDICATOR_CATEGORIES: TodoCategory[] = ['URGENT', 'CONSISTENT'];

// Figma 196:1605 calendar Indicators — color/red/500, color/amber/500
const CATEGORY_BASE_COLOR: Record<TodoCategory, string> = {
  URGENT: '#FB2C36',
  CONSISTENT: '#FE9A00',
  DEFERABLE: '#51A2FF',
  DELETABLE: '#A1A1A1',
};

// 8자리 hex alpha — 40% ≈ 0x66, 100% = ff
const ALPHA_INCOMPLETE = '66';
const ALPHA_COMPLETE = 'ff';

const buildColor = (base: string, allCompleted: boolean): string =>
  `${base}${allCompleted ? ALPHA_COMPLETE : ALPHA_INCOMPLETE}`;

export const convertTodoCountToIndicators = (
  todoCountData: TodoCountByDateItem[]
): Indicators => {
  const result: Indicators = {};

  if (!todoCountData || todoCountData.length === 0) return result;

  todoCountData.forEach(item => {
    const colors: string[] = [];

    INDICATOR_CATEGORIES.forEach(cat => {
      const entry = item.categories?.find(c => c.category === cat);
      if (!entry || entry.todoCount <= 0) return;
      const allCompleted = entry.completedCount >= entry.todoCount;
      colors.push(buildColor(CATEGORY_BASE_COLOR[cat], allCompleted));
    });

    if (colors.length > 0) {
      result[item.date] = colors;
    }
  });

  return result;
};

/**
 * 기존 indicators와 투두 indicators를 병합
 */
export const mergeIndicators = (
  existingIndicators: Indicators,
  todoIndicators: Indicators
): Indicators => {
  const result = { ...existingIndicators };

  Object.entries(todoIndicators).forEach(([date, colors]) => {
    if (result[date]) {
      result[date] = [...(result[date] || []), ...(colors || [])];
    } else {
      result[date] = colors;
    }
  });

  return result;
};
