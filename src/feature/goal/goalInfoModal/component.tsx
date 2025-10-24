'use client';

import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Badge from '@/shared/components/display/Badge';
import { Modal } from '@/shared/components/feedBack/Modal';
import Button from '@/shared/components/input/Button';
import { AIMentorNames } from '@/feature/home/const';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Goal } from '@/shared/type/goal';
import { DeleteConfirm } from './components/DeleteConfirm';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';

interface GoalInfoModalProps extends GoalInfoModalActions {
  isOpen: boolean;
  onClose: () => void;
  goal?: Goal;
}

interface GoalInfoModalActions {
  onDelete: (goalId: string) => void;
}

export function GoalInfoModal({ isOpen, onClose, onDelete, goal }: GoalInfoModalProps) {
  const router = useRouter();
  const { trackButtonClick } = useGTMActions();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  if (!goal) return null;

  const handleEditClick = () => {
    trackButtonClick({
      eventName: GTM_EVENTS.GOAL_CLICK,
      buttonName: GTM_BUTTON_NAME.PLANET_EDIT,
    });
    router.push(`/goal/${goal.id}`);
    onClose();
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
    trackButtonClick({
      eventName: GTM_EVENTS.GOAL_CLICK,
      buttonName: GTM_BUTTON_NAME.PLANET_DELETE,
    });
  };

  const handleDeleteConfirm = () => {
    onDelete(goal.id);
    setIsDeleteConfirmOpen(false);
  };

  const getStatusBadge = () => {
    // goal의 duration.endDate를 기준으로 상태 계산
    const today = new Date();
    const endDate = new Date(goal.duration.endDate);
    const isCompleted = today > endDate;

    if (isCompleted) {
      return (
        <Badge
          type="default"
          size="md"
          label="종료"
          color="bg-[rgba(112,115,124,0.22)]"
          textColor="text-[rgba(194,196,200,0.88)]"
          className="px-3 py-1 rounded-2xl"
        />
      );
    } else {
      return (
        <Badge type="default" size="md" label="진행중" color="bg-[rgba(53,217,66,0.4)]" textColor="text-[#3AEE49]" />
      );
    }
  };

  const renderContent = () => (
    <div className="flex flex-col gap-4">
      {/* Badge and Title */}
      <div className="flex flex-col gap-4">
        <FlexBox className="justify-start">{getStatusBadge()}</FlexBox>

        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-label-normal" />
          <h2 className="headline-1-bold text-label-normal flex-1">{goal.name}</h2>
        </div>
      </div>

      {/* Goal Details */}
      <div className="flex flex-col gap-2">
        {/* Duration */}
        <div className="flex items-center gap-2.5">
          <span className="label-1-medium text-label-neutral">기간</span>
          <span className="label-1-medium text-[#3AEE49]">{goal.plans.length}주</span>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2.5">
          <span className="label-1-medium text-label-neutral">날짜</span>
          <span className="label-1-medium text-label-normal">
            {goal.duration.startDate} ~ {goal.duration.endDate}
          </span>
        </div>

        {/* Mentor */}
        <div className="flex items-center gap-2.5">
          <span className="label-1-medium text-label-neutral">멘토</span>
          <span className="label-1-medium text-label-normal">{AIMentorNames[goal.mentor]}</span>
        </div>
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className="flex gap-2 w-full">
      <Button
        variant="secondary"
        size="ml"
        className="flex-1 bg-[rgba(46,47,51,0.88)] border border-[rgba(112,115,124,0.32)] text-[#FF6363] hover:bg-fill-strong"
        text="삭제"
        onClick={handleDeleteClick}
      />
      <Button variant="primary" size="ml" className="flex-1" text="수정" onClick={handleEditClick} />
    </div>
  );

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        title="목표 정보"
        renderContent={renderContent}
        renderFooter={renderFooter}
        className="w-[335px]"
      />
      {isOpen && isDeleteConfirmOpen && (
        <DeleteConfirm
          isOpen={true}
          onClose={() => {
            onClose();
            setIsDeleteConfirmOpen(false);
          }}
          onConfirm={handleDeleteConfirm}
          goalName={goal.name}
        />
      )}
    </>
  );
}
