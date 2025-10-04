import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { AIMentorAdvice } from '@/model/aiMentor/type';

interface AIAdviceDetailModalProps {
  aiMentorName: string;
  aiMentorAdvice: AIMentorAdvice;
  bgPath: string;
  characterPath: string;
  open: boolean;
  onClose: () => void;
}

export const AIAdviceDetailModal = ({
  aiMentorName,
  aiMentorAdvice,
  characterPath,
  bgPath,
  open,
  onClose,
}: AIAdviceDetailModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
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
      className="relative max-w-[320px] w-full overflow-y-auto inset-0 m-auto rounded-lg bg-elevated-assistive border border-gray-400"
    >
      {/* 백그라운드 이미지 */}
      <div className="absolute inset-0">
        <Image src={bgPath} alt="ai-mentor-background" fill className="object-cover" priority={true} sizes="100%" />
      </div>

      <div className="relative z-10">
        <FlexBox className="justify-between p-6 pb-4">
          <FlexBox className="gap-2 items-center">
            <h1 className="text-base font-bold text-white">{aiMentorName}</h1>
            <Image src="/home/planet.png" alt="planet" width={24} height={20} priority={true} className="w-6 h-5" />
          </FlexBox>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700/50 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </FlexBox>

        <div className="px-6 pb-6">
          <h2 className="text-lg font-bold text-white mb-6">{aiMentorAdvice.message}</h2>
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-4">
              <span className="px-3 py-1 bg-label-button-assistive text-label-neutral text-xs caption-1-bold rounded-full whitespace-nowrap">
                Try
              </span>
              <p className="text-sm text-label-normal">{aiMentorAdvice.kpt.tryNext}</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <span className="px-3 py-1 bg-label-button-assistive text-label-neutral text-xs caption-1-bold rounded-full whitespace-nowrap">
                Keep
              </span>
              <p className="text-sm text-label-normal">{aiMentorAdvice.kpt.keep}</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <span className="px-3 py-1 bg-label-button-assistive text-label-neutral text-xs caption-1-bold rounded-full whitespace-nowrap">
                Problem
              </span>
              <p className="text-sm text-label-normal">{aiMentorAdvice.kpt.problem}</p>
            </div>
          </div>
        </div>
        <FlexBox className="justify-center">
          <Image src={characterPath} alt="ai-mentor-character" width={100} height={140} priority={true} />
        </FlexBox>
      </div>
    </dialog>
  );
};
