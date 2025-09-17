'use client';

import { useEffect } from 'react';
import { GoalFormData } from '@/shared/type/form';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import DatePicker from '@/shared/components/input/DatePicker';
import { TextArea } from '@/shared/components/input/TextArea';
import { InputField } from '@/shared/components/input/InputField';
import {
  formatDateToYYYYMMDD,
  getEndDate,
  getEndDateByWeeks,
  getNextMonday,
  getTodayDate,
  parseDateFromYYYYMMDD,
} from './utils';

interface CreateGoalFormProviderProps {
  children: React.ReactNode;
}

interface CreateGoalFormContainerProps {
  children: React.ReactNode;
}

interface CreateGoalFormDurationProps {
  weeks: number;
}

const defaultValues: GoalFormData = {
  category: '',
  name: '',
  duration: 4, // 기본 4주 선택
  durationDate: { startDate: '', endDate: '' },
  toBe: '목표 달성', // 기본값 설정
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
  return <form className="flex flex-1 flex-col">{children}</form>;
};

const DurationDate = ({ weeks }: CreateGoalFormDurationProps) => {
  const { control, watch, setValue } = useFormContext<GoalFormData>();
  const startDate = watch('durationDate.startDate');

  useEffect(() => {
    if (startDate && weeks) {
      const startDateObj = parseDateFromYYYYMMDD(startDate);
      const endDateObj = getEndDateByWeeks(startDateObj, weeks);
      setValue('durationDate.endDate', formatDateToYYYYMMDD(endDateObj));
    }
  }, [startDate, weeks, setValue]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <Controller
          control={control}
          name="durationDate.startDate"
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
              minDate={getTodayDate()} // 오늘 이후의 다음 월요일부터 선택 가능
            />
          )}
        />
      </div>

      <div className="w-full">
        <div className="w-full h-full flex items-center gap-2 p-[20px] rounded-lg bg-[#0F0F10] text-white body-1-normal ">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.66667 1.66666V4.16666M13.3333 1.66666V4.16666M2.5 6.66666H17.5M4.16667 3.33333C3.24619 3.33333 2.5 4.07952 2.5 5V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V5C17.5 4.07952 16.7538 3.33333 15.8333 3.33333H4.16667Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="flex-1 text-left body-2-regular">
            {startDate ? (
              <span>
                종료 예정일{' '}
                <span className="text-[#3AEE49]">
                  {(() => {
                    const endDate = getEndDateByWeeks(parseDateFromYYYYMMDD(startDate), weeks);
                    const dateStr = formatDateToYYYYMMDD(endDate);
                    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
                    const dayOfWeek = dayNames[endDate.getDay()];
                    return `${dateStr} (${dayOfWeek})`;
                  })()}
                </span>
              </span>
            ) : (
              '종료 예정일'
            )}
          </span>
        </div>
      </div>
    </div>
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
    <div className="mt-6">
      <TextArea
        label="목표 설정"
        placeholder="이루고 싶은 목표를 간단히 입력해주세요."
        className="w-full"
        isError={!!errors.toBe}
        errorMessage={errors.toBe?.message}
        {...register('toBe', { required: '목표를 입력해주세요.' })}
        maxLength={30}
      />
    </div>
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
          {...register(`plans.${idx}.content`)}
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
