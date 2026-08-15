# Task 01. 주간 투두 레이아웃 프론트엔드 구현 계획

## 문서 목적

이 문서는 [주간 투두 레이아웃 기능 문서](../feature/01-weekly-layout.md)의 요구사항을 현재 프론트엔드 코드에 매핑한다. 구현자가 어떤 파일을 왜 수정하고, 변경 후 데이터와 스크롤·제스처가 어디에서 처리되어야 하는지 확인하는 것이 목적이다.

대상은 `/home`의 주간 `matrix` 뷰다. API 스키마, 서버 정렬, 카테고리 정의, 하단 내비게이션 메뉴 구성은 변경하지 않는다.

## 확인한 현재 실행 경로

```text
src/app/(home)/home/page.tsx
  └─ TodoListContainer
      ├─ Calendar
      ├─ TodoList(viewMode="matrix")
      │   ├─ useTodosByDate({ date })
      │   ├─ transformTodosData
      │   ├─ groupTodosByCategory
      │   └─ MatrixView
      │       └─ CategoryCard × 4
      │           └─ SwipeableRow × todo 수
      ├─ FloatingButton
      └─ TodoBottomSheet(add/edit)

src/app/(home)/layout.tsx
  └─ overflow-y-auto 메인 스크롤 영역
      ├─ page children
      └─ BottomNavigation(fixed)
```

- `TodoListContainerFormProvider`가 `selectedDate`, `calendarView`, `editingTodo`를 관리한다.
- 주간 기본 상태에서는 `TodoListContainer`가 `viewMode="matrix"`를 계산해 `TodoList`에 전달한다.
- `TodoList`는 선택일을 `yyyy-MM-dd`로 변환해 `useTodosByDate`로 조회하고, `transformTodosData`와 `groupTodosByCategory`를 거쳐 `MatrixView`에 전달한다.
- 완료/삭제 mutation과 `TodoBottomSheet`의 추가/수정은 같은 선택일 쿼리를 invalidate한다. 재조회 후 위 변환 경로를 다시 타므로 정렬은 렌더링 경로의 순수 함수로 적용해야 한다.
- 상세 화면은 별도 조회를 하지 않고 같은 `categoryGroups[detailCategory]`를 받는다. 따라서 카테고리 그룹을 만들 때 정렬하면 주간 카드와 현재 상세 목록이 같은 배열 순서를 공유한다.

## 현재 문제와 요구사항 매핑

| 요구사항 | 현재 코드의 원인 | 구현 방향 |
| --- | --- | --- |
| `NOW`, `STEADY` 각각 `295px` | `MatrixView`의 두 섹션과 카드 행이 모두 `flex-1 min-h-0`, `CategoryCard`는 `h-full`이라 남은 화면 높이를 분할한다. | 중요 카드 행을 `h-[295px] shrink-0`, 카드 자체를 `h-full`로 고정한다. |
| `SKIP`, `DELETE` 각각 `180px` | 여유 행도 중요 행과 같은 `flex-1` 비율을 사용한다. | 여유 카드 행을 `h-[180px] shrink-0`로 고정한다. |
| 카드 헤더 고정, 목록만 스크롤 | `CategoryCard` 전체만 `overflow-hidden`이고 목록 래퍼에는 높이 수축 및 스크롤 설정이 없다. 항목이 많으면 잘린다. | 헤더에 `shrink-0`, 목록에 `flex-1 min-h-0 overflow-y-auto`를 적용한다. |
| 화면 전체 세로 스크롤 허용 | `TodoListContainer`가 `h-screen`, 그 하위 콘텐츠와 Motion 래퍼가 `flex-1 min-h-0`라 고정 카드의 자연 높이를 부모 스크롤 높이로 올리기 어렵다. | `h-screen` 고정을 `min-h-svh` 기반으로 바꾸고, 카드 영역을 강제로 축소하는 `min-h-0` 체인을 제거한다. 실제 페이지 스크롤은 `(home)/layout.tsx`가 계속 담당한다. |
| 카테고리별 공통 정렬 | `groupTodosByCategory`는 API 순서대로 `push`만 한다. 기존 private `sortTodosInGroup`도 완료 여부만 비교한다. | 복사본을 반환하는 공통 comparator를 만들고 네 카테고리 그룹과 기존 목표 그룹 정렬에서 재사용한다. |
| 하단 내비게이션 안전 여백 | `(home)/layout.tsx`의 스크롤 영역 안에 `fixed bottom-0` 내비게이션이 있지만 그 높이만큼의 하단 패딩이 없다. | 스크롤 영역 끝에 내비게이션, safe area, FAB 높이를 합친 예약 공간을 둔다. |
| iOS safe area 및 FAB 충돌 방지 | `BottomNavigation`의 `pb-[25px]`와 `FloatingButton`의 `bottom-[25px]`가 safe area를 무시한다. 좁은 폭에서는 둘이 같은 세로 띠에 있어 클릭 영역이 겹칠 수 있다. | 내비게이션은 bottom safe area를 더하고, `/home` FAB은 내비게이션 위로 올린다. 마지막 콘텐츠도 FAB 위까지 스크롤되도록 예약 공간을 맞춘다. |

## 파일별 변경 계획

### 1. `src/feature/todo/todoList/helper.ts`

#### 현재 문제

- `groupTodosByCategory`는 분류만 하고 정렬하지 않는다.
- `sortTodosInGroup`는 `isCompleted`만 비교하며 private 함수다.
- 시간 유무, `HH:mm`, 한글 콘텐츠, 동률 안정성에 대한 공통 기준이 없다.

#### 구현 변경

`sortTodosByPolicy(todos: GoalTodo[]): GoalTodo[]` 형태의 순수 함수를 export한다. 이름은 구현 시 프로젝트 명명 규칙에 맞춰 조정할 수 있으나 하나의 함수만 정렬 정책의 기준점이 되어야 한다.

비교 순서는 다음과 같이 고정한다.

1. `isCompleted === false`를 먼저 둔다.
2. 같은 완료 상태에서는 유효한 시간이 있는 항목을 먼저 둔다.
   - `null`, `undefined`, `''`, 공백 문자열은 시간 없음으로 취급한다.
   - API 타입 계약상 그 외 값은 `HH:mm`이다.
3. 둘 다 시간이 있으면 `HH:mm` 문자열 오름차순으로 비교한다. 고정 폭 24시간 형식이므로 문자열 비교와 시각 순서가 같다.
4. 시간이 같거나 둘 다 시간이 없으면 `content.localeCompare(other.content, 'ko')`를 적용한다.
5. 위 키가 모두 같으면 원본 배열의 인덱스를 사용해 API 응답 순서를 보존한다. 임의의 `id` 정렬로 기존 순서를 바꾸지 않는다.

구현은 원본을 직접 `.sort()`하지 않고 복사 또는 `{ todo, originalIndex }` decoration 후 새 배열을 반환한다. 이로써 React Query 캐시와 `props` 배열은 변경되지 않는다.

`groupTodosByCategory`는 기존의 “알 수 없거나 category가 없는 항목은 `NOW`” 규칙을 유지한 뒤 각 그룹에 공통 정렬 함수를 적용해 반환한다. 기존 `groupAndSortTodos`의 그룹 내부 정렬도 같은 함수로 교체하되, 목표 그룹 가나다순과 `미분류` 마지막 규칙은 그대로 둔다.

#### 영향

- `TodoList.tsx`의 기존 `useMemo(() => groupTodosByCategory(todos), [todos])`는 변경하지 않아도 정렬된 `CategoryGroups`를 받는다.
- `MatrixView`와 `CategoryDetailView`가 같은 그룹 배열을 사용하므로 주간 매트릭스와 현재 상세 화면의 순서가 함께 정렬된다.
- 완료 토글, 추가, 수정, 삭제 후 쿼리가 invalidate되면 새 응답으로 그룹과 정렬을 다시 계산한다.
- 월간 `ListView` 전체 배열에 적용하는 작업은 Task 02에서 `TodoList.tsx`에 연결한다. 이 문서에서는 공통 함수와 주간 그룹 연결까지만 담당한다.

### 2. `src/feature/todo/todoList/components/MatrixView.tsx`

#### 현재 문제

현재 구조는 바깥 래퍼, `중요`/`여유` 섹션, 각 카드 행까지 `flex-1 min-h-0`를 사용한다. 두 행이 같은 비율로 남은 높이를 나누므로 요구 높이가 보장되지 않는다.

#### 구현 변경

- 바깥 래퍼에서 높이 분배 목적의 `flex-1 min-h-0`를 제거하고 콘텐츠의 자연 높이를 사용한다.
- `중요` 섹션의 카드 행은 `h-[295px] shrink-0`로 고정한다.
- `여유` 섹션의 카드 행은 `h-[180px] shrink-0`로 고정한다.
- 두 행 모두 현재 `flex-row gap-2`를 유지한다. 카드 폭 계산과 `max-width: 448px`의 2열 배치는 바꾸지 않는다.
- 섹션 제목, 섹션 사이 `gap-4`, 카드 사이 `gap-2`, 하단 `mb-5`는 유지한다.
- 높이 상수의 중복을 줄이려면 `IMPORTANT_CARD_HEIGHT`, `RELAXED_CARD_HEIGHT` 또는 의미가 드러나는 Tailwind 클래스 상수로 한 곳에서 관리한다.

고정 높이는 카드에 네 번 각각 넣기보다 행에 부여하고, 두 자식 `CategoryCard`가 `h-full`을 채우게 한다. 같은 행의 두 카드가 반드시 같은 높이를 갖는 구조가 된다.

### 3. `src/feature/todo/todoList/components/CategoryCard.tsx`

#### 현재 문제

- 카드의 `overflow-hidden` 때문에 넘치는 todo가 보이지 않지만, 목록에는 `overflow-y-auto`가 없다.
- 헤더와 목록이 같은 flex 흐름에 있고 목록에 `min-h-0`가 없어 목록만 수축·스크롤하는 구조가 아니다.
- 카드 내부 todo에는 가로 `SwipeableRow`, 바깥에는 날짜 이동용 가로 Motion drag가 중첩되어 있다.

#### 구현 변경

- 카드 루트는 현재 `h-full overflow-hidden flex flex-col`을 유지해 `MatrixView`가 준 행 높이를 채운다.
- 헤더 래퍼에 `shrink-0`를 추가한다. 아이콘, 카테고리명, 완료/전체 수, 추가 버튼은 목록 스크롤의 영향을 받지 않는다.
- todo 목록 래퍼를 `relative z-10 flex flex-1 min-h-0 flex-col gap-2 overflow-y-auto`로 변경한다.
- 목록 하단에 작은 내부 패딩을 둬 마지막 항목의 체크박스·텍스트·스와이프 액션이 카드의 둥근 모서리/외부 `py-3`에 붙지 않게 한다.
- 빈 목록 문구도 같은 스크롤 영역 안에 렌더링한다. `0`개일 때 헤더와 빈 상태가 모두 정상 노출되어야 한다.
- 스크롤바를 별도 강제 숨김 처리하지 않고 `globals.css`의 기존 전역 thin scrollbar 정책을 따른다. 모바일의 overlay scrollbar 동작을 유지한다.

#### 클릭·스크롤·스와이프 경계

- 추가 버튼의 기존 `stopPropagation()`을 유지해 상세 진입 없이 add sheet만 연다.
- todo 행 클릭은 기존처럼 카드 클릭 전파를 막고, 텍스트 클릭은 edit sheet, 체크박스는 완료 토글을 실행한다.
- todo 행의 pointer 시작 이벤트가 바깥 날짜 이동 drag로 전달되지 않도록 행 경계에서 propagation을 차단한다. 이 처리는 `SwipeableRow` 자신의 가로 drag와 브라우저의 세로 스크롤은 유지해야 한다.
- 목록 영역에는 별도의 카테고리/날짜 가로 drag를 추가하지 않는다. `SwipeableRow`는 현재 `touchAction: pan-y`를 유지해 세로 스크롤과 가로 액션을 구분한다.
- 카드 헤더나 todo가 없는 카드 면을 탭하면 기존 `onCardClick`으로 상세 화면을 연다.
- 카드 내부 목록이 상단/하단에 도달한 뒤 계속 세로 스크롤하면 바깥 페이지 스크롤로 이어질 수 있어야 하므로 세로 overscroll을 강제로 contain하지 않는다.

### 4. `src/composite/home/todoListContainer/TodoListContainer.tsx`

#### 현재 문제

`h-screen`과 두 단계의 `flex-1 min-h-0`가 캘린더 아래 남은 높이에 매트릭스를 끼워 넣는다. 카드 행을 고정해도 이 제약을 그대로 두면 콘텐츠가 축소되거나 overflow가 부모의 실제 스크롤 높이에 안정적으로 반영되지 않는다.

또한 `FloatingButton`은 공용 컴포넌트 기본값인 `bottom-[25px]`를 그대로 사용해 하단 내비게이션과 같은 세로 영역에 놓인다.

#### 구현 변경

- 화면 래퍼의 `h-screen`을 `min-h-svh`로 바꾼다. 루트 `body`도 `h-svh`이므로 모바일 주소창 변화에 `100vh`보다 일관되며, 매트릭스가 더 길면 자연스럽게 높이가 늘어난다.
- 캘린더 아래 Motion 래퍼와 그 부모에서 매트릭스를 강제로 줄이는 `min-h-0`를 제거한다. `flex-1`이 필요한 `status` 뷰의 기존 채움 동작은 유지하되, `matrix` 뷰의 최소 콘텐츠 높이 `295px + 180px + 제목/간격`을 축소하지 않아야 한다.
- 기존 날짜 좌우 swipe, `DAY_SWIPE_THRESHOLD`, `swipeX`, 날짜 변경 로직은 유지한다.
- `FloatingButton`에 `/home` 전용 `className`을 전달해 내비게이션 상단보다 여유 간격을 두고 배치한다. 공용 `FloatingButton.tsx`의 기본 위치를 내비게이션에 종속시키지 않는다.
- FAB bottom 계산에도 `env(safe-area-inset-bottom, 0px)`을 포함한다.
- `/home` 콘텐츠 끝에는 FAB 높이 `48px`와 내비게이션 사이 간격 `12px`를 합한 `60px`의 추가 하단 여백을 둔다. 공용 레이아웃의 내비게이션 예약 공간과 합쳐졌을 때 마지막 카드가 FAB 위에 놓인다.

현재 크기 기준 하단 UI 예약값은 다음처럼 계산한다.

```text
BottomNavigation: tab 영역 52px + pt 16px + 기본 pb 25px = 93px
FAB: md 높이 48px
Navigation과 FAB 사이 최소 간격: 12px
공용 레이아웃 예약 공간: 93px + safe-area-inset-bottom
/home 추가 예약 공간: 12 + 48 = 60px
최종 /home 예약 공간: 93 + 60 = 153px + safe-area-inset-bottom
FAB bottom: 93 + 12 = 105px + safe-area-inset-bottom
```

구현 중 내비게이션의 실제 높이 토큰을 바꾸면 위 두 값도 같은 기준에서 함께 갱신한다. 숫자를 서로 무관한 magic number로 복제하지 않도록 하단 UI 상수 또는 CSS custom property로 의미를 드러낸다.

### 5. `src/app/(home)/layout.tsx`

#### 현재 문제

`flex-1 overflow-y-auto` 영역이 페이지 스크롤을 담당하지만 fixed 내비게이션은 문서 흐름의 높이를 차지하지 않는다. 마지막 콘텐츠가 내비게이션과 FAB 뒤까지 내려간다.

#### 구현 변경

- 현재 메인 `overflow-y-auto` 요소를 단일 페이지 스크롤 소유자로 유지한다.
- 이 요소에 내비게이션 실제 점유 높이인 `calc(93px + env(safe-area-inset-bottom, 0px))`에 해당하는 하단 padding을 제공한다.
- `BottomNavigation`의 렌더 위치와 `fixed` 동작은 유지한다.
- `AnimatedStack`은 현재처럼 스크롤 영역의 형제이며, stack 화면 동작과 z-index를 변경하지 않는다.
- 이 레이아웃은 `/home` 외 `/goal`, `/retrospect`, `/mypage`에도 적용되므로 공용 레이아웃에는 내비게이션 높이만 예약한다. FAB 때문에 필요한 추가 `60px`는 `TodoListContainer`에 한정한다.

### 6. `src/shared/components/layout/Navigation/BottomNavigation.tsx`

#### 현재 문제

내비게이션은 `fixed bottom-0`이지만 아래 padding이 항상 `25px`다. `viewportFit: 'cover'`는 이미 루트 레이아웃에 설정되어 있으므로 CSS에서 safe-area 값만 실제 위치에 반영하면 된다.

#### 구현 변경

- 기본 디자인 여백 `25px`에 `env(safe-area-inset-bottom, 0px)`을 더해 탭 클릭 영역이 홈 인디케이터 위에 오도록 한다.
- `fixed bottom-0`, `max-w-md`, 좌우 `25px`, 현재 탭 크기와 메뉴 구성은 유지한다.
- `Z_INDEX.BOTTOM_NAVIGATION` (`z-[990]`)을 바꾸지 않는다.

### 확인만 하고 Task 01에서 수정하지 않는 파일

| 파일 | 이유 |
| --- | --- |
| `src/feature/todo/todoList/TodoList.tsx` | 선택일 조회, mutation invalidate, `categoryGroups` memo 경로가 이미 적절하다. `groupTodosByCategory` 반환을 정렬하면 주간 연결을 위해 추가 수정이 필요 없다. 월간 전체 배열 연결은 Task 02 범위다. |
| `src/feature/todo/todoList/components/SwipeableRow.tsx` | 기존 `drag="x"`, `touchAction: pan-y`, 완료/삭제 액션을 그대로 재사용한다. 주간 카드에서 필요한 이벤트 경계는 `CategoryCard` 쪽에서 한정한다. |
| `src/shared/components/input/FloatingButton.tsx` | 현재 사용처는 `/home`이지만 공용 input의 기본 위치를 내비게이션 높이에 결합하지 않고 `TodoListContainer`의 `className` override로 처리한다. |
| `src/model/todo/todoList/*` | 조회/수정 DTO와 API에는 정렬·레이아웃 책임이 없다. 서버 요청 및 React Query key도 변경하지 않는다. |
| `src/shared/lib/z-index.ts` | 현재 `SHEET 999 > FAB 991 > BOTTOM_NAVIGATION 990 > CONTENT 950` 순서를 유지해야 한다. |

## 변경 후 데이터 흐름

```text
selectedDate 변경(날짜 탭 또는 매트릭스 좌우 swipe)
  → useTodosByDate({ date: yyyy-MM-dd })
  → API TodoByDateItem[]
  → transformTodosData (GoalTodo[] 새 배열)
  → groupTodosByCategory
      ├─ category 분류
      └─ sortTodosByPolicy (각 그룹 새 배열)
  → MatrixView
      ├─ NOW/STEADY: 295px 행
      └─ SKIP/DELETE: 180px 행
  → CategoryCard
      ├─ 고정 header
      └─ 독립 overflow-y-auto todo list
```

완료/삭제는 `TodoList`의 mutation이, 추가/수정은 `TodoFormProvider`가 선택일 쿼리를 invalidate한다. optimistic local checkbox 상태가 먼저 바뀌더라도 서버 응답 후 `todo.isCompleted`와 동기화되고, 새 그룹 계산에서 완료 항목의 위치가 아래 그룹으로 이동한다. 이 흐름을 위해 별도 로컬 정렬 상태를 추가하지 않는다.

## 레이아웃 및 스크롤 책임

스크롤 컨테이너를 다음처럼 분리한다.

```text
(home)/layout main scroller
  ├─ Calendar + Matrix 전체를 세로 스크롤
  ├─ BottomNavigation 예약 padding (93px + safe area)
  ├─ /home 콘텐츠의 FAB 예약 padding (60px)
  └─ CategoryCard 내부 list scroller × 4

fixed UI
  ├─ FAB (navigation 위 12px)
  └─ BottomNavigation (safe area 위)
```

- 페이지 스크롤: 캘린더와 두 카테고리 행 전체를 이동한다.
- 카드 스크롤: 해당 카드의 todo 목록만 이동하며 헤더는 움직이지 않는다.
- 카드 높이: viewport가 작아도 줄이지 않는다. 대신 페이지 전체가 길어진다.
- 상세 오버레이와 Bottom Sheet: fixed overlay 및 기존 z-index를 유지하므로 아래 페이지의 예약 padding과 무관하다.

## 테스트 계획

### 정렬 단위 테스트

현재 저장소에는 실행 중인 Jest/Vitest 설정과 `test` script가 없고 `@playwright/test`만 dev dependency로 존재한다. 구현 PR에서 실행되지 않는 테스트 파일만 추가하지 않는다. 공통 정렬 테스트를 자동화할 때는 기존 의존성을 사용한 pure spec을 추가하고 실행 명령을 PR에 함께 남기거나, 별도 테스트 러너 도입 범위를 명시한다.

최소 fixture는 다음을 모두 검증해야 한다.

1. 완료 여부가 시간 유무보다 우선한다.
2. 같은 완료 상태에서 시간 있음이 시간 없음보다 우선한다.
3. `08:00`, `09:30`, `13:00`이 시각 오름차순이다.
4. `null`, `undefined`, `''`, `'   '`가 모두 시간 없음이다.
5. 시간이 없는 항목은 `localeCompare(..., 'ko')` 결과와 같다.
6. 같은 시간일 때 콘텐츠 가나다순, 같은 시간·콘텐츠일 때 입력 순서를 유지한다.
7. 함수 호출 전후 원본 배열의 항목 순서가 변하지 않는다.
8. `groupTodosByCategory`의 네 그룹 모두 같은 정책을 사용하고 category 누락 항목은 `NOW` 규칙을 유지한다.
9. `groupAndSortTodos`의 목표 그룹 순서와 `미분류` 마지막 규칙은 유지된다.

### 모바일 수동·브라우저 검증

검증 폭은 최소 `320px`, `375px`, `448px`로 하고 짧은 viewport와 iOS safe-area 환경을 포함한다.

| 시나리오 | 기대 결과 |
| --- | --- |
| 네 카테고리 모두 0개 | 2열이 유지되고 중요 카드 `295px`, 여유 카드 `180px`, 각 헤더와 빈 문구가 보인다. |
| 한 카드만 높이를 넘는 데이터 | 카드/같은 행 높이는 변하지 않고 해당 목록만 세로 스크롤된다. 다른 카드와 헤더는 움직이지 않는다. |
| 완료·미완료, 시간 있음·없음 혼합 | 네 그룹 모두 공통 정렬 순서를 표시한다. |
| 긴 한글·영문·숫자 제목 | 기존 truncate가 유지되고 카드 폭이나 2열이 깨지지 않는다. |
| 카드 목록 세로 스크롤 | 날짜가 바뀌거나 상세 화면이 열리지 않고 마지막 항목까지 읽고 조작할 수 있다. |
| todo 좌/우 swipe | 완료/삭제 액션만 열리며 바깥 날짜 swipe가 동시에 실행되지 않는다. |
| 카드 빈 면/헤더 탭 | 선택 카테고리 상세가 열린다. 추가 버튼은 상세 대신 add sheet를 연다. |
| 매트릭스 빈 면 좌/우 swipe | 기존 임계값 `60px` 기준으로 선택일이 ±1일 이동한다. |
| 페이지 최하단 | 마지막 콘텐츠가 FAB와 내비게이션 뒤에 가려지지 않는다. |
| 폭 `320px` | FAB과 내비게이션 탭 클릭 영역이 겹치지 않는다. |
| iOS safe area | 내비게이션과 FAB가 홈 인디케이터 위에 있고 마지막 콘텐츠 예약 공간에도 inset이 반영된다. |
| add/edit Bottom Sheet 및 상세 오버레이 | 내비게이션/FAB보다 위에 표시되고 기존 닫기·저장 동작이 유지된다. |
| `/goal`, `/retrospect`, `/mypage` | 공용 `(home)` 레이아웃 padding 적용으로 마지막 콘텐츠나 기존 자체 여백이 비정상적으로 벌어지지 않는다. |

### 회귀 동작

- 체크박스와 swipe 완료 처리
- 단일 todo 삭제
- 카테고리별 추가 버튼과 전역 FAB 추가
- todo 텍스트 클릭 후 수정
- 카드 클릭 후 상세 진입/닫기
- 주간 날짜 탭, 선택 날짜 재탭 status 전환, 주간/월간 전환
- mutation 이후 선택일 todo 및 캘린더 count 쿼리 갱신

## 완료 기준

- [ ] `NOW`, `STEADY` 카드의 computed height가 데이터 수와 viewport 높이에 관계없이 각각 `295px`다.
- [ ] `SKIP`, `DELETE` 카드의 computed height가 각각 `180px`다.
- [ ] `CategoryCard` 헤더는 고정되고 todo 목록만 세로 스크롤된다.
- [ ] 목록 마지막 항목의 체크·편집·swipe 액션을 모두 조작할 수 있다.
- [ ] 주간 네 카테고리가 완료 여부 → 시간 유무 → 시간 → 콘텐츠 → 입력 순서 정책으로 정렬된다.
- [ ] 정렬 함수가 입력 배열과 React Query 데이터의 순서를 변경하지 않는다.
- [ ] 카드 내부 세로 스크롤, todo 가로 swipe, 바깥 날짜 가로 swipe, 카드 상세 탭이 의도한 영역에서만 동작한다.
- [ ] 페이지 끝의 콘텐츠, FAB, 내비게이션 클릭 영역이 서로 가리지 않는다.
- [ ] `env(safe-area-inset-bottom)`이 내비게이션 위치, FAB 위치, 콘텐츠 예약 공간에 일관되게 반영된다.
- [ ] 기존 add/edit Bottom Sheet와 상세 오버레이의 z-index 순서가 유지된다.
- [ ] 추가·수정·완료·삭제·상세 진입과 날짜/뷰 전환에 회귀가 없다.
- [ ] 정렬 자동 테스트를 추가했다면 해당 명령이 성공하고, `yarn build`가 성공한다.

## 권장 구현 순서

1. `helper.ts`의 공통 정렬 함수와 fixture를 먼저 확정한다.
2. `groupTodosByCategory` 및 기존 목표 그룹 내부 정렬에 공통 함수를 연결한다.
3. `MatrixView`의 두 행 높이를 고정한다.
4. `CategoryCard`를 고정 헤더와 내부 스크롤 목록으로 분리하고 이벤트 경계를 정리한다.
5. `TodoListContainer`의 viewport 높이 제약과 FAB 위치를 조정한다.
6. `(home)/layout.tsx`와 `BottomNavigation.tsx`의 하단 예약 공간/safe area를 같은 기준값으로 맞춘다.
7. 세 viewport 폭, 짧은 높이, iOS safe area에서 제스처와 CRUD 회귀를 확인한 뒤 `yarn build`를 실행한다.
