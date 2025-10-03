'use client';

import { useEffect, createContext, useContext, ReactNode } from 'react';
import { Goal, GoalCategoryEnum } from '@/shared/type/goal';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useFetchPostCreateGoal } from '@/feature/goal/confimGoal/hook';
import DatePicker from '@/shared/components/input/DatePicker';
import { TextArea } from '@/shared/components/input/TextArea';
import { InputField } from '@/shared/components/input/InputField';
import Button from '@/shared/components/input/Button';
import { Calendar, Info } from 'lucide-react';
import {
  formatDateToYYYYMMDD,
  getEndDateByWeeks,
  getTodayDate,
  parseDateFromYYYYMMDD,
} from '../createGoalFormElement/utils';
import { EditGoalFormData } from './type';
import { convertFormDataToGoal } from './helper';

interface EditGoalContextType {
  editGoalState: ReturnType<typeof useFetchPostCreateGoal>;
}

const EditGoalContext = createContext<EditGoalContextType | undefined>(undefined);

// EditGoal 상태를 사용하는 훅
export const useEditGoalState = () => {
  const context = useContext(EditGoalContext);
  if (context === undefined) {
    throw new Error('useEditGoalState must be used within an EditGoalFormProvider');
  }
  return context.editGoalState;
};

interface EditGoalFormProviderProps {
  children: React.ReactNode;
  initValue?: Goal;
}

interface EditGoalFormContainerProps {
  children: React.ReactNode;
  onSubmit?: (data: EditGoalFormData) => void;
}

const Provider = ({ children, initValue }: EditGoalFormProviderProps) => {
  const formData = convertFormDataToGoal(initValue);

  const methods = useForm<EditGoalFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: formData,
  });

  useEffect(() => {
    if (initValue) {
      const newFormData = convertFormDataToGoal(initValue);
      methods.reset(newFormData);
    }
  }, [initValue]);

  return (
    <FormProvider {...methods}>
      <EditGoalStateProvider>{children}</EditGoalStateProvider>
    </FormProvider>
  );
};

const EditGoalStateProvider = ({ children }: { children: ReactNode }) => {
  const editGoalState = useFetchPostCreateGoal();

  return <EditGoalContext.Provider value={{ editGoalState }}>{children}</EditGoalContext.Provider>;
};

const FormContainer = ({ children, onSubmit }: EditGoalFormContainerProps) => {
  const { handleSubmit } = useFormContext<EditGoalFormData>();

  return (
    <form className="flex flex-1 flex-col" onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}>
      {children}
    </form>
  );
};

const DurationDate = () => {
  const { control, watch, setValue } = useFormContext<EditGoalFormData>();
  const startDate = watch('duration.startDate');
  const weeks = watch('durationPeriod');

  useEffect(() => {
    if (startDate && weeks) {
      const startDateObj = parseDateFromYYYYMMDD(startDate);
      const endDateObj = getEndDateByWeeks(startDateObj, weeks);
      setValue('duration.endDate', formatDateToYYYYMMDD(endDateObj));
    }
  }, [startDate, weeks, setValue]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
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
    watch,
    register,
    formState: { errors },
  } = useFormContext<EditGoalFormData>();

  return (
    <InputField
      label="최종 목표"
      placeholder="목표 이름을 입력해주세요."
      isError={!!errors.name}
      errorMessage={errors.name?.message as string}
      value={watch('name')}
      {...register('name', { required: '목표 이름을 입력해주세요.' })}
    />
  );
};

const MainGoal = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EditGoalFormData>();

  return (
    <div className="mt-6">
      <TextArea
        label="목표 설정"
        placeholder="이루고 싶은 목표를 간단히 입력해주세요."
        className="w-full"
        isError={!!errors.toBe}
        errorMessage={errors.toBe?.message as string}
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
  } = useFormContext<EditGoalFormData>();
  return (
    <div className="grid grid-cols-1 gap-3">
      {[0, 1, 2, 3].map(idx => (
        <TextArea
          key={idx}
          label={`${idx + 1}주차`}
          placeholder={`ex) ${idx + 1}주차 목표를 입력하세요.`}
          isError={!!(errors.plans as any)?.[idx]?.content}
          errorMessage={(errors.plans as any)?.[idx]?.content?.message}
          maxLength={30}
          {...register(`plans.${idx}.content`)}
        />
      ))}
    </div>
  );
};

// 목표 분야 선택 컴포넌트
const CategorySelector = () => {
  const { watch } = useFormContext<EditGoalFormData>();
  const selectedCategory = watch('category');

  const categories = [
    { value: GoalCategoryEnum.STUDY, label: '스터디' },
    { value: GoalCategoryEnum.IT_PROJECT, label: 'IT 프로젝트' },
    { value: GoalCategoryEnum.FINANCE, label: '재테크' },
  ];

  return (
    <div className="flex flex-col gap-3">
      <label className="label-1-medium text-label-normal">목표 분야</label>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category.value}
            type="button"
            variant={selectedCategory === category.value ? 'primary' : 'secondary'}
            size="sm"
            disabled={selectedCategory !== category.value}
            className={`flex-1 ${
              selectedCategory === category.value
                ? 'bg-white text-[#171719] border-white'
                : 'bg-transparent text-[rgba(152,155,162,0.16)] border-[rgba(112,115,124,0.22)] cursor-not-allowed'
            }`}
            text={category.label}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-[#FF6363]" />
        <span className="label-2-regular text-[#FF6363]">목표 분야는 수정이 불가해요.</span>
      </div>
    </div>
  );
};

// 기간 선택 컴포넌트
const DurationSelector = () => {
  const { setValue, watch } = useFormContext<EditGoalFormData>();
  const selectedDuration = watch('durationPeriod');

  // TODO: 필드 활성화 상태 API 배포 시 삭제할 것
  const disabledButton = (weeks: number) => selectedDuration !== weeks;

  const durations = [4, 8, 12];

  return (
    <div className="flex flex-col gap-3">
      <label className="label-1-medium text-label-normal">기간 선택</label>
      <div className="flex flex-wrap gap-2">
        {durations.map(weeks => (
          <Button
            key={weeks}
            type="button"
            variant={selectedDuration === weeks ? 'primary' : 'secondary'}
            size="sm"
            text={`${weeks}주`}
            onClick={() => setValue('durationPeriod', weeks)}
            // TODO : 필드 활성화 상태 API 배포 시 삭제할 것
            className={`flex-1 ${
              selectedDuration === weeks
                ? 'bg-white text-[#171719] border-white'
                : 'bg-transparent text-[rgba(152,155,162,0.16)] border-[rgba(112,115,124,0.22)] cursor-not-allowed'
            }`}
            disabled={disabledButton(weeks)}
          />
        ))}
      </div>
    </div>
  );
};

const DateSelector = () => {
  const { watch, setValue } = useFormContext<EditGoalFormData>();
  const startDate = watch('duration.startDate');
  const weeks = watch('durationPeriod');
  // duration 객체에서 주차 계산

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="flex flex-col gap-2">
            <label className="label-1-medium text-label-normal">시작일</label>
            <DatePicker
              placeholder="시작일"
              selectedDate={startDate ? parseDateFromYYYYMMDD(startDate) : undefined}
              onDateSelect={date => {
                setValue('duration.startDate', formatDateToYYYYMMDD(date));
                const endDate = getEndDateByWeeks(date, weeks);
                setValue('duration.endDate', formatDateToYYYYMMDD(endDate));
              }}
              disabled={true} // TODO : 필드 활성화 상태 API 배포 시 삭제할 것
            />
          </div>
        </div>
      </div>

      {startDate && (
        <div className="w-full p-4 rounded-lg bg-[#0F0F10] text-white">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span className="body-1-medium text-[rgba(194,196,200,0.88)]">종료 예정일</span>
            <span className="body-1-medium text-[#3AEE49]">
              {(() => {
                const endDate = getEndDateByWeeks(parseDateFromYYYYMMDD(startDate), weeks);
                const dateStr = formatDateToYYYYMMDD(endDate);
                const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
                const dayOfWeek = dayNames[endDate.getDay()];
                return `${dateStr} (${dayOfWeek})`;
              })()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const EditGoalFormElement = {
  Provider,
  FormContainer,
  DurationDate,
  Name,
  MainGoal,
  WeekendGoal,
  CategorySelector,
  DurationSelector,
  DateSelector,
};
