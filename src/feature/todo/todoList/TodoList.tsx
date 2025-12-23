'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { TodoCard } from './TodoCard';
import { useTodosByDate } from '@/model/todo/todoList/queries';

interface GoalGroup {
  goalId: string;
  goalName: string;
  todos: GoalTodo[];
}

interface TodoListProps {
  /** 선택된 날짜 */
  selectedDate: Date;
  /** Todo 완료 상태 토글 핸들러 */
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  /** Todo 편집 클릭 핸들러 */
  onEdit?: (todo: GoalTodo) => void;
}

export const TodoList = ({ selectedDate, onToggle, onEdit }: TodoListProps) => {
  // 선택된 날짜를 YYYY-MM-DD 형식으로 변환
  const dateString = format(selectedDate, 'yyyy-MM-dd');

  // API 호출
  const { data: todosData, isLoading, error } = useTodosByDate({ date: dateString });

  // API 응답을 GoalTodo[] 형식으로 변환
  const todos: GoalTodo[] = useMemo(() => {
    if (!todosData) return [];
    return todosData.map(item => ({
      ...item.todo,
      goal: item.goal,
    }));
  }, [todosData]);

  // goal별로 그룹화
  const groupedTodos = useMemo<GoalGroup[]>(() => {
    const groupMap = new Map<string, GoalGroup>();

    todos.forEach(todo => {
      const goalId = todo.goal.id ?? todo.goal.name;
      const existingGroup = groupMap.get(goalId);
      if (existingGroup) {
        existingGroup.todos.push(todo);
      } else {
        groupMap.set(goalId, {
          goalId,
          goalName: todo.goal.name,
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

  return (
    <div className="flex flex-col gap-[28px] mt-[20px] mb-[20px]">
      {groupedTodos.map(group => (
        <div key={group.goalId} className="flex flex-col gap-[8px]">
          {/* Goal 그룹 헤더 */}
          <p className="text-[14px] font-medium leading-[1.429] tracking-[0.203px] text-[#c2c4c8]">{group.goalName}</p>
          {/* Todo 카드 리스트 */}
          <div className="flex flex-col gap-[8px]">
            {group.todos.map(todo => (
              <TodoCard key={todo.id} todo={todo} onToggle={onToggle} onEdit={onEdit} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
