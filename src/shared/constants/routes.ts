import {
  HomeIcon,
  RetrospectIcon,
  ProfileIcon,
  HomeIconInActive,
  RetrospectIconInactive,
  ProfileIconInactive,
} from './icons';
import { ComponentType } from 'react';

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

interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

export interface NavigationRoute {
  path: string;
  icon: ComponentType<IconProps>;
  alt: string;
  title: string;
}
// 네비게이션에 표시할 라우트
export const NAVIGATION_ROUTES: NavigationRoute[] = [
  {
    path: ROUTES.HOME,
    icon: HomeIcon,
    alt: 'Home',
    title: '홈',
  },
  {
    path: ROUTES.RETROSPECT,
    icon: RetrospectIcon,
    alt: 'Retrospect',
    title: '회고',
  },
  {
    path: ROUTES.MYPAGE,
    icon: ProfileIcon,
    alt: 'My Profile',
    title: '마이페이지',
  },
] as const;

interface NavigationRouteMobile {
  path: string;
  activeIcon: ComponentType<IconProps>;
  inActiveIcon: ComponentType<IconProps>;
  alt: string;
  title: string;
}
// 모바일 네비게이션에 표시할 라우트
export const NAVIGATION_ROUTES_MOBILE: NavigationRouteMobile[] = [
  {
    path: ROUTES.HOME,
    activeIcon: HomeIcon,
    inActiveIcon: HomeIconInActive,
    alt: 'Home',
    title: '홈',
  },
  {
    path: ROUTES.RETROSPECT,
    activeIcon: RetrospectIcon,
    inActiveIcon: RetrospectIconInactive,
    alt: 'Retrospect',
    title: '회고',
  },
  {
    path: ROUTES.MYPAGE,
    activeIcon: ProfileIcon,
    inActiveIcon: ProfileIconInactive,
    alt: 'My Profile',
    title: '마이',
  },
] as const;

export const titleStyle = {
  active: 'text-primary-normal font-semibold text-xs md:text-base',
  inActive: 'text-interaction-inactive font-semibold text-xs md:text-base',
};

export const NAVIGATION_CONFIG = {
  hiddenPaths: [ROUTES.LOGIN, ROUTES.SIGNUP, ROUTES.ONBOARDING, ROUTES.ONBOARDING],
  showOnlyPaths: [] as string[],
} as const;

// 네비게이션 표시 여부 체크 함수
export const shouldHiddenNavigation = (pathname: string): boolean => {
  return NAVIGATION_CONFIG.hiddenPaths.some((path: string) => pathname.startsWith(path));
};
