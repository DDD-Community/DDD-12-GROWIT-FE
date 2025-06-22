'use client';

import { useState } from 'react';
import { postLoginApi } from '../api';
import { tokenController } from '@/shared/lib/token';

export function useFetchLogin() {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { accessToken, refreshToken } = await postLoginApi(email, password);
      setLoading(false); // 로딩 end
      tokenController.setTokens(accessToken, refreshToken); // 로컬스토리지 token 업데이트
    } catch (err: any) {
      setLoading(false);
      tokenController.clearTokens();

      // 에러 메시지를 토스트로 표시하기 위해 에러를 다시 throw
      if (err.response?.status === 404) {
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else if (err.response?.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return { login, loading };
}
