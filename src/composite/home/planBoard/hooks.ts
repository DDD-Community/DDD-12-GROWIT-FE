import { useCallback, useState } from 'react';

export function useDesktopWeekendToggle() {
  const [showWeekend, setShowWeekend] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  if (!isInitialized) {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0: 일요일, 6: 토요일
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    setShowWeekend(isWeekend);
    setIsInitialized(true);
  }

  const toggleWeekend = useCallback((show: boolean) => {
    setShowWeekend(show);
  }, []);

  return {
    showWeekend,
    toggleWeekend,
  };
}
