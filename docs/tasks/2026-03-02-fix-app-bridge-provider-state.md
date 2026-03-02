# AppBridgeProvider 구조 개선 및 버그 수정

## 문제 분석

### 현재 코드의 문제점

**파일**: `src/shared/components/providers/AppBridgeProvider.tsx`

```typescript
const AppBridgeContext = createContext<AppBridgeContextValue>({
  isApp: false,  // 기본값: false
});

export function AppBridgeProvider({ children }: AppBridgeProviderProps) {
  const isApp = appBridge.isInApp();  // 일반 변수 (useState 아님)
  // ...
}
```

**문제점**:
1. `isApp`이 `useState`가 아닌 일반 변수로 선언됨
2. Context에 상태 업데이트 함수가 없음
3. SSR → CSR 전환 시 값이 변경되어도 Context를 구독하는 컴포넌트들이 리렌더링되지 않음

### 근본적인 설계 문제

**`useAppBridge` Hook이 불필요한 이유**:

React Native WebView는 HTML 파싱 전에 `window.ReactNativeWebView`를 주입함:

```
┌─────────────────────────────────────────────────────────┐
│ React Native WebView 로딩 순서                           │
├─────────────────────────────────────────────────────────┤
│ 1. WebView 생성                                          │
│ 2. window.ReactNativeWebView 주입  ← HTML 로드 전        │
│ 3. URL 로드 시작                                         │
│ 4. HTML 파싱                                             │
│ 5. JavaScript 실행 (React 앱)                            │
│    └─ appBridge.isInApp() → true (이미 주입됨)           │
└─────────────────────────────────────────────────────────┘
```

따라서 `appBridge.isInApp()`은:
- CSR 첫 렌더링부터 올바른 값을 반환
- 런타임에 값이 변경되지 않음 (앱이면 앱, 웹이면 웹)
- 어디서든 import해서 직접 호출 가능

**결론**: Context로 `isApp` 상태를 관리할 필요가 없음. 직접 `appBridge.isInApp()` 호출하면 됨.

## 영향받는 기능

### 1. useAutoLogout Hook

**파일**: `src/shared/hooks/useAutoLogout.ts`

```typescript
const { isApp } = useAppBridge();

useEffect(() => {
  if (isApp) return;  // ← isApp이 항상 false라서 이 조건이 작동 안 함

  if (!authService.isAuthenticated()) {
    router.push('/login');  // ← 앱 환경에서도 로그인 페이지로 리다이렉트됨
  }
}, [isApp]);
```

**피해**:
- 앱 WebView 환경에서 토큰이 아직 동기화되지 않은 상태에서 `/login`으로 강제 리다이렉트
- 앱에서 정상적인 인증 플로우가 중단됨

### 2. AppBridgeProvider 내부 이벤트 구독

```typescript
useEffect(() => {
  if (!isApp) return;  // ← isApp이 false라서 이벤트 구독이 안 됨

  const unsubLogin = authService.onLogin((tokens) => {
    appBridge.sendToApp('SYNC_TOKEN_TO_APP', tokens);  // ← 실행 안 됨
  });
  // ...
}, [isApp]);
```

**피해**:
- 웹뷰 내에서 로그인해도 앱에 토큰이 동기화되지 않음
- 로그아웃 이벤트가 앱에 전달되지 않음
- 토큰 갱신이 앱에 동기화되지 않음

### 3. 추가 문제: useAutoLogout 위치

**파일**: `src/app/(home)/layout.tsx`

```typescript
export default function HomePageLayout({ children, stack }: HomeLayoutProps) {
  useAutoLogout();  // ← AppBridgeProvider 바깥에서 호출됨!

  return (
    <AppAuthProvider>
      <AppBridgeProvider>  // ← useAutoLogout은 이 Context에 접근 못함
        ...
      </AppBridgeProvider>
    </AppAuthProvider>
  );
}
```

`useAutoLogout()`이 `AppBridgeProvider` 바깥에서 호출되어 Context 기본값 `false`만 받음.

## 수정 방안

### useAppBridge Hook 제거 + 직접 호출

**AppBridgeProvider** - Context 제거, 이벤트 구독 용도로만 사용:

```typescript
'use client';

import { useEffect, ReactNode } from 'react';
import { authService } from '@/shared/lib/auth';
import { appBridge } from '@/shared/lib/appBridge';

interface AppBridgeProviderProps {
  children: ReactNode;
}

export function AppBridgeProvider({ children }: AppBridgeProviderProps) {
  // Auth 이벤트 구독 → 앱에 알림
  useEffect(() => {
    if (!appBridge.isInApp()) return;  // 직접 호출

    const unsubLogin = authService.onLogin((tokens) => {
      appBridge.sendToApp('SYNC_TOKEN_TO_APP', tokens);
    });

    const unsubLogout = authService.onLogout(() => {
      appBridge.sendToApp('LOGOUT');
    });

    const unsubRefresh = authService.onTokenRefresh((tokens) => {
      appBridge.sendToApp('SYNC_TOKEN_TO_APP', tokens);
    });

    return () => {
      unsubLogin();
      unsubLogout();
      unsubRefresh();
    };
  }, []);

  return <>{children}</>;
}
```

**useAutoLogout** - Context 대신 직접 호출:

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/shared/lib/auth';
import { appBridge } from '@/shared/lib/appBridge';
import { useMockEnvironment } from './useMockEnvironment';

export function useAutoLogout() {
  const router = useRouter();
  const isMockEnvironment = useMockEnvironment();

  useEffect(() => {
    if (isMockEnvironment) return;
    if (appBridge.isInApp()) return;  // 직접 호출

    if (!authService.isAuthenticated()) {
      router.push('/login');
    }
  }, [router, isMockEnvironment]);
}
```

### 장점

| 항목 | 설명 |
|------|------|
| 복잡도 | 낮음 - Context 관리 불필요 |
| 리렌더링 | 없음 - Context 업데이트로 인한 리렌더링 제거 |
| 위치 제약 | 없음 - Provider 내부/외부 상관없이 동작 |
| 타이밍 이슈 | 없음 - useEffect/useLayoutEffect 순서 무관 |

## 변경 사항 요약

### 삭제할 것
- `useAppBridge` Hook
- `AppBridgeContext`
- `AppBridgeContextValue` 인터페이스

### 수정할 것

| 파일 | 변경 내용 |
|------|----------|
| `AppBridgeProvider.tsx` | Context 제거, `appBridge.isInApp()` 직접 호출 |
| `useAutoLogout.ts` | `useAppBridge()` → `appBridge.isInApp()` 직접 호출 |

## 체크리스트

- [ ] `useAppBridge` 사용처 전체 검색
- [ ] `AppBridgeProvider`에서 Context 제거
- [ ] `AppBridgeProvider`에서 이벤트 구독 시 `appBridge.isInApp()` 직접 호출
- [ ] `useAutoLogout`에서 `appBridge.isInApp()` 직접 호출
- [ ] 기타 사용처 `appBridge.isInApp()` 직접 호출로 변경
- [ ] 앱 환경에서 정상 동작 확인
- [ ] 웹 환경에서 정상 동작 확인

## 테스트 시나리오

1. **웹 브라우저**:
   - 토큰 없으면 `/login`으로 리다이렉트 확인
   - 로그인/로그아웃 정상 동작 확인

2. **React Native WebView**:
   - 앱 환경 감지 (`appBridge.isInApp() === true`)
   - 토큰 없어도 `/login`으로 리다이렉트 안 됨
   - 로그인 시 앱에 `SYNC_TOKEN_TO_APP` 메시지 전송
   - 로그아웃 시 앱에 `LOGOUT` 메시지 전송
   - 토큰 갱신 시 앱에 동기화
