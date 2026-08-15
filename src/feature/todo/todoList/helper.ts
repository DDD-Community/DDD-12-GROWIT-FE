import { GoalTodo } from '@/shared/type/GoalTodo';

export type { TodoCategory } from './category';

export interface CategoryGroups {
  NOW: GoalTodo[];
  STEADY: GoalTodo[];
  SKIP: GoalTodo[];
  DELETE: GoalTodo[];
}

export interface GoalGroup {
  goalId: string;
  goalName: string;
  todos: GoalTodo[];
}

const normalizeTodoTime = (time: GoalTodo['time']): string | null => {
  if (typeof time !== 'string') return null;

  const normalizedTime = time.trim();
  return normalizedTime.length > 0 ? normalizedTime : null;
};

/**
 * Todo 공통 정렬 정책
 * 미완료 → 완료, 시간 있음 → 없음, 시간순 → 콘텐츠 가나다순 → 입력 순서를 따른다.
 * 입력 배열은 변경하지 않는다.
 */
export const sortTodosByPolicy = (todos: GoalTodo[]): GoalTodo[] => {
  return todos
    .map((todo, originalIndex) => ({ todo, originalIndex }))
    .sort((a, b) => {
      if (a.todo.isCompleted !== b.todo.isCompleted) {
        return a.todo.isCompleted ? 1 : -1;
      }

      const aTime = normalizeTodoTime(a.todo.time);
      const bTime = normalizeTodoTime(b.todo.time);

      if (aTime !== null && bTime === null) return -1;
      if (aTime === null && bTime !== null) return 1;

      if (aTime !== null && bTime !== null) {
        const timeComparison = aTime.localeCompare(bTime);
        if (timeComparison !== 0) return timeComparison;
      }

      const contentComparison = a.todo.content.localeCompare(b.todo.content, 'ko');
      if (contentComparison !== 0) return contentComparison;

      return a.originalIndex - b.originalIndex;
    })
    .map(({ todo }) => todo);
};

interface TodoDataItem {
  todo: GoalTodo;
  goal?: { id?: string; name?: string } | null;
}

/**
 * Todo를 category별로 그룹화
 */
export const groupTodosByCategory = (todos: GoalTodo[]): CategoryGroups => {
  const groups: CategoryGroups = { NOW: [], STEADY: [], SKIP: [], DELETE: [] };

  todos.forEach(todo => {
    const cat = todo.category;
    if (cat && cat in groups) {
      groups[cat].push(todo);
    } else {
      // category가 없는 경우 NOW로 분류
      groups.NOW.push(todo);
    }
  });

  return {
    NOW: sortTodosByPolicy(groups.NOW),
    STEADY: sortTodosByPolicy(groups.STEADY),
    SKIP: sortTodosByPolicy(groups.SKIP),
    DELETE: sortTodosByPolicy(groups.DELETE),
  };
};

/**
 * API 응답을 GoalTodo[] 형식으로 변환
 */
export const transformTodosData = (todosData: TodoDataItem[] | undefined): GoalTodo[] => {
  if (!todosData) return [];

  return todosData
    .map(item => {
      const goalFromItem = item.goal || item.todo.goal;
      return {
        ...item.todo,
        goal: {
          id: goalFromItem?.id,
          name: goalFromItem?.name || '미분류',
        },
      };
    })
    .filter(todo => todo.goal);
};

/**
 * 그룹 간 정렬: 이름순 (가나다순), "미분류"는 항상 마지막
 */
const sortGroups = (groups: GoalGroup[]): GoalGroup[] => {
  return [...groups].sort((a, b) => {
    if (a.goalName === '미분류') return 1;
    if (b.goalName === '미분류') return -1;
    return a.goalName.localeCompare(b.goalName, 'ko');
  });
};

/**
 * Todo를 goal별로 그룹화하고 정렬
 */
export const groupAndSortTodos = (todos: GoalTodo[]): GoalGroup[] => {
  const groupMap = new Map<string, GoalGroup>();

  todos.forEach(todo => {
    if (!todo.goal) return;

    const goalId = todo.goal.id ?? todo.goal.name ?? 'default';
    const goalName = todo.goal.name || '미분류';
    const existingGroup = groupMap.get(goalId);

    if (existingGroup) {
      existingGroup.todos.push(todo);
    } else {
      groupMap.set(goalId, {
        goalId,
        goalName,
        todos: [todo],
      });
    }
  });

  // 그룹 내 정렬 후 그룹 간 정렬
  const groupsWithSortedTodos = Array.from(groupMap.values()).map(group => ({
    ...group,
    todos: sortTodosByPolicy(group.todos),
  }));

  return sortGroups(groupsWithSortedTodos);
};
