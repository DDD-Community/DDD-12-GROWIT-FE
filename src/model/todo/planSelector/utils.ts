// 목표 시작일을 기준으로 현재 주차를 계산하는 함수
export const initCurrentWeekIndex = (goalStartDate: string | Date, targetDate: string | Date = new Date()): number => {
  let startDate: Date;

  if (!goalStartDate) {
    return 0;
  }

  if (goalStartDate instanceof Date) {
    startDate = goalStartDate;
  } else if (typeof goalStartDate === 'string') {
    if (!goalStartDate.trim()) {
      return 0;
    }

    startDate = new Date(goalStartDate);

    if (isNaN(startDate.getTime())) {
      return 0;
    }
  } else {
    return 0;
  }

  let target: Date;

  if (!targetDate) {
    target = new Date();
  } else if (targetDate instanceof Date) {
    target = targetDate;
  } else if (typeof targetDate === 'string') {
    // 빈 문자열 체크
    if (!targetDate.trim()) {
      target = new Date();
    } else {
      target = new Date(targetDate);

      // Invalid Date 체크
      if (isNaN(target.getTime())) {
        target = new Date();
      }
    }
  } else {
    target = new Date();
  }

  const startDateAtMidnight = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const targetDateAtMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());

  const timeDiff = targetDateAtMidnight.getTime() - startDateAtMidnight.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  const startDayOfWeek = adjustDayOfWeekToMondayStart(startDateAtMidnight.getDay());

  /**
   * 2025.10.06 - 첫번째 주차의 요일이 변경 가능함에 따른 날짜보정 로직 추가
   */
  const weekIndex = Math.floor((startDayOfWeek + daysDiff) / 7);

  return Math.max(0, weekIndex);
};

/**
 * JavaScript의 getDay() 메서드를 월요일 기준으로 보정하는 함수
 * - 일요일(0)을 6으로, 나머지는 1씩 빼서 월요일을 0으로 만듦
 */
export const adjustDayOfWeekToMondayStart = (dayOfWeek: number): number => {
  return (dayOfWeek + 6) % 7;
};
