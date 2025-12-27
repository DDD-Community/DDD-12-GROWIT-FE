'use client';

import { useFormContext } from 'react-hook-form';
import { XIcon } from 'lucide-react';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { useTodoFormContext } from '../../../form';
import type { TodoFormData } from '../../../types';

interface EditButtonProps {
  onClick: () => void;
  text: string;
  variant?: 'danger' | 'default';
}

const EditButton = ({ onClick, text, variant = 'danger' }: EditButtonProps) => {
  const textColor = variant === 'danger' ? 'text-[#FF6363]' : 'text-white';

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center h-[44px] px-[18px] py-[10px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] transition-opacity"
    >
      <span className={`font-bold text-[16px] leading-[1.5] tracking-[0.057px] ${textColor}`}>{text}</span>
    </button>
  );
};

interface EditBottomSheetProps {
  /** BottomSheet 열림 상태 */
  isOpen: boolean;
  /** BottomSheet 닫기 핸들러 */
  onClose: () => void;
}

export const EditBottomSheet = ({ isOpen, onClose }: EditBottomSheetProps) => {
  const { watch } = useFormContext<TodoFormData>();
  const { handleEditSingle, handleEditAll } = useTodoFormContext();

  const repeatType = watch('repeatType');
  const hasRepeat = repeatType !== 'none';

  const handleEditSingleAndClose = () => {
    handleEditSingle();
    onClose();
  };

  const handleEditAllAndClose = () => {
    handleEditAll?.();
    onClose();
  };

  // 반복 투두가 아니면 렌더링하지 않음
  if (!hasRepeat) return null;

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
          {/* 해당 투두만 적용 - 빨간색 텍스트, 하단 border */}
          <div className="py-2 border-b border-border-secondary">
            <EditButton onClick={handleEditSingleAndClose} text="해당 투두만 적용" variant="danger" />
          </div>

          {/* 전체 반복 투두 적용 - 흰색 텍스트 */}
          <div className="py-2">
            <EditButton onClick={handleEditAllAndClose} text="전체 반복 투두 적용" variant="default" />
          </div>
        </div>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default EditBottomSheet;
