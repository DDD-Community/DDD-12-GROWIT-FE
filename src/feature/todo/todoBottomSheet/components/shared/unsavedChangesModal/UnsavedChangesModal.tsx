'use client';

import { Modal } from '@/shared/components/feedBack/Modal';
import Button from '@/shared/components/input/Button';

interface UnsavedChangesModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
  /** 나가기 확인 핸들러 */
  onConfirm: () => void;
}

export const UnsavedChangesModal = ({ isOpen, onClose, onConfirm }: UnsavedChangesModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="w-[calc(100%-32px)] max-w-96"
      renderContent={() => (
        <div className="flex flex-col items-center gap-2 pt-[16px]">
          <p className="heading-2-bold text-label-normal">작성 중인 내용이 삭제됩니다</p>
          <p className="body-1-normal text-label-normal">정말 닫으시겠습니까?</p>
        </div>
      )}
      renderFooter={() => (
        <>
          <Button size="xl" variant="tertiary" text="나가기" onClick={onConfirm} />
          <Button size="xl" text="취소" onClick={onClose} />
        </>
      )}
    />
  );
};

export default UnsavedChangesModal;
