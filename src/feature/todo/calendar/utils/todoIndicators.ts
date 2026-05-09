import { TodoCategory, TodoCountByDateItem } from '@/model/todo/todoList/dto';

type Indicators = Record<string, (string | null | undefined)[] | undefined>;

/**
 * Figma 196:1610 calendar-day DS 주석:
 *   - 인디케이터 2개만 노출: 긴급(NOW), 꾸준히(STEADY)
 *   - 모두 완료 시 opacity 100%, 미완료 항목 있으면 opacity 40%
 *   - SKIP/DELETE는 인디케이터 없음
 */
const INDICATOR_CATEGORIES: TodoCategory[] = ['NOW', 'STEADY'];

const CATEGORY_BASE_COLOR: Record<TodoCategory, string> = {
  NOW: '#FF6467',
  STEADY: '#FF8904',
  SKIP: '#51A2FF',
  DELETE: '#A1A1A1',
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
