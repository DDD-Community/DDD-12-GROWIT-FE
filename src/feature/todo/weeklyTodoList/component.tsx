'use client';

import { useEffect, useMemo } from 'react';
import { Goal } from '@/shared/type/goal';
import { Todo } from '@/shared/type/Todo';
import { usePlanSelector } from '@/model/todo/planSelector';
import { useTodoBoardActions, useTodoBoardState } from '@/model/todo/todoList';
import { useSelectedDayState, useSelectedDayActions } from '@/model/todo/selectedDay';
import { WeekDatePicker } from './components/WeekDatePicker';
import { TodoCard } from './components/TodoCard';
import { AddTodoButton } from './components/AddTodoButton';
import { useInitSelectedToday } from './hooks/useInitSelectedToday';

interface WeeklyTodoListProps {
  goal: Goal;
  currentWeekIndex: number;
}

export const WeeklyTodoList = ({ goal, currentWeekIndex }: WeeklyTodoListProps) => {
  const { todoList } = useTodoBoardState();
  const { changePlanByDate, selectedPlanId } = usePlanSelector();
  const { updateDateInfo, initWeekDates } = useSelectedDayActions();
  const { selectedDay, selectedDate, weekDates } = useSelectedDayState();
  const { toggleTodoStatus, refreshTodoList } = useTodoBoardActions();

  const selectedDayTodos = useMemo(
    () => todoList?.[selectedDay].sort((a, b) => (a.isCompleted ? 1 : -1)) || [],
    [todoList, selectedDay]
  );

  const handleEditSubmit = (updatedTodo: Todo) => {
    changePlanByDate(updatedTodo.date);
    updateDateInfo(updatedTodo.date);
    refreshTodoList();
  };

  const handleTodoAdded = (addedDate: Date) => {
    changePlanByDate(addedDate);
    updateDateInfo(addedDate);
  };

  useEffect(() => {
    initWeekDates(goal.duration.startDate, goal.duration.endDate, currentWeekIndex);
  }, [goal.id, goal.duration.startDate, currentWeekIndex]);

  useInitSelectedToday();

  return (
    <div className="flex flex-col">
      <WeekDatePicker weekDates={weekDates} selectedDay={selectedDay} goal={goal} />
      <div className="flex flex-col gap-[20px] min-h-[200px]">
        <div className="flex flex-col items-end gap-5">
          <AddTodoButton
            goal={goal}
            selectedPlanId={selectedPlanId}
            selectedDate={selectedDate}
            onTodoAdded={handleTodoAdded}
          />
          <div className="w-full flex flex-col">
            {selectedDayTodos.map(todo => (
              <TodoCard
                key={todo.id}
                todo={todo}
                dayOfWeek={selectedDay}
                goal={goal}
                onToggleTodo={toggleTodoStatus}
                onEditTodoItem={handleEditSubmit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
