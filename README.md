## DDD 12기 WEB 1팀 아둥바둥 FE 레포지토리입니다

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


## 🌐 페이지 URL 구조

| URL | 페이지 | 설명 |
|-----|--------|------|
| `/` | 랜딩 페이지 | 토큰 확인 후 적절한 페이지로 리다이렉션 |
| `/login` | 로그인 페이지 | 사용자 로그인 |
| `/signup` | 회원가입 페이지 | 새로운 사용자 등록 |
| `/home` | 메인 대시보드 | 사용자 목표 목록 및 관리 |
| `/home/create-goal` | 목표 생성 페이지 | 새로운 목표 생성 |

## 📂 폴더별 기능 설명

### `/src/app/` - Next.js App Router
- **`(auth)/`**: 인증 관련 라우트 그룹
    - `login/`: 로그인 페이지 및 관련 컴포넌트
    - `signup/`: 회원가입 페이지 및 관련 컴포넌트
- **`home/`**: 사용자 대시보드 영역
    - `page.tsx`: 메인 홈 페이지
    - `create-goal/`: 목표 생성 페이지
- **`layout.tsx`**: 루트 레이아웃 (전역 스타일, 폰트, 프로바이더)
- **`page.tsx`**: 랜딩 페이지 (토큰 기반 리다이렉션)

### `/src/feature/` - 도메인별 기능
- **`auth/`**: 인증 도메인
    - `components/`: LoginForm, LogoutButton 등 인증 관련 컴포넌트
    - `hooks/`: useFetchLogin 등 인증 관련 커스텀 훅
    - `api/`: 로그인, 회원가입 API 함수
    - `index.ts`: 외부에서 사용할 컴포넌트와 훅을 export
- **`goal/`**: 목표 관리 도메인
    - `components/`: Sidebar, ConfirmGoalBottomBar 등 목표 관련 컴포넌트
    - `hooks/`: useFetchGetGoal, useFetchPostCreateGoal 등 목표 관련 훅
    - `api/`: 목표 조회, 생성 API 함수
    - `index.ts`: 외부에서 사용할 컴포넌트와 훅을 export

### `/src/shared/` - 공통 리소스
- **`components/`**: 재사용 가능한 UI 컴포넌트
    - `input/`: InputField, DatePicker, TextArea 등 입력 컴포넌트
    - `navigation/`: Button 등 네비게이션 컴포넌트
    - `layout/`: FlexBox, Skeleton 등 레이아웃 컴포넌트
    - `feedback/`: Toast 등 피드백 컴포넌트
- **`lib/`**: 유틸리티 및 설정
    - `apiClient.ts`: Axios 인스턴스 및 인터셉터 설정
    - `token.ts`: 토큰 관리 유틸리티
    - `utils.ts`: 공통 유틸리티 함수
- **`type/`**: 공통 타입 정의
    - `authToken.ts`: 인증 토큰 관련 타입
    - `goal.ts`: 목표 관련 타입
    - `response.ts`: API 응답 타입

### `/src/mocks/` - MSW 모킹
- **`handlers.ts`**: API 모킹 핸들러
- **`server.ts`**: MSW 서버 설정
- **`mswClientProvider.tsx`**: 클라이언트 사이드 MSW 프로바이더

### `/src/stories/` - Storybook
- 각 컴포넌트별 스토리 파일들
- 컴포넌트 문서화 및 개발 환경에서의 테스트


## 개발 환경 설정

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# Storybook 실행
yarn storybook
```
