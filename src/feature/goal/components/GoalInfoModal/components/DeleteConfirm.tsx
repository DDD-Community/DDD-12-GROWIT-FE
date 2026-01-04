'use client';

import { Modal } from '@/shared/components/feedBack/Modal';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  goalName?: string;
}

export function DeleteConfirm({ isOpen, onClose, onConfirm, goalName }: DeleteConfirmProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const renderContent = () => (
    <FlexBox direction="col" className="items-center gap-5">
      {/* 경고 아이콘 */}
      <div className="w-[46px] h-[46px] bg-[#FEF0C7] rounded-[28px] flex items-center justify-center">
        <AlertTriangle className="w-[23px] h-[23px] text-[#FFA938]" />
      </div>

      {/* 텍스트 영역 */}
      <FlexBox direction="col" className="items-center gap-2 text-center">
        <h2 className="text-[#F7F7F8] text-[18px] font-bold leading-[1.445]">
          목표 삭제 시,
          <br />
          소중한 기록이 모두 사라져요!
        </h2>
        <p className="text-[rgba(174,176,182,0.61)] text-[15px] font-normal leading-[1.467]">
          그래도 목표를 삭제하실건가요?
        </p>
      </FlexBox>
    </FlexBox>
  );

  const renderFooter = () => (
    <div className="flex gap-2 w-full">
      <button
        onClick={handleConfirm}
        className="flex-1 text-[#FF6363] text-[16px] font-bold leading-[1.5] px-5 py-2 rounded-lg transition-colors"
      >
        삭제
      </button>
      <button
        onClick={onClose}
        className="flex-1 text-[#F7F7F8] text-[16px] font-bold leading-[1.5] px-5 py-2 rounded-lg  transition-colors"
      >
        취소
      </button>
    </div>
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title=""
      renderContent={renderContent}
      renderFooter={renderFooter}
      className="w-[335px] bg-[#2E2F33] rounded-[14px]"
    />
  );
}
