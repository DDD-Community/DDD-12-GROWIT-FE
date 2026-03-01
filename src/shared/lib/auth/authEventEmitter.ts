import type { AuthEventType, AuthEventListener, TokenPayload } from './types';

type EventPayloadMap = {
  LOGIN: TokenPayload;
  LOGOUT: void;
  TOKEN_REFRESH: TokenPayload;
};

class AuthEventEmitter {
  private listeners: Map<AuthEventType, Set<AuthEventListener<unknown>>> =
    new Map();

  /**
   * 이벤트 발행
   */
  emit<T extends AuthEventType>(type: T, payload?: EventPayloadMap[T]): void {
    const eventListeners = this.listeners.get(type);
    if (!eventListeners) return;

    eventListeners.forEach((listener) => {
      try {
        listener(payload);
      } catch (error) {
        console.error(`[AuthEventEmitter] Error in ${type} listener:`, error);
      }
    });
  }

  /**
   * 이벤트 구독
   * @returns 구독 해제 함수
   */
  on<T extends AuthEventType>(
    type: T,
    listener: AuthEventListener<EventPayloadMap[T]>
  ): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(listener as AuthEventListener<unknown>);

    // 구독 해제 함수 반환
    return () => this.off(type, listener);
  }

  /**
   * 이벤트 구독 해제
   */
  off<T extends AuthEventType>(
    type: T,
    listener: AuthEventListener<EventPayloadMap[T]>
  ): void {
    this.listeners.get(type)?.delete(listener as AuthEventListener<unknown>);
  }

  /**
   * 모든 리스너 제거 (테스트용)
   */
  clear(): void {
    this.listeners.clear();
  }
}

// 싱글톤 인스턴스
export const authEventEmitter = new AuthEventEmitter();
