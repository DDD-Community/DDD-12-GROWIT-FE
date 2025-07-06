'use client';
import { useForm } from 'react-hook-form';
import { InputField } from '@/shared/components/input/InputField';
import { SignupDialogButton, SelectJobButtonGroup } from '@/feature/auth';
import { SignupFormData } from './type';
import { useFetchSignUp } from './hook';

export const SignUpForm = () => {
  const { isSubmitting, isSignupSuccess, fetchSignUp } = useFetchSignUp();
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      name: '',
      jobRoleId: '',
      careerYear: '',
    },
  });
  const jobRoleId = watch('jobRoleId');

  return (
    <form className="space-y-6 w-full">
      <InputField
        label="Email"
        type="email"
        placeholder="가입된 이메일을 입력해주세요."
        {...register('email', {
          required: '이메일을 입력해주세요.',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: '이메일 형식이 올바르지 않습니다.',
          },
        })}
        isError={!!errors.email}
        errorMessage={errors.email?.message as string}
      />
      <InputField
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
          minLength: {
            value: 8,
            message: '비밀번호는 8자 이상이어야 합니다.',
          },
        })}
        isError={!!errors.password}
        errorMessage={errors.password?.message as string}
      />
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
        <SelectJobButtonGroup
          selectedJobId={jobRoleId}
          onJobSelect={jobId => setValue('jobRoleId', jobId, { shouldValidate: true })}
        />
        {errors.jobRoleId && <p className="text-xs text-red-500">{errors.jobRoleId.message as string}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">연차</label>
        <select
          className="w-full px-4 py-3 rounded-lg bg-[#2C2C2E] text-white border-none focus:ring-2 focus:ring-[#8C7FF7]"
          {...register('careerYear', { required: '연차를 선택해주세요.' })}
        >
          <option value="">선택</option>
          <option value="NEWBIE">신입(1년차 미만)</option>
          <option value="JUNIOR">주니어(1~3년)</option>
          <option value="MID">미드레벨(3~6년)</option>
          <option value="SENIOR">시니어(6~10년)</option>
          <option value="LEAD">리드/매니저(10년 이상)</option>
        </select>
        {errors.careerYear && <p className="text-xs text-red-500">{errors.careerYear.message as string}</p>}
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-[#8C7FF7] rounded border-gray-500 bg-[#2C2C2E]"
            {...register('privacyPolicy', { required: '개인정보 수집에 동의해주세요.' })}
          />
          <span className="text-gray-400 text-sm">개인정보 수집 동의</span>
        </label>
        {errors.privacyPolicy && <p className="text-xs text-red-500">{errors.privacyPolicy.message as string}</p>}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-[#8C7FF7] rounded border-gray-500 bg-[#2C2C2E]"
            {...register('termsOfService', { required: '이용 약관에 동의해주세요.' })}
          />
          <span className="text-gray-400 text-sm">이용 약관 동의</span>
        </label>
        {errors.termsOfService && <p className="text-xs text-red-500">{errors.termsOfService.message as string}</p>}
      </div>
      <SignupDialogButton
        isValid={isValid}
        isSubmitting={isSubmitting}
        isSignupSuccess={isSignupSuccess}
        onClick={handleSubmit(fetchSignUp)}
      />
    </form>
  );
};
