'use client';

import { useFormContext } from 'react-hook-form';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { DeleteButton } from '../../shared/deleteButton';
import { useTodoFormContext } from '../../../form';
import type { TodoFormData } from '../../../types';

interface DeleteSelectViewProps {
  /** 뒤로가기 핸들러 */
  onBack: () => void;
}

export const DeleteSelectView = ({ onBack }: DeleteSelectViewProps) => {
  const { watch } = useFormContext<TodoFormData>();
  const { handleDelete, handleDeleteAllRepeats } = useTodoFormContext();

  const repeatType = watch('repeatType');
  const hasRepeat = repeatType !== 'none';

  return (
    <>
      <BottomSheet.Title>
        <div className="w-full flex items-center px-5 pt-2 pb-4">
          <button type="button" onClick={onBack} className="label-1-bold text-label-normal">
            취소
          </button>
        </div>
      </BottomSheet.Title>

      <BottomSheet.Content>
        <div className="flex flex-col">
          {hasRepeat && handleDeleteAllRepeats ? (
            <>
              {/* 반복 투두일 경우: 두 개의 삭제 버튼 표시 */}
              <div className="py-2">
                <DeleteButton onClick={handleDelete} text="해당 투두만 삭제" showIcon={false} />
              </div>
              <div className="py-2">
                <DeleteButton onClick={handleDeleteAllRepeats} text="전체 반복 투두 삭제" showIcon={false} />
              </div>
            </>
          ) : (
            /* 반복 투두가 아닐 경우: 해당 투두만 삭제 */
            <DeleteButton onClick={handleDelete} showIcon={false} />
          )}
        </div>
      </BottomSheet.Content>
    </>
  );
};

export default DeleteSelectView;
