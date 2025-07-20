'use client';

import { useState } from 'react';
import Button from '@/shared/components/input/Button';
import { Modal } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import DatePicker from '@/shared/components/input/DatePicker';
import { useAddTodoForm } from './hooks';
import { Plan } from '@/shared/type/goal';

// 확장된 Goal 타입
interface ExtendedGoal {
  id: string;
  name: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  beforeAfter: {
    asIs: string;
    toBe: string;
  };
  plans: Plan[];
}

interface AddToDoProps {
  goal: ExtendedGoal;
  selectedPlanId: string;
  onSuccess?: () => void;
  onWeekChange?: (weekOfMonth: number) => void;
  onToggleWeekend?: (showWeekend: boolean) => void;
}

export const AddToDo = ({ goal, selectedPlanId, onSuccess, onWeekChange, onToggleWeekend }: AddToDoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    date,
    content,
    contentError,
    startDate,
    endDate,
    isSubmitting,
    handleDateSelect,
    handleContentChange,
    handleAddTodo,
    resetForm,
    isFormValid,
  } = useAddTodoForm(goal, selectedPlanId, onWeekChange, onToggleWeekend);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async () => {
    const success = await handleAddTodo();
    if (success) {
      setIsModalOpen(false);
      // todo 추가 성공 시 callback 호출
      onSuccess?.();
    }
  };

  return (
    <>
      <div className="w-[110px] h-[36px] rounded-lg bg-accent-violet">
        <Button
          variant="tertiary"
          text="투두 추가"
          size="sm"
          layout="icon-right"
          onClick={() => showModal()}
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.99935 4.16663V15.8333M4.16602 9.99996H15.8327"
                stroke="white"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        title="투두 추가"
        renderContent={() => (
          <div className="flex flex-col justify-start gap-4">
            <div className="w-full">
              <DatePicker
                className="min-w-[300px] md:min-w-[500px]"
                selectedDate={date}
                onDateSelect={handleDateSelect}
                minDate={startDate}
                maxDate={endDate}
                placeholder="날짜 선택"
              />
              <p className="text-xs text-gray-400 mt-1">
                {goal.duration.startDate} ~ {goal.duration.endDate} 기간 내에서 선택해주세요
              </p>
            </div>

            <TextArea
              className="min-w-[300px] md:min-w-[496px]"
              maxLength={100}
              value={content}
              onChange={handleContentChange}
              placeholder="투두 내용을 입력해주세요 (5글자 이상)"
              isError={!!contentError}
              errorMessage={contentError}
            />
          </div>
        )}
        renderFooter={() => (
          <Button
            text={isSubmitting ? '추가 중...' : '작성 완료'}
            size="xl"
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
          />
        )}
      />
    </>
  );
};
