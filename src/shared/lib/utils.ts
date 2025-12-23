import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDaysUntilEndDate(endDate: string): number {
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getProgressPercentageByDateRange(startDate: string, endDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간을 0으로 설정하여 일자 기준으로 비교

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  if (totalDays <= 0) return 100; // 종료일이 시작일보다 이전이면 100%
  if (elapsedDays <= 0) return 0; // 아직 시작일이 지나지 않았으면 0%
  if (elapsedDays >= totalDays) return 100; // 종료일을 넘었으면 100%

  const percentage = (elapsedDays / totalDays) * 100;
  return Math.min(Math.max(percentage, 0), 100);
}
