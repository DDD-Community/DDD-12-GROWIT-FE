import FlexBox from '@/shared/components/foundation/FlexBox';
import Button from '../input/Button';
import { DialogHTMLAttributes, useEffect, useRef } from 'react';

interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  title?: string;
  onClose: () => void;
  renderContent?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
}

export const Modal = ({ open, onClose, title, renderContent, renderFooter, className = '' }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 바깥쪽 클릭 & ESC 클릭 시 닫히도록 설계
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        // 중첩 모달 체크: 다른 모달이 열려있는지 확인
        const otherModals = document.querySelectorAll('dialog[open]');
        const isNestedModal = otherModals.length > 1;

        if (!isNestedModal) {
          onClose();
        }
      }
    };

    const handleEscapePress = (event: KeyboardEvent) => {
      if (dialogRef.current && event.key === 'Escape') {
        const otherModals = document.querySelectorAll('dialog[open]');
        const isNestedModal = otherModals.length > 1;

        if (!isNestedModal) {
          onClose();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapePress);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, []);

  useEffect(() => {
    if (dialogRef.current && open) {
      dialogRef.current.showModal();
    } else if (!open && dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={`max-w-[338px] md:max-w-[560px] bg-elevated-assistive rounded-[20px] shadow-xl border-0 fixed inset-0 m-auto ${className}`}
    >
      {title && (
        <>
          <header className="w-full relative heading-2-bold text-label-normal text-center py-5 px-6 border-b border-gray-700">
            {title}
          </header>
          <Button
            variant="tertiary"
            size="sm"
            layout="icon-only"
            onClick={onClose}
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11 1L1 11M1 1L11 11"
                  stroke="#F7F7F8"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            aria-label="닫기"
            className="absolute top-4 right-4"
          />
        </>
      )}
      <FlexBox direction="col" className="py-[20px] px-[24px] gap-5 overflow-y-visible">
        {!renderContent ? <></> : renderContent()}
      </FlexBox>
      <div id="modal-portal-layer" className="relative" />
      <FlexBox className="w-full pt-[16px] pb-[24px] px-[24px] justify-end gap-2">
        {!renderFooter ? <></> : renderFooter()}
      </FlexBox>
    </dialog>
  );
};

interface StartJourneyPopUp extends ModalProps {}

export const StartJourneyPopUp = ({ ...props }: StartJourneyPopUp) => {
  return (
    <Modal
      {...props}
      renderContent={() => (
        <>
          <FlexBox direction="col" className="max-w-[500px] w-full gap-4 text-label-normal">
            <div className="w-[100px] h-[100px] bg-black rounded-full" aria-label="아바타" />
            <p className="body-1-normal text-center">
              축하한다 경서 ✨ <br />
              드디어 4주간 여정의 도착지가 정해졌다냥!
            </p>
          </FlexBox>
          <div className="flex items-center bg-normal rounded-xl py-5 px-8 headline-1-normal text-label-normal shadow-xs">
            일이삼사오육칠팔구십일이삼사오육칠팔구십
          </div>
        </>
      )}
      renderFooter={() => <Button size="xl" text="4주간 여정 시작하기" onClick={() => props.onClose()} />}
      onClose={() => props.onClose()}
    />
  );
};
