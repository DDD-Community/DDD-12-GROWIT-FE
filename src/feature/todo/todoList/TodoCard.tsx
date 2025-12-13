import { useState, useEffect } from 'react';
import { GoalTodo } from '@/shared/type/GoalTodo';
import Checkbox from '@/shared/components/input/Checkbox';
import { Repeat } from 'lucide-react';

interface TodoCardProps {
  todo: GoalTodo;
  onToggle?: (todoId: string, isCompleted: boolean) => void;
  onEdit?: (todo: GoalTodo) => void;
}

const getRepeatLabel = (repeatType?: string) => {
  switch (repeatType) {
    case 'DAILY':
      return '매일';
    case 'WEEKLY':
      return '매주';
    case 'MONTHLY':
      return '매월';
    default:
      return null;
  }
};

export const TodoCard = ({ todo, onToggle, onEdit }: TodoCardProps) => {
  const [checked, setChecked] = useState(todo.isCompleted);

  useEffect(() => {
    setChecked(todo.isCompleted);
  }, [todo.isCompleted]);

  const handleCheck = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggle?.(todo.id, newChecked);
  };

  const handleClickContent = () => {
    onEdit?.(todo);
  };

  const repeatLabel = getRepeatLabel(todo.routine?.repeatType);

  return (
    <div className="bg-[#171719] rounded-[10px] px-[16px] py-[12px] flex items-start gap-[8px]">
      <div className="flex items-center p-[3px]">
        <Checkbox checked={checked} onClick={handleCheck} />
      </div>
      <div className="flex-1 flex flex-col gap-[6px] justify-center">
        <span
          className={`text-[15px] leading-[1.467] tracking-[0.144px] cursor-pointer ${
            checked ? 'line-through text-[#70737C]' : 'text-label-normal'
          }`}
          onClick={handleClickContent}
        >
          {todo.content}
        </span>
        {repeatLabel && (
          <div className="bg-fill-normal rounded-[16px] px-[8px] py-[4px] h-[20px] flex items-center gap-[2px] w-fit">
            <Repeat className="w-[12px] h-[12px] text-[#c2c4c8]" />
            <span className="text-[12px] leading-[1.334] tracking-[0.3024px] text-[#c2c4c8]">{repeatLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};
