import { TodoCountByDateItem } from '@/model/todo/todoList/dto';

type Indicators = Record<string, (string | null | undefined)[] | undefined>;

const TODO_INDICATOR_COLOR = '#35D942';

/**
 * 투두 개수 데이터를 indicators 형식으로 변환
 * @param todoCountData 투두 개수 데이터 배열
 * @returns indicators 형식의 객체
 */
export const convertTodoCountToIndicators = (todoCountData: TodoCountByDateItem[]): Indicators => {
  const result: Indicators = {};

  if (!todoCountData || todoCountData.length === 0) {
    return result;
  }

  todoCountData.forEach(item => {
    // 각 날짜의 goals 배열에서 todoCnt 합산
    const totalCount = item.goals?.reduce((sum, goal) => sum + (goal.todoCnt || 0), 0) || 0;

    // 투두가 있으면 초록색 점 표시
    if (totalCount > 0) {
      result[item.date] = [TODO_INDICATOR_COLOR];
    }
  });

  return result;
};

/**
 * 기존 indicators와 투두 indicators를 병합
 * @param existingIndicators 기존 indicators
 * @param todoIndicators 투두 indicators
 * @returns 병합된 indicators
 */
export const mergeIndicators = (existingIndicators: Indicators, todoIndicators: Indicators): Indicators => {
  const result = { ...existingIndicators };

  Object.entries(todoIndicators).forEach(([date, colors]) => {
    if (result[date]) {
      // 기존 인디케이터가 있으면 병합
      result[date] = [...(result[date] || []), ...(colors || [])];
    } else {
      // 기존 인디케이터가 없으면 새로 추가
      result[date] = colors;
    }
  });

  return result;
};
