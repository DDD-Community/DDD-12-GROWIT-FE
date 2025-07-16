# 📁 composite

* [개요](#--)
* [특징](#--)
* [폴더 구조](#-----)
* [사용 예시](#-----)
* [개발 가이드라인](#--------)
  + [1. 페이지 1:1 매칭 원칙](#1-----1-1------)
  + [2. index.ts export 규칙](#2-indexts-export---)
  + [3. 레이어 참조 규칙](#3----------)
  + [4. 복합 컴포넌트 설계](#4-----------)

---

## 개요

> - 페이지별로 복합 컴포넌트를 관리하는 레이어
> - app 레이어의 페이지와 1:1 종속 관계를 가지며, feature와 shared 컴포넌트를 조합하여 기능을 구현

## 특징

- **페이지 1:1 종속**: app 폴더의 페이지 구조와 동일한 폴더 구조
- **복합 컴포넌트**: feature와 shared 컴포넌트를 조합하여 구성
- **레이어 규칙**: feature와 shared 레이어만 참조 가능, app 레이어는 참조 불가
- **index.ts export**: 각 페이지별 폴더에 index.ts로 export하여 종속 관계 명시

## 폴더 구조

```
composite/
   └── [page]/                     # app 의 페이지경로이름
          ├── [component]          # 페이지 내의 기능
          │      ├── component.ts   
          │      ├── hooks.ts
          │      ├── api.ts
          │      └── type.ts
          ├── [component]  
          └── index.ts             # 각 컴포넌트를 이 파일을 통해서 export
```

## 사용 예시

```typescript
// app 레이어에서 composite 컴포넌트 사용
import { LoginForm } from '@/composite/login';
import { SignUpForm } from '@/composite/signup';
import { CreateGoalForm, ConfirmGoalBottomBar } from '@/composite/create-goal';
```

## 개발 가이드라인

### 1. 페이지 1:1 매칭 원칙

- app 폴더의 페이지 경로와 동일한 폴더명 사용
- 예: `app/(auth)/login/page.tsx` → `composite/login/`

### 2. index.ts export 규칙

- 각 페이지별 폴더에 반드시 index.ts 파일 생성
- app 레이어에서 사용할 컴포넌트들만 export
- 페이지와 composite의 종속 관계를 명확히 표현

### 3. 레이어 참조 규칙

- feature와 shared 레이어만 참조 가능
- app 레이어는 참조 불가
- 다른 composite 레이어도 참조 불가

### 4. 복합 컴포넌트 설계

- feature와 shared 컴포넌트를 조합하여 페이지별 특화 기능 구현
- 페이지에 특화된 비즈니스 로직은 composite 레이어에서 관리


