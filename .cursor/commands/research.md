# /research — 요구사항 분석 & FE 변경 영향도 파악

## 개요

growit-lead 오케스트레이터에서 위임받아 FE 코드베이스를 분석한다.
티켓 요구사항을 기반으로 변경 영향도를 파악하고 리서치 결과를 산출한다.

---

## 입력

오케스트레이터가 주입하는 컨텍스트:

- `TICKET_ID`: 티켓 ID (예: DEVS-11)
- `TICKET_TITLE`: 티켓 제목
- `TICKET_TYPE`: feat | fix | modify
- `TICKET_SUMMARY`: 요구사항 요약
- `TICKET_REQUIREMENTS`: 상세 요구사항

---

## 워크플로우

### Step 1: 영향 도메인 식별

요구사항을 분석하여 영향받는 FSD 도메인 모듈을 식별한다.

```
도메인 목록: todo, goal, advice, auth, retrospects, home, mypage, onboard, customerEvent
경로:
  - feature: src/feature/{domain}/
  - model: src/model/{domain}/
  - composite: src/composite/{domain}/
  - app: src/app/(home)/{domain}/ 또는 src/app/(auth)/{domain}/
```

### Step 2: 현재 상태 분석

영향받는 각 도메인에 대해:

**컴포넌트 분석**
- Feature 컴포넌트: `src/feature/{domain}/components/`
- Composite 컴포넌트: `src/composite/{domain}/`
- 폼 컴포넌트: `src/feature/{domain}/forms/`
- 현재 UI 구조와 사용 중인 디자인 시스템 컴포넌트

**상태 관리 분석**
- API 호출: `src/model/{domain}/api.ts`
- Query/Mutation: `src/model/{domain}/queries.ts`
- Query Keys: `src/model/{domain}/queryKeys.ts`
- Context: `src/model/{domain}/*/context.tsx`
- 타입 정의: `src/model/{domain}/types.ts` 또는 `src/shared/type/`

**라우트 분석**
- 페이지: `src/app/(home)/{domain}/` 또는 `src/app/(auth)/{domain}/`
- 레이아웃: 관련 `layout.tsx` 파일

**디자인 시스템 분석**
- 사용 중인 `shared/components/` 컴포넌트 목록
- 커스텀 스타일링 (CSS 변수, Tailwind 클래스)

### Step 3: 크로스 도메인 의존성 확인

- 다른 도메인의 Context를 사용하는 곳 확인
- 공유 타입(`shared/type/`)을 참조하는 곳 확인
- `composite/`에서 여러 `feature/`를 조합하는 곳 확인

### Step 4: BE API 계약 확인

- BE에서 변경되는 API의 현재 FE 사용처 확인
- Request/Response 타입 변경 영향 평가
- API 엔드포인트 변경 시 `model/{domain}/api.ts` 수정 필요 여부

### Step 5: 디자인 시스템 영향 확인

- 기존 디자인 시스템 컴포넌트로 구현 가능한지 판단
- 새로운 컴포넌트 필요 여부
- Figma 디자인과의 매핑

---

## 산출물

파일: `.research/{TICKET_ID}/research.md`

```markdown
# Research: {TICKET_ID} — {TICKET_TITLE}

## 요약
{한 줄 요약}

## 영향 도메인
- [ ] {domain1} — {영향 설명}
- [ ] {domain2} — {영향 설명}

## 현재 상태 분석

### 컴포넌트
{관련 컴포넌트 목록, 구조}

### 상태 관리
{Query, Mutation, Context 목록}

### 라우트
{관련 페이지, 레이아웃}

### 디자인 시스템
{사용 중인 shared 컴포넌트 목록}

## 변경 영향 평가
- 신규 생성: {새로 만들어야 할 것}
- 수정: {기존 코드 변경사항}
- 삭제: {제거할 것}

## BE API 의존성
- {API 변경에 따른 FE 수정사항}

## 리스크
- {리스크 항목 1}
- {리스크 항목 2}

## 참고 파일
- {중요 파일 경로 목록}
```

---

## 주의사항

- **코드를 수정하지 않는다.** 읽기 전용 분석만 수행.
- FSD 계층 경계를 명확히 식별한다.
- 기존 패턴을 존중한다 — 새로운 패턴을 도입하지 않는다.
- BE API 변경이 있을 경우 Request/Response 타입 영향을 반드시 확인한다.
