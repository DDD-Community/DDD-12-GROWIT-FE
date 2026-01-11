import { useEffect, useRef, useState } from 'react';

/** 현재 뷰포트에 있는지 여부를 감지하는 커스텀 훅 */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.2,
      ...options,
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isInView };
}
