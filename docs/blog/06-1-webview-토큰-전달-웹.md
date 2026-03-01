# 06-1. WebView 토큰 전달 (웹 사이드)

## 목표

React Native 앱과 웹 간의 토큰 동기화를 구현합니다.

## 배경

GrowIt 앱은 **하이브리드 앱** 구조입니다:
- 로그인/회원가입: React Native (네이티브)
- 메인 서비스: WebView로 웹 앱 로드

이 구조에서 **토큰 동기화**가 필요합니다:
1. 앱에서 로그인 → 웹에 토큰 전달
2. 웹에서 토큰 갱신 → 앱에 알림
3. 웹에서 로그아웃 → 앱에 알림

## 원리: postMessage 통신

### 왜 postMessage인가?

| 방식 | 보안 | 양방향 | 설명 |
|------|------|--------|------|
| URL 파라미터 | ❌ | ❌ | 토큰이 URL에 노출됨 |
| Cookie | △ | ❌ | 도메인 제약, 보안 설정 복잡 |
| **postMessage** | ✅ | ✅ | 안전한 양방향 통신 |

### 통신 흐름

```
┌─────────────────────────────────────────────────────────────┐
│                        앱 (React Native)                     │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                     WebView                              │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │                   웹 (Next.js)                       │ │ │
│  │  │                                                      │ │ │
│  │  │  1. 페이지 로드 완료                                  │ │ │
│  │  │     └─▶ postMessage('READY')  ──────────────────┐   │ │ │
│  │  │                                                 │   │ │ │
│  │  │  2. 앱에서 토큰 수신                         ◀──┘   │ │ │
│  │  │     └─▶ window.addEventListener('message')          │ │ │
│  │  │     └─▶ localStorage에 저장                         │ │ │
│  │  │                                                      │ │ │
│  │  │  3. 토큰 갱신 시                                     │ │ │
│  │  │     └─▶ postMessage('TOKEN_REFRESHED')  ────────┐   │ │ │
│  │  │                                                 │   │ │ │
│  │  │  4. 로그아웃 시                              ◀──┘   │ │ │
│  │  │     └─▶ postMessage('LOGOUT')                       │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 메시지 프로토콜

### 메시지 타입

| 방향 | 타입 | 페이로드 | 설명 |
|------|------|----------|------|
| 웹 → 앱 | `READY` | - | 웹 로드 완료, 토큰 요청 |
| 앱 → 웹 | `AUTH_TOKEN` | `{ accessToken, refreshToken }` | 앱에서 토큰 전달 |
| 웹 → 앱 | `TOKEN_REFRESHED` | `{ accessToken, refreshToken }` | 웹에서 토큰 갱신됨 |
| 웹 → 앱 | `LOGOUT` | - | 로그아웃 요청 |

### 메시지 구조

```typescript
interface AppMessage {
  type: 'READY' | 'AUTH_TOKEN' | 'TOKEN_REFRESHED' | 'LOGOUT';
  payload?: {
    accessToken?: string;
    refreshToken?: string;
  };
}
```

## 작업 절차

### 1. 앱 환경 감지 유틸리티

앱 내 WebView에서 실행 중인지 감지하는 함수입니다.

#### src/utils/appBridge.ts

```typescript
/**
 * React Native WebView 환경인지 확인
 * WebView에서 실행될 때만 window.ReactNativeWebView가 존재함
 */
export const isInApp = (): boolean => {
  return (
    typeof window !== 'undefined' && window.ReactNativeWebView !== undefined
  );
};

/**
 * 앱에 메시지 전송
 * @param type - 메시지 타입
 * @param payload - 전달할 데이터 (optional)
 */
export const sendToApp = (type: string, payload?: unknown): void => {
  if (!isInApp()) return;

  window.ReactNativeWebView.postMessage(JSON.stringify({ type, payload }));
};

/**
 * 앱에서 메시지 수신 리스너 등록
 * @param callback - 메시지 수신 시 호출할 콜백
 * @returns cleanup 함수
 */
export const onAppMessage = (
  callback: (message: { type: string; payload?: unknown }) => void,
): (() => void) => {
  const handler = (event: MessageEvent) => {
    // 앱에서 전송한 메시지만 처리
    if (typeof event.data === 'object' && event.data.type) {
      callback(event.data);
    }
  };

  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
};
```

### 2. TypeScript 타입 선언

#### src/types/global.d.ts

```typescript
interface Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
}
```

### 3. 앱 인증 연동 Hook

앱과 토큰을 주고받는 핵심 로직입니다.

#### src/hooks/useAppAuth.ts

```typescript
import { useEffect, useCallback } from 'react';
import { isInApp, sendToApp, onAppMessage } from '@/utils/appBridge';

interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}

/**
 * 앱에서 토큰을 수신하고 저장하는 Hook
 * 앱 환경에서만 동작하며, 브라우저에서는 무시됨
 */
export const useAppAuth = (
  onTokenReceived?: (tokens: TokenPayload) => void,
) => {
  useEffect(() => {
    // 브라우저 환경에서는 실행하지 않음
    if (!isInApp()) return;

    // 앱에 준비 완료 알림 → 앱이 토큰을 전송해줌
    sendToApp('READY');

    // 앱에서 토큰 수신 리스너
    const unsubscribe = onAppMessage((message) => {
      if (message.type === 'AUTH_TOKEN' && message.payload) {
        const { accessToken, refreshToken } = message.payload as TokenPayload;

        // localStorage에 저장 (기존 웹 인증 로직과 호환)
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // 콜백 호출 (상태 업데이트 등)
        onTokenReceived?.({ accessToken, refreshToken });

        // 다른 컴포넌트에 알림 (optional)
        window.dispatchEvent(new Event('auth-updated'));
      }
    });

    return unsubscribe;
  }, [onTokenReceived]);
};

/**
 * 토큰 갱신 시 앱에 알림
 * API 인터셉터에서 토큰 갱신 후 호출
 */
export const notifyTokenRefresh = (
  accessToken: string,
  refreshToken: string,
): void => {
  if (!isInApp()) return;

  sendToApp('TOKEN_REFRESHED', { accessToken, refreshToken });
};

/**
 * 로그아웃 시 앱에 알림
 * 로그아웃 로직에서 호출
 */
export const notifyLogout = (): void => {
  if (!isInApp()) return;

  sendToApp('LOGOUT');
};
```

### 4. 루트 레이아웃에 Hook 적용

앱 진입 시 토큰을 수신하도록 설정합니다.

#### src/app/layout.tsx (또는 _app.tsx)

```typescript
'use client';

import { useAppAuth } from '@/hooks/useAppAuth';

function AppAuthProvider({ children }: { children: React.ReactNode }) {
  useAppAuth((tokens) => {
    console.log('앱에서 토큰 수신:', tokens.accessToken.slice(0, 20) + '...');
    // 필요시 전역 상태 업데이트 (Zustand, Redux 등)
  });

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AppAuthProvider>{children}</AppAuthProvider>
      </body>
    </html>
  );
}
```

### 5. API 인터셉터에서 토큰 갱신 알림

토큰 갱신 시 앱에도 새 토큰을 알려줍니다.

#### src/lib/api.ts (또는 axios 인터셉터)

```typescript
import { notifyTokenRefresh } from '@/hooks/useAppAuth';

// 토큰 갱신 로직 (기존 코드에 추가)
const refreshToken = async () => {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({
      refreshToken: localStorage.getItem('refreshToken'),
    }),
  });

  const { accessToken, refreshToken: newRefreshToken } = await response.json();

  // localStorage 업데이트
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', newRefreshToken);

  // 앱에 알림 (추가)
  notifyTokenRefresh(accessToken, newRefreshToken);

  return accessToken;
};
```

### 6. 로그아웃 시 앱 알림

로그아웃 로직에 앱 알림을 추가합니다.

#### src/hooks/useLogout.ts (또는 로그아웃 함수)

```typescript
import { notifyLogout } from '@/hooks/useAppAuth';

export const logout = () => {
  // 기존 로그아웃 로직
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  // 앱에 알림 (추가)
  notifyLogout();

  // 리다이렉트 등
  window.location.href = '/login';
};
```

## 테스트 방법

### 1. 앱 환경 시뮬레이션 (개발용)

브라우저 콘솔에서 테스트:

```javascript
// ReactNativeWebView 모킹
window.ReactNativeWebView = {
  postMessage: (msg) => console.log('앱으로 전송:', JSON.parse(msg)),
};

// 앱에서 토큰 전송 시뮬레이션
window.dispatchEvent(
  new MessageEvent('message', {
    data: {
      type: 'AUTH_TOKEN',
      payload: {
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
      },
    },
  }),
);
```

### 2. 실제 앱에서 테스트

1. 앱에서 로그인 후 WebView 진입
2. 개발자 도구에서 localStorage 확인
3. `accessToken`, `refreshToken`이 저장되었는지 확인

## 완료 조건

- [ ] `src/utils/appBridge.ts` 구현
- [ ] `src/types/global.d.ts` 타입 선언 추가
- [ ] `src/hooks/useAppAuth.ts` Hook 구현
- [ ] 루트 레이아웃에 `useAppAuth` 적용
- [ ] API 인터셉터에 `notifyTokenRefresh` 추가
- [ ] 로그아웃 로직에 `notifyLogout` 추가
- [ ] 앱과 연동 테스트

## 주의사항

1. **브라우저 환경 호환**: `isInApp()` 체크로 브라우저에서도 정상 동작
2. **기존 로직 유지**: localStorage 기반 인증 로직은 그대로 유지
3. **SSR 주의**: `window` 접근은 클라이언트에서만 (useEffect 내부)

## 참고

- 앱 사이드 문서: [06-webview-토큰-전달.md](./06-webview-토큰-전달.md)
