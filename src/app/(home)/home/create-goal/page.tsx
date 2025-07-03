'use client';
import { useState, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputField } from '@/shared/components/input/InputField';
import { ConfirmGoalBottomBar } from '@/feature/goal/components/ConfirmGoalBottomBar';
import FlexBox from '@/shared/components/layout/FlexBox';
import DatePicker from '@/shared/components/input/DatePicker';
import { TextArea } from '@/shared/components/input/TextArea';
import Image from 'next/image';
import { useFetchPostCreateGoal } from '@/feature/goal/hooks/useFetchPostCreateGoal';
import SectionMessage from '@/shared/components/display/SectionMessage';
import Badge from '@/shared/components/display/Badge';

export interface GoalFormData {
  name: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  beforeAfter: {
    asIs: string;
    toBe: string;
  };
  plans: { content: string }[];
}

const defaultValues: GoalFormData = {
  name: '',
  duration: { startDate: '', endDate: '' },
  beforeAfter: { asIs: '', toBe: '' },
  plans: [{ content: '' }, { content: '' }, { content: '' }, { content: '' }],
};

// 날짜를 YYYY-MM-DD 형식으로 변환하는 함수 (시간대 문제 해결)
const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// YYYY-MM-DD 문자열을 Date 객체로 안전하게 변환하는 함수
const parseDateFromYYYYMMDD = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // month는 0-based이므로 -1
};

// 다음 월요일을 찾는 함수
const getNextMonday = (fromDate: Date = new Date()): Date => {
  const nextMonday = new Date(fromDate);
  const currentDay = nextMonday.getDay();
  const daysUntilMonday = currentDay === 0 ? 1 : 8 - currentDay; // 일요일이면 다음날, 아니면 다음주 월요일
  nextMonday.setDate(nextMonday.getDate() + daysUntilMonday);
  return nextMonday;
};

// 4주 후 날짜를 계산하는 함수
const getEndDate = (startDate: Date): Date => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 27); // 4주 = 28일이므로 27일을 더함
  return endDate;
};

export default function CreateGoalPage() {
  const {
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<GoalFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });
  const { isLoading, isError, createGoal } = useFetchPostCreateGoal();
  const [completed, setCompleted] = useState(false);

  const startDate = watch('duration.startDate');

  // 시작날짜가 변경될 때 종료날짜 자동 설정
  useEffect(() => {
    if (startDate) {
      const startDateObj = parseDateFromYYYYMMDD(startDate);
      const endDateObj = getEndDate(startDateObj);
      setValue('duration.endDate', formatDateToYYYYMMDD(endDateObj));
    }
  }, [startDate, setValue]);

  const percent = useMemo(() => {
    let filled = 0;
    const formValues = watch();

    if (formValues.duration.startDate && formValues.duration.endDate) filled++;
    if (formValues.name) filled++;
    if (formValues.beforeAfter.asIs) filled++;
    if (formValues.beforeAfter.toBe) filled++;
    formValues.plans.forEach((p: { content: string }) => {
      if (p?.content) filled++;
    });
    return Math.round((filled / 8) * 100);
  }, [watch()]);

  const onSubmit = (data: GoalFormData) => {
    setCompleted(true);
    console.log(data);
    createGoal(data);
  };

  return (
    <main className="flex flex-1 flex-col pt-[12px]">
      {/* 데스크탑 제목 표시 */}
      <div className="max-sm:hidden px-[40px] py-[20px]">
        <h1 className="text-white text-2xl font-bold">목표 생성하기</h1>
      </div>
      <div className="flex flex-1 flex-col sm:px-[20px] overflow-y-auto">
        {/* 모바일 제목 표시 */}
        <div className="sm:hidden px-[20px] pt-[16px] pb-[28px] ">
          <h1 className="text-white text-2xl font-bold">목표 생성하기</h1>
        </div>
        <div className="flex flex-col p-[20px]">
          <div className="max-w-[868px] w-full mx-auto">
            <div className="max-w-[646px] w-full mx-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* 기간 및 목표설정 영역 */}
                <div className="mb-[64px]">
                  <div className="mb-[24px]">
                    <SectionMessage>모든 입력 정보는 목표 생성 후 수정이 불가합니다.</SectionMessage>
                  </div>
                  <div className="flex flex-col gap-[8px] mb-[20px]">
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex items-center space-x-[8px] mb-[8px]">
                        <p className="heading-2-bold text-white">기간</p>
                        <Badge label={'4주'} size={'sm'} type={'default'} />
                      </div>
                    </div>
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
                    <p className="caption-1-regular text-neutral-400">* 월요일 고정, 시작일 기준 4주 후 자동 설정</p>
                  </div>
                  <div className="mb-[20px]">
                    <div className="flex items-center space-x-[8px] mb-[12px]">
                      <p className="heading-2-bold text-white">목표이름</p>
                    </div>
                    <InputField
                      label=""
                      type="text"
                      placeholder="목표 이름을 입력해주세요."
                      isError={!!errors.name}
                      errorMessage={errors.name?.message as string}
                      {...register('name', { required: '목표 이름을 입력해주세요.' })}
                    />
                  </div>
                </div>

                {/* 목표 설정 영역 */}
                <div className="mb-[64px]">
                  <div className="flex flex-col gap-[8px] mb-[24px]">
                    <p className="heading-2-bold text-white">목표설정</p>
                    <p className="label-1-regular text-neutral-400">
                      현재 나의 상태와 4주 뒤의 나를 생각하며 작성해주세요.
                    </p>
                  </div>
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
                </div>

                {/* 주간목표 설정 영역 */}
                <div className="mt-8">
                  <div className="flex flex-col gap-[8px] mb-[24px]">
                    <p className="heading-2-bold text-white">주간목표</p>
                    <p className="label-1-regular text-neutral-400">주마다 실행할 목표를 30자 이내로 적어주세요.</p>
                  </div>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ConfirmGoalBottomBar
        percentage={percent}
        onComplete={handleSubmit(onSubmit)}
        isComplete={isValid && percent === 100 && !completed}
        isLoading={isLoading}
        isError={isError}
      />
    </main>
  );
}
