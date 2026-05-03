'use client';

import { useMemo, useCallback, useState } from 'react';
import { format } from 'date-fns';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { TodoListEmpty } from './components/TodoListEmpty';
import { TodoListLoading, TodoListError } from './components';
import { MatrixView } from './components/MatrixView';
import { ListView } from './components/ListView';
import { CategoryDetailView } from './components/CategoryDetailView';
import { useTodosByDate, usePatchTodoStatus } from '@/model/todo/todoList/queries';
import { useQueryClient } from '@tanstack/react-query';
import { todoListQueryKeys } from '@/model/todo/todoList/queryKeys';
import { transformTodosData, groupTodosByCategory } from './helper';

type CategoryType = 'NOW' | 'STEADY' | 'SKIP' | 'DELETE';

interface TodoListProps {
  selectedDate: Date;
  viewMode?: 'matrix' | 'list';
  onEdit?: (todo: GoalTodo) => void;
  onAdd?: (category?: string) => void;
}

export const TodoList = ({ selectedDate, viewMode = 'matrix', onEdit, onAdd }: TodoListProps) => {
  const queryClient = useQueryClient();
  const patchTodoStatusMutation = usePatchTodoStatus();
  const [detailCategory, setDetailCategory] = useState<CategoryType | null>(null);

  const dateString = format(selectedDate, 'yyyy-MM-dd');
  const { data: todosData, isLoading, error } = useTodosByDate({ date: dateString });

  const todos = useMemo(() => transformTodosData(todosData), [todosData]);
  const categoryGroups = useMemo(() => groupTodosByCategory(todos), [todos]);

  const hasAnyTodos = todos.length > 0;

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

  if (isLoading) return <TodoListLoading />;
  if (error) return <TodoListError />;
  if (!hasAnyTodos) return <TodoListEmpty />;

  if (viewMode === 'list') {
    return <ListView todos={todos} onToggle={handleToggle} onEdit={onEdit} />;
  }

  return (
    <>
      <MatrixView
        groups={categoryGroups}
        onToggle={handleToggle}
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
