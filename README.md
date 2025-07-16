## DDD 12기 WEB 1팀 아둥바둥 FE 레포지토리입니다

- [🚀 기술 스택](#--------)
- [🌐 페이지 URL 구조](#-------url---)
- [📂 폴더별 기능 설명](#------------)
  - [`/src/app/` - Next.js App Router](#--src-app-----nextjs-app-router)
  - [`/src/feature/` - 도메인별 기능](#--src-feature------------)
  - [`/src/shared/` - 공통 리소스](#--src-shared-----------)
  - [`/src/mocks/` - MSW 모킹](#--src-mocks-----msw---)
  - [`/src/stories/` - Storybook](#--src-stories-----storybook)
- [개발 환경 설정](#--------)

---

## 🚀 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Form Management**: React Hook Form
- **HTTP Client**: Axios
- **UI Components**: Radix UI
- **Testing**: MSW (Mock Service Worker)
- **Storybook**: Component Documentation

## 🏗️ 아키텍처 구조 (FSD - Feature-Sliced Design)

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 참조하여 구성되어 있습니다.

### 📁 레이어 구조

```
src/
├── app/          # 페이지 및 라우팅 (최상위 레이어)
├── composite/    # 페이지별 복합 컴포넌트
├── feature/      # 도메인별 기능
└── shared/       # 공통 리소스 (최하위 레이어)
```

### 🔄 레이어 참조 규칙

**FSD 아키텍처의 핵심 원칙:**

- 각 레이어는 **자신보다 하위 레이어**의 컴포넌트나 함수만 참조 가능
- **상위 레이어나 같은 레이어**의 컴포넌트나 함수는 참조 불가능

```
app → composite → feature → shared
 ↑        ↑          ↑        ↑
상위    참조가능      참조가능    참조가능
```

## 🌐 페이지 URL 구조

| URL                 | 페이지           | 설명                                    |
| ------------------- | ---------------- | --------------------------------------- |
| `/`                 | 랜딩 페이지      | 토큰 확인 후 적절한 페이지로 리다이렉션 |
| `/login`            | 로그인 페이지    | 사용자 로그인                           |
| `/signup`           | 회원가입 페이지  | 새로운 사용자 등록                      |
| `/home`             | 메인 대시보드    | 사용자 목표 목록 및 관리                |
| `/home/create-goal` | 목표 생성 페이지 | 새로운 목표 생성                        |

## 📂 폴더별 기능 설명

### `/src/app/` - Next.js App Router (최상위 레이어)

- **페이지 및 라우팅 정의**
- **레이아웃 및 전역 설정**
- **다른 레이어의 컴포넌트만 사용 가능**

- **`(auth)/`**: 인증 관련 라우트 그룹
  - `login/`: 로그인 페이지
  - `signup/`: 회원가입 페이지
- **`(home)/`**: 사용자 대시보드 영역
  - `home/`: 메인 홈 페이지
  - `home/create-goal/`: 목표 생성 페이지
- **`layout.tsx`**: 루트 레이아웃 (전역 스타일, 폰트, 프로바이더)
- **`page.tsx`**: 랜딩 페이지 (토큰 기반 리다이렉션)

### `/src/composite/` - 페이지별 복합 컴포넌트

- **페이지와 1:1 종속 관계**
- **feature와 shared 컴포넌트를 조합하여 구성**
- **각 페이지별 폴더에 index.ts로 export**

- **`login/`**: 로그인 페이지 관련 복합 컴포넌트
- **`signup/`**: 회원가입 페이지 관련 복합 컴포넌트
- **`home/`**: 홈 페이지 관련 복합 컴포넌트
- **`create-goal/`**: 목표 생성 페이지 관련 복합 컴포넌트

### `/src/feature/` - 도메인별 기능

- **도메인별로 독립적인 기능 모듈**
- **페이지에 종속되지 않는 재사용 가능한 기능**
- **각 폴더는 하나의 모듈로 index.ts로 export**

- **`auth/`**: 인증 도메인
  - `components/`: 인증 관련 컴포넌트
  - `hooks/`: 인증 관련 커스텀 훅
  - `api/`: 인증 API 함수
  - `index.ts`: 모듈 export
- **`goal/`**: 목표 관리 도메인
  - `components/`: 목표 관련 컴포넌트
  - `hooks/`: 목표 관련 커스텀 훅
  - `api/`: 목표 API 함수
  - `index.ts`: 모듈 export

### `/src/shared/` - 공통 리소스 (최하위 레이어)

- **모든 레이어에서 사용 가능한 공통 리소스**
- **재사용 가능한 UI 컴포넌트 및 유틸리티**

- **`components/`**: 재사용 가능한 UI 컴포넌트
  - `input/`: InputField, DatePicker, TextArea 등 입력 컴포넌트
  - `navigation/`: Button 등 네비게이션 컴포넌트
  - `layout/`: FlexBox, Skeleton 등 레이아웃 컴포넌트
  - `feedback/`: Toast 등 피드백 컴포넌트
  - `display/`: Badge, SectionMessage 등 표시 컴포넌트
- **`lib/`**: 유틸리티 및 설정
  - `apiClient.ts`: Axios 인스턴스 및 인터셉터 설정
  - `token.ts`: 토큰 관리 유틸리티
  - `utils.ts`: 공통 유틸리티 함수
- **`type/`**: 공통 타입 정의
  - `authToken.ts`: 인증 토큰 관련 타입
  - `goal.ts`: 목표 관련 타입
  - `response.ts`: API 응답 타입
- **`hooks/`**: 공통 커스텀 훅
  - `useAutoLogout.ts`: 자동 로그아웃 훅

### `/src/mocks/` - MSW 모킹

- **API 모킹 설정**
- **개발 환경에서의 API 시뮬레이션**

- **`handlers.ts`**: API 모킹 핸들러
- **`server.ts`**: MSW 서버 설정
- **`mswClientProvider.tsx`**: 클라이언트 사이드 MSW 프로바이더

### `/src/stories/` - Storybook

- **컴포넌트 문서화**
- **개발 환경에서의 컴포넌트 테스트**
- **각 컴포넌트별 스토리 파일들**

## 🔧 개발 환경 설정

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# Storybook 실행
yarn storybook
```

## 📋 개발 가이드라인

### 1. 레이어 참조 규칙 준수

- 각 레이어는 하위 레이어만 참조 가능
- 상위 레이어나 같은 레이어 참조 금지

### 2. Composite 컴포넌트 작성

- 페이지와 1:1 매칭되는 폴더 구조
- 각 페이지별 index.ts에서 export
- feature와 shared 컴포넌트 조합 사용

### 3. Feature 모듈 작성

- 도메인별 독립적인 기능
- 페이지에 종속되지 않는 재사용 가능한 구조
- 각 폴더의 index.ts에서 모듈 export

### 4. Shared 리소스 관리

- 모든 레이어에서 사용 가능한 공통 리소스
- 재사용성과 일관성 고려
