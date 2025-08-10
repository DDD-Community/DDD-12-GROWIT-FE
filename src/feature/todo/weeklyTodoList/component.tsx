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
import { cn } from '@/shared/lib/utils';
import { getWeekStartDate, getAllWeekDates, getDateString, isToday } from '@/model/todo/selectedDay/utils';
import EditTodoModal from './components/EditTodoModal';
import { AddTodoModal } from './components/AddTodoModal';
import DeleteTodoModal from './components/DeleteTodoModal';

import { useSelectedDayState, useSelectedDayActions } from '@/model/todo/selectedDay';

interface MobileWeeklyTodoItemProps {
  todo: Todo;
  dayOfWeek: DAY_OF_THE_WEEK;
  onToggleTodo: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

interface MobileWeeklyTodoListProps {
  weeklyTodos: Record<DAY_OF_THE_WEEK, Todo[]>;
  goal: Goal;
  currentWeekIndex: number;
  onToggleTodo: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  refreshTodoList?: () => void;
  onEdit?: (todo: Todo) => void;
  onDelete?: (todo: Todo) => void;
  onWeekChange?: (weekOfMonth: number) => void;
  onToggleWeekend?: (showWeekend: boolean) => void;
}

export const WeeklyTodoList = ({
  weeklyTodos,
  goal,
  currentWeekIndex,
  onToggleTodo,
  refreshTodoList,
  onEdit,
  onDelete,
  onWeekChange,
  onToggleWeekend,
}: MobileWeeklyTodoListProps) => {
  const { selectedDay } = useSelectedDayState();
  const { setSelectedDay } = useSelectedDayActions();
  const [editModal, setEditModal] = useState({ open: false, todo: null as Todo | null });
  const [deleteModal, setDeleteModal] = useState({ open: false, todo: null as Todo | null });

  const weekStart = getWeekStartDate(goal.duration.startDate, currentWeekIndex - 1);
  const days = getAllWeekDates(weekStart); // 모바일에서는 평일과 주말 모두 포함
  const selectedPlanId = goal.plans.find(p => p.weekOfMonth === currentWeekIndex)?.id ?? '';

  useEffect(() => {
    setEditModal({ open: false, todo: null });
    setDeleteModal({ open: false, todo: null });
  }, [goal.id, currentWeekIndex]);

  const { resetToToday } = useSelectedDayActions();
  useEffect(() => {
    resetToToday();
  }, [currentWeekIndex, resetToToday]);

  const selectedDayTodos = weeklyTodos[selectedDay] || [];

  const handleEditSubmit = (updatedTodo: Todo) => {
    setEditModal({ open: false, todo: null });
    onEdit?.(updatedTodo);
  };

  const handleDeleteSubmit = (todo: Todo) => {
    setDeleteModal({ open: false, todo: null });
    onDelete?.(todo);
  };

  return (
    <div className="flex flex-col">
      {/* 모달 영역 */}
      <EditTodoModal
        open={editModal.open}
        todo={editModal.todo}
        goal={goal}
        onClose={() => setEditModal({ open: false, todo: null })}
        onSubmit={handleEditSubmit}
        onWeekChange={onWeekChange}
        onToggleWeekend={onToggleWeekend}
      />
      <DeleteTodoModal
        open={deleteModal.open}
        todo={deleteModal.todo}
        onClose={() => setDeleteModal({ open: false, todo: null })}
        onDelete={handleDeleteSubmit}
      />

      {/* 요일/날짜 선택 섹션 (데스크톱 스타일 적용) */}
      <div className="grid grid-cols-7 gap-2 mb-[20px]">
        {days.map(day => {
          const isSelected = selectedDay === day.key;
          const isTodayDate = isToday(day.date);

          return (
            <button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              className="relative flex flex-col items-center justify-center gap-[4px] hover:cursor-pointer"
            >
              <span
                className={cn(
                  'flex relative items-center justify-center w-[30px] h-[30px] rounded-full text-sm',
                  isSelected ? 'bg-white text-[#23242A] font-bold shadow' : 'text-label-normal'
                )}
              >
                {day.label}
                {isTodayDate && <div className="absolute top-[2px] w-[4px] h-[4px] rounded-[6px] bg-accent-fg-lime" />}
              </span>
              <span className={cn('text-xs text-[#AEB0B6]', isSelected && 'font-bold text-white')}>
                {getDateString(day.date)}
              </span>
            </button>
          );
        })}
      </div>

      {/* 선택된 날짜의 Todo 목록 */}
      <div className="flex flex-col gap-[20px] min-h-[200px]">
        <AddTodoModal
          goal={goal}
          selectedPlanId={selectedPlanId}
          onSuccessAddTodo={() => refreshTodoList?.()}
          onWeekChange={onWeekChange}
          onToggleWeekend={onToggleWeekend}
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
