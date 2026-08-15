'use client';

import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { XIcon } from 'lucide-react';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { Modal } from '@/shared/components/feedBack/Modal';
import Button from '@/shared/components/input/Button';
import { useTodoFormContext } from '../../../form';
import type { TodoFormData } from '../../../types';
import type { RoutineUpdateType } from '@/model/todo/todoList/dto';

interface EditButtonProps {
  onClick: () => void;
  text: string;
  variant?: 'danger' | 'default';
  disabled?: boolean;
}

const EditButton = ({ onClick, text, variant = 'danger', disabled = false }: EditButtonProps) => {
  const textColor = variant === 'danger' ? 'text-[#FF6363]' : 'text-white';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-[44px] w-full items-center justify-center rounded-[8px] px-[18px] py-[10px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
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
  const { handleEdit, isSubmitting, hasOriginalRepeat } = useTodoFormContext();
  const [confirmScope, setConfirmScope] = useState<Extract<RoutineUpdateType, 'FROM_DATE' | 'ALL'> | null>(null);

  const repeatType = watch('repeatType');
  const hasRepeat = repeatType !== 'none';

  const submitScope = async (scope: RoutineUpdateType) => {
    const succeeded = await handleEdit(scope);
    if (succeeded) {
      setConfirmScope(null);
      onClose();
    }
  };

  // 반복 투두가 아니면 렌더링하지 않음
  if (!hasRepeat) return null;

  return (
    <>
      <BottomSheet isOpen={isOpen} showSheet={() => {}} closeSheet={isSubmitting ? () => {} : onClose} height="auto">
        <BottomSheet.Title>
          <div className="flex w-full items-center justify-end px-5 pb-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="수정 범위 선택 닫기"
              className="text-label-normal transition-colors hover:text-label-strong disabled:opacity-40"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </BottomSheet.Title>

        <BottomSheet.Content>
          <div className="flex flex-col">
            <div className="border-b border-border-secondary py-2">
              <EditButton
                onClick={() => submitScope('SINGLE')}
                text="해당 투두만 수정"
                variant="danger"
                disabled={isSubmitting || !hasOriginalRepeat}
              />
            </div>
            <div className="border-b border-border-secondary py-2">
              <EditButton
                onClick={() => setConfirmScope('FROM_DATE')}
                text="해당 날짜 이후 수정"
                variant="default"
                disabled={isSubmitting || !hasOriginalRepeat}
              />
            </div>
            <div className="py-2">
              <EditButton
                onClick={() => setConfirmScope('ALL')}
                text="전체 반복 투두 수정"
                variant="default"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </BottomSheet.Content>
      </BottomSheet>

      <Modal
        open={confirmScope !== null}
        onClose={isSubmitting ? undefined : () => setConfirmScope(null)}
        renderContent={() => (
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="heading-2-bold text-label-normal">
              {confirmScope === 'FROM_DATE' ? '이 날짜 이후 투두를 수정할까요?' : '전체 반복 투두를 수정할까요?'}
            </p>
            <p className="body-2-normal text-label-neutral">
              {confirmScope === 'FROM_DATE'
                ? '선택한 날짜를 포함한 이후 투두가 다시 생성됩니다.'
                : '지난 투두를 포함한 전체 반복 투두가 다시 생성됩니다.'}
              <br />
              날짜가 달라지는 투두의 완료 기록은 초기화될 수 있어요.
            </p>
          </div>
        )}
        renderFooter={() => (
          <div className="flex w-full gap-2">
            <Button
              size="xl"
              variant="tertiary"
              text="취소"
              disabled={isSubmitting}
              onClick={() => setConfirmScope(null)}
            />
            <Button
              size="xl"
              text="수정"
              status={isSubmitting ? 'loading' : 'idle'}
              disabled={isSubmitting}
              onClick={() => confirmScope && submitScope(confirmScope)}
            />
          </div>
        )}
      />
    </>
  );
};

export default EditBottomSheet;
