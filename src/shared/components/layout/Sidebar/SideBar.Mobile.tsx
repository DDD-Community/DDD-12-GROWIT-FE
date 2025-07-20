'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoutButton } from '@/feature/auth/logoutButton/component';
import Button from '../../input/Button';

export const SideBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* 햄버거 메뉴 버튼 - 오른쪽 상단으로 이동 */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden fixed top-3 right-4 p-2 bg-[#232326] rounded-lg shadow-lg z-101"
        aria-label="메뉴 열기"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 12H21M3 6H21M3 18H21"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 모바일 사이드바 오버레이 */}
      {isOpen && <div className="sm:hidden fixed inset-0 bg-black bg-opacity-30 z-100" onClick={toggleSidebar} />}

      {/* 모바일 사이드바 - 오른쪽에서 열림 */}
      <div
        className={`sm:hidden fixed top-0 right-0 h-full w-64 bg-[#232326] shadow-lg transform transition-transform duration-300 ease-in-out z-110 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-semibold">메뉴</h2>
            <button
              onClick={toggleSidebar}
              className="p-2 text-white hover:bg-gray-700 rounded-lg"
              aria-label="메뉴 닫기"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* 네비게이션 메뉴 */}
          <div className="flex-1 flex flex-col gap-4">
            <Button
              variant="tertiary"
              layout="normal"
              onClick={() => handleNavigation('/home')}
              text="홈"
              icon={
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 21V11H13V21M1 8L10 1L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              size="lg"
            />
            <Button
              variant="tertiary"
              layout="normal"
              onClick={() => handleNavigation('/mypage')}
              text="마이페이지"
              icon={
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19M13 5C13 7.20914 11.2091 9 9 9C6.79086 9 5 7.20914 5 5C5 2.79086 6.79086 1 9 1C11.2091 1 13 2.79086 13 5Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              size="lg"
            />
          </div>

          {/* 로그아웃 버튼 */}
          <div className="mt-auto">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
};
