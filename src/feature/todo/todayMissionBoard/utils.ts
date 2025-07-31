import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';

export const getCurrentWeekInfo = (goalStartDate?: string) => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

  const dayOfWeekMap: Record<number, DAY_OF_THE_WEEK> = {
    0: 'SUNDAY',
    1: 'MONDAY',
    2: 'TUESDAY',
    3: 'WEDNESDAY',
    4: 'THURSDAY',
    5: 'FRIDAY',
    6: 'SATURDAY',
  };

  let currentWeekIndex = 1;

  if (goalStartDate) {
    const startDate = new Date(goalStartDate);
    const timeDiff = today.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    currentWeekIndex = Math.floor(daysDiff / 7) + 1;
  }

  return {
    currentDayOfWeek: dayOfWeekMap[dayOfWeek],
    currentDate: today,
    currentWeekIndex,
  };
};
