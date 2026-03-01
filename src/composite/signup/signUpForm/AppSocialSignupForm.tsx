'use client';

import { useForm, Controller } from 'react-hook-form';
import { InputField } from '@/shared/components/input/InputField';
import Checkbox from '@/shared/components/input/Checkbox';
import Badge from '@/shared/components/display/Badge';
import { SignupDialogButton } from '@/feature/auth';
import { useFetchAppSocialSignup } from './hook';
import { KakaoSignupFormData, SocialLoginType } from './type';

interface AppSocialSignupFormProps {
  registrationToken: string;
  socialType: SocialLoginType;
}

export const AppSocialSignupForm = ({ registrationToken, socialType }: AppSocialSignupFormProps) => {
  const { isSubmitting, isSignupSuccess, fetchAppSocialSignup } = useFetchAppSocialSignup({
    registrationToken,
    socialType,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<KakaoSignupFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      privacyPolicy: false,
      termsOfService: false,
    },
  });

  return (
    <form className="space-y-6 w-full">
      {/* 이름 */}
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

      {/* 약관 동의 */}
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

      {/* 제출 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 pb-10 px-5 max-w-md mx-auto bg-normal-alternative">
        <SignupDialogButton
          isValid={isValid}
          isSubmitting={isSubmitting}
          isSignupSuccess={isSignupSuccess}
          onClick={handleSubmit(fetchAppSocialSignup)}
        />
      </div>
    </form>
  );
};
