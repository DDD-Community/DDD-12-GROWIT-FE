---
name: review
description: FE 코드 리뷰 & 품질 게이트 검수
context: fork
allowed-tools: Read, Grep, Glob, Bash
---
# /review — FE 코드 리뷰 & 품질 게이트 검수

## 개요

구현된 코드를 리뷰하고 품질 게이트를 통과하는지 검수한다.
**모든 게이트를 통과해야 PASS.** 하나라도 실패하면 FAIL → PR 생성 불가.

---

## 워크플로우

### Step 1: 변경 파일 수집

```bash
cd /Users/sagwangjin/Desktop/growit-test/DDD-12-GROWIT-FE

# main 대비 변경 파일
git diff --name-only main...HEAD

# 변경 통계
git diff --stat main...HEAD
```

변경된 파일 목록을 수집하고, 각 파일을 읽어 리뷰를 수행한다.
변경 파일이 없으면 리뷰를 스킵한다.

---

## Gate 1: FSD 아키텍처 준수 (Architecture Compliance)

> **자동 검증 필수** — 코드 검색으로 위반 탐지

### 1-1. 계층 참조 위반 탐지

**feature → feature 참조 금지:**

```bash
# feature 내에서 다른 feature import 탐지
grep -rn "from '@/feature/" src/feature/ | grep -v "from '@/feature/$(dirname)" || true
```

변경된 `feature/` 파일에서 다른 `feature/` 모듈을 import하는지 확인.

**shared → 상위 계층 참조 금지:**

```bash
# shared에서 feature, composite, app, model import 탐지
grep -rn "from '@/feature/\|from '@/composite/\|from '@/app/\|from '@/model/" src/shared/ || true
```

**model → 상위 계층 참조 금지:**

```bash
# model에서 feature, composite, app import 탐지
grep -rn "from '@/feature/\|from '@/composite/\|from '@/app/" src/model/ || true
```

**composite → composite 참조 금지:**

```bash
# composite 내에서 다른 composite import 탐지
grep -rn "from '@/composite/" src/composite/ | grep -v "$(dirname)" || true
```

### 1-2. API 직접 호출 금지

```bash
# feature/, composite/, app/에서 apiClient 직접 import 탐지
grep -rn "from '@/shared/lib/apiClient'" src/feature/ src/composite/ src/app/ || true

# axios 직접 import 탐지 (model/api.ts 제외)
grep -rn "import axios\|from 'axios'" src/ --include="*.ts" --include="*.tsx" | grep -v "model/.*/api.ts\|shared/lib/apiClient\|shared/lib/mockApiClient" || true
```

**판정:** 위반 0건 → PASS, 1건 이상 → FAIL (위반 목록 첨부)

---

## Gate 2: 디자인 시스템 준수 (Design System Compliance)

### 2-1. HTML 기본 요소 직접 사용 탐지

변경된 `feature/`, `composite/` 파일에서 디자인 시스템 대신 HTML 기본 요소를 사용하는지 확인:

```bash
# <button> 직접 사용 탐지 (Button 컴포넌트 대신)
grep -rn "<button" src/feature/ src/composite/ --include="*.tsx" || true

# <input> 직접 사용 탐지 (InputField 컴포넌트 대신)
grep -rn "<input" src/feature/ src/composite/ --include="*.tsx" | grep -v "type=\"hidden\"" || true

# <select> 직접 사용 탐지
grep -rn "<select" src/feature/ src/composite/ --include="*.tsx" || true

# <textarea> 직접 사용 탐지
grep -rn "<textarea" src/feature/ src/composite/ --include="*.tsx" || true
```

### 2-2. 하드코딩된 색상 탐지

```bash
# 인라인 스타일에 하드코딩된 hex 색상 탐지
grep -rn "style={{" src/feature/ src/composite/ --include="*.tsx" || true

# Tailwind 클래스 내 하드코딩된 색상 탐지 (bg-[#xxx], text-[#xxx])
grep -rn "bg-\[#\|text-\[#\|border-\[#" src/feature/ src/composite/ --include="*.tsx" || true
```

### 2-3. Radix UI 직접 import 탐지

```bash
# Radix UI를 shared/components/ui/ 를 거치지 않고 직접 import
grep -rn "from '@radix-ui/" src/feature/ src/composite/ --include="*.tsx" --include="*.ts" || true
```

**판정:** 중대 위반 → FAIL, 경미한 위반 → WARN

---

## Gate 3: 코드 품질 (Code Quality)

### TypeScript 준수

```bash
# any 타입 사용 탐지 (변경된 파일만)
grep -rn ": any\|as any\|<any>" src/ --include="*.ts" --include="*.tsx" || true

# @ts-ignore 사용 탐지
grep -rn "@ts-ignore\|@ts-nocheck" src/ --include="*.ts" --include="*.tsx" || true
```

### React 안티패턴 탐지

```bash
# useEffect 내 직접 fetch/axios 호출 탐지
grep -rn "useEffect.*fetch\|useEffect.*axios\|useEffect.*apiClient" src/ --include="*.tsx" || true

# React.FC 사용 탐지 (금지)
grep -rn "React\.FC\|React\.FunctionComponent" src/ --include="*.tsx" || true

# useState로 서버 상태 관리 패턴 탐지 (수동 확인 필요)
```

### 일반 품질

- [ ] 컴포넌트 파일 200줄 이하인가?
- [ ] Props 인터페이스가 명시적으로 정의되어 있는가?
- [ ] 조건부 렌더링이 적절한가? (중첩 삼항 금지)
- [ ] key prop이 고유한가? (index 사용 주의)
- [ ] console.log/debugger가 남아있지 않은가?

```bash
# console.log 잔류 탐지
grep -rn "console\.\(log\|debug\|warn\|error\)" src/ --include="*.ts" --include="*.tsx" | grep -v "node_modules\|\.test\.\|\.spec\." || true
```

**판정:** 중대 위반 → FAIL, 경미한 위반 → WARN

---

## Gate 4: 네이밍 컨벤션 (Naming Convention)

변경된 파일만 대상으로 확인:

| 유형 | 규칙 |
|------|------|
| 컴포넌트 파일 | PascalCase (`.tsx`) |
| 훅 파일 | `use` 접두사 + camelCase (`.ts`) |
| 유틸리티 파일 | camelCase (`.ts`) |
| 타입 파일 | PascalCase (`.ts`) |
| 디렉토리 | camelCase |
| Props 인터페이스 | `{ComponentName}Props` 또는 인라인 |
| Context 훅 | `use{Name}State`, `use{Name}Actions` |

**검증 방법:** 변경된 파일의 이름, 경로, export가 위 규칙과 일치하는지 확인.

**판정:** 위반 0건 → PASS, 1건 이상 → WARN

---

## Gate 5: 접근성 & 성능 (A11y & Performance)

### 접근성

- [ ] 이미지에 `alt` 속성이 있는가?
- [ ] 인터랙티브 요소에 적절한 `aria-label`이 있는가?
- [ ] 폼 요소에 `label`이 연결되어 있는가?

### 성능

- [ ] 불필요한 리렌더를 유발하는 코드가 없는가?
- [ ] 큰 리스트에 가상화가 적용되어 있는가? (필요 시)
- [ ] 이미지가 `next/image`를 사용하는가?
- [ ] `'use client'`가 필요한 곳에만 있는가? (불필요한 클라이언트 컴포넌트 금지)

**판정:** 중대 위반 → WARN (FAIL은 아님)

---

## Gate 6: 빌드 검증 (Build Verification)

> **핵심: 로컬에서 빌드를 실행하여 배포 가능 상태를 확인한다.**

### 6-1. 린트 체크

```bash
cd /Users/sagwangjin/Desktop/growit-test/DDD-12-GROWIT-FE
yarn lint
```

- **PASS**: exit code 0
- **FAIL**: ESLint 에러 목록 출력

### 6-2. 타입 체크

```bash
cd /Users/sagwangjin/Desktop/growit-test/DDD-12-GROWIT-FE
npx tsc --noEmit
```

- **PASS**: 타입 에러 없음
- **FAIL**: 타입 에러 목록 출력

### 6-3. 빌드

```bash
cd /Users/sagwangjin/Desktop/growit-test/DDD-12-GROWIT-FE
yarn build
```

- **PASS**: 빌드 성공
- **FAIL**: 빌드 에러 출력

**판정:** 3개 모두 PASS → PASS, 하나라도 FAIL → 전체 FAIL

---

## 산출물

### 전체 PASS

```
## Review Result: PASS

| # | Gate | Status |
|---|------|--------|
| 1 | FSD Architecture | PASS |
| 2 | Design System | PASS |
| 3 | Code Quality | PASS |
| 4 | Naming Convention | PASS |
| 5 | A11y & Performance | PASS |
| 6 | Build Verification | PASS |

### Build Checks
- lint: PASS
- tsc: PASS
- build: PASS

→ PR 생성 가능. `/pr` 실행하세요.
```

### FAIL

```
## Review Result: FAIL

| # | Gate | Status | Issues |
|---|------|--------|--------|
| 1 | FSD Architecture | FAIL | feature 간 참조 위반 1건 |
| 2 | Design System | WARN | <button> 직접 사용 2건 |
| 3 | Code Quality | PASS | - |
| 4 | Naming Convention | PASS | - |
| 5 | A11y & Performance | WARN | alt 속성 누락 1건 |
| 6 | Build Verification | FAIL | tsc 에러 3건 |

### 수정 필요 사항
1. `src/feature/todo/components/TodoItem.tsx:5` — `@/feature/goal` import 제거
2. `src/feature/todo/components/TodoForm.tsx:12` — `<button>` → `<Button>` 교체
3. 타입 에러 3건 수정 필요

### Build Checks
- lint: PASS
- tsc: FAIL (3 errors)
- build: FAIL

→ 수정 후 `/review` 재실행하세요. PR 생성이 차단됩니다.
```

---

## 주의사항

- 코드를 직접 수정하지 않는다. 리뷰 피드백만 제공.
- **모든 Gate + 빌드 체크가 PASS여야 `/pr` 진행 가능.**
- FAIL 시 구체적인 파일:라인번호와 수정 가이드를 제공한다.
- 기존 코드의 패턴 위반은 이번 리뷰 범위에서 제외한다 (새로 작성/변경된 코드만).
