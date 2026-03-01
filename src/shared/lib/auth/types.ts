/**
 * 토큰 페이로드
 */
export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}

/**
 * Auth 이벤트 타입
 */
export type AuthEventType = 'LOGIN' | 'LOGOUT' | 'TOKEN_REFRESH';

/**
 * Auth 이벤트 리스너
 */
export type AuthEventListener<T = void> = (payload: T) => void;
