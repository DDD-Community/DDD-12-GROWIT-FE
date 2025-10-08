'use client';

import { useState, useEffect } from 'react';
import { Goal } from '@/shared/type/goal';
import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { usePlanSelector } from '@/model/todo/planSelector';
import { useTodoBoardState } from '@/model/todo/todoList';
import { useSelectedDayState, useSelectedDayActions } from '@/model/todo/selectedDay';
import { DeleteTodoModal } from './components/DeleteTodoModal';
import { WeekDatePicker } from './components/WeekDatePicker';
import { EditTodoModal } from './components/EditTodoModal';
import { AddTodoModal } from './components/AddTodoModal';
import { TodoCard } from './components/TodoCard';
import { useInitSelectedToday } from './hooks';

interface WeeklyTodoListProps {
  goal: Goal;
  currentWeekIndex: number;
  onRefreshTodoList: () => void;
  onToggleTodo: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  onWeekChange?: (weekOfMonth: number) => void;
}

export const WeeklyTodoList = ({
  goal,
  currentWeekIndex,
  onRefreshTodoList,
  onToggleTodo,
  onWeekChange,
}: WeeklyTodoListProps) => {
  const { todoList } = useTodoBoardState();
  const { changePlanByDate, selectedPlanId } = usePlanSelector();
  const { updateDateInfo, initWeekDates } = useSelectedDayActions();
  const { selectedDay, selectedDate, weekDates } = useSelectedDayState();

  const [editModal, setEditModal] = useState({ open: false, todo: null as Todo | null });
  const [deleteModal, setDeleteModal] = useState({ open: false, todo: null as Todo | null });
  const selectedDayTodos = todoList?.[selectedDay] || [];

  const handleEditSubmit = (updatedTodo: Todo) => {
    setEditModal({ open: false, todo: null });
    changePlanByDate(updatedTodo.date);
    updateDateInfo(updatedTodo.date);
    onRefreshTodoList();
  };

  const handleDeleteSubmit = (todo: Todo) => {
    setDeleteModal({ open: false, todo: null });
    changePlanByDate(todo.date);
    onRefreshTodoList();
  };

  useEffect(() => {
    initWeekDates(goal.duration.startDate, goal.duration.endDate, currentWeekIndex);
    setEditModal({ open: false, todo: null });
    setDeleteModal({ open: false, todo: null });
  }, [goal.id, goal.duration.startDate, currentWeekIndex]);

  useInitSelectedToday();

  return (
    <div className="flex flex-col">
      <WeekDatePicker weekDates={weekDates} selectedDay={selectedDay} goal={goal} />
      <div className="flex flex-col gap-[20px] min-h-[200px]">
        <AddTodoModal
          goal={goal}
          selectedPlanId={selectedPlanId}
          selectedDate={selectedDate}
          onWeekChange={onWeekChange}
        />
        <div className="flex flex-col">
          {selectedDayTodos.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center py-8 text-[#AEB0B6]">이 날의 Todo 가 없어요 ㅠ_ㅠ</div>
            </div>
          ) : (
            selectedDayTodos.map(todo => (
              <TodoCard
                key={todo.id}
                todo={todo}
                dayOfWeek={selectedDay}
                onToggleTodo={onToggleTodo}
                onEdit={() => setEditModal({ open: true, todo })}
                onDelete={() => setDeleteModal({ open: true, todo })}
              />
            ))
          )}
        </div>
      </div>
      <EditTodoModal
        open={editModal.open}
        todo={editModal.todo}
        goal={goal}
        onClose={() => setEditModal({ open: false, todo: null })}
        onSubmit={handleEditSubmit}
      />
      <DeleteTodoModal
        open={deleteModal.open}
        todo={deleteModal.todo}
        onClose={() => setDeleteModal({ open: false, todo: null })}
        onDelete={handleDeleteSubmit}
      />
    </div>
  );
};
