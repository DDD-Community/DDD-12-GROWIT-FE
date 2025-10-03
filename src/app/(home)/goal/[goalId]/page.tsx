'use client';

import { useParams, useRouter } from 'next/navigation';
import { CreateGoalFormElement } from '@/feature/goal/createGoalFormElement/component';
import { GoalFormData } from '@/shared/type/form';
import { GoalCategoryEnum } from '@/shared/type/goal';
import Button from '@/shared/components/input/Button';
import { InputField } from '@/shared/components/input/InputField';
import DatePicker from '@/shared/components/input/DatePicker';
import Header from '@/shared/components/layout/Header';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { useForm, useFormContext } from 'react-hook-form';
import {
  formatDateToYYYYMMDD,
  parseDateFromYYYYMMDD,
  getEndDateByWeeks,
} from '@/feature/goal/createGoalFormElement/utils';
import { Calendar, Info } from 'lucide-react';

// 목표 분야 선택 컴포넌트
const CategorySelector = () => {
  const { watch } = useFormContext<GoalFormData>();
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
  const { setValue, watch } = useFormContext<GoalFormData>();
  const selectedDuration = watch('duration');

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
            className={`flex-1 ${
              selectedDuration === weeks
                ? 'bg-white text-[#171719] border-white'
                : 'bg-transparent text-label-normal border-[rgba(112,115,124,0.32)]'
            }`}
            text={`${weeks}주`}
            onClick={() => setValue('duration', weeks)}
          />
        ))}
      </div>
    </div>
  );
};

const DateSelector = () => {
  const { watch, setValue } = useFormContext<GoalFormData>();
  const duration = watch('duration');
  const startDate = watch('durationDate.startDate');

  console.log('selectedCategory>>>', watch());

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
                setValue('durationDate.startDate', formatDateToYYYYMMDD(date));
                if (duration) {
                  const endDate = getEndDateByWeeks(date, duration);
                  setValue('durationDate.endDate', formatDateToYYYYMMDD(endDate));
                }
              }}
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
                const endDate = getEndDateByWeeks(parseDateFromYYYYMMDD(startDate), duration);
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

const GoalEditForm = () => {
  const {
    watch,
    register,
    formState: { errors },
  } = useForm<GoalFormData>();

  const router = useRouter();
  const formValues = watch();
  const isFormValid = formValues.name && formValues.name.trim().length > 0;

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('수정된 목표 데이터:', formValues);
      // TODO: 실제 API 호출로 목표 수정
      router.back();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        {/* 최종 목표 입력 */}
        <div className="flex flex-col gap-2">
          <InputField
            label="최종 목표"
            type="text"
            placeholder="그로잇 서비스 출시"
            isError={!!errors.name}
            errorMessage={errors.name?.message as string}
            {...register('name', { required: '목표 이름을 입력해주세요.' })}
            maxLength={20}
          />
        </div>

        {/* 목표 분야 선택 */}
        <CategorySelector />

        {/* 기간 선택 */}
        <DurationSelector />

        {/* 날짜 선택 */}
        <DateSelector />
      </div>

      <FunnelNextButton text="수정 완료" disabled={!isFormValid} onClick={handleSubmit} />
    </div>
  );
};

export default function GoalEditPage() {
  const params = useParams();
  const router = useRouter();
  const goalId = params.goalId as string;

  // TODO: 실제 goal 데이터를 가져와서 폼에 미리 채우기
  const mockGoalData: GoalFormData = {
    category: GoalCategoryEnum.STUDY,
    name: '그로잇 서비스 출시',
    duration: 4,
    durationDate: {
      startDate: '2025-01-01',
      endDate: '2025-01-28',
    },
    toBe: '목표 달성',
    plans: [
      { content: '', weekOfMonth: 1 },
      { content: '', weekOfMonth: 2 },
      { content: '', weekOfMonth: 3 },
      { content: '', weekOfMonth: 4 },
    ],
  };

  const handleSubmit = (data: GoalFormData) => {
    console.log('수정된 목표 데이터:', data);
    // TODO: 실제 API 호출로 목표 수정
    router.back();
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-[#1B1C1E]">
      {/* Header */}
      <Header mode="title" title="목표 설정" />

      {/* Content */}
      <div className="flex flex-1 px-6 py-5 pt-20">
        <CreateGoalFormElement.Provider initValue={mockGoalData}>
          <CreateGoalFormElement.FormContainer>
            <GoalEditForm />
          </CreateGoalFormElement.FormContainer>
        </CreateGoalFormElement.Provider>
      </div>
    </div>
  );
}
