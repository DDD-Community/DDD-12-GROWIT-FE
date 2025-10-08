import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import { Todo } from '@/shared/type/Todo';
import DatePicker from '@/shared/components/input/DatePicker';
import Button from '@/shared/components/input/Button';
import { Goal } from '@/shared/type/goal';
import { useFetchEditTodo } from '../hooks/useFetchEditTodo';
import { useFetchDeleteTodo } from '../hooks/useFetchDeleteTodo';
import { useToast } from '@/shared/components/feedBack/toast';

interface EditTodoModalProps {
  open: boolean;
  todo: Todo | null;
  goal: Goal;
  onClose: () => void;
  onSubmit: (updated: Todo) => void;
  onDelete: () => void;
}

interface EditTodoFormData {
  content: string;
  selectedDate: Date | undefined;
}

export const EditTodoModal = ({ open, todo, goal, onClose, onSubmit, onDelete }: EditTodoModalProps) => {
  const { showToast } = useToast();
  const { isLoading, editTodo } = useFetchEditTodo({
    onSuccess: updatedTodo => {
      onSubmit(updatedTodo);
      onClose();
    },
  });
  const { deleteTodoItem } = useFetchDeleteTodo({
    onSuccess: () => {
      showToast('투두가 삭제되었습니다.', 'success');
      onDelete();
      onClose();
    },
    onError: error => {
      const errorMessage = error?.response?.data?.message || '투두 삭제에 실패했습니다.';
      showToast(errorMessage, 'error');
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<EditTodoFormData>({
    mode: 'onChange',
    defaultValues: {
      content: todo?.content || '',
      selectedDate: todo?.date ? new Date(todo.date) : undefined,
    },
  });

  const watchedContent = watch('content');
  const watchedSelectedDate = watch('selectedDate');
  const startDate = new Date(goal.duration.startDate);
  const endDate = new Date(goal.duration.endDate);

  useEffect(() => {
    if (todo) {
      reset({
        content: todo.content || '',
        selectedDate: todo.date ? new Date(todo.date) : undefined,
      });
    }
  }, [todo, reset]);

  const onSubmitForm = async (data: EditTodoFormData) => {
    if (!todo) return;
    const year = data.selectedDate!.getFullYear();
    const month = String(data.selectedDate!.getMonth() + 1).padStart(2, '0');
    const day = String(data.selectedDate!.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    await editTodo(todo.id, data.content.trim(), formattedDate);
  };

  const handleDateSelect = (date: Date) => {
    setValue('selectedDate', date, { shouldValidate: true });
  };

  const handleDelete = async () => {
    if (!todo) return;
    await deleteTodoItem(todo.id);
  };

  // selectedDate 필드 등록 (숨겨진 input으로)
  const { ref: dateRef, ...dateRegister } = register('selectedDate', {
    required: '날짜를 선택해주세요.',
    validate: value => {
      if (!value) {
        return '날짜를 선택해주세요.';
      }
      return true;
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="투두 수정"
      renderContent={() => (
        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <input type="hidden" {...dateRegister} ref={dateRef} />
            <DatePicker
              selectedDate={watchedSelectedDate}
              onDateSelect={handleDateSelect}
              minDate={startDate}
              maxDate={endDate}
              placeholder="날짜 선택"
            />
            {errors.selectedDate && <p className="text-xs text-red-500">{errors.selectedDate.message}</p>}
            <p className="text-xs text-gray-400">
              {goal.duration.startDate} ~ {goal.duration.endDate} 기간 내에서 선택해주세요
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <TextArea
              className="min-w-[274px] md:min-w-[496px]"
              maxLength={30}
              {...register('content', {
                required: '내용을 입력해주세요.',
                minLength: {
                  value: 5,
                  message: '5글자 이상 입력해주세요.',
                },
                validate: value => {
                  if (!value.trim()) {
                    return '내용을 입력해주세요.';
                  }
                  return true;
                },
              })}
              placeholder="내용을 입력하세요"
              isError={!!errors.content}
              errorMessage={errors.content?.message}
            />
          </div>
        </form>
      )}
      renderFooter={() => (
        <div className="flex w-full gap-2">
          <Button
            size="xl"
            text="삭제"
            variant="secondary"
            onClick={handleDelete}
            disabled={isLoading}
            className="text-red-500"
          />
          <Button
            size="xl"
            text={isLoading ? '수정 중...' : '수정 완료'}
            onClick={handleSubmit(onSubmitForm)}
            disabled={isLoading || !isValid}
          />
        </div>
      )}
    />
  );
};
