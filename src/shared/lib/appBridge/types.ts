/**
 * App ↔ Web 메시지 타입
 */
export type AppMessageType =
  | 'READY' // Web → App: 웹 준비 완료
  | 'AUTH_TOKEN' // App → Web: 토큰 전달
  | 'TOKEN_REFRESHED' // Web → App: 토큰 갱신됨
  | 'LOGOUT'; // Web → App: 로그아웃

/**
 * 메시지 구조
 */
export interface AppMessage<T = unknown> {
  type: AppMessageType;
  payload?: T;
}

/**
 * 토큰 페이로드 (AUTH_TOKEN, TOKEN_REFRESHED에서 사용)
 */
export interface AppTokenPayload {
  accessToken: string;
  refreshToken: string;
}
