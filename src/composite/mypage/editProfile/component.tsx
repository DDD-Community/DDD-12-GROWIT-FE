'use client';

import { PageHeader } from '@/shared/components/layout/PageHeader';
import { StackBackButton } from '@/shared/components/feedBack/StackNavButton';
import { InputField } from '@/shared/components/input/InputField';
import { Controller } from 'react-hook-form';
import Button from '@/shared/components/input/Button';
import { Z_INDEX } from '@/shared/lib/z-index';
import { BottomSheet, useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { Icon } from '@/shared/components/foundation/Icons';
import { useCallback, useState } from 'react';
import { EarthlyBranchHour, type EarthlyBranchHourType } from '@/shared/type/user';
import { useEditProfile } from './hooks';
import Select from '@/shared/components/input/Select';

export const EditProfile = () => {
  return (
    <>
      <PageHeader title="프로필 수정" leftSection={<StackBackButton />} />
      <EditProfileForm />
    </>
  );
};

const genderOptions = ['남성', '여성'];

function EditProfileForm() {
  const { formMethods, editProfile, isPending } = useEditProfile();
  const { register, handleSubmit, formState, setValue, watch, control } = formMethods;

  const { isOpen, showSheet, closeSheet } = useBottomSheet();

  const onSelectGender = (gender: string) => {
    if (!gender) return;
    setValue('saju.gender', gender === '남성' ? 'MALE' : 'FEMALE', { shouldDirty: true });
  };

  const onChangeBirthDate = useCallback((e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용

    if (value.length > 4) value = value.slice(0, 4) + '-' + value.slice(4); // 년도 뒤에 하이픈 추가
    if (value.length > 7) value = value.slice(0, 7) + '-' + value.slice(7); // 월 뒤에 하이픈 추가
    if (value.length > 10) value = value.slice(0, 10); // 최대 길이 제한

    onChange(value);
  }, []);

  const selectBirthTime = useCallback((key: EarthlyBranchHourType) => {
    setValue('saju.birthHour', key, { shouldDirty: true });
    closeSheet();
  }, []);

  const selectedGender = watch('saju.gender') === 'MALE' ? '남성' : '여성';
  const selectedBirthTime = EarthlyBranchHour[watch('saju.birthHour') as EarthlyBranchHourType]?.time || '';

  return (
    <form
      onSubmit={handleSubmit(data => editProfile(data))}
      className="h-full overflow-y-auto px-5 pt-5 space-y-2 shrink-0"
    >
      <section className="flex flex-col gap-y-6">
        <InputField label="이메일" {...register('email')} placeholder="이메일을 입력해주세요" />
        <InputField label="비밀번호" type="password" {...register('password')} placeholder="비밀번호를 입력해주세요" />
        <InputField label="성" {...register('lastName')} placeholder="성을 입력해주세요" />
        <InputField label="이름" {...register('name')} placeholder="이름을 입력해주세요" />

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
            />
          )}
        />

        <Controller
          name="saju.gender"
          control={control}
          render={({ field }) => (
            <Select
              label="성별"
              {...field}
              options={genderOptions}
              selected={selectedGender}
              onChange={onSelectGender}
              placeholder="성별을 선택해주세요"
            />
          )}
        />

        <InputField
          label="태어난 시각"
          {...register('saju.birthHour')}
          placeholder="태어난 시각을 선택해주세요"
          value={selectedBirthTime}
          onClick={showSheet}
        />
      </section>
      <p className="label-1-regular text-label-neutral">운세 조언을 받으려면 생년월일시 정보가 필요해요</p>

      <footer
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full p-5 max-w-md mx-auto bg-normal-alternative ${Z_INDEX.SHEET}`}
      >
        <Button
          type="submit"
          text="저장하기"
          size="lg"
          disabled={isPending || !formState.isDirty || !formState.isReady || formState.isSubmitting}
        />
      </footer>

      {/* 태어난 시각 선택을 위한 Bottom Sheet */}
      <SelectBirthTimeSheet isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet} onSelect={selectBirthTime} />
    </form>
  );
}

type SelectBirthTimeSheetProps = {
  isOpen: boolean;
  showSheet: () => void;
  closeSheet: () => void;
  onSelect: (key: EarthlyBranchHourType) => void;
};
const SelectBirthTimeSheet = ({ isOpen, showSheet, closeSheet, onSelect }: SelectBirthTimeSheetProps) => {
  const [selectedKey, setSelectedKey] = useState<EarthlyBranchHourType | null>(null);

  return (
    <BottomSheet isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet}>
      <BottomSheet.Title>
        <div className="w-full justify-start items-center p-5">
          <button type="button" onClick={closeSheet} className="text-text-strong">
            <Icon name="chevronLeft" />
          </button>
        </div>
      </BottomSheet.Title>
      <BottomSheet.Content className="overflow-y-auto h-[50vh] pb-10">
        <ul className="w-full flex flex-col gap-y-2 items-center">
          {Object.entries(EarthlyBranchHour).map(([key, { label, time }]) => (
            <li
              key={key}
              className="w-full flex items-center justify-between py-2 px-3.5 cursor-pointer"
              onClick={() => {
                setSelectedKey(key as EarthlyBranchHourType);
                onSelect(key as EarthlyBranchHourType);
              }}
            >
              <div className="flex items-center gap-x-2">
                <label htmlFor={key} className="body-1-bold text-text-strong">
                  {label}
                </label>
                <p className="body-1-normal text-text-primary">{time}</p>
              </div>

              {selectedKey === key ? <Icon name="checked" /> : <Icon name="unchecked" />}
            </li>
          ))}
        </ul>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
