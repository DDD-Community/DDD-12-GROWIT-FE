'use client';

import { useState } from 'react';
import Button from '@/shared/components/navigation/Button';
import { Modal } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import DatePicker from '@/shared/components/input/DatePicker';
import { apiClient } from '@/shared/lib/apiClient';

export const AddToDo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const postTodo = async () => {
    try {
      const response = await apiClient.post('/todos', {
        goalId: 'goalId',
        planId: 'planId',
        date: '2025-06-30',
        content: '내 목표는 그로잇 완성',
      });
      return response.data;
    } catch (error) {
      console.error(error);
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
        onClose={() => setIsModalOpen(false)}
        title="투두 추가"
        renderContent={() => (
          <div className="flex flex-col justify-start gap-2">
            <div className="w-56">
              <DatePicker selectedDate={date} onDateSelect={setDate} />
            </div>

            <TextArea className="min-w-[300px] md:min-w-[512px]" maxLength={30} />
          </div>
        )}
        renderFooter={() => <Button text="작성 완료" size="xl" />}
      />
    </>
  );
};
