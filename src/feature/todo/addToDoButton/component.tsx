'use client';

import { useState } from 'react';
import Button from '@/shared/components/navigation/Button';
import { Modal } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import DatePicker from '@/shared/components/input/DatePicker';
import { useAddTodoForm } from './hooks';

// 확장된 Plan 타입 (weekOfMonth 포함)
interface ExtendedPlan {
  id: string;
  content: string;
  weekOfMonth?: number;
}

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
  plans: ExtendedPlan[];
}

interface AddToDoProps {
  goal: ExtendedGoal;
  selectedPlanId: string;
  onSuccess?: () => void;
}

export const AddToDo = ({ goal, selectedPlanId, onSuccess }: AddToDoProps) => {
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
  } = useAddTodoForm(goal, selectedPlanId);

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
            <div className="w-56">
              <DatePicker
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
              className="min-w-[300px] md:min-w-[512px]"
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
