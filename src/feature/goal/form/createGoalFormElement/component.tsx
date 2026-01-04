'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { GoalFormType } from '../dto';
import { goalFormSchema } from '../dto';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { InputUnderline } from '@/shared/components/input/InputUnderline';
import DateSelectorPanel from '@/feature/todo/weeklyTodoList/components/DateSelectorPanel';
import { formatDateToYYYYMMDD } from './utils';
import { CellButton } from '@/shared/components/input/CellButton';
import { CheckCircleIcon, XCircleIcon } from '@/shared/constants/icons';
import { ChevronRight } from 'lucide-react';

interface CreateGoalFormProviderProps {
  children: React.ReactNode;
  initValue?: GoalFormType;
}

interface CreateGoalFormContainerProps {
  children: React.ReactNode;
  onSubmit: (data: GoalFormType) => void;
}

const Provider = ({ children }: CreateGoalFormProviderProps) => {
  const methods = useForm<GoalFormType>({
    resolver: zodResolver(goalFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      duration: {
        startDate: '',
        endDate: '',
      },
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const FormContainer = ({ children, onSubmit }: CreateGoalFormContainerProps) => {
  const { handleSubmit } = useFormContext<GoalFormType>();

  return (
    <form className="flex flex-1 flex-col" onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  );
};

const MAX_NAME_LENGTH = 20;

const Name = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<GoalFormType>();
  return (
    <InputUnderline
      label="최종 목표"
      type="text"
      placeholder="목표 이름을 입력해주세요."
      isError={!!errors.name}
      maxLength={MAX_NAME_LENGTH}
      {...register('name', {
        required: '목표 이름을 입력해주세요.',
      })}
    />
  );
};

const SelectStartDate = () => {
  const [openDatePanel, setOpenDatePanel] = useState(false);
  const { watch, setValue } = useFormContext<GoalFormType>();
  const today = new Date();
  const startDateValue = watch('duration.startDate');
  const startDate = startDateValue ? new Date(startDateValue) : today;

  return (
    <>
      <CellButton
        type="button"
        onClick={() => {
          setOpenDatePanel(openDatePanel => !openDatePanel);
        }}
        renderLeftSide={() => (
          <div className="flex items-center gap-2">
            <CheckCircleIcon />
            <span className="label-1-normal text-text-primary">시작일</span>
          </div>
        )}
        renderRightSide={() => (
          <div className="flex items-center gap-2 text-text-strong">
            <span className="label-1-normal">{startDateValue ? startDateValue : '날짜를 선택해주세요.'}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      />
      {openDatePanel && (
        <DateSelectorPanel
          selectedDate={startDate}
          focusedDate={startDate}
          onDateSelect={date => {
            setValue('duration.startDate', formatDateToYYYYMMDD(date));
          }}
          onFocusedDateChange={date => {
            setValue('duration.startDate', formatDateToYYYYMMDD(date));
          }}
          minDate={today}
        />
      )}
    </>
  );
};

const SelectEndDate = () => {
  const [openDatePanel, setOpenDatePanel] = useState(false);
  const { watch, setValue } = useFormContext<GoalFormType>();
  const today = new Date();
  const startDateValue = watch('duration.startDate');
  const startDate = startDateValue ? new Date(startDateValue) : new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const endDateValue = watch('duration.endDate');
  const endDate = endDateValue ? new Date(endDateValue) : today;

  return (
    <>
      <CellButton
        type="button"
        onClick={() => {
          setOpenDatePanel(openDatePanel => !openDatePanel);
        }}
        renderLeftSide={() => (
          <div className="flex items-center gap-2">
            <XCircleIcon />
            <span className="label-1-normal text-text-primary">종료일</span>
          </div>
        )}
        renderRightSide={() => (
          <div className="flex items-center gap-2 text-text-strong">
            <span className="label-1-normal">{endDateValue ? endDateValue : '날짜를 선택해주세요.'}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      />
      {openDatePanel && (
        <DateSelectorPanel
          selectedDate={endDate}
          focusedDate={endDate ? endDate : today}
          onDateSelect={date => {
            setValue('duration.endDate', formatDateToYYYYMMDD(date));
          }}
          onFocusedDateChange={date => {
            setValue('duration.endDate', formatDateToYYYYMMDD(date));
          }}
          minDate={startDate}
        />
      )}
    </>
  );
};

const DurationErrorMessage = () => {
  const {
    formState: { errors },
  } = useFormContext<GoalFormType>();

  if (!errors || !errors.duration) return null;

  return (
    <p className="caption-1-medium text-text-danger mt-2 flex items-center gap-x-2">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.00016 14.6668C4.31816 14.6668 1.3335 11.6822 1.3335 8.00016C1.3335 4.31816 4.31816 1.3335 8.00016 1.3335C11.6822 1.3335 14.6668 4.31816 14.6668 8.00016C14.6668 11.6822 11.6822 14.6668 8.00016 14.6668ZM8.00016 13.3335C9.41465 13.3335 10.7712 12.7716 11.7714 11.7714C12.7716 10.7712 13.3335 9.41465 13.3335 8.00016C13.3335 6.58567 12.7716 5.22912 11.7714 4.22893C10.7712 3.22873 9.41465 2.66683 8.00016 2.66683C6.58567 2.66683 5.22912 3.22873 4.22893 4.22893C3.22873 5.22912 2.66683 6.58567 2.66683 8.00016C2.66683 9.41465 3.22873 10.7712 4.22893 11.7714C5.22912 12.7716 6.58567 13.3335 8.00016 13.3335ZM8.00016 4.66683C8.17697 4.66683 8.34654 4.73707 8.47157 4.86209C8.59659 4.98712 8.66683 5.15669 8.66683 5.3335V8.66683C8.66683 8.84364 8.59659 9.01321 8.47157 9.13823C8.34654 9.26326 8.17697 9.3335 8.00016 9.3335C7.82335 9.3335 7.65378 9.26326 7.52876 9.13823C7.40373 9.01321 7.3335 8.84364 7.3335 8.66683V5.3335C7.3335 5.15669 7.40373 4.98712 7.52876 4.86209C7.65378 4.73707 7.82335 4.66683 8.00016 4.66683ZM8.00016 11.3335C7.82335 11.3335 7.65378 11.2633 7.52876 11.1382C7.40373 11.0132 7.3335 10.8436 7.3335 10.6668C7.3335 10.49 7.40373 10.3204 7.52876 10.1954C7.65378 10.0704 7.82335 10.0002 8.00016 10.0002C8.17697 10.0002 8.34654 10.0704 8.47157 10.1954C8.59659 10.3204 8.66683 10.49 8.66683 10.6668C8.66683 10.8436 8.59659 11.0132 8.47157 11.1382C8.34654 11.2633 8.17697 11.3335 8.00016 11.3335Z"
          fill="#FF6363"
        />
      </svg>
      {errors.duration.message}
    </p>
  );
};

export const CreateGoalFormElement = {
  Provider,
  FormContainer,
  Name,
  SelectStartDate,
  SelectEndDate,
  DurationErrorMessage,
};
