'use client';

import { useFormContext } from 'react-hook-form';
import { XIcon } from 'lucide-react';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { DeleteButton } from '../../shared/deleteButton';
import { useTodoFormContext } from '../../../form';
import type { TodoFormData } from '../../../types';

interface DeleteBottomSheetProps {
  /** BottomSheet 열림 상태 */
  isOpen: boolean;
  /** BottomSheet 닫기 핸들러 */
  onClose: () => void;
}

export const DeleteBottomSheet = ({ isOpen, onClose }: DeleteBottomSheetProps) => {
  const { watch } = useFormContext<TodoFormData>();
  const { handleDelete, handleDeleteAllRepeats } = useTodoFormContext();

  const repeatType = watch('repeatType');
  const hasRepeat = repeatType !== 'none';

  const handleDeleteAndClose = () => {
    handleDelete();
    onClose();
  };

  const handleDeleteAllAndClose = () => {
    handleDeleteAllRepeats?.();
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} showSheet={() => {}} closeSheet={onClose} height="auto">
      <BottomSheet.Title>
        <div className="w-full flex items-center justify-end px-5 pt-2 pb-4">
          <button
            type="button"
            onClick={onClose}
            className="text-label-normal hover:text-label-strong transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </BottomSheet.Title>

      <BottomSheet.Content>
        <div className="flex flex-col">
          {hasRepeat && handleDeleteAllRepeats ? (
            <>
              {/* 반복 투두일 경우: 두 개의 삭제 버튼 표시 */}
              <div className="py-2">
                <DeleteButton onClick={handleDeleteAndClose} text="해당 투두만 삭제" showIcon={false} />
              </div>
              <div className="py-2">
                <DeleteButton onClick={handleDeleteAllAndClose} text="전체 반복 투두 삭제" showIcon={false} />
              </div>
            </>
          ) : (
            /* 반복 투두가 아닐 경우: 해당 투두만 삭제 */
            <DeleteButton onClick={handleDeleteAndClose} showIcon={false} />
          )}
        </div>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default DeleteBottomSheet;
