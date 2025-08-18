'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/shared/components/feedBack/Modal';
import { InputField } from '@/shared/components/input/InputField';
import Button from '@/shared/components/input/Button';
import { useFetchEditPlan } from './hooks';

interface AddPlanModalProps {
  onSuccessAddPlan: () => void;
  selectedPlanIndex: number;
  selectedPlanContent: string;
  goalId: string;
  planId: string;
}

interface PlanFormData {
  description: string;
}

export const AddPlanModal = ({
  onSuccessAddPlan,
  selectedPlanContent,
  selectedPlanIndex = 1,
  goalId,
  planId,
}: AddPlanModalProps) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PlanFormData>({
    mode: 'onChange',
    defaultValues: {
      description: selectedPlanContent || '',
    },
  });

  const watchDescription = watch('description');

  const { updatePlan, loading } = useFetchEditPlan({
    onSuccess: () => {
      onSuccessAddPlan();
      setOpen(false);
      reset();
    },
  });

  const onSubmit = async (data: PlanFormData) => {
    await updatePlan(goalId, planId, data.description);
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const displayGoal = selectedPlanIndex || `${selectedPlanIndex}주차 목표를 입력해주세요`;
  const displayInfo = selectedPlanContent || '';

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-between w-full p-4 bg-elevated-normal rounded-lg hover:bg-elevated-alternative transition-colors duration-200 border border-line-normal"
      >
        <div className="flex flex-1 flex-col min-w-0">
          <span className="text-label-alternative text-xs font-medium text-left">주차 목표</span>
          <p className="text-label-normal text-sm mt-1 truncate w-full text-left">
            {displayInfo ? `'${displayInfo}'` : displayGoal}
          </p>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-label-alternative"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Modal
        open={open}
        onClose={handleCancel}
        title="새 계획 추가"
        renderContent={() => (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-[300px] md:min-w-[500px]">
            <div>
              <InputField
                label=""
                placeholder="ex. 책 100페이지 읽기"
                isError={Boolean(errors.description)}
                errorMessage={errors.description?.message}
                {...register('description', {
                  required: '목표를 입력해주세요',
                  minLength: {
                    value: 1,
                    message: '목표를 입력해주세요',
                  },
                  validate: value => value.trim().length > 0 || '목표를 입력해주세요',
                })}
              />
            </div>
          </form>
        )}
        renderFooter={() => (
          <Button
            text={'목표 추가'}
            size="xl"
            onClick={handleSubmit(onSubmit)}
            disabled={!watchDescription?.trim() || loading}
          />
        )}
      />
    </>
  );
};
