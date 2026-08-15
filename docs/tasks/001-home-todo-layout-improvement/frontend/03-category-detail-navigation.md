# Task 03. 카테고리 상세 내비게이션 프론트엔드 변경 계획

## 문서 목적

기능 문서의 `1×4` 카테고리 표시, 탭·스와이프 이동, 상세 목록 정렬 요구를 현재 `/home` 프론트엔드 구조에 맞춰 실제 변경 단위로 매핑한다. API 스키마나 서버 정렬은 변경하지 않는다.

기준 문서: [카테고리 상세 기능 문서](../feature/03-category-detail-navigation.md)

## 현재 코드 확인 결과

- `src/feature/todo/todoList/TodoList.tsx`
  - `detailCategory`가 `null`이면 매트릭스를 표시하고, 카테고리 카드 클릭 시 `NOW | STEADY | SKIP | DELETE` 중 하나를 저장한다.
  - 상세 화면에는 `categoryGroups[detailCategory]`만 전달하며, 상세에서 카테고리를 바꾸는 콜백은 없다.
  - 상세의 추가 버튼은 오버레이를 닫은 뒤 현재 `detailCategory`를 `onAdd`에 넘기므로, 카테고리 전환 후에도 이 흐름을 유지해야 한다.
- `src/feature/todo/todoList/components/CategoryDetailView.tsx`
  - 카테고리별 제목·배지·설명·아이콘과 배경 레이어를 파일 내부 상수로 보유한다.
  - 헤더 중앙의 `CategoryMatrixIcon`은 표시 전용이며 탭이나 스와이프 처리가 없다.
  - 상세 카드의 `todos.map(...)`은 전달받은 순서를 그대로 렌더링한다.
  - 각 상세 투두는 `SwipeableRow`를 사용하므로 목록 영역 전체에 카테고리 스와이프를 추가하면 완료·삭제 제스처와 직접 경쟁한다.
- `src/feature/todo/todoList/components/CategoryMatrixIcon.tsx`
  - `NOW → STEADY → SKIP → DELETE`를 `2×2` 사분면으로 그리는 공용 표시 컴포넌트다.
  - 상세 헤더뿐 아니라 `ListView`의 각 투두와 `CategoryDetailView`의 각 투두에서도 사용한다. 이 컴포넌트를 전역 `1×4`로 바꾸면 목록 아이콘까지 바뀌므로 상세 내비게이션과 분리해야 한다.
- `src/feature/todo/todoList/components/SwipeableRow.tsx`
  - 행 전경에 `drag="x"`, `touchAction: 'pan-y'`를 적용한다.
  - 좌우 오프셋 `28px`(`ACTION_WIDTH / 2`)부터 완료 또는 삭제 영역을 연다. 상세 카테고리 스와이프 감지 영역을 투두 행과 겹치지 않게 해야 한다.
- `src/composite/home/todoListContainer/TodoListContainer.tsx`
  - 주간 콘텐츠 전체가 좌우 `60px` 스와이프로 날짜를 바꾸는 `motion.div` 안에 있다.
  - 상세 오버레이도 React 트리상 이 드래그 영역의 자식이므로, 상세에서 시작한 포인터 이벤트가 바깥 날짜 스와이프로 전파되지 않도록 차단해야 한다.
- `src/feature/todo/todoList/helper.ts`
  - `TodoCategory` 타입과 카테고리 그룹 함수는 있으나, 그룹 함수는 API 순서를 그대로 보존한다.
  - 현재 정렬 함수는 목표별 목록 안에서 완료 여부만 비교하는 비공개 함수이며 시간·콘텐츠·안정 정렬 정책을 충족하지 않는다.

## 변경 구조 요약

```text
MatrixView 카드 클릭
  → TodoList.detailCategory 설정
  → CategoryDetailView(category, sorted todos)
      → CategoryNavigation 1×4 탭/제한된 스와이프
          → onCategoryChange(nextCategory)
              → TodoList.detailCategory 갱신
                  → 배경·메타·목록·추가 기본 카테고리 동시 갱신
```

카테고리 선택 상태의 소유자는 계속 `TodoList` 하나로 유지한다. `CategoryNavigation`이나 `CategoryDetailView`가 별도 선택 상태를 만들지 않아 탭 표시와 실제 목록이 어긋나는 상황을 막는다.

## 파일별 변경 계획

### 1. 신규 `src/feature/todo/todoList/category.ts`

카테고리 순서와 내비게이션에 필요한 최소 메타데이터를 한곳에 둔다.

```ts
export const TODO_CATEGORY_ORDER = ['NOW', 'STEADY', 'SKIP', 'DELETE'] as const;
export type TodoCategory = (typeof TODO_CATEGORY_ORDER)[number];

export const TODO_CATEGORY_NAV_META: Record<
  TodoCategory,
  { label: string; activeColor: string }
> = { /* 긴급, 꾸준히, 넘겨도, 지워도 */ };
```

- 순서는 매트릭스, 탭, 키보드 이동, 스와이프 인덱스 계산에서 공통으로 사용한다.
- 활성색은 현재 코드의 카테고리 색을 기준으로 통일하고 비활성색은 `#404040` 상수로 둔다.
- 상세 전용 배경 이미지와 문구는 `CategoryDetailView`에 남겨 내비게이션 공통 상수가 화면별 프레젠테이션 데이터까지 떠안지 않게 한다.
- `helper.ts`의 기존 `TodoCategory`는 이 파일에서 import 후 필요하면 재-export한다. `GoalTodo`와 API DTO의 카테고리 문자열 스키마는 변경하지 않는다.

### 2. 신규 `src/feature/todo/todoList/components/CategoryNavigation.tsx`

상세 헤더 중앙의 `CategoryMatrixIcon`을 대체하는 상세 전용 `1×4` 내비게이션을 만든다.

예상 인터페이스는 다음과 같다.

```ts
interface CategoryNavigationProps {
  value: TodoCategory;
  onValueChange: (category: TodoCategory) => void;
}
```

렌더링 및 접근성:

- `TODO_CATEGORY_ORDER`를 순회해 동일 너비의 버튼 네 개를 가로 한 줄로 렌더링한다.
- 각 버튼은 해당 카테고리 칸과 `긴급`, `꾸준히`, `넘겨도`, `지워도` 이름을 연결한다.
- 컨테이너는 `role="tablist"`와 `aria-label="투두 카테고리"`, 버튼은 `role="tab"`, `aria-selected`, `aria-controls`를 제공한다. 상세 본문에는 대응하는 `role="tabpanel"`과 고정 id를 둔다.
- 활성 칸만 고유 색, 나머지는 `#404040`으로 표시한다. 색만으로 상태를 전달하지 않도록 선택 상태와 접근 가능한 이름을 함께 제공한다.
- 클릭은 `onValueChange(category)`만 호출한다. 이미 선택된 버튼을 다시 눌러도 오버레이를 닫거나 목록을 초기화하지 않는다.
- 탭 패턴에 맞게 좌우 방향키로 인접 카테고리, `Home`/`End`로 양 끝 카테고리를 선택하고 포커스도 이동한다.

스와이프 처리:

- 드래그 감지는 이 내비게이션 영역에만 적용하고 상세 카드 및 투두 목록에는 적용하지 않는다.
- `motion`의 가로 드래그를 사용하되 실제 내비게이션 자체가 따라 움직이지 않도록 제약을 `left: 0`, `right: 0`으로 두고, 종료 시 오프셋만 판정한다.
- 전환 임계값은 `48px`로 두고 `abs(offset.x) > abs(offset.y)`일 때만 가로 스와이프로 인정한다. 작은 이동과 세로 스크롤은 선택 변경으로 처리하지 않는다.
- 왼쪽 스와이프는 현재 인덱스 `+1`, 오른쪽은 `-1`로 계산하고 `0 ... 3` 범위를 벗어나면 `onValueChange`를 호출하지 않는다. 순환 이동이 아니라 양 끝에서 멈추는 요구를 반영한다.
- `touchAction: 'pan-y'`와 방향 잠금을 적용해 페이지의 세로 스크롤을 허용한다. 버튼 클릭과 드래그가 함께 발생하지 않도록 임계값을 넘긴 드래그 직후의 클릭은 선택 처리하지 않는다.

### 3. `src/feature/todo/todoList/components/CategoryDetailView.tsx`

props 및 이벤트 경계를 다음처럼 확장한다.

```ts
interface CategoryDetailViewProps {
  category: TodoCategory;
  todos: GoalTodo[];
  isOpen: boolean;
  onClose: () => void;
  onCategoryChange: (category: TodoCategory) => void;
  // 기존 onToggle, onDelete, onEdit, onAdd 유지
}
```

- 헤더 중앙의 `<CategoryMatrixIcon category={category} size={40} />`를 `CategoryNavigation`으로 교체한다.
- 선택값은 `category`, 변경 이벤트는 `onCategoryChange`에 직접 연결한다. 기존 `CATEGORY_META[category]`와 `CATEGORY_BG_LAYERS[category]` 조회가 이미 선택값에 반응하므로 상태를 복제하지 않고 제목, 배지, 설명, 캐릭터, 배경을 함께 갱신한다.
- 투두 목록 본문에 `role="tabpanel"`을 부여하고 카테고리가 바뀌면 새 `todos`를 렌더링한다. 빈 배열도 그대로 허용해 `할 일이 없어요`를 표시한다.
- 오버레이 루트에서 포인터 이벤트 전파를 멈춰 바깥 `TodoListContainer`의 날짜 변경 드래그가 동시에 시작되지 않게 한다. 닫기·추가·카테고리 탭과 내부 `SwipeableRow` 이벤트는 오버레이 내부에서 정상 처리되어야 한다.
- 목록 영역에는 카테고리 드래그 핸들러를 추가하지 않는다. 따라서 각 행의 완료/삭제 `SwipeableRow`가 계속 가로 제스처의 유일한 소유자가 되고, 세로 `overflow-y-auto`도 유지된다.
- 상세 내부의 `DetailTodoItem`과 `CategoryMatrixIcon`은 기존 `2×2` 표시를 유지한다. 바뀌는 것은 헤더 내비게이션뿐이다.

### 4. `src/feature/todo/todoList/TodoList.tsx`

- 파일 내부에 다시 선언한 `CategoryType`을 제거하고 `TodoCategory`를 공통 파일에서 가져온다.
- `detailCategory` 상태는 `TodoCategory | null`을 유지하며 `CategoryDetailView.onCategoryChange`에 `setDetailCategory`를 전달한다.
- 카테고리 변경 시 컴포넌트를 닫았다 다시 열지 않는다. 같은 오버레이 인스턴스가 새 `categoryGroups[detailCategory]`를 받아야 전환 중 닫기 애니메이션이나 상태 초기화가 발생하지 않는다.
- `onAdd`에서는 호출 시점의 `detailCategory`를 먼저 지역 변수에 보존한 뒤 상세를 닫고 `onAdd?.(selectedCategory)`를 호출한다. 탭/스와이프 후 선택한 카테고리가 `TodoListContainer`의 `addDefaultCategory`로 정확히 전달되어야 한다.
- 완료 토글·삭제는 기존 mutation과 날짜 쿼리 invalidation을 그대로 사용한다. 응답 갱신 후 `todos → categoryGroups → 상세 props`가 다시 계산되어 새 완료 상태와 정렬 순서가 반영된다.

### 5. `src/feature/todo/todoList/helper.ts`

전체 작업에서 사용하는 비파괴 공통 정렬 함수를 구현하고 상세도 같은 결과를 소비하게 한다.

```ts
export const sortTodos = (todos: GoalTodo[]): GoalTodo[] => { /* ... */ };
```

비교 순서는 아래와 같다.

1. `isCompleted === false` 우선
2. 같은 완료 상태면 유효한 `time`이 있는 항목 우선
3. 둘 다 시간이 있으면 `HH:mm` 오름차순
4. 둘 다 시간이 없으면 `content.localeCompare(other, 'ko')`
5. 위 비교가 같으면 원본 API 배열 인덱스를 유지하고, 인덱스를 보존할 수 없는 호출 경로에서는 `id` 오름차순을 마지막 기준으로 사용

- 항상 복사본을 정렬해 쿼리 데이터와 입력 배열을 변경하지 않는다.
- `groupTodosByCategory`가 분류를 마친 뒤 각 배열에 공통 정렬 결과를 할당하도록 한다. 그러면 매트릭스와 상세가 같은 그룹 배열을 사용해 순서가 일치한다.
- 완료 토글과 수정은 쿼리 무효화/재조회로 `todosData`가 바뀔 때 `useMemo`가 다시 실행되므로 갱신된 값으로 재정렬된다.
- 월간 `ListView` 등 다른 대상 뷰의 적용은 Task 01·02와 같은 `sortTodos`를 재사용하되, 이 문서 범위에서는 상세가 정렬되지 않은 원본 배열을 직접 렌더링하지 않는 것까지 확인한다.

### 6. `src/feature/todo/todoList/components/CategoryMatrixIcon.tsx`

이 파일은 동작과 기본 모양을 변경하지 않는다.

- 목록의 각 투두가 계속 `2×2` 카테고리 아이콘을 사용하고 있어 전역 `1×4` 변경은 회귀다.
- 색상 상수를 공통 `category.ts`에서 import하도록 정리할 수는 있지만 DOM 구조, 크기, `2×2` 순서는 유지한다.
- 상세의 `1×4` 요구는 새 `CategoryNavigation`에서만 구현한다.

### 변경하지 않는 파일

- `src/feature/todo/todoList/components/SwipeableRow.tsx`: 행 완료·삭제의 임계값과 동작은 그대로 둔다. 충돌은 감지 영역 분리와 오버레이 이벤트 경계에서 해결한다.
- `src/composite/home/todoListContainer/TodoListContainer.tsx`: 상세 상태를 이 컴포넌트까지 끌어올리지 않는다. 오버레이에서 이벤트 전파를 차단하므로 기존 주간 날짜 스와이프 로직을 수정할 필요가 없다.
- API query, DTO, mutation 파일: 서버 호출이나 응답 형식의 변경이 없다.

## 상태·props 변경 흐름

| 동작 | 상태 변경 | 화면 및 기존 기능 결과 |
| --- | --- | --- |
| 매트릭스 카드 선택 | `detailCategory = 선택 카테고리` | 해당 상세 오버레이를 연다. |
| `1×4` 탭 선택 | `onCategoryChange` → `setDetailCategory` | 오버레이를 유지한 채 메타, 배경, 목록을 모두 바꾼다. |
| 내비게이션 왼쪽/오른쪽 스와이프 | 인덱스를 경계 내에서 `+1/-1` | 인접 카테고리만 선택하며 양 끝을 넘지 않는다. |
| 상세 추가 | 현재 카테고리 보존 → 상세 닫기 → `onAdd(category)` | 추가 바텀시트의 기본 카테고리가 현재 상세와 일치한다. |
| 완료/삭제 | 기존 mutation → 날짜 쿼리 invalidate | 현재 상세의 새 배열과 정렬 순서를 반영한다. |
| 수정 | 기존 `onEdit(todo)` 및 편집 바텀시트 | 수정 후 쿼리 갱신 결과를 현재 카테고리에 반영한다. 카테고리가 바뀐 투두는 새 그룹으로 이동한다. |
| 상세 닫기 | `detailCategory = null` | 매트릭스로 돌아가며 다시 열 때 카드가 지정한 카테고리부터 시작한다. |

## 테스트 계획

현재 `package.json`에는 Jest/Vitest 실행기와 `test` 스크립트가 없고 todoList 컴포넌트 테스트도 없다. 이 작업에서 별도 테스트 프레임워크를 임의로 도입하지 않고, 공통 작업에서 테스트 실행기가 추가되는 경우 `helper.test.ts`와 `CategoryNavigation.test.tsx`를 작성한다. 자동화 여부와 무관하게 아래 인수 조건은 반드시 검증한다.

### 정렬 단위 케이스

- 원본 배열이 변경되지 않는다.
- 완료 상태가 시간 및 이름보다 우선한다.
- 같은 완료 상태에서 `09:00`, `13:00`, 시간 없음 순서가 된다.
- 시간이 없는 한글 콘텐츠가 `localeCompare(..., 'ko')` 순서가 된다.
- 같은 시간/콘텐츠의 결과가 반복 실행 후에도 흔들리지 않는다.
- 완료 토글 후 해당 항목이 완료 그룹으로 이동하고, 시간 수정 및 콘텐츠 수정 후 새 위치로 이동한다.

### 컴포넌트 및 수동 회귀

모바일 뷰포트 `448px` 이하에서 다음을 확인한다.

1. `NOW → STEADY → SKIP → DELETE` 네 탭이 한 줄에 같은 순서로 보인다.
2. 마우스/터치 탭 및 키보드로 각 카테고리를 선택했을 때 `aria-selected`, 활성색, 제목, 배지, 설명, 아이콘, 배경, 목록이 같은 카테고리를 가리킨다.
3. `NOW`에서 왼쪽 스와이프를 세 번 해 `DELETE`까지 이동하고, 반대로 오른쪽 스와이프를 세 번 해 `NOW`까지 이동한다.
4. `NOW`의 오른쪽 스와이프와 `DELETE`의 왼쪽 스와이프는 카테고리와 날짜를 모두 바꾸지 않는다.
5. `48px` 미만 이동과 세로 이동은 카테고리를 바꾸지 않는다.
6. 빈 카테고리를 선택하면 오버레이를 유지한 채 `할 일이 없어요`가 보이고 추가 버튼은 해당 카테고리를 기본값으로 연다.
7. 긴 상세 목록을 세로 스크롤해도 카테고리나 날짜가 바뀌지 않는다.
8. 투두 행을 좌우로 밀면 기존 완료/삭제 액션만 열리고 카테고리 및 날짜가 바뀌지 않는다.
9. 탭/스와이프로 이동한 뒤 투두 완료, 삭제, 편집을 수행해 현재 상세 목록이 재조회·재정렬되는지 확인한다.
10. 상세 닫기 후 다른 매트릭스 카드를 눌렀을 때 해당 카테고리가 활성 상태로 열린다.
11. 월간 `ListView`와 각 투두의 `CategoryMatrixIcon`은 기존 `2×2` 모양을 유지한다.

### 정적 검증

- `yarn build`가 TypeScript 오류와 Next.js 빌드 오류 없이 성공한다.
- 브라우저 접근성 트리에서 네 탭의 이름과 선택 상태, 탭 패널 연결을 확인한다.

## 완료 기준

- [ ] 상세 헤더에 `NOW → STEADY → SKIP → DELETE` 순서의 클릭 가능한 `1×4` 내비게이션이 표시된다.
- [ ] 활성색과 `aria-selected`로 현재 카테고리를 구분하고 키보드로도 네 카테고리를 이동할 수 있다.
- [ ] 탭 전환 시 오버레이를 닫지 않고 카테고리별 배경·메타데이터·투두 목록이 함께 바뀐다.
- [ ] 왼쪽/오른쪽 스와이프가 인접 카테고리로만 이동하며 양 끝 경계를 넘지 않는다.
- [ ] 작은 움직임, 세로 스크롤, 투두 행 스와이프가 카테고리 또는 날짜 이동을 유발하지 않는다.
- [ ] 상세 목록이 공통 비파괴 정렬 정책을 사용하고 완료·수정 후 재조회된 값으로 다시 정렬된다.
- [ ] 빈 카테고리 이동과 현재 카테고리 기준 추가가 정상 동작한다.
- [ ] 추가·수정·완료·삭제 및 상세 닫기/재열기에 회귀가 없다.
- [ ] 목록용 `CategoryMatrixIcon`은 기존 `2×2` 형태를 유지한다.
- [ ] `yarn build`가 성공한다.
