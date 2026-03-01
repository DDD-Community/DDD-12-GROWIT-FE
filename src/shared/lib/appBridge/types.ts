/**
 * App ↔ Web 메시지 타입
 */
export type AppMessageType =
  | 'READY' // Web → App: 웹 준비 완료
  | 'SYNC_TOKEN_TO_WEB' // App → Web: 앱에서 웹으로 토큰 동기화
  | 'SYNC_TOKEN_TO_APP' // Web → App: 웹에서 앱으로 토큰 동기화 (로그인/갱신)
  | 'LOGOUT' // Web → App: 로그아웃
  | 'NAVIGATE_TO_NATIVE_LOGIN' // Web → App: 네이티브 로그인 화면으로 이동
  | 'OAUTH_SIGNUP'; // App → Web: 소셜 로그인 회원가입 데이터 전달

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

/**
 * 소셜 로그인 회원가입 페이로드 (OAUTH_SIGNUP에서 사용)
 */
export interface OAuthSignupPayload {
  identityToken: string;
  registrationToken: string;
  socialLoginType: 'apple' | 'kakao';
}
