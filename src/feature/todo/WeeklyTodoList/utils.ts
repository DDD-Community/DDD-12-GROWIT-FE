import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';
import { DAY_LABELS, WEEKDAYS } from './const';

// 오늘 요일을 계산하여 DAY_OF_THE_WEEK 타입으로 반환
export function getTodayDayOfWeek(): DAY_OF_THE_WEEK {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

  const dayMap: Record<number, DAY_OF_THE_WEEK> = {
    0: 'SUNDAY',
    1: 'MONDAY',
    2: 'TUESDAY',
    3: 'WEDNESDAY',
    4: 'THURSDAY',
    5: 'FRIDAY',
    6: 'SATURDAY',
  };

  return dayMap[dayOfWeek] || 'MONDAY';
}

// 날짜를 문자열로 변환 (MM/DD 형식)
export function getDateString(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

// 오늘 날짜인지 확인
export function isToday(date: Date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

// 주차별 시작 날짜 계산
export function getWeekStartDate(startDate: string, weekIdx: number) {
  const start = new Date(startDate);

  // 시작 날짜가 해당 주의 월요일이 되도록 조정
  const dayOfWeek = start.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 월요일까지의 일수

  // 시작 날짜를 해당 주의 월요일로 조정
  start.setDate(start.getDate() - daysToMonday);

  // 주차에 따라 7일씩 더하기
  start.setDate(start.getDate() + weekIdx * 7);

  return start;
}

// 해당 주차의 요일별 날짜 배열 반환
export function getWeekDates(weekStart: Date, showWeekend: boolean) {
  if (showWeekend) {
    // 토요일: +5, 일요일: +6
    return [
      {
        key: 'SATURDAY' as DAY_OF_THE_WEEK,
        label: DAY_LABELS['SATURDAY'],
        date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 5),
      },
      {
        key: 'SUNDAY' as DAY_OF_THE_WEEK,
        label: DAY_LABELS['SUNDAY'],
        date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6),
      },
    ];
  } else {
    // 평일: 월~금 (idx 0~4)
    return WEEKDAYS.map((key, idx) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + idx);
      return { key, label: DAY_LABELS[key], date };
    });
  }
}

// 모바일용: 평일과 주말을 모두 포함한 요일별 날짜 배열 반환
export function getAllWeekDates(weekStart: Date) {
  const allDays: DAY_OF_THE_WEEK[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  return allDays.map((key, idx) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + idx);
    return { key, label: DAY_LABELS[key], date };
  });
}
