# Task 04. 반복 투두 수정 범위

## 문서 정보

| 항목 | 내용 |
| --- | --- |
| 기준일 | 2026-08-15 |
| 기능 문서 | [04-routine-update-scope.md](../feature/04-routine-update-scope.md) |
| 구현 상태 | 부분 완료 |
| 대상 화면 | 투두 편집 Bottom Sheet |

## 목적

반복 투두 수정 시 `SINGLE`, `FROM_DATE`, `ALL` 범위를 명시적으로 선택하고,
서버의 전체 교체형 PUT 계약과 범위별 캐시 갱신 정책을 안전하게 적용한다.

## 요구사항 및 구현 상태

| 요구사항 | 상태 | 현재 구현 |
| --- | --- | --- |
| 세 수정 범위 제공 | 완료 | `해당 투두만`, `해당 날짜 이후`, `전체 반복` 버튼 제공 |
| 범위 enum 타입 제한 | 완료 | `RoutineUpdateType = SINGLE \| FROM_DATE \| ALL` |
| 최신 상세 조회 후 편집 | 완료 | `useTodoById`로 편집 시 상세 재조회 |
| `routine`과 범위의 조건부 타입 보장 | 완료 | `PutTodoRequest` discriminated union 적용 |
| `goalId`, `time`, `category` 보존 | 완료 | 모든 수정 request body에 포함 |
| `repeatDays` 보존 | 완료 | 최신 상세 routine 값을 request에 전달 |
| PUT 빈 응답 처리 | 완료 | 응답 body를 읽지 않음 |
| `FROM_DATE`/`ALL` 확인 모달 | 완료 | 공용 `Modal`, `Button` 사용 |
| mutation 중 중복 실행 방지 | 완료 | `isSubmitting`으로 버튼 및 dismiss 비활성화 |
| 범위별 목록/count 캐시 갱신 | 완료 | `lists()`와 `counts()` prefix invalidation |
| 반복 해제 차단 | 완료 | 원본 반복 투두의 `none` 선택 차단 및 Toast 안내 |
| 종료일이 기준일보다 빠른 요청 차단 | 완료 | `FROM_DATE` 실행 전 form error 설정 |
| 반복 설정 변경 시 `SINGLE` 제한 | 미완료 | 원본 반복 여부만 확인하며 변경 여부 비교는 없음 |
| 기존 반복 시작일 읽기 전용 | 미완료 | `DateSelectView`에서 시작일 변경 가능 |
| 404 전용 재조회·재선택 안내 | 미완료 | 현재 모든 API 오류를 일반 Toast로 처리 |
| 삭제 ALL 위험 확인 및 pending 유지 | 미완료 | 삭제 시트가 요청 완료 전에 닫힘 |

## 현재 구현 구조

```text
TodoBottomSheet(edit)
  → useTodoById(todoId)
  → TodoFormProvider(originalTodo)
      ├─ handleEdit(SINGLE)
      ├─ handleEdit(FROM_DATE)
      ├─ handleEdit(ALL)
      ├─ refreshAndClose
      └─ EditBottomSheet
          ├─ 범위 선택
          └─ FROM_DATE/ALL 확인 Modal
```

## 핵심 구현

### 요청 계약

- 비반복 수정은 `routine`과 `routineUpdateType`을 생략한다.
- 비반복 투두에 반복을 추가하면 `ALL`과 완전한 `routine`을 전송한다.
- `SINGLE`은 routine 없이 선택 회차의 필드를 전송한다.
- `FROM_DATE`와 `ALL`은 최신 상세의 `duration`, `repeatDays`를 보존한 routine을 전송한다.
- content는 trim 후 `1~30자`, date는 `yyyy-MM-dd`, time은 `HH:mm`으로 검증한다.

### 캐시 정책

| 범위 | 갱신 대상 |
| --- | --- |
| `SINGLE` | 원래 날짜와 변경 날짜 목록, count, detail 제거 |
| `FROM_DATE` | 캐시된 모든 날짜 목록, 모든 count, detail 제거 |
| `ALL` | 캐시된 모든 날짜 목록, 모든 count, detail 제거 |

캐시 invalidation을 `await`한 뒤 폼을 초기화하고 편집 화면을 닫는다.

## API 변경

### 변경 요약

| Method | Endpoint | 변경 내용 |
| --- | --- | --- |
| `GET` | `/todos/{todoId}` | 편집 직전 최신 투두 상세를 조회하도록 프론트엔드에 신규 연결 |
| `PUT` | `/todos/{todoId}` | 범위별 조건부 request 타입 적용, 성공 응답을 빈 body로 처리 |
| `DELETE` | `/todos/{todoId}` | 계약 변경 없음. query string 조합을 Axios `params` 전달 방식으로 변경 |

기존 `GET /todos?date=...`, `POST /todos`, `PATCH /todos/{todoId}`, `GET /todos/count` 계약은 변경하지 않는다.

### `GET /todos/{todoId}`

편집 화면을 열 때 목록 캐시만 사용하지 않고 최신 상세를 다시 조회한다.

```ts
interface TodoDetail {
  id: string;
  goalId: string | null;
  date: string;
  time?: string | null;
  content: string;
  category: 'NOW' | 'STEADY' | 'SKIP' | 'DELETE';
  isCompleted: boolean;
  routine?: {
    duration: { startDate: string; endDate: string };
    repeatType: 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
    repeatDays?: RepeatDay[] | null;
  } | null;
}
```

- 응답 형식: `CommonResponse<TodoDetail>`
- Query key: `['todos', 'detail', todoId]`
- 편집 화면을 다시 열 때 항상 최신 값을 요청한다.

### `PUT /todos/{todoId}`

공통 요청 필드는 다음과 같다.

```ts
interface PutTodoRequestBase {
  goalId: string | null;
  date: string;
  time?: string | null;
  content: string;
  category: 'NOW' | 'STEADY' | 'SKIP' | 'DELETE';
}
```

범위에 따른 추가 필드는 다음과 같이 제한한다.

| 수정 유형 | `routineUpdateType` | `routine` |
| --- | --- | --- |
| 비반복 일반 수정 | 생략 | 생략 |
| 단일 회차 수정 | `SINGLE` | 생략 |
| 해당 날짜 이후 수정 | `FROM_DATE` | 필수 |
| 전체 반복 수정 또는 새 반복 생성 | `ALL` | 필수 |

`FROM_DATE`와 `ALL`의 routine에는 `duration`, `repeatType`, 기존 `repeatDays`를 포함한다.
성공 응답은 `200` 빈 body이므로 수정 결과를 응답에서 읽지 않고 목록을 다시 조회한다.

### `DELETE /todos/{todoId}`

```text
DELETE /todos/{todoId}?routineDeleteType=SINGLE
DELETE /todos/{todoId}?routineDeleteType=ALL
```

현재 UI는 단일 삭제와 전체 반복 삭제만 제공한다. `FROM_DATE` 삭제는 타입에 포함돼 있지만 이번 작업 범위에서
버튼이나 사용자 흐름을 추가하지 않는다.

### 타입 계약 변경

- `RepeatType`에서 서버가 지원하지 않는 `YEARLY`를 제거했다.
- `category: string`을 네 개의 `TodoCategory` union으로 좁혔다.
- `TodoRoutine.repeatDays?: RepeatDay[] | null`을 추가했다.
- `PutTodoRequest`를 discriminated union으로 변경해 `FROM_DATE`/`ALL`과 routine의 필수 관계를 강제했다.
- PUT 반환 타입을 기존 `CommonResponse<TodoResponse>` 가정에서 `void`로 변경했다.

## 관련 파일

- `src/shared/type/GoalTodo.ts`
- `src/model/todo/todoList/dto.ts`
- `src/model/todo/todoList/api.ts`
- `src/model/todo/todoList/queries.ts`
- `src/model/todo/todoList/queryKeys.ts`
- `src/feature/todo/todoBottomSheet/TodoBottomSheet.tsx`
- `src/feature/todo/todoBottomSheet/form/TodoFormProvider.tsx`
- `src/feature/todo/todoBottomSheet/form/todoFormSchema.ts`
- `src/feature/todo/todoBottomSheet/components/subBottomSheet/editSelectView/EditBottomSheet.tsx`
- `src/feature/todo/todoBottomSheet/components/content/repeatSelectView/RepeatSelectView.tsx`

## 검증 현황

| 검증 | 상태 | 비고 |
| --- | --- | --- |
| TypeScript | 통과 | `npx tsc --noEmit` |
| Production build | 통과 | `npm run build` |
| 변경 파일 ESLint | 통과 | 변경된 TS/TSX 대상 |
| 요청/캐시 자동화 테스트 | 없음 | scope별 테스트 미작성 |
| API 통합 검증 | 확인 필요 | 실제 서버에서 ID 재생성 및 완료 기록 확인 필요 |

## 남은 작업

- 반복 주기·기간·요일이 변경되면 `SINGLE`을 비활성화하고 안내한다.
- 기존 반복 편집에서는 시작일을 읽기 전용으로 표시한다.
- 404를 별도로 처리해 목록 재조회 후 최신 투두 재선택을 안내한다.
- 전체 반복 삭제 전에 위험 확인을 표시하고 요청 완료까지 시트를 유지한다.
- scope별 request body, 캐시 invalidation, 중복 실행 방지 테스트를 추가한다.

## 완료 조건

- [x] 세 버튼이 `SINGLE`, `FROM_DATE`, `ALL`과 정확히 매핑된다.
- [x] 최신 상세의 전체 교체 필드와 반복 정보가 보존된다.
- [x] 범위 수정 후 영향 목록과 count가 갱신된다.
- [x] 반복 해제와 잘못된 `FROM_DATE` 종료일이 차단된다.
- [x] pending 중 중복 수정 요청과 dismiss가 차단된다.
- [ ] 반복 설정 변경을 `SINGLE`로 저장할 수 없다.
- [ ] 기존 반복 시작일이 읽기 전용이다.
- [ ] 404 및 전체 반복 삭제 위험 흐름이 별도로 처리된다.
- [ ] scope별 API·캐시 회귀 검증 결과가 기록된다.

## 범위 제외

- 서버 반복 생성·분할 로직 변경
- 삭제 범위에 `FROM_DATE` 추가
- 다중 요일을 직접 편집하는 신규 UI
- 신규 테스트 러너 도입
