// 날짜를 YYYY-MM-DD 형식으로 변환하는 함수 (시간대 문제 해결)
export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// YYYY-MM-DD 문자열을 Date 객체로 안전하게 변환하는 함수
export const parseDateFromYYYYMMDD = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // month는 0-based이므로 -1
};

// 다음 월요일을 찾는 함수
export const getNextMonday = (fromDate: Date = new Date()): Date => {
  const nextMonday = new Date(fromDate);
  const currentDay = nextMonday.getDay();
  const daysUntilMonday = currentDay === 0 ? 1 : 8 - currentDay; // 일요일이면 다음날, 아니면 다음주 월요일
  nextMonday.setDate(nextMonday.getDate() + daysUntilMonday);
  return nextMonday;
};

// 4주 후 날짜를 계산하는 함수
export const getEndDate = (startDate: Date): Date => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 27); // 4주 = 28일이므로 27일을 더함
  return endDate;
};
