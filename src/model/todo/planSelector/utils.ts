// 목표 시작일을 기준으로 현재 주차를 계산하는 함수
export const getCurrentWeekIndex = (goalStartDate: string): number => {
  const today = new Date();
  const startDate = new Date(goalStartDate);
  const startDateAtMidnight = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

  const timeDiff = today.getTime() - startDateAtMidnight.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  const weekIndex = Math.floor(daysDiff / 7);

  return Math.max(0, weekIndex);
};
