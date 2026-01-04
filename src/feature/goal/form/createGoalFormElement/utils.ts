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

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
export const getToday = (): string => {
  const today = new Date();
  return formatDateToYYYYMMDD(today);
};

// 오늘 날짜를 Date 객체로 반환하는 함수
export const getTodayDate = (): Date => {
  const today = new Date();
  // 시간을 00:00:00으로 초기화
  today.setHours(0, 0, 0, 0);
  return today;
};

// 시작 날짜와 주차를 받아서 해당 주차의 일요일 날짜를 반환하는 함수
export const getEndDateByWeeks = (startDate: Date | string, weeks: number): Date => {
  // startDate를 Date 객체로 변환
  const start = typeof startDate === 'string' ? parseDateFromYYYYMMDD(startDate) : new Date(startDate);
  
  // 시작 날짜가 속한 주의 일요일 찾기
  const startSunday = new Date(start);
  const dayOfWeek = startSunday.getDay();
  // 일요일(0)이 아니면 해당 주의 일요일로 이동
  if (dayOfWeek !== 0) {
    startSunday.setDate(startSunday.getDate() + (7 - dayOfWeek));
  }
  
  // weeks 주 후의 일요일 계산 (시작 주 포함이므로 weeks - 1)
  const endDate = new Date(startSunday);
  endDate.setDate(endDate.getDate() + (weeks - 1) * 7);
  
  return endDate;
};

// 주차 수에 따른 종료일 계산 함수 (문자열 반환)
export const getEndDateStringByWeeks = (startDate: Date | string, weeks: number): string => {
  const endDate = getEndDateByWeeks(startDate, weeks);
  return formatDateToYYYYMMDD(endDate);
};
