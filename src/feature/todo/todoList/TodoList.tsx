'use client';

import { useMemo } from 'react';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { TodoCard } from './TodoCard';

interface GoalGroup {
  goalId: string;
  goalName: string;
  todos: GoalTodo[];
}

interface TodoListProps {
  /** Todo 목록 */
  todos: GoalTodo[];
  /** Todo 완료 상태 토글 핸들러 */
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  /** Todo 편집 클릭 핸들러 */
  onEdit?: (todo: GoalTodo) => void;
}

export const TodoList = ({ todos, onToggle, onEdit }: TodoListProps) => {
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

  return (
    <div className="flex flex-col gap-[28px] mt-[20px] mb-[100px]">
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
