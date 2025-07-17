import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/shared/components/navigation/Button';
import { Modal } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import { ToolTip } from '@/shared/components/display/ToolTip';
import { Goal } from '@/shared/type/goal';
import { useFetchAddRetrospect, useFetchRetrospects } from './hooks';

interface AddRetroSpectButtonProps {
  goal: Goal;
  selectedPlanId: string;
  currentWeekIndex: number;
}

export const AddRetroSpectButton = ({ goal, selectedPlanId, currentWeekIndex }: AddRetroSpectButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const { addRetrospect, isLoading: isAddingRetrospect } = useFetchAddRetrospect({
    onSuccess: () => {
      handleModalClose();
      fetchRetrospects();
    },
    onError: err => {
      console.error('회고 등록 실패:', err);
    },
  });

  const {
    retrospect,
    fetchRetrospects,
    isLoading: isLoadingRetrospects,
    error: fetchError,
  } = useFetchRetrospects(
    { goalId: goal.id, planId: selectedPlanId },
    {
      onSuccess: () => {},
      onError: err => {
        console.error('회고 목록 조회 실패:', err);
      },
    }
  );

  const handleSubmit = useCallback(async () => {
    if (!isFormValid() || isAddingRetrospect) return;

    try {
      await addRetrospect({
        goalId: goal.id,
        planId: selectedPlanId,
        content,
      });
      // 성공 시 모달은 onSuccess에서 닫힘
    } catch (error) {
      // 에러는 onError에서 처리됨
    }
  }, [addRetrospect, content, isAddingRetrospect, goal]);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setContent('');
    setContentError('');
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

  // 현재 주차에 회고가 있는지 확인
  const shouldShowTooltip = !retrospect && !isLoadingRetrospects && !fetchError;

  return (
    <>
      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          layout="icon-only"
          onClick={() => showModal()}
          icon={<Image src={'/icon/growit-comment.svg'} alt={'회고록 작성 아이콘'} width={20} height={20} />}
        />
        {!shouldShowTooltip && (
          <ToolTip text="주간회고를 입력하세요" className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10" />
        )}
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        title={`${currentWeekIndex}주차 회고 작성`}
        renderContent={() => (
          <div className="flex flex-col justify-start gap-4">
            <TextArea
              className="min-w-[300px] md:min-w-[512px]"
              maxLength={200}
              value={content}
              onChange={handleContentChange}
              placeholder="이번 주 목표 달성 과정과 개선점에 대해 작성해주세요 (10글자 이상)"
              isError={!!contentError}
              errorMessage={contentError}
            />
          </div>
        )}
        renderFooter={() => <Button text="작성 완료" size="xl" onClick={handleSubmit} disabled={!isFormValid()} />}
      />
    </>
  );
};
