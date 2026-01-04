/**
 * 요일 이름 배열 (일요일 시작)
 */
export const WEEKDAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'] as const;

/**
 * 요일 인덱스
 */
export const WEEKDAY = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

/**
 * 캘린더 그리드 크기
 */
export const CALENDAR = {
  DAYS_IN_WEEK: 7,
  WEEKS_IN_MONTH: 6,
  TOTAL_CELLS: 42, // 7 * 6
} as const;
