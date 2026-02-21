import { tokenStorage } from './tokenStorage';
import { authEventEmitter } from './authEventEmitter';
import type { TokenPayload, AuthEventListener } from './types';

class AuthService {
  /**
   * 인증 여부 확인
   */
  isAuthenticated(): boolean {
    return tokenStorage.hasTokens();
  }

  /**
   * Access Token 조회
   */
  getAccessToken(): string | null {
    return tokenStorage.getAccessToken();
  }

  /**
   * Refresh Token 조회
   */
  getRefreshToken(): string | null {
    return tokenStorage.getRefreshToken();
  }

  /**
   * 로그인 (토큰 저장 + 이벤트 발행)
   */
  login(tokens: TokenPayload): void {
    tokenStorage.save(tokens.accessToken, tokens.refreshToken);
    authEventEmitter.emit('LOGIN', tokens);

    if (process.env.NODE_ENV === 'development') {
      console.log('[AuthService] Login');
    }
  }

  /**
   * 로그아웃 (토큰 삭제 + 이벤트 발행)
   */
  logout(): void {
    tokenStorage.clear();
    authEventEmitter.emit('LOGOUT');

    if (process.env.NODE_ENV === 'development') {
      console.log('[AuthService] Logout');
    }
  }

  /**
   * 토큰 갱신 (토큰 저장 + 이벤트 발행)
   */
  refreshTokens(tokens: TokenPayload): void {
    tokenStorage.save(tokens.accessToken, tokens.refreshToken);
    authEventEmitter.emit('TOKEN_REFRESH', tokens);

    if (process.env.NODE_ENV === 'development') {
      console.log('[AuthService] Token refreshed');
    }
  }

  // ============================================
  // 이벤트 구독
  // ============================================

  /**
   * 로그인 이벤트 구독
   */
  onLogin(callback: AuthEventListener<TokenPayload>): () => void {
    return authEventEmitter.on('LOGIN', callback);
  }

  /**
   * 로그아웃 이벤트 구독
   */
  onLogout(callback: AuthEventListener<void>): () => void {
    return authEventEmitter.on('LOGOUT', callback);
  }

  /**
   * 토큰 갱신 이벤트 구독
   */
  onTokenRefresh(callback: AuthEventListener<TokenPayload>): () => void {
    return authEventEmitter.on('TOKEN_REFRESH', callback);
  }
}

// 싱글톤 인스턴스
export const authService = new AuthService();
