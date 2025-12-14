'use client';

import { useState, useMemo } from 'react';
import { GoalTodo } from '@/shared/type/GoalTodo';
import { TodoCard } from './TodoCard';
import { MOCK_TODOS } from './mockData';

interface GoalGroup {
  goalId: string;
  goalName: string;
  todos: GoalTodo[];
}

export const TodoList = () => {
  const [todos, setTodos] = useState<GoalTodo[]>(MOCK_TODOS);

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

  const handleToggle = (todoId: string, isCompleted: boolean) => {
    setTodos(prev => prev.map(todo => (todo.id === todoId ? { ...todo, isCompleted } : todo)));
  };

  const handleEdit = (todo: GoalTodo) => {
    console.log('Edit todo:', todo);
  };

  return (
    <div className="flex flex-col gap-[28px] mt-[20px] mb-[100px]">
      {groupedTodos.map(group => (
        <div key={group.goalId} className="flex flex-col gap-[8px]">
          {/* Goal 그룹 헤더 */}
          <p className="text-[14px] font-medium leading-[1.429] tracking-[0.203px] text-[#c2c4c8]">{group.goalName}</p>
          {/* Todo 카드 리스트 */}
          <div className="flex flex-col gap-[8px]">
            {group.todos.map(todo => (
              <TodoCard key={todo.id} todo={todo} onToggle={handleToggle} onEdit={handleEdit} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
