import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { useEffect, useState } from 'react';
import { usePatchTodoStatus } from '@/model/todo/todayTodoList/hooks/usePatchTodoStatus';
import Checkbox from '@/shared/components/input/Checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shared/components/dropdown-menu';
import { Edit, Trash2 } from 'lucide-react';

interface MobileWeeklyTodoItemProps {
  todo: Todo;
  dayOfWeek: DAY_OF_THE_WEEK;
  onToggleTodo: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TodoCard = ({ todo, dayOfWeek, onToggleTodo, onEdit, onDelete }: MobileWeeklyTodoItemProps) => {
  const { mutate, isLoading } = usePatchTodoStatus();
  const [checked, setChecked] = useState(todo.isCompleted);

  useEffect(() => {
    setChecked(todo.isCompleted);
  }, [todo.isCompleted]);

  const handleCheck = async () => {
    const newChecked = !checked;
    mutate(todo.id, newChecked);
    setChecked(newChecked);
    onToggleTodo(dayOfWeek, todo.id);
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
