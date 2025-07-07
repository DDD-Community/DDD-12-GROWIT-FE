# 📁 feature

- [개요](#--)
- [특징](#--)
- [폴더 구조](#-----)
- [사용 예시](#-----)
- [개발 가이드라인](#--------)
    * [1. 도메인 분리 원칙](#1----------)
    * [2. 모듈 export 규칙](#2----export---)
    * [3. 레이어 참조 규칙](#3----------)
    * [4. 재사용성 고려](#4--------)

---

## 개요

> - 도메인별로 독립적인 기능을 제공하는 레이어
> - 페이지에 종속되지 않는 재사용 가능한 기능들을 모듈화하여 관리

## 특징

- **도메인별 독립성**: 각 도메인(auth, goal, todo 등)은 서로 독립적으로 동작
- **재사용성**: 페이지에 종속되지 않아 여러 페이지에서 재사용 가능
- **모듈화**: 각 폴더는 하나의 모듈로 index.ts를 통해 export
- **레이어 규칙**: shared 레이어만 참조 가능, app/composite 레이어는 참조 불가

## 폴더 구조

```
feature/
   └── [domain]/                     # domain 이름
          ├── [component]            # domain 에 속한 컴포넌트 이름
          │      ├── component.ts   
          │      ├── hooks.ts
          │      ├── api.ts
          │      └── type.ts
          ├── [component]  
          └── index.ts             # 각 컴포넌트를 이 파일을 통해서 export
```


## 사용 예시

```typescript
// 다른 레이어에서 feature 모듈 사용
import { LoginForm, useFetchLogin } from '@/feature/auth';
import { ConfirmGoalDialogButton, useFetchGetGoal } from '@/feature/goal';
```

## 개발 가이드라인

### 1. 도메인 분리 원칙

- 비즈니스 도메인별로 폴더 분리
- 각 도메인은 독립적으로 동작 가능해야 함

### 2. 모듈 export 규칙

- index.ts에서만 public API export
- 내부 구현 세부사항은 숨김

### 3. 레이어 참조 규칙

- shared 레이어만 참조 가능
- app, composite, 다른 feature 레이어 참조 금지

### 4. 재사용성 고려

- 페이지에 종속되지 않는 범용적인 기능으로 설계
- 여러 페이지에서 사용 가능하도록 구성
