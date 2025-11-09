# MSW (Mock Service Worker) Setup

이 디렉토리는 MSW를 사용한 API 모킹 설정을 포함합니다.

## 📁 구조

- `browser.ts` - 브라우저 환경용 MSW 설정
- `server.ts` - Next.js 서버 환경용 MSW 설정
- `handlers.ts` - API 모킹 핸들러 정의
- `mswClientProvider.tsx` - 클라이언트 측 MSW Provider 컴포넌트
- `domain/` - 도메인별 모킹 핸들러

## 🚀 사용 방법

### Provider 위치

MSW Provider는 `src/app/layout.tsx`에 설정되어 있습니다:

```typescript
// src/app/layout.tsx
import MSWClientProvider from '../../mocks/mswClientProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <MSWClientProvider>
          {children}
        </MSWClientProvider>
      </body>
    </html>
  );
}
```

### 서버 사이드 초기화

서버 사이드 MSW는 `src/app/layout.tsx` 최상단에서 초기화됩니다:

```typescript
// src/app/layout.tsx
import('../../mocks/server').then(async () => {
  await startMSWServer();
});
```

## ⚙️ 환경 설정

MSW는 개발 환경에서만 활성화됩니다:
- `NODE_ENV=development` 일 때 자동으로 활성화
- 프로덕션 빌드에서는 자동으로 제외

## 📝 새로운 핸들러 추가

1. `domain/` 폴더에 도메인별 핸들러 파일 생성
2. `handlers.ts`에 핸들러 import 및 추가

```typescript
// domain/user.ts
export const userHandlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(userData);
  })
];

// handlers.ts
import { userHandlers } from './domain/user';
export const handlers = [...existingHandlers, ...userHandlers];
```

## 🔍 주의사항

- MSW는 개발 환경에서만 사용하세요
- 실제 API와 동일한 응답 형식을 유지하세요
- 테스트 데이터는 실제 데이터와 구조가 일치해야 합니다