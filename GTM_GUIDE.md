# Google Tag Manager (GTM) 가이드

## 개요

이 프로젝트에서는 Google Tag Manager를 사용하여 웹사이트의 사용자 행동을 추적하고 분석합니다.

## 설정된 구조

### 1. 기본 설정

- **GTM ID**: `GTM-W8GCRPWX`
- **패키지**: `@next/third-parties/google`
- **위치**: `src/app/layout.tsx`

### 2. 파일 구조

```
src/shared/
├── lib/gtm.ts                    # GTM 유틸리티 함수
├── hooks/useGTM.ts              # GTM 커스텀 훅들
├── components/analytics/
│   └── GTMProvider.tsx          # GTM 컨텍스트 프로바이더
└── constants/gtm-events.ts      # 이벤트 상수 정의 (enum)
```

## 사용 방법

### 1. 기본 이벤트 전송

```typescript
import { gtmEvent, gtmCustomEvent, gtmPageView } from '@/shared/lib/gtm';
import { GTM_EVENTS, GTM_PARAMETERS } from '@/shared/constants/gtm-events';

// 커스텀 이벤트 전송 (enum 사용)
gtmCustomEvent(GTM_EVENTS.BUTTON_CLICK, {
  [GTM_PARAMETERS.BUTTON_NAME]: 'signup_button',
  [GTM_PARAMETERS.BUTTON_LOCATION]: 'header',
});

// 페이지뷰 이벤트 전송
gtmPageView('/dashboard', 'Dashboard Page');
```

### 2. 커스텀 훅 사용

```typescript
import { useGTMActions, useGTMEvent } from '@/shared/hooks/useGTM';
import { GTM_EVENTS } from '@/shared/constants/gtm-events';

function MyComponent() {
  const { trackButtonClick, trackFormSubmit, trackTodoAction } = useGTMActions();
  const { sendEvent } = useGTMEvent();

  const handleButtonClick = () => {
    trackButtonClick('my_button', 'main_page');
  };

  const handleTodoComplete = (todoId: string) => {
    trackTodoAction('complete', todoId);
  };

  const handleCustomEvent = () => {
    sendEvent(GTM_EVENTS.BUTTON_CLICK, { custom_param: 'value' });
  };

  return (
    <div>
      <button onClick={handleButtonClick}>클릭 추적</button>
      <button onClick={() => handleTodoComplete('todo-123')}>투두 완료</button>
      <button onClick={handleCustomEvent}>커스텀 이벤트</button>
    </div>
  );
}
```

### 3. GTM Provider 사용

```typescript
import { GTMProvider } from '@/shared/components/analytics/GTMProvider';

function MyApp({ children, userId, userProperties }) {
  return (
    <GTMProvider userId={userId} userProperties={userProperties}>
      {children}
    </GTMProvider>
  );
}
```

## 이벤트 종류

### 1. 자동 추적 이벤트

- **페이지뷰**: 페이지 이동 시 자동으로 전송
- **사용자 속성**: 사용자 정보 변경 시 자동으로 전송

### 2. 수동 추적 이벤트

- **버튼 클릭**: `trackButtonClick(buttonName, location)` - enum 기반 파라미터 사용
- **폼 제출**: `trackFormSubmit(formName, success)` - enum 기반 파라미터 사용
- **투두 액션**: `trackTodoAction(action, todoId)` - enum 기반 이벤트 매핑
- **목표 완료**: `trackGoalComplete(goalId, goalName, value)` - enum 기반 파라미터 사용
- **네비게이션**: `trackNavigation(from, to)` - enum 기반 파라미터 사용

## GTM 대시보드 설정

### 1. 태그 설정

GTM 대시보드에서 다음과 같은 태그들을 설정하세요:

#### Google Analytics 4 (GA4)

- **태그 유형**: Google Analytics: GA4 이벤트
- **측정 ID**: GA4 측정 ID 입력
- **이벤트 이름**: `{{Event}}`
- **이벤트 매개변수**: 동적으로 설정

#### Facebook Pixel

- **태그 유형**: Facebook Pixel
- **픽셀 ID**: Facebook 픽셀 ID 입력
- **이벤트**: `{{Event}}`

### 2. 트리거 설정

- **모든 페이지**: 페이지뷰 이벤트용
- **커스텀 이벤트**: 특정 이벤트용
- **클릭**: 버튼 클릭용

### 3. 변수 설정

- **내장 변수**: 페이지 URL, 페이지 제목 등
- **사용자 정의 변수**: 이벤트 매개변수들

## 환경 변수 설정

`.env.local` 파일에 다음을 추가하세요:

```env
NEXT_PUBLIC_GTM_ID=GTM-W8GCRPWX
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Enum 기반 이벤트 관리

### 1. 이벤트 상수 사용

```typescript
import { GTM_EVENTS, GTM_PARAMETERS, GTM_CATEGORIES, GTM_LABELS } from '@/shared/constants/gtm-events';

// 이벤트 이름
GTM_EVENTS.BUTTON_CLICK;
GTM_EVENTS.TODO_COMPLETE;
GTM_EVENTS.GOAL_CREATE;

// 이벤트 파라미터
GTM_PARAMETERS.BUTTON_NAME;
GTM_PARAMETERS.TODO_ID;
GTM_PARAMETERS.GOAL_VALUE;

// 이벤트 카테고리
GTM_CATEGORIES.USER_ACTION;
GTM_CATEGORIES.CONVERSION;

// 이벤트 라벨
GTM_LABELS.BUTTON;
GTM_LABELS.TODO_ACTION;
```

## 디버깅

### 1. 개발자 도구

- 브라우저 개발자 도구 → Network 탭에서 GTM 요청 확인
- Console에서 `window.dataLayer` 확인

### 2. GTM 미리보기 모드

- GTM 대시보드에서 미리보기 모드 활성화
- 실시간으로 이벤트 전송 확인

### 3. Google Analytics 실시간 보고서

- GA4 실시간 보고서에서 이벤트 확인

## 모범 사례

### 1. 이벤트 명명 규칙

- **Enum 사용**: `GTM_EVENTS.BUTTON_CLICK` vs `'button_click'`
- **타입 안전성**: 컴파일 타임에 오타 방지
- **자동 완성**: IDE에서 자동 완성 지원
- **일관성**: 하드코딩된 문자열 대신 상수 사용

### 2. 매개변수 일관성

- **Enum 기반 파라미터**: `GTM_PARAMETERS.BUTTON_NAME` 사용
- **타입 안전성**: 컴파일 타임에 파라미터 오타 방지
- **일관성**: 동일한 이벤트는 항상 동일한 매개변수 사용
- **필수 매개변수**: 항상 포함하도록 enum으로 강제

### 3. 성능 고려사항

- 불필요한 이벤트 전송 방지
- 배치 전송 고려 (필요시)

### 4. 개인정보 보호

- 개인정보가 포함된 데이터는 전송하지 않음
- 사용자 동의 확인 후 추적 시작

## 문제 해결

### 1. 이벤트가 전송되지 않는 경우

- `window.dataLayer` 존재 여부 확인
- GTM ID가 올바른지 확인
- 네트워크 연결 상태 확인

### 2. 중복 이벤트 전송

- 이벤트 전송 조건 확인
- 중복 방지 로직 추가

### 3. 성능 이슈

- 이벤트 전송 빈도 조절
- 불필요한 이벤트 제거
