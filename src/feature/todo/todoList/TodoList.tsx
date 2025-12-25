'use client';

import { useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { TodoCard } from './TodoCard';
import { TodoListEmpty } from './TodoListEmpty';
import { useTodosByDate, usePatchTodoStatus } from '@/model/todo/todoList/queries';
import { useQueryClient } from '@tanstack/react-query';
import { todoListQueryKeys } from '@/model/todo/todoList/queryKeys';

interface GoalGroup {
  goalId: string;
  goalName: string;
  todos: GoalTodo[];
}

interface TodoListProps {
  /** 선택된 날짜 */
  selectedDate: Date;
  /** Todo 편집 클릭 핸들러 */
  onEdit?: (todo: GoalTodo) => void;
}

export const TodoList = ({ selectedDate, onEdit }: TodoListProps) => {
  const dateString = format(selectedDate, 'yyyy-MM-dd');
  const { data: todosData, isLoading, error } = useTodosByDate({ date: dateString });

  // Mutations
  const patchTodoStatusMutation = usePatchTodoStatus();
  const queryClient = useQueryClient();

  // Todo 완료 상태 토글
  const handleToggle = useCallback(
    async (todoId: string, isCompleted: boolean) => {
      try {
        await patchTodoStatusMutation.mutateAsync({ todoId, isCompleted });
        // 쿼리 무효화하여 데이터 다시 가져오기
        queryClient.invalidateQueries({ queryKey: todoListQueryKeys.getTodosByDate(dateString) });
      } catch (error) {
        console.error('Todo 상태 변경 실패:', error);
      }
    },
    [patchTodoStatusMutation, queryClient, dateString]
  );

  // API 응답을 GoalTodo[] 형식으로 변환
  const todos: GoalTodo[] = useMemo(() => {
    if (!todosData) return [];
    return todosData
      .map(item => ({
        ...item.todo,
        goal: item.goal || item.todo.goal || { name: '미분류' },
      }))
      .filter(todo => todo.goal); // goal이 없는 경우 필터링
  }, [todosData]);

  // goal별로 그룹화
  const groupedTodos = useMemo<GoalGroup[]>(() => {
    const groupMap = new Map<string, GoalGroup>();

    todos.forEach(todo => {
      if (!todo.goal) return; // goal이 없으면 스킵

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

    return Array.from(groupMap.values());
  }, [todos]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex flex-col gap-[28px] mt-[20px] mb-[20px]">
        <div className="text-center text-label-alternative">로딩 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex flex-col gap-[28px] mt-[20px] mb-[20px]">
        <div className="text-center text-label-alternative">데이터를 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  // 빈 상태
  if (groupedTodos.length === 0) {
    return (
      <div className="mt-[20px] mb-[20px]">
        <TodoListEmpty />
      </div>
    );
  }

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
