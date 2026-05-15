# /implement — FE 코드 구현 실행

## 개요

구현 계획을 기반으로 실제 코드를 작성한다.
FSD 아키텍처 규칙을 엄격히 준수하며, 구현 순서를 따른다.

---

## 입력

- `TICKET_ID`: 티켓 ID
- 구현 계획: `.plan/{TICKET_ID}/plan.md`
- 아키텍처 규칙: `.ai/rules/architecture.md`
- 코딩 표준: `.ai/rules/coding-standards.md`

---

## 사전 준비

### 브랜치 생성

```bash
git checkout -b {feat|fix|modify}/{TICKET_ID}-{kebab-summary}
```

### 규칙 로드

반드시 아래 파일을 먼저 읽는다:
- `.ai/rules/architecture.md` — FSD 계층 규칙, 참조 제약
- `.ai/rules/coding-standards.md` — 네이밍, 스타일, 디자인 시스템 규칙

---

## 구현 순서

**반드시 이 순서를 따른다. 건너뛰지 않는다.**

### Phase 1: 타입 정의

**1a. 공통 타입** (필요 시)
```typescript
// src/shared/type/{Domain}.ts
export interface Todo {
  id: string;
  content: string;
  // ...
}
```

**1b. 도메인 타입**
```typescript
// src/model/{domain}/types.ts
export interface CreateTodoRequest {
  content: string;
  // ...
}
```

### Phase 2: 데이터 계층 (`model/`)

**2a. API 함수**
```typescript
// src/model/{domain}/api.ts
import { apiClient } from '@/shared/lib/apiClient';

const TodoApi = {
  getList: (params: Params) => apiClient.get<Response>('/todos', { params }),
  create: (req: CreateRequest) => apiClient.post<Response>('/todos', req),
};
```

**2b. Query Key 팩토리**
```typescript
// src/model/{domain}/queryKeys.ts
export const TodoQueryKeys = {
  all: ['todo'] as const,
  list: (params: Params) => [...TodoQueryKeys.all, 'list', params] as const,
  detail: (id: string) => [...TodoQueryKeys.all, 'detail', id] as const,
};
```

**2c. Query/Mutation Options**
```typescript
// src/model/{domain}/queries.ts
import { queryOptions, mutationOptions } from '@tanstack/react-query';

export const TodoQuery = {
  getList: (params: Params) => queryOptions({
    queryKey: TodoQueryKeys.list(params),
    queryFn: () => TodoApi.getList(params),
  }),
};

export const TodoMutation = {
  create: () => mutationOptions({
    mutationFn: TodoApi.create,
  }),
};
```

**2d. React Context** (필요 시)
```typescript
// src/model/{domain}/{contextName}/context.tsx
// Split State/Actions 패턴 사용
interface State { /* 상태 필드 */ }
interface Actions { /* 액션 함수 */ }

const StateContext = createContext<State | null>(null);
const ActionsContext = createContext<Actions | null>(null);

export function Provider({ children }: { children: React.ReactNode }) {
  // ...
}

export const useXxxState = () => { /* ... */ };
export const useXxxActions = () => { /* ... */ };
```

### Phase 3: 공유 컴포넌트 (`shared/`) — 필요 시에만

기존 디자인 시스템 컴포넌트를 수정하거나 새로 추가하는 경우에만.

```typescript
// src/shared/components/{category}/{ComponentName}.tsx
'use client';

interface ComponentNameProps {
  // Props 정의
}

export default function ComponentName({ ...props }: ComponentNameProps) {
  return (
    // Tailwind + CSS 변수로 스타일링
  );
}
```

### Phase 4: 기능 컴포넌트 (`feature/`)

**4a. 도메인 UI 컴포넌트**
```typescript
// src/feature/{domain}/components/{ComponentName}.tsx
'use client';

import { Button } from '@/shared/components/input/Button/Button';
import { useQuery } from '@tanstack/react-query';
import { TodoQuery } from '@/model/todo/queries';

interface Props { /* ... */ }

export default function TodoItem({ ...props }: Props) {
  // 디자인 시스템 컴포넌트 활용
  return (
    <div className="flex items-center gap-2">
      <Button variant="primary" size="sm">완료</Button>
    </div>
  );
}
```

**4b. 도메인 커스텀 훅** (필요 시)
```typescript
// src/feature/{domain}/hooks/use{HookName}.ts
export function useTodoForm() {
  // React Hook Form + Zod
}
```

**4c. 도메인 폼** (필요 시)
```typescript
// src/feature/{domain}/forms/{FormName}.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  content: z.string().min(1, '내용을 입력해주세요').max(100, '100자를 초과할 수 없습니다'),
});
```

**4d. 배럴 export**
```typescript
// src/feature/{domain}/index.ts
export { default as TodoItem } from './components/TodoItem';
export { default as TodoForm } from './forms/TodoForm';
```

### Phase 5: 조합 컴포넌트 (`composite/`)

```typescript
// src/composite/{domain}/{pagePart}/{ComponentName}.tsx
'use client';

import { TodoItem } from '@/feature/todo';
import { useTodoState } from '@/model/todo/todoList/context';

export default function TodoListSection() {
  const { todos } = useTodoState();
  return (
    <section>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </section>
  );
}
```

### Phase 6: 페이지 (`app/`)

```typescript
// src/app/(home)/{domain}/page.tsx
import TodoListSection from '@/composite/{domain}/todoList/TodoListSection';

export default function TodoPage() {
  return <TodoListSection />;
}
```

---

## 검증 단계

구현 완료 후 반드시 실행:

### 1. 린트 체크

```bash
cd /Users/sagwangjin/Desktop/growit-test/DDD-12-GROWIT-FE && yarn lint
```

### 2. 타입 체크

```bash
cd /Users/sagwangjin/Desktop/growit-test/DDD-12-GROWIT-FE && npx tsc --noEmit
```

### 3. 빌드 검증

```bash
cd /Users/sagwangjin/Desktop/growit-test/DDD-12-GROWIT-FE && yarn build
```

### 4. 실패 시

- 에러 메시지를 분석하고 수정
- lint → tsc → build 순서로 재실행
- 모두 통과할 때까지 반복

---

## 커밋

모든 검증 통과 후 커밋한다.

```bash
git add {specific files}
git commit -m "{type}: {description}"
```

- `feat:` 새 기능
- `fix:` 버그 수정
- `refactor:` 리팩토링
- `style:` 스타일/포맷
- `chore:` 기타
- `docs:` 문서
- `test:` 테스트

**`git add -A` 또는 `git add .` 금지. 파일 지정만 사용.**

---

## 주의사항

- 계획에 없는 코드를 작성하지 않는다.
- 기존 코드 패턴을 따른다 (새 패턴 도입 금지).
- FSD 계층 참조 규칙을 엄격히 준수한다.
- 디자인 시스템 컴포넌트를 최대한 활용한다.
- HTML 기본 요소(`<button>`, `<input>`) 대신 디자인 시스템 컴포넌트 사용.
- `any` 타입 사용 금지.
- `useEffect` 내 직접 API 호출 금지 — TanStack Query 사용.
- 인라인 스타일 금지 — Tailwind 클래스 사용.
