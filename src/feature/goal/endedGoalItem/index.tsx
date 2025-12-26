import { Goal } from '@/shared/type/goal';
import Image from 'next/image';
import Checkbox from '@/shared/components/input/Checkbox';
import Badge from '@/shared/components/display/Badge';
import Button from '@/shared/components/input/Button';
import { useEffect, useRef, useState } from 'react';
import { ToolTip } from '@/shared/components/display/ToolTip';
import { getProgressPercentageByDateRange } from '@/shared/lib/utils';

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
            src={goal.planet.image.done}
            width={100}
            height={100}
            alt={goal.name}
            className="object-cover"
            priority
          />
          {goal.planet.name && (
            <label htmlFor="ended-goal-image" className="caption-1-regular text-text-secondary">
              {goal.planet.name}
            </label>
          )}
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
  const progressPercentage = getProgressPercentageByDateRange(goal.duration.startDate, goal.duration.endDate);
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
        <ToolTip text={goal.planet.name} position="top-center" />
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
            투두 완료율: <span className="label-1-bold text-brand-neon">{progressPercentage}%</span>
          </span>
        </div>

        {goal.analysis && <p className="text-text-strong text-pretty">{goal.analysis}</p>}
      </section>
      <div id="modal-portal-layer" className="relative" />
      <div className="w-full pt-[16px] pb-[24px] px-[24px] justify-end gap-2">
        <Button size="ml" variant="primary" text="확인" onClick={onClose} />
      </div>
    </dialog>
  );
}
