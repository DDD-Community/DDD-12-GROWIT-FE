'use client';

import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { ChevronLeftIcon } from '../../shared/icons';

interface GoalSelectViewLoadingProps {
  /** 뒤로가기 클릭 핸들러 */
  onBack: () => void;
}

/** GoalSelectView 로딩 상태 컴포넌트 */
export const GoalSelectViewLoading = ({ onBack }: GoalSelectViewLoadingProps) => {
  return (
    <>
      <BottomSheet.Title>
        <div className="w-full flex items-center justify-between px-5 pt-2 pb-4">
          <button type="button" onClick={onBack} className="p-1 -ml-1">
            <ChevronLeftIcon />
          </button>
          <h2 className="body-1-normal-bold text-label-normal">목표 이동</h2>
          <button type="button" onClick={onBack} className="label-1-bold text-label-normal">
            완료
          </button>
        </div>
      </BottomSheet.Title>
      <BottomSheet.Content className="overflow-y-hidden">
        <div className="flex justify-center py-8">
          <span className="text-label-alternative">로딩 중...</span>
        </div>
      </BottomSheet.Content>
    </>
  );
};
