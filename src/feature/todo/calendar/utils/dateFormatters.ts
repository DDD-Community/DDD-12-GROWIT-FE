import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { WEEKDAY_NAMES } from './constants';

/**
 * 날짜를 원하는 형식으로 포맷팅
 * @example formatDate(new Date(), 'yyyy-MM-dd') // '2025-01-01'
 */
export const formatDate = (date: Date, formatString: string): string => {
  return format(date, formatString, { locale: ko });
};

/**
 * 요일 문자열 반환 ("일", "월", ...)
 */
export const formatWeekday = (date: Date): string => {
  const dayIndex = date.getDay();
  return WEEKDAY_NAMES[dayIndex];
};

/**
 * 날짜 헤더 포맷 ("01.01 일요일")
 */
export const formatDateHeader = (date: Date): string => {
  const monthDay = format(date, 'MM.dd');
  const weekday = formatWeekday(date);
  return `${monthDay} ${weekday}요일`;
};

/**
 * 월 표시 포맷 ("1월")
 */
export const formatMonth = (date: Date): string => {
  return format(date, 'M월', { locale: ko });
};

/**
 * 연도 + 월 표시 포맷 ("2025년 1월" 또는 "1월" - 올해인 경우 연도 제외)
 */
export const formatMonthYear = (date: Date): string => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const dateYear = date.getFullYear();
  
  // 올해인 경우 연도 제외
  if (dateYear === currentYear) {
    return format(date, 'M월', { locale: ko });
  }
  
  // 다른 연도인 경우 연도 포함
  return format(date, 'yyyy년 M월', { locale: ko });
};

/**
 * ISO 8601 날짜 문자열로 변환 (API 키로 사용)
 * @example toDateKey(new Date()) // '2025-01-01'
 */
export const toDateKey = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * 날짜 숫자만 추출 (1, 2, 3, ...)
 */
export const getDateNumber = (date: Date): number => {
  return date.getDate();
};
