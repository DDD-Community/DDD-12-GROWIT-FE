'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { InputField } from '@/shared/components/input/InputField';
import { useToast } from '@/shared/components/feedBack/toast';
import { useFetchLogin } from '@/composite/login/loginForm/hook';
import { tokenController } from '@/shared/lib/token';
import Button from '@/shared/components/input/Button';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { login, loading } = useFetchLogin();
  const [isSuccess, setIsSuccess] = useState(false);

  // 이미 로그인된 사용자 체크
  useEffect(() => {
    const accessToken = tokenController.getAccessToken();
    const refreshToken = tokenController.getRefreshToken();

    if (accessToken && refreshToken) {
      setIsSuccess(true);
      router.push('/home');
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const emailValue = watch('email');
  const passwordValue = watch('password');

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      showToast('로그인에 성공했습니다!', 'success');
      setIsSuccess(true);
      // 현재는 애니메이션이 잘 보이는지를 테스트하기 위해 약간의 지연을 주었는데 삭제하셔도 무방합니다
      setTimeout(() => {
        router.push('/home');
      }, 200);
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col gap-[24px] pb-[40px]">
        <InputField
          label="Email"
          type="email"
          placeholder="이메일을 입력해주세요"
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
          label="PW"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 6,
              message: '비밀번호는 6자 이상이어야 합니다.',
            },
          })}
          isError={!!errors.password}
          errorMessage={errors.password?.message as string}
        />
      </div>
      <Button
        type="submit"
        text="로그인"
        size={'xl'}
        disabled={emailValue === '' || passwordValue === ''}
        status={loading ? 'loading' : isSuccess ? 'success' : 'idle'}
      />
    </form>
  );
};
