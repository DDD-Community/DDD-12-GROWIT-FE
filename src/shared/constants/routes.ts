export const ROUTES = {
  HOME: '/home',
  RETROSPECT: '/retrospect',
  MYPAGE: '/mypage',
  CREATE_GOAL: '/home/create-goal',
  ONBOARDING: '/onboarding',
  LOGIN: '/login',
  SIGNUP: '/signup',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

// 네비게이션에 표시할 라우트
export const NAVIGATION_ROUTES = [
  {
    path: ROUTES.HOME,
    icon: '/icon/navigation-home.svg',
    alt: 'Home',
  },
  {
    path: ROUTES.RETROSPECT,
    icon: '/icon/navigation-retrospect.svg',
    alt: 'Retrospect',
  },
  {
    path: ROUTES.MYPAGE,
    icon: '/icon/navigation-myprofile.svg',
    alt: 'My Profile',
  },
] as const;

export const NAVIGATION_CONFIG = {
  hiddenPaths: [ROUTES.LOGIN, ROUTES.SIGNUP, ROUTES.ONBOARDING, ROUTES.ONBOARDING],
  showOnlyPaths: [] as string[],
} as const;

// 네비게이션 표시 여부 체크 함수
export const shouldHiddenNavigation = (pathname: string): boolean => {
  return NAVIGATION_CONFIG.hiddenPaths.some((path: string) => pathname.startsWith(path));
};
