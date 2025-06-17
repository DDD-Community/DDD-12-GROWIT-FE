import { useState } from 'react';
import { postLoginApi } from './api';

export function useFetchLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await postLoginApi(email, password);
      setLoading(false);
      return data;
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('접근 권한이 없습니다.');
      } else if (err.response?.status === 404) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setError('로그인에 실패했습니다.');
      }
      setLoading(false);
      throw err;
    }
  };

  return { login, loading, error };
} 