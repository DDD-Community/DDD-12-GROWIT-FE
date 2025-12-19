'use client';

import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { BottomSheet, useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import FloatingButton from '@/shared/components/input/FloatingButton';
import { Header, Content } from './components';
import { type AddTodoFormData, ADD_TODO_DEFAULT_VALUES } from './types';

interface AddTodoBottomSheetAndButtonProps {
  selectedDate: Date;
  onSubmit: (data: AddTodoFormData) => void;
  groups?: { id: string; name: string }[];
}

export const AddTodoBottomSheetAndButton = ({
  selectedDate,
  onSubmit,
  groups = [],
}: AddTodoBottomSheetAndButtonProps) => {
  const { isOpen, showSheet, closeSheet } = useBottomSheet();

  const methods = useForm<AddTodoFormData>({
    defaultValues: ADD_TODO_DEFAULT_VALUES,
  });

  // 바텀시트가 닫히면 폼 초기화
  useEffect(() => {
    if (!isOpen) {
      methods.reset(ADD_TODO_DEFAULT_VALUES);
    }
  }, [isOpen, methods]);

  const handleSubmit = () => {
    const data = methods.getValues();
    if (data.content.trim()) {
      onSubmit({ ...data, content: data.content.trim() });
      closeSheet();
    }
  };

  return (
    <>
      <FloatingButton onClick={showSheet} aria-label="투두 추가" />
      <BottomSheet isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet}>
        <FormProvider {...methods}>
          <BottomSheet.Title>
            <Header selectedDate={selectedDate} onSubmit={handleSubmit} />
          </BottomSheet.Title>
          <BottomSheet.Content>
            <Content groups={groups} autoFocus={isOpen} />
          </BottomSheet.Content>
        </FormProvider>
      </BottomSheet>
    </>
  );
};

export default AddTodoBottomSheetAndButton;
