import Image from 'next/image';
import { AIMentor } from './type';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import FlexBox from '@/shared/components/foundation/FlexBox';

interface AIAdviceDetailModalProps {
  aiMentor: AIMentor;
  open: boolean;
  onClose: () => void;
}

export const AIAdviceDetailModal = ({ aiMentor, open, onClose }: AIAdviceDetailModalProps) => {
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
      className="relative max-w-[338px] w-full md:max-w-[560px] inset-0 m-auto rounded-2xl overflow-hidden bg-elevated-assistive border border-gray-400"
    >
      {/* 백그라운드 이미지 */}
      <div className="absolute inset-0">
        <Image
          src={`/image/${aiMentor}.png`}
          alt="AI Mentor Background"
          fill
          className="object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10">
        <FlexBox className="justify-between p-6 pb-4">
          <FlexBox className="gap-2">
            <h1 className="text-lg font-bold text-white">팀쿡의 조언</h1>
          </FlexBox>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700/50 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </FlexBox>

        <div className="px-6 pb-6">
          <h2 className="text-xl font-bold text-white mb-6">혁신은 단순함에서 시작돼</h2>
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-3">
              <span className="px-3 py-1 bg-label-button-assistive text-white text-xs font-medium rounded-full whitespace-nowrap">
                Try
              </span>
              <p className="body-1-normal text-label-normal">이번주는 MVP를 반드시 배포해라</p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <span className="px-3 py-1 bg-label-button-assistive text-white text-xs font-medium rounded-full whitespace-nowrap">
                Keep
              </span>
              <p className="body-1-normal text-label-normal">투두 분해와 실행 리듬은 안정적이다</p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <span className="px-3 py-1 bg-label-button-assistive text-white text-xs font-medium rounded-full whitespace-nowrap">
                Problem
              </span>
              <p className="body-1-normal text-label-normal">디자인-개발 QA 협업 속도가 더디다</p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};
