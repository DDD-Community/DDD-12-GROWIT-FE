'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { InputField } from '@/shared/components/InputField';
import { useToast } from '@/shared/components/toast';
import { useFetchLogin } from './useFetchLogin';
import { tokenController } from '@/shared/lib/token';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useFetchLogin();
  const { showToast } = useToast();

  // 이미 로그인된 사용자 체크
  useEffect(() => {
    const accessToken = tokenController.getAccessToken();
    const refreshToken = tokenController.getRefreshToken();

    if (accessToken && refreshToken) {
      router.push('/main');
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      showToast('로그인에 성공했습니다!', 'success');
      router.push('/main');
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1C1C1E]">
      {/* 왼쪽 로그인 섹션 */}
      <div className="flex flex-col w-full lg:w-1/2 p-10 md:p-[20px]">
        <div className="mb-10 md:mb-20">
          <h1 className="text-2xl font-bold text-white pl-[4px]">GROWIT</h1>
        </div>

        <div className="flex flex-col flex-grow justify-center max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold mb-2 text-white">로그인</h2>
          <p className="text-gray-400 mb-8">
            목표는 쉽게, 성장은 확실하게
            <br />
            GROWIT과 함께 매일 성장하세요.
          </p>

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
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                !loading ? 'bg-white text-black hover:bg-gray-100' : 'bg-[#2C2C2E] text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <span>계정이 없으신가요? </span>
            <Link href="/signup" className="text-white font-medium underline">
              회원가입 바로가기
            </Link>
          </div>
        </div>
      </div>

      {/* 오른쪽 이미지 섹션 - lg 크기 이상에서만 표시 */}
      <div className="hidden md:flex w-1/2 bg-[#8C7FF7] rounded-[16px] m-[20px] p-[20px] items-center justify-center">
        <div className="w-full max-w-2xl">
          <Image src="/landing-header-message.svg" alt="Dashboard Preview" width={400} height={300} />
        </div>
      </div>
    </div>
  );
}
