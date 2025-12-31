/** 날짜를 YYYY-MM-DD 형식으로 포맷 */
export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/** YYYY-MM-DD 문자열을 Date로 파싱 */
export const parseDateString = (dateString?: string): Date | undefined => {
  if (!dateString) return undefined;
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/** 월의 첫날 */
export const getMonthStart = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

/** 월의 마지막날 */
export const getMonthEnd = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

/** 두 날짜가 같은 날인지 확인 */
export const isSameDay = (date1: Date, date2?: Date) => {
  if (!date2) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

/** 해당 날짜가 현재 월에 속하는지 확인 */
export const isInMonth = (date: Date, currentMonth: Date) =>
  date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();

/** 캘린더에 표시할 날짜 배열 생성 */
export const getCalendarDays = (currentMonth: Date): Date[] => {
  const monthStart = getMonthStart(currentMonth);
  const monthEnd = getMonthEnd(currentMonth);
  const startDateCal = new Date(monthStart);
  const endDateCal = new Date(monthEnd);

  const startDay = monthStart.getDay();
  startDateCal.setDate(startDateCal.getDate() - startDay);

  const endDay = monthEnd.getDay();
  endDateCal.setDate(endDateCal.getDate() + (6 - endDay));

  const days: Date[] = [];
  const current = new Date(startDateCal);

  while (current <= endDateCal) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
};

export const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
export const MONTH_NAMES = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
