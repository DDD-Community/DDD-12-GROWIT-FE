import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Goal } from '@/shared/type/goal';
import { useTodoBoardActions } from '@/model/todo/todoList';
import { useToast } from '@/shared/components/feedBack/toast';
import { PlusIcon } from '@/shared/constants/icons';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';
import { useFetchAddTodo } from '../hooks/useFetchAddTodo';
import { Sheet, SheetContent, SheetTrigger, SheetHeader } from '@/shared/components/ui/sheet';
import { TextArea } from '@/shared/components/input/TextArea';
import { DateSelector } from './DateSelector';
import { Z_INDEX } from '@/shared/lib/z-index';

interface AddTodoButtonProps {
  goal: Goal;
  selectedPlanId: string;
  selectedDate: Date;
  onTodoAdded?: (addedDate: Date) => void;
}

interface AddTodoFormData {
  content: string;
  selectedDate: Date;
}

export const AddTodoButton = ({ goal, selectedPlanId, selectedDate = new Date(), onTodoAdded }: AddTodoButtonProps) => {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const { trackButtonClick } = useGTMActions();
  const { refreshTodoList } = useTodoBoardActions();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<AddTodoFormData>({
    mode: 'onChange',
    defaultValues: {
      content: '',
      selectedDate: selectedDate,
    },
  });

  const watchedSelectedDate = watch('selectedDate');
  const startDate = new Date(goal.duration.startDate);
  const endDate = new Date(goal.duration.endDate);

  const { addTodo, loading } = useFetchAddTodo({
    onSuccess: () => {
      const dateToUse = watchedSelectedDate || selectedDate;
      if (dateToUse && onTodoAdded) {
        onTodoAdded(dateToUse);
      }
      refreshTodoList();
      reset({ content: '', selectedDate: selectedDate || undefined });
      setOpen(false);
      showToast('투두가 추가되었습니다.', 'success');
    },
    onError: error => {
      setOpen(false);
      showToast(error?.response?.data.message || '투두 추가에 실패했습니다.', 'error');
    },
  });

  const onSubmit = async (data: AddTodoFormData) => {
    if (!data.selectedDate) return;

    if (data.content.trim()) {
      const year = data.selectedDate.getFullYear();
      const month = String(data.selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(data.selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      await addTodo({
        goalId: goal.id,
        planId: selectedPlanId,
        date: formattedDate,
        content: data.content.trim(),
      });
    }
  };

  const handleDateSelect = (date: Date) => {
    setValue('selectedDate', date, { shouldValidate: true });
  };

  const handleCompleteClick = async () => {
    const isFormValid = await trigger(['content', 'selectedDate']);

    if (!isFormValid) {
      return;
    }
    handleSubmit(onSubmit)();
  };

  const handlePlusClick = () => {
    clearErrors(); // Sheet를 열 때 에러 상태 초기화
    trackButtonClick({
      eventName: GTM_EVENTS.HOME_TODO_CLICK,
      buttonName: GTM_BUTTON_NAME.ADD_TODO,
    });
    trackButtonClick({
      eventName: GTM_EVENTS.SHEET_OPEN,
      buttonName: GTM_BUTTON_NAME.ADD_TODO_SHEET,
    });
    setOpen(true);
    setValue('selectedDate', selectedDate, { shouldValidate: true });
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      trackButtonClick({
        eventName: GTM_EVENTS.SHEET_CLOSE,
        buttonName: GTM_BUTTON_NAME.ADD_TODO_SHEET,
      });
      reset({ content: '', selectedDate: selectedDate || undefined });
      clearErrors(); // 에러 상태 초기화
    }
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
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          onClick={handlePlusClick}
          className="rounded-lg px-[14px] py-[8px] flex items-center gap-3"
          title="Todo 추가"
        >
          <PlusIcon className="text-[#70737C]" />
          <span className="text-[#70737C] text-[16px]">Todo 추가</span>
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className={`h-[50vh] ${Z_INDEX.SHEET}`}>
        <SheetHeader>
          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="label-1-normal font-bold text-status-negative"
            >
              취소
            </button>
            <DateSelector
              selectedDate={watchedSelectedDate}
              onDateSelect={handleDateSelect}
              minDate={startDate}
              maxDate={endDate}
              placeholder="날짜 선택"
            />
            <button
              type="button"
              onClick={handleCompleteClick}
              disabled={loading}
              className="label-1-normal font-bold text-label-normal"
            >
              완료
            </button>
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
          <div className="flex-1 px-4">
            <input type="hidden" {...dateRegister} ref={dateRef} />
            <TextArea
              className="h-full"
              maxLength={30}
              {...register('content', {
                required: '내용을 입력해주세요.',
                minLength: {
                  value: 1,
                  message: '1글자 이상 입력해주세요.',
                },
                validate: value => {
                  if (!value.trim()) {
                    return '내용을 입력해주세요.';
                  }
                  return true;
                },
              })}
              placeholder="투두 내용을 입력하세요"
              isError={!!errors.content}
              errorMessage={errors.content?.message}
            />
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
