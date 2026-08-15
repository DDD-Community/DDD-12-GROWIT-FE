# Task 01. 주간 투두 레이아웃

## 문서 정보

| 항목 | 내용 |
| --- | --- |
| 기준일 | 2026-08-15 |
| 기능 문서 | [01-weekly-layout.md](../feature/01-weekly-layout.md) |
| 구현 상태 | 부분 완료 |
| 대상 화면 | `/home` 주간 matrix 뷰 |

## 목적

주간 화면의 네 카테고리 카드를 지정 높이로 표시하고, 카드 내부 목록과 페이지 전체 스크롤을 분리한다.
모든 카테고리에는 동일한 투두 정렬 정책을 적용한다.

## 요구사항 및 구현 상태

| 요구사항 | 상태 | 현재 구현 |
| --- | --- | --- |
| `NOW`, `STEADY` 카드 행 높이 `295px` | 완료 | `MatrixView`의 중요 행에 `h-[295px]` 적용 |
| `SKIP`, `DELETE` 카드 행 높이 `180px` | 완료 | `MatrixView`의 여유 행에 `h-[180px]` 적용 |
| 카드 헤더 고정, 목록만 내부 스크롤 | 완료 | `CategoryCard` 목록에 `min-h-0 flex-1 overflow-y-auto` 적용 |
| 네 카테고리 공통 정렬 | 완료 | `groupTodosByCategory`에서 `sortTodosByPolicy` 적용 |
| 목표별 그룹에도 같은 정렬 적용 | 완료 | `groupAndSortTodos`에서 공통 정렬 함수 재사용 |
| 하단 내비게이션 safe area 반영 | 완료 | `BottomNavigation` 하단 padding에 `env(safe-area-inset-bottom)` 반영 |
| FAB을 내비게이션 위에 배치 | 미완료 | FAB이 `25px + safe area`에 있어 내비게이션 높이를 고려하지 않음 |
| 마지막 콘텐츠의 내비게이션/FAB 예약 공간 | 미완료 | `(home)/layout.tsx`에 별도 하단 예약 padding 없음 |

## 현재 구현 구조

```text
TodoListContainer
  ├─ Calendar
  ├─ TodoList(viewMode="matrix")
  │   ├─ useTodosByDate
  │   ├─ transformTodosData
  │   ├─ sortTodosByPolicy
  │   ├─ groupTodosByCategory
  │   └─ MatrixView
  │       ├─ 중요 행 295px
  │       └─ 여유 행 180px
  │           └─ CategoryCard 내부 목록 스크롤
  ├─ FloatingButton
  └─ TodoBottomSheet
```

## 핵심 구현

### 공통 정렬 정책

`sortTodosByPolicy`는 원본 배열을 변경하지 않고 다음 순서로 새 배열을 반환한다.

1. 미완료 우선
2. 같은 완료 상태에서 시간이 있는 항목 우선
3. 시간 오름차순
4. 콘텐츠 가나다순
5. 모든 값이 같으면 기존 입력 순서 유지

### 스크롤 책임

- 페이지 스크롤: `(home)/layout.tsx`의 `main`이 담당한다.
- 카드 스크롤: 각 `CategoryCard`의 투두 목록이 담당한다.
- 상세 화면: `CategoryDetailView`의 독립 오버레이와 목록 스크롤을 사용한다.

## API 변경

이 작업에서 추가되거나 변경된 API 계약은 없다.

| API | 변경 여부 | 사용 목적 |
| --- | --- | --- |
| `GET /todos?date={yyyy-MM-dd}` | 없음 | 선택일 투두 조회 |
| `PATCH /todos/{todoId}` | 없음 | 완료 상태 변경 |
| `DELETE /todos/{todoId}` | 없음 | 투두 삭제 |

정렬과 카드 레이아웃은 조회 응답을 받은 뒤 프론트엔드의 `sortTodosByPolicy`와 UI 컴포넌트에서 처리한다.

## 관련 파일

- `src/feature/todo/todoList/helper.ts`
- `src/feature/todo/todoList/components/MatrixView.tsx`
- `src/feature/todo/todoList/components/CategoryCard.tsx`
- `src/composite/home/todoListContainer/TodoListContainer.tsx`
- `src/app/(home)/layout.tsx`
- `src/shared/components/layout/Navigation/BottomNavigation.tsx`

## 검증 현황

| 검증 | 상태 | 비고 |
| --- | --- | --- |
| TypeScript | 통과 | `npx tsc --noEmit` |
| Production build | 통과 | `npm run build` |
| 변경 파일 ESLint | 통과 | 변경된 TS/TSX 대상 |
| 자동화 테스트 | 없음 | 정렬·레이아웃 전용 테스트 미작성 |
| 모바일 실기기 검증 | 확인 필요 | 320/375/448px 및 iOS safe area |

## 남은 작업

- FAB bottom 위치를 실제 내비게이션 높이 위로 올린다.
- 페이지 마지막 콘텐츠가 FAB 및 내비게이션에 가리지 않도록 예약 공간을 추가한다.
- 정렬 정책 단위 테스트와 모바일 스크롤 회귀 테스트를 추가한다.

## 완료 조건

- [x] 중요 카드 행은 `295px`, 여유 카드 행은 `180px`이다.
- [x] 카드 헤더는 고정되고 목록만 세로 스크롤된다.
- [x] 네 카테고리에 공통 정렬 정책이 적용된다.
- [x] 하단 내비게이션에 safe area가 반영된다.
- [ ] FAB과 마지막 콘텐츠가 하단 내비게이션과 겹치지 않는다.
- [ ] 정렬 및 모바일 레이아웃 회귀 검증이 자동화되거나 수동 검증 결과가 기록된다.

## 범위 제외

- API 스키마 및 서버 정렬 변경
- 카테고리 정의 변경
- 공용 `FloatingButton`의 기본 위치 변경
