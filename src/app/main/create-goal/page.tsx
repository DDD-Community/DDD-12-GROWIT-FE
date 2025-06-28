'use client';
import { useForm, Controller } from 'react-hook-form';
import { InputField } from '@/shared/components/InputField';
import Button from '@/shared/components/Button';
import ProgressBar from '@/shared/components/ProgressBar';
import FlexBox from '@/shared/components/FlexBox';
import { useState, useMemo } from 'react';
import { Sidebar } from '@/app/main/components/Sidebar';

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
      <main className="flex flex-1 h-screen flex-col">
        <div className="flex flex-1 flex-col overflow-y-auto">
          <h1 className="text-white text-2xl font-bold mb-6">목표 생성하기</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-8 py-12">
            <div className="max-w-2xl w-full mx-auto">
              <div className="bg-[#232325] rounded-lg p-6 mb-8">
                <div className="mb-6">
                  <label className="text-label-alternative block mb-2">기간</label>
                  <FlexBox className="gap-2">
                    <input
                      type="date"
                      className="bg-[#2C2C2E] text-white rounded-lg px-4 py-2"
                      {...register('duration.startDate', { required: true })}
                    />
                    <span className="text-white">-</span>
                    <input
                      type="date"
                      className="bg-[#2C2C2E] text-white rounded-lg px-4 py-2"
                      {...register('duration.endDate', { required: true })}
                    />
                  </FlexBox>
                </div>
                <InputField
                  label="목표 이름"
                  type="text"
                  placeholder="목표 이름을 입력해주세요."
                  isError={!!errors.name}
                  errorMessage={errors.name?.message as string}
                  {...register('name', { required: '목표 이름을 입력해주세요.' })}
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <InputField
                    label="목표 설정 (AS IS)"
                    type="text"
                    placeholder="현재 상태를 간단히 입력해주세요."
                    isError={!!errors.beforeAfter?.asIs}
                    errorMessage={errors.beforeAfter?.asIs?.message}
                    {...register('beforeAfter.asIs', { required: '현재 상태를 입력해주세요.' })}
                    maxLength={30}
                  />
                  <InputField
                    label="목표 설정 (TO BE)"
                    type="text"
                    placeholder="4주 후 이루고 싶은 목표를 간단히 입력해주세요."
                    isError={!!errors.beforeAfter?.toBe}
                    errorMessage={errors.beforeAfter?.toBe?.message}
                    {...register('beforeAfter.toBe', { required: '4주 후 목표를 입력해주세요.' })}
                    maxLength={30}
                  />
                </div>
                <div className="mt-8">
                  <label className="text-label-alternative block mb-2">주간 목표</label>
                  <div className="grid grid-cols-1 gap-3">
                    {[0, 1, 2, 3].map(idx => (
                      <InputField
                        key={idx}
                        label={`${idx + 1}주차`}
                        type="text"
                        placeholder={`ex) ${idx + 1}주차 목표를 입력하세요.`}
                        isError={!!errors.plans?.[idx]}
                        errorMessage={errors.plans?.[idx]?.message}
                        maxLength={30}
                        {...register(`plans.${idx}`, { required: '주간 목표를 입력해주세요.' })}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <ProgressBar
          percent={percent}
          onComplete={handleSubmit(onSubmit)}
          isComplete={isValid && percent === 100 && !completed}
        />
      </main>
    </div>
  );
}
