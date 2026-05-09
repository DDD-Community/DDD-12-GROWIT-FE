import { TodoCategory, TodoCountByDateItem } from '@/model/todo/todoList/dto';

type Indicators = Record<string, (string | null | undefined)[] | undefined>;

/**
 * Figma 196:1554 기준 카테고리별 인디케이터 색 (Pretendard accent colors).
 * NOW > STEADY > SKIP > DELETE 순으로 정렬 표시.
 */
const CATEGORY_COLORS: Record<TodoCategory, string> = {
  NOW: '#FF6467',
  STEADY: '#FF8904',
  SKIP: '#51A2FF',
  DELETE: '#A1A1A1',
};

const CATEGORY_ORDER: TodoCategory[] = ['NOW', 'STEADY', 'SKIP', 'DELETE'];

/**
 * 투두 개수 데이터를 카테고리별 indicator 색 배열로 변환.
 * `categories` 배열이 BE 응답에 포함되면 그 카테고리 색 사용,
 * 누락(과거 응답 호환)된 경우 `goals` 합산 → 단일 회색 점.
 */
export const convertTodoCountToIndicators = (todoCountData: TodoCountByDateItem[]): Indicators => {
  const result: Indicators = {};

  if (!todoCountData || todoCountData.length === 0) {
    return result;
  }

  todoCountData.forEach(item => {
    if (item.categories && item.categories.length > 0) {
      const colors = CATEGORY_ORDER
        .filter(cat =>
          item.categories.some(c => c.category === cat && c.todoCount > 0)
        )
        .map(cat => CATEGORY_COLORS[cat]);

      if (colors.length > 0) {
        result[item.date] = colors;
      }
      return;
    }

    // BE 응답이 categories 미포함인 경우 fallback
    const totalCount = item.goals?.reduce((sum, goal) => sum + (goal.todoCount || 0), 0) || 0;
    if (totalCount > 0) {
      result[item.date] = [CATEGORY_COLORS.DELETE];
    }
  });

  return result;
};

/**
 * 기존 indicators와 투두 indicators를 병합
 */
export const mergeIndicators = (existingIndicators: Indicators, todoIndicators: Indicators): Indicators => {
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
