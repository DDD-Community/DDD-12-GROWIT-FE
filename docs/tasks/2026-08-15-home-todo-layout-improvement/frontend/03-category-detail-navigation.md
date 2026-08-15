# Task 03. 카테고리 상세 내비게이션

## 문서 정보

| 항목 | 내용 |
| --- | --- |
| 기준일 | 2026-08-15 |
| 기능 문서 | [03-category-detail-navigation.md](../feature/03-category-detail-navigation.md) |
| 구현 상태 | 구현 완료, 상호작용 검증 필요 |
| 대상 화면 | `/home` 카테고리 상세 오버레이 |

## 목적

상세 화면을 닫지 않고 `NOW → STEADY → SKIP → DELETE` 순서로 카테고리를 탐색한다.
탭, 키보드 및 좌우 스와이프를 지원하면서 목록 세로 스크롤과 투두 행 스와이프를 유지한다.

## 요구사항 및 구현 상태

| 요구사항 | 상태 | 현재 구현 |
| --- | --- | --- |
| `1×4` 카테고리 표시 | 완료 | `CategoryNavigation`에서 네 탭 렌더링 |
| 탭으로 카테고리 이동 | 완료 | `onValueChange` → `setDetailCategory` 연결 |
| 좌우 스와이프로 인접 카테고리 이동 | 완료 | navigation drag와 상세 패널 pointer swipe 구현 |
| 양 끝 경계 유지 | 완료 | 이전/다음 카테고리 존재 여부로 저항 처리 |
| 키보드 탐색 | 완료 | ArrowLeft/Right, Home, End 지원 |
| 접근성 탭/패널 연결 | 완료 | 고유 `aria-controls`, `tabpanel`, `aria-labelledby` 연결 |
| 선택 카테고리 기본값으로 투두 추가 | 완료 | 상세 닫기 후 선택 카테고리를 `onAdd`로 전달 |
| 상세 목록 공통 정렬 | 완료 | 정렬된 `categoryGroups`를 상세 화면에 전달 |
| 디자인 토큰 및 공용 버튼 사용 | 완료 | 시맨틱 카테고리 토큰과 공용 `Button` 사용 |

## 현재 구현 구조

```text
TodoList.detailCategory
  └─ CategoryDetailView
      ├─ CategoryNavigation
      │   ├─ role="tablist"
      │   ├─ 네 개의 role="tab"
      │   └─ 키보드/drag 이동
      └─ category page track × 4
          ├─ CategoryBackground
          └─ CategoryPanelCard(role="tabpanel")
              └─ 정렬된 투두 목록
```

## 핵심 구현

### 카테고리 순서와 메타데이터

`category.ts`가 카테고리 순서와 navigation 색상 클래스를 단일 기준으로 제공한다.
탭, 스와이프, 패널 렌더링은 모두 같은 `TODO_CATEGORY_ORDER`를 사용한다.

### 제스처 충돌 방지

- 작은 움직임은 전환하지 않는다.
- 세로 이동이 더 크면 목록 스크롤을 유지한다.
- 버튼, 탭 목록, `SwipeableRow`에서 시작한 pointer는 패널 전환 대상에서 제외한다.
- 첫 번째와 마지막 카테고리 바깥 방향은 페이지를 바꾸지 않고 저항만 적용한다.

## API 변경

이 작업에서 추가되거나 변경된 API 계약은 없다. 상세 오버레이는 별도 카테고리 API를 호출하지 않고
선택일 조회 결과를 `groupTodosByCategory`로 분류한 데이터를 재사용한다.

| API | 변경 여부 | 사용 목적 |
| --- | --- | --- |
| `GET /todos?date={yyyy-MM-dd}` | 없음 | 네 카테고리 상세 목록의 원본 데이터 조회 |
| `PATCH /todos/{todoId}` | 없음 | 상세 화면에서 완료 상태 변경 |
| `DELETE /todos/{todoId}` | 없음 | 상세 화면에서 단일 투두 삭제 |

카테고리 전환은 `detailCategory` 로컬 상태만 변경하므로 탭이나 스와이프마다 재요청하지 않는다.

## 관련 파일

- `src/feature/todo/todoList/category.ts`
- `src/feature/todo/todoList/TodoList.tsx`
- `src/feature/todo/todoList/components/CategoryNavigation.tsx`
- `src/feature/todo/todoList/components/CategoryDetailView.tsx`
- `src/app/customTokens.css`
- `src/app/globals.css`

## 검증 현황

| 검증 | 상태 | 비고 |
| --- | --- | --- |
| TypeScript | 통과 | `npx tsc --noEmit` |
| Production build | 통과 | `npm run build` |
| 변경 파일 ESLint | 통과 | 변경된 TS/TSX 대상 |
| 접근성 구조 정적 확인 | 통과 | tab과 panel ID 연결 확인 |
| 자동화 상호작용 테스트 | 없음 | 키보드·스와이프 테스트 미작성 |
| 모바일 제스처 회귀 | 확인 필요 | 세로 스크롤 및 행 swipe 충돌 |

## 남은 작업

- 탭 키보드 이동, 스와이프 경계 및 빈 카테고리 이동 테스트를 추가한다.
- iOS/Android에서 목록 스크롤과 `SwipeableRow` 충돌 여부를 수동 검증한다.

## 완료 조건

- [x] 네 카테고리 탭과 활성 상태가 표시된다.
- [x] 탭과 키보드로 카테고리를 이동할 수 있다.
- [x] 좌우 스와이프로 인접 카테고리를 이동하고 양 끝 경계를 유지한다.
- [x] 탭과 패널의 ARIA 관계가 연결된다.
- [x] 선택 카테고리 기준 추가·수정·완료·삭제 흐름이 유지된다.
- [ ] 모바일 제스처 및 접근성 상호작용 검증 결과가 기록된다.

## 범위 제외

- 전역 `CategoryMatrixIcon` 형태 변경
- 카테고리 순서 및 서버 enum 변경
- 순환형 스와이프
