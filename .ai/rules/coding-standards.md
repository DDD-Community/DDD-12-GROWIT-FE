# FE 코딩 컨벤션 & 스타일 가이드

## Prettier

```json
{
  "printWidth": 120,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

---

## ESLint

- ESLint 9 flat config (`eslint.config.mjs`)
- extends: `next/core-web-vitals`, `next/typescript`
- `@typescript-eslint/no-empty-object-type: off`

---

## TypeScript

- Strict mode 활성화
- Path alias: `@/*` → `./src/*`
- Target: ES2017
- Module resolution: bundler

---

## 파일 네이밍

| 유형 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `TodoItem.tsx`, `GoalBanner.tsx` |
| 훅 | camelCase + `use` 접두사 | `useTodoList.ts`, `useAutoLogout.ts` |
| 유틸리티 | camelCase | `utils.ts`, `apiClient.ts`, `dateUtils.ts` |
| 타입 파일 | PascalCase | `Todo.ts`, `goal.ts` |
| 상수 | camelCase (파일) / UPPER_SNAKE (export) | `routes.ts` / `HOME_ROUTE` |
| CSS | kebab-case | `globals.css`, `typography.css` |
| 디렉토리 | camelCase | `todoList/`, `goalBanner/` |
| 배럴 export | `index.ts` | `feature/todo/index.ts` |

---

## 컴포넌트 규칙

### Do

- 함수 컴포넌트 + `export default` 사용
- Props 타입은 컴포넌트 파일 상단에 `interface` 또는 `type`으로 정의
- `'use client'` 디렉티브: 클라이언트 상태/이벤트 사용 시에만 추가
- 조건부 렌더링: `&&` 연산자 또는 삼항 연산자
- 리스트 렌더링: `Array.map()` + 고유 `key` prop

### Don't

- `React.FC` 사용 금지 — 일반 함수 선언 사용
- `class` 컴포넌트 사용 금지
- 인라인 스타일 사용 금지 — Tailwind 클래스 사용
- `any` 타입 사용 금지 — 명시적 타입 지정
- `useEffect` 내 직접 API 호출 금지 — TanStack Query 사용
- `useState`로 서버 상태 관리 금지 — TanStack Query 사용

---

## 디자인 시스템

### 컴포넌트 라이브러리

- **UI 프리미티브**: shadcn/ui + Radix UI (Sheet, Dialog, DropdownMenu)
- **아이콘**: Lucide React (`lucide-react`)
- **애니메이션**: Motion (Framer Motion v12)

### 컴포넌트 계층 (`shared/components/`)

| 카테고리 | 위치 | 컴포넌트 |
|----------|------|----------|
| **UI** | `ui/` | Sheet, Dialog, DropdownMenu (Radix) |
| **Foundation** | `foundation/` | FlexBox, Icons, Screen |
| **Input** | `input/` | Button, InputField, DatePicker, TextArea, Checkbox, Select, FloatingButton, SwipeActionButton |
| **Layout** | `layout/` | Header, Navigation, Accordion, Section, PageHeader, Pagination, FunnelHeader |
| **Display** | `display/` | Badge, ProgressBar, CircularProgress, ToolTip, SpeechBubble, SectionMessage |
| **Feedback** | `feedBack/` | Modal, BottomSheet, Toast |

### Button 시스템

```typescript
// Variants
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'brand' | 'select';

// Layouts
type ButtonLayout = 'normal' | 'icon-left' | 'icon-right' | 'icon-only';

// Sizes
type ButtonSize = 'sm' | 'ml' | 'lg' | 'xl';

// States
type ButtonState = 'idle' | 'loading' | 'error' | 'success';
```

### Badge 시스템

```typescript
type BadgeType = 'default' | 'dot' | 'icon-right' | 'icon-left' | 'icon-only';
type BadgeSize = 'sm' | 'md' | 'lg';
```

### 디자인 시스템 사용 규칙

- **Do**: `shared/components/`의 기존 컴포넌트를 최대한 활용
- **Do**: `Button`은 variant, layout, size props로 스타일링
- **Do**: `clsx` + `tailwind-merge`(`cn` 유틸)로 동적 클래스 결합
- **Don't**: 디자인 시스템에 있는 컴포넌트를 feature에서 재구현
- **Don't**: Radix UI를 직접 import하지 않고 `shared/components/ui/`를 통해 사용
- **Don't**: `<button>`, `<input>` 등 HTML 요소 직접 사용 금지 — 디자인 시스템 컴포넌트 사용

---

## 스타일링

### Tailwind CSS v4

- PostCSS 기반 (`@tailwindcss/postcss`)
- CSS 변수로 테마 토큰 관리
- 다크 테마가 기본 테마

### CSS 변수 시스템

```css
/* 브랜드 색상 */
--color-brand-neon: #35D942;

/* 시맨틱 토큰 */
--text-primary, --text-secondary, --text-tertiary
--icon-primary, --icon-secondary
--border-default, --border-strong
--fill-primary, --fill-secondary
--bg-primary, --bg-secondary

/* 상태 색상 */
--color-status-positive: #1ED45A;
--color-status-cautionary: #FFA938;
--color-status-negative: #FF6363;
```

### 타이포그래피 토큰 (CSS 클래스)

```
display-1-bold, display-2-bold
title-1-bold, title-2-bold, title-3-bold
heading-1-bold, heading-2-bold
headline-1-bold, headline-2-bold
body-1-normal, body-1-reading
label-1-normal, label-2-normal
caption-1, caption-2
```

### 스타일 규칙

- **Do**: Tailwind 유틸리티 클래스 우선 사용
- **Do**: 동적 스타일은 `clsx` + `cn()` 유틸 사용
- **Do**: 색상은 CSS 변수 기반 시맨틱 토큰 사용 (`text-[var(--text-primary)]`)
- **Don't**: `style` prop으로 인라인 스타일 금지
- **Don't**: CSS Modules 사용 금지
- **Don't**: 하드코딩된 색상값 (#hex) 금지 — CSS 변수 사용

---

## 상태 관리

### Server State → TanStack React Query

```typescript
// 조회: useQuery + queryOptions
const { data } = useQuery(TodoQuery.getList(params));

// 변경: useMutation + mutationOptions
const { mutate } = useMutation(TodoMutation.create());
```

### Client State → React Context (Split Pattern)

```typescript
// State와 Actions를 분리하여 불필요한 리렌더 방지
export const useXxxState = () => useContext(XxxStateContext);
export const useXxxActions = () => useContext(XxxActionsContext);
```

### 상태 관리 규칙

- 서버에서 오는 데이터 → TanStack Query (절대 `useState` 금지)
- 로컬 UI 상태 → `useState` 또는 React Context
- 폼 상태 → React Hook Form + Zod validation
- 전역 상태 → React Context (Split State/Actions 패턴)

---

## API 호출

### apiClient 사용

```typescript
import { apiClient } from '@/shared/lib/apiClient';

// model/{domain}/api.ts 에서만 apiClient 사용
const TodoApi = {
  getList: () => apiClient.get<TodoListResponse>('/todos'),
  create: (req: CreateTodoRequest) => apiClient.post<TodoResponse>('/todos', req),
  update: (id: string, req: UpdateTodoRequest) => apiClient.put<TodoResponse>(`/todos/${id}`, req),
  delete: (id: string) => apiClient.delete(`/todos/${id}`),
};
```

### API 규칙

- `apiClient`는 `model/{domain}/api.ts`에서만 호출
- 컴포넌트에서 직접 `axios`/`fetch` 호출 금지
- API 응답 타입은 `model/{domain}/types.ts` 또는 `shared/type/`에 정의

---

## 폼 처리

### React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  content: z.string().min(1).max(100),
});

type FormData = z.infer<typeof schema>;

const { register, handleSubmit, formState } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

---

## 커밋 규칙

- 커밋 메시지는 **영어**, conventional commit 형식
- `git add`는 파일 지정 (`-A`, `.` 금지)
- 타입: `feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `docs:`, `test:`
