'use client';
import { useForm, Controller } from 'react-hook-form';
import { InputField } from '@/shared/components/input/InputField';
import { SignupDialogButton } from '@/feature/auth';
import { SignupFormData } from './type';
import { useFetchSignUp } from './hook';
import Checkbox from '@/shared/components/input/Checkbox';
import Badge from '@/shared/components/display/Badge';

export const SignUpForm = () => {
  const { isSubmitting, isSignupSuccess, fetchSignUp } = useFetchSignUp();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      name: '',
      privacyPolicy: false,
      termsOfService: false,
    },
  });

  return (
    <form className="space-y-6 w-full">
      <InputField
        label="이메일"
        type="email"
        placeholder="가입할 이메일을 입력해주세요."
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
        <label className="flex items-center space-x-2">
          <Controller
            name="privacyPolicy"
            control={control}
            rules={{ required: '개인정보 수집에 동의해주세요.' }}
            render={({ field }) => <Checkbox checked={field.value} onChange={field.onChange} />}
          />
          <Badge
            type="default"
            size="sm"
            label="필수"
            color="bg-[rgba(255,99,99,0.16)]"
            textColor="text-status-negative"
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
          <Badge
            type="default"
            size="sm"
            label="필수"
            color="bg-[rgba(255,99,99,0.16)]"
            textColor="text-status-negative"
          />
          <span className="text-gray-400 text-sm">이용 약관 동의</span>
        </label>
        {errors.termsOfService && <p className="text-xs text-red-500">{errors.termsOfService.message as string}</p>}
      </div>
      {/* 추후 ios safe-area-inset-bottom 적용 필요 */}
      <div className="fixed bottom-0 left-0 right-0 pb-10 px-5 max-w-md mx-auto bg-normal-alternative">
        <SignupDialogButton
          isValid={isValid}
          isSubmitting={isSubmitting}
          isSignupSuccess={isSignupSuccess}
          onClick={handleSubmit(fetchSignUp)}
        />
      </div>
    </form>
  );
};
