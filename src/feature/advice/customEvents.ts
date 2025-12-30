export const DAILY_ADVICE_ARRIVAL = 'daily-advice-arrival';

export function dispatchDailyAdviceArrival() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DAILY_ADVICE_ARRIVAL));
  }
}
