import { useMemo } from 'react';
import { Todo } from '@/shared/type/Todo';

interface UseWeeklyGoalProgressProps {
  todoList: Record<string, Todo[]> | null;
}

export const useWeeklyGoalProgress = ({ todoList }: UseWeeklyGoalProgressProps) => {
  const { percent, total, done } = useMemo(() => {
    if (!todoList) return { percent: 0, total: 0, done: 0 };
    const todos = Object.values(todoList).flat();
    const total = todos.length;
    const done = todos.filter(t => t.isCompleted).length;
    return { percent: total ? Math.round((done / total) * 100) : 0, total, done };
  }, [todoList]);

  return { percent, total, done };
};
