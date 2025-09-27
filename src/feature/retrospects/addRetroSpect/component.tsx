'use client';

import { useState, useCallback } from 'react';
import Button from '@/shared/components/input/Button';
import { Modal } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import { ToolTip } from '@/shared/components/display/ToolTip';
import { useFetchAddRetrospect, useFetchRetrospects, useFetchEditRetrospect } from './hooks';
import { Goal } from '@/shared/type/goal';
import { useToast } from '@/shared/components/feedBack/toast';
import Image from 'next/image';

interface AddRetroSpectButtonProps {
  goal: Goal;
  selectedPlanId: string;
  currentWeekIndex: number;
}

export const AddRetroSpectButton = ({ goal, selectedPlanId, currentWeekIndex }: AddRetroSpectButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kpt, setKpt] = useState({
    keep: '',
    problem: '',
    tryNext: '',
  });
  const [contentError, setContentError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const { showToast } = useToast();

  const {
    retrospect,
    fetchRetrospects,
    isLoading: isLoadingRetrospects,
  } = useFetchRetrospects(
    { goalId: goal.id, planId: selectedPlanId },
    {
      onError: err => {
        console.error('회고 목록 조회 실패:', err);
      },
    }
  );

  const { addRetrospect, isLoading: isAddingRetrospect } = useFetchAddRetrospect({
    onSuccess: () => {
      handleModalClose();
      fetchRetrospects();
    },
    onError: err => {
      showToast('회고 등록에 성공했습니다.', 'success');
      console.error('회고 등록 실패:', err);
    },
  });

  const { editRetrospect, isLoading: isEditingRetrospect } = useFetchEditRetrospect({
    onSuccess: () => {
      showToast('회고 수정에 성공했습니다.', 'success');
      handleModalClose();
      fetchRetrospects();
    },
    onError: err => {
      showToast('회고 수정에 실패했습니다.', 'error');
      console.error('회고 수정 실패:', err);
    },
  });

  const handleSubmit = useCallback(async () => {
    if (!isFormValid() || isAddingRetrospect || isEditingRetrospect) return;

    try {
      if (isEditMode && retrospect) {
        await editRetrospect({
          retrospectId: retrospect?.retrospect?.id,
          planId: selectedPlanId,
          kpt,
        });
      } else {
        await addRetrospect({
          goalId: goal.id,
          planId: selectedPlanId,
          kpt,
        });
      }
    } catch (error) {}
  }, [
    addRetrospect,
    editRetrospect,
    kpt,
    isAddingRetrospect,
    isEditingRetrospect,
    isEditMode,
    retrospect,
    goal,
    selectedPlanId,
  ]);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
    if (retrospect) {
      setIsEditMode(true);
      setKpt(retrospect?.retrospect?.kpt || { keep: '', problem: '', tryNext: '' });
      setContentError('');
    } else {
      setIsEditMode(false);
      setKpt({ keep: '', problem: '', tryNext: '' });
      setContentError('');
    }
  }, [retrospect]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setKpt({ keep: '', problem: '', tryNext: '' });
    setContentError('');
    setIsEditMode(false);
  }, []);

  const handleKptChange = useCallback((field: 'keep' | 'problem' | 'tryNext', value: string) => {
    setKpt(prev => ({ ...prev, [field]: value }));
    if (value.length < 5) {
      setContentError('각 항목은 5글자 이상 작성해주세요');
    } else {
      setContentError('');
    }
  }, []);

  const isFormValid = useCallback(() => {
    return kpt.keep.length >= 5 && kpt.problem.length >= 5 && kpt.tryNext.length >= 5 && !contentError;
  }, [kpt, contentError]);

  const modalTitle = isEditMode ? `${currentWeekIndex}주차 회고 편집` : `${currentWeekIndex}주차 회고 작성`;
  const footerButtonText = isEditMode ? '편집 완료' : '작성 완료';
  const isSubmitting = isAddingRetrospect || isEditingRetrospect;

  return (
    <>
      <div className="relative min-w-[44px]">
        <Button
          variant="tertiary"
          text="주간 회고"
          size="sm"
          layout="icon-left"
          onClick={() => showModal()}
          icon={<ButtonIcon needCreate={!retrospect} />}
        />
        {!isLoadingRetrospects && !retrospect && (
          <>
            <ToolTip text="회고를 입력하세요" position="top-center" className="hidden sm:block" />
            <ToolTip text="회고를 입력하세요" position="bottom-right" className="block sm:hidden" />
          </>
        )}
        {!retrospect && (
          <div className="absolute top-[6px] right-[6px] w-[6px] h-[6px] rounded-[6px] bg-accent-fg-lime" />
        )}
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        renderContent={() => (
          <div className="flex flex-col justify-start gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-green-500">Keep (잘한 점)</label>
              <TextArea
                className="min-w-[300px] md:min-w-[496px]"
                maxLength={200}
                value={kpt.keep}
                onChange={e => handleKptChange('keep', e.target.value)}
                placeholder="이번 주에 잘한 점을 작성해주세요 (5글자 이상)"
                isError={!!contentError}
                errorMessage={contentError}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-red-500">Problem (문제점)</label>
              <TextArea
                className="min-w-[300px] md:min-w-[496px]"
                maxLength={200}
                value={kpt.problem}
                onChange={e => handleKptChange('problem', e.target.value)}
                placeholder="이번 주에 발생한 문제점을 작성해주세요 (5글자 이상)"
                isError={!!contentError}
                errorMessage={contentError}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-blue-500">Try Next (다음에 시도할 것)</label>
              <TextArea
                className="min-w-[300px] md:min-w-[496px]"
                maxLength={200}
                value={kpt.tryNext}
                onChange={e => handleKptChange('tryNext', e.target.value)}
                placeholder="다음 주에 시도해볼 개선점을 작성해주세요 (5글자 이상)"
                isError={!!contentError}
                errorMessage={contentError}
              />
            </div>
          </div>
        )}
        renderFooter={() => (
          <Button text={footerButtonText} size="xl" onClick={handleSubmit} disabled={!isFormValid() || isSubmitting} />
        )}
      />
    </>
  );
};

interface ButtonIconProps {
  needCreate: boolean;
}

const ButtonIcon = ({ needCreate }: ButtonIconProps) => {
  if (needCreate) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.99935 4.16663V15.8333M4.16602 9.99996H15.8327"
          stroke="white"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return <Image src="/icon/check-green.svg" alt="check-creaeIcon" width={20} height={20} />;
};
