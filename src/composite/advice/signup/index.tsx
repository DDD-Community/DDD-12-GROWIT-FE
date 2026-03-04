'use client';

import { InputField } from '@/shared/components/input/InputField';
import { useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { SelectBirthTimeSheet } from '@/composite/mypage/editProfile/component';
import Button from '@/shared/components/input/Button';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { EarthlyBranchHour, EarthlyBranchHourType } from '@/shared/type/user';
import { useSajuSignup } from './hooks';

export const AdviceSignupForm = () => {
  const { isOpen, showSheet, closeSheet } = useBottomSheet();

  const { formMethods, submitSaju, isPending, onChangeBirthDate } = useSajuSignup();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = formMethods;

  const selectBirthTime = useCallback(
    (key: EarthlyBranchHourType) => {
      setValue('saju.birthHour', key, { shouldDirty: true });
      closeSheet();
    },
    [closeSheet, setValue]
  );

  const birthHourKey = watch('saju.birthHour');
  const selectedBirthTime =
    birthHourKey in EarthlyBranchHour ? EarthlyBranchHour[birthHourKey as EarthlyBranchHourType].time : '';

  return (
    <form className="flex flex-col flex-1" onSubmit={handleSubmit(data => submitSaju(data))}>
      <section className="flex-1 flex flex-col gap-y-8 pb-8">
        <Controller
          name="saju.birth"
          control={control}
          render={({ field }) => (
            <InputField
              label="생년월일"
              {...field}
              value={field.value || ''}
              onChange={e => onChangeBirthDate(e, field.onChange)}
              type="text"
              placeholder="생년월일을 입력해주세요"
              pattern="\d{4}-\d{2}-\d{2}"
              errorMessage={errors.saju?.birth?.message}
            />
          )}
        />

        <div className="px-0.5">
          <span className="label-1-medium text-text-primary mb-2 block">성별</span>
          <div className="flex gap-3">
            <GenderInput label="여자" value="FEMALE" {...register('saju.gender')} />
            <GenderInput label="남자" value="MALE" {...register('saju.gender')} />
          </div>
          {errors.saju?.gender && <p className="text-xs text-red-500 mt-1">{errors.saju.gender.message}</p>}
        </div>

        <InputField
          label="태어난 시각"
          placeholder="태어난 시각을 선택해주세요"
          onClick={showSheet}
          value={selectedBirthTime}
          readOnly
          errorMessage={errors.saju?.birthHour?.message}
        />
        <SelectBirthTimeSheet
          isOpen={isOpen}
          showSheet={showSheet}
          closeSheet={closeSheet}
          onSelect={selectBirthTime}
        />
      </section>
      <footer className="sticky bottom-2 left-0 bg-[#1C1C1E]">
        <Button type="submit" text="조언 시작하기" size="lg" disabled={isPending} />
      </footer>
    </form>
  );
};

type GenderInputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const GenderInput = ({ label, ...props }: GenderInputProps) => {
  return (
    <label className="w-full cursor-pointer">
      <input type="radio" className="sr-only peer" {...props} />
      <div className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-[#2C2C2E] border border-label-assistive peer-checked:outline-2 peer-checked:outline-primary-normal text-text-strong">
        <span>{label}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
  );
};
