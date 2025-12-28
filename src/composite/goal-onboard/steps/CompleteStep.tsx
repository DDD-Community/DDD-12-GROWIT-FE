'use client';

import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';

interface CompleteStepProps {
  goalName: string;
  startDate?: string;
  endDate?: string;
}

const formatDateRange = (startDate?: string, endDate?: string): string => {
  if (!startDate || !endDate) return '';
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const formatDate = (date: Date) => {
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayName = days[date.getDay()];
    return `${year}.${month}.${day} (${dayName})`;
  };

  return `${formatDate(start)} ~ ${formatDate(end)}`;
};

export const CompleteStep = ({ goalName, startDate, endDate }: CompleteStepProps) => {
  return (
    <FlexBox direction="col" className="flex-1 items-center px-5 pt-12">
      <FlexBox direction="col" className="items-center gap-2 text-center mb-8">
        <h1 className="text-2xl font-bold text-white">나의 목표 행성이에요</h1>
        <p className="text-base text-text-secondary">목표를 끝까지 완료해 행성을 완성시키세요</p>
      </FlexBox>

      <div className="relative w-[200px] h-[200px] mb-4">
        <Image src="/goal/goal-progress.png" alt="목표 행성" fill className="object-contain" priority />
      </div>

      <p className="text-sm text-text-tertiary mb-8">과몰입 실버스피릿 행성</p>

      <div className="w-full bg-fill-normal rounded-2xl p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{goalName}</h3>
        {startDate && endDate && (
          <p className="text-sm text-text-secondary">날짜 {formatDateRange(startDate, endDate)}</p>
        )}
      </div>
    </FlexBox>
  );
};
