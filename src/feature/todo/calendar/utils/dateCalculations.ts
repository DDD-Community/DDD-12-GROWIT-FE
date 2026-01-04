import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addMonths,
  subMonths,
  isSameDay as dateFnsIsSameDay,
  isSameMonth as dateFnsIsSameMonth,
  isToday as dateFnsIsToday,
} from 'date-fns';
import { CALENDAR, WEEKDAY } from './constants';

/**
 * 주간 날짜 배열 생성 (일요일 시작)
 */
export const getWeekDates = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: WEEKDAY.SUNDAY });
  return Array.from({ length: CALENDAR.DAYS_IN_WEEK }, (_, i) => addDays(start, i));
};

/**
 * 월간 날짜 배열 생성 (42개 셀)
 */
export const getMonthDates = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const start = startOfWeek(monthStart, { weekStartsOn: WEEKDAY.SUNDAY });
  return Array.from({ length: CALENDAR.TOTAL_CELLS }, (_, i) => addDays(start, i));
};

/**
 * 주의 시작일과 끝일 반환
 */
export const getWeekRange = (date: Date): [Date, Date] => {
  const start = startOfWeek(date, { weekStartsOn: WEEKDAY.SUNDAY });
  const end = endOfWeek(date, { weekStartsOn: WEEKDAY.SUNDAY });
  return [start, end];
};

/**
 * 월의 시작일과 끝일 반환
 */
export const getMonthRange = (date: Date): [Date, Date] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return [start, end];
};

/**
 * 이전 주로 이동
 */
export const getPreviousWeek = (date: Date): Date => {
  return addDays(date, -7);
};

/**
 * 다음 주로 이동
 */
export const getNextWeek = (date: Date): Date => {
  return addDays(date, 7);
};

/**
 * 이전 달로 이동
 */
export const getPreviousMonth = (date: Date): Date => {
  return subMonths(date, 1);
};

/**
 * 다음 달로 이동
 */
export const getNextMonth = (date: Date): Date => {
  return addMonths(date, 1);
};

/**
 * 오늘 날짜인지 확인
 */
export const isToday = (date: Date): boolean => {
  return dateFnsIsToday(date);
};

/**
 * 같은 날짜인지 확인
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return dateFnsIsSameDay(date1, date2);
};

/**
 * 같은 월인지 확인
 */
export const isSameMonth = (date: Date, month: Date): boolean => {
  return dateFnsIsSameMonth(date, month);
};

/**
 * 현재 월의 날짜인지 확인
 */
export const isCurrentMonth = (date: Date, currentMonth: Date): boolean => {
  return isSameMonth(date, currentMonth);
};
