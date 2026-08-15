# 홈 투두 레이아웃 개선

## 개요

`/home`의 주간·월간 투두 화면과 카테고리 상세 화면, 반복 투두 수정 흐름의 사용성을 개선한다.
카테고리별 크기와 스크롤 영역을 안정화하고, 모든 투두 목록에 동일한 정렬 정책을 적용하며,
카테고리 상세 화면 사이를 빠르게 이동할 수 있도록 내비게이션을 보강한다. 반복 투두는 선택한 회차,
해당 날짜 이후, 전체 반복 범위를 분명히 선택해 수정하고 배포 API 계약에 맞게 연동한다.

이 README는 이번 작업에 포함된 네 가지 feature를 대표한다. 각 기능의 사용자 동작과 인수 조건은
`feature` 문서에서, 실제 수정할 파일과 구현 방법은 대응하는 `frontend` 문서에서 관리한다.

## 작업 기준

- 기준 브랜치: `develop`
- 작업 브랜치: `feat/home-todo-layout-improvement`
- 대상 페이지: `/home`
- 화면 기준 폭: 모바일 `max-width: 448px`

## 목표

1. 주간 매트릭스의 카테고리별 높이와 내부 스크롤을 안정화한다.
2. 주간·월간·카테고리 상세 목록에 같은 투두 정렬 정책을 적용한다.
3. 하단 내비게이션이 메인 콘텐츠를 가리지 않도록 안전 여백을 확보한다.
4. 카테고리 상세 아이콘을 `1×4` 형태로 변경하고, 탭과 좌우 스와이프로 카테고리를 이동한다.
5. 반복 투두 수정 모달에 `해당 날짜 이후 수정` 동작을 추가하고, `SINGLE` / `FROM_DATE` / `ALL`
   범위가 배포 API 계약과 일치하도록 기존 수정 연동을 마이그레이션한다.

## 공통 투두 정렬 정책

정렬 우선순위는 다음과 같다.

1. 미완료 투두
2. 완료 투두

각 완료 상태 그룹 안에서는 다음 순서를 적용한다.

1. 시간이 있는 투두: `HH:mm` 오름차순
2. 시간이 없는 투두: 콘텐츠 가나다순(`ko` locale)

시간과 콘텐츠가 같을 때도 결과가 흔들리지 않도록 마지막 비교 기준을 둔다.
가능하면 API 응답 순서를 보존하고, 그렇지 않으면 `id`를 마지막 비교 기준으로 사용한다.
원본 배열을 변경하지 않는 공통 정렬 함수를 만들고 모든 대상 뷰에서 재사용한다.

## 반복 투두 수정 범위 정책

| 범위 | 사용자 동작 | 적용 대상 |
| --- | --- | --- |
| `SINGLE` | 해당 투두만 수정 | 선택한 회차 1건 |
| `FROM_DATE` | 해당 날짜 이후 수정 | 선택한 회차의 원래 날짜를 포함한 이후 회차 |
| `ALL` | 전체 반복 투두 수정 | 과거를 포함한 반복 전체 |

신규 엔드포인트를 추가하지 않고 기존 `PUT /todos/{id}`를 사용하되, 배포 API 계약에 맞춰
`routine`과 `routineUpdateType`의 조건부 동반 전송을 보장한다.
`FROM_DATE`와 `ALL`은 대상 회차가 재생성되어 id가 바뀌므로, 성공 후 관련 목록과 반복 정보를 재조회한다.
최신 `routine`을 확보하는 시점과 범위별 요청·캐시 처리의 상세는
[반복 투두 수정 범위 프론트엔드 문서](./frontend/04-routine-update-scope.md)에서 정의한다.

## 세부 작업

| 번호 | Feature 문서 | Frontend 문서 | 범위 |
| --- | --- | --- | --- |
| 01 | [주간 레이아웃 개선](./feature/01-weekly-layout.md) | [구현 계획](./frontend/01-weekly-layout.md) | 카드 높이, 내부 스크롤, 정렬, 하단 내비게이션 여백 |
| 02 | [월간 레이아웃 개선](./feature/02-monthly-layout.md) | [구현 계획](./frontend/02-monthly-layout.md) | 월간 선택일 목록 정렬 및 회귀 검증 |
| 03 | [카테고리 상세 개선](./feature/03-category-detail-navigation.md) | [구현 계획](./frontend/03-category-detail-navigation.md) | `1×4` 아이콘, 탭·스와이프 카테고리 이동 |
| 04 | [반복 투두 수정 범위](./feature/04-routine-update-scope.md) | [구현 계획](./frontend/04-routine-update-scope.md) | `SINGLE` / `FROM_DATE` / `ALL` 선택 UI, 배포 API 스펙 마이그레이션, 수정 후 재조회 |

## 문서 역할

- `README.md`: 전체 feature 범위, 공통 정책, 작업 순서와 통합 완료 조건을 정의한다.
- `feature/*.md`: 사용자에게 제공할 동작, 정책, feature별 인수 조건을 정의한다.
- `frontend/*.md`: 각 feature를 반영하기 위해 수정할 소스 파일과 구현 방법을 정의한다.
- 구현 중 요구사항이 바뀌면 feature 문서를 먼저 갱신하고 frontend 문서의 매핑을 함께 수정한다.

## 예상 변경 파일

```text
src/
├── app/(home)/layout.tsx
├── composite/home/todoListContainer/TodoListContainer.tsx
├── model/todo/todoList/
│   ├── api.ts
│   ├── dto.ts
│   ├── queries.ts
│   └── queryKeys.ts
├── feature/todo/todoBottomSheet/
│   ├── form/TodoFormProvider.tsx
│   └── components/subBottomSheet/editSelectView/EditBottomSheet.tsx
└── feature/todo/todoList/
    ├── TodoList.tsx
    ├── helper.ts
    └── components/
        ├── CategoryCard.tsx
        ├── CategoryDetailView.tsx
        ├── CategoryMatrixIcon.tsx
        ├── ListView.tsx
        └── MatrixView.tsx
```

구현 중 역할 분리가 필요하면 공통 정렬 유틸리티 또는 카테고리 상수를 별도 파일로 분리할 수 있다.

## 작업 순서

1. 공통 정렬 함수와 테스트 케이스를 먼저 작성한다.
2. 주간 매트릭스에 고정 높이와 카드 내부 스크롤을 적용한다.
3. 월간 선택일 목록에 공통 정렬을 적용한다.
4. 하단 내비게이션이 콘텐츠를 가리지 않도록 레이아웃 여백을 조정한다.
5. 상세 카테고리 아이콘과 탭·스와이프 내비게이션을 구현한다.
6. 반복 투두 수정 API 타입·요청·캐시 계층을 배포 스펙에 맞게 마이그레이션한다.
7. 반복 투두 수정 모달에 `해당 날짜 이후 수정` 버튼을 추가하고 세 범위를 연동한다.
8. 모바일 크기와 실제 데이터로 수동 회귀 테스트한다.

## 전체 완료 조건

- [ ] `NOW`, `STEADY` 카드 높이가 각각 `295px`로 유지된다.
- [ ] `SKIP`, `DELETE` 카드 높이가 각각 `180px`로 유지된다.
- [ ] 카드 헤더는 고정되고 투두 목록만 세로로 스크롤된다.
- [ ] 주간·월간·상세 화면에 공통 정렬 정책이 동일하게 적용된다.
- [ ] 하단 내비게이션이 마지막 투두나 플로팅 버튼의 조작 영역을 가리지 않는다.
- [ ] 상세 화면의 카테고리 표시가 `1×4`로 노출된다.
- [ ] 상세 화면에서 탭과 좌우 스와이프로 네 카테고리를 순환할 수 있다.
- [ ] 반복 투두 수정 모달에 기존 범위와 함께 `해당 날짜 이후 수정` 버튼이 노출된다.
- [ ] 각 버튼이 `SINGLE`, `FROM_DATE`, `ALL`로 매핑되어 의도한 회차만 수정한다.
- [ ] `routine`과 `routineUpdateType`이 배포 API의 조건부 필수 계약에 맞게 전송되며 기존 반복 수정 요청에 400 회귀가 없다.
- [ ] `FROM_DATE`·`ALL` 수정 후 관련 투두 목록을 재조회해 변경된 id와 반복 정보를 반영한다.
- [ ] 투두 추가·수정·완료·삭제 기능에 회귀가 없다.
- [ ] `yarn build`가 성공한다.

## 범위 제외

- 서버 API 추가 개발 또는 배포된 API 스펙 재설계
- 반복 투두 삭제 범위 UI 변경
- 서버 정렬 정책 변경
- 카테고리 명칭 및 분류 규칙 변경
- 데스크톱 전용 신규 레이아웃
- 하단 내비게이션의 메뉴 구성 변경
