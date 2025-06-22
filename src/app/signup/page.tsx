'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { InputField } from '@/shared/components/InputField';
import { SignupDialogButton } from '@/app/signup/SignupDialogButton';

type CareerYearType = 'NEWBIE' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD';

// 회원가입 시 필요한 데이터타입
interface SignupFormData {
  email: string;
  password: string;
  name: string;
  jobRoleId: string;
  careerYear: '' | CareerYearType;
  privacyPolicy: boolean; // 개인정보수집동의 관련해서 백엔드 저장이 필요할듯?
  termsOfService: boolean; // 개인정보수집동의 관련해서 백엔드 저장이 필요할듯?
}

export default function SignupPage() {
  const router = useRouter();
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

  const onSubmit = async (data: SignupFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="flex h-screen bg-[#1C1C1E] overflow-hidden">
      {/* 왼쪽 회원가입 섹션 */}
      <div className="flex flex-col w-full lg:w-1/2 h-full">
        {/* 고정 헤더 */}
        <div className="flex flex-col items-start gap-[40px] p-10 md:p-[20px] pb-0">
          <h1 className="text-2xl font-bold text-white pl-[4px]">GROWIT</h1>
          <Link href="/login" className="text-white">
            <span className="inline-flex items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              뒤로
            </span>
          </Link>
        </div>

        {/* 스크롤 가능한 폼 섹션 */}
        <div className="flex-1 overflow-y-auto px-10 md:px-[20px] pb-10 md:pb-[20px]">
          <div className="flex flex-col justify-center max-w-md mx-auto w-full min-h-full py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
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
                label="PW"
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
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-lg ${
                      jobRoleId === 'jobId1' ? 'bg-[#8C7FF7] text-white' : 'bg-[#2C2C2E] text-gray-400'
                    }`}
                    onClick={() => setValue('jobRoleId', 'jobId1', { shouldValidate: true })}
                  >
                    기획
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-lg ${
                      jobRoleId === 'jobId2' ? 'bg-[#8C7FF7] text-white' : 'bg-[#2C2C2E] text-gray-400'
                    }`}
                    onClick={() => setValue('jobRoleId', 'jobId2', { shouldValidate: true })}
                  >
                    디자이너
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-lg ${
                      jobRoleId === 'jobId3' ? 'bg-[#8C7FF7] text-white' : 'bg-[#2C2C2E] text-gray-400'
                    }`}
                    onClick={() => setValue('jobRoleId', 'jobId3', { shouldValidate: true })}
                  >
                    개발자
                  </button>
                </div>
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
                {errors.privacyPolicy && (
                  <p className="text-xs text-red-500">{errors.privacyPolicy.message as string}</p>
                )}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-[#8C7FF7] rounded border-gray-500 bg-[#2C2C2E]"
                    {...register('termsOfService', { required: '이용 약관에 동의해주세요.' })}
                  />
                  <span className="text-gray-400 text-sm">이용 약관 동의</span>
                </label>
                {errors.termsOfService && (
                  <p className="text-xs text-red-500">{errors.termsOfService.message as string}</p>
                )}
              </div>
              <SignupDialogButton isValid={isValid} />
            </form>
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
