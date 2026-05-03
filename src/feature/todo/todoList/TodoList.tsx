'use client';

import { useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { TodoListEmpty } from './components/TodoListEmpty';
import { TodoListLoading, TodoListError } from './components';
import { MatrixView } from './components/MatrixView';
import { useTodosByDate, usePatchTodoStatus } from '@/model/todo/todoList/queries';
import { useQueryClient } from '@tanstack/react-query';
import { todoListQueryKeys } from '@/model/todo/todoList/queryKeys';
import { transformTodosData, groupTodosByCategory } from './helper';

interface TodoListProps {
  /** 선택된 날짜 */
  selectedDate: Date;
  /** Todo 편집 클릭 핸들러 */
  onEdit?: (todo: GoalTodo) => void;
  /** Todo 추가 클릭 핸들러 */
  onAdd?: () => void;
}

export const TodoList = ({ selectedDate, onEdit, onAdd }: TodoListProps) => {
  const queryClient = useQueryClient();
  const patchTodoStatusMutation = usePatchTodoStatus();

  const dateString = format(selectedDate, 'yyyy-MM-dd');
  const { data: todosData, isLoading, error } = useTodosByDate({ date: dateString });

  const todos = useMemo(() => transformTodosData(todosData), [todosData]);
  const categoryGroups = useMemo(() => groupTodosByCategory(todos), [todos]);

  const hasAnyTodos = todos.length > 0;

  const handleToggle = useCallback(
    async (todoId: string, isCompleted: boolean) => {
      try {
        await patchTodoStatusMutation.mutateAsync({ todoId, isCompleted });
        queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
        queryClient.invalidateQueries({ queryKey: [...todoListQueryKeys.all, 'getTodoCountByDate'] });
      } catch (error) {
        console.error('Todo 상태 변경 실패:', error);
      }
    },
    [patchTodoStatusMutation, queryClient, dateString]
  );

  if (isLoading) return <TodoListLoading />;
  if (error) return <TodoListError />;
  if (!hasAnyTodos) return <TodoListEmpty />;

  return (
    <MatrixView
      groups={categoryGroups}
      onToggle={handleToggle}
      onEdit={onEdit}
      onAdd={onAdd}
    />
  );
};
