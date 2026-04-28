---
name: plan
description: FE 구현 계획 수립 (FSD 아키텍처, 컴포넌트, API 연동)
context: fork
allowed-tools: Read, Grep, Glob, Bash, Write, Edit
---
# /plan — FE 구현 계획 수립

## 개요

리서치 결과를 기반으로 FE 구현 계획을 수립한다.
컴포넌트 설계, 상태 관리, API 연동, 스타일링을 포함한 체계적 계획을 산출한다.

---

## 입력

- `TICKET_ID`: 티켓 ID
- 리서치 결과: `.research/{TICKET_ID}/research.md`
- 아키텍처 규칙: `.ai/rules/architecture.md`
- 코딩 표준: `.ai/rules/coding-standards.md`

---

## 워크플로우

### Step 1: 리서치 결과 로드

`.research/{TICKET_ID}/research.md`를 읽고 영향 범위를 확인한다.

### Step 2: 컴포넌트 설계

각 컴포넌트에 대해:

```
- 컴포넌트 이름 (PascalCase)
- FSD 계층 위치 (feature, composite, shared)
- Props 인터페이스
- 사용할 디자인 시스템 컴포넌트
- 클라이언트/서버 컴포넌트 구분
```

**디자인 시스템 활용 우선순위:**
1. `shared/components/` 기존 컴포넌트 사용
2. 기존 컴포넌트 확장 (props 추가)
3. 새 컴포넌트 생성 (최후 수단)

### Step 3: 상태 관리 설계

**Server State (TanStack Query):**
- 새 Query/Mutation 정의
- Query Key 팩토리 업데이트
- API 함수 추가/수정

**Client State (React Context):**
- Context 추가/수정 여부
- Split State/Actions 패턴 적용

**Form State (React Hook Form + Zod):**
- Zod 스키마 정의
- Validation 규칙 (min, max, required, pattern)

### Step 4: API 연동 계획

```
- API 엔드포인트 (Method + Path)
- Request 타입 (필드, 검증)
- Response 타입 (필드)
- model/{domain}/api.ts 변경사항
- model/{domain}/queries.ts 변경사항
```

### Step 5: 스타일링 계획

- 사용할 Tailwind 클래스
- CSS 변수 토큰 (색상, 타이포그래피)
- 반응형 브레이크포인트 (모바일 우선)
- 애니메이션 (Motion 라이브러리)

### Step 6: 구현 순서 결정

엄격한 순서를 따른다:

```
1. 타입 정의
   a. shared/type/ 공통 타입 (필요 시)
   b. model/{domain}/types.ts 도메인 타입

2. 데이터 계층 (model/)
   a. api.ts — API 호출 함수
   b. queryKeys.ts — Query Key 팩토리
   c. queries.ts — queryOptions & mutationOptions
   d. context.tsx — React Context (필요 시)

3. 공유 컴포넌트 (shared/)
   a. 새 디자인 시스템 컴포넌트 (필요 시)
   b. 기존 컴포넌트 수정 (필요 시)

4. 기능 컴포넌트 (feature/)
   a. components/ — 도메인 UI 컴포넌트
   b. hooks/ — 도메인 커스텀 훅
   c. forms/ — 도메인 폼
   d. index.ts — Public API 업데이트

5. 조합 컴포넌트 (composite/)
   a. 페이지별 조합 컴포넌트

6. 페이지 (app/)
   a. page.tsx — 라우트 페이지
   b. layout.tsx — 레이아웃 (필요 시)
```

---

## 산출물

파일: `.plan/{TICKET_ID}/plan.md`

```markdown
# Plan: {TICKET_ID} — {TICKET_TITLE}

## 요약
{구현 범위 한 줄 요약}

## 컴포넌트 설계

### {ComponentName} (신규/수정)
- 계층: feature/{domain}/components/
- Props:
  | Prop | Type | Required | 설명 |
  |------|------|----------|------|
  | ... | ... | ... | ... |
- 디자인 시스템: Button(variant="primary"), InputField, ...

## 상태 관리

### TanStack Query
- {Query/Mutation 정의}

### React Context
- {Context 변경사항}

### Form (Zod)
- {Zod 스키마 정의}

## API 연동

### {Method} {Path}
- Request: { ... }
- Response: { ... }

## 구현 체크리스트

### 1. 타입 정의
- [ ] `{path}/{File}.ts` — {설명}

### 2. 데이터 계층
- [ ] `{path}/{File}.ts` — {설명}

### 3. 공유 컴포넌트
- [ ] `{path}/{File}.tsx` — {설명}

### 4. 기능 컴포넌트
- [ ] `{path}/{File}.tsx` — {설명}

### 5. 조합 컴포넌트
- [ ] `{path}/{File}.tsx` — {설명}

### 6. 페이지
- [ ] `{path}/page.tsx` — {설명}

## 예상 파일 변경
- 신규: {N}개
- 수정: {N}개
- 삭제: {N}개
```

---

## 주의사항

- **코드를 작성하지 않는다.** 계획만 수립.
- 기존 코드 패턴을 분석하여 일관된 패턴을 유지한다.
- FSD 계층 경계를 엄격히 준수한다.
- 디자인 시스템 컴포넌트를 최대한 활용하는 방향으로 계획한다.
- BE API 변경사항과의 호환성을 고려한다.
