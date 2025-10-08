'use client';

import { useEffect } from 'react';
import Header from '@/shared/components/layout/Header';
import {
  useFetchRetrospectById,
  useFetchEditRetrospect,
  useFetchAddRetrospect,
} from '@/feature/retrospects/addRetroSpect/hooks';
import { useRouter } from 'next/navigation';
import { useToast } from '@/shared/components/feedBack/toast';
import { KptForm, KPTFormData, useKPTForm } from '@/feature/retrospects/kptForm';
import Button from '@/shared/components/input/Button';
import { ROUTES } from '@/shared/constants/routes';

interface WeeklyRetrospectPageProps {
  retrospectId: string;
  goalId?: string;
  planId?: string;
  weekIndex?: string;
}

export const WeeklyRetrospectPage = ({ retrospectId, goalId, planId, weekIndex }: WeeklyRetrospectPageProps) => {
  const router = useRouter();
  const { showToast } = useToast();
  const { retrospect, isLoading: isLoadingRetrospect } = useFetchRetrospectById(retrospectId);
  const { editRetrospect, isLoading: isLoadingEditRetrospect } = useFetchEditRetrospect({
    onSuccess: () => {
      router.push(ROUTES.HOME);
      showToast('회고가 성공적으로 수정되었습니다.', 'success');
    },
    onError: () => {
      showToast('회고 수정에 실패했습니다.', 'error');
    },
  });
  const { addRetrospect, isLoading: isLoadingAddRetrospect } = useFetchAddRetrospect({
    onSuccess: () => {
      router.push(ROUTES.HOME);
      showToast('회고가 성공적으로 작성되었습니다.', 'success');
    },
    onError: () => {
      showToast('회고 작성에 실패했습니다.', 'error');
    },
  });

  const isNewRetrospect = retrospectId === 'new';
  const actualRetrospect = isNewRetrospect ? null : retrospect;
  const actualIsLoading = isNewRetrospect ? false : isLoadingRetrospect;

  const form = useKPTForm({
    mode: 'onChange',
  });

  const {
    reset,
    formState: { isValid },
  } = form;

  // 회고 데이터 로드
  useEffect(() => {
    if (actualRetrospect) {
      reset({
        keep: actualRetrospect.retrospect.kpt.keep,
        problem: actualRetrospect.retrospect.kpt.problem,
        tryNext: actualRetrospect.retrospect.kpt.tryNext,
      });
    }
  }, [actualRetrospect, reset]);

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
    if (!actualRetrospect) {
      showToast('회고 정보를 찾을 수 없습니다.', 'error');
      return;
    }
    await editRetrospect({
      retrospectId: actualRetrospect.retrospect.id,
      planId: actualRetrospect.plan.id,
      kpt: data,
    });
  };

  const onSubmit = async (data: KPTFormData) => {
    if (isNewRetrospect) {
      return await handleCreateRetrospect(data);
    }
    return await handleEditRetrospect(data);
  };

  if (actualIsLoading) {
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
          <div className="fixed bottom-0 left-0 right-0 p-[20px] border-gray-800 max-w-md mx-auto bg-[#1B1C1E]">
            <Button
              variant="primary"
              size="xl"
              text={isNewRetrospect ? '작성 완료' : '수정 완료'}
              type="submit"
              disabled={!isValid || isLoadingEditRetrospect || isLoadingAddRetrospect}
              className="w-full"
            />
          </div>
        </KptForm.Provider>
      </div>
    </div>
  );
};
