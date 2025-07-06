'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { GoalFormData } from '@/shared/type/form';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import FlexBox from '@/shared/components/layout/FlexBox';
import DatePicker from '@/shared/components/input/DatePicker';
import { TextArea } from '@/shared/components/input/TextArea';
import { InputField } from '@/shared/components/input/InputField';
import { formatDateToYYYYMMDD, getEndDate, getNextMonday, parseDateFromYYYYMMDD } from './utils';

interface CreateGoalFormProviderProps {
  children: React.ReactNode;
}

interface CreateGoalFormContainerProps {
  children: React.ReactNode;
}

const defaultValues: GoalFormData = {
  name: '',
  duration: { startDate: '', endDate: '' },
  beforeAfter: { asIs: '', toBe: '' },
  plans: [
    { content: '', weekOfMonth: 1 },
    { content: '', weekOfMonth: 2 },
    { content: '', weekOfMonth: 3 },
    { content: '', weekOfMonth: 4 },
  ],
};

const Provider = ({ children }: CreateGoalFormProviderProps) => {
  const methods = useForm<GoalFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const FormContainer = ({ children }: CreateGoalFormContainerProps) => {
  return <form>{children}</form>;
};

const DurationDate = () => {
  const { control, watch, setValue } = useFormContext<GoalFormData>();
  const startDate = watch('duration.startDate');

  // 시작날짜가 변경될 때 종료날짜 자동 설정
  useEffect(() => {
    if (startDate) {
      const startDateObj = parseDateFromYYYYMMDD(startDate);
      const endDateObj = getEndDate(startDateObj);
      setValue('duration.endDate', formatDateToYYYYMMDD(endDateObj));
    }
  }, [startDate, setValue]);

  return (
    <FlexBox className="gap-2">
      <Controller
        control={control}
        name="duration.startDate"
        rules={{
          required: '시작일을 선택해주세요.',
          validate: value => {
            if (!value) return '시작일을 선택해주세요.';
            return true;
          },
        }}
        render={({ field }) => (
          <DatePicker
            placeholder="시작일"
            selectedDate={field.value ? parseDateFromYYYYMMDD(field.value) : undefined}
            onDateSelect={date => {
              field.onChange(formatDateToYYYYMMDD(date));
            }}
            allowedDaysOfWeek={[1]} // 월요일만 선택 가능 (1: 월요일)
            minDate={getNextMonday()} // 오늘 이후의 다음 월요일부터 선택 가능
          />
        )}
      />
      <span className="text-white">-</span>
      <Controller
        control={control}
        name="duration.endDate"
        rules={{
          required: '종료일이 필요합니다.',
          validate: value => {
            if (!value) return '종료일이 필요합니다.';
            return true;
          },
        }}
        render={({ field }) => (
          <DatePicker
            selectedDate={field.value ? parseDateFromYYYYMMDD(field.value) : undefined}
            placeholder="종료일"
            disabled={true}
          />
        )}
      />
    </FlexBox>
  );
};

const Name = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<GoalFormData>();
  return (
    <InputField
      label=""
      type="text"
      placeholder="목표 이름을 입력해주세요."
      isError={!!errors.name}
      errorMessage={errors.name?.message as string}
      {...register('name', { required: '목표 이름을 입력해주세요.' })}
    />
  );
};

const MainGoal = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<GoalFormData>();
  return (
    <FlexBox className="mt-6 gap-4">
      <TextArea
        label="목표 설정 (AS IS)"
        placeholder="현재 상태를 간단히 입력해주세요."
        isError={!!errors.beforeAfter?.asIs}
        errorMessage={errors.beforeAfter?.asIs?.message}
        {...register('beforeAfter.asIs', { required: '현재 상태를 입력해주세요.' })}
        maxLength={30}
      />
      <Image src="/icon/arrow-right.svg" alt="Dashboard Preview" width={24} height={24} />
      <TextArea
        label="목표 설정 (TO BE)"
        placeholder="4주 후 이루고 싶은 목표를 간단히 입력해주세요."
        isError={!!errors.beforeAfter?.toBe}
        errorMessage={errors.beforeAfter?.toBe?.message}
        {...register('beforeAfter.toBe', { required: '4주 후 목표를 입력해주세요.' })}
        maxLength={30}
      />
    </FlexBox>
  );
};

const WeekendGoal = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<GoalFormData>();
  return (
    <div className="grid grid-cols-1 gap-3">
      {[0, 1, 2, 3].map(idx => (
        <TextArea
          key={idx}
          label={`${idx + 1}주차`}
          placeholder={`ex) ${idx + 1}주차 목표를 입력하세요.`}
          isError={!!errors.plans?.[idx]?.content}
          errorMessage={errors.plans?.[idx]?.content?.message}
          maxLength={30}
          {...register(`plans.${idx}.content`, { required: '주간 목표를 입력해주세요.' })}
        />
      ))}
    </div>
  );
};

export const CreateGoalFormElement = {
  Provider,
  FormContainer,
  DurationDate,
  Name,
  MainGoal,
  WeekendGoal,
};
