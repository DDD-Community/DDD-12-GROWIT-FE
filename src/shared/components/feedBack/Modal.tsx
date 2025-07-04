import FlexBox from '@/shared/components/layout/FlexBox';
import Button from '../navigation/Button';
import { DialogHTMLAttributes, useEffect, useRef } from 'react';
import { hasNonStaticMethods } from 'next/dist/server/route-modules/app-route/module';

interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  title: string;
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
        onClose();
      }
    };

    const handleEscapePress = (event: KeyboardEvent) => {
      if (dialogRef.current && event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapePress);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      open={open}
      className={`max-w-[338px] md:max-w-[480px] bg-elevated-assistive backdrop:bg-black/50 rounded-lg shadow-xl border-0 fixed inset-0 m-auto ${className}`}
    >
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
        className="absolute top-4 right-4"
      />

      <FlexBox direction="col" className="py-5 px-8 gap-5">
        {!renderContent ? <></> : renderContent()}
      </FlexBox>
      <FlexBox className="w-full py-4 px-8 justify-end">{!renderFooter ? <></> : renderFooter()}</FlexBox>
    </dialog>
  );
};

export const StartJourneyPopUp = () => {};
