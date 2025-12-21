export const HEADER_CONFIG = {
  hideHeaderPages: ['/home', '/goal/create'],
  hideBackButtonPages: ['/home'],
  pageTitles: {
    '/home': '홈',
    '/mypage': '마이페이지',
    '/onboarding': '온보딩',
    '/goal/create': '목표 추가',
  } as Record<string, string>,
} as const;
