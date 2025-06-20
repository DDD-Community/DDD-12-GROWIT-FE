'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputField } from '@/shared/components/InputField';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
    experience: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 회원가입 API 호출
    try {
      // 임시 회원가입 성공 처리
      router.push('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1C1C1E]">
      {/* 왼쪽 회원가입 섹션 */}
      <div className="flex flex-col w-full lg:w-1/2 p-10 md:p-[20px]">
        <div className="flex flex-col items-start gap-[40px] mb-10 md:mb-20">
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

        <div className="flex flex-col flex-grow justify-center max-w-md mx-auto w-full pb-[24px]">
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <InputField
              label="Email"
              type="email"
              placeholder="기업용 이메일을 입력해주세요."
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              errorMessage={'이메일 형식에 맞게 입력해주세요.'}
              isError={true}
            />
            <InputField
              label="PW"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
            <InputField
              label="성함"
              type="text"
              placeholder="성함을 입력해주세요."
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">직무</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${
                    formData.role === '기획' ? 'bg-[#8C7FF7] text-white' : 'bg-[#2C2C2E] text-gray-400'
                  }`}
                  onClick={() => setFormData({ ...formData, role: '기획' })}
                >
                  기획
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${
                    formData.role === '디자이너' ? 'bg-[#8C7FF7] text-white' : 'bg-[#2C2C2E] text-gray-400'
                  }`}
                  onClick={() => setFormData({ ...formData, role: '디자이너' })}
                >
                  디자이너
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${
                    formData.role === '개발자' ? 'bg-[#8C7FF7] text-white' : 'bg-[#2C2C2E] text-gray-400'
                  }`}
                  onClick={() => setFormData({ ...formData, role: '개발자' })}
                >
                  개발자
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">연차</label>
              <select
                value={formData.experience}
                onChange={e => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#2C2C2E] text-white border-none focus:ring-2 focus:ring-[#8C7FF7]"
              >
                <option value="">선택</option>
                <option value="신입">신입</option>
                <option value="1년차">1년차</option>
                <option value="2년차">2년차</option>
                <option value="3년차">3년차</option>
                <option value="4년차">4년차</option>
                <option value="5년차 이상">5년차 이상</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-[#8C7FF7] rounded border-gray-500 bg-[#2C2C2E]"
                />
                <span className="text-gray-400 text-sm">개인정보 수집 동의</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-[#8C7FF7] rounded border-gray-500 bg-[#2C2C2E]"
                />
                <span className="text-gray-400 text-sm">이용 약관 동의</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              가입하기
            </button>
          </form>
        </div>
      </div>

      {/* 오른쪽 이미지 섹션 - lg 크기 이상에서만 표시 */}
      <div className="hidden md:flex w-1/2 bg-[#8C7FF7] rounded-[16px] m-[20px] p-[20px] items-center justify-center">
        <div className="w-full max-w-2xl">
          <Image
            src="/dashboard-preview.png"
            alt="Dashboard Preview"
            width={800}
            height={600}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
