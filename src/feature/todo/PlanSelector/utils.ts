// 목표 시작일을 기준으로 현재 주차를 계산하는 함수
export const getCurrentWeekIndex = (goalStartDate: string): number => {
  const today = new Date();
  const startDate = new Date(goalStartDate);

  const timeDiff = today.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  const weekIndex = Math.floor(daysDiff / 7);

  return Math.max(0, Math.min(weekIndex, 3));
};
