import EditTodoModal from './EditTodoModal';
import { AddTodoModal } from './AddTodoModal';
import DeleteTodoModal from './DeleteTodoModal';
import { useState, useEffect } from 'react';
import Checkbox from '@/shared/components/input/Checkbox';
import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { usePatchTodoStatus } from '@/feature/todo/todayMissionBoard/hooks';
import Button from '@/shared/components/input/Button';
import { Goal } from '@/shared/type/goal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shared/components/dropdown-menu';
import { Edit, Trash2 } from 'lucide-react';
import { getDateString, isToday, getWeekStartDate, getWeekDates } from '../utils';

interface WeeklyTodoItemProps {
  todo: Todo;
  dayOfWeek: DAY_OF_THE_WEEK;
  onToggleTodo?: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

interface WeeklyTodoListProps {
  weeklyTodos: Record<DAY_OF_THE_WEEK, Todo[]>;
  goal: Goal;
  currentWeekIndex: number;
  onToggleTodo?: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  refreshTodoList?: () => void;
  onWeekChange?: (weekOfMonth: number) => void;
  showWeekend: boolean;
  onToggleWeekend: (showWeekend: boolean) => void;
  onEdit?: (todo: Todo) => void;
  onDelete?: (todo: Todo) => void;
}

/**
 * @deprecated
 */
export const DesktopWeeklyTodoList = ({
  weeklyTodos,
  goal,
  currentWeekIndex,
  onToggleTodo,
  refreshTodoList,
  onWeekChange,
  showWeekend,
  onToggleWeekend,
  onEdit,
  onDelete,
}: WeeklyTodoListProps) => {
  const [editModal, setEditModal] = useState({ open: false, todo: null as Todo | null });
  const [deleteModal, setDeleteModal] = useState({ open: false, todo: null as Todo | null });

  // props가 변경되면 모달 상태 초기화
  useEffect(() => {
    setEditModal({ open: false, todo: null });
    setDeleteModal({ open: false, todo: null });
  }, [goal.id, currentWeekIndex]);

  // currentWeekIndex는 1부터 시작하는 주차 번호이므로 0부터 시작하는 인덱스로 변환
  const weekStart = getWeekStartDate(goal.duration.startDate, currentWeekIndex - 1);
  const days = getWeekDates(weekStart, showWeekend);
  const selectedPlanId = goal.plans.find(p => p.weekOfMonth === currentWeekIndex)?.id ?? '';

  const handleSuccessAddTodo = () => {
    refreshTodoList?.();
  };

  const handleEditSubmit = (updatedTodo: Todo) => {
    setEditModal({ open: false, todo: null });
    refreshTodoList?.();
    onEdit?.(updatedTodo);
  };

  const handleDeleteSubmit = (todo: Todo) => {
    setDeleteModal({ open: false, todo: null });
    refreshTodoList?.();
    onDelete?.(todo);
  };

  const handleToggleWeekend = (showWeekend: boolean) => {
    onToggleWeekend(showWeekend);
  };

  return (
    <div className="flex flex-col">
      {/* 추가 모달 트리거 */}
      <div className="flex justify-end mb-3">
        <AddTodoModal
          goal={goal}
          selectedPlanId={selectedPlanId}
          onSuccessAddTodo={handleSuccessAddTodo}
          onWeekChange={onWeekChange}
          onToggleWeekend={onToggleWeekend}
        />
      </div>
      {/* 모달 영역 */}
      <EditTodoModal
        open={editModal.open}
        todo={editModal.todo}
        goal={goal}
        onClose={() => setEditModal({ open: false, todo: null })}
        onSubmit={handleEditSubmit}
        onWeekChange={onWeekChange}
        onToggleWeekend={handleToggleWeekend}
      />
      <DeleteTodoModal
        open={deleteModal.open}
        todo={deleteModal.todo}
        onClose={() => setDeleteModal({ open: false, todo: null })}
        onDelete={handleDeleteSubmit}
      />
      <div className={`grid grid-cols-5 min-h-[300px]`}>
        {days.map((day, idx) => (
          <div
            key={day.key}
            className={`
              flex flex-col gap-2
              ${idx !== 0 ? 'border-l border-[#70737C52]' : ''}
              px-2
            `}
          >
            {/* 날짜 + 요일 헤더 */}
            <div className="flex items-center mb-1 gap-[8px]">
              {isToday(day.date) ? (
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#23242A] font-bold text-md shadow">
                  {day.label}
                </span>
              ) : (
                <span className="flex items-center justify-center text-label-normal w-7 h-7 text-sm">{day.label}</span>
              )}
              <span className="text-xs text-[#AEB0B6]">{getDateString(day.date)}</span>
            </div>
            {/* 투두 카드 리스트 */}
            {(weeklyTodos?.[day.key] || []).map(todo => (
              <WeeklyTodoItem
                key={todo.id}
                todo={todo}
                dayOfWeek={day.key}
                onToggleTodo={onToggleTodo}
                onEdit={() => setEditModal({ open: true, todo })}
                onDelete={() => setDeleteModal({ open: true, todo })}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <div className="flex gap-[8px]">
          <Button
            size={'ml'}
            variant={'secondary'}
            text={'<'}
            disabled={!showWeekend}
            onClick={() => onToggleWeekend(false)}
          />
          <Button
            size={'ml'}
            variant={'secondary'}
            text={'>'}
            disabled={showWeekend}
            onClick={() => onToggleWeekend(true)}
          />
        </div>
      </div>
    </div>
  );
};

const WeeklyTodoItem = ({ todo, dayOfWeek, onToggleTodo, onEdit, onDelete }: WeeklyTodoItemProps) => {
  const { mutate, isLoading } = usePatchTodoStatus();
  const [checked, setChecked] = useState(todo.isCompleted);

  useEffect(() => {
    setChecked(todo.isCompleted);
  }, [todo.isCompleted]);

  const handleCheck = async () => {
    const newChecked = !checked;

    try {
      // 서버에 상태 변경 요청
      await mutate(todo.id, newChecked);

      // 성공 시 로컬 상태 업데이트 및 onToggleTodo 호출
      setChecked(newChecked);
      onToggleTodo?.(dayOfWeek, todo.id);
    } catch (error) {
      // 실패 시 원래 상태 유지 (checked 상태는 변경하지 않음)
      console.error('Todo 상태 변경 실패:', error);
      // onToggleTodo도 호출하지 않음
    }
  };

  const handleEdit = () => {
    // TODO: 편집 기능 구현
    onEdit?.();
  };

  const handleDelete = () => {
    // TODO: 삭제 기능 구현
    onDelete?.();
  };

  return (
    <div className="bg-elevated-assistive border-[1px] border-line-normal rounded-lg p-3 flex relative group">
      <div className="flex items-center mr-1 h-10">
        <Checkbox checked={checked} onClick={handleCheck} disabled={isLoading} />
      </div>
      <span
        className={`text-sm flex-1 ${todo.isCompleted ? 'line-through text-label-disable' : 'text-label-normal'} overflow-hidden h-10 leading-5 line-clamp-1 flex items-center`}
      >
        {todo.content}
      </span>
      {/* 더보기 메뉴 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="group-hover:block ml-auto px-2 py-1 rounded hover:bg-fill-normal h-10 flex items-center hover:cursor-pointer">
            <span className="text-sm text-white">⋮</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            편집
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
