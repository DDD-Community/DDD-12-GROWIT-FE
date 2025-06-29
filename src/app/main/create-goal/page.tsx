'use client';
import { useState, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputField } from '@/shared/components/input/InputField';
import { Sidebar } from '@/app/main/components/Sidebar';
import { ConfirmGoalBottomBar } from '@/app/main/components/ConfirmGoalBottomBar';
import FlexBox from '@/shared/components/layout/FlexBox';
import DatePicker from '@/shared/components/input/DatePicker';
import { TextArea } from '@/shared/components/input/TextArea';
import Image from 'next/image';
import { useFetchPostCreateGoal } from '@/app/main/useFetchPostCreateGoal';

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
    <div className="flex w-screen max-h-screen">
      <Sidebar />
      <main className="flex flex-1 h-screen flex-col pt-[12px]">
        <div className="px-[40px] py-[20px]">
          <h1 className="text-white text-2xl font-bold">목표 생성하기</h1>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto px-[20px]">
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
                          <Badge text={'4주'} />
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
    </div>
  );
}

// 임시 SectionMessage 컴포넌트
const SectionMessage = ({
  children,
  type = 'warning',
}: {
  children: React.ReactNode;
  type?: 'warning' | 'info' | 'success' | 'error';
}) => {
  // 타입별 색상 및 아이콘
  const config = {
    warning: {
      bg: 'bg-[#373226]',
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2C5.03 2 1 6.03 1 11C1 15.97 5.03 20 10 20C14.97 20 19 15.97 19 11C19 6.03 14.97 2 10 2ZM10 18C6.13 18 3 14.87 3 11C3 7.13 6.13 4 10 4C13.87 4 17 7.13 17 11C17 14.87 13.87 18 10 18ZM11 7H9V13H11V7ZM11 15H9V17H11V15Z"
            fill="#FFA938"
          />
        </svg>
      ),
    },
    // 다른 타입도 필요하면 추가
  };

  const { bg, icon } = config[type as 'warning']; // 임시로 타입 강제주입

  return (
    <div className={`flex items-center rounded-r-[12px] rounded-l-[12px] px-4 py-2 ${bg}`}>
      <span className="mr-2 flex-shrink-0">{icon}</span>
      <span className="text-white text-sm">{children}</span>
    </div>
  );
};

// 임시 Badge 컴포넌트
const Badge = ({ text }: { text: string }) => (
  <span
    style={{ backgroundColor: '#7D5EF7' }}
    className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mr-2"
  >
    {text}
  </span>
);
