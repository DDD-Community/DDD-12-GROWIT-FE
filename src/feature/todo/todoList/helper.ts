import { GoalTodo } from '@/shared/type/GoalTodo';

export interface GoalGroup {
  goalId: string;
  goalName: string;
  todos: GoalTodo[];
}

interface TodoDataItem {
  todo: GoalTodo;
  goal?: { id?: string; name?: string } | null;
}

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
 * 그룹 내 todo 정렬: 미완료가 위, 완료가 아래
 */
const sortTodosInGroup = (todos: GoalTodo[]): GoalTodo[] => {
  return [...todos].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) return 0;
    return a.isCompleted ? 1 : -1;
  });
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
    todos: sortTodosInGroup(group.todos),
  }));

  return sortGroups(groupsWithSortedTodos);
};
