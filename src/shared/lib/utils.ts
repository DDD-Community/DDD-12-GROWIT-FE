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

function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getProgressPercentageByDateRange(startDate: string, endDate: string, now = new Date()): number {
  // 날짜를 로컬 타임존 기준으로 파싱 (시간은 00:00:00)
  const start = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);

  // 현재 날짜를 정규화 (시간 제거)
  const current = new Date(now);
  current.setHours(0, 0, 0, 0);

  const startTime = start.getTime();
  const endTime = end.getTime();
  const currentTime = current.getTime();

  // 시작일 이전이면 0%
  if (currentTime < startTime) return 0;
  // 종료일 이후면 100%
  if (currentTime > endTime) return 100;

  // 전체 기간 계산 (일자 기준, 종료일 포함)
  const totalDays = Math.floor((endTime - startTime) / (1000 * 60 * 60 * 24)) + 1;
  // 경과 일수 계산 (시작일 포함)
  const elapsedDays = Math.floor((currentTime - startTime) / (1000 * 60 * 60 * 24)) + 1;

  // 진행률 계산
  const percentage = Math.round((elapsedDays / totalDays) * 100);
  return Math.min(Math.max(percentage, 0), 100);
}

export function getMsUntilEndOfDay() {
  const now = new Date();

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const msUntilEndOfDay = endOfDay.getTime() - now.getTime();

  return msUntilEndOfDay;
}
