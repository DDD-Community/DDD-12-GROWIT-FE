'use client';

import { useEffect, useMemo } from 'react';
import { Goal } from '@/shared/type/goal';
import { Todo } from '@/shared/type/Todo';
import { usePlanSelector } from '@/model/todo/planSelector';
import { useTodoBoardActions, useTodoBoardState } from '@/model/todo/todoList';
import { useSelectedDayState, useSelectedDayActions } from '@/model/todo/selectedDay';
import { WeekDatePicker } from './components/WeekDatePicker';
//import { EditTodoModal } from './components/EditTodoModal';
import { TodoCard } from './components/TodoCard';
import { AddTodoButton } from './components/AddTodoButton';
import { useInitSelectedToday } from './hooks/useInitSelectedToday';

interface WeeklyTodoListProps {
  goal: Goal;
  currentWeekIndex: number;
  onWeekChange?: (weekOfMonth: number) => void;
}

export const WeeklyTodoList = ({ goal, currentWeekIndex, onWeekChange }: WeeklyTodoListProps) => {
  const { todoList } = useTodoBoardState();
  const { changePlanByDate, selectedPlanId } = usePlanSelector();
  const { updateDateInfo, initWeekDates } = useSelectedDayActions();
  const { selectedDay, selectedDate, weekDates } = useSelectedDayState();
  const { toggleTodoStatus, refreshTodoList } = useTodoBoardActions();

  //const [editModal, setEditModal] = useState({ open: false, todo: null as Todo | null });
  // 미완료된 todo가 상단으로 정렬되어야한다는 요구사항 반영
  const selectedDayTodos = useMemo(
    () => todoList?.[selectedDay].sort((a, b) => (a.isCompleted ? 1 : -1)) || [],
    [todoList, selectedDay]
  );

  const handleEditSubmit = (updatedTodo: Todo) => {
    //setEditModal({ open: false, todo: null });
    changePlanByDate(updatedTodo.date);
    updateDateInfo(updatedTodo.date);
    refreshTodoList();
  };

  // const handleDeleteSubmit = () => {
  //   refreshTodoList();
  // };

  useEffect(() => {
    initWeekDates(goal.duration.startDate, goal.duration.endDate, currentWeekIndex);
    //setEditModal({ open: false, todo: null });
  }, [goal.id, goal.duration.startDate, currentWeekIndex]);

  useInitSelectedToday();

  return (
    <div className="flex flex-col">
      <WeekDatePicker weekDates={weekDates} selectedDay={selectedDay} goal={goal} />
      <div className="flex flex-col gap-[20px] min-h-[200px]">
        <div className="flex flex-col">
          <AddTodoButton goal={goal} selectedPlanId={selectedPlanId} selectedDate={selectedDate} />
          {selectedDayTodos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              dayOfWeek={selectedDay}
              goal={goal}
              onToggleTodo={toggleTodoStatus}
              onEditTodoItem={handleEditSubmit}
              //onEdit={() => setEditModal({ open: true, todo })}
            />
          ))}
        </div>
      </div>
      {/* <EditTodoModal
        open={editModal.open}
        todo={editModal.todo}
        goal={goal}
        onClose={() => setEditModal({ open: false, todo: null })}
        onSubmit={handleEditSubmit}
        onDelete={handleDeleteSubmit}
      /> */}
    </div>
  );
};
