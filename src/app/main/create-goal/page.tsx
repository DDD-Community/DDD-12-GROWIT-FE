'use client';
import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '@/shared/components/input/InputField';
import { Sidebar } from '@/app/main/components/Sidebar';
import { ConfirmGoalBottomBar } from '@/app/main/components/ConfirmGoalBottomBar';
import FlexBox from '@/shared/components/layout/FlexBox';
import DatePicker from '@/shared/components/input/DatePicker';
import { TextAreaWithCount } from '@/shared/components/input/TextArea';
import Image from 'next/image';

interface GoalFormData {
  name: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  beforeAfter: {
    asIs: string;
    toBe: string;
  };
  plans: string[];
}

const defaultValues: GoalFormData = {
  name: '',
  duration: { startDate: '', endDate: '' },
  beforeAfter: { asIs: '', toBe: '' },
  plans: ['', '', '', ''],
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

export default function CreateGoalPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<GoalFormData>({
    mode: 'onChange',
    defaultValues,
  });
  const [completed, setCompleted] = useState(false);

  // 프로그레스 계산
  const percent = useMemo(() => {
    let filled = 0;
    if (watch('duration.startDate') && watch('duration.endDate')) filled++;
    if (watch('name')) filled++;
    if (watch('beforeAfter.asIs')) filled++;
    if (watch('beforeAfter.toBe')) filled++;
    watch('plans').forEach((p: string) => {
      if (p) filled++;
    });
    return Math.round((filled / 8) * 100);
  }, [watch()]);

  const onSubmit = (data: GoalFormData) => {
    setCompleted(true);
    // TODO: API 연동
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
                        <DatePicker {...register('duration.startDate', { required: true })} />
                        <span className="text-white">-</span>
                        <DatePicker {...register('duration.endDate', { required: true })} />
                      </FlexBox>
                      <p className="caption-1-regular text-neutral-400">* 월요일 고정</p>
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
                      <TextAreaWithCount
                        label="목표 설정 (AS IS)"
                        placeholder="현재 상태를 간단히 입력해주세요."
                        isError={!!errors.beforeAfter?.asIs}
                        errorMessage={errors.beforeAfter?.asIs?.message}
                        {...register('beforeAfter.asIs', { required: '현재 상태를 입력해주세요.' })}
                        maxLength={30}
                      />
                      <Image src="/icon/arrow-right.svg" alt="Dashboard Preview" width={24} height={24} />
                      <TextAreaWithCount
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
                        <TextAreaWithCount
                          key={idx}
                          label={`${idx + 1}주차`}
                          placeholder={`ex) ${idx + 1}주차 목표를 입력하세요.`}
                          isError={!!errors.plans?.[idx]}
                          errorMessage={errors.plans?.[idx]?.message}
                          maxLength={30}
                          {...register(`plans.${idx}`, { required: '주간 목표를 입력해주세요.' })}
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
