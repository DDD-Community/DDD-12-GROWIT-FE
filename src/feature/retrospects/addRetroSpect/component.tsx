'use client';

import { useState, useCallback } from 'react';
import Button from '@/shared/components/input/Button';
import { Modal } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import { ToolTip } from '@/shared/components/display/ToolTip';
import { useFetchAddRetrospect, useFetchRetrospects, useFetchEditRetrospect } from './hooks';
import { Goal } from '@/shared/type/goal';
import { useToast } from '@/shared/components/feedBack/toast';

interface AddRetroSpectButtonProps {
  goal: Goal;
  selectedPlanId: string;
  currentWeekIndex: number;
}

export const AddRetroSpectButton = ({ goal, selectedPlanId, currentWeekIndex }: AddRetroSpectButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
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
      onSuccess: () => {
        // 성공 시 처리 (필요시)
      },
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
          content,
        });
      } else {
        await addRetrospect({
          goalId: goal.id,
          planId: selectedPlanId,
          content,
        });
      }
    } catch (error) {}
  }, [
    addRetrospect,
    editRetrospect,
    content,
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
      setContent(retrospect?.retrospect?.content);
      setContentError('');
    } else {
      setIsEditMode(false);
      setContent('');
      setContentError('');
    }
  }, [retrospect]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setContent('');
    setContentError('');
    setIsEditMode(false);
  }, []);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    if (value.length < 10) {
      setContentError('회고는 10글자 이상 작성해주세요');
    } else {
      setContentError('');
    }
  }, []);

  const isFormValid = useCallback(() => {
    return content?.length >= 10 && !contentError;
  }, [content, contentError]);

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
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.99935 4.16663V15.8333M4.16602 9.99996H15.8327"
                stroke="white"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        {!isLoadingRetrospects && !retrospect && (
          <>
            <ToolTip text="회고를 입력하세요" position="top-center" className="hidden sm:block" />
            <ToolTip text="회고를 입력하세요" position="bottom-right" className="block sm:hidden" />
          </>
        )}
        {retrospect && (
          <div className="absolute top-[6px] right-[6px] w-[6px] h-[6px] rounded-[6px] bg-accent-fg-lime" />
        )}
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        renderContent={() => (
          <div className="flex flex-col justify-start gap-4">
            <TextArea
              className="min-w-[300px] md:min-w-[496px]"
              maxLength={200}
              value={content}
              onChange={handleContentChange}
              placeholder="이번 주 목표 달성 과정과 개선점에 대해 작성해주세요 (10글자 이상)"
              isError={!!contentError}
              errorMessage={contentError}
            />
          </div>
        )}
        renderFooter={() => (
          <Button text={footerButtonText} size="xl" onClick={handleSubmit} disabled={!isFormValid() || isSubmitting} />
        )}
      />
    </>
  );
};
