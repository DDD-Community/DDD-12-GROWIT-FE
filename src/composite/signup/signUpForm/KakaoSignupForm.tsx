'use client';
import { useForm, Controller } from 'react-hook-form';
import { Select } from '@/shared/components/input/Select';
import { InputField } from '@/shared/components/input/InputField';
import { SignupDialogButton } from '@/feature/auth';
import { SelectJobResponsive } from '@/feature/auth/selectJobResponsive';
import { KakaoSignupFormData } from './type';
import { useFetchKakaoSignUp } from './hook';
import Checkbox from '@/shared/components/input/Checkbox';
import { CAREER_YEAR_OPTIONS, CAREER_YEAR_VALUES } from './data';

export const KakaoSignupForm = () => {
  const { isSubmitting, isSignupSuccess, fetchKakaoSignUp } = useFetchKakaoSignUp();
  const {
    watch,
    setValue,
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<KakaoSignupFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      jobRoleId: '',
      careerYear: '',
      privacyPolicy: false,
      termsOfService: false,
    },
  });
  const jobRoleId = watch('jobRoleId');

  return (
    <form className="space-y-6 w-full">
      <InputField
        label="이름"
        type="text"
        placeholder="성함을 입력해주세요."
        {...register('name', {
          required: '이름을 입력해주세요.',
          maxLength: {
            value: 6,
            message: '이름은 6자 이하이어야 합니다.',
          },
        })}
        isError={!!errors.name}
        errorMessage={errors.name?.message as string}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">직무</label>
        <SelectJobResponsive
          selectedJobId={jobRoleId}
          onJobSelect={jobId => setValue('jobRoleId', jobId, { shouldValidate: true })}
        />
        {errors.jobRoleId && <p className="text-xs text-red-500">{errors.jobRoleId.message as string}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">연차</label>
        <Select
          options={CAREER_YEAR_OPTIONS}
          selected={(() => {
            const value = watch('careerYear');
            const label = Object.entries(CAREER_YEAR_VALUES).find(([key, val]) => val === value)?.[0];
            return label || '선택';
          })()}
          onChange={value =>
            setValue('careerYear', value === '선택' ? '' : CAREER_YEAR_VALUES[value], { shouldValidate: true })
          }
          placeholder="연차를 선택해주세요"
          isError={!!errors.careerYear}
          {...(() => {
            const { onChange, ...rest } = register('careerYear', { required: '연차를 선택해주세요.' });
            return rest;
          })()}
        />
        {errors.careerYear && <p className="text-xs text-red-500">{errors.careerYear.message as string}</p>}
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <Controller
            name="privacyPolicy"
            control={control}
            rules={{ required: '개인정보 수집에 동의해주세요.' }}
            render={({ field }) => <Checkbox checked={field.value} onChange={field.onChange} />}
          />
          <span className="text-gray-400 text-sm">개인정보 수집 동의</span>
        </label>
        {errors.privacyPolicy && <p className="text-xs text-red-500">{errors.privacyPolicy.message as string}</p>}
        <label className="flex items-center space-x-2">
          <Controller
            name="termsOfService"
            control={control}
            rules={{ required: '이용 약관에 동의해주세요.' }}
            render={({ field }) => <Checkbox checked={field.value} onChange={field.onChange} />}
          />
          <span className="text-gray-400 text-sm">이용 약관 동의</span>
        </label>
        {errors.termsOfService && <p className="text-xs text-red-500">{errors.termsOfService.message as string}</p>}
      </div>
      <SignupDialogButton
        isValid={isValid}
        isSubmitting={isSubmitting}
        isSignupSuccess={isSignupSuccess}
        onClick={handleSubmit(fetchKakaoSignUp)}
      />
    </form>
  );
};
