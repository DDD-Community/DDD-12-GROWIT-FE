'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 로그인 API 호출
    try {
      // 임시 로그인 성공 처리
      localStorage.setItem('token', 'dummy-token');
      router.push('/main');
    } catch (error) {
      console.error('Login failed:', error);
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

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
                className="w-full px-4 py-3 rounded-lg bg-[#2C2C2E] text-white placeholder-gray-500 border-none focus:ring-2 focus:ring-[#8C7FF7]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">PW</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                className="w-full px-4 py-3 rounded-lg bg-[#2C2C2E] text-white placeholder-gray-500 border-none focus:ring-2 focus:ring-[#8C7FF7]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              로그인
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
