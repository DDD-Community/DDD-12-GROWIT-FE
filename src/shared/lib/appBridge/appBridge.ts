import type { AppMessage, AppMessageType, AppTokenPayload } from './types';

/**
 * App Bridge - 앱과 웹 간 통신 유틸리티
 */
export const appBridge = {
  /**
   * 앱(WebView) 환경 여부 확인
   */
  isInApp(): boolean {
    if (typeof window === 'undefined') return false;
    return window.ReactNativeWebView !== undefined;
  },

  /**
   * 앱으로 메시지 전송
   */
  sendToApp<T = unknown>(type: AppMessageType, payload?: T): void {
    if (!this.isInApp()) return;

    const message: AppMessage<T> = { type, payload };
    window.ReactNativeWebView!.postMessage(JSON.stringify(message));

    if (process.env.NODE_ENV === 'development') {
      console.log('[AppBridge] Send:', type, payload);
    }
  },

  /**
   * 앱에서 메시지 수신 리스너 등록
   * @returns 구독 해제 함수
   */
  onAppMessage<T = unknown>(
    callback: (message: AppMessage<T>) => void
  ): () => void {
    const handler = (event: MessageEvent) => {
      // 객체로 온 경우 (injectJavaScript)
      if (typeof event.data === 'object' && event.data?.type) {
        callback(event.data as AppMessage<T>);
        return;
      }

      // JSON 문자열로 온 경우
      if (typeof event.data === 'string') {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.type) {
            callback(parsed as AppMessage<T>);
          }
        } catch {
          // JSON 아님 - 무시
        }
      }
    };

    window.addEventListener('message', handler);

    return () => {
      window.removeEventListener('message', handler);
    };
  },

  /**
   * 앱에서 토큰 수신 대기 (Promise)
   * - READY 전송 → SYNC_TOKEN_TO_WEB 대기
   */
  waitForAppToken(timeout: number = 5000): Promise<AppTokenPayload> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error(`토큰 수신 타임아웃 (${timeout}ms)`));
      }, timeout);

      const cleanup = this.onAppMessage<AppTokenPayload>((message) => {
        if (message.type === 'SYNC_TOKEN_TO_WEB' && message.payload) {
          clearTimeout(timeoutId);
          cleanup();
          resolve(message.payload);
        }
      });

      // 앱에 준비 완료 알림
      this.sendToApp('READY');
    });
  },
};
