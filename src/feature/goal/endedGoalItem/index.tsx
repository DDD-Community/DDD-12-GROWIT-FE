import { Goal } from '@/shared/type/goal';
import Image from 'next/image';
import Checkbox from '@/shared/components/input/Checkbox';
import Badge from '@/shared/components/display/Badge';
import Button from '@/shared/components/input/Button';
import { useEffect, useRef, useState } from 'react';
import { ToolTip } from '@/shared/components/display/ToolTip';

type EndedGoalItemProps = {
  goal: Goal;
  isEditMode?: boolean;
  checked: boolean;
  onCheck: (checked: boolean) => void;
};
export const EndedGoalItem = ({ goal, isEditMode = false, checked, onCheck }: EndedGoalItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <EndedGoalItemModal open={isModalOpen} onClose={() => setIsModalOpen(false)} goal={goal} />
      <li className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => (isEditMode ? null : setIsModalOpen(true))}
          className={`bg-elevated-normal relative flex flex-col items-center justify-center gap-2 rounded-[10px] py-4 ${isEditMode ? '' : 'cursor-pointer'}`}
        >
          {isEditMode && (
            <div className="absolute top-2 left-2">
              <Checkbox id="ended-goal-checkbox" checked={checked} onChange={() => onCheck(!checked)} />
            </div>
          )}
          <Image
            id="ended-goal-image"
            src="/goal/goal-progress.png"
            width={100}
            height={100}
            alt={goal.name}
            className="object-cover"
            priority
          />
          <label htmlFor="ended-goal-image" className="caption-1-regular text-text-secondary">
            행성 이름
          </label>
        </button>
        <div className="flex flex-col gap-2">
          <h3 className="body-2-bold text-text-strong">{goal.name}</h3>
          <p className="label-1-medium text-text-tertiary">
            {goal.duration.startDate} ~ {goal.duration.endDate}
          </p>
          <p className="label-1-regular text-text-primary">
            투두 완료율: <span className="label-1-bold text-brand-neon">15%</span>
          </p>
        </div>
      </li>
    </>
  );
};

type EndedGoalItemModalProps = {
  open: boolean;
  onClose: () => void;
  goal: Goal;
};

function EndedGoalItemModal({ open, onClose, goal }: EndedGoalItemModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // 바깥쪽 클릭 & ESC 클릭 시 닫히도록 설계
  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent) => {
      if (dialogRef.current && event.key === 'Escape') {
        const otherModals = document.querySelectorAll('dialog[open]');
        const isNestedModal = otherModals.length > 1;

        if (!isNestedModal) {
          onClose?.();
        }
      }
    };
    document.addEventListener('keydown', handleEscapePress);
    return () => {
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
      className={`min-w-3xs max-w-xs bg-elevated-assistive rounded-[20px] shadow-xl border-0 fixed inset-0 m-auto overflow-visible`}
    >
      <article className="absolute -top-16 right-4 z-10">
        <ToolTip text="행성 이름" position="top-center" />
        <Image src="/goal/goal-progress.png" alt={goal.name} width={120} height={120} className="relative" />
      </article>
      <section className="flex flex-col w-full items-center justify-center py-[20px] px-[24px] gap-5 overflow-y-visible">
        <div className="space-y-4 w-full">
          <Badge
            type="default"
            size="md"
            label="종료"
            color="bg-[rgba(112,115,124,0.22)]"
            textColor="text-[rgba(194,196,200,0.88)]"
            className="px-3 py-1 rounded-2xl"
          />
          <div className="space-y-1">
            <h3 className="headline-1-bold text-label-normal">{goal.name}</h3>
            <p className="label-1-medium text-text-secondary">
              {goal.duration.startDate} ~ {goal.duration.endDate}
            </p>
          </div>
          <span className="label-1-regular text-text-primary">
            투두 완료율: <span className="label-1-bold text-brand-neon">15%</span>
          </span>
        </div>

        <p className="text-text-strong text-pretty">
          GROWIT MVP 개발과 사회문제 해결형 서비스 기획, 스타트업·VC 트렌드 리서치를 병행하며 실행력과 전략적 감각을
          개발하면서 4주 목표를 실행했습니다.
        </p>
      </section>
      <div id="modal-portal-layer" className="relative" />
      <div className="w-full pt-[16px] pb-[24px] px-[24px] justify-end gap-2">
        <Button size="ml" variant="primary" text="확인" onClick={onClose} />
      </div>
    </dialog>
  );
}
