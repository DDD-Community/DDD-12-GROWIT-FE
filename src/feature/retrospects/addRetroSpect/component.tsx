import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/shared/components/input/Button';
import { Modal } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import { ToolTip } from '@/shared/components/display/ToolTip';
import { Goal } from '@/shared/type/goal';
import { useFetchAddRetrospect, useFetchRetrospects, useFetchEditRetrospect } from './hooks';

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

  const { addRetrospect, isLoading: isAddingRetrospect } = useFetchAddRetrospect({
    onSuccess: () => {
      handleModalClose();
      fetchRetrospects();
    },
    onError: err => {
      // 에러 핸들링 (필요시)
      console.error('회고 등록 실패:', err);
    },
  });

  const { editRetrospect, isLoading: isEditingRetrospect } = useFetchEditRetrospect({
    onSuccess: () => {
      handleModalClose();
      fetchRetrospects();
    },
    onError: err => {
      console.error('회고 수정 실패:', err);
    },
  });

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

  const handleSubmit = useCallback(async () => {
    if (!isFormValid() || isAddingRetrospect || isEditingRetrospect) return;

    try {
      if (isEditMode && retrospect) {
        await editRetrospect({
          retrospectId: retrospect.id,
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
      setContent(retrospect.content);
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
    return content.length >= 10 && !contentError;
  }, [content, contentError]);

  const modalTitle = isEditMode ? `${currentWeekIndex}주차 회고 편집` : `${currentWeekIndex}주차 회고 작성`;
  const footerButtonText = isEditMode ? '편집 완료' : '작성 완료';
  const isSubmitting = isAddingRetrospect || isEditingRetrospect;

  return (
    <>
      <div className="relative min-w-[44px]">
        <Button
          variant="tertiary"
          size="lg"
          layout="icon-only"
          onClick={() => showModal()}
          icon={<Image src={'/icon/growit-comment.svg'} alt={'회고록 작성 아이콘'} width={20} height={20} />}
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
