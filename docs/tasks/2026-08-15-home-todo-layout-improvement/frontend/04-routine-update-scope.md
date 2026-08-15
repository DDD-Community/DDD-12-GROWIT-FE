# Task 04. 반복 투두 수정 범위 프론트엔드 변경 계획

## 문서 목적

반복 투두 수정 바텀시트에 `해당 날짜 이후 수정` 동작을 추가하고, 배포된 반복 범위 API 계약에 맞춰
현재 홈 투두 편집 흐름의 DTO, 조회·수정 API, TanStack Query 캐시, 폼 상태와 에러 처리를 마이그레이션한다.

기준 문서:

- 기능 문서: [반복 투두 수정 범위](../feature/04-routine-update-scope.md)
- 서버 배포 문서: `/Users/isang-yun/Downloads/routine-scope-api.html`

이 문서에서 화면 요구사항의 “Modal”은 현재 코드의
`src/feature/todo/todoBottomSheet/components/subBottomSheet/editSelectView/EditBottomSheet.tsx`를 뜻한다.
새 UI 프리미티브를 만들지 않고 기존 `BottomSheet` 안에 범위 선택 버튼을 추가한다.

## 현재 코드 추적 결과

### 편집 진입과 폼 원본

- `src/feature/todo/todoList/TodoList.tsx`가 `GET /todos?date=yyyy-MM-dd`의 목록 응답을 표시하고,
  투두 클릭 시 목록의 `GoalTodo`를 `TodoListContainer.onEdit`에 넘긴다.
- `src/composite/home/todoListContainer/TodoListContainer.tsx`는 해당 목록 객체를 `editingTodo`에 저장한 뒤
  `convertToFormData(editingTodo)` 결과를 편집 바텀시트의 `values`로 전달한다.
- `src/composite/home/todoListContainer/helper/index.ts`의 변환은 목록 객체에 포함된 `routine.duration`을 그대로
  폼 값으로 사용한다. 편집 직전 `GET /todos/{id}` 상세 조회는 없다.
- 따라서 이전 `FROM_DATE` 수정으로 반복이 이미 분리되었거나 목록 캐시가 오래된 경우, 과거
  `duration.startDate`를 다시 `ALL` 요청에 보내 앞 구간 회차를 중복 생성할 위험이 있다.

### 수정 모달과 요청 생성

- `MainView`는 편집 중 폼의 `repeatType !== 'none'`이면 바로 저장하지 않고 `EditBottomSheet`를 연다.
- `EditBottomSheet`는 현재 `해당 투두만 적용`, `전체 반복 투두 적용` 두 버튼만 노출한다.
- `TodoFormProvider.handleEditSingle`과 `handleEditAll`이 거의 같은 요청 객체를 각각 만들고 있으며,
  `FROM_DATE` 핸들러는 없다.
- 두 범위 핸들러 모두 폼에 반복 값이 있으면 `routine`을 만들지만 `time`을 요청에서 누락한다. 배포 API의
  `PUT`은 전체 교체이므로 저장 시 기존 시간이 `null`로 초기화될 수 있다.
- `SINGLE` 요청에도 `routine`을 보내지만 서버는 이를 반영하지 않는다. 사용자가 반복 설정을 바꾼 뒤
  `해당 투두만 적용`을 누르면 200이 와도 반복 설정은 저장되지 않는 오해가 생긴다.
- 반복 투두가 아닌 일반 편집 또는 반복을 새로 선택한 편집은 `handleSubmit`을 사용한다. 이 경로는
  `routine`을 보내면서 `routineUpdateType`을 보내지 않아 새 서버에서 400이 된다.
- 각 버튼 래퍼는 비동기 저장의 성공 여부를 기다리지 않고 범위 바텀시트를 즉시 닫는다. mutation 로딩,
  재클릭 방지, 사용자 오류 메시지가 없고 실패는 `console.error`에만 남는다.

### DTO, API와 Query

- `src/model/todo/todoList/dto.ts`에는 이미
  `RoutineUpdateType = 'SINGLE' | 'FROM_DATE' | 'ALL'`이 있으나 UI가 `FROM_DATE`를 사용하지 않는다.
- 현재 `TodoRoutine`에는 서버가 내려줄 수 있는 `repeatDays: string[] | null`이 없다. 폼을 거쳐 요청을
  다시 만들면 이 값을 보존할 수 없다.
- `PutTodoRequest.category`가 `string`이고 `RepeatType`에는 배포 API에 없는 `YEARLY`가 포함되어 있어 잘못된
  enum을 컴파일 단계에서 막지 못한다.
- `todoListApi.putTodo`는 `PUT /todos/{id}`의 응답을 `CommonResponse<TodoResponse>`로 가정하고
  `data.data`를 반환하지만, 배포 API의 성공 응답은 본문이 없는 `200`이다.
- `GET /todos/{id}` API 함수, 상세 DTO, 상세 query key와 query hook이 없다.
- 삭제 호출은 이미 `routineDeleteType`을 query string으로 전송하며 배포 API와 일치한다. 삭제 UI에는
  `SINGLE`과 `ALL`만 있고, 이번 기능에서 삭제용 `FROM_DATE` 버튼은 추가하지 않는다.

### 캐시 갱신

- `TodoFormProvider.invalidateAndClose(date)`는 본문의 새 `date`에 해당하는 목록 한 건과 count prefix만
  무효화한다.
- `SINGLE`로 날짜를 옮기면 원래 날짜 목록이 무효화되지 않고, `FROM_DATE`·`ALL`은 반복 범위 안의 여러
  날짜와 ID가 모두 바뀌는데 나머지 날짜 캐시는 그대로 남는다.
- 기존 `ALL` 삭제도 여러 날짜를 지우지만 같은 단일 날짜 무효화 함수를 사용한다.
- invalidation Promise를 기다리지 않고 폼을 reset/close하므로, 닫힌 화면이 재조회 전의 사라진 ID를 잠시
  다시 사용할 수 있다.

## 현재 클라이언트와 배포 API 비교

| 항목 | 현재 클라이언트 | 배포 API 계약 | 마이그레이션 |
| --- | --- | --- | --- |
| 수정 범위 | UI는 `SINGLE`, `ALL`만 사용 | `SINGLE \| FROM_DATE \| ALL` | 수정 바텀시트 중앙에 `해당 날짜 이후 수정`을 추가하고 `FROM_DATE` 전송 |
| `routine`과 범위 | 일반 편집은 `routine`만 보낼 수 있음 | `routine`을 보내면 `routineUpdateType` 필수. `FROM_DATE`/`ALL`이면 유효한 `routine` 필수 | 단일 request builder로 양방향 조건을 타입과 런타임 검증에 반영 |
| `PUT` 의미 | 일부 필드만 보내도 되는 것처럼 경로별 body가 다름 | 부분 수정이 아닌 전체 교체 | `date`, `content`와 보존할 `goalId`, `time`, `category`를 모든 수정 경로에서 일관되게 전송 |
| `PUT` 성공 응답 | `CommonResponse<TodoResponse>` 기대 | `200`, 빈 body | API 반환 타입을 `Promise<void>`로 변경하고 응답 객체에 의존하지 않음 |
| 수정 원본 | 날짜 목록의 캐시된 `GoalTodo` | 수정 직전 상세 응답의 최신 `routine` 사용 필요 | `GET /todos/{id}` 상세 query 추가, 성공 전까지 편집 폼/범위 저장 비활성화 |
| `routine` 필드 | `duration`, `repeatType`만 모델링 | `duration`, `repeatType`, 선택 `repeatDays: DayOfWeek[] \| null` | 상세 응답의 routine을 먼저 복사해 미지원 필드도 보존 |
| 반복 주기 | DTO에 `YEARLY` 포함 | `DAILY \| WEEKLY \| BIWEEKLY \| MONTHLY` | 서버 enum으로 타입 통일, 잘못된 값 전송 방지 |
| 기준일 | 폼의 변경 가능한 날짜만 보유 | path의 `{id}`가 가리키는 원래 회차 날짜. `FROM_DATE`가 이 날짜를 포함해 자름 | 최신 상세의 원래 `date`를 별도 보존하고 본문 `date`와 혼동하지 않음 |
| 본문 `date` | 사용자가 고른 투두 날짜 | 재생성할 첫 회차의 날짜와 요일 | 폼 값으로 전송하되 기준일 계산에는 사용하지 않음 |
| `duration.startDate` | 사용자가 수정 가능하고 목록 캐시 값을 전송 | `FROM_DATE`에서는 무시, `ALL`에서는 전체 반복 시작일로 사용 | 기존 반복 편집 시 최신 상세값으로 고정하고 임의 변경하지 않음 |
| 범위 수정 결과 | 반환된 기존 ID가 유지된다고 가정 가능한 구조 | `FROM_DATE`·`ALL`은 삭제 후 재생성, ID 변경, 결과 body 없음 | 낙관적 업데이트와 기존 ID 후속 사용 금지, 성공 후 목록 재조회 |
| 캐시 | 요청 body의 날짜 한 건만 invalidate | 범위 안 모든 회차가 바뀔 수 있음 | `FROM_DATE`·`ALL`은 캐시된 모든 날짜 목록/주간과 count를 invalidate 후 refetch |
| 삭제 | query에 `routineDeleteType` 전송 | 기존 계약과 동일, 생략 시 `SINGLE` | endpoint/DTO 유지. 기존 `ALL` 삭제에만 전 범위 cache refresh와 경고 보강 |
| 에러 | 콘솔 출력 후 범위 시트를 즉시 닫음 | 400 message, 404 소유권/존재 오류, 일부 형식 오류 500 | 로딩 중 유지·재클릭 방지, 실패 시 시트 유지와 Toast, 자동 mutation 재시도 금지 |

`GET /todos?date=...`는 `{ data: [{ todo, goal }] }`, `GET /todos/{id}`는
`{ data: { id, goalId, date, content, ... } }`로 응답 구조가 다르다. 같은 DTO나 변환기를 공유하며 한 겹을
임의로 제거하지 않는다.

## API·타입 설계

### 범위 타입과 요청 불변식

`routineUpdateType`은 서버 enum과 동일하게 유지한다.

```ts
export type RoutineUpdateType = 'SINGLE' | 'FROM_DATE' | 'ALL';
```

`PutTodoRequest`는 공통 전체 교체 필드와 범위별 union으로 표현한다.

- `SINGLE`: `routineUpdateType: 'SINGLE'`, `routine`은 보내지 않는다. 내용·날짜·목표·시간·카테고리만 해당
  회차에 반영한다.
- `FROM_DATE | ALL`: `routineUpdateType`과 `routine`을 모두 필수로 둔다.
- 반복 설정을 전혀 건드리지 않는 비반복 회차 수정은 scope와 routine을 함께 생략할 수 있지만, 홈 반복
  편집 UI는 사용자의 선택을 명확히 하기 위해 세 버튼에서 항상 scope를 보낸다.
- 반복이 없던 투두에 반복을 새로 설정하면 `ALL`과 `routine`을 함께 보내고, 이 경우에만
  `routine.duration.startDate = body.date`로 맞춘다.
- 기존 반복 투두에서 `repeatType = none`으로 바꾸는 것은 `routine` 생략이 “기존 반복 연결 유지”를 뜻해
  반복 해제가 되지 않는다. 서버에 반복 해제 계약이 추가되기 전까지 편집 화면의 `없음` 선택을 막고 안내한다.

공통 body에는 아래 값을 빠뜨리지 않는다.

| 필드 | 전송 규칙 |
| --- | --- |
| `todoId` | URL path에만 사용하고 body에서 제거 |
| `date` | 폼에서 선택한 `yyyy-MM-dd`, 필수 |
| `content` | trim 후 1~30자, 필수 |
| `goalId` | 연결된 투두는 최신 상세/폼의 ID를 항상 전송. 미분류는 서버 문서에 `null`이 명시되지 않았으므로 body에서 생략하는 방식으로 연결 없음 유지 |
| `time` | 현재 앱이 사용하는 time·category 서버 계열 기준으로 최신/폼 값을 `HH:mm` 또는 `null`로 항상 전송 |
| `category` | `NOW \| STEADY \| SKIP \| DELETE` 중 하나를 항상 전송 |

현재 앱은 목록 DTO와 UI가 `time`·`category` 계열을 사용하므로 그 계약으로 구현한다. 배포 환경의 상세
응답이 `isImportant` 계열이라면 구현을 진행하지 말고 환경 스펙을 먼저 확정한다. 두 계열 필드를 임의로
동시에 보내지 않는다.

### routine 생성 규칙

기존 반복 투두의 `FROM_DATE`·`ALL` body는 폼 값만으로 새 객체를 만들지 않는다.

1. 바텀시트를 열 때 `GET /todos/{id}`를 `staleTime: 0`, open 시 refetch 조건으로 실행한다.
2. 조회된 `routine` 전체를 복사해 `repeatDays` 등 현재 UI가 편집하지 않는 필드를 보존한다.
3. 사용자가 실제로 수정 가능한 `repeatType`, `duration.endDate`만 덮어쓴다.
4. `duration.startDate`는 최신 상세 응답 값을 그대로 유지한다.
5. `FROM_DATE` 선택 시 `duration.endDate >= originalTodo.date`를 확인한다. 서버가 자르는 기준은 수정된
   `body.date`가 아니라 path ID 회차의 원래 날짜다.
6. 상세 조회에 routine이 없는데 `FROM_DATE`·`ALL`을 선택했거나 필수 routine 필드가 비어 있으면 API를
   호출하지 않고 폼 오류를 표시한다.

### 엔드포인트

#### `GET /todos/{id}` 추가

- 목적: 편집 직전 원래 날짜와 최신 routine을 확보한다.
- 응답: `CommonResponse<TodoDetail>`.
- `TodoDetail`은 `id`, `goalId`, `date`, `content`, `time`, `category`, `isCompleted`, `routine`을 모델링한다.
- 상세 query key는 `['todos', 'detail', todoId]`로 두고 빈 ID일 때 비활성화한다.
- 편집 바텀시트를 다시 열 때 오래된 detail 캐시만 사용하지 않고 서버 확인을 수행한다.

#### `PUT /todos/{id}` 변경

- 전체 교체 body와 scope union을 전송한다.
- `200` 빈 body를 성공으로 처리하고 `void`를 반환한다.
- `FROM_DATE`·`ALL`은 응답에서 신규 ID를 얻으려 하지 않는다.

#### `DELETE /todos/{id}?routineDeleteType=...` 유지

- API signature와 DTO는 변경하지 않는다.
- `SINGLE`/`ALL` UI도 이번 기능에서는 유지한다.
- `ALL` 성공 후에는 범위 수정과 같은 전 날짜 캐시 갱신 정책을 적용한다.

## 컴포넌트와 상태 설계

### `TodoBottomSheet` 상세 조회 상태

편집 모드에서는 목록의 `values`를 저장 요청의 기준으로 사용하지 않는다.

- `isOpen && mode === 'edit' && todoId`일 때 상세 query를 활성화한다.
- loading 동안 편집 내용을 임시 목록 데이터로 채우지 않고 바텀시트 로딩 상태를 표시한다.
- error 동안 `다시 시도`, `닫기` 동작을 제공하고 범위 선택과 제출을 막는다.
- success 뒤 상세 응답을 `TodoFormData`로 변환해 폼을 reset하고, 같은 원본 detail을 request builder에
  보관한다.
- 다른 todoId로 전환될 때 이전 상세/폼 값이 한 프레임 노출되지 않도록 query key와 form reset 경계를
  todoId로 맞춘다.

서버 상태는 TanStack Query, 범위 선택 시트의 열림과 선택 버튼 상태는 기존 로컬 BottomSheet 상태,
입력값과 validation은 React Hook Form + Zod에 둔다. 별도 전역 Context는 추가하지 않는다.

### `EditBottomSheet` 버튼과 상태

버튼 순서는 다음으로 고정한다.

1. `해당 투두만 수정` → `SINGLE`
2. `해당 날짜 이후 수정` → `FROM_DATE`
3. `전체 반복 투두 수정` → `ALL`

세 버튼은 별도 handler를 복제하지 않고 `handleEdit(scope)` 하나를 호출한다. 기존 범위 선택이므로 버튼의
시각 계층은 현재 SINGLE/ALL 스타일을 유지하고 신규 버튼은 두 범위 사이에 둔다.

- `SINGLE`은 폼 검증 뒤 바로 저장한다. `FROM_DATE`와 `ALL`은 선택 scope를 로컬 상태에 보관하고 기존
  `shared/components/feedBack/Modal`을 재사용한 별도 확인 모달을 먼저 연다.
- `FROM_DATE` 확인에는 “이 날짜를 포함한 이후 투두가 다시 생성됩니다”, `ALL` 확인에는 “지난 투두를
  포함한 전체 반복 투두가 다시 생성됩니다”를 표시한다. 취소하면 요청 없이 범위 선택으로 돌아간다.
- 날짜·요일·반복 주기·repeatDays 변경으로 회차 날짜가 달라질 수 있으면 확인 모달에 “기존 날짜와
  일치하지 않는 투두의 완료 기록은 초기화됩니다”를 추가한다.
- 확인 버튼으로 mutation이 시작되면 pending scope를 유지하고 완료까지 범위 버튼, 확인/취소, 닫기,
  바깥 dismiss를 비활성화한다.
- 확인 버튼에는 loading 상태를 보여 중복 PUT을 막는다.
- 폼 validation 실패 또는 API 실패 시 범위 시트와 메인 편집 시트를 유지한다.
- 성공하고 캐시 재조회가 끝난 뒤에만 범위 시트, 편집 시트, 폼을 순서대로 닫는다.
- 사용자가 반복 주기·종료일을 변경했다면 `SINGLE`은 비활성화하고 “반복 설정 변경은 해당 날짜 이후 또는
  전체에만 적용할 수 있어요”를 노출한다. `SINGLE`에서 routine이 조용히 무시되는 서버 동작을 UI에서 막는다.
- 원래 비반복 투두에 반복을 새로 설정한 경우 `ALL`만 활성화하고 명시적으로 `ALL`을 전송한다.
- 기존 반복의 시작일 선택은 편집 모드에서 읽기 전용으로 표시한다. 추가 모드에서는 현재 시작일 선택 동작을
  유지한다.
- `data.date !== originalTodo.date`인데 `FROM_DATE` 또는 `ALL`을 선택하는 경우 위 별도 확인 모달의 완료
  기록 초기화 경고를 반드시 활성화한다.

### 에러 처리

- Zod에서 content를 trim 후 `1~30자`, date를 정확한 `yyyy-MM-dd`, time을 `HH:mm`으로 검증한다.
- `routineUpdateType`은 TypeScript union과 scope 상수에서만 생성해 임의 문자열 입력을 차단한다.
- `FROM_DATE` 종료일이 원래 회차 날짜보다 빠르면 API 호출 전에 `반복 종료일은 수정 기준일보다 앞설 수
  없습니다.`를 폼에 표시한다.
- 400은 `response.data.message`를 Toast로 노출한다. content 길이는 로컬에서 먼저 막으므로 서버의 잘못된
  “5자 이상” 메시지 문자열을 비교해 분기하지 않는다.
- 404는 ID 재생성 또는 이미 삭제된 회차일 수 있으므로 자동 재시도하지 않는다. 모든 날짜 목록을 refetch한
  뒤 “목록이 변경되었습니다. 최신 투두를 다시 선택해주세요.”를 표시하고 편집을 종료한다.
- 500도 자동 재시도하지 않고 일반 오류 Toast를 표시하며 사용자가 직접 목록을 확인하도록 한다.
- mutation 기본 재시도는 사용하지 않는다. 서버 처리 뒤 응답만 유실된 요청을 같은 사라진 ID로 재전송하면
  404가 될 수 있기 때문이다.

## 캐시 무효화와 재조회 정책

query key에 날짜 목록 prefix를 명시적으로 추가한다.

```ts
todoListQueryKeys.lists(); // ['todos', 'getTodosByDate']
todoListQueryKeys.getTodosByDate(date);
todoListQueryKeys.detail(todoId);
todoListQueryKeys.counts(); // ['todos', 'getTodoCountByDate']
```

성공 scope에 따라 다음처럼 처리한다.

| 동작 | 목록 캐시 | 상세 캐시 | count 캐시 | 닫기 시점 |
| --- | --- | --- | --- | --- |
| `SINGLE`, 날짜 유지 | 원래 날짜 invalidate/refetch | 기존 ID detail 제거 또는 invalidate | counts invalidate | 활성 목록 refetch 완료 후 |
| `SINGLE`, 날짜 이동 | 원래 날짜와 body date 모두 invalidate/refetch | 기존 ID detail invalidate | counts invalidate | 두 활성 목록 반영 후 |
| `FROM_DATE` | `lists()` 아래 캐시된 모든 날짜를 `refetchType: 'all'`로 invalidate/refetch | 기존 ID detail 제거 | counts 전체 invalidate/refetch | 새 ID 목록 확보 후 |
| `ALL` 수정 | `FROM_DATE`와 동일 | 기존 ID detail 제거 | counts 전체 invalidate/refetch | 새 ID 목록 확보 후 |
| `ALL` 삭제 | `FROM_DATE`와 동일 | 기존 ID detail 제거 | counts 전체 invalidate/refetch | 삭제 결과 반영 후 |

현재 쿼리는 날짜별 목록이라 “모든 영향 주간”은 `getTodosByDate` prefix 아래 이미 캐시된 모든 날짜를 뜻한다.
서버 응답에 실제 영향 날짜 목록이 없으므로 종료일 범위를 추측해 일부만 갱신하지 않는다. inactive query도 stale
표시만 하고 끝내지 말고 캐시된 날짜를 refetch해 주간·월간·상세 화면이 새 ID와 좁혀진 routine duration을
같이 받게 한다. count prefix도 동일 범위로 갱신한다.

mutation 성공 직후 로컬 배열에서 한 건만 고치거나 제거하는 낙관적 업데이트는 `FROM_DATE`·`ALL`에 사용하지
않는다. invalidate/refetch Promise를 `await`한 뒤 reset/close하고, mutation 시작 전에 보유한 todoId로 후속
API 요청을 만들지 않는다.

## 파일별 변경 계획

### 1. 타입 정의

- `src/shared/type/GoalTodo.ts`
  - 서버 반복 enum을 `DAILY | WEEKLY | BIWEEKLY | MONTHLY`로 맞춘다.
  - `MONDAY ... SUNDAY` repeat day 타입과 `GoalTodoRoutine.repeatDays?: RepeatDay[] | null`을 추가한다.
- `src/model/todo/todoList/dto.ts`
  - `TodoCategory`, `TodoRoutine`, `TodoDetail`, `TodoDetailResponse`를 실제 상세/수정 계약으로 정리한다.
  - `PutTodoRequest`를 `SINGLE`/범위 수정 discriminated union으로 바꿔 routine-scope 양방향 필수를 강제한다.
  - `category: string`을 네 개 enum으로 좁히고 배포 API에 없는 `YEARLY`를 제거한다.
- `src/feature/todo/todoBottomSheet/types.ts`
  - 폼 타입은 서버 repeat/category 타입을 재사용하고, 최신 상세 원본과 비교할 수 있는 최소 초기 routine
    snapshot 타입을 정의한다.
- `src/feature/todo/todoBottomSheet/form/todoFormSchema.ts`
  - content 최대 길이를 현재 34자에서 서버 계약인 30자로 변경한다.
  - date/time 정규식과 routine 종료일 검증을 강화한다. 원래 회차 날짜가 필요한 FROM_DATE 검증은 scope 선택
    시 `handleEdit`에서 추가 검증한다.

### 2. 데이터 계층

- `src/model/todo/todoList/api.ts`
  - `getTodoById(todoId)`를 추가한다.
  - `putTodo`의 성공 타입을 빈 body에 맞춘 `void`로 바꾼다.
  - delete query는 문자열 조합 대신 Axios `params`를 사용해 enum을 안전하게 전달한다.
- `src/model/todo/todoList/queryKeys.ts`
  - `lists`, `detail(todoId)`, `counts` prefix key를 추가해 범위 invalidation 대상을 명확히 한다.
- `src/model/todo/todoList/queries.ts`
  - 편집 open 시 사용할 `useTodoById` query를 추가한다.
  - PUT/DELETE mutation은 자동 retry 없이 유지하고 반환 body를 기대하지 않는다.
- `src/model/todo/todoList/index.ts`
  - 새 상세 query와 DTO를 public API로 export한다.

### 3. 편집 폼과 기능 UI

- `src/feature/todo/todoBottomSheet/TodoBottomSheet.tsx`
  - 편집 모드의 상세 loading/error/success 분기를 연결한다.
  - 목록 `values`가 아닌 최신 상세 기반 폼 값을 Provider에 전달하고, query 실패 시 재시도 UI를 제공한다.
- `src/feature/todo/todoBottomSheet/form/TodoFormProvider.tsx`
  - 중복된 `handleEditSingle`, `handleEditAll`을 `handleEdit(scope)`로 통합하고 `FROM_DATE`를 지원한다.
  - 전체 교체 body 생성 함수를 한 곳에 두고 `time`, `category`, 목표 연결과 최신 routine을 보존한다.
  - scope별 validation, pending scope, Axios 오류/Toast, 성공 후 await하는 cache refresh를 Context에 제공한다.
  - 기존 `ALL` 삭제도 다중 날짜 refresh 정책을 사용하게 한다.
- `src/feature/todo/todoBottomSheet/components/subBottomSheet/editSelectView/EditBottomSheet.tsx`
  - 세 범위 버튼, 선택 scope, pending/disabled 상태, 반복 설정 변경 시 SINGLE 제한을 렌더링한다.
  - 기존 shared `Modal`과 `Button`을 사용해 FROM_DATE/ALL 영향 범위, 완료 이력 위험, 취소/확인 동작을
    구현한다. 별도 범용 UI primitive는 만들지 않는다.
  - 비동기 결과 전에 `onClose`를 호출하는 현재 wrapper를 제거한다.
- `src/feature/todo/todoBottomSheet/components/subBottomSheet/deleteSelectView/DeleteBottomSheet.tsx`
  - 신규 삭제 범위 버튼은 추가하지 않는다.
  - 기존 `ALL`에 “지난 기록도 함께 사라지며 되돌릴 수 없습니다” 문구와 pending/실패 시 유지 동작을 추가한다.
- `src/feature/todo/todoBottomSheet/components/content/mainView/MainView.tsx`
  - 기존 반복 편집에서는 반복 `없음` 선택과 시작일 변경을 막을 수 있도록 edit 원본 상태를 하위 뷰에 전달한다.
- `src/feature/todo/todoBottomSheet/components/content/dateSelectView/DateSelectView.tsx`
  - 추가 모드는 시작일/종료일 편집을 유지한다.
  - 기존 반복 편집은 시작일 탭을 읽기 전용으로 하고 종료일만 변경하며, FROM_DATE 선택 가능 조건에 맞춰
    원래 회차 날짜 이전 종료일을 저장하지 못하게 한다.
- `src/feature/todo/todoBottomSheet/components/content/repeatSelectView/RepeatSelectView.tsx`
  - 기존 반복 편집에서 `none`을 disabled 처리하고 이유를 안내한다. 신규/비반복 편집의 반복 추가는 유지한다.

### 4. 편집 진입부

- `src/composite/home/todoListContainer/TodoListContainer.tsx`
  - 편집 대상의 ID와 원래 목록 날짜만 진입 정보로 보존한다.
  - 목록 객체로 만든 `values`를 저장 원본으로 전달하는 경로를 제거하고 상세 query 상태에 맡긴다.
- `src/composite/home/todoListContainer/helper/index.ts`
  - `GoalTodo -> TodoFormData`의 캐시 기반 `convertToFormData`를 제거하거나, 상세 DTO 전용 변환으로 교체한다.
  - 신규 추가용 `createNewTodo`는 이번 서버 편집 마이그레이션과 무관하므로 동작을 변경하지 않는다.

### 5. 레거시 PUT 호출 점검

- `src/feature/todo/weeklyTodoList/api/api.ts`
  - 이 파일에도 `PUT /todos/{id}` 호출이 있으나 현재 전체 `WeeklyTodoList`는 라우트에서 사용되지 않고,
    `DateSelectorPanel`만 목표 폼에서 재사용된다.
  - 재활성화 시 목표 연결을 잃지 않도록 `ChangeTodoRequest`를 전체 교체 계약으로 마이그레이션하거나,
    사용되지 않는 수정 API/hook을 별도 정리한다. 새 서버가 빈 body를 반환하므로 응답 타입 의존도 제거한다.
- `src/feature/todo/weeklyTodoList/hooks/useFetchEditTodo.ts`
  - 위 레거시 UI를 유지한다면 상세 조회 후 보존 필드를 모두 전송하고, 로컬에서 가짜 `updatedTodo`를 만드는
    대신 목록을 refetch한다.

레거시 파일 정리는 홈 바텀시트보다 먼저 계약 위반을 제거하되, 사용되지 않는 코드 삭제는 별도 승인 없이 이
기능 구현에 섞지 않는다.

## 구현 순서

1. `GoalTodo`/DTO enum, `repeatDays`, 상세 응답, 범위별 `PutTodoRequest` 타입을 먼저 맞춘다.
2. `GET /todos/{id}` API, query key, query hook과 빈 PUT 응답 처리를 구현한다.
3. 바텀시트 open 시 최신 상세를 조회하고 loading/error 상태에서 stale 폼 저장을 차단한다.
4. 상세 응답을 폼에 채우고 기존 반복의 startDate/미지원 routine 필드를 보존하는 단일 request builder를
   만든다.
5. 폼 스키마를 1~30자와 날짜 형식에 맞추고 기존 반복의 시작일/반복 해제 제한을 적용한다.
6. Provider의 세 수정 handler를 `handleEdit(scope)`로 통합한 뒤 전체 교체 필드와 `FROM_DATE`를 연결한다.
7. `EditBottomSheet`에 신규 버튼, FROM_DATE/ALL 확인 모달, pending, validation, 완료 기록 경고와 실패
   유지 동작을 추가한다.
8. scope별 query invalidation/refetch를 구현하고 기존 `ALL` 삭제에도 다중 날짜 정책을 적용한다.
9. 레거시 `/todos/{id}` PUT 호출의 빈 응답/전체 교체 위험을 정리한다.
10. 타입 검사, build, API mock/개발 서버와 모바일 수동 회귀를 순서대로 실행한다.

## 테스트 계획

현재 `package.json`에는 Jest/Vitest `test` 스크립트가 없고 저장소 자체 todo 단위 테스트도 없다. 새 테스트
러너를 이 기능만을 위해 추가하지 않는다. 기존 Playwright/MSW 구성이 작업 브랜치에 연결되면 request builder,
scope UI와 cache refresh를 자동화하고, 그렇지 않으면 아래 시나리오를 네트워크 요청과 React Query Devtools로
수동 검증한다.

### 타입·요청 검증

- `routine`만 있거나 `FROM_DATE`/`ALL`만 있는 요청은 TypeScript에서 생성할 수 없다.
- 모든 PUT에 `date`, trim된 `content`, 현재 목표 연결, `time`, `category`가 들어간다.
- `SINGLE`은 routine을 보내지 않고 `FROM_DATE`·`ALL`은 최신 상세의 complete routine을 보낸다.
- 상세 응답의 `repeatDays: null` 또는 배열이 수정 요청에서 소실되지 않는다.
- PUT 200 빈 응답을 성공 처리하고 `data.data`를 읽지 않는다.

### 범위별 API 시나리오

1. 3/9 반복 회차 내용만 바꾸고 `SINGLE`을 선택하면 3/9 ID와 완료 상태가 유지되고 다른 회차는 그대로다.
2. 3/9에서 `FROM_DATE`를 선택하면 3/2는 유지되고 3/9 이후 내용이 바뀌며, 이후 회차 ID가 새 값으로
   재조회된다.
3. 같은 조건에서 `ALL`을 선택하면 과거를 포함한 전체 회차가 바뀌고 새 ID가 반영된다.
4. 3/9의 body date를 3/11로 바꿔 `FROM_DATE`를 선택하면 기준일은 원래 3/9이고 새 회차는 수요일에
   생성되며 완료 기록 경고가 먼저 보인다.
5. `FROM_DATE`에서 종료일을 원래 3/9 이전으로 고르면 네트워크 요청 없이 폼 오류가 표시된다.
6. 반복이 없던 투두에 반복을 추가하면 `ALL`, `routine`, `startDate === body.date`가 전송된다.
7. 기존 반복 편집에서 시작일과 `none`을 선택할 수 없고, 반복 값을 바꾼 상태에서는 SINGLE이 비활성화된다.

### UI·상태·에러

- 세 버튼이 SINGLE → FROM_DATE → ALL 순서와 `해당 투두만 수정`, `해당 날짜 이후 수정`,
  `전체 반복 투두 수정` 문구로 보인다.
- FROM_DATE/ALL은 별도 확인 모달에서 영향 범위와 완료 기록 위험을 확인해야 PUT이 시작되고, 취소 시
  요청하지 않는다.
- mutation 중 선택 버튼은 loading, 나머지 버튼과 dismiss는 disabled이며 빠른 연속 탭에도 PUT은 한 번이다.
- validation/400/500 실패 시 양쪽 바텀시트가 유지되고 Toast가 표시된다.
- 404는 자동 PUT 재시도 없이 목록을 다시 읽고 최신 항목 재선택 안내를 표시한다.
- 상세 GET loading 중 과거 목록 routine이 폼에 노출되거나 저장되지 않고, 실패 시 다시 시도할 수 있다.

### 캐시·회귀

- SINGLE 날짜 유지/이동에서 원래 날짜와 새 날짜 목록 및 count가 정확히 갱신된다.
- FROM_DATE/ALL 뒤 현재 주뿐 아니라 미리 방문해 캐시된 이전·다음 주와 월간 날짜 목록이 refetch된다.
- 범위 수정 뒤 화면 어느 곳에서도 옛 ID로 완료 토글, 수정, 삭제 요청을 보내지 않는다.
- `ALL` 삭제 뒤 다른 주의 삭제 대상 회차와 count가 남지 않는다.
- 비반복 투두 수정, 투두 추가, SINGLE 삭제, 완료 토글, 목표 선택, 시간/카테고리 저장에 회귀가 없다.
- 모바일 `max-width: 448px`에서 세 버튼, 경고, loading/error 문구가 잘리거나 하단 safe area에 가리지 않는다.
- `yarn build`와 프로젝트에서 사용 가능한 lint/type 검증이 성공한다.

## 예상 변경 파일

```text
src/
├── composite/home/todoListContainer/
│   ├── TodoListContainer.tsx
│   └── helper/index.ts
├── feature/todo/
│   ├── todoBottomSheet/
│   │   ├── TodoBottomSheet.tsx
│   │   ├── types.ts
│   │   ├── form/
│   │   │   ├── TodoFormProvider.tsx
│   │   │   └── todoFormSchema.ts
│   │   └── components/
│   │       ├── content/
│   │       │   ├── mainView/MainView.tsx
│   │       │   ├── dateSelectView/DateSelectView.tsx
│   │       │   └── repeatSelectView/RepeatSelectView.tsx
│   │       └── subBottomSheet/
│   │           ├── editSelectView/EditBottomSheet.tsx
│   │           └── deleteSelectView/DeleteBottomSheet.tsx
│   └── weeklyTodoList/
│       ├── api/api.ts
│       └── hooks/useFetchEditTodo.ts
├── model/todo/todoList/
│   ├── api.ts
│   ├── dto.ts
│   ├── index.ts
│   ├── queries.ts
│   └── queryKeys.ts
└── shared/type/GoalTodo.ts
```

- 신규 소스 파일: 0개
- 수정 예상 소스 파일: 최대 19개
- 삭제 파일: 0개
- 문서 외 실제 파일 수는 구현 중 기존 변환 함수 위치를 유지하는지에 따라 줄어들 수 있다.

## 완료 조건

- [ ] 반복 투두 수정 범위에 `해당 날짜 이후 수정` 버튼이 보이고 `FROM_DATE`가 전송된다.
- [ ] `routineUpdateType`은 `SINGLE | FROM_DATE | ALL`로 제한되고 routine과의 필수 조건이 보장된다.
- [ ] PUT 전체 교체 필드가 모든 수정 경로에서 보존된다.
- [ ] 기존 반복의 범위 수정은 직전 상세 조회의 routine/startDate를 사용한다.
- [ ] `FROM_DATE`의 기준일, body date, `routine.duration.startDate`를 서로 다른 의미로 처리한다.
- [ ] `FROM_DATE`·`ALL` 뒤 새 ID와 routine duration을 목록 재조회로 반영한다.
- [ ] 모든 캐시된 영향 날짜/주간과 count가 invalidate/refetch된다.
- [ ] pending, validation, 400/404/500 오류 상태가 사용자에게 보이고 실패 시 편집 내용을 잃지 않는다.
- [ ] 기존 삭제 API 계약은 유지되고 `ALL` 삭제의 캐시와 경고가 안전하게 보강된다.
- [ ] 투두 추가·비반복 수정·완료·삭제와 모바일 레이아웃에 회귀가 없다.
- [ ] `yarn build`가 성공한다.

## 범위 제외

- 서버 반복 생성·분할 로직 변경
- 삭제 모달의 신규 `FROM_DATE` 버튼 추가
- 여러 요일 `repeatDays`를 직접 편집하는 신규 UI
- `isImportant` 서버 계열과 `time`·`category` 서버 계열의 동시 지원
- 서버 에러 코드/메시지 형식 개선
- 신규 테스트 러너 도입 또는 사용되지 않는 레거시 todo 기능 삭제
