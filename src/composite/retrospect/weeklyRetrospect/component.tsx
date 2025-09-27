'use client';

import { useState, useEffect } from 'react';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import { TextArea } from '@/shared/components/input/TextArea';
import Button from '@/shared/components/input/Button';
import Header from '@/shared/components/layout/Header';
import {
  useFetchRetrospectById,
  useFetchEditRetrospect,
  useFetchAddRetrospect,
} from '@/feature/retrospects/addRetroSpect/hooks';
import { useToast } from '@/shared/components/feedBack/toast';

interface WeeklyRetrospectPageProps {
  retrospectId: string;
  goalId?: string;
  planId?: string;
  weekIndex?: string;
}

export const WeeklyRetrospectPage = ({ retrospectId, goalId, planId, weekIndex }: WeeklyRetrospectPageProps) => {
  const { showToast } = useToast();
  const isNewRetrospect = retrospectId === 'new';

  const { retrospect, isLoading, fetchRetrospects } = isNewRetrospect
    ? { retrospect: null, isLoading: false, fetchRetrospects: () => {} }
    : useFetchRetrospectById(retrospectId);

  const { editRetrospect, isLoading: isEditing } = useFetchEditRetrospect({
    onSuccess: () => {
      showToast('회고가 성공적으로 수정되었습니다.', 'success');
      fetchRetrospects();
    },
    onError: error => {
      showToast('회고 수정에 실패했습니다.', 'error');
    },
  });

  const { addRetrospect, isLoading: isAdding } = useFetchAddRetrospect({
    onSuccess: data => {
      showToast('회고가 성공적으로 작성되었습니다.', 'success');
      window.location.href = `/retrospect/${data.id}`;
    },
    onError: error => {
      showToast('회고 작성에 실패했습니다.', 'error');
    },
  });

  const [retrospectData, setRetrospectData] = useState({
    keep: '',
    problem: '',
    tryNext: '',
  });

  // 회고 데이터 로드
  useEffect(() => {
    if (retrospect) {
      setRetrospectData({
        keep: retrospect.retrospect.kpt.keep,
        problem: retrospect.retrospect.kpt.problem,
        tryNext: retrospect.retrospect.kpt.tryNext,
      });
    }
  }, [retrospect]);

  const handleInputChange = (field: 'keep' | 'problem' | 'tryNext', value: string) => {
    setRetrospectData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!retrospectData.keep.trim() || !retrospectData.problem.trim() || !retrospectData.tryNext.trim()) {
      showToast('모든 항목을 입력해주세요.', 'error');
      return;
    }

    if (isNewRetrospect) {
      // 새 회고 생성
      if (!goalId || !planId) {
        showToast('필요한 정보가 없습니다.', 'error');
        return;
      }

      try {
        await addRetrospect({
          goalId,
          planId,
          kpt: retrospectData,
        });
      } catch (error) {
        // 에러는 hook에서 처리됨
      }
    } else {
      // 기존 회고 수정
      if (!retrospect) {
        showToast('회고 정보를 찾을 수 없습니다.', 'error');
        return;
      }

      try {
        await editRetrospect({
          retrospectId: retrospect.retrospect.id,
          planId: retrospect.plan.id,
          kpt: retrospectData,
        });
      } catch (error) {
        // 에러는 hook에서 처리됨
      }
    }
  };

  const isFormValid = retrospectData.keep.trim() && retrospectData.problem.trim() && retrospectData.tryNext.trim();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-label-normal">로딩 중...</div>
      </div>
    );
  }

  const getHeaderTitle = () => {
    if (isNewRetrospect) {
      return weekIndex ? `${weekIndex}주차 회고 작성` : '새 회고 작성';
    }
    return weekIndex ? `${weekIndex}주차 회고` : '주간 회고';
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <Header mode="title" title={getHeaderTitle()} />
      <div className="b-5 pt-20" />

      {/* Content */}
      <div className="mx-6 pb-10">
        <div className="space-y-5">
          {/* Keep (잘한 점) */}
          <Accordion
            defaultOpen={true}
            renderTitle={() => (
              <FlexBox className="flex gap-2">
                <p className="heading-2-bold text-label-normal">Keep (잘한 점)</p>
              </FlexBox>
            )}
          >
            <div className="pt-4">
              <TextArea
                value={retrospectData.keep}
                onChange={e => handleInputChange('keep', e.target.value)}
                placeholder="ex. 매달 일정 금액을 저축했다."
                maxLength={200}
                className="min-h-[80px]"
              />
            </div>
          </Accordion>

          {/* Problem (아쉬운 점) */}
          <Accordion
            defaultOpen={true}
            renderTitle={() => (
              <FlexBox className="flex gap-2">
                <p className="heading-2-bold text-label-normal">Problem (아쉬운 점)</p>
              </FlexBox>
            )}
          >
            <div className="pt-4">
              <TextArea
                value={retrospectData.problem}
                onChange={e => handleInputChange('problem', e.target.value)}
                placeholder="ex. 소비 내역을 기록하지 않아 지출이 늘었다."
                maxLength={200}
                className="min-h-[80px]"
              />
            </div>
          </Accordion>

          {/* Try (다음에 시도하고 싶은 것) */}
          <Accordion
            defaultOpen={true}
            renderTitle={() => (
              <FlexBox className="flex gap-2">
                <p className="heading-2-bold text-label-normal">Try (다음에 시도하고 싶은 것)</p>
              </FlexBox>
            )}
          >
            <div className="pt-4">
              <TextArea
                value={retrospectData.tryNext}
                onChange={e => handleInputChange('tryNext', e.target.value)}
                placeholder="ex. 가계부 앱으로 매일 지출을 기록하자."
                maxLength={200}
                className="min-h-[80px]"
              />
            </div>
          </Accordion>
        </div>
      </div>
      <div className="h-[100px]" />
      <div className="fixed bottom-0 left-0 right-0 p-[20px] border-gray-800 sm:hidden bg-[#1B1C1E]">
        <Button
          variant="primary"
          size="xl"
          text={isNewRetrospect ? '작성 완료' : '수정 완료'}
          onClick={handleSubmit}
          disabled={!isFormValid || isEditing || isAdding}
          className="w-full"
        />
      </div>
    </div>
  );
};
