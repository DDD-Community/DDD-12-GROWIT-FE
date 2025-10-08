import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { useFetchEditTodo } from '../hooks/useFetchEditTodo';

interface TodoEditInputProps {
  isEditing: boolean;
  todo: Todo;
  onEditTodoItem: (updatedTodo: Todo) => void;
  onEditCancel: () => void;
}

interface EditFormData {
  content: string;
}

const TodoEditInput = ({ isEditing, todo, onEditTodoItem, onEditCancel }: TodoEditInputProps) => {
  const { editTodo } = useFetchEditTodo({
    onSuccess: updatedTodo => {
      onEditTodoItem(updatedTodo);
      onEditCancel();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EditFormData>({
    defaultValues: {
      content: todo.content,
    },
  });

  useEffect(() => {
    reset({ content: todo.content });
  }, [todo.content, reset]);

  const onSubmit = async (data: EditFormData) => {
    if (data.content.trim() && data.content !== todo.content) {
      await editTodo(todo.id, data.content, todo.date);
    } else {
      onEditCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onEditCancel();
    }
  };

  if (!isEditing) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 h-[36px] grid grid-cols-[1fr_auto] items-center gap-2">
      <input
        {...register('content', {
          required: true,
          minLength: 1,
          maxLength: 30,
        })}
        type="text"
        onKeyDown={handleKeyDown}
        className="bg-transparent text-[16px] text-white border-none outline-none appearance-none w-full"
        disabled={isSubmitting}
        autoFocus
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="p-1 hover:bg-[#2A2B31] rounded transition-colors disabled:opacity-50"
        title="저장"
      >
        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </form>
  );
};

interface MobileWeeklyTodoItemProps {
  todo: Todo;
  dayOfWeek: DAY_OF_THE_WEEK;
  onToggleTodo: (dayOfWeek: DAY_OF_THE_WEEK, todoId: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onEditTodoItem?: (updatedTodo: Todo) => void;
}

export const TodoCard = ({
  todo,
  dayOfWeek,
  onToggleTodo,
  onEdit,
  onDelete,
  onEditTodoItem,
}: MobileWeeklyTodoItemProps) => {
  const { mutate, isLoading } = usePatchTodoStatus();
  const [checked, setChecked] = useState(todo.isCompleted);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setChecked(todo.isCompleted);
  }, [todo.isCompleted]);

  const handleCheck = async () => {
    const newChecked = !checked;
    mutate(todo.id, newChecked);
    setChecked(newChecked);
    onToggleTodo(dayOfWeek, todo.id);
  };

  const handleTextClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg px-[14px] py-[8px] flex items-center gap-3">
      <div className="flex items-center">
        <Checkbox checked={checked} onClick={handleCheck} disabled={isLoading} />
      </div>
      <div className="flex-1 flex items-center gap-2">
        <TodoEditInput
          todo={todo}
          isEditing={isEditing}
          onEditTodoItem={onEditTodoItem || (() => {})}
          onEditCancel={handleEditCancel}
        />
        {!isEditing && (
          <span
            className={`text-sm ${todo.isCompleted ? 'line-through text-[#70737C]' : 'text-white'} truncate cursor-pointer`}
            onClick={handleTextClick}
            title="클릭하여 수정"
          >
            {todo.content}
          </span>
        )}
      </div>
      {/* 더보기 메뉴 */}
      {!isEditing && (
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
      )}
    </div>
  );
};
