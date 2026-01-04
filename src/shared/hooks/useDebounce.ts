import { useRef, useCallback } from 'react';

/**
 * 디바운스된 콜백을 반환하는 훅
 * @param callback - 디바운스할 콜백 함수
 * @param delay - 디바운스 지연 시간 (ms), 기본값 300ms
 * @returns 디바운스된 콜백 함수
 *
 * @example
 * const handleClick = useDebounceCallback(() => {
 *   // 여러번 클릭해도 마지막 클릭 후 300ms 뒤에 한번만 실행
 *   submitForm();
 * }, 300);
 */
export const useDebounceCallback = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

/**
 * 쓰로틀된 콜백을 반환하는 훅 (첫 번째 호출 즉시 실행, 이후 무시)
 * @param callback - 쓰로틀할 콜백 함수
 * @param delay - 쓰로틀 지연 시간 (ms), 기본값 300ms
 * @returns 쓰로틀된 콜백 함수
 *
 * @example
 * const handleSubmit = useThrottleCallback(() => {
 *   // 첫 번째 클릭 즉시 실행, 300ms 동안 추가 클릭 무시
 *   submitForm();
 * }, 300);
 */
export const useThrottleCallback = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) => {
  const lastCallRef = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
};
