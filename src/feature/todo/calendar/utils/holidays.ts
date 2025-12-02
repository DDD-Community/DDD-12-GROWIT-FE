import Holidays, { HolidaysTypes } from 'date-holidays';
import { toDateKey } from './dateFormatters';

export type HolidayMap = Record<string, string>;

const holidayClient = new Holidays('KR', {
  languages: 'ko',
});

const isPublicHoliday = (holiday: HolidaysTypes.Holiday) => holiday.type === 'public';

export const getKoreanHolidaysInRange = (startDate: Date, endDate: Date): HolidayMap => {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    return {};
  }

  const rangeStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const rangeEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999);

  if (rangeStart > rangeEnd) {
    return {};
  }

  const holidayMap: HolidayMap = {};
  const startYear = rangeStart.getFullYear();
  const endYear = rangeEnd.getFullYear();

  for (let year = startYear; year <= endYear; year++) {
    const holidays = holidayClient.getHolidays(year, 'ko') || [];

    holidays.forEach(holiday => {
      if (!isPublicHoliday(holiday)) return;

      const holidayDate = holiday.start ?? new Date(holiday.date);
      if (holidayDate < rangeStart || holidayDate > rangeEnd) return;

      const key = toDateKey(holidayDate);
      if (!holidayMap[key]) {
        holidayMap[key] = holiday.name;
      }
    });
  }

  return holidayMap;
};
