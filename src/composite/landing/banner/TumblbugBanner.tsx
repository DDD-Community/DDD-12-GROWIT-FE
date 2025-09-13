'use client';

import React from 'react';
import Badge from '@/shared/components/display/Badge';

const TumblbugBanner = () => {
  const handleTumblbugClick = () => {
    window.open('https://tumblbug.com/growit', '_blank');
  };

  return (
    <div className="relative bg-[#2E2F33] py-3">
      <meta name="theme-color" content="#2E2F33" />
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-center gap-4 h-full">
          <Badge type="default" size="sm" color="bg-brand-neon" textColor="text-black" label="텀블벅 단독 공개" />
          <span className="text-[#E1DEE8] text-md max-sm:text-xs font-medium line-clamp-2">
            그로잇의 AI 기능을 훨씬 합리적인 가격으로 경험해보세요.
          </span>
          <button
            onClick={handleTumblbugClick}
            className="text-[rgba(194,196,200,0.52)] hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TumblbugBanner;
