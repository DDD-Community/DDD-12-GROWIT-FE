import { useState, useCallback } from 'react';
import Image from 'next/image';
import Button from '@/shared/components/navigation/Button';
import { Modal } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import { Goal } from '@/shared/type/goal';
import { useFetchAddRetrospect } from './hooks';

interface AddRetroSpectButtonProps {
  goal: Goal;
  currentWeekIndex: number;
}

export const AddRetroSpectButton = ({ goal, currentWeekIndex }: AddRetroSpectButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const { addRetrospect, isLoading, error } = useFetchAddRetrospect({
    onSuccess: () => {
      handleModalClose();
    },
    onError: err => {
      // 에러 핸들링 (필요시)
      console.error('회고 등록 실패:', err);
    },
  });

  const handleSubmit = useCallback(async () => {
    if (!isFormValid() || isLoading) return;

    try {
      // 날짜는 예시로 오늘 날짜를 사용 (실제 날짜 로직 필요시 수정)
      const today = new Date();
      const dateString = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'
      await addRetrospect({
        date: dateString,
        content,
      });
      // 성공 시 모달은 onSuccess에서 닫힘
    } catch (error) {
      // 에러는 onError에서 처리됨
    }
  }, [addRetrospect, content, isLoading]);

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

  return (
    <>
      <div className="">
        <Button
          variant="secondary"
          size="sm"
          layout="icon-only"
          onClick={() => showModal()}
          icon={<Image src={'/icon/growit-comment.svg'} alt={'회고록 작성 아이콘'} width={20} height={20} />}
        />
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        title={`${currentWeekIndex}주차 회고 작성`}
        renderContent={() => (
          <div className="flex flex-col justify-start gap-4">
            <TextArea
              className="min-w-[300px] md:min-w-[512px]"
              maxLength={500}
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
