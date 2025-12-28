'use client';

import { useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { TodoCard } from './components/TodoCard';
import { TodoListEmpty } from './components/TodoListEmpty';
import { TodoListLoading, TodoListError } from './components';
import { useTodosByDate, usePatchTodoStatus } from '@/model/todo/todoList/queries';
import { useQueryClient } from '@tanstack/react-query';
import { todoListQueryKeys } from '@/model/todo/todoList/queryKeys';
import { transformTodosData, groupAndSortTodos } from './helper';

interface TodoListProps {
  /** 선택된 날짜 */
  selectedDate: Date;
  /** Todo 편집 클릭 핸들러 */
  onEdit?: (todo: GoalTodo) => void;
}

export const TodoList = ({ selectedDate, onEdit }: TodoListProps) => {
  const queryClient = useQueryClient();
  const patchTodoStatusMutation = usePatchTodoStatus();

  const dateString = format(selectedDate, 'yyyy-MM-dd');
  const { data: todosData, isLoading, error } = useTodosByDate({ date: dateString });

  const todos = useMemo(() => transformTodosData(todosData), [todosData]);
  const groupedTodos = useMemo(() => groupAndSortTodos(todos), [todos]);

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
  if (groupedTodos.length === 0) return <TodoListEmpty />;

  return (
    <div className="flex flex-col gap-[28px] mt-[20px] mb-[20px]">
      {groupedTodos.map(group => (
        <div key={group.goalId} className="flex flex-col gap-[8px]">
          {/* Goal 그룹 헤더 */}
          <p className="text-[14px] font-medium leading-[1.429] tracking-[0.203px] text-[#c2c4c8]">{group.goalName}</p>
          {/* Todo 카드 리스트 */}
          <div className="flex flex-col gap-[8px]">
            {group.todos.map(todo => (
              <TodoCard key={todo.id} todo={todo} onToggle={handleToggle} onEdit={onEdit} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
