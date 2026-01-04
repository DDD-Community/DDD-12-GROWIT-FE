export function calculateCurrentWeek(startDate: string, endDate: string, now: Date = new Date()): number {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // now 가 범위 밖인 경우 보정
  const clamped = new Date(Math.min(Math.max(now.getTime(), start.getTime()), end.getTime()));

  const diffMs = clamped.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7) + 1; // 1주차부터 시작
  return Math.max(1, week);
}
