# Task 02. 월간 투두 레이아웃

## 문서 정보

| 항목 | 내용 |
| --- | --- |
| 기준일 | 2026-08-15 |
| 기능 문서 | [02-monthly-layout.md](../feature/02-monthly-layout.md) |
| 구현 상태 | 구현 완료, 회귀 검증 필요 |
| 대상 화면 | `/home` 월간 list 뷰 |

## 목적

월간 캘린더에서 선택한 날짜의 투두 목록에 주간 화면과 동일한 정렬 정책을 적용한다.
기존 월 이동, 날짜 선택, 인디케이터 및 제스처 동작은 유지한다.

## 요구사항 및 구현 상태

| 요구사항 | 상태 | 현재 구현 |
| --- | --- | --- |
| 월간 목록에 공통 정렬 적용 | 완료 | `TodoList`가 `sortedTodos`를 `ListView`에 전달 |
| 완료 여부 우선 정렬 | 완료 | `sortTodosByPolicy`에서 처리 |
| 시간 유무 및 시간순 정렬 | 완료 | 공통 comparator에서 처리 |
| 시간 없는 항목 가나다순 | 완료 | `localeCompare(..., 'ko')` 적용 |
| 목표 그룹 내부 공통 정렬 | 완료 | `groupAndSortTodos`에서 같은 함수 사용 |
| `미분류` 그룹 마지막 유지 | 완료 | 기존 `sortGroups` 정책 유지 |
| 월간 캘린더 동작 보존 | 코드 변경 없음 | Calendar 관련 코드는 이번 작업에서 수정하지 않음 |

## 현재 구현 구조

```text
calendarView === "monthly"
  → TodoList(viewMode="list")
  → useTodosByDate(selectedDate)
  → transformTodosData
  → sortTodosByPolicy
  → ListView(sortedTodos)
  → groupAndSortTodos
      ├─ 목표명 가나다순
      ├─ 미분류 마지막
      └─ 그룹 내부 공통 정렬
```

## 핵심 구현

월간 화면은 별도 정렬 상태를 두지 않는다. 조회 결과로부터 `sortedTodos`를 `useMemo`로 계산하고,
추가·수정·삭제·완료 처리 후 목록 쿼리가 갱신되면 같은 순수 정렬 함수를 다시 실행한다.

정렬 순서는 다음과 같다.

1. 미완료 우선
2. 시간 있는 항목 우선
3. 시간 오름차순
4. 콘텐츠 가나다순
5. 입력 순서 유지

## API 변경

이 작업에서 추가되거나 변경된 API 계약은 없다.

| API | 변경 여부 | 사용 목적 |
| --- | --- | --- |
| `GET /todos?date={yyyy-MM-dd}` | 없음 | 월간 캘린더에서 선택한 날짜의 투두 조회 |
| `GET /todos/count?from={date}&to={date}` | 없음 | 날짜별 투두 개수 및 인디케이터 표시 |

월간 정렬은 서버 요청이나 응답 형식을 바꾸지 않고 조회된 배열에 공통 정렬 함수를 적용한다.

## 관련 파일

- `src/feature/todo/todoList/TodoList.tsx`
- `src/feature/todo/todoList/helper.ts`
- `src/feature/todo/todoList/components/ListView.tsx`

## 검증 현황

| 검증 | 상태 | 비고 |
| --- | --- | --- |
| TypeScript | 통과 | `npx tsc --noEmit` |
| Production build | 통과 | `npm run build` |
| 변경 파일 ESLint | 통과 | 변경된 TS/TSX 대상 |
| 자동화 테스트 | 없음 | 정렬 함수 단위 테스트 미작성 |
| 월간 캘린더 회귀 | 확인 필요 | 월 이동·날짜 선택·인디케이터·스와이프 |

## 남은 작업

- `sortTodosByPolicy`의 완료/시간/null/한글/동률 케이스 단위 테스트를 추가한다.
- 월 전환과 날짜 선택 후 정렬 유지 여부를 브라우저에서 검증하고 결과를 기록한다.

## 완료 조건

- [x] 월간 선택일 목록에 공통 정렬 정책이 적용된다.
- [x] 목표 그룹 내부에 같은 정렬 정책이 적용된다.
- [x] 목표 그룹 순서와 `미분류` 마지막 정책이 유지된다.
- [x] 변경 작업이 월간 캘린더 구현을 직접 수정하지 않는다.
- [ ] 정렬 단위 테스트와 월간 캘린더 회귀 검증 결과가 존재한다.

## 범위 제외

- 월간 캘린더 UI 재설계
- 서버 정렬 및 API 스키마 변경
- 별도 클라이언트 정렬 상태 추가
