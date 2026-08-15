'use client';

import { useMemo, useCallback, useState } from 'react';
import { format } from 'date-fns';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { TodoListEmpty } from './components/TodoListEmpty';
import { TodoListLoading, TodoListError } from './components';
import { MatrixView } from './components/MatrixView';
import { ListView } from './components/ListView';
import { CategoryDetailView } from './components/CategoryDetailView';
import { WeeklyImportantStatusView } from './components/WeeklyImportantStatusView';
import { useTodosByDate, usePatchTodoStatus, useDeleteTodo } from '@/model/todo/todoList/queries';
import { useQueryClient } from '@tanstack/react-query';
import { todoListQueryKeys } from '@/model/todo/todoList/queryKeys';
import { transformTodosData, groupTodosByCategory, sortTodosByPolicy } from './helper';

type CategoryType = 'NOW' | 'STEADY' | 'SKIP' | 'DELETE';

interface TodoListProps {
  selectedDate: Date;
  viewMode?: 'matrix' | 'list' | 'status';
  onEdit?: (todo: GoalTodo) => void;
  onAdd?: (category?: string) => void;
}

export const TodoList = ({ selectedDate, viewMode = 'matrix', onEdit, onAdd }: TodoListProps) => {
  const queryClient = useQueryClient();
  const patchTodoStatusMutation = usePatchTodoStatus();
  const deleteTodoMutation = useDeleteTodo();
  const [detailCategory, setDetailCategory] = useState<CategoryType | null>(null);

  const dateString = format(selectedDate, 'yyyy-MM-dd');
  const { data: todosData, isLoading, error } = useTodosByDate({ date: dateString });

  const todos = useMemo(() => transformTodosData(todosData), [todosData]);
  const sortedTodos = useMemo(() => sortTodosByPolicy(todos), [todos]);
  const categoryGroups = useMemo(() => groupTodosByCategory(sortedTodos), [sortedTodos]);

  const hasAnyTodos = sortedTodos.length > 0;

  const invalidateQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
    queryClient.invalidateQueries({ queryKey: [...todoListQueryKeys.all, 'getTodoCountByDate'] });
  }, [queryClient, dateString]);

  const handleToggle = useCallback(
    async (todoId: string, isCompleted: boolean) => {
      try {
        await patchTodoStatusMutation.mutateAsync({ todoId, isCompleted });
        invalidateQueries();
      } catch (error) {
        console.error('Todo 상태 변경 실패:', error);
      }
    },
    [patchTodoStatusMutation, invalidateQueries]
  );

  const handleDelete = useCallback(
    async (todoId: string) => {
      try {
        await deleteTodoMutation.mutateAsync({ todoId, routineDeleteType: 'SINGLE' });
        invalidateQueries();
      } catch (error) {
        console.error('Todo 삭제 실패:', error);
      }
    },
    [deleteTodoMutation, invalidateQueries]
  );

  if (isLoading) return <TodoListLoading />;
  if (error) return <TodoListError />;

  if (viewMode === 'list') {
    if (!hasAnyTodos) return <TodoListEmpty />;
    return <ListView todos={sortedTodos} onToggle={handleToggle} onDelete={handleDelete} onEdit={onEdit} />;
  }

  if (viewMode === 'status') {
    return (
      <WeeklyImportantStatusView
        todos={sortedTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={onEdit}
        onAdd={onAdd}
      />
    );
  }

  return (
    <>
      <MatrixView
        groups={categoryGroups}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={onEdit}
        onAdd={onAdd}
        onCardClick={setDetailCategory}
      />
      {detailCategory && (
        <CategoryDetailView
          category={detailCategory}
          todos={categoryGroups[detailCategory]}
          isOpen={!!detailCategory}
          onClose={() => setDetailCategory(null)}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={onEdit}
          onAdd={() => {
            setDetailCategory(null);
            onAdd?.(detailCategory);
          }}
        />
      )}
    </>
  );
};
