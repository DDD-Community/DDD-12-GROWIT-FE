import { DAY_OF_THE_WEEK, Todo } from '@/shared/type/Todo';
import { useEffect, useState, useRef } from 'react';
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

interface TodoEditInputProps {
  isEditing: boolean;
  todo: Todo;
  onEditTodoItem: (updatedTodo: Todo) => void;
  onEditCancel: () => void;
}

const TodoEditInput = ({ isEditing, todo, onEditTodoItem, onEditCancel }: TodoEditInputProps) => {
  const [editContent, setEditContent] = useState(todo.content);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditContent(todo.content);
  }, [todo.content]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      onEditCancel();
    }
  };

  const handleEditSubmit = () => {
    if (editContent.trim() && editContent !== todo.content) {
      const updatedTodo: Todo = {
        ...todo,
        content: editContent.trim(),
      };
      onEditTodoItem(updatedTodo);
    }
    onEditCancel();
  };

  const handleBlur = () => {
    setEditContent(todo.content);
    onEditCancel();
  };

  if (!isEditing) return null;

  return (
    <div className="flex-1 h-[36px] grid grid-cols-[1fr_auto] items-center gap-2">
      <input
        ref={inputRef}
        type="text"
        value={editContent}
        onChange={e => setEditContent(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="bg-transparent text-[16px] text-white border-none outline-none appearance-none w-full"
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          borderRadius: '0',
        }}
        maxLength={30}
      />
      <button onClick={handleEditSubmit} className="p-1 hover:bg-[#2A2B31] rounded transition-colors" title="저장">
        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </div>
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
    <div className="border-line-normal rounded-lg px-[14px] py-[8px] flex items-center gap-3 shadow">
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
