'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');

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
        <div className="flex flex-col items-start gap-2 mb-10 md:mb-20">
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
          <h2 className="text-3xl font-bold mb-2 text-white">회원가입</h2>
          <p className="text-gray-400 mb-8">
            목표는 쉽게, 성장은 확실하게
            <br />
            GROWIT과 함께 매일 성장하세요.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="기업용 이메일을 입력해주세요."
                className="w-full px-4 py-3 rounded-lg bg-[#2C2C2E] text-white placeholder-gray-500 border-none focus:ring-2 focus:ring-[#8C7FF7]"
              />
              <p className="text-xs text-gray-500">! 이메일 형식에 맞게 입력해주세요.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">PW</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요."
                className="w-full px-4 py-3 rounded-lg bg-[#2C2C2E] text-white placeholder-gray-500 border-none focus:ring-2 focus:ring-[#8C7FF7]"
              />
              <p className="text-xs text-gray-500">영문 대소문자, 숫자 포함 8자 이상</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">성함</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="성함을 입력해주세요."
                className="w-full px-4 py-3 rounded-lg bg-[#2C2C2E] text-white placeholder-gray-500 border-none focus:ring-2 focus:ring-[#8C7FF7]"
              />
              <p className="text-xs text-gray-500">6자 이하로 입력해주세요</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">직무</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${
                    role === '기획' ? 'bg-[#8C7FF7] text-white' : 'bg-[#2C2C2E] text-gray-400'
                  }`}
                  onClick={() => setRole('기획')}
                >
                  기획
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${
                    role === '디자이너' ? 'bg-[#8C7FF7] text-white' : 'bg-[#2C2C2E] text-gray-400'
                  }`}
                  onClick={() => setRole('디자이너')}
                >
                  디자이너
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${
                    role === '개발자' ? 'bg-[#8C7FF7] text-white' : 'bg-[#2C2C2E] text-gray-400'
                  }`}
                  onClick={() => setRole('개발자')}
                >
                  개발자
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">연차</label>
              <select
                value={experience}
                onChange={e => setExperience(e.target.value)}
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
