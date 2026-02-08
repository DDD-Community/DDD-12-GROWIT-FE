import { useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue?: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : (initialValue ?? null);
    } catch (error) {
      console.error(error);
      return initialValue ?? null;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      if (
        error instanceof DOMException &&
        (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      ) {
        console.error('로컬스토리지가 가득 찼습니다. 데이터를 저장할 수 없습니다.');
        return;
      }
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
