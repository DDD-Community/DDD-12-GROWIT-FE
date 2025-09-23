'use client';

import { useState, useEffect } from 'react';
import Checkbox from '@/shared/components/input/Checkbox';
import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { usePatchTodoStatus } from './hooks';
import { Goal } from '@/shared/type/goal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shared/components/dropdown-menu';
import { Edit, Trash2 } from 'lucide-react';
import EditTodoModal from './components/EditTodoModal';
import { AddTodoModal } from './components/AddTodoModal';
import DeleteTodoModal from './components/DeleteTodoModal';
import { WeekDatePicker } from './components/WeekDatePicker';

import { useSelectedDayState, useSelectedDayActions } from '@/model/todo/selectedDay';
import { usePlanSelector } from '@/model/todo/planSelector';
import { useTodoBoardState } from '@/model/todo/todoList';

interface MobileWeeklyTodoItemProps {
  todo: Todo;
  dayOfWeek: DAY_OF_THE_WEEK;
  onToggleTodo: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

interface MobileWeeklyTodoListProps {
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
}: MobileWeeklyTodoListProps) => {
  const { todoList } = useTodoBoardState();
  const { changePlanByDate, selectedPlanId } = usePlanSelector();
  const { selectedDay, selectedDate, weekDates } = useSelectedDayState();
  const { updateDateInfo, updateWeekDates } = useSelectedDayActions();

  const [editModal, setEditModal] = useState({ open: false, todo: null as Todo | null });
  const [deleteModal, setDeleteModal] = useState({ open: false, todo: null as Todo | null });

  useEffect(() => {
    updateWeekDates(goal.duration.startDate, currentWeekIndex);
    setEditModal({ open: false, todo: null });
    setDeleteModal({ open: false, todo: null });
  }, [goal.id, goal.duration.startDate, currentWeekIndex]);

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
              <MobileWeeklyTodoItem
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

const MobileWeeklyTodoItem = ({ todo, dayOfWeek, onToggleTodo, onEdit, onDelete }: MobileWeeklyTodoItemProps) => {
  const { mutate, isLoading } = usePatchTodoStatus();
  const [checked, setChecked] = useState(todo.isCompleted);

  useEffect(() => {
    setChecked(todo.isCompleted);
  }, [todo.isCompleted]);

  const handleCheck = async () => {
    const newChecked = !checked;

    try {
      await mutate(todo.id, newChecked);
      setChecked(newChecked);
      onToggleTodo(dayOfWeek, todo.id);
    } catch (error) {
      console.error('Todo 상태 변경 실패:', error);
    }
  };

  return (
    <div className="border-line-normal rounded-lg px-[14px] py-[8px] flex items-center gap-3 shadow">
      <div className="flex items-center">
        <Checkbox checked={checked} onClick={handleCheck} disabled={isLoading} />
      </div>
      <span className={`flex-1 text-sm ${todo.isCompleted ? 'line-through text-[#70737C]' : 'text-white'} truncate`}>
        {todo.content}
      </span>
      {/* 더보기 메뉴 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded hover:bg-[#2A2B31] transition-colors hover:cursor-pointer">
            <span className="text-white text-lg">⋮</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom" sideOffset={4} avoidCollisions={false} className="w-32">
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            수정
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDelete} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
