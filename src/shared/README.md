# 📁 shared

## 개요

> - 모든 레이어에서 사용 가능한 공통 리소스를 관리하는 최하위 레이어
> - 재사용 가능한 UI 컴포넌트, 유틸리티 함수, 타입 정의 등을 제공

## 특징

- **최하위 레이어**: 모든 레이어(app, composite, feature)에서 사용 가능
- **재사용성**: 프로젝트 전체에서 공통으로 사용되는 리소스
- **독립성**: 다른 레이어에 의존하지 않는 순수한 공통 리소스
- **일관성**: 프로젝트 전체의 일관된 디자인과 동작 보장

## 폴더 구조

```
shared/
├── components/              # 재사용 가능한 UI 컴포넌트
│   ├── input/              # 입력 관련 컴포넌트
│   ├── navigation/         # 네비게이션 관련 컴포넌트
│   ├── layout/             # 레이아웃 관련 컴포넌트
│   ├── feedback/           # 피드백 관련 컴포넌트
│   ├── display/            # 표시 관련 컴포넌트
│   └── dialog.tsx          # 다이얼로그 컴포넌트
├── hooks/                  # 공통 커스텀 훅
│   ├── useAutoLogout.ts    # 자동 로그아웃 훅
│   └── index.ts            # 훅 export
├── lib/                    # 유틸리티 및 설정
│   ├── apiClient.ts        # Axios 인스턴스 및 인터셉터
│   ├── token.ts            # 토큰 관리 유틸리티
│   └── utils.ts            # 공통 유틸리티 함수
├── type/                   # 공통 타입 정의
│   ├── authToken.ts        # 인증 토큰 관련 타입
│   ├── goal.ts             # 목표 관련 타입
│   └── response.ts         # API 응답 타입
└── index.ts                # shared 모듈 export
```

## 사용 예시

```typescript
// 다른 레이어에서 shared 리소스 사용
import { InputField, Button } from '@/shared/components';
import { useAutoLogout } from '@/shared/hooks';
import { apiClient, token } from '@/shared/lib';
import { AuthToken, Goal } from '@/shared/type';
```

## 개발 가이드라인

### 1. 순수성 원칙

- 다른 레이어에 의존하지 않는 순수한 공통 리소스만 포함
- 비즈니스 로직은 `feature`, `composite` 레이어에서 관리

### 2. 재사용성 고려

- 프로젝트 전체에서 사용 가능하도록 설계
- 특정 도메인에 종속되지 않는 범용적인 기능

### 3. 일관성 유지

- 디자인 시스템과 일관된 UI 컴포넌트
- 프로젝트 전체의 동작 방식 통일

### 4. 타입 안전성

- TypeScript를 활용한 타입 안전성 보장
- 공통 타입 정의로 일관된 데이터 구조
