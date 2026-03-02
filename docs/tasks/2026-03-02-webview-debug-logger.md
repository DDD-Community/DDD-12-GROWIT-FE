# WebView 디버그 로거 구현

## 개요

WebView 환경에서 발생하는 클라이언트 로그를 Next.js 서버 터미널에서 확인할 수 있는 디버깅 유틸리티 구현.

## 목적

- React Native WebView 내부의 `console.log`는 Next.js 터미널에서 확인 불가
- Safari/Chrome 원격 디버깅 설정 없이도 로그 확인 가능
- 개발 환경에서만 동작, 프로덕션에서는 완전히 제거됨

## 구현 범위

### 1. API Route 생성

**경로**: `src/app/api/debug/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // 프로덕션에서는 404 반환
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const { level, message, data } = await request.json();
    const timestamp = new Date().toISOString().slice(11, 23);

    console.log(`[${timestamp}][WebView:${level}]`, message, data ?? '');

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
```

### 2. 클라이언트 유틸리티 생성

**경로**: `src/shared/lib/debug.ts`

```typescript
type LogLevel = 'info' | 'warn' | 'error';

const sendLog = (level: LogLevel, message: string, data?: unknown) => {
  fetch('/api/debug', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ level, message, data }),
  }).catch(() => {
    // 실패해도 무시 (디버깅용이므로)
  });
};

// Tree-shaking을 위한 조건부 export
export const debugLog =
  process.env.NODE_ENV === 'development'
    ? (message: string, data?: unknown) => sendLog('info', message, data)
    : () => {};

export const debugWarn =
  process.env.NODE_ENV === 'development'
    ? (message: string, data?: unknown) => sendLog('warn', message, data)
    : () => {};

export const debugError =
  process.env.NODE_ENV === 'development'
    ? (message: string, data?: unknown) => sendLog('error', message, data)
    : () => {};
```

## 사용 예시

```typescript
import { debugLog, debugError } from '@/shared/lib/debug';

// AppAuthProvider.tsx
const tokens = await appBridge.waitForAppToken(tokenTimeout);
debugLog('토큰받음', tokens);

// 에러 발생 시
debugError('Token wait failed', error);
```

## 동작 방식

```
┌─────────────────────┐     POST /api/debug      ┌─────────────────────┐
│   WebView (Client)  │ ──────────────────────▶  │   Next.js Server    │
│                     │                          │                     │
│   debugLog('msg')   │                          │   console.log(...)  │
└─────────────────────┘                          └─────────────────────┘
                                                          │
                                                          ▼
                                                 ┌─────────────────────┐
                                                 │   터미널 출력        │
                                                 │   [HH:mm:ss.SSS]    │
                                                 │   [WebView:info]    │
                                                 │   토큰받음 {...}    │
                                                 └─────────────────────┘
```

## 환경별 동작

| 환경 | `debugLog()` 호출 시 | API Route | 번들 포함 |
|------|---------------------|-----------|----------|
| 개발 | fetch 요청 발생 | 로그 출력 | O |
| 프로덕션 | 빈 함수 (no-op) | 404 반환 | X (tree-shaking) |

## 파일 구조

```
src/
├── app/
│   └── api/
│       └── debug/
│           └── route.ts          # API 엔드포인트
└── shared/
    └── lib/
        └── debug.ts              # 클라이언트 유틸리티
```

## 체크리스트

- [ ] `src/app/api/debug/route.ts` 생성
- [ ] `src/shared/lib/debug.ts` 생성
- [ ] 기존 `console.log` 중 WebView 디버깅 필요한 부분 `debugLog`로 교체
- [ ] 개발 환경에서 테스트
- [ ] 프로덕션 빌드 후 번들에서 제거되었는지 확인
