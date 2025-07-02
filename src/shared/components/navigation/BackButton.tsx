'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  href?: string;
  className?: string;
}

export const BackButton = ({ href, className = '' }: BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors ${className}`}
      aria-label="뒤로가기"
    >
      <ChevronLeft className="w-5 h-5 text-white" />
    </button>
  );
};
