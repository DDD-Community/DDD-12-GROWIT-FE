# Task 02. 월간 투두 레이아웃 개선 — 프론트엔드 변경 계획

## 문서 목적

기능 문서의 월간 선택일 정렬 요구사항을 현재 프론트엔드 구조에 맞춰 실제 변경 단위로 매핑한다. 구현 대상은 월간 캘린더 그리드가 아니라, 월간 모드에서 캘린더 아래에 노출되는 선택일 투두 목록이다.

기준 문서는 다음과 같다.

- [작업 및 기능 개요](../README.md)
- [월간 투두 레이아웃 기능 문서](../feature/02-monthly-layout.md)

## 구현 결론

공통 정렬 함수는 `src/feature/todo/todoList/helper.ts`에 두고, `src/feature/todo/todoList/TodoList.tsx`에서 조회·변환된 투두를 한 번 정렬한 뒤 모든 뷰에 전달한다.

이 위치를 사용하면 다음 화면이 같은 정렬 결과를 공유한다.

- 월간 `ListView`: 정렬된 전체 선택일 투두
- 주간 `MatrixView`: 정렬된 배열을 카테고리별로 분리한 결과
- 카테고리 `CategoryDetailView`: 위 카테고리 배열과 같은 결과
- 주간 중요 현황 `WeeklyImportantStatusView`: 정렬된 배열을 `NOW`, `STEADY`로 필터한 결과

`ListView` 안에서만 별도로 정렬하면 월간 요구사항은 충족해도 주간·상세와 정책이 갈라진다. 따라서 `ListView`는 전달받은 순서대로 렌더링하는 표시 컴포넌트로 유지한다.

## 현재 월간 데이터·렌더링 경로

```text
TodoListContainerFormProvider
└─ selectedDate / calendarView 상태
   └─ TodoListContainer
      ├─ calendarView === 'monthly'
      │  └─ viewMode = 'list'
      ├─ Calendar(view='monthly')
      │  └─ MonthView
      │     ├─ getMonthDates(): 42개 날짜 셀
      │     └─ useTodoCountByDate(): 날짜별 카테고리 인디케이터
      └─ TodoList(selectedDate, viewMode='list')
         ├─ format(selectedDate, 'yyyy-MM-dd')
         ├─ useTodosByDate({ date })
         │  └─ GET /todos?date=YYYY-MM-DD
         ├─ transformTodosData(todosData)
         │  └─ API 응답 순서를 유지한 GoalTodo[]
         └─ ListView(todos)
            └─ todos.map(...): 전달받은 순서 그대로 렌더링
```

현재 월간 목록에는 정렬 단계가 없다. `transformTodosData`는 목표 정보와 `미분류` 이름을 보정할 뿐 순서를 바꾸지 않으며, `ListView`도 배열을 그대로 `map`한다.

기능 문서에 언급된 `groupAndSortTodos`는 현재 렌더링 경로에서 호출되지 않는다. 월간 `ListView`는 목표별 섹션 UI가 아닌 평면 목록이며 목표명은 각 행의 `GoalTag`로만 표시한다. 따라서 현재 월간 화면에는 그룹 가나다순 및 `미분류` 마지막 규칙이 적용될 그룹 자체가 없다. 다만 `groupAndSortTodos`의 그룹 내부 정렬도 공통 함수로 교체하여 이후 그룹 UI가 다시 사용되더라도 정책이 달라지지 않게 한다. `sortGroups`의 목표명 가나다순 및 `미분류` 마지막 로직은 그대로 유지한다.

## 변경 대상 파일

| 파일 | 대상 함수·구간 | 변경 이유와 반영 내용 |
| --- | --- | --- |
| `src/feature/todo/todoList/helper.ts` | 신규 공개 정렬 함수, 기존 `sortTodosInGroup`, `groupAndSortTodos` | 원본 배열을 변경하지 않는 공통 정렬 함수를 만든다. 기존 완료 여부만 비교하던 그룹 내부 정렬을 공통 함수 호출로 바꾸고, `sortGroups` 정책은 유지한다. |
| `src/feature/todo/todoList/TodoList.tsx` | `todos`, `categoryGroups`의 `useMemo`, 각 view props | `transformTodosData` 결과에서 `sortedTodos`를 파생한다. 월간 `ListView`에는 `sortedTodos`를 전달하고, 카테고리 그룹과 상태 뷰도 같은 배열에서 파생시킨다. 조회·mutation·화면 상태 로직은 유지한다. |
| 정렬 함수 테스트 파일(신규, 테스트 러너 도입 시) | 공통 비교 규칙 단위 테스트 | 완료 여부, 시간 유무, 시간순, 한글 콘텐츠순, 동률 안정성, 원본 불변성을 데이터 조합별로 검증한다. 현재 저장소에는 Jest/Vitest 설정과 `test` 스크립트가 없으므로 구현 시 기존 팀 테스트 환경을 확인한 뒤 파일명과 러너를 확정한다. |

### 확인했으나 변경하지 않는 파일

| 파일 | 변경하지 않는 이유 |
| --- | --- |
| `src/feature/todo/todoList/components/ListView.tsx` | 이미 props 배열 순서를 그대로 렌더링한다. 여기에서 재정렬하면 공통 정렬이 중복되고 월간만 별도 정책을 갖게 된다. 행의 로컬 체크 상태와 표시 UI는 유지한다. |
| `src/composite/home/todoListContainer/TodoListContainer.tsx` | 월간일 때 `viewMode='list'`를 선택하는 현재 분기가 정확하다. `selectedDate`와 주간·월간 전환 상태도 이곳에서 유지되므로 정렬을 추가할 필요가 없다. |
| `src/feature/todo/calendar/Calendar.tsx` | 선택 날짜와 월 이동을 관리할 뿐 선택일 투두 배열을 다루지 않는다. |
| `src/feature/todo/calendar/components/monthly/MonthView.tsx` | 42개 날짜 셀과 `/todos/count` 인디케이터 전용이다. 목록 정렬과 데이터 경로가 분리되어 있다. |
| `src/model/todo/todoList/queries.ts`, `api.ts`, `queryKeys.ts` | API 스키마·서버 정렬을 바꾸지 않고, 현재 날짜별 조회와 query key를 그대로 사용한다. |
| `src/feature/todo/todoBottomSheet/form/TodoFormProvider.tsx` | 같은 날짜의 추가·수정 완료 후 해당 날짜 목록 및 월간 개수 query를 이미 무효화한다. 정렬은 재조회 결과의 파생 단계에서 자동 재실행된다. |

## 공통 정렬 함수 상세

공통 함수는 `GoalTodo[]`를 받아 새 배열을 반환하는 공개 유틸리티로 구현한다. 이름은 구현 시 프로젝트 명명 규칙에 맞추되, 예시는 `sortTodos`로 표기한다.

```ts
sortTodos(todos: GoalTodo[]): GoalTodo[]
```

비교 순서는 다음과 같이 고정한다.

1. `isCompleted === false`를 `true`보다 먼저 둔다.
2. 같은 완료 상태에서는 유효한 `time`이 있는 항목을 먼저 둔다.
3. 둘 다 시간이 있으면 API 계약의 `HH:mm` 문자열을 오름차순 비교한다.
4. 둘 다 시간이 없으면 `content.localeCompare(other.content, 'ko')`로 비교한다.
5. 위 비교가 같으면 입력 배열의 상대 순서를 유지한다. 입력 순서를 보존할 수 없는 호출 경로가 생기면 `id` 오름차순을 마지막 기준으로 사용한다.

`time`이 `null`, `undefined`, 빈 문자열이면 시간이 없는 항목으로 취급한다. API 계약상 유효한 값은 zero-padding 된 `HH:mm`이므로 문자열 비교로 시간순이 성립한다. API 응답이 이 계약을 위반할 가능성까지 방어하려면 유효성 검사 또는 정규화 정책을 API 계층과 먼저 합의해야 하며, 이번 작업에서 임의로 표시 순서를 정의하지 않는다.

안정성을 브라우저의 sort 구현에만 암묵적으로 맡기지 않도록 입력 index를 함께 비교하는 decorate-sort-undecorate 방식 또는 동등한 명시적 방식을 우선한다. 어떠한 방식이든 `todos.sort(...)`처럼 React Query가 제공한 배열을 직접 변경하지 않아야 한다.

### `TodoList` 반영 위치

`TodoList`의 파생 값은 다음 순서로 구성한다.

```text
todosData
→ transformTodosData
→ sortTodos
→ sortedTodos
   ├─ ListView.todos
   ├─ groupTodosByCategory → MatrixView.groups
   │                        └─ CategoryDetailView.todos
   └─ WeeklyImportantStatusView.todos
```

`groupTodosByCategory`는 입력 순서대로 각 카테고리 배열에 `push`하므로, 먼저 정렬된 배열을 넘기면 각 카테고리 내부에서도 공통 순서가 유지된다. `WeeklyImportantStatusView`의 `filter`도 상대 순서를 유지한다.

`sortedTodos`는 `useMemo`로 계산하고 의존성은 변환된 `todos`로 둔다. 날짜 선택, query refetch 또는 mutation 후 query data가 바뀔 때만 다시 계산되게 하며 렌더마다 불필요한 정렬을 반복하지 않는다. `hasAnyTodos`는 정렬 전후 길이가 같으므로 기존 `todos.length` 또는 `sortedTodos.length` 어느 쪽을 사용해도 의미가 같지만, 데이터 흐름을 명확히 하기 위해 `sortedTodos.length`로 통일한다.

## 상태 갱신 영향

정렬 결과는 별도 React state로 저장하지 않고 query data에서 매번 파생한다. 이렇게 해야 서버 응답, 날짜 변경 및 mutation refetch와 정렬 상태가 어긋나지 않는다.

| 사용자 동작 | 현재 상태 갱신 경로 | 정렬 반영 시점과 확인 사항 |
| --- | --- | --- |
| 완료 토글 | `ListTodoItem`이 체크 UI를 로컬 state로 먼저 바꾸고 `TodoList.handleToggle` → `usePatchTodoStatus.mutateAsync` → 선택 날짜 및 개수 query invalidate | 체크 표시는 즉시 바뀌지만 목록 위치 이동은 서버 성공 후 날짜 query가 갱신되어 `sortedTodos`가 재계산될 때 발생한다. 실패 시 query data는 유지되므로 로컬 체크 표시의 롤백 여부는 기존 동작 범위로 남는다. |
| 투두 추가 | `TodoFormProvider.handleSubmit` → `usePostAddTodo` → 제출한 날짜 및 개수 query invalidate | 선택 날짜에 추가한 경우 refetch 결과가 `sortedTodos`에 들어오며 완료=false, 시간·콘텐츠 값에 맞는 위치에 나타난다. |
| 시간·콘텐츠 수정 | `TodoFormProvider.handleSubmit` → `usePutTodo` → 제출한 날짜 및 개수 query invalidate | 같은 날짜 수정은 refetch된 `time`/`content`로 재비교되어 위치가 바뀐다. 정렬된 배열을 state에 복사하지 않으므로 stale 순서가 남지 않는다. |
| 삭제 | `TodoList.handleDelete` 또는 Bottom Sheet 삭제 → `useDeleteTodo` → 날짜 및 개수 query invalidate | refetch 후 항목이 제거되고 남은 항목이 공통 정책 순서로 유지된다. |
| 날짜 선택 | `TodoListContainerFormProvider.setSelectedDate` → 날짜별 query key 변경 | 새 날짜 query 결과마다 독립적으로 정렬한다. 이전 날짜의 정렬 결과를 재사용하지 않는다. |
| 주간·월간 전환 | `calendarView`만 바뀌고 `selectedDate` 및 `TodoList` query는 유지 | 같은 `sortedTodos`를 `MatrixView` 또는 `ListView`에 전달하므로 동일 날짜의 상대 순서가 일관된다. |

편집 중 날짜 자체를 다른 날짜로 바꾸는 경우 현재 `TodoFormProvider.invalidateAndClose(data.date)`는 새 날짜 query만 무효화한다. 기존 날짜 캐시까지 무효화하는 문제는 이번 요구사항의 “같은 날짜에서 시간·내용 수정 후 재정렬” 범위와 별개인 기존 캐시 동기화 이슈다. 날짜 이동 편집까지 완료 기준에 포함한다면 원래 날짜와 새 날짜 query를 모두 무효화하도록 `TodoFormProvider`를 추가 변경해야 한다.

## 월간 캘린더 회귀 방지 범위

정렬 작업은 `MonthView`의 날짜 셀이나 인디케이터 데이터를 변경하지 않는다. 다음 경로를 그대로 유지하고 수동 회귀 검증만 수행한다.

- 월 이동: `Calendar.handleMonthChange`가 `internalCurrentDate`만 이전·다음 달로 변경한다.
- 날짜 선택: `WeekRow`/날짜 셀의 `onDateSelect`가 컨테이너의 `selectedDate`를 변경한다.
- 접기·펼치기: `MonthView`의 `isCompact`, `dragY`, `COLLAPSE_THRESHOLD`를 유지한다.
- 인디케이터: 42개 셀 범위의 `useTodoCountByDate`와 `convertTodoCountToIndicators` 경로를 유지한다.
- 주간·월간 전환: `Calendar`의 controlled `view`와 `TodoListContainer.handleViewChange`를 유지한다.
- 선택 날짜 재클릭: `handleDateSelect`의 기존 `showStatus` 토글을 유지하되, 월간에서는 `viewMode`가 계속 `list`인 현재 동작을 보존한다.

월간 목록 정렬 함수가 새 배열을 반환해야 하는 이유도 여기에 있다. query cache 또는 API 응답 배열을 직접 정렬하면 다른 consumer나 캐시 비교에 예상치 못한 변경을 전파할 수 있다.

## 테스트 계획

### 공통 정렬 단위 테스트

테스트 러너가 확정되면 helper 단위 테스트에 다음 케이스를 데이터 테이블 형태로 추가한다.

1. 완료·미완료가 섞이면 시간과 무관하게 미완료가 먼저 온다.
2. 같은 완료 상태에서 시간이 있는 항목이 시간 없는 항목보다 먼저 온다.
3. 시간이 있는 항목은 `08:00`, `09:30`, `13:00` 순으로 정렬된다.
4. 시간이 없는 항목은 `ko` locale 콘텐츠 순으로 정렬된다.
5. `null`, `undefined`, `''` 시간은 모두 시간 없음으로 처리된다.
6. 같은 시간끼리, 같은 콘텐츠끼리는 API 입력 순서를 유지한다.
7. 정렬 전후 원본 배열과 원본 객체의 순서·참조가 변경되지 않는다.
8. `groupAndSortTodos`는 그룹 내부에 같은 정렬을 적용하면서 목표 그룹 가나다순과 `미분류` 마지막을 유지한다.

현재 `package.json`에는 Jest/Vitest와 `test` 스크립트가 없고 기존 `*.test.*`, `*.spec.*` 파일도 없다. 따라서 테스트 러너를 이 작업에서 새로 도입하지 않는다면 위 케이스는 구현 PR의 순수 함수 리뷰 체크리스트와 수동 시나리오로 검증하고, 별도 테스트 인프라 작업으로 추적한다.

### `/home` 수동 검증

모바일 기준 폭 `max-width: 448px`에서 다음을 확인한다.

1. 기능 문서의 혼합 예시가 미완료 시간순 → 미완료 무시간 가나다순 → 완료 시간순 → 완료 무시간 가나다순으로 보인다.
2. 같은 시간 또는 같은 콘텐츠인 항목은 refetch, 날짜 왕복, 뷰 전환 뒤에도 상대 순서가 흔들리지 않는다.
3. 완료 토글 성공 후 항목이 완료 영역으로 이동한다.
4. 시간 또는 콘텐츠 수정 후 새 값 기준 위치로 이동한다.
5. 추가한 항목이 선택 날짜의 올바른 위치에 보이고, 삭제 후 즉시 사라진다.
6. 주간 → 월간 → 주간으로 전환해도 같은 카테고리 안의 상대 순서가 같다.
7. 이전·다음 월 이동, 다른 날짜 선택, 오늘 이동이 기존대로 동작한다.
8. 월간 캘린더를 위·아래로 스와이프했을 때 접기·펼치기와 목록 세로 스크롤이 정상 동작한다.
9. 날짜 셀의 카테고리별 개수 인디케이터가 추가·완료·삭제 후 정상 갱신된다.

### 정적 검증

- TypeScript/Next.js 빌드: `npm run build`
- 저장소에 유효한 lint 명령이 유지되는 경우 lint도 실행한다.
- 변경 diff에 API DTO, 캘린더 컴포넌트, 서버 정렬 의존이 추가되지 않았는지 확인한다.

## 완료 기준

- [ ] 월간 `ListView`가 선택 날짜의 `sortedTodos`를 전달받는다.
- [ ] 완료 여부 → 시간 유무 → 시간 또는 한글 콘텐츠 순서가 요구사항과 일치한다.
- [ ] 동률 항목의 API 응답 상대 순서가 refetch와 뷰 전환 후에도 유지된다.
- [ ] 정렬 함수가 입력 배열을 변경하지 않는다.
- [ ] 주간 매트릭스와 카테고리 상세도 같은 공통 정렬 결과를 사용한다.
- [ ] `groupAndSortTodos`를 사용하는 경우 그룹 내부는 공통 정렬을 따르고, 그룹 가나다순 및 `미분류` 마지막은 유지된다.
- [ ] 완료·추가·시간/내용 수정·삭제 후 query 갱신 결과가 다시 정렬된다.
- [ ] 월 이동·날짜 선택·접기/펼치기·인디케이터·주간/월간 전환에 회귀가 없다.
- [ ] `npm run build`가 성공한다.

## 범위 제외

- API 응답 스키마 또는 서버 정렬 변경
- 월간 42개 날짜 셀의 레이아웃 변경
- 월간 목록을 목표별 섹션 UI로 재구성하는 작업
- mutation 실패 시 로컬 체크 state를 롤백하는 별도 optimistic update 개선
- 날짜 이동 편집 시 구 날짜·신 날짜 캐시를 함께 동기화하는 별도 개선(요구 범위에 포함될 경우 추가 작업)
