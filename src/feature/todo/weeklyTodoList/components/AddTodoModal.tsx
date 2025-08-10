'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Goal } from '@/shared/type/goal';
import { Modal } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import { useAddTodoForm } from '../hooks';
import DatePicker from '@/shared/components/input/DatePicker';
import Button from '@/shared/components/input/Button';

interface AddTodoModalProps {
  goal: Goal;
  selectedPlanId: string;
  onSuccessAddTodo: () => void;
  onWeekChange?: (weekOfMonth: number) => void;
  onToggleWeekend?: (showWeekend: boolean) => void;
}

export const AddTodoModal = ({
  goal,
  selectedPlanId,
  onSuccessAddTodo,
  onWeekChange,
  onToggleWeekend,
}: AddTodoModalProps) => {
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
      onSuccessAddTodo();
    }
  };

  return (
    <>
      <div className="rounded-lg">
        <button
          className="flex px-[14px] py-[8px] gap-[12px] rounded-lg hover:bg-fill-normal transition-colors hover:cursor-pointer"
          onClick={() => showModal()}
        >
          <Image src="/icon/plus.svg" alt="plus" width={20} height={20} />
          <span className="font-[15px] text-label-alternative text-nowrap">투두 추가</span>
        </button>
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
              maxLength={30}
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
