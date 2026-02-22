/**
 * App ↔ Web 메시지 타입
 */
export type AppMessageType =
  | 'READY' // Web → App: 웹 준비 완료
  | 'SYNC_TOKEN_TO_WEB' // App → Web: 앱에서 웹으로 토큰 동기화
  | 'SYNC_TOKEN_TO_APP' // Web → App: 웹에서 앱으로 토큰 동기화 (로그인/갱신)
  | 'LOGOUT'; // Web → App: 로그아웃

/**
 * 메시지 구조
 */
export interface AppMessage<T = unknown> {
  type: AppMessageType;
  payload?: T;
}

/**
 * 토큰 페이로드 (SYNC_TOKEN_TO_WEB, SYNC_TOKEN_TO_APP에서 사용)
 */
export interface AppTokenPayload {
  accessToken: string;
  refreshToken: string;
}
