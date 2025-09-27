'use client';

import { useEffect } from 'react';
import Header from '@/shared/components/layout/Header';
import {
  useFetchRetrospectById,
  useFetchEditRetrospect,
  useFetchAddRetrospect,
} from '@/feature/retrospects/addRetroSpect/hooks';
import { useToast } from '@/shared/components/feedBack/toast';
import { KptForm, KPTFormData, useKPTForm } from '@/feature/retrospects/kptForm';
import Button from '@/shared/components/input/Button';

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

  const form = useKPTForm({
    mode: 'onChange',
  });
  
  const {
    reset,
    formState: { isValid },
  } = form;

  // 회고 데이터 로드
  useEffect(() => {
    if (retrospect) {
      reset({
        keep: retrospect.retrospect.kpt.keep,
        problem: retrospect.retrospect.kpt.problem,
        tryNext: retrospect.retrospect.kpt.tryNext,
      });
    }
  }, [retrospect, reset]);

  const handleCreateRetrospect = async (data: KPTFormData) => {
    if (!goalId || !planId) {
      showToast('필요한 정보가 없습니다.', 'error');
      return;
    }
    await addRetrospect({
      goalId,
      planId,
      kpt: data,
    });
  };

  const handleEditRetrospect = async (data: KPTFormData) => {
    if (!retrospect) {
      showToast('회고 정보를 찾을 수 없습니다.', 'error');
      return;
    }
    await editRetrospect({
      retrospectId: retrospect.retrospect.id,
      planId: retrospect.plan.id,
      kpt: data,
    });
  };

  const onSubmit = async (data: KPTFormData) => {
    if (isNewRetrospect) {
      return await handleCreateRetrospect(data);
    }
    return await handleEditRetrospect(data);
  };

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
      <div className="mx-6 pb-10">
        <KptForm.Provider form={form} onSubmit={onSubmit}>
          <KptForm.KeepField />
          <KptForm.ProblemField />
          <KptForm.TryField />
          <div className="h-[100px]" />
          <div className="fixed bottom-0 left-0 right-0 p-[20px] border-gray-800 sm:hidden bg-[#1B1C1E]">
            <Button
              variant="primary"
              size="xl"
              text={isNewRetrospect ? '작성 완료' : '수정 완료'}
              type="submit"
              disabled={!isValid || isEditing || isAdding}
              className="w-full"
            />
          </div>
        </KptForm.Provider>
      </div>
    </div>
  );
};
